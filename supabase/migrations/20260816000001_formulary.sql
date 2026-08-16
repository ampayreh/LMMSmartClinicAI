-- Formulary table: the clinic's drug catalogue and service price list.
-- Prices are illustrative placeholders for this public repository and do not
-- reflect the clinic's actual live pricing. See DECISIONS.md §1 for rationale.

CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE formulary (
  id            SERIAL PRIMARY KEY,
  generic_name  TEXT NOT NULL,
  brand_name    TEXT,
  form          TEXT NOT NULL,             -- tablet, capsule, syrup, injection, test, service, device
  strength      TEXT,                      -- e.g. '500mg', '60ml', NULL for services
  unit_price_ugx INTEGER NOT NULL,
  pack_size     TEXT,                      -- e.g. 'per tab', '9-tab course', 'per test'
  category      TEXT NOT NULL,
  in_stock      BOOLEAN NOT NULL DEFAULT true,
  notes         TEXT,
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Generated full-text search vector for fast lexical lookup
  search_vector TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english',
      coalesce(generic_name, '') || ' ' ||
      coalesce(brand_name, '')  || ' ' ||
      coalesce(category, '')    || ' ' ||
      coalesce(notes, '')       || ' ' ||
      coalesce(form, ''))
  ) STORED
);

-- Indexes for search
CREATE INDEX idx_formulary_fts     ON formulary USING gin(search_vector);
CREATE INDEX idx_formulary_cat     ON formulary(category);
CREATE INDEX idx_formulary_name_trgm  ON formulary USING gin(generic_name gin_trgm_ops);
CREATE INDEX idx_formulary_brand_trgm ON formulary USING gin(brand_name gin_trgm_ops);

-- RLS: anyone can read, only service role can write
ALTER TABLE formulary ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON formulary FOR SELECT USING (true);

-- Fuzzy search fallback function (trigram similarity)
CREATE OR REPLACE FUNCTION search_formulary_fuzzy(
  search_term   TEXT,
  category_filter TEXT DEFAULT NULL
)
RETURNS SETOF formulary
LANGUAGE plpgsql SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT f.*
  FROM formulary f
  WHERE f.in_stock = true
    AND (category_filter IS NULL OR f.category = category_filter)
    AND (
      f.generic_name % search_term
      OR f.brand_name % search_term
    )
  ORDER BY
    GREATEST(
      similarity(f.generic_name, search_term),
      COALESCE(similarity(f.brand_name, search_term), 0)
    ) DESC
  LIMIT 10;
END;
$$;

-- ============================================================
-- Seed data: illustrative placeholder prices
-- NOTE: These are NOT the clinic's real prices. They exist so
-- the search_formulary tool returns realistic-looking results
-- for portfolio demonstration purposes.
-- ============================================================

