def build_sam(sector_output, labor_shares, wage):

    nodes = [
        {"name": "Labor"},
        {"name": "Capital"},
        {"name": "Agriculture"},
        {"name": "Manufacturing"},
        {"name": "Services"},
    ]

    links = []

    sectors = ["agriculture", "manufacturing", "services"]

    BASELINE_WAGE = 600  # must match engine baseline

    wage_multiplier = wage / BASELINE_WAGE

    for i, sector in enumerate(sectors):

        output = sector_output[sector]

        # Labor income depends on:
        # 1️ sector output
        # 2️ labor share in that sector
        # 3️ wage level

        labor_income = output * labor_shares[sector] * wage_multiplier

        # Capital gets remaining output
        capital_income = output - labor_income

        # Labor → Sector
        links.append({
            "source": 0,
            "target": i + 2,
            "value": round(max(labor_income, 0), 2)
        })

        # Capital → Sector
        links.append({
            "source": 1,
            "target": i + 2,
            "value": round(max(capital_income, 0), 2)
        })

    return {
        "nodes": nodes,
        "links": links
    }
