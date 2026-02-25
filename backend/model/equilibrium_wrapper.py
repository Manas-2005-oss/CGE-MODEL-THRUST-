def solve_equilibrium(run_simulation, inputs, max_iter=25, tol=0.1):


    previous_gdp = None
    previous_wage = None
    convergence_history = []

    for i in range(max_iter):

        result = run_simulation(inputs)

        current_gdp = result["policy"]["GDP"]
        current_inflation = result["policy"]["inflation"]
        current_unemployment = result["policy"]["unemployment"]
        current_wage = result["policy"]["wage"]

        # ==============================
        # GOODS MARKET FEEDBACK
        # ==============================
        real_adjustment = 1 - (current_inflation / 300)


        # Feed inflation back into production inputs
        inputs.agriProd *= real_adjustment
        inputs.mfgProd *= real_adjustment
        inputs.svcProd *= real_adjustment

        # ==============================
        # FACTOR MARKET FEEDBACK
        # ==============================
        if current_unemployment < 3:
            inputs.minWage *= 1.01
        elif current_unemployment > 8:
            inputs.minWage *= 0.99

        # ==============================
        # CONVERGENCE CHECK
        # ==============================
        if previous_gdp is not None and previous_wage is not None:

            gdp_diff = abs(current_gdp - previous_gdp)
            wage_diff = abs(current_wage - previous_wage)

            convergence_history.append(max(gdp_diff, wage_diff))

            if max(gdp_diff, wage_diff) < tol:
                result["convergence"] = {
                    "iterations": i,
                    "history": convergence_history,
                    "status": "Converged"
                }
                return result

        previous_gdp = current_gdp
        previous_wage = current_wage

    result["convergence"] = {
        "iterations": max_iter,
        "history": convergence_history,
        "status": "Max iterations reached"
    }

    return result
