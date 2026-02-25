# 🚀 THRUST – CGE Economic Policy Simulator

THRUST is a Computable General Equilibrium (CGE)-inspired macroeconomic simulation platform that models how fiscal and structural policy decisions impact GDP, employment, inflation, wages, sectoral output, and fiscal balance.

This project was developed as a hackathon solution to simulate intersector economic relationships and visualize policy-driven ripple effects in a dynamic equilibrium framework.

---

## 🎯 Problem Statement

Design a simplified CGE model that captures:

- Intersector production relationships
- Fiscal policy shocks (tax, spending, subsidy)
- Labor market adjustments
- Inflation feedback effects
- Equilibrium convergence
- AI-based policy evaluation

---

## 🧠 How THRUST Works

When the simulator runs:

1. Sectoral productivity or policy shocks are applied.
2. Production outputs are recalculated.
3. GDP is computed from sectoral output.
4. Fiscal revenue and deficit are evaluated.
5. Unemployment adjusts using an Okun-inspired rule.
6. Inflation responds to demand and deficit pressure.
7. An equilibrium solver stabilizes the economy.
8. AI-based policy scoring ranks scenario quality.
9. Social Accounting Matrix (SAM) visualizes flow relationships.

---

## 📊 Key Economic Components

### Production Function


---

## 🏗 Architecture

### Backend (FastAPI)
- Modular economic engine
- Production module
- Fiscal module
- Labor market module
- Inflation module
- Equilibrium solver
- AI policy scoring
- Scenario comparison system

### Frontend (React + Tailwind)
- Interactive policy input dashboard
- GDP impact visualization
- Sectoral output charts
- Labor allocation pie chart
- Convergence curve
- Social Accounting Matrix (Sankey)
- Scenario ranking system
