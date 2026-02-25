 export default function ScenarioComparison({ data }) {
  if (!data || !data.ranking || data.ranking.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">
          Scenario Comparison
        </h2>
        <p className="text-gray-500">
          No scenarios available yet. Run simulation to generate.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-lg font-semibold mb-4">
        Scenario Comparison
      </h2>

      <div className="mb-4 p-4 bg-green-100 rounded-xl">
        🏆 Best Policy: <strong>{data.best_policy}</strong>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Scenario</th>
            <th className="p-2 border">GDP</th>
            <th className="p-2 border">Inflation</th>
            <th className="p-2 border">Unemployment</th>
            <th className="p-2 border">Score</th>
          </tr>
        </thead>

        <tbody>
          {data.ranking.map((item, index) => (
            <tr key={index}>
              <td className="p-2 border">{item.scenario}</td>
              <td className="p-2 border">{item.GDP}</td>
              <td className="p-2 border">{item.Inflation}</td>
              <td className="p-2 border">{item.Unemployment}</td>
              <td className="p-2 border font-bold text-blue-600">
                {item.PolicyScore}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
