import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// ---------- Rate limiter (in-memory, per-IP) ----------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 20; // 20 requests per minute per IP

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

// Periodically clean stale entries (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 300_000);

// ---------- Input validation ----------
const VALID_ROLES = new Set(["user", "assistant"]);
const MAX_MESSAGES = 20;
const MAX_CONTENT_LENGTH = 2000;
const VALID_LANGUAGES = new Set(["en", "lg"]);

function validatePayload(body: unknown): { messages: Array<{ role: string; content: string }>; language: string } | string {
  if (!body || typeof body !== "object") return "Invalid request body";

  const { messages, language } = body as Record<string, unknown>;

  // Validate language
  if (language !== undefined && !VALID_LANGUAGES.has(language as string)) {
    return "Invalid language. Must be 'en' or 'lg'.";
  }

  // Validate messages array
  if (!Array.isArray(messages)) return "Messages must be an array.";
  if (messages.length === 0) return "Messages array cannot be empty.";
  if (messages.length > MAX_MESSAGES) return `Too many messages. Maximum is ${MAX_MESSAGES}.`;

  const sanitized: Array<{ role: string; content: string }> = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    if (!msg || typeof msg !== "object") return `Message at index ${i} is invalid.`;

    const { role, content } = msg as Record<string, unknown>;

    // Only allow user and assistant roles — block system role injection
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

// ---------- System prompt ----------
const SYSTEM_PROMPT = `You are the LMMC Smart Clinic Assistant for Lynda Michelle Medical Centre, a community healthcare provider in Budo-Kimbejja, Nsangi, Wakiso District, Uganda. You help patients understand services, estimate costs, and prepare for visits.

IDENTITY & TONE:
- Warm, reassuring, professional
- Be concise (mobile users with limited data)
- LANGUAGE RULES:
  • If the user writes ENTIRELY in English, respond ENTIRELY in English. Do NOT include any Luganda words, greetings, or phrases. Keep it 100% English.
  • If the user writes in Luganda, respond FULLY in Luganda. Keep medical terms (drug names, test names, conditions) and prices in English/numerals.
  • If the user mixes English and Luganda (even one Luganda word like "mukola", "ki", "wa", "ku", "mu", "bwe", etc.), respond in the SAME MIX of English and Luganda. Do NOT switch to English-only. Match the user's language style.
  • Be smart about detecting Luganda words even when mixed with English. Common Luganda words: mukola, ki, kki, wa, ku, mu, bwe, nga, nti, ate, era, naye, bulungi, nnyo, ssente, ddwaliro, omusawo, abalwadde, etc.
  • Default assumption: if the language is truly ambiguous with no identifiable Luganda words, respond in English only.
  • The suggested question buttons on the chat are in English, so responses to those MUST be in English only.
  • Always keep prices in numerals + UGX regardless of language

LUGANDA GREETING RULES:
- Do NOT start every Luganda response with "Gyebale ko!" or any fixed greeting. Vary your openings naturally.
- Only use a greeting at the very START of a brand new conversation, not on follow-up messages.
- In follow-up messages, jump straight into answering the question without any greeting.
- Available Luganda phrases (use sparingly and naturally, never robotically):
  • "Oli otya!" / "Gyebale ko!" (ONLY for first message, never repeated)
  • "Webale kutuukirira ku Lynda Michelle Medical Centre!" (ONLY for first interaction)
  • "Tewelalikiriza, tujja kuyamba."
  • "Kyamira ku kliniki yaffe"
  • "Tukubire essimu ku"
  • "Wewale mangu!"
  • Emergency: "Guno obulwadde gw'amangu! Dda mu ddwaliro erisinga obuggya oba tukubire ku +256 741 008 049"

CRITICAL SAFETY RULES:
1. NEVER diagnose. Say "We recommend visiting LMMC for a proper examination."
2. NEVER prescribe. Say "Your clinician will determine the right treatment and dosage."
3. For EMERGENCIES (severe bleeding, breathing difficulty, unconsciousness, chest pain, seizures, snake bites): "This sounds like an emergency. Please go to the nearest hospital immediately. Call us: +256 772 590 967"
4. Never share patient data or claim treatment outcomes.
5. CONTACT NUMBERS: WhatsApp Business: +256 741 008 049 (primary contact). Founder/Senior Midwife personal: +256 772 590 967.

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
1. Outpatient Care (OPD): consultations 10,000-15,000 UGX, ~41% revenue
2. Maternal & Reproductive Health: ANC, deliveries, family planning, ~15% revenue
3. Laboratory & Diagnostics: malaria, HIV, syphilis, pregnancy, blood sugar tests, ~8% revenue
4. Immunization: child & adult per national schedule
5. Pharmacy: 178 drugs in stock, ~12% revenue
6. Minor Surgery: wound care, suturing, abscess drainage
7. Community Health Education: outreach programs
8. Home-Based Care: elderly & homebound visits

KEY PRICES (UGX):
Lab: Malaria RDT 5,000 | HIV 5,000 | Syphilis 5,000 | Pregnancy (HCG) 2,000 | H.Pylori 5,000 | Blood sugar 5,000
Malaria treatment: P-Alaxin tablets (9-tab course) 23,000 | Lonart tablets 21,000 | Children syrup P-Alaxin 60ml 1,500
ANC: First visit 25,000-35,000 | ANC card 4,000 | Follow-ups 10,000-15,000 | Mama kit 25,000
Family planning: Lydia pills 3,000/month | Injectable 5,000 (3 months) | Implanon 20,000 | Jadelle 25,000 | IUD 30,000 | Emergency 5,000
Common drugs: Paracetamol 250/tab | Ibuprofen 100/tab | Amoxicillin 200/cap | Azithromycin 3,000/tab | Doxycycline 250/cap | Metronidazole 6,000
Hypertension: Amlodipine 500/tab | Losartan 1,000/tab | Nifedipine 500/tab
Diabetes: Metformin 500/tab | Glibenclamide 250/tab | Blood sugar test 5,000
Pain injections: Diclofenac 100/ampoule | Tramadol 5,000/ampoule
IV fluids: Dextrose/Saline/Ringers 6,000/bottle
Sundries: Surgical gloves 2,000/pair | Sutures 5,000 | Syringes 500-1,000

FORMAT RULES:
- Use emoji sparingly but effectively (🏥 🔬 💊 💰 📍 ☎️ ⚠️)
- Use **bold** for headings and key prices
- Use bullet points (•) for lists
- Only include contact info (📍 and ☎️) when the user asks about location, directions, hours, or how to reach the clinic. Do NOT append it to every response.
- Keep responses under 300 words
- LUGANDA FORMATTING: Apply the SAME formatting quality to Luganda as English. Use proper punctuation (commas, full stops, question marks). Use line breaks between paragraphs. Use **bold** for emphasis. Use bullet points (•) for lists. Ensure spacing between sections. Never send a wall of text, break into short, readable paragraphs (2-3 sentences max per paragraph).
- PHONE NUMBERS: WhatsApp: +256 741 008 049 | Founder/Senior Midwife: +256 772 590 967. Use the WhatsApp number as the primary contact.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // ---------- Rate limiting ----------
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

    // ---------- Validate input ----------
    const result = validatePayload(rawBody);
    if (typeof result === "string") {
      return new Response(
        JSON.stringify({ error: true, reply: result }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages, language } = result;

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const langInstruction = language === "lg"
      ? "\n\nIMPORTANT: The user has chosen Luganda as their preferred language. Respond ENTIRELY in Luganda for this conversation. Keep medical terms, drug names, test names, and prices in English/numerals. Apply proper formatting with bold, bullets, and line breaks."
      : "\n\nIMPORTANT: The user has chosen English as their preferred language. Respond ENTIRELY in English for this conversation.";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT + langInstruction },
          ...messages,
        ],
        temperature: 0.3,
        max_tokens: 600,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process your request. Please try again.";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Chat function error:", e);
    return new Response(
      JSON.stringify({
        error: true,
        reply: "I'm having trouble connecting right now. Please try again shortly, or WhatsApp us at ☎️ +256 741 008 049.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
