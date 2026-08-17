#!/usr/bin/env bash
# Create the Bedrock Guardrail for the LMMC Smart Clinic Assistant.
#
# Prerequisites:
#   - AWS CLI v2 configured with credentials that have bedrock:* permissions
#   - Claude model access enabled in the target region
#
# After creation, set the guardrail ID as a Supabase secret:
#   supabase secrets set BEDROCK_GUARDRAIL_ID=<id> BEDROCK_GUARDRAIL_VERSION=DRAFT
#
# Estimated cost: ~$0.75 per 1,000 text units (1 unit = up to 1,000 chars).
# At typical clinic chatbot volume (<500 messages/day), this is <$1/month.

set -euo pipefail

REGION="${AWS_REGION:-us-east-1}"

echo "Creating Bedrock Guardrail in region: $REGION"

GUARDRAIL_RESPONSE=$(aws bedrock create-guardrail \
  --region "$REGION" \
  --name "lmmc-clinic-assistant" \
  --description "Content guardrail for the LMMC Smart Clinic Assistant. Blocks medical diagnosis and prescription attempts in model output." \
  --topic-policy-config '{
    "topicsConfig": [
      {
        "name": "medical-diagnosis",
        "definition": "Statements that diagnose a medical condition, identify a disease, or tell the patient what illness they have based on symptoms described.",
        "type": "DENY",
        "examples": [
          "Based on your symptoms, you have malaria.",
          "This sounds like typhoid fever.",
          "You are likely suffering from hypertension.",
          "Your symptoms suggest a urinary tract infection."
        ]
      },
      {
        "name": "prescription-dosage",
        "definition": "Statements that prescribe a specific medication with a specific dosage, tell the patient how much medicine to take, or recommend a specific treatment regimen.",
        "type": "DENY",
        "examples": [
          "Take 2 tablets of P-Alaxin twice daily for 3 days.",
          "You should take 500mg of amoxicillin every 8 hours.",
          "I recommend starting with 5mg of amlodipine daily.",
          "Use metronidazole 400mg three times a day for 7 days."
        ]
      }
    ]
  }' \
  --content-policy-config '{
    "filtersConfig": [
      {"type": "SEXUAL", "inputStrength": "HIGH", "outputStrength": "HIGH"},
      {"type": "VIOLENCE", "inputStrength": "HIGH", "outputStrength": "MEDIUM"},
      {"type": "HATE", "inputStrength": "HIGH", "outputStrength": "HIGH"},
      {"type": "INSULTS", "inputStrength": "HIGH", "outputStrength": "HIGH"},
      {"type": "MISCONDUCT", "inputStrength": "HIGH", "outputStrength": "HIGH"},
      {"type": "PROMPT_ATTACK", "inputStrength": "HIGH", "outputStrength": "NONE"}
    ]
  }' \
  --blocked-input-messaging "I can only help with questions about Lynda Michelle Medical Centre's services. Please ask about our services, hours, or how to reach us." \
  --blocked-output-messaging "I'm unable to provide that type of medical advice. For diagnosis or treatment, please visit the clinic or call +256 741 008 049." \
  --output json)

GUARDRAIL_ID=$(echo "$GUARDRAIL_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin)['guardrailId'])")

echo ""
echo "Guardrail created successfully!"
echo "  Guardrail ID: $GUARDRAIL_ID"
echo "  Version: DRAFT"
echo ""
echo "Set as Supabase secrets:"
echo "  supabase secrets set BEDROCK_GUARDRAIL_ID=$GUARDRAIL_ID BEDROCK_GUARDRAIL_VERSION=DRAFT"
echo ""
echo "To test before deploying:"
echo "  aws bedrock-runtime apply-guardrail \\"
echo "    --region $REGION \\"
echo "    --guardrail-identifier $GUARDRAIL_ID \\"
echo "    --guardrail-version DRAFT \\"
echo "    --source OUTPUT \\"
echo "    --content '[{\"text\": {\"text\": \"Take 2 tablets of P-Alaxin twice daily.\"}}]'"
