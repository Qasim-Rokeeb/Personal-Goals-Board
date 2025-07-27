import { useState } from "react";
import { motion } from "framer-motion";

export default function GoalForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    onAdd({
      id: Date.now(),
      title,
      tasks: tasks.split(",").map((t) => t.trim()),
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
      className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded"
    >
      <h2 className="font-semibold mb-2">Add New Goal</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Goal title"
        className="w-full mb-2 p-2 rounded bg-white dark:bg-zinc-700"
      />
      <input
        value={tasks}
        onChange={(e) => setTasks(e.target.value)}
        placeholder="Comma-separated tasks"
        className="w-full mb-2 p-2 rounded bg-white dark:bg-zinc-700"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Goal
      </button>
    </motion.form>
  );
}
