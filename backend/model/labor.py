from config import BASELINE_GDP, BASELINE_UNEMPLOYMENT


def compute_labor(GDP, sector_output, labor_shift,
                  from_sector="agriculture",
                  to_sector="services"):
    """
    Computes unemployment, wage and sector labor allocation.
    Stronger responsiveness for visible dashboard changes.
    """

    # =========================
    # 1️ OKUN'S LAW 
    # =========================
    delta_gdp_pct = ((GDP - BASELINE_GDP) / BASELINE_GDP) * 100

    # Increased sensitivity from 0.5 → 0.8
    unemployment = BASELINE_UNEMPLOYMENT - 0.3 * delta_gdp_pct

    unemployment = max(1.5, min(15, unemployment))

    # =========================
    # 2️ WAGE DYNAMICS 
    # =========================
    BASE_WAGE = 600
 
    # GDP effect 
    gdp_effect = 0.05 * delta_gdp_pct / 100

    # Labor market effect 
    labor_effect = 0.03 * (BASELINE_UNEMPLOYMENT - unemployment)

    wage_multiplier = 1 + gdp_effect + labor_effect

    wage = BASE_WAGE * wage_multiplier

    wage = max(400, min(1200, wage))

    # =========================
    # 3️ BASE LABOR SHARES
    # =========================
    total_output = sum(sector_output.values())

    labor_shares = {
        k: v / total_output for k, v in sector_output.items()
    }

    # =========================
    # 4️ FLEXIBLE LABOR SHIFT
    # =========================
    shift = labor_shift / 100

    if from_sector in labor_shares and to_sector in labor_shares:
        labor_shares[to_sector] += shift
        labor_shares[from_sector] -= shift

    # Prevent negative shares
    for k in labor_shares:
        labor_shares[k] = max(0, labor_shares[k])

    # Re-normalize
    total = sum(labor_shares.values())
    labor_shares = {k: v / total for k, v in labor_shares.items()}

    return round(unemployment, 2), labor_shares, round(wage, 2)
