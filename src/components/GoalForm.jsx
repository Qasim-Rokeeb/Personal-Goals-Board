import { useState } from "react";
import { motion } from "framer-motion";

export default function GoalForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      id: Date.now(),
      title: title.trim(),
      tasks: tasks
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      status: "Not Started",
    });

    setTitle("");
    setTasks("");
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow p-6"
    >
      <h2 className="text-lg font-semibold mb-4">Add New Goal</h2>

      <label className="block mb-1 text-sm font-medium">Goal title</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Finish side project"
        className="w-full mb-3 p-2 rounded-md bg-slate-100 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />

      <label className="block mb-1 text-sm font-medium">
        Tasks (comma-separated)
      </label>
      <input
        value={tasks}
        onChange={(e) => setTasks(e.target.value)}
        placeholder="Deploy to Vercel, Write README, Tweet about it"
        className="w-full mb-4 p-2 rounded-md bg-slate-100 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <button
        type="submit"
        className="px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
      >
        Add Your New Goal// Track your progress
      </button>
    </motion.form>
  );
}