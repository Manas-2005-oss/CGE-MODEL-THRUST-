 import { useState } from "react";
import Navbar from "../components/Navbar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = ["#2563EB", "#059669", "#F59E0B"];

export default function LaborAdjustment() {

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const [inputs, setInputs] = useState({
    agriProd: 0,
    mfgProd: 0,
    svcProd: 0,
    incomeTax: 20,
    corporateTax: 25,
    govSpending: 150,
    infraShare: 10,
    agriSubsidy: 0,
    mfgSubsidy: 0,
    svcSubsidy: 0,
    laborShift: 0,
    minWage: 600,
    fromSector: "agriculture",
    toSector: "manufacturing",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSimulation = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:8000/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs),
      });

      if (!response.ok) {
        console.error("Backend error:", response.status);
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Backend Response:", data);

      setResults(data);
      setLoading(false);

    } catch (err) {
      console.error("Error:", err);
      setLoading(false);
    }
  };

  const resetToBaseline = () => {
    setInputs({
      ...inputs,
      laborShift: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">

        {/* HEADER */}
        <div className="bg-linear-to-r from-blue-800 to-blue-600 text-white p-6 rounded-xl shadow-lg mb-8">
          <h1 className="text-2xl font-bold">
            Labor Market Adjustment Dashboard
          </h1>
          <p className="text-sm opacity-90">
            CGE Model – Wage & Employment Redistribution
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6">

          {/* LEFT CONTROL PANEL */}
          <div className="col-span-1 bg-white p-6 rounded-xl shadow space-y-6">

            <h2 className="text-lg font-semibold">
              Policy Simulation Controls
            </h2>

            <div>
              <label className="text-sm">Move Labor From</label>
              <select
                name="fromSector"
                value={inputs.fromSector}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded"
              >
                <option value="agriculture">Agriculture</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="services">Services</option>
              </select>
            </div>

            <div>
              <label className="text-sm">Move Labor To</label>
              <select
                name="toSector"
                value={inputs.toSector}
                onChange={handleChange}
                className="w-full mt-2 p-2 border rounded"
              >
                <option value="agriculture">Agriculture</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="services">Services</option>
              </select>
            </div>

            <div>
              <label className="text-sm">Labor Shift (%)</label>
              <input
                type="range"
                min="0"
                max="20"
                name="laborShift"
                value={inputs.laborShift}
                onChange={handleChange}
                className="w-full mt-2"
              />
              <div className="text-right text-sm">
                {inputs.laborShift}%
              </div>
            </div>

            <button
              onClick={handleSimulation}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Run Simulation
            </button>

            <button
              onClick={resetToBaseline}
              className="w-full border py-2 rounded"
            >
              Reset to Baseline
            </button>

          </div>

          {/* RIGHT PANEL */}
          <div className="col-span-3 space-y-6">

            {loading && (
              <div className="text-blue-600 font-semibold">
                Running Simulation...
              </div>
            )}

            {results && results.policy && (
              <>
                {/* KPI Row */}
                <div className="grid grid-cols-4 gap-6">
                  <KPI title="GDP" value={results.policy.GDP} />
                  <KPI title="Unemployment" value={`${results.policy.unemployment}%`} />
                  <KPI title="Wage" value={`₹ ${results.policy.wage}`} />
                  <KPI title="Inflation" value={`${results.policy.inflation}%`} />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-2 gap-6">

                  {/* Employment Donut */}
                  <Card title="Employment Distribution">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Agriculture", value: results.policy.laborShare.agriculture * 100 },
                            { name: "Manufacturing", value: results.policy.laborShare.manufacturing * 100 },
                            { name: "Services", value: results.policy.laborShare.services * 100 },
                          ]}
                          dataKey="value"
                          innerRadius={60}
                          outerRadius={100}
                        >
                          {COLORS.map((color, index) => (
                            <Cell key={index} fill={color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>

                  {/* Wage Comparison */}
                  <Card title="Wage Comparison">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[
                          { name: "Baseline", value: results.baseline.wage },
                          { name: "Policy", value: results.policy.wage },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#2563EB" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>

                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

/* KPI */
function KPI({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-sm text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}

/* Card */
function Card({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
