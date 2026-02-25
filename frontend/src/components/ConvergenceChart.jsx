 import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function ConvergenceChart({ convergence }) {
  if (!convergence || !convergence.history) return null;

  const chartData = convergence.history.map((value, index) => ({
    iteration: index + 1,
    difference: value,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="iteration" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="difference"
          stroke="#2563eb"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
