"""
Anonymized financial trend data for Lynda Michelle Medical Centre.

All figures are index values (base year 2021 = 100) and percentage shares.
No raw currency amounts appear anywhere in this file. The underlying
patterns — seasonality, service-line mix shifts, margin dynamics — are
real; the absolute scale is removed.

Data source: clinic operational records, June 2019 – February 2026.
Anonymization: each month's revenue and expenditure totals are divided by the
average monthly revenue in the base year (2021), then multiplied by 100 to
produce an index. Income and expenditure "mix" fields are within-period
percentage shares (they sum to ~100% within each period). Net margin is
(revenue - expenditure) / revenue × 100.

Data quality notes:
- 2019: partial year (7 months, June–December). Clinic's first year of
  operation; Family Planning revenue dominated due to an initial NGO-funded
  program.
- 2020: partial year (9 months). COVID-19 disruption visible in expenditure
  spike (construction + "other" categories).
- 2024: recording gap — only 7 months captured, revenue index abnormally low
  (10.0 vs. 73.0 in 2023). Likely reflects a data-entry hiatus, not an
  actual 86% revenue drop. Treat 2024 annual figures with caution.
- 2026: only January–February recorded at time of export.
"""

# Income service lines
INCOME_CATEGORIES = [
    "Consultation",       # outpatient doctor visits
    "Laboratory",         # diagnostic lab tests
    "Treatment",          # outpatient treatment/procedures (largest line)
    "Drugs",              # pharmacy dispensing
    "Antenatal",          # prenatal care visits
    "Delivery",           # maternity deliveries
    "Immunization",       # vaccination services
    "Family_Planning",    # contraceptives, counseling (NGO-supported early on)
    "PAC",                # post-abortion care
    "Scan",               # ultrasound/imaging (added 2025)
]

# Expenditure categories
EXPENDITURE_CATEGORIES = [
    "Drugs",              # pharmaceutical procurement (largest cost driver)
    "Food_Lunch",         # staff and patient meals
    "Labor",              # casual/contract labor
    "Salary",             # permanent staff salaries
    "Transport",          # logistics, ambulance, deliveries
    "Utilities",          # electricity, water, telecom
    "Stationery",         # office supplies
    "Sundries",           # miscellaneous consumables
    "Medical_Supplies",   # gloves, syringes, consumables
    "Maintenance",        # facility and equipment maintenance
    "Petty_Cash",         # small operational expenses
    "Construction",       # facility expansion/renovation
    "Owner_Withdrawal",   # proprietor draws
    "Other",              # uncategorized
]

# Annual summary — one record per calendar year
# revenue_index / expenditure_index: base year 2021 = 100 (full-year total)
# months_recorded: how many months have data in that year
ANNUAL_TRENDS = [
    {
        "year": 2019,
        "months_recorded": 7,
        "revenue_index": 70.9,
        "expenditure_index": 30.8,
        "net_margin_pct": 56.5,
        "income_mix": {
            "Laboratory": 4.3, "Treatment": 26.8, "Drugs": 10.4,
            "Antenatal": 3.2, "Delivery": 6.0, "Immunization": 2.6,
            "Family_Planning": 46.7,
        },
        "expenditure_mix": {
            "Drugs": 16.2, "Food_Lunch": 18.8, "Labor": 7.6,
            "Salary": 8.6, "Transport": 14.2, "Utilities": 4.4,
            "Stationery": 1.7, "Sundries": 1.4, "Maintenance": 0.4,
            "Owner_Withdrawal": 13.8, "Other": 12.8,
        },
    },
    {
        "year": 2020,
        "months_recorded": 9,
        "revenue_index": 100.8,
        "expenditure_index": 125.9,
        "net_margin_pct": -24.9,
        "income_mix": {
            "Consultation": 2.1, "Laboratory": 4.8, "Treatment": 28.7,
            "Drugs": 8.6, "Antenatal": 4.2, "Delivery": 7.9,
            "Immunization": 3.3, "Family_Planning": 35.3, "PAC": 5.1,
        },
        "expenditure_mix": {
            "Drugs": 15.5, "Food_Lunch": 5.5, "Labor": 0.4,
            "Salary": 21.4, "Transport": 7.3, "Utilities": 2.6,
            "Stationery": 0.1, "Sundries": 2.9, "Medical_Supplies": 1.3,
            "Maintenance": 2.0, "Construction": 9.8,
            "Owner_Withdrawal": 5.7, "Other": 25.7,
        },
    },
    {
        "year": 2021,
        "months_recorded": 12,
        "revenue_index": 100.0,
        "expenditure_index": 81.0,
        "net_margin_pct": 19.0,
        "income_mix": {
            "Laboratory": 10.9, "Treatment": 37.9, "Drugs": 13.7,
            "Antenatal": 5.1, "Delivery": 15.6, "Immunization": 6.3,
            "Family_Planning": 8.7, "PAC": 1.8,
        },
        "expenditure_mix": {
            "Drugs": 18.3, "Food_Lunch": 3.3, "Labor": 2.8,
            "Salary": 43.6, "Transport": 9.0, "Utilities": 8.0,
            "Petty_Cash": 6.7, "Construction": 3.1,
            "Owner_Withdrawal": 5.2,
        },
    },
    {
        "year": 2022,
        "months_recorded": 12,
        "revenue_index": 63.8,
        "expenditure_index": 57.4,
        "net_margin_pct": 10.0,
        "income_mix": {
            "Laboratory": 6.1, "Treatment": 48.9, "Drugs": 7.0,
            "Antenatal": 7.6, "Delivery": 11.5, "Immunization": 10.5,
            "Family_Planning": 7.0, "PAC": 1.4,
        },
        "expenditure_mix": {
            "Drugs": 13.6, "Food_Lunch": 10.4, "Labor": 5.7,
            "Salary": 35.3, "Transport": 11.1, "Utilities": 4.1,
            "Petty_Cash": 3.2, "Construction": 6.2,
            "Owner_Withdrawal": 10.3,
        },
    },
    {
        "year": 2023,
        "months_recorded": 12,
        "revenue_index": 73.0,
        "expenditure_index": 56.9,
        "net_margin_pct": 22.0,
        "income_mix": {
            "Laboratory": 6.8, "Treatment": 39.3, "Drugs": 14.5,
            "Antenatal": 6.3, "Delivery": 17.2, "Immunization": 9.1,
            "Family_Planning": 6.0, "PAC": 0.8,
        },
        "expenditure_mix": {
            "Drugs": 17.2, "Food_Lunch": 11.9, "Labor": 6.0,
            "Salary": 31.3, "Transport": 9.2, "Utilities": 4.6,
            "Petty_Cash": 2.9, "Construction": 9.3,
            "Owner_Withdrawal": 7.6,
        },
    },
    {
        "year": 2024,
        "months_recorded": 7,
        "revenue_index": 10.0,
        "expenditure_index": 26.1,
        "net_margin_pct": -160.7,
        "note": "Recording gap — likely data-entry hiatus, not actual revenue drop",
        "income_mix": {
            "Laboratory": 5.6, "Treatment": 29.3, "Drugs": 15.5,
            "Antenatal": 7.3, "Delivery": 22.5, "Immunization": 11.4,
            "Family_Planning": 8.3,
        },
        "expenditure_mix": {
            "Drugs": 18.9, "Food_Lunch": 12.8, "Labor": 6.1,
            "Salary": 11.8, "Transport": 14.2, "Utilities": 4.0,
            "Owner_Withdrawal": 32.1,
        },
    },
    {
        "year": 2025,
        "months_recorded": 12,
        "revenue_index": 75.7,
        "expenditure_index": 26.4,
        "net_margin_pct": 65.2,
        "income_mix": {
            "Consultation": 6.8, "Laboratory": 5.6, "Treatment": 26.3,
            "Drugs": 14.5, "Antenatal": 4.8, "Delivery": 11.4,
            "Immunization": 5.7, "Family_Planning": 6.2, "PAC": 0.9,
            "Scan": 17.8,
        },
        "expenditure_mix": {
            "Drugs": 37.3, "Food_Lunch": 8.8, "Labor": 10.9,
            "Transport": 19.0, "Utilities": 5.2, "Stationery": 1.1,
            "Sundries": 0.6, "Medical_Supplies": 4.2, "Maintenance": 6.3,
            "Petty_Cash": 6.6,
        },
    },
    {
        "year": 2026,
        "months_recorded": 2,
        "revenue_index": 7.5,
        "expenditure_index": 5.2,
        "net_margin_pct": 30.2,
        "note": "Only January–February recorded",
        "income_mix": {
            "Consultation": 8.7, "Laboratory": 10.8, "Treatment": 37.1,
            "Drugs": 17.5, "Antenatal": 4.1, "Delivery": 1.0,
            "Immunization": 12.9, "Family_Planning": 7.9,
        },
        "expenditure_mix": {
            "Drugs": 52.5, "Food_Lunch": 17.2, "Transport": 17.0,
            "Stationery": 1.3, "Sundries": 0.3, "Medical_Supplies": 1.2,
            "Maintenance": 10.5,
        },
    },
]