INSERT INTO formulary (generic_name, brand_name, form, strength, unit_price_ugx, pack_size, category, notes) VALUES
  -- Diagnostics
  ('Malaria Rapid Diagnostic Test', NULL, 'test', NULL, 6000, 'per test', 'diagnostics', 'RDT for malaria detection'),
  ('HIV Rapid Test', NULL, 'test', NULL, 6000, 'per test', 'diagnostics', 'Confidential rapid diagnostic test'),
  ('Syphilis RPR Test', NULL, 'test', NULL, 6000, 'per test', 'diagnostics', 'Rapid plasma reagin test'),
  ('Pregnancy Test (HCG)', NULL, 'test', NULL, 3000, 'per test', 'diagnostics', 'Urine HCG pregnancy test'),
  ('H. Pylori Test', NULL, 'test', NULL, 6000, 'per test', 'diagnostics', 'Rapid antigen test'),
  ('Blood Sugar Test', NULL, 'test', NULL, 6000, 'per test', 'diagnostics', 'Random blood glucose'),

  -- Antimalarials
  ('Artemether-Lumefantrine', 'P-Alaxin', 'tablet', '80/480mg', 26000, '9-tab course', 'antimalarial', 'First-line ACT for uncomplicated malaria in adults'),
  ('Artemether-Lumefantrine', 'Lonart', 'tablet', '80/480mg', 24000, '6-tab course', 'antimalarial', 'Alternative ACT for uncomplicated malaria'),
  ('Artemether-Lumefantrine', 'P-Alaxin', 'syrup', '60ml', 2000, 'per bottle', 'antimalarial', 'Paediatric antimalarial suspension'),

  -- Antibiotics
  ('Amoxicillin', NULL, 'capsule', '500mg', 250, 'per cap', 'antibiotic', 'Broad-spectrum penicillin antibiotic'),
  ('Azithromycin', NULL, 'tablet', '500mg', 3500, 'per tab', 'antibiotic', 'Macrolide antibiotic'),
  ('Doxycycline', NULL, 'capsule', '100mg', 300, 'per cap', 'antibiotic', 'Tetracycline antibiotic'),
  ('Metronidazole', NULL, 'tablet', '400mg', 6500, 'per course', 'antibiotic', 'Antiprotozoal and anaerobic antibiotic'),

  -- Analgesics / Pain
  ('Paracetamol', NULL, 'tablet', '500mg', 300, 'per tab', 'analgesic', 'Antipyretic and mild analgesic'),
  ('Ibuprofen', NULL, 'tablet', '400mg', 150, 'per tab', 'analgesic', 'NSAID anti-inflammatory'),
  ('Diclofenac', NULL, 'injection', '75mg/3ml', 150, 'per ampoule', 'analgesic', 'Injectable NSAID for acute pain'),
  ('Tramadol', NULL, 'injection', '100mg/2ml', 6000, 'per ampoule', 'analgesic', 'Opioid analgesic for moderate-severe pain'),

  -- Antihypertensives
  ('Amlodipine', NULL, 'tablet', '5mg', 600, 'per tab', 'antihypertensive', 'Calcium channel blocker'),
  ('Losartan', NULL, 'tablet', '50mg', 1200, 'per tab', 'antihypertensive', 'ARB antihypertensive'),
  ('Nifedipine', NULL, 'tablet', '20mg', 600, 'per tab', 'antihypertensive', 'Calcium channel blocker'),

  -- Antidiabetics
  ('Metformin', NULL, 'tablet', '500mg', 600, 'per tab', 'antidiabetic', 'First-line oral hypoglycaemic'),
  ('Glibenclamide', NULL, 'tablet', '5mg', 300, 'per tab', 'antidiabetic', 'Sulfonylurea oral hypoglycaemic'),

  -- Family planning
  ('Levonorgestrel-Ethinylestradiol', 'Lydia', 'tablet', NULL, 3500, 'per month', 'family_planning', 'Combined oral contraceptive pill'),
  ('Medroxyprogesterone', 'Depo-Provera', 'injection', '150mg', 6000, 'per 3 months', 'family_planning', 'Injectable contraceptive'),
  ('Etonogestrel implant', 'Implanon', 'implant', NULL, 22000, 'per device', 'family_planning', 'Single-rod subdermal implant, 3 years'),
  ('Levonorgestrel implant', 'Jadelle', 'implant', NULL, 27000, 'per device', 'family_planning', 'Two-rod subdermal implant, 5 years'),
  ('Copper IUD', NULL, 'device', NULL, 32000, 'per device', 'family_planning', 'Intrauterine contraceptive device, 10 years'),
  ('Levonorgestrel', 'Postinor-2', 'tablet', '1.5mg', 6000, 'per dose', 'family_planning', 'Emergency contraception within 72 hours'),

  -- Maternal care services
  ('ANC First Visit', NULL, 'service', NULL, 33000, 'per visit', 'maternal_care', 'Initial antenatal consultation and screening, 28000-38000 range'),
  ('ANC Registration Card', NULL, 'service', NULL, 5000, 'per card', 'maternal_care', 'Antenatal care registration'),
  ('ANC Follow-up Visit', NULL, 'service', NULL, 15000, 'per visit', 'maternal_care', 'Subsequent antenatal visits, 12000-18000 range'),
  ('Mama Kit', NULL, 'kit', NULL, 28000, 'per kit', 'maternal_care', 'Delivery essentials kit'),

  -- IV Fluids
  ('Dextrose 5%', NULL, 'infusion', '500ml', 7000, 'per bottle', 'iv_fluids', 'Intravenous dextrose solution'),
  ('Normal Saline', NULL, 'infusion', '500ml', 7000, 'per bottle', 'iv_fluids', 'Sodium chloride 0.9% IV solution'),
  ('Ringers Lactate', NULL, 'infusion', '500ml', 7000, 'per bottle', 'iv_fluids', 'Balanced crystalloid IV solution'),

  -- Sundries
  ('Surgical Gloves', NULL, 'supply', NULL, 2500, 'per pair', 'sundries', 'Sterile latex surgical gloves'),
  ('Surgical Sutures', NULL, 'supply', NULL, 6000, 'per unit', 'sundries', 'Absorbable suture material'),
  ('Disposable Syringe', NULL, 'supply', '5ml', 900, 'per unit', 'sundries', 'Single-use syringe, 600-1200 range by size'),

  -- Consultation
  ('OPD Consultation', NULL, 'service', NULL, 15000, 'per visit', 'consultation', 'Outpatient department general consultation, 12000-18000 range');
