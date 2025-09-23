
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip } from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip);


import { useMemo } from "react";

export default function ProgressChart({ goals }) {
  // Efficiently count goal statuses
  const counts = useMemo(() => {
    const c = { "Not Started": 0, "In Progress": 0, Completed: 0 };
    for (const g of goals) {
      if (c[g.status] !== undefined) c[g.status]++;
    }
    return c;
  }, [goals]);

  // Memoize chart data and options for performance
  const data = useMemo(() => ({
    labels: ["Not Started", "In Progress", "Completed"],
    datasets: [
      {
        data: [counts["Not Started"], counts["In Progress"], counts["Completed"]],
        backgroundColor: ["#f59e0b", "#3b82f6", "#22c55e"],
        borderRadius: 4,
      },
    ],
  }), [counts]);

  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
  }), []);

  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Weekly Progress</h2>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
}