# Monthly trend data — one record per calendar month
# revenue_index / expenditure_index: base = average monthly revenue in 2021 = 100
MONTHLY_TRENDS = [
    {"month": "2019-06", "revenue_index": 119.5, "expenditure_index": 56.4, "net_margin_pct": 52.8, "income_mix": {"Laboratory": 1.1, "Treatment": 51.3, "Drugs": 4.4, "Antenatal": 2.3, "Delivery": 3.1, "Immunization": 3.7, "Family_Planning": 34.1}, "expenditure_mix": {"Drugs": 13.4, "Food_Lunch": 16.0, "Labor": 4.6, "Salary": 9.7, "Transport": 14.4, "Utilities": 4.0, "Stationery": 3.2, "Sundries": 1.4, "Owner_Withdrawal": 28.6, "Other": 4.7}},
    {"month": "2019-07", "revenue_index": 115.1, "expenditure_index": 72.6, "net_margin_pct": 36.9, "income_mix": {"Laboratory": 5.0, "Treatment": 24.3, "Drugs": 24.7, "Antenatal": 2.9, "Delivery": 6.5, "Immunization": 2.8, "Family_Planning": 33.8}, "expenditure_mix": {"Drugs": 23.7, "Food_Lunch": 17.2, "Labor": 11.4, "Salary": 7.5, "Transport": 12.7, "Utilities": 3.3, "Stationery": 0.6, "Sundries": 2.0, "Owner_Withdrawal": 13.9, "Other": 7.7}},
    {"month": "2019-08", "revenue_index": 56.4, "expenditure_index": 52.2, "net_margin_pct": 7.5, "income_mix": {"Laboratory": 7.6, "Treatment": 41.7, "Drugs": 12.6, "Antenatal": 11.2, "Immunization": 3.8, "Family_Planning": 23.1}, "expenditure_mix": {"Drugs": 19.0, "Food_Lunch": 22.8, "Labor": 10.0, "Salary": 8.3, "Transport": 12.5, "Utilities": 3.9, "Stationery": 1.9, "Sundries": 1.2, "Owner_Withdrawal": 18.8, "Other": 1.6}},
    {"month": "2019-09", "revenue_index": 61.3, "expenditure_index": 35.1, "net_margin_pct": 42.7, "income_mix": {"Laboratory": 3.7, "Treatment": 18.1, "Drugs": 6.3, "Antenatal": 2.7, "Delivery": 18.7, "Immunization": 4.1, "Family_Planning": 46.4}, "expenditure_mix": {"Drugs": 23.2, "Food_Lunch": 21.7, "Labor": 9.2, "Salary": 10.6, "Transport": 13.3, "Utilities": 10.7, "Sundries": 2.2, "Owner_Withdrawal": 4.3, "Other": 4.8}},
    {"month": "2019-10", "revenue_index": 86.4, "expenditure_index": 23.6, "net_margin_pct": 72.7, "income_mix": {"Laboratory": 3.1, "Treatment": 14.1, "Drugs": 3.6, "Antenatal": 0.2, "Delivery": 2.1, "Immunization": 0.2, "Family_Planning": 76.8}, "expenditure_mix": {"Drugs": 4.1, "Food_Lunch": 16.5, "Labor": 3.7, "Salary": 7.6, "Transport": 18.3, "Utilities": 2.2, "Stationery": 0.9, "Owner_Withdrawal": 5.3, "Other": 41.3}},
    {"month": "2019-11", "revenue_index": 44.1, "expenditure_index": 38.1, "net_margin_pct": 13.6, "income_mix": {"Laboratory": 5.1, "Treatment": 22.2, "Drugs": 6.6, "Antenatal": 2.7, "Delivery": 5.5, "Immunization": 1.4, "Family_Planning": 56.5}, "expenditure_mix": {"Drugs": 12.6, "Food_Lunch": 17.6, "Labor": 5.4, "Salary": 9.1, "Transport": 14.3, "Utilities": 5.0, "Stationery": 1.6, "Sundries": 1.0, "Maintenance": 1.2, "Owner_Withdrawal": 6.2, "Other": 25.5}},
    {"month": "2019-12", "revenue_index": 13.3, "expenditure_index": 17.1, "net_margin_pct": -28.5, "income_mix": {"Laboratory": 10.0, "Treatment": 52.7, "Drugs": 16.7, "Antenatal": 5.5, "Delivery": 3.6, "Immunization": 1.5, "Family_Planning": 10.0}, "expenditure_mix": {"Drugs": 11.1, "Food_Lunch": 23.1, "Labor": 10.0, "Salary": 6.2, "Transport": 12.3, "Utilities": 7.1, "Stationery": 2.1, "Sundries": 1.3, "Owner_Withdrawal": 22.9, "Other": 4.0}},
    {"month": "2020-01", "revenue_index": 28.3, "expenditure_index": 33.9, "net_margin_pct": -19.8, "income_mix": {"Laboratory": 2.6, "Treatment": 32.1, "Drugs": 6.1, "Antenatal": 4.7, "Delivery": 4.3, "Immunization": 3.4, "Family_Planning": 46.8}, "expenditure_mix": {"Drugs": 16.8, "Food_Lunch": 14.1, "Salary": 7.3, "Transport": 2.3, "Utilities": 7.4, "Stationery": 0.2, "Sundries": 3.7, "Medical_Supplies": 2.7, "Owner_Withdrawal": 8.6, "Other": 36.8}},
    {"month": "2020-02", "revenue_index": 78.1, "expenditure_index": 49.3, "net_margin_pct": 36.9, "income_mix": {"Consultation": 0.3, "Laboratory": 7.6, "Treatment": 44.8, "Drugs": 2.6, "Antenatal": 6.7, "Delivery": 7.2, "Immunization": 2.3, "Family_Planning": 27.3, "PAC": 1.2}, "expenditure_mix": {"Drugs": 32.9, "Food_Lunch": 6.9, "Labor": 1.2, "Salary": 18.3, "Transport": 7.3, "Utilities": 4.2, "Sundries": 2.3, "Medical_Supplies": 2.1, "Maintenance": 1.3, "Owner_Withdrawal": 3.8, "Other": 19.8}},
    {"month": "2020-03", "revenue_index": 86.1, "expenditure_index": 71.3, "net_margin_pct": 17.2, "income_mix": {"Consultation": 0.8, "Laboratory": 3.7, "Treatment": 30.5, "Drugs": 5.2, "Antenatal": 8.0, "Delivery": 12.1, "Immunization": 3.5, "Family_Planning": 32.2, "PAC": 4.0}, "expenditure_mix": {"Drugs": 14.1, "Food_Lunch": 5.1, "Salary": 27.3, "Transport": 5.6, "Utilities": 2.2, "Sundries": 1.1, "Medical_Supplies": 1.3, "Maintenance": 3.9, "Construction": 28.1, "Owner_Withdrawal": 5.3, "Other": 6.0}},
    {"month": "2020-04", "revenue_index": 147.9, "expenditure_index": 109.6, "net_margin_pct": 25.9, "income_mix": {"Consultation": 2.3, "Laboratory": 2.7, "Treatment": 22.1, "Drugs": 2.5, "Antenatal": 1.3, "Delivery": 5.4, "Immunization": 2.1, "Family_Planning": 48.2, "PAC": 13.4}, "expenditure_mix": {"Drugs": 11.8, "Food_Lunch": 4.3, "Salary": 20.3, "Transport": 7.0, "Utilities": 1.5, "Sundries": 0.7, "Medical_Supplies": 1.4, "Maintenance": 1.7, "Owner_Withdrawal": 5.5, "Other": 45.7}},
    {"month": "2020-05", "revenue_index": 168.2, "expenditure_index": 195.7, "net_margin_pct": -16.3, "income_mix": {"Consultation": 3.1, "Laboratory": 3.1, "Treatment": 19.9, "Drugs": 14.1, "Antenatal": 5.5, "Delivery": 12.1, "Immunization": 5.5, "Family_Planning": 32.2, "PAC": 4.4}, "expenditure_mix": {"Drugs": 6.3, "Food_Lunch": 3.5, "Salary": 27.7, "Transport": 7.7, "Utilities": 0.7, "Sundries": 7.2, "Maintenance": 0.1, "Construction": 0.4, "Owner_Withdrawal": 8.4, "Other": 38.0}},
    {"month": "2020-06", "revenue_index": 139.8, "expenditure_index": 139.9, "net_margin_pct": 0.0, "income_mix": {"Consultation": 3.5, "Laboratory": 5.9, "Treatment": 20.2, "Drugs": 5.6, "Antenatal": 0.7, "Delivery": 12.5, "Immunization": 2.1, "Family_Planning": 47.0, "PAC": 2.5}, "expenditure_mix": {"Drugs": 18.5, "Food_Lunch": 3.2, "Salary": 23.1, "Transport": 10.2, "Utilities": 2.0, "Sundries": 5.0, "Maintenance": 0.3, "Construction": 3.6, "Owner_Withdrawal": 3.2, "Other": 30.9}},
    {"month": "2020-07", "revenue_index": 93.9, "expenditure_index": 176.6, "net_margin_pct": -88.1, "income_mix": {"Consultation": 1.5, "Laboratory": 4.2, "Treatment": 39.5, "Drugs": 8.6, "Antenatal": 2.9, "Delivery": 2.7, "Immunization": 1.3, "Family_Planning": 36.5, "PAC": 2.8}, "expenditure_mix": {"Drugs": 3.3, "Food_Lunch": 6.5, "Salary": 14.3, "Transport": 8.7, "Utilities": 5.4, "Sundries": 2.1, "Medical_Supplies": 0.3, "Maintenance": 0.6, "Construction": 26.5, "Owner_Withdrawal": 5.5, "Other": 26.8}},
    {"month": "2020-08", "revenue_index": 77.2, "expenditure_index": 128.8, "net_margin_pct": -66.8, "income_mix": {"Consultation": 2.0, "Laboratory": 6.7, "Treatment": 28.7, "Drugs": 15.2, "Antenatal": 3.9, "Delivery": 6.5, "Immunization": 3.8, "Family_Planning": 27.7, "PAC": 5.7}, "expenditure_mix": {"Drugs": 22.2, "Food_Lunch": 5.2, "Salary": 24.5, "Transport": 8.5, "Utilities": 2.1, "Sundries": 3.1, "Medical_Supplies": 1.2, "Maintenance": 3.7, "Construction": 11.3, "Owner_Withdrawal": 5.9, "Other": 12.4}},
    {"month": "2020-09", "revenue_index": 88.5, "expenditure_index": 231.5, "net_margin_pct": -161.5, "income_mix": {"Consultation": 1.5, "Laboratory": 8.1, "Treatment": 31.3, "Drugs": 12.1, "Antenatal": 1.6, "Delivery": 2.7, "Immunization": 5.3, "Family_Planning": 28.1, "PAC": 9.3}, "expenditure_mix": {"Drugs": 18.9, "Food_Lunch": 5.1, "Salary": 13.9, "Transport": 5.3, "Utilities": 2.1, "Sundries": 0.5, "Medical_Supplies": 0.3, "Maintenance": 2.2, "Construction": 7.4, "Owner_Withdrawal": 5.1, "Other": 39.1}},
    {"month": "2021-01", "revenue_index": 90.2, "expenditure_index": 103.3, "net_margin_pct": -14.5, "income_mix": {"Laboratory": 6.1, "Treatment": 31.1, "Drugs": 15.3, "Antenatal": 5.6, "Delivery": 9.9, "Immunization": 3.9, "Family_Planning": 24.7, "PAC": 3.4}, "expenditure_mix": {"Drugs": 27.3, "Food_Lunch": 2.7, "Labor": 2.2, "Salary": 35.0, "Transport": 5.2, "Utilities": 10.5, "Petty_Cash": 7.8, "Construction": 5.4, "Owner_Withdrawal": 3.9}},
    {"month": "2021-02", "revenue_index": 114.2, "expenditure_index": 74.3, "net_margin_pct": 34.9, "income_mix": {"Laboratory": 7.3, "Treatment": 38.3, "Drugs": 16.3, "Antenatal": 4.1, "Delivery": 19.7, "Immunization": 3.9, "Family_Planning": 8.2, "PAC": 2.1}, "expenditure_mix": {"Drugs": 18.7, "Food_Lunch": 3.5, "Salary": 48.6, "Transport": 11.4, "Utilities": 5.2, "Petty_Cash": 6.1, "Owner_Withdrawal": 6.5}},
    {"month": "2021-03", "revenue_index": 108.6, "expenditure_index": 120.2, "net_margin_pct": -10.7, "income_mix": {"Laboratory": 10.7, "Treatment": 34.3, "Drugs": 9.6, "Antenatal": 7.1, "Delivery": 21.9, "Immunization": 7.2, "Family_Planning": 7.1, "PAC": 2.1}, "expenditure_mix": {"Drugs": 23.5, "Food_Lunch": 2.7, "Labor": 2.5, "Salary": 30.1, "Transport": 8.9, "Utilities": 12.2, "Petty_Cash": 9.3, "Construction": 5.3, "Owner_Withdrawal": 5.5}},
    {"month": "2021-04", "revenue_index": 87.2, "expenditure_index": 73.2, "net_margin_pct": 16.1, "income_mix": {"Laboratory": 7.3, "Treatment": 38.2, "Drugs": 13.2, "Antenatal": 5.7, "Delivery": 18.5, "Immunization": 5.8, "Family_Planning": 8.0, "PAC": 3.3}, "expenditure_mix": {"Drugs": 22.3, "Food_Lunch": 3.7, "Labor": 3.8, "Salary": 49.4, "Transport": 7.3, "Utilities": 4.3, "Petty_Cash": 2.3, "Owner_Withdrawal": 6.8}},
    {"month": "2021-05", "revenue_index": 84.8, "expenditure_index": 67.1, "net_margin_pct": 20.9, "income_mix": {"Laboratory": 12.6, "Treatment": 42.7, "Drugs": 12.4, "Antenatal": 5.9, "Delivery": 11.8, "Immunization": 7.4, "Family_Planning": 7.1}, "expenditure_mix": {"Drugs": 14.5, "Food_Lunch": 4.5, "Labor": 4.0, "Salary": 46.3, "Transport": 7.4, "Utilities": 6.7, "Petty_Cash": 7.3, "Construction": 0.9, "Owner_Withdrawal": 8.4}},
    {"month": "2021-06", "revenue_index": 148.9, "expenditure_index": 73.9, "net_margin_pct": 50.3, "income_mix": {"Laboratory": 11.5, "Treatment": 44.1, "Drugs": 16.7, "Antenatal": 5.0, "Delivery": 12.5, "Immunization": 5.3, "Family_Planning": 3.5, "PAC": 1.3}, "expenditure_mix": {"Drugs": 13.5, "Food_Lunch": 3.7, "Labor": 2.7, "Salary": 48.9, "Transport": 8.1, "Utilities": 7.4, "Petty_Cash": 7.3, "Construction": 1.4, "Owner_Withdrawal": 6.8}},
    {"month": "2021-07", "revenue_index": 106.0, "expenditure_index": 74.2, "net_margin_pct": 30.0, "income_mix": {"Laboratory": 14.2, "Treatment": 40.3, "Drugs": 16.1, "Antenatal": 3.8, "Delivery": 11.8, "Immunization": 7.4, "Family_Planning": 5.7, "PAC": 0.9}, "expenditure_mix": {"Drugs": 14.1, "Food_Lunch": 3.7, "Labor": 3.4, "Salary": 48.7, "Transport": 8.0, "Utilities": 3.4, "Petty_Cash": 10.5, "Construction": 0.7, "Owner_Withdrawal": 7.5}},
    {"month": "2021-08", "revenue_index": 59.0, "expenditure_index": 72.6, "net_margin_pct": -23.1, "income_mix": {"Laboratory": 11.5, "Treatment": 35.8, "Drugs": 8.1, "Antenatal": 5.1, "Delivery": 20.3, "Immunization": 14.2, "Family_Planning": 5.1}, "expenditure_mix": {"Drugs": 18.3, "Food_Lunch": 3.8, "Labor": 4.2, "Salary": 49.8, "Transport": 7.5, "Utilities": 5.0, "Petty_Cash": 3.3, "Construction": 4.1, "Owner_Withdrawal": 4.1}},
    {"month": "2021-09", "revenue_index": 106.1, "expenditure_index": 78.1, "net_margin_pct": 26.4, "income_mix": {"Laboratory": 16.9, "Treatment": 30.8, "Drugs": 9.1, "Antenatal": 3.7, "Delivery": 19.4, "Immunization": 9.4, "Family_Planning": 9.7, "PAC": 0.9}, "expenditure_mix": {"Drugs": 10.2, "Food_Lunch": 3.0, "Labor": 1.6, "Salary": 46.3, "Transport": 17.4, "Utilities": 13.3, "Petty_Cash": 3.2, "Construction": 1.3, "Owner_Withdrawal": 3.8}},
    {"month": "2021-10", "revenue_index": 122.2, "expenditure_index": 85.1, "net_margin_pct": 30.4, "income_mix": {"Laboratory": 12.1, "Treatment": 36.2, "Drugs": 16.6, "Antenatal": 6.3, "Delivery": 15.6, "Immunization": 3.5, "Family_Planning": 8.0, "PAC": 1.6}, "expenditure_mix": {"Drugs": 19.1, "Food_Lunch": 3.2, "Labor": 2.4, "Salary": 42.5, "Transport": 12.2, "Utilities": 9.7, "Petty_Cash": 5.2, "Construction": 2.4, "Owner_Withdrawal": 3.4}},
    {"month": "2021-11", "revenue_index": 106.3, "expenditure_index": 112.9, "net_margin_pct": -6.2, "income_mix": {"Laboratory": 7.8, "Treatment": 40.7, "Drugs": 11.1, "Antenatal": 4.5, "Delivery": 16.8, "Immunization": 4.5, "Family_Planning": 13.0, "PAC": 1.6}, "expenditure_mix": {"Drugs": 14.6, "Food_Lunch": 2.4, "Labor": 2.3, "Salary": 32.0, "Transport": 6.7, "Utilities": 8.0, "Petty_Cash": 10.1, "Construction": 6.2, "Owner_Withdrawal": 3.3, "Other": 14.3}},
    {"month": "2021-12", "revenue_index": 67.4, "expenditure_index": 37.3, "net_margin_pct": 44.7, "income_mix": {"Laboratory": 12.7, "Treatment": 34.5, "Drugs": 17.3, "Antenatal": 4.8, "Delivery": 14.3, "Immunization": 5.0, "Family_Planning": 11.3}, "expenditure_mix": {"Drugs": 16.5, "Food_Lunch": 6.2, "Labor": 4.6, "Salary": 48.6, "Transport": 7.6, "Utilities": 6.5, "Petty_Cash": 6.2, "Owner_Withdrawal": 3.9}},
    {"month": "2022-01", "revenue_index": 50.3, "expenditure_index": 65.9, "net_margin_pct": -30.9, "income_mix": {"Laboratory": 5.0, "Treatment": 46.2, "Drugs": 9.5, "Antenatal": 7.6, "Delivery": 11.9, "Immunization": 11.9, "Family_Planning": 7.6, "PAC": 0.5}, "expenditure_mix": {"Drugs": 15.8, "Food_Lunch": 4.7, "Labor": 3.3, "Salary": 45.2, "Transport": 7.6, "Utilities": 5.4, "Petty_Cash": 1.3, "Construction": 7.3, "Owner_Withdrawal": 9.4}},
    {"month": "2022-02", "revenue_index": 39.7, "expenditure_index": 28.3, "net_margin_pct": 28.6, "income_mix": {"Laboratory": 8.4, "Treatment": 47.9, "Drugs": 8.4, "Antenatal": 10.9, "Delivery": 6.1, "Immunization": 6.6, "Family_Planning": 9.1, "PAC": 2.5}, "expenditure_mix": {"Drugs": 14.0, "Food_Lunch": 8.5, "Labor": 5.1, "Salary": 42.6, "Transport": 11.4, "Utilities": 5.4, "Petty_Cash": 6.1, "Owner_Withdrawal": 7.0}},
    {"month": "2022-03", "revenue_index": 90.9, "expenditure_index": 45.0, "net_margin_pct": 50.5, "income_mix": {"Laboratory": 10.3, "Treatment": 46.1, "Drugs": 5.7, "Antenatal": 7.0, "Delivery": 13.5, "Immunization": 10.2, "Family_Planning": 5.5, "PAC": 1.6}, "expenditure_mix": {"Drugs": 12.0, "Food_Lunch": 7.3, "Labor": 2.7, "Salary": 55.2, "Transport": 7.6, "Utilities": 3.5, "Petty_Cash": 3.8, "Owner_Withdrawal": 7.9}},
    {"month": "2022-04", "revenue_index": 75.2, "expenditure_index": 54.1, "net_margin_pct": 28.0, "income_mix": {"Laboratory": 4.7, "Treatment": 51.1, "Drugs": 6.5, "Antenatal": 8.4, "Delivery": 9.3, "Immunization": 12.0, "Family_Planning": 7.6, "PAC": 0.5}, "expenditure_mix": {"Drugs": 14.2, "Food_Lunch": 10.6, "Labor": 5.4, "Salary": 34.6, "Transport": 10.3, "Utilities": 6.0, "Petty_Cash": 3.8, "Construction": 6.1, "Owner_Withdrawal": 9.1}},
    {"month": "2022-05", "revenue_index": 76.3, "expenditure_index": 47.3, "net_margin_pct": 38.0, "income_mix": {"Laboratory": 7.8, "Treatment": 55.1, "Drugs": 8.3, "Antenatal": 10.4, "Delivery": 7.4, "Immunization": 3.8, "Family_Planning": 7.2}, "expenditure_mix": {"Drugs": 15.9, "Food_Lunch": 10.5, "Labor": 5.6, "Salary": 31.5, "Transport": 12.1, "Utilities": 3.7, "Petty_Cash": 1.3, "Construction": 9.1, "Owner_Withdrawal": 10.3}},
    {"month": "2022-06", "revenue_index": 63.9, "expenditure_index": 92.2, "net_margin_pct": -44.3, "income_mix": {"Laboratory": 4.4, "Treatment": 57.0, "Drugs": 6.6, "Antenatal": 8.0, "Delivery": 7.5, "Immunization": 10.5, "Family_Planning": 6.0}, "expenditure_mix": {"Drugs": 9.3, "Food_Lunch": 11.3, "Labor": 9.7, "Salary": 24.0, "Transport": 7.5, "Utilities": 3.1, "Petty_Cash": 1.8, "Construction": 14.3, "Owner_Withdrawal": 18.9}},
    {"month": "2022-07", "revenue_index": 47.2, "expenditure_index": 62.9, "net_margin_pct": -33.4, "income_mix": {"Laboratory": 3.8, "Treatment": 50.4, "Drugs": 5.4, "Antenatal": 5.3, "Delivery": 21.3, "Immunization": 8.9, "Family_Planning": 4.8}, "expenditure_mix": {"Drugs": 18.6, "Food_Lunch": 11.6, "Labor": 3.8, "Salary": 27.9, "Transport": 13.3, "Utilities": 7.2, "Petty_Cash": 7.8, "Owner_Withdrawal": 9.8}},
    {"month": "2022-08", "revenue_index": 79.2, "expenditure_index": 46.2, "net_margin_pct": 41.6, "income_mix": {"Laboratory": 6.8, "Treatment": 44.9, "Drugs": 4.7, "Antenatal": 5.7, "Delivery": 14.3, "Immunization": 16.0, "Family_Planning": 5.4, "PAC": 2.3}, "expenditure_mix": {"Drugs": 9.3, "Food_Lunch": 14.2, "Labor": 8.6, "Salary": 32.1, "Transport": 15.2, "Utilities": 2.9, "Petty_Cash": 5.4, "Construction": 2.3, "Owner_Withdrawal": 10.0}},
    {"month": "2022-09", "revenue_index": 58.1, "expenditure_index": 41.3, "net_margin_pct": 28.9, "income_mix": {"Laboratory": 3.4, "Treatment": 41.7, "Drugs": 5.8, "Antenatal": 7.3, "Delivery": 17.2, "Immunization": 14.6, "Family_Planning": 10.0}, "expenditure_mix": {"Drugs": 13.3, "Food_Lunch": 14.3, "Labor": 6.0, "Salary": 37.7, "Transport": 11.1, "Utilities": 3.5, "Petty_Cash": 2.8, "Owner_Withdrawal": 11.3}},
    {"month": "2022-10", "revenue_index": 62.1, "expenditure_index": 61.3, "net_margin_pct": 1.3, "income_mix": {"Laboratory": 4.8, "Treatment": 49.8, "Drugs": 6.5, "Antenatal": 8.5, "Delivery": 12.1, "Immunization": 14.3, "Family_Planning": 4.0}, "expenditure_mix": {"Drugs": 9.5, "Food_Lunch": 12.5, "Labor": 5.5, "Salary": 25.6, "Transport": 17.2, "Utilities": 5.1, "Petty_Cash": 3.9, "Construction": 7.3, "Owner_Withdrawal": 13.5}},
    {"month": "2022-11", "revenue_index": 55.5, "expenditure_index": 58.2, "net_margin_pct": -4.8, "income_mix": {"Laboratory": 5.4, "Treatment": 49.5, "Drugs": 6.4, "Antenatal": 3.9, "Delivery": 9.0, "Immunization": 14.7, "Family_Planning": 10.7, "PAC": 0.4}, "expenditure_mix": {"Drugs": 14.6, "Food_Lunch": 11.3, "Labor": 8.6, "Salary": 30.2, "Transport": 12.3, "Utilities": 3.5, "Petty_Cash": 2.8, "Construction": 3.4, "Owner_Withdrawal": 13.3}},
    {"month": "2022-12", "revenue_index": 67.0, "expenditure_index": 85.9, "net_margin_pct": -28.2, "income_mix": {"Laboratory": 7.6, "Treatment": 47.7, "Drugs": 9.7, "Antenatal": 5.1, "Delivery": 11.9, "Immunization": 6.7, "Family_Planning": 9.7, "PAC": 1.7}, "expenditure_mix": {"Drugs": 16.1, "Food_Lunch": 7.0, "Labor": 3.4, "Salary": 50.3, "Transport": 8.3, "Utilities": 2.3, "Petty_Cash": 0.8, "Construction": 1.9, "Owner_Withdrawal": 9.9}},
    {"month": "2023-01", "revenue_index": 53.0, "expenditure_index": 56.2, "net_margin_pct": -6.1, "income_mix": {"Laboratory": 5.2, "Treatment": 46.1, "Drugs": 7.7, "Antenatal": 7.1, "Delivery": 11.3, "Immunization": 11.7, "Family_Planning": 10.3, "PAC": 0.6}, "expenditure_mix": {"Drugs": 14.9, "Food_Lunch": 11.3, "Labor": 6.4, "Salary": 34.1, "Transport": 9.8, "Utilities": 5.5, "Petty_Cash": 2.3, "Construction": 10.5, "Owner_Withdrawal": 5.2}},
    {"month": "2023-02", "revenue_index": 36.0, "expenditure_index": 46.1, "net_margin_pct": -28.1, "income_mix": {"Laboratory": 7.0, "Treatment": 41.8, "Drugs": 10.6, "Antenatal": 8.3, "Delivery": 16.6, "Immunization": 6.6, "Family_Planning": 9.2}, "expenditure_mix": {"Drugs": 27.1, "Food_Lunch": 10.2, "Labor": 5.4, "Salary": 29.4, "Transport": 7.7, "Utilities": 3.3, "Petty_Cash": 5.0, "Construction": 5.4, "Owner_Withdrawal": 6.5}},
    {"month": "2023-03", "revenue_index": 91.2, "expenditure_index": 54.9, "net_margin_pct": 39.8, "income_mix": {"Laboratory": 8.1, "Treatment": 41.5, "Drugs": 5.7, "Antenatal": 5.5, "Delivery": 22.7, "Immunization": 6.7, "Family_Planning": 9.6, "PAC": 0.3}, "expenditure_mix": {"Drugs": 13.4, "Food_Lunch": 9.7, "Labor": 5.5, "Salary": 27.7, "Transport": 13.2, "Utilities": 6.6, "Petty_Cash": 3.1, "Construction": 13.7, "Owner_Withdrawal": 7.1}},
    {"month": "2023-04", "revenue_index": 59.3, "expenditure_index": 60.3, "net_margin_pct": -1.7, "income_mix": {"Laboratory": 5.2, "Treatment": 30.2, "Drugs": 15.8, "Antenatal": 10.9, "Delivery": 19.8, "Immunization": 11.5, "Family_Planning": 5.5, "PAC": 1.0}, "expenditure_mix": {"Drugs": 10.9, "Food_Lunch": 12.3, "Labor": 6.6, "Salary": 33.0, "Transport": 10.5, "Utilities": 5.9, "Petty_Cash": 3.5, "Construction": 10.5, "Owner_Withdrawal": 6.8}},
    {"month": "2023-05", "revenue_index": 72.9, "expenditure_index": 45.0, "net_margin_pct": 38.3, "income_mix": {"Laboratory": 8.4, "Treatment": 39.9, "Drugs": 14.3, "Antenatal": 6.5, "Delivery": 16.1, "Immunization": 7.0, "Family_Planning": 7.0, "PAC": 0.8}, "expenditure_mix": {"Drugs": 17.5, "Food_Lunch": 11.9, "Labor": 4.5, "Salary": 35.6, "Transport": 8.1, "Utilities": 3.3, "Petty_Cash": 5.3, "Construction": 4.5, "Owner_Withdrawal": 9.3}},
    {"month": "2023-06", "revenue_index": 89.2, "expenditure_index": 70.1, "net_margin_pct": 21.5, "income_mix": {"Laboratory": 4.2, "Treatment": 43.9, "Drugs": 18.4, "Antenatal": 2.7, "Delivery": 14.7, "Immunization": 9.1, "Family_Planning": 5.6, "PAC": 1.4}, "expenditure_mix": {"Drugs": 20.4, "Food_Lunch": 10.2, "Labor": 6.9, "Salary": 22.8, "Transport": 5.8, "Utilities": 3.9, "Petty_Cash": 4.3, "Construction": 18.3, "Owner_Withdrawal": 7.3}},
    {"month": "2023-07", "revenue_index": 86.1, "expenditure_index": 59.6, "net_margin_pct": 30.8, "income_mix": {"Laboratory": 8.2, "Treatment": 39.1, "Drugs": 22.2, "Antenatal": 3.5, "Delivery": 14.6, "Immunization": 6.3, "Family_Planning": 5.5, "PAC": 0.6}, "expenditure_mix": {"Drugs": 16.1, "Food_Lunch": 14.3, "Labor": 6.5, "Salary": 33.9, "Transport": 8.1, "Utilities": 5.7, "Petty_Cash": 2.7, "Construction": 4.7, "Owner_Withdrawal": 8.0}},
    {"month": "2023-08", "revenue_index": 73.7, "expenditure_index": 64.7, "net_margin_pct": 12.3, "income_mix": {"Laboratory": 5.6, "Treatment": 39.3, "Drugs": 16.3, "Antenatal": 5.7, "Delivery": 14.2, "Immunization": 11.7, "Family_Planning": 5.7, "PAC": 1.4}, "expenditure_mix": {"Drugs": 19.3, "Food_Lunch": 14.1, "Labor": 6.5, "Salary": 31.1, "Transport": 8.3, "Utilities": 3.3, "Petty_Cash": 1.5, "Construction": 8.1, "Owner_Withdrawal": 7.7}},
    {"month": "2023-09", "revenue_index": 63.1, "expenditure_index": 44.1, "net_margin_pct": 30.1, "income_mix": {"Laboratory": 10.2, "Treatment": 32.0, "Drugs": 19.5, "Antenatal": 3.8, "Delivery": 23.8, "Immunization": 5.7, "Family_Planning": 3.8, "PAC": 1.1}, "expenditure_mix": {"Drugs": 14.5, "Food_Lunch": 15.0, "Labor": 6.2, "Salary": 34.4, "Transport": 8.6, "Utilities": 3.7, "Petty_Cash": 3.3, "Construction": 4.7, "Owner_Withdrawal": 9.5}},
    {"month": "2023-10", "revenue_index": 84.7, "expenditure_index": 56.9, "net_margin_pct": 32.8, "income_mix": {"Laboratory": 5.9, "Treatment": 35.3, "Drugs": 14.5, "Antenatal": 8.1, "Delivery": 17.8, "Immunization": 12.4, "Family_Planning": 5.6, "PAC": 0.4}, "expenditure_mix": {"Drugs": 15.3, "Food_Lunch": 11.6, "Labor": 5.3, "Salary": 35.5, "Transport": 11.7, "Utilities": 4.5, "Petty_Cash": 1.5, "Construction": 7.2, "Owner_Withdrawal": 7.5}},
    {"month": "2023-11", "revenue_index": 77.9, "expenditure_index": 39.1, "net_margin_pct": 49.8, "income_mix": {"Laboratory": 6.4, "Treatment": 37.4, "Drugs": 13.5, "Antenatal": 8.0, "Delivery": 19.6, "Immunization": 8.7, "Family_Planning": 5.1, "PAC": 1.3}, "expenditure_mix": {"Drugs": 14.3, "Food_Lunch": 12.8, "Labor": 7.6, "Salary": 38.9, "Transport": 10.7, "Utilities": 4.7, "Petty_Cash": 1.7, "Construction": 2.7, "Owner_Withdrawal": 6.7}},
    {"month": "2023-12", "revenue_index": 89.4, "expenditure_index": 86.0, "net_margin_pct": 3.8, "income_mix": {"Laboratory": 5.7, "Treatment": 38.5, "Drugs": 12.2, "Antenatal": 6.1, "Delivery": 20.2, "Immunization": 10.7, "Family_Planning": 4.8, "PAC": 1.6}, "expenditure_mix": {"Drugs": 20.1, "Food_Lunch": 10.3, "Labor": 5.9, "Salary": 26.6, "Transport": 8.0, "Utilities": 5.0, "Petty_Cash": 2.4, "Construction": 9.9, "Owner_Withdrawal": 11.9}},
    {"month": "2024-01", "revenue_index": 29.1, "expenditure_index": 58.5, "net_margin_pct": -101.2, "income_mix": {"Laboratory": 9.1, "Treatment": 16.0, "Drugs": 7.7, "Antenatal": 12.0, "Delivery": 33.0, "Immunization": 12.9, "Family_Planning": 9.4}, "expenditure_mix": {"Drugs": 18.7, "Food_Lunch": 10.3, "Labor": 6.3, "Salary": 31.1, "Transport": 10.0, "Utilities": 4.3, "Owner_Withdrawal": 19.3}},
    {"month": "2024-02", "revenue_index": 1.8, "expenditure_index": 26.2, "net_margin_pct": -1363.8, "income_mix": {"Laboratory": 12.4, "Treatment": 87.6}, "expenditure_mix": {"Drugs": 17.1, "Food_Lunch": 13.4, "Labor": 10.3, "Salary": 7.4, "Transport": 18.1, "Utilities": 5.0, "Owner_Withdrawal": 28.8}},
    {"month": "2024-03", "revenue_index": 1.1, "expenditure_index": 24.0, "net_margin_pct": -2077.3, "income_mix": {"Treatment": 100.0}, "expenditure_mix": {"Drugs": 10.3, "Food_Lunch": 14.5, "Labor": 7.9, "Transport": 14.2, "Utilities": 5.1, "Owner_Withdrawal": 48.1}},
    {"month": "2024-04", "revenue_index": 5.9, "expenditure_index": 17.1, "net_margin_pct": -189.2, "income_mix": {"Treatment": 52.0, "Drugs": 16.0, "Antenatal": 4.0, "Delivery": 16.0, "Immunization": 12.0}, "expenditure_mix": {"Drugs": 10.2, "Food_Lunch": 17.0, "Labor": 2.1, "Transport": 22.1, "Utilities": 5.5, "Owner_Withdrawal": 43.0}},
    {"month": "2024-05", "revenue_index": 4.7, "expenditure_index": 27.3, "net_margin_pct": -479.2, "income_mix": {"Treatment": 25.6, "Drugs": 5.1, "Antenatal": 12.8, "Delivery": 25.6, "Immunization": 15.4, "Family_Planning": 15.4}, "expenditure_mix": {"Drugs": 25.0, "Food_Lunch": 11.2, "Salary": 19.6, "Transport": 15.7, "Utilities": 2.6, "Owner_Withdrawal": 25.9}},
    {"month": "2024-06", "revenue_index": 15.4, "expenditure_index": 20.1, "net_margin_pct": -30.2, "income_mix": {"Treatment": 28.3, "Drugs": 22.8, "Delivery": 28.3, "Immunization": 7.8, "Family_Planning": 12.8}, "expenditure_mix": {"Drugs": 19.1, "Food_Lunch": 14.9, "Labor": 4.0, "Transport": 14.5, "Utilities": 2.3, "Owner_Withdrawal": 45.2}},
    {"month": "2024-07", "revenue_index": 11.5, "expenditure_index": 9.7, "net_margin_pct": 15.3, "income_mix": {"Laboratory": 5.2, "Treatment": 22.1, "Drugs": 20.8, "Antenatal": 10.4, "Delivery": 13.0, "Immunization": 15.6, "Family_Planning": 13.0}, "expenditure_mix": {"Drugs": 23.7, "Food_Lunch": 14.7, "Labor": 5.3, "Transport": 14.2, "Utilities": 5.8, "Owner_Withdrawal": 36.3}},
    {"month": "2025-01", "revenue_index": 73.1, "expenditure_index": 21.1, "net_margin_pct": 71.1, "income_mix": {"Consultation": 6.2, "Laboratory": 9.9, "Treatment": 31.4, "Drugs": 14.3, "Antenatal": 5.0, "Delivery": 7.4, "Immunization": 6.2, "Family_Planning": 3.7, "PAC": 1.2, "Scan": 14.7}, "expenditure_mix": {"Drugs": 27.9, "Food_Lunch": 12.8, "Labor": 8.1, "Transport": 12.4, "Utilities": 2.7, "Stationery": 3.4, "Medical_Supplies": 7.8, "Maintenance": 18.7, "Petty_Cash": 6.2}},
    {"month": "2025-02", "revenue_index": 75.3, "expenditure_index": 17.1, "net_margin_pct": 77.3, "income_mix": {"Consultation": 10.3, "Laboratory": 2.9, "Treatment": 22.1, "Drugs": 15.2, "Antenatal": 5.1, "Delivery": 17.2, "Immunization": 8.9, "Family_Planning": 5.0, "PAC": 1.3, "Scan": 12.1}, "expenditure_mix": {"Drugs": 40.7, "Food_Lunch": 8.0, "Labor": 16.0, "Transport": 17.7, "Utilities": 5.9, "Sundries": 0.5, "Maintenance": 0.8, "Petty_Cash": 10.3}},
    {"month": "2025-03", "revenue_index": 91.2, "expenditure_index": 32.2, "net_margin_pct": 64.7, "income_mix": {"Consultation": 5.5, "Laboratory": 5.3, "Treatment": 27.5, "Drugs": 10.8, "Antenatal": 6.6, "Delivery": 15.4, "Immunization": 6.6, "Family_Planning": 4.0, "Scan": 18.4}, "expenditure_mix": {"Drugs": 44.2, "Food_Lunch": 7.7, "Labor": 6.2, "Transport": 17.4, "Utilities": 9.3, "Stationery": 0.6, "Sundries": 0.8, "Medical_Supplies": 3.1, "Maintenance": 2.7, "Petty_Cash": 8.1}},
    {"month": "2025-04", "revenue_index": 60.1, "expenditure_index": 16.1, "net_margin_pct": 73.2, "income_mix": {"Consultation": 6.6, "Laboratory": 6.0, "Treatment": 28.8, "Drugs": 13.6, "Antenatal": 4.0, "Delivery": 12.6, "Immunization": 4.0, "Family_Planning": 10.6, "Scan": 13.9}, "expenditure_mix": {"Drugs": 36.8, "Food_Lunch": 9.6, "Labor": 7.5, "Transport": 22.6, "Utilities": 6.8, "Stationery": 0.4, "Medical_Supplies": 5.6, "Maintenance": 5.2, "Petty_Cash": 5.6}},
    {"month": "2025-05", "revenue_index": 56.2, "expenditure_index": 27.1, "net_margin_pct": 51.8, "income_mix": {"Consultation": 7.1, "Laboratory": 3.6, "Treatment": 35.2, "Drugs": 13.1, "Antenatal": 8.0, "Delivery": 12.4, "Immunization": 4.6, "Family_Planning": 3.0, "PAC": 1.1, "Scan": 11.9}, "expenditure_mix": {"Drugs": 27.2, "Food_Lunch": 9.6, "Labor": 12.7, "Transport": 21.3, "Utilities": 5.1, "Stationery": 1.3, "Sundries": 0.4, "Medical_Supplies": 7.6, "Maintenance": 8.5, "Petty_Cash": 6.3}},
    {"month": "2025-06", "revenue_index": 62.9, "expenditure_index": 25.9, "net_margin_pct": 58.8, "income_mix": {"Consultation": 6.3, "Laboratory": 7.6, "Treatment": 25.5, "Drugs": 17.3, "Antenatal": 4.0, "Delivery": 12.1, "Immunization": 5.1, "Family_Planning": 6.7, "Scan": 15.5}, "expenditure_mix": {"Drugs": 37.3, "Food_Lunch": 10.2, "Labor": 13.6, "Transport": 13.9, "Utilities": 3.8, "Stationery": 1.3, "Sundries": 0.9, "Medical_Supplies": 2.7, "Maintenance": 6.3, "Petty_Cash": 10.0}},
    {"month": "2025-07", "revenue_index": 72.2, "expenditure_index": 37.1, "net_margin_pct": 48.7, "income_mix": {"Consultation": 5.6, "Laboratory": 5.6, "Treatment": 24.2, "Drugs": 13.1, "Antenatal": 4.2, "Delivery": 14.0, "Immunization": 4.9, "Family_Planning": 8.0, "PAC": 2.1, "Scan": 18.4}, "expenditure_mix": {"Drugs": 26.9, "Food_Lunch": 7.3, "Labor": 16.2, "Transport": 19.4, "Utilities": 4.7, "Stationery": 1.6, "Sundries": 0.5, "Medical_Supplies": 5.2, "Maintenance": 11.2, "Petty_Cash": 7.0}},
    {"month": "2025-08", "revenue_index": 64.1, "expenditure_index": 24.3, "net_margin_pct": 62.1, "income_mix": {"Consultation": 6.3, "Laboratory": 5.7, "Treatment": 25.2, "Drugs": 15.2, "Antenatal": 3.4, "Delivery": 10.4, "Immunization": 5.7, "Family_Planning": 8.4, "PAC": 0.4, "Scan": 19.3}, "expenditure_mix": {"Drugs": 42.5, "Food_Lunch": 6.5, "Labor": 10.3, "Transport": 23.3, "Utilities": 5.2, "Stationery": 1.2, "Sundries": 0.5, "Medical_Supplies": 2.5, "Maintenance": 2.9, "Petty_Cash": 5.1}},
    {"month": "2025-09", "revenue_index": 72.2, "expenditure_index": 21.9, "net_margin_pct": 69.7, "income_mix": {"Consultation": 9.8, "Laboratory": 1.4, "Treatment": 20.6, "Drugs": 14.3, "Antenatal": 3.5, "Delivery": 4.9, "Immunization": 7.0, "Family_Planning": 4.9, "Scan": 33.6}, "expenditure_mix": {"Drugs": 53.1, "Food_Lunch": 4.1, "Transport": 22.8, "Utilities": 3.7, "Stationery": 0.8, "Sundries": 0.6, "Medical_Supplies": 2.7, "Maintenance": 4.6, "Petty_Cash": 7.5}},
    {"month": "2025-10", "revenue_index": 99.7, "expenditure_index": 33.3, "net_margin_pct": 66.6, "income_mix": {"Consultation": 4.0, "Laboratory": 6.0, "Treatment": 24.6, "Drugs": 16.3, "Antenatal": 4.5, "Delivery": 13.0, "Immunization": 5.0, "Family_Planning": 5.0, "PAC": 1.0, "Scan": 20.5}, "expenditure_mix": {"Drugs": 29.3, "Food_Lunch": 10.5, "Labor": 9.0, "Transport": 21.5, "Utilities": 4.5, "Stationery": 0.9, "Sundries": 0.6, "Medical_Supplies": 5.1, "Maintenance": 7.8, "Petty_Cash": 10.8}},
    {"month": "2025-11", "revenue_index": 101.2, "expenditure_index": 27.8, "net_margin_pct": 72.5, "income_mix": {"Consultation": 7.9, "Laboratory": 4.9, "Treatment": 27.2, "Drugs": 14.2, "Antenatal": 5.9, "Delivery": 7.4, "Immunization": 7.9, "Family_Planning": 7.9, "Scan": 16.6}, "expenditure_mix": {"Drugs": 30.7, "Food_Lunch": 10.4, "Labor": 10.4, "Transport": 18.2, "Utilities": 6.5, "Stationery": 2.6, "Sundries": 0.4, "Medical_Supplies": 3.3, "Maintenance": 3.7, "Petty_Cash": 13.7}},
    {"month": "2025-12", "revenue_index": 81.6, "expenditure_index": 22.3, "net_margin_pct": 72.6, "income_mix": {"Consultation": 5.6, "Laboratory": 8.1, "Treatment": 19.2, "Drugs": 15.4, "Antenatal": 2.6, "Immunization": 2.8, "Family_Planning": 9.1, "Scan": 37.1}, "expenditure_mix": {"Drugs": 56.6, "Food_Lunch": 17.2, "Transport": 14.6, "Utilities": 6.2, "Stationery": 0.6, "Sundries": 1.4, "Medical_Supplies": 0.8, "Maintenance": 2.6}},
    {"month": "2026-01", "revenue_index": 53.0, "expenditure_index": 38.5, "net_margin_pct": 27.3, "income_mix": {"Consultation": 8.7, "Laboratory": 8.9, "Treatment": 42.5, "Drugs": 16.8, "Antenatal": 3.9, "Delivery": 1.6, "Immunization": 10.7, "Family_Planning": 6.8}, "expenditure_mix": {"Drugs": 60.4, "Food_Lunch": 10.7, "Transport": 14.1, "Stationery": 0.9, "Sundries": 0.1, "Medical_Supplies": 1.9, "Maintenance": 11.8}},
    {"month": "2026-02", "revenue_index": 36.7, "expenditure_index": 24.1, "net_margin_pct": 34.4, "income_mix": {"Consultation": 8.6, "Laboratory": 13.4, "Treatment": 29.4, "Drugs": 18.6, "Antenatal": 4.5, "Immunization": 16.1, "Family_Planning": 9.4}, "expenditure_mix": {"Drugs": 39.9, "Food_Lunch": 27.6, "Transport": 21.6, "Stationery": 2.0, "Sundries": 0.6, "Maintenance": 8.4}},
]


