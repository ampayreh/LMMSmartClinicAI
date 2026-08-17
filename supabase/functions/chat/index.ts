/**
 * LMMC Smart Clinic Assistant — Supabase Edge Function
 *
 * Architecture:
 *   Request → Validate → Intent Router (Haiku/Bedrock) → Route:
 *     ├── emergency    → fixed template + escalation row (no model call)
 *     ├── out_of_scope → polite redirect (no model call)
 *     └── *            → Claude Sonnet/Bedrock with search_formulary tool
 *                        → Bedrock Guardrails on output
 *                        → Response
 *
 * See DECISIONS.md for architectural rationale.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import AnthropicBedrock from "npm:@anthropic-ai/bedrock-sdk@0.17.0";
import { BedrockRuntimeClient, ApplyGuardrailCommand } from "npm:@aws-sdk/client-bedrock-runtime";

// ──────────────────────────────────────────────────────────
// Configuration
// ──────────────────────────────────────────────────────────

const AWS_REGION = Deno.env.get("AWS_REGION") || "us-east-1";

const bedrock = new AnthropicBedrock({
  awsAccessKey: Deno.env.get("AWS_ACCESS_KEY_ID"),
  awsSecretKey: Deno.env.get("AWS_SECRET_ACCESS_KEY"),
  awsRegion: AWS_REGION,
});

const bedrockRuntime = new BedrockRuntimeClient({
  region: AWS_REGION,
  credentials: {
    accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID")!,
    secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY")!,
  },
});

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

// Model IDs — configurable via env so they can be updated without redeploying
const ROUTER_MODEL = Deno.env.get("ROUTER_MODEL") || "us.anthropic.claude-haiku-4-5-20251001-v1:0";
const MAIN_MODEL = Deno.env.get("MAIN_MODEL") || "us.anthropic.claude-sonnet-4-20250514-v1:0";
const GUARDRAIL_ID = Deno.env.get("BEDROCK_GUARDRAIL_ID");
const GUARDRAIL_VERSION = Deno.env.get("BEDROCK_GUARDRAIL_VERSION") || "DRAFT";

const MAX_TOOL_ROUNDS = 3; // prevent infinite tool-use loops

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ──────────────────────────────────────────────────────────
// Rate limiter (in-memory, per-IP)
// ──────────────────────────────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 300_000);

// ──────────────────────────────────────────────────────────
// Input validation
// ──────────────────────────────────────────────────────────

const VALID_ROLES = new Set(["user", "assistant"]);
const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;
const VALID_LANGUAGES = new Set(["en", "lg"]);

interface ValidatedPayload {
  messages: Array<{ role: string; content: string }>;
  language: string;
}

function validatePayload(body: unknown): ValidatedPayload | string {
  if (!body || typeof body !== "object") return "Invalid request body";

  const { messages, language } = body as Record<string, unknown>;

  if (language !== undefined && !VALID_LANGUAGES.has(language as string)) {
    return "Invalid language. Must be 'en' or 'lg'.";
  }

  if (!Array.isArray(messages)) return "Messages must be an array.";
  if (messages.length === 0) return "Messages array cannot be empty.";
  if (messages.length > MAX_MESSAGES) return `Too many messages. Maximum is ${MAX_MESSAGES}.`;

  const sanitized: Array<{ role: string; content: string }> = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (!msg || typeof msg !== "object") return `Message at index ${i} is invalid.`;

    const { role, content } = msg as Record<string, unknown>;

    if (typeof role !== "string" || !VALID_ROLES.has(role)) {
      return `Invalid role at index ${i}. Only 'user' and 'assistant' are allowed.`;
    }

    if (typeof content !== "string" || content.trim().length === 0) {
      return `Empty content at index ${i}.`;
    }

    if (content.length > MAX_CONTENT_LENGTH) {
      return `Message at index ${i} exceeds ${MAX_CONTENT_LENGTH} character limit.`;
    }

    sanitized.push({ role, content: content.trim() });
  }

  return { messages: sanitized, language: (language as string) || "en" };
}

// ──────────────────────────────────────────────────────────
// Intent router
// ──────────────────────────────────────────────────────────

type Intent = "general_info" | "formulary_lookup" | "booking" | "emergency" | "out_of_scope";

const INTENT_TOOL = {
  name: "classify_intent" as const,
  description: "Classify the user's healthcare inquiry intent into exactly one category.",
  input_schema: {
    type: "object" as const,
    properties: {
      intent: {
        type: "string" as const,
        enum: ["general_info", "formulary_lookup", "booking", "emergency", "out_of_scope"],
        description:
          "general_info: services, hours, location, staff, partners. " +
          "formulary_lookup: drug names, prices, medication availability, treatment costs, 'how much'. " +
          "booking: appointment scheduling, visit preparation, what to bring. " +
          "emergency: severe bleeding, breathing difficulty, chest pain, unconsciousness, seizures, snake bite. " +
          "out_of_scope: unrelated to healthcare or clinic services.",
      },
    },
    required: ["intent" as const],
  },
};

const ROUTER_SYSTEM = `You are an intent classifier for a community healthcare clinic chatbot in Wakiso District, Uganda. Classify the user's message into exactly one category.

Rules:
- Any mention of specific drugs, prices, costs, or "how much" → formulary_lookup
- Severe symptoms requiring immediate attention → emergency
- Questions clearly unrelated to healthcare → out_of_scope
- When unsure between general_info and formulary_lookup, prefer formulary_lookup (the tool handles it gracefully)
- When unsure between general_info and booking, prefer general_info`;

async function routeIntent(userMessage: string): Promise<Intent> {
  try {
    const response = await bedrock.messages.create({
      model: ROUTER_MODEL,
      max_tokens: 100,
      system: ROUTER_SYSTEM,
      tools: [INTENT_TOOL],
      tool_choice: { type: "tool" as const, name: "classify_intent" },
      messages: [{ role: "user" as const, content: userMessage }],
    });

    for (const block of response.content) {
      if (block.type === "tool_use" && block.name === "classify_intent") {
        const input = block.input as { intent: string };
        if (["general_info", "formulary_lookup", "booking", "emergency", "out_of_scope"].includes(input.intent)) {
          return input.intent as Intent;
        }
      }
    }
  } catch (e) {
    console.error("Intent router error, defaulting to general_info:", e);
  }
  return "general_info";
}

// ──────────────────────────────────────────────────────────
// Tool definitions
// ──────────────────────────────────────────────────────────

const FORMULARY_TOOL = {
  name: "search_formulary" as const,
  description:
    "Search the clinic's drug formulary and service price list. Use this whenever " +
    "the user asks about drug availability, medication information, treatment costs, " +
    "or service prices. Returns matching items with names, forms, prices in UGX, " +
    "and stock status.",
  input_schema: {
    type: "object" as const,
    properties: {
      query: {
        type: "string" as const,
        description:
          "Search term: drug name, brand name, category, or condition " +
          '(e.g. "malaria", "paracetamol", "family planning", "ANC")',
      },
      category: {
        type: "string" as const,
        enum: [
          "antimalarial", "antibiotic", "analgesic", "antihypertensive",
          "antidiabetic", "family_planning", "maternal_care", "diagnostics",
          "iv_fluids", "sundries", "consultation",
        ],
        description: "Optional category filter to narrow results",
      },
    },
    required: ["query" as const],
  },
};

// ──────────────────────────────────────────────────────────
// Formulary search (Postgres full-text + trigram fallback)
// ──────────────────────────────────────────────────────────

interface FormularyItem {
  generic_name: string;
  brand_name: string | null;
  form: string;
  strength: string | null;
  unit_price_ugx: number;
  pack_size: string;
  category: string;
  in_stock: boolean;
  notes: string | null;
}

async function searchFormulary(
  query: string,
  category?: string
): Promise<FormularyItem[]> {
  // 1. Try full-text search first (fast, precise)
  const tsQuery = query
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.replace(/[^\w]/g, ""))
    .filter(Boolean)
    .join(" & ");

  let ftsBuilder = supabase
    .from("formulary")
    .select("generic_name, brand_name, form, strength, unit_price_ugx, pack_size, category, in_stock, notes")
    .eq("in_stock", true);

  if (category) ftsBuilder = ftsBuilder.eq("category", category);

  const { data: ftsResults } = await ftsBuilder.textSearch("search_vector", tsQuery);

  if (ftsResults && ftsResults.length > 0) return ftsResults;

  // 2. Fallback to trigram similarity (handles typos and partial matches)
  const { data: fuzzyResults } = await supabase.rpc("search_formulary_fuzzy", {
    search_term: query,
    category_filter: category || null,
  });

  return fuzzyResults || [];
}

// ──────────────────────────────────────────────────────────
// Bedrock Guardrails
// ──────────────────────────────────────────────────────────

interface GuardrailResult {
  blocked: boolean;
  output: string;
}

async function applyGuardrail(text: string): Promise<GuardrailResult> {
  if (!GUARDRAIL_ID) return { blocked: false, output: text };

  try {
    const command = new ApplyGuardrailCommand({
      guardrailIdentifier: GUARDRAIL_ID,
      guardrailVersion: GUARDRAIL_VERSION,
      source: "OUTPUT",
      content: [{ text: { text } }],
    });

    const result = await bedrockRuntime.send(command);

    if (result.action === "GUARDRAIL_INTERVENED") {
      console.warn("Guardrail intervened:", JSON.stringify(result.assessments));
      return {
        blocked: true,
        output:
          result.outputs?.[0]?.text ||
          "I'm unable to respond to that question. For medical advice, please visit the clinic or call +256 741 008 049.",
      };
    }
  } catch (e) {
    // Guardrail failures are non-fatal — log and pass through.
    // A broken guardrail should not block the user from getting help.
    console.error("Guardrail evaluation error (non-fatal):", e);
  }

  return { blocked: false, output: text };
}

// ──────────────────────────────────────────────────────────
// Escalation writer
// ──────────────────────────────────────────────────────────

async function writeEscalation(
  sessionId: string | null,
  triggerReason: string,
  transcript: string,
  routerIntent: string
): Promise<void> {
  try {
    await supabase.from("escalations").insert({
      session_id: sessionId,
      trigger_reason: triggerReason,
      transcript_excerpt: transcript.slice(0, 2000),
      router_intent: routerIntent,
    });
  } catch (e) {
    // Escalation write failures are logged but do not block the response.
    // The emergency template still goes out; the escalation row is best-effort.
    console.error("Escalation write failed:", e);
  }
}

// ──────────────────────────────────────────────────────────
// System prompt
// ──────────────────────────────────────────────────────────

// Prices are no longer hardcoded here — the search_formulary tool returns
// them from the formulary table. The system prompt instructs the model to
// use the tool for any pricing question.

const SYSTEM_PROMPT = `You are the LMMC Smart Clinic Assistant for Lynda Michelle Medical Centre, a community healthcare provider in Budo-Kimbejja, Nsangi, Wakiso District, Uganda. You help patients understand services, estimate costs, and prepare for visits.

IDENTITY & TONE:
- Warm, reassuring, professional
- Be concise (mobile users with limited data)

LANGUAGE RULES:
- If the user writes ENTIRELY in English, respond ENTIRELY in English. Do NOT include any Luganda words, greetings, or phrases. Keep it 100% English.
- If the user writes in Luganda, respond FULLY in Luganda. Keep medical terms (drug names, test names, conditions) and prices in English/numerals.
- If the user mixes English and Luganda (even one Luganda word like "mukola", "ki", "wa", "ku", "mu", "bwe"), respond in the SAME MIX. Do NOT switch to English-only. Match the user's style.
- Default: if truly ambiguous with no identifiable Luganda words, respond in English only.
- Always keep prices in numerals + UGX regardless of language.

LUGANDA GREETING RULES:
- Do NOT start every Luganda response with "Gyebale ko!" or any fixed greeting. Vary your openings.
- Only use a greeting at the very START of a brand new conversation, not on follow-up messages.
- In follow-up messages, jump straight into answering without any greeting.

CRITICAL SAFETY RULES:
1. NEVER diagnose. Say "We recommend visiting LMMC for a proper examination."
2. NEVER prescribe. Say "Your clinician will determine the right treatment and dosage."
3. For EMERGENCIES (severe bleeding, breathing difficulty, unconsciousness, chest pain, seizures, snake bites): the system handles these automatically — you should not receive emergency messages, but if you do, respond with "This sounds like an emergency. Please go to the nearest hospital immediately. Call us: +256 772 590 967"
4. Never share patient data or claim treatment outcomes.
5. CONTACT NUMBERS: WhatsApp Business: +256 741 008 049 (primary). Founder/Senior Midwife: +256 772 590 967.

PRICING — IMPORTANT:
- Use the search_formulary tool for ALL pricing questions. Do NOT guess or recall prices from memory.
- If the tool returns results, quote the prices it returns. If it returns no results, say the item is not currently listed and suggest calling the clinic for current pricing.
- Always note that prices are estimates and may vary — confirm at the clinic.
- When presenting prices from the tool, format them clearly with the drug/service name and UGX amount.

CLINIC INFO:
- Founded: 2012
- Location: Plot 1246, Budo-Kimbejja, Nsangi Sub-County, Wakiso District, Uganda
- P.O. Box 148398, Kampala GPO
- Phone (WhatsApp): +256 741 008 049
- Phone (Founder): +256 772 590 967
- Email: admin@lyndamichellemed.com
- Hours: Mon-Sat 8AM-6PM | Sunday: Emergency Only

STAFF:
- Dr. Joshua Tugumisirize, Medical Director
- Jenipher Nakyejjusa, Registered Midwife
- Lydia Tugumisirize, Senior Nurse & Founder
- Graeme Tobias Ampeire, Director, operations and strategy

PARTNERS: Marie Stopes International, PEPFAR, USAID, JMS, Ministry of Health Uganda

8 SERVICES:
1. Outpatient Care (OPD): general consultations
2. Maternal & Reproductive Health: ANC, deliveries, family planning
3. Laboratory & Diagnostics: malaria, HIV, syphilis, pregnancy, blood sugar tests
4. Immunization: child & adult per national schedule
5. Pharmacy: essential medicines
6. Minor Surgery: wound care, suturing, abscess drainage
7. Community Health Education: outreach programs
8. Home-Based Care: elderly & homebound visits

FORMAT RULES:
- Use emoji sparingly but effectively (🏥 🔬 💊 💰 📍 ☎️ ⚠️)
- Use **bold** for headings and key prices
- Use bullet points (•) for lists
- Only include contact info (📍 and ☎️) when the user asks about location, directions, hours, or how to reach the clinic.
- Keep responses under 300 words
- LUGANDA FORMATTING: same quality as English — proper punctuation, line breaks, bold, bullets.
- PHONE NUMBERS: WhatsApp: +256 741 008 049 | Founder/Senior Midwife: +256 772 590 967`;

function systemPromptForLanguage(language: string): string {
  const langSuffix =
    language === "lg"
      ? "\n\nIMPORTANT: The user has chosen Luganda as their preferred language. Respond ENTIRELY in Luganda. Keep medical terms, drug names, test names, and prices in English/numerals."
      : "\n\nIMPORTANT: The user has chosen English as their preferred language. Respond ENTIRELY in English.";
  return SYSTEM_PROMPT + langSuffix;
}

// ──────────────────────────────────────────────────────────
// Emergency and out-of-scope templates
// ──────────────────────────────────────────────────────────

function emergencyResponse(language: string): string {
  if (language === "lg") {
    return (
      "⚠️ **Guno obulwadde gw'amangu!**\n\n" +
      "Genda mu ddwaliro erisinga obuggya mangu ddala.\n\n" +
      "Tukubire ku:\n" +
      "☎️ **+256 772 590 967** (Omusawo omukulu)\n" +
      "☎️ **+256 741 008 049** (WhatsApp)\n\n" +
      "Bw'oba ku LMMC, tujja kukuyamba mangu ddala."
    );
  }
  return (
    "⚠️ **This sounds like an emergency.**\n\n" +
    "Please go to the nearest hospital immediately, or call us:\n\n" +
    "☎️ **+256 772 590 967** (Senior Midwife / Founder)\n" +
    "☎️ **+256 741 008 049** (WhatsApp)\n\n" +
    "If you are near LMMC, come directly — we will attend to you right away."
  );
}

function outOfScopeResponse(language: string): string {
  if (language === "lg") {
    return (
      "Nsonyiwa, nsobola okukuyamba ku by'obulamu ne mpeereza za Lynda Michelle Medical Centre bokka.\n\n" +
      "Oyagala okumanya ku mpeereza zaffe? 🏥"
    );
  }
  return (
    "I can only help with health-related questions and information about Lynda Michelle Medical Centre.\n\n" +
    "Would you like to know about our services, hours, or how to reach us? 🏥"
  );
}

function bookingResponse(language: string): string {
  if (language === "lg") {
    return (
      "📅 **Okuteekawo enteekateeka ku LMMC**\n\n" +
      "Tukkiriza okujja wonna mu budde bw'okukola — tewetaagisa kuteekawo ddi.\n\n" +
      "**Amasaawa g'okukola:**\n" +
      "Lw'okubiri – Lw'okutaano: 8:00 AM – 6:00 PM\n" +
      "Lwa Mukaaga: 9:00 AM – 2:00 PM\n" +
      "Lwasande: Tuzibidde (okuggyako ebyamangu)\n\n" +
      "Bw'oba oyagala okuteekawo obudde bw'enjawulo, tukubire:\n" +
      "☎️ **+256 772 590 967**\n" +
      "💬 **+256 741 008 049** (WhatsApp)\n\n" +
      "**By'olina okuleeta:**\n" +
      "• Kaadi y'obulamu (bw'oba onayo)\n" +
      "• Eddagala ly'oba okozesa kati\n" +
      "• Empapula z'omusawo (bw'oba osinziira awamu)"
    );
  }
  return (
    "📅 **Booking an Appointment at LMMC**\n\n" +
    "We welcome walk-in visits during our operating hours — no appointment is required.\n\n" +
    "**Operating hours:**\n" +
    "Monday – Friday: 8:00 AM – 6:00 PM\n" +
    "Saturday: 9:00 AM – 2:00 PM\n" +
    "Sunday: Closed (except emergencies)\n\n" +
    "To book a specific time slot, please call us directly:\n" +
    "☎️ **+256 772 590 967** (Senior Midwife / Founder)\n" +
    "💬 **+256 741 008 049** (WhatsApp)\n\n" +
    "**What to bring:**\n" +
    "• Health card (if you have one)\n" +
    "• Current medications\n" +
    "• Referral documents (if applicable)"
  );
}

// ──────────────────────────────────────────────────────────
// Main handler
// ──────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const clientIP =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(clientIP)) {
    return new Response(
      JSON.stringify({ error: true, reply: "Too many requests. Please wait a moment and try again." }),
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" } }
    );
  }

  try {
    const rawBody = await req.json();

    // Validate input
    const result = validatePayload(rawBody);
    if (typeof result === "string") {
      return new Response(
        JSON.stringify({ error: true, reply: result }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages, language } = result;
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content || "";
    const sessionId = req.headers.get("x-session-id") || null;

    // ── Step 1: Intent routing (cheap Haiku call) ──
    const intent = await routeIntent(lastUserMessage);

    // ── Step 2: Emergency — fail-closed, no model call ──
    if (intent === "emergency") {
      await writeEscalation(sessionId, "emergency_detected", lastUserMessage, intent);
      return new Response(
        JSON.stringify({ reply: emergencyResponse(language) }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── Step 3: Out of scope — no model call ──
    if (intent === "out_of_scope") {
      return new Response(
        JSON.stringify({ reply: outOfScopeResponse(language) }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── Step 3b: Booking — fixed template, no model call ──
    // LMMC does not have an online booking system. The template directs
    // patients to call/WhatsApp the clinic and lists walk-in hours.
    if (intent === "booking") {
      return new Response(
        JSON.stringify({ reply: bookingResponse(language) }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // ── Step 4: Main model call with tool use ──
    const formattedMessages = messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    let response = await bedrock.messages.create({
      model: MAIN_MODEL,
      max_tokens: 600,
      system: systemPromptForLanguage(language),
      messages: formattedMessages,
      tools: [FORMULARY_TOOL],
    });

    // ── Step 5: Tool-use loop ──
    let rounds = 0;
    while (response.stop_reason === "tool_use" && rounds < MAX_TOOL_ROUNDS) {
      rounds++;

      const toolResults: Array<{
        type: "tool_result";
        tool_use_id: string;
        content: string;
      }> = [];

      for (const block of response.content) {
        if (block.type === "tool_use" && block.name === "search_formulary") {
          const input = block.input as { query: string; category?: string };
          const results = await searchFormulary(input.query, input.category);

          toolResults.push({
            type: "tool_result",
            tool_use_id: block.id,
            content:
              results.length > 0
                ? JSON.stringify(results)
                : JSON.stringify({ message: "No matching items found in the formulary.", query: input.query }),
          });
        }
      }

      if (toolResults.length === 0) break;

      response = await bedrock.messages.create({
        model: MAIN_MODEL,
        max_tokens: 600,
        system: systemPromptForLanguage(language),
        messages: [
          ...formattedMessages,
          { role: "assistant" as const, content: response.content },
          { role: "user" as const, content: toolResults },
        ],
        tools: [FORMULARY_TOOL],
      });
    }

    // ── Step 6: Extract text response ──
    const reply = response.content
      .filter((b): b is { type: "text"; text: string } => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    if (!reply) {
      throw new Error("Model returned no text content");
    }

    // ── Step 7: Apply Bedrock Guardrails ──
    const guardrailResult = await applyGuardrail(reply);

    if (guardrailResult.blocked) {
      await writeEscalation(sessionId, "guardrail_blocked", lastUserMessage, intent);
    }

    return new Response(
      JSON.stringify({ reply: guardrailResult.output }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Chat function error:", e);
    return new Response(
      JSON.stringify({
        error: true,
        reply:
          "I'm having trouble connecting right now. Please try again shortly, or WhatsApp us at ☎️ +256 741 008 049.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
