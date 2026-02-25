 import { useEffect, useState } from "react";

import SAMDiagram from "./SAMDiagram";
import PolicySummary from "./PolicySummary";
import ConvergenceChart from "./ConvergenceChart";
import ScenarioComparison from "./ScenarioComparison";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B"];

export default function ResultsPanel({ results }) {
  if (!results || !results.policy) return null;

  const { baseline, policy, changes, SAM } = results;
  const [comparisonData, setComparisonData] = useState(null);

  /* ================= FETCH SCENARIOS ================= */
  useEffect(() => {
    const fetchComparison = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/compare");
        if (!res.ok) return;
        const data = await res.json();
        setComparisonData(data);
      } catch (err) {
        console.error("Comparison fetch failed:", err);
      }
    };

    fetchComparison();
  }, [results]);

  /* ================= PRINT EXPORT ================= */
  const handleExport = () => {
    window.print();
  };

  const gdpTrendData = [
    { name: "Baseline", GDP: baseline.GDP },
    { name: "Policy", GDP: policy.GDP },
  ];

  const sectorData = [
    { name: "Agriculture", value: policy.sectorOutput.agriculture },
    { name: "Manufacturing", value: policy.sectorOutput.manufacturing },
    { name: "Services", value: policy.sectorOutput.services },
  ];

  const laborData = [
    { name: "Agriculture", value: policy.laborShare.agriculture * 100 },
    { name: "Manufacturing", value: policy.laborShare.manufacturing * 100 },
    { name: "Services", value: policy.laborShare.services * 100 },
  ];

  const macroData = [
    { name: "Inflation", value: policy.inflation },
    { name: "Deficit", value: policy.deficit },
  ];

  return (
    <div className="space-y-12">

      {/* REPORT CONTENT */}
      <div id="report-content" className="space-y-12">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card title="GDP" value={policy.GDP} change={changes.gdp_change} />
          <Card title="Unemployment" value={`${policy.unemployment}%`} change={changes.unemployment_change} />
          <Card title="Inflation" value={`${policy.inflation}%`} change={changes.inflation_change} />
          <Card title="Wage" value={`₹ ${policy.wage.toLocaleString("en-IN")}`} change={changes.wage_change} />
          <Card title="Fiscal Deficit" value={policy.deficit} change={changes.deficit_change} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChartCard title="Policy Evaluation">
            <PolicySummary data={results} />
          </ChartCard>

          <ChartCard title="Equilibrium Convergence Curve">
            <ConvergenceChart convergence={results.convergence} />
          </ChartCard>
        </div>

        <ChartCard title="Labor Allocation">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={laborData} dataKey="value" nameKey="name" outerRadius={120} label>
                {laborData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChartCard title="GDP Impact (Baseline vs Policy)">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={gdpTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="GDP" stroke="#3B82F6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Sector Output">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={sectorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ChartCard title="Inflation & Fiscal Pressure">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={macroData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Social Accounting Matrix (SAM)">
            <div className="h-80">
              <SAMDiagram sam={SAM} />
            </div>
          </ChartCard>
        </div>

        {comparisonData?.ranking?.length > 0 && (
          <ScenarioComparison data={comparisonData} />
        )}

      </div>

      {/* EXPORT BUTTON */}
      <div className="flex justify-center pt-8 print:hidden">
        <button
          onClick={handleExport}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg transition-all"
        >
          Export Full Dashboard (PDF)
        </button>
      </div>

    </div>
  );
}

function Card({ title, value, change }) {
  const isPositive = change >= 0;
  const showPercent = title === "GDP" || title === "Wage";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className={`text-sm mt-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? "▲" : "▼"} {Math.abs(change)}
        {showPercent ? "%" : ""}
      </p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
