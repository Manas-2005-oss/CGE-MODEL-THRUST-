from config import BASELINE_GDP, BASELINE_SPENDING, BASELINE_INCOME_TAX

def apply_fiscal(GDP_raw, inputs):

    # Tax distortion
    tax_impact = 1 - 0.3 * ((inputs.incomeTax - BASELINE_INCOME_TAX) / BASELINE_INCOME_TAX)
    GDP_tax = GDP_raw * tax_impact

    # Spending multiplier
    shock = inputs.govSpending - BASELINE_SPENDING
    multiplier = 1 + 0.02 * (shock / BASELINE_GDP)

    GDP_final = GDP_tax * multiplier

    # Revenue
    revenue = (inputs.incomeTax / 100) * 0.4 * GDP_final
    deficit = inputs.govSpending - revenue

    return GDP_final, deficit
