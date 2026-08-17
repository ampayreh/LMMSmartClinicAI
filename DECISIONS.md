# Architectural Decisions

Non-obvious choices in this codebase, with rationale. Each section explains
what was chosen, what was rejected, and why.

---

## 1. Formulary retrieval: Postgres full-text search + trigram, not embeddings

**Chosen:** `tsvector` full-text search with `pg_trgm` trigram fallback.

**Rejected:** Embedding-based semantic search (pgvector, FAISS, Bedrock Knowledge Bases).

**Why:** The formulary is a ~40-row structured catalogue of drug names, categories,
and prices. Users search by drug name ("paracetamol"), brand ("P-Alaxin"), or category
("family planning"). These are lexical lookups with a known, bounded vocabulary — not
open-ended semantic queries against unstructured text.

Embedding search adds cost (embedding model calls), latency (vector distance
computation), and operational complexity (index rebuilds on catalogue updates) for a
problem where exact and fuzzy string matching already achieves near-perfect recall.
The trigram fallback handles typos ("paracetamole") that full-text search misses.

Bedrock Knowledge Bases were additionally ruled out because their default backend
(OpenSearch Serverless) has a 2-OCU minimum at $345.60/month — orders of magnitude
more than this application's total infrastructure cost. This decision would change if
the formulary grew to thousands of items with free-text descriptions requiring
semantic understanding.

---

## 2. Intent router: separate Haiku call, not implicit tool routing

**Chosen:** A dedicated, cheap classifier (Claude Haiku via Bedrock, structured output)
that runs before the main model call and produces a strict enum:
`general_info | formulary_lookup | booking | emergency | out_of_scope`.

**Rejected:** Letting the main model (Sonnet) implicitly route by choosing whether to
call the formulary tool.

**Why:** The router exists for three reasons, in order of importance:

1. **Emergency fail-close.** When the router classifies `emergency`, no generative
   model call happens — the user gets a fixed template with the clinic's emergency
   number, and an escalation row is written to the database. This is not a guardrail
   (which acts on model output after generation); it is a structural bypass that
   prevents the model from generating a response at all. A model that is generating
   cannot be guaranteed to follow an "always say X for emergencies" instruction with
   the reliability a medical context demands.

2. **Cost control.** `out_of_scope` messages (weather, sports, homework) skip the
   expensive Sonnet call entirely. At Haiku pricing (~$0.80/M input + $4/M output
   for Haiku 4.5), the router costs roughly 1/10th of a Sonnet call. For a clinic
   chatbot serving a community with limited budgets, this matters.

3. **Observability.** The intent classification is logged and queryable, making it
   possible to audit what types of questions the chatbot receives without reading
   full transcripts. This is a prerequisite for the clinical-safety eval (Phase 1.6).

The formulary tool remains available to the main model regardless of the router's
classification, so if the router misclassifies a pricing question as `general_info`,
the model can still self-correct by calling the tool.

---

## 3. Bedrock Guardrails: applied to output, not inline with generation

**Chosen:** The `ApplyGuardrail` API is called on the model's text output as a
separate step after generation completes.