# Formulary product categories (from Odoo product catalog)
# Generic category counts only — no prices, no brand names
PRODUCT_CATEGORIES = {
    "Tablets & Capsules": 66,
    "Injectables": 24,
    "Syrups": 13,
    "Family Planning": 8,
    "Laboratory Supplies": 7,
    "Cannulas": 7,
    "Medical Supplies (other)": 6,
    "Solutions": 5,
    "Gloves": 3,
    "Syringes": 3,
    "Sprays": 1,
}


def get_annual_summary() -> list[dict]:
    """Return annual trend data (index + mix, no raw amounts)."""
    return ANNUAL_TRENDS


def get_monthly_trends(year: int | None = None) -> list[dict]:
    """Return monthly trend data, optionally filtered to a single year."""
    if year is None:
        return MONTHLY_TRENDS
    prefix = str(year)
    return [m for m in MONTHLY_TRENDS if m["month"].startswith(prefix)]


def get_service_line_evolution() -> dict[str, dict[int, float]]:
    """Return each income category's share by year — useful for spotting
    service-line mix shifts over time."""
    result: dict[str, dict[int, float]] = {}
    for rec in ANNUAL_TRENDS:
        for cat, share in rec["income_mix"].items():
            result.setdefault(cat, {})[rec["year"]] = share
    return result


def get_top_expense_drivers(year: int) -> list[tuple[str, float]]:
    """Return expenditure categories for a given year, sorted by share."""
    for rec in ANNUAL_TRENDS:
        if rec["year"] == year:
            return sorted(rec["expenditure_mix"].items(), key=lambda x: -x[1])
    return []
