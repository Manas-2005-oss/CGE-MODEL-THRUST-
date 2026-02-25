from model.production import compute_production
from model.fiscal import apply_fiscal
from model.labor import compute_labor
from model.equilibrium import compute_inflation
from model.sam import build_sam

from config import BASELINE_GDP, BASELINE_UNEMPLOYMENT, BASELINE_INFLATION

BASELINE_WAGE = 600  


def run_simulation(inputs):

  
    # 1️ BASELINE ECONOMY
    baseline = {
        "GDP": BASELINE_GDP,
        "unemployment": BASELINE_UNEMPLOYMENT,
        "inflation": BASELINE_INFLATION,
        "deficit": 0,
        "wage": BASELINE_WAGE
    }

   
    # 2️PRODUCTION BLOCK
    production = compute_production(inputs)
    gdp_raw = production["gdp_raw"]

  
    # 3️ FISCAL IMPACT
    GDP, deficit = apply_fiscal(gdp_raw, inputs)

    # Scale sector outputs to match final GDP
    scale_factor = GDP / gdp_raw if gdp_raw != 0 else 0

    adjusted_output = {
        "agriculture": production["agriculture"] * scale_factor,
        "manufacturing": production["manufacturing"] * scale_factor,
        "services": production["services"] * scale_factor
    }

 
    # 4️ LABOR MARKET
    unemployment, labor_shares, wage = compute_labor(
        GDP,
        adjusted_output,
        inputs.laborShift,
        from_sector=getattr(inputs, "fromSector", "agriculture"),
        to_sector=getattr(inputs, "toSector", "services")
    )

   
    # 5️ INFLATION
    inflation = compute_inflation(GDP, deficit, wage)

    # 6️ BUILD SAM
    sam = build_sam(adjusted_output,labor_shares,wage)

  
    # 7️ POLICY RESULTS
    policy = {
        "GDP": round(GDP, 2),
        "unemployment": round(unemployment, 2),
        "inflation": round(inflation, 2),
        "deficit": round(deficit, 2),
        "wage": round(wage, 2),
        "sectorOutput": {
            "agriculture": round(adjusted_output["agriculture"], 2),
            "manufacturing": round(adjusted_output["manufacturing"], 2),
            "services": round(adjusted_output["services"], 2),
        },
        "laborShare": labor_shares
    }


    # 8️ CALCULATE CHANGES vs BASELINE
    changes = {
        "gdp_change": round(((policy["GDP"] - baseline["GDP"]) / baseline["GDP"]) * 100, 2),
        "unemployment_change": round(policy["unemployment"] - baseline["unemployment"], 2),
        "inflation_change": round(policy["inflation"] - baseline["inflation"], 2),
        "deficit_change": round(policy["deficit"] - baseline["deficit"], 2),
        "wage_change": round(((policy["wage"] - baseline["wage"]) / baseline["wage"]) * 100, 2)
    }


    # FINAL RESPONSE
    return {
        "baseline": baseline,
        "policy": policy,
        "changes": changes,
        "SAM": sam
    }
