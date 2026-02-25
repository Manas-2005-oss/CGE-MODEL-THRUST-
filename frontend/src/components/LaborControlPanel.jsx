import { useState } from "react";

export default function LaborControlPanel({ onRun }) {

  const [fromSector, setFromSector] = useState("agriculture");
  const [toSector, setToSector] = useState("manufacturing");
  const [laborShift, setLaborShift] = useState(10);

  const handleRun = () => {
    onRun({
      laborShift,
      fromSector,
      toSector,
      minWage: 600,
      agriProd: 0,
      mfgProd: 0,
      svcProd: 0,
      agriSubsidy: 0,
      mfgSubsidy: 0,
      svcSubsidy: 0,
      incomeTax: 20,
      corporateTax: 25,
      govSpending: 150,
      infraShare: 10,
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-6">

      <h2 className="font-semibold text-lg">
        Policy Simulation Controls
      </h2>

      <div>
        <label className="text-sm font-medium">Move Labor From</label>
        <select
          value={fromSector}
          onChange={(e) => setFromSector(e.target.value)}
          className="w-full border rounded p-2 mt-1"
        >
          <option value="agriculture">Agriculture</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="services">Services</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">To</label>
        <select
          value={toSector}
          onChange={(e) => setToSector(e.target.value)}
          className="w-full border rounded p-2 mt-1"
        >
          <option value="agriculture">Agriculture</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="services">Services</option>
        </select>
      </div>

      <div>
        <label className="text-sm font-medium">
          Labor Shift ({laborShift}%)
        </label>

        <input
          type="range"
          min="0"
          max="20"
          value={laborShift}
          onChange={(e) => setLaborShift(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <button
        onClick={handleRun}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Run Simulation
      </button>

    </div>
  );
}
