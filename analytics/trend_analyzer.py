"""
Claude-assisted financial trend analyzer for LMMC.

Reads the anonymized trend data (index values and percentage shares, no raw
currency) and uses Claude to produce a narrative brief on service-line
dynamics, margin trends, and operational patterns.

Usage:
    python -m analytics.trend_analyzer
    python -m analytics.trend_analyzer --year 2023
    python -m analytics.trend_analyzer --dry-run
    python -m analytics.trend_analyzer --format json
"""

import argparse
import json
import sys
import time

from analytics.trend_data import (
    ANNUAL_TRENDS,
    INCOME_CATEGORIES,
    EXPENDITURE_CATEGORIES,
    PRODUCT_CATEGORIES,
    get_annual_summary,
    get_monthly_trends,
    get_service_line_evolution,
    get_top_expense_drivers,
)


# ── Claude tool definitions ──────────────────────────────────────────────

TREND_QUERY_TOOL = {
    "name": "query_clinic_trends",
    "description": (
        "Query anonymized financial trend data for LMMC. "
        "Returns index values (base year 2021 = 100) and percentage shares. "
        "No raw currency amounts are available."
    ),
    "input_schema": {
        "type": "object",
        "properties": {
            "query_type": {
                "type": "string",
                "enum": [
                    "annual_summary",
                    "monthly_trends",
                    "service_line_evolution",
                    "top_expenses",
                    "product_categories",
                ],
                "description": (
                    "annual_summary: all years with revenue/expenditure index "
                    "and income/expenditure mix. "
                    "monthly_trends: monthly granularity for a given year. "
                    "service_line_evolution: each income category's share by year. "
                    "top_expenses: expenditure breakdown for a given year. "
                    "product_categories: formulary product category counts."
                ),
            },
            "year": {
                "type": "integer",
                "description": "Filter to a specific year (required for monthly_trends and top_expenses).",
            },
        },
        "required": ["query_type"],
    },
}


def execute_trend_query(query_type: str, year: int | None = None) -> str:
    """Execute a trend data query and return JSON results."""
    if query_type == "annual_summary":
        return json.dumps(get_annual_summary(), indent=2)
    elif query_type == "monthly_trends":
        if year is None:
            return json.dumps({"error": "year is required for monthly_trends"})
        data = get_monthly_trends(year)
        if not data:
            return json.dumps({"error": f"No data for year {year}"})
        return json.dumps(data, indent=2)
    elif query_type == "service_line_evolution":
        return json.dumps(get_service_line_evolution(), indent=2)
    elif query_type == "top_expenses":
        if year is None:
            return json.dumps({"error": "year is required for top_expenses"})
        drivers = get_top_expense_drivers(year)
        if not drivers:
            return json.dumps({"error": f"No data for year {year}"})
        return json.dumps(dict(drivers), indent=2)
    elif query_type == "product_categories":
        return json.dumps(PRODUCT_CATEGORIES, indent=2)
    else:
        return json.dumps({"error": f"Unknown query_type: {query_type}"})


# ── System prompt ────────────────────────────────────────────────────────

SYSTEM_PROMPT = """\
You are a healthcare financial analyst reviewing anonymized operational data
for Lynda Michelle Medical Centre (LMMC), a community clinic in Wakiso
District, Uganda, operating since June 2019.

All financial data is expressed as index values (base year 2021 = 100) and
percentage shares. No raw currency amounts are available or should be
fabricated.

Use the query_clinic_trends tool to retrieve data, then produce a concise
narrative brief covering:

1. **Revenue trajectory** — overall growth/contraction pattern, noting partial
   years (2019: 7 months, 2020: 9 months, 2024: recording gap) and the
   2025 recovery.

2. **Service-line mix shifts** — how the income composition changed over time
   (e.g., Family Planning dominance in 2019, Treatment becoming the largest
   line, emergence of Scan in 2025).

3. **Margin dynamics** — net margin trends, years of loss (2020, 2024) vs.
   high-margin years (2025), and what expenditure patterns drove each.

4. **Cost structure** — major expenditure drivers and how they shifted
   (salary formalization in 2021, construction spikes, drug procurement share).

5. **Operational insights** — seasonality patterns, data quality observations,
   and any service lines showing consistent growth or decline.

Ground every claim in the data you queried. Do not speculate beyond what the
numbers show. Flag data quality issues (the 2024 recording gap, partial years)
rather than interpreting them as real operational changes.
"""


