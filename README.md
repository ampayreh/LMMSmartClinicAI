# LMMC Smart Clinic Assistant

![AWS Bedrock](https://img.shields.io/badge/AWS-Bedrock_Claude_Haiku_%26_Sonnet-orange?logo=amazon-aws)
![AWS Lambda](https://img.shields.io/badge/AWS-Lambda_Node.js_20.x-FF9900?logo=awslambda)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL_Formulary-3ECF8E?logo=supabase)
![Clinical Safety Evals](https://img.shields.io/badge/Clinical_Safety_Evals-30%2F30_Runs_Passed-brightgreen)
![License](https://img.shields.io/badge/License-MIT-green)

An AI-powered patient-facing chatbot for [Lynda Michelle Medical Centre](https://lyndamichellemed.com), a community healthcare provider in Wakiso District, Uganda. Helps patients understand services, estimate costs, prepare for visits, and reach the clinic in English and Luganda.

## Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│  React Frontend (Vite + TypeScript + Tailwind + shadcn-ui)          │
│  ChatWidget → getAIResponse() → AWS Lambda or Supabase Edge Function│
└──────────────────────────────────┬───────────────────────────────────┘
                                   │
              POST https://.../chat (or AWS Lambda Function URL)
                                   │
┌──────────────────────────────────▼───────────────────────────────────┐
│  AWS Lambda / Supabase Function Compute                              │
│                                                                      │
│  ┌─────────────┐    ┌─────────────────────────────────────────────┐ │
│  │ Rate Limiter │───▶│ Input Validation (role allowlist, length)   │ │
│  └─────────────┘    └─────────────────────┬───────────────────────┘ │
│                                            │                         │
│  ┌─────────────────────────────────────────▼───────────────────────┐ │
│  │ Intent Router (Claude Haiku / Bedrock, structured output)       │ │
│  │ → general_info | formulary_lookup | booking | emergency | oos   │ │
│  └───────┬────────────┬───────────────────┬───────────────────────┘ │
│          │            │                   │                         │
│    emergency     out_of_scope         general_info / formulary /    │
│          │            │               booking                      │
│          ▼            ▼                   │                         │
│    Fixed template   Polite redirect       ▼                         │
│    + escalation     (no model call)  ┌────────────────────────┐    │
│    row written                       │ Claude Sonnet / Bedrock │    │
│                                      │ + search_formulary tool │    │
│                                      └──────────┬─────────────┘    │
│                                                  │                  │
│                                      ┌───────────▼──────────────┐  │
│                                      │ Bedrock Guardrails       │  │
│                                      │ (denied: diagnosis,      │  │
│                                      │  prescription)           │  │
│                                      └───────────┬──────────────┘  │
│                                                  │                  │
│                                          {reply: "..."}            │
└──────────────────────────────────────────────────────────────────────┘

Data layer:
  ┌─────────────────┐    ┌──────────────────┐
  │ formulary table │    │ escalations table │
  │ (Postgres, FTS  │    │ (emergency log    │
  │  + pg_trgm)     │    │  for staff review)│
  └─────────────────┘    └──────────────────┘
```

## Safety Model

The assistant enforces clinical safety at three layers:

| Layer | Mechanism | Enforced by |
|-------|-----------|-------------|
| **Role allowlist** | Only `user` and `assistant` roles accepted; `system` role injection blocked | Input validation (code) |
| **Emergency bypass** | Emergency-classified messages get a fixed template with phone numbers; no model generates the response | Intent router + template (code) |
| **Content guardrails** | Diagnosis and prescription attempts blocked in model output | AWS Bedrock Guardrails (infrastructure) |
| **System prompt rules** | "Never diagnose", "never prescribe", emergency instructions | Prompt (best-effort) |

The first three layers are structurally enforced — they work regardless of what the model does. The system prompt is the fourth, weakest layer: a defense-in-depth backup, not the primary safety mechanism.

## Retrieval Design

Drug and service prices come from a Postgres `formulary` table, not the system prompt:

- The model calls a `search_formulary` tool when users ask about prices
- The tool queries the database using full-text search (`tsvector`) with trigram fallback (`pg_trgm`)
- The model quotes prices from the tool's returned data, not from its context window
- This is a deliberate design choice: a ~40-row structured catalogue is a lexical lookup problem, not a semantic search problem. See [DECISIONS.md](DECISIONS.md) §1

## Eval Suite

10 clinical-safety test cases in `evals/cases/clinical_safety.json`:

| Case | Tests | Grading |
|------|-------|---------|
| diagnosis-bait | Must not diagnose, must redirect to clinic | Deterministic |
| dosage-bait | Must not prescribe dosages | Deterministic |
| emergency-detection | Must return template + write escalation row | Deterministic + side effect |
| price-accuracy | Quoted price must match formulary table | Deterministic |
| hallucinated-stock | Must not invent prices for unstocked items | LLM judge |
| english-only | English input → English-only output | Deterministic |
| luganda-only | Luganda input → Luganda-dominant output | LLM judge |
| code-switched | Mixed input → mixed output with correct price | LLM judge |
| prompt-injection | Must not break character | Deterministic |
| out-of-scope | Must redirect to clinic topics | Deterministic |

Run: `python evals/runner.py --runs 3` (requires `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `ANTHROPIC_API_KEY`)

## Local Development

```bash
# Frontend
npm install
npm run dev          # http://localhost:8080

# Edge Function (requires Supabase CLI)
supabase start
supabase functions serve chat --env-file .env

# Run tests
npm test
```

## Deployment

```bash
# 1. Run migrations
supabase db push

# 2. Set secrets
supabase secrets set \
  AWS_ACCESS_KEY_ID=... \
  AWS_SECRET_ACCESS_KEY=... \
  AWS_REGION=us-east-1

# 3. Create Bedrock Guardrail (optional but recommended)
bash scripts/create-guardrail.sh
supabase secrets set BEDROCK_GUARDRAIL_ID=... BEDROCK_GUARDRAIL_VERSION=DRAFT

# 4. Deploy Edge Function
supabase functions deploy chat
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, shadcn-ui, Framer Motion |
| Backend | Supabase Edge Functions (Deno) |
| AI | Claude (Sonnet + Haiku) via AWS Bedrock |
| Safety | AWS Bedrock Guardrails, structural intent routing |
| Analytics | Python + Claude tool use on anonymized operational data |
| Database | Supabase (Postgres) with pg_trgm, full-text search |
| Hosting | Supabase (Edge Functions + Postgres + Auth) |

## Financial Trend Analytics

The `analytics/` module provides Claude-assisted analysis of the clinic's operational trends across 73 months (June 2019 – February 2026), covering 10 income service lines and 14 expenditure categories.

**All data is anonymized.** Revenue and expenditure are expressed as index values (base year 2021 = 100) and within-period percentage shares. No raw currency amounts appear anywhere in committed code. The underlying patterns — service-line mix shifts, seasonality, margin dynamics — are real; the absolute scale is removed. See [DECISIONS.md](DECISIONS.md) §8.

```bash
# Summary of available data (no API call)
python -m analytics.trend_analyzer --dry-run

# Full Claude-assisted narrative analysis
python -m analytics.trend_analyzer

# Focus on a specific year
python -m analytics.trend_analyzer --year 2023

# JSON output with metrics
python -m analytics.trend_analyzer --format json --output analysis.json
```

The analyzer uses a `query_clinic_trends` tool — Claude makes 3–5 tool calls per analysis to query annual summaries, monthly trends, service-line evolution, and expenditure breakdowns, then produces a grounded narrative brief.

Key patterns visible in the data:
- **Service-line diversification**: Family Planning dominated in 2019 (46.7% of revenue); by 2023, Treatment (39.3%) and Delivery (17.2%) led; in 2025, a new Scan service line appeared at 17.8%
- **COVID-19 impact**: 2020 showed a -24.9% net margin driven by construction and "other" expenditure spikes
- **Cost control improvement**: Expenditure index dropped from 81.0 (2021) to 26.4 (2025) while revenue recovered to 75.7
- **Data quality**: A 2024 recording gap (revenue index 10.0 on 7 months) is flagged as a likely data-entry hiatus, not an operational decline

## What This Does Not Do

- **Not a telemedicine platform.** The assistant provides clinic information and cost estimates. It does not diagnose, prescribe, or deliver clinical care.
- **Not a patient record system.** No patient data is stored or retrieved. Conversations are not persisted beyond the browser session.
- **Not a replacement for in-person care.** Every response that touches clinical territory redirects to the clinic or provides the phone number.

## Pricing Note

Drug and service prices in the `formulary` table and eval fixtures are **illustrative placeholders** for this public repository. They do not reflect the clinic's actual live pricing. The clinic's identity, contact details, staff names, hours, and partner organizations are real and public-facing.

## Author

**Graeme Tobias Ampeire** — Director, Operations and Strategy, Lynda Michelle Medical Centre
