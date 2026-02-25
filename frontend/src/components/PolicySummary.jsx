export default function PolicySummary({ data }) {
  if (!data) return null;

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Policy Evaluation</h2>

      <div className="mb-6">
        <p className="text-lg font-semibold">Policy Score</p>
        <p className="text-4xl font-bold text-blue-600">
          {data.policy_score}
        </p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">AI Insights:</h3>
        <ul className="list-disc pl-6 text-gray-700">
          {data.ai_advice.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
