

def generate_policy_advice(result):
    """
    Generates AI-style macroeconomic interpretation
    based on policy simulation results.
    """

    policy = result["policy"]
    baseline = result["baseline"]

    advice = []

    # ===============================
    #  Growth Analysis
    # ===============================
    if policy["GDP"] > baseline["GDP"]:
        advice.append("Policy stimulates economic growth.")
    elif policy["GDP"] < baseline["GDP"]:
        advice.append("Policy reduces overall economic output.")

    # ===============================
    #  Labor Market Analysis
    # ===============================
    if policy["unemployment"] < baseline["unemployment"]:
        advice.append("Labor market conditions improve.")
    elif policy["unemployment"] > baseline["unemployment"]:
        advice.append("Unemployment increases under this policy.")

    # ===============================
    #  Inflation Risk
    # ===============================
    if policy["inflation"] > 12:
        advice.append("High inflation risk detected. Consider tightening fiscal expansion.")
    elif policy["inflation"] > baseline["inflation"]:
        advice.append("Moderate inflationary pressure observed.")

    # ===============================
    # Fiscal Sustainability
    # ===============================
    if policy["deficit"] > 0:
        advice.append("Government deficit increases. Long-term sustainability may be affected.")
    elif policy["deficit"] < 0:
        advice.append("Fiscal surplus improves government balance.")

    # ===============================
    #  Sectoral Dominance Insight
    # ===============================
    sector_output = policy["sectorOutput"]

    dominant_sector = max(sector_output, key=sector_output.get)
    advice.append(f"{dominant_sector.capitalize()} sector drives the majority of output.")

    if not advice:
        advice.append("Policy impact appears neutral across macro indicators.")

    return advice


# ============================================
# 📊 POLICY SCORE FUNCTION
# Used to rank policies for hackathon demo
# ============================================
def policy_score(result):

    policy = result["policy"]
    baseline = result["baseline"]

    # GDP growth %
    growth = ((policy["GDP"] - baseline["GDP"]) / baseline["GDP"]) * 100

    # Start from neutral base
    score = 50

    score += growth * 0.5          # reward growth
    score -= policy["inflation"] * 0.7
    score -= policy["unemployment"] * 1
    score -= abs(policy["deficit"]) * 0.05

    # Clamp between 0 and 100
    score = max(0, min(100, score))

    return round(score, 2)
