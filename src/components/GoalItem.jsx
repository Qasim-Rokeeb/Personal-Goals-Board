
// Import animation and memoization hooks
import { motion } from "framer-motion";
import { useMemo } from "react";

// List of possible statuses
const STATUS_LIST = ["Not Started", "In Progress", "Completed"];
// Color classes for each status
const STATUS_COLORS = {
  "Not Started": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  Completed: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
};

// GoalItem component displays a single goal with actions
export default function GoalItem({ goal, onUpdate, onDelete }) {
  // Memoize status color for current goal
  const statusColor = useMemo(() => STATUS_COLORS[goal.status], [goal.status]);

  return (
    // Animated card for the goal section
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition-shadow p-5"
    >
      {/* Header: title and delete button */}
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

      {/* Status badge */}
      <p className="text-sm mb-3">
        Status:{" "}
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusColor}`}
        >
          {goal.status}
        </span>
      </p>

      {/* Status change buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {STATUS_LIST.map((s) => (
          <button
            key={s}
            onClick={() => onUpdate(goal.id, s)}
            className={`px-3 py-1 text-sm rounded-md transition ${
              goal.status === s
                ? "bg-blue-600 text-white"
                : "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Task list, if any */}
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