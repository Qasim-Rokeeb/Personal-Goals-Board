
import { useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function GoalForm({ onAdd }) {

  const [form, setForm] = useState({ title: "", tasks: "" });


  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!form.title.trim()) return;
      onAdd({
        id: Date.now(),
        title: form.title.trim(),
        tasks: form.tasks
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        status: "Not Started",
      });
      setForm({ title: "", tasks: "" });
    },
    [form, onAdd]
  );

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
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="e.g. Finish side project"
        className="w-full mb-3 p-2 rounded-md bg-slate-100 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />

      <label className="block mb-1 text-sm font-medium">
        Tasks (comma-separated)
      </label>
      <input
        name="tasks"
        value={form.tasks}
        onChange={handleChange}
        placeholder="Deploy to Vercel, Write README, Tweet about it"
        className="w-full mb-4 p-2 rounded-md bg-slate-100 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      <button
        type="submit"
        className="px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
      >
        Add Your New Goal and track easily
      </button>
    </motion.form>
  );
}