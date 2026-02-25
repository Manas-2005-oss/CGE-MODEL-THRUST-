import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function AboutUs() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-indigo-50 via-white to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-all duration-500">

      {/* Animated Glow */}
      <div className="absolute -top-50 -right-50 w-125 h-125 bg-indigo-400/20 dark:bg-green-400/20 blur-[120px] rounded-full animate-pulse"></div>

      <Navbar />

      {/* HERO SECTION */}
      <section className="pt-36 pb-24 px-6 text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-6 tracking-tight"
        >
          THRUST – CGE Economic Simulation Framework
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg max-w-4xl mx-auto text-slate-600 dark:text-slate-300 leading-relaxed"
        >
          THRUST is a CGE-inspired macroeconomic simulation engine modeling
          sectoral ripple effects, fiscal shocks, labor mobility, inflation
          feedback, and dynamic equilibrium convergence.
        </motion.p>
      </section>

      <div className="max-w-6xl mx-auto px-6 space-y-24 pb-24 relative z-10">

        <Section title="Project Objective">
          <p>
            THRUST simulates how macroeconomic policy shocks propagate across
            Agriculture, Manufacturing, and Services through production,
            fiscal flows, labor markets, and equilibrium adjustment.
          </p>
        </Section>

        <Section title="1. Production Block">
          <Formula>Yi = Yi_base × (1 + Productivity_i/100 + Subsidy_i/100)</Formula>
          <Formula>GDP_raw = YA + YM + YS</Formula>
          <Formula>RippleEffect = A_matrix × Sector_Output_Vector</Formula>
        </Section>

        <Section title="2. Fiscal & Government Block">
          <Formula>
            Revenue = IncomeTax × 0.4 × GDP + CorporateTax × 0.2 × GDP
          </Formula>
          <Formula>
            Deficit = GovSpending + Subsidies − Revenue
          </Formula>
          <Formula>
            GDP_adjusted = GDP_raw + FiscalMultiplier × GovSpending
          </Formula>
        </Section>

        <Section title="3. Labor Market & Wage Dynamics">
          <Formula>
            ΔGDP% = (GDP − BaselineGDP) / BaselineGDP × 100
          </Formula>
          <Formula>
            Unemployment = BaselineUnemployment − β × ΔGDP%
          </Formula>
          <Formula>
            Wage = BaselineWage × (1 + WagePressure + MinimumWageEffect)
          </Formula>
          <Formula>
            LaborShare_i = Yi / GDP
          </Formula>
        </Section>

        <Section title="4. Inflation Model">
          <Formula>
            Inflation = BaselineInflation + 0.6 × (Deficit/GDP) +
            0.3 × ΔGDP% + 0.2 × WageGrowth
          </Formula>
        </Section>

        <Section title="5. Iterative Equilibrium Solver">
          <Formula>
            GDP(t+1) = GDP(t) × (1 − Inflation / λ)
          </Formula>
          <Formula>
            |GDP(t+1) − GDP(t)| &lt; ε → Convergence Achieved
          </Formula>
        </Section>

        <Section title="6. Social Accounting Matrix (SAM)">
          <Formula>LaborIncome_i = 0.6 × Yi</Formula>
          <Formula>CapitalIncome_i = 0.4 × Yi</Formula>
        </Section>

        <Section title="7. AI-Based Policy Scoring">
          <Formula>
            Score = 50 + 0.5 × GDP_growth − 0.7 × Inflation − 1 ×
            Unemployment − 0.05 × |Deficit|
          </Formula>
        </Section>

        <Section title="System Architecture">
          <ul className="list-disc ml-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Production Module</li>
            <li>Fiscal Engine</li>
            <li>Labor Market Module</li>
            <li>Inflation & Equilibrium Solver</li>
            <li>Social Accounting Matrix Engine</li>
            <li>AI Policy Ranking System</li>
            <li>Interactive Dashboard Visualization</li>
          </ul>
        </Section>

      </div>

      <div className="text-center text-sm pb-12 text-slate-500 dark:text-slate-400 relative z-10">
        THRUST © 2026
      </div>
    </div>
  );
}

/* ================= SECTION COMPONENT ================= */

const Section = ({ title, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="p-10 rounded-3xl backdrop-blur-lg bg-white/70 dark:bg-slate-800/70 shadow-2xl hover:shadow-indigo-200 dark:hover:shadow-green-500/20 transition-all duration-500"
  >
    <h2 className="text-3xl font-bold mb-6 relative inline-block">
      {title}
      <span className="block h-1 w-16 bg-linear-to-r from-indigo-500 to-purple-600 dark:from-green-400 dark:to-blue-500 mt-2 rounded-full"></span>
    </h2>

    <div className="space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
      {children}
    </div>
  </motion.section>
);

/* ================= FORMULA COMPONENT ================= */

const Formula = ({ children }) => (
  <div className="mt-4 px-6 py-4 rounded-2xl bg-linear-to-r from-indigo-100 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border-l-4 border-indigo-600 dark:border-green-400 font-mono text-indigo-700 dark:text-green-400 shadow-inner hover:scale-[1.02] transition-transform duration-300">
    {children}
  </div>
);