**Rejected:** Passing the guardrail configuration inline with the model invocation
(the Converse API's `guardrailConfig` parameter).

**Why:** Decoupling the guardrail from the model call has three advantages:

1. **Provider independence.** The guardrail evaluates text, not a model response
   object. If the model provider changes (or if a local model is used for testing),
   the guardrail still works.

2. **Explicit visibility.** The guardrail check is a named function call in the code
   (`applyGuardrail`), not a parameter buried in the model invocation. A code reviewer
   can see exactly what happens when the guardrail fires (the escalation row is
   written, the blocked response is returned).

3. **Graceful degradation.** If the guardrail service errors (network timeout,
   misconfiguration), the model response still reaches the user. A broken guardrail
   should not prevent a patient from getting clinic hours or directions. The error is
   logged for operational review. This is a conscious tradeoff: for a community clinic
   chatbot, availability outweighs the risk of an unguarded response reaching the user
   when the guardrail service itself is down.

The guardrail is configured in Bedrock with denied topics (diagnosis, dosage
prescription) and content filters. See the deployment guide for setup instructions.

---

## 4. Emergency pathway: template, not generation

**Chosen:** Emergency-classified messages produce a hardcoded template with the
clinic's emergency phone numbers. No model generates the response.

**Rejected:** Having the model generate an emergency response with a strong system
prompt instruction.

**Why:** A generated response can hedge, add caveats, include irrelevant information,
or fail to include the phone number in a prominent position. When someone is
describing chest pain or severe bleeding, the response must be exactly: the emergency
instruction, the phone number, and nothing else. A template guarantees this.

The emergency classification itself uses a model (the intent router), which introduces
false-negative risk — a genuine emergency misclassified as `general_info`. This is
mitigated in two ways:

1. The system prompt for the main model still contains the emergency instruction as a
   fallback, so even if the router misses, the model is likely to respond appropriately.

2. The router's classification prompt biases toward `emergency` for ambiguous cases
   involving symptoms. False positives (non-emergencies classified as emergencies)
   are acceptable — the user sees the phone number and can call or re-ask. False
   negatives are the dangerous case.

---

## 5. Model selection: configurable via environment variables

**Chosen:** Model IDs are read from `ROUTER_MODEL` and `MAIN_MODEL` environment
variables with sensible defaults (Haiku 4.5 for routing, Sonnet 4 for generation).

**Why:** Bedrock model IDs change as new versions are released. Hardcoding them means
redeploying the Edge Function for every model update. Environment variables allow the
model to be upgraded (e.g., from Sonnet 4 to Sonnet 5) by changing a Supabase secret,
without touching the code.

The defaults are conservative — Sonnet 4 is well-tested for tool use and instruction
following. The upgrade path to newer models is: change the env var, run the eval suite
(Phase 1.6), confirm no regressions, promote.

---

## 6. Prices in the database, not the system prompt

**Chosen:** Drug and service prices live in the `formulary` Postgres table and are
retrieved via the `search_formulary` tool at query time.

**Rejected:** Hardcoding prices in the system prompt (the pre-Phase-1 design).

**Why:**

1. **Single source of truth.** When a price changes, it is updated in one place (the
   database row). The system prompt does not need to be redeployed.

2. **Auditability.** The `updated_at` column records when each price was last changed.
   The system prompt approach had no way to distinguish stale prices from current ones.

3. **Grounded responses.** The model quotes prices from the tool's returned data, not
   from its context window. This eliminates the risk of the model "remembering" a
   price from training data that differs from the prompt. The eval suite (Phase 1.6)
   includes a `price-accuracy` test case that verifies the model's quoted price
   matches the database value.

4. **Portfolio demonstration.** This is a genuine retrieval-grounded architecture —
   the model cannot answer pricing questions without calling the tool, and the tool
   returns live data from a real database. The distinction between "retrieval-
   augmented" (embedding-based) and "retrieval-grounded" (structured lookup) is
   intentional; see Decision §1.

---

## 7. Escalation table design: best-effort write, not blocking

**Chosen:** The escalation row is written asynchronously after the emergency template
is returned. If the write fails, the error is logged but the template still goes out.

**Rejected:** Making the escalation write a prerequisite for the response (fail if the
database is down).

**Why:** The escalation exists so a staff member can follow up. The emergency template
exists so the patient gets the phone number immediately. If the database is temporarily
unavailable, the patient still needs the phone number. Blocking the response on a
database write inverts the priority: the operational record becomes more important
than the patient's immediate access to emergency contact information.

The tradeoff is that a database outage could cause missed escalation records. This is
mitigated by the Edge Function's error logging (Supabase logs are retained and
alertable) and by the fact that genuine emergencies will also produce a phone call,
which is the primary escalation channel regardless.