def run_analysis(year_filter: int | None = None, dry_run: bool = False) -> dict:
    """Run the trend analysis, returning results dict."""
    # Build a focused prompt if year filter specified
    if year_filter:
        user_prompt = (
            f"Analyze the financial trends for LMMC in {year_filter}, "
            f"including comparison to prior years for context. "
            f"Query the annual summary first, then monthly trends for {year_filter}."
        )
    else:
        user_prompt = (
            "Produce a comprehensive financial trend analysis for LMMC "
            "covering all available years (2019–2026). Start by querying the "
            "annual summary and service-line evolution, then drill into "
            "monthly data for key inflection years."
        )

    if dry_run:
        print("=== DRY RUN ===")
        print(f"System prompt: {len(SYSTEM_PROMPT)} chars")
        print(f"User prompt: {user_prompt}")
        print(f"Tool: {TREND_QUERY_TOOL['name']}")
        print(f"\nAnnual data points: {len(ANNUAL_TRENDS)}")
        print(f"Income categories: {len(INCOME_CATEGORIES)}")
        print(f"Expenditure categories: {len(EXPENDITURE_CATEGORIES)}")
        print(f"Product categories: {len(PRODUCT_CATEGORIES)}")
        print(f"\nSample annual summary (2021 base year):")
        for rec in ANNUAL_TRENDS:
            margin = rec["net_margin_pct"]
            note = f" ({rec['note']})" if "note" in rec else ""
            print(
                f"  {rec['year']}: rev={rec['revenue_index']}, "
                f"exp={rec['expenditure_index']}, margin={margin}%"
                f"{note}"
            )
        return {"status": "dry_run", "data_points": len(ANNUAL_TRENDS)}

    # Lazy import — only needed for live analysis
    import anthropic

    client = anthropic.Anthropic()
    messages = [{"role": "user", "content": user_prompt}]
    tools = [TREND_QUERY_TOOL]

    start = time.time()
    total_input_tokens = 0
    total_output_tokens = 0
    tool_calls = 0

    # Tool-use loop
    for _ in range(8):  # max rounds
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=4096,
            system=SYSTEM_PROMPT,
            tools=tools,
            messages=messages,
        )

        total_input_tokens += response.usage.input_tokens
        total_output_tokens += response.usage.output_tokens

        if response.stop_reason == "end_turn":
            # Extract final text
            analysis_text = ""
            for block in response.content:
                if block.type == "text":
                    analysis_text += block.text
            break

        # Process tool calls
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                tool_calls += 1
                query_type = block.input.get("query_type", "")
                year = block.input.get("year")
                print(f"  [tool] query_clinic_trends({query_type}"
                      f"{f', year={year}' if year else ''})")
                result = execute_trend_query(query_type, year)
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": result,
                })

        messages.append({"role": "assistant", "content": response.content})
        messages.append({"role": "user", "content": tool_results})
    else:
        analysis_text = "[Analysis incomplete — max tool rounds reached]"

    elapsed = time.time() - start

    return {
        "status": "complete",
        "analysis": analysis_text,
        "metrics": {
            "input_tokens": total_input_tokens,
            "output_tokens": total_output_tokens,
            "tool_calls": tool_calls,
            "latency_seconds": round(elapsed, 1),
            "estimated_cost_usd": round(
                total_input_tokens * 3 / 1_000_000
                + total_output_tokens * 15 / 1_000_000,
                4,
            ),
        },
    }


def main():
    parser = argparse.ArgumentParser(
        description="Claude-assisted LMMC financial trend analysis"
    )
    parser.add_argument(
        "--year", type=int, help="Focus analysis on a specific year"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print data summary without calling Claude",
    )
    parser.add_argument(
        "--format",
        choices=["markdown", "json"],
        default="markdown",
        help="Output format (default: markdown)",
    )
    parser.add_argument(
        "--output", type=str, help="Write output to file instead of stdout"
    )
    args = parser.parse_args()

    result = run_analysis(year_filter=args.year, dry_run=args.dry_run)

    if args.format == "json":
        output = json.dumps(result, indent=2)
    elif result["status"] == "dry_run":
        return
    else:
        output = result["analysis"]
        # Append metrics as a footer
        m = result["metrics"]
        output += (
            f"\n\n---\n"
            f"*Analysis generated in {m['latency_seconds']}s | "
            f"{m['tool_calls']} tool calls | "
            f"{m['input_tokens'] + m['output_tokens']} tokens | "
            f"~${m['estimated_cost_usd']}*"
        )

    if args.output:
        with open(args.output, "w") as f:
            f.write(output)
        print(f"Written to {args.output}")
    else:
        print(output)


if __name__ == "__main__":
    main()
