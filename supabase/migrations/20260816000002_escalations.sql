-- Escalation log: records emergency detections and explicit escalation
-- requests so a human can follow up. See DECISIONS.md §4 for the
-- fail-closed emergency design rationale.

CREATE TABLE escalations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id       TEXT,                    -- client-side session identifier (opaque)
  trigger_reason   TEXT NOT NULL,           -- 'emergency_detected' | 'user_requested' | 'guardrail_blocked'
  transcript_excerpt TEXT,                  -- the triggering message(s), truncated
  router_intent    TEXT,                    -- the intent classification that triggered this
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  acknowledged_at  TIMESTAMPTZ,            -- set when a staff member reviews
  acknowledged_by  TEXT                     -- name or identifier of reviewer
);

-- Index for unacknowledged escalations (the operational query)
CREATE INDEX idx_escalations_unacked
  ON escalations(created_at DESC)
  WHERE acknowledged_at IS NULL;

-- RLS: service role can write; authenticated staff can read/update
ALTER TABLE escalations ENABLE ROW LEVEL SECURITY;

-- The Edge Function uses the service role key, which bypasses RLS.
-- For future dashboard access, add authenticated read policies here.
