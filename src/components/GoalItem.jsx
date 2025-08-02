import { motion } from "framer-motion";

const statusColors = {
  "Not Started": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  Completed: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
};

export default function GoalItem({ goal, onUpdate, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition-shadow p-5"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg leading-tight break-all">{goal.title}</h3>

        <button
          onClick={() => onDelete(goal.id)}
          className="ml-4 text-slate-400 hover:text-red-500 transition"
          aria-label="Delete goal"
        >
          🗑
        </button>
      </div>

      <p className="text-sm mb-3">
        Status:{" "}
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColors[goal.status]}`}
        >
          {goal.status}
        </span>
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {["Not Started", "In Progress", "Completed"].map((s) => (
          <button
            key={s}
            onClick={() => onUpdate(goal.id, s)}
            className={`px-3 py-1 text-sm rounded-md transition
              ${goal.status === s
                ? "bg-blue-600 text-white"
                : "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {goal.tasks.length > 0 && (
        <ul className="space-y-1 text-sm list-disc list-inside text-slate-600 dark:text-slate-400">
          {goal.tasks.map((task, i) => (
            <li key={i}>{task}</li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}