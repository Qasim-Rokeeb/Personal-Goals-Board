import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";
Chart.register(BarElement, CategoryScale, LinearScale);

export default function ProgressChart({ goals }) {
  const statusCounts = {
    "Not Started": 0,
    "In Progress": 0,
    Completed: 0,
  };

  goals.forEach((g) => {
    statusCounts[g.status]++;
  });

  const data = {
    labels: ["Not Started", "In Progress", "Completed"],
    datasets: [
      {
        label: "Goals",
        data: [
          statusCounts["Not Started"],
          statusCounts["In Progress"],
          statusCounts["Completed"],
        ],
        backgroundColor: ["#d97706", "#2563eb", "#16a34a"],
      },
    ],
  };

  return (
    <div className="mt-6 bg-zinc-100 dark:bg-zinc-800 p-4 rounded">
      <h2 className="font-semibold mb-4">Weekly Progress</h2>
      <Bar data={data} />
    </div>
  );
}
