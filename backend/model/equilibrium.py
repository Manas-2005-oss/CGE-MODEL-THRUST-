from config import BASELINE_GDP, BASELINE_INFLATION


def compute_inflation(GDP, deficit, wage):

    # =========================
    # 1️ GDP Demand Pressure
    # =========================
    delta_gdp_pct = ((GDP - BASELINE_GDP) / BASELINE_GDP) * 100

    # =========================
    # 2️ Fiscal Pressure
    # =========================
    deficit_ratio = deficit / GDP if GDP != 0 else 0

    # =========================
    # 3️ Wage Pressure
    # =========================
    BASE_WAGE = 500
    wage_pressure = (wage - BASE_WAGE) / BASE_WAGE

    # =========================
    # 4️ Inflation Formula
    # =========================
    inflation = (
        BASELINE_INFLATION
        + 0.3 * delta_gdp_pct
        + 0.5 * deficit_ratio
        + 0.4 * wage_pressure
    )

    # Clamp realistic bounds
    inflation = max(2, min(15, inflation))

    return inflation
