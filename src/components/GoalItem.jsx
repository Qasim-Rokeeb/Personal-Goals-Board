import { motion } from "framer-motion";

export default function GoalItem({ goal, onUpdate, onDelete }) {
  return (
    <motion.div
      layout
      className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded shadow"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">{goal.title}</h3>
        <button onClick={() => onDelete(goal.id)} className="text-red-500">
          🗑
        </button>
      </div>
      <p className="text-sm mt-1 mb-2">
        Status:{" "}
        <span className="font-semibold text-blue-600">{goal.status}</span>
      </p>
      <div className="flex gap-2">
        {["Not Started", "In Progress", "Completed"].map((s) => (
          <button
            key={s}
            onClick={() => onUpdate(goal.id, s)}
            className={`px-3 py-1 rounded text-sm ${
              goal.status === s
                ? "bg-blue-600 text-white"
                : "bg-zinc-200 dark:bg-zinc-700"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <ul className="mt-3 text-sm list-disc list-inside text-zinc-700 dark:text-zinc-300">
        {goal.tasks.map((task, i) => (
          <li key={i}>{task}</li>
        ))}
      </ul>
    </motion.div>
  );
}
