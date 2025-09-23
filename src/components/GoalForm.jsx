
// Import React hooks and framer-motion for animation
import { useState, useCallback } from "react";
import { motion } from "framer-motion";


// GoalForm component for adding new goals
export default function GoalForm({ onAdd }) {
  // State for form fields
  const [form, setForm] = useState({ title: "", tasks: "" });


  // Handle input changes for both fields
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Handle form submission to add a new goal
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault(); // Prevent page reload
      if (!form.title.trim()) return; // Require a title
      onAdd({
        id: Date.now(), // Unique id for the goal
        title: form.title.trim(),
        tasks: form.tasks
          .split(",") // Split tasks by comma
          .map((t) => t.trim()) // Remove extra spaces
          .filter(Boolean), // Remove empty tasks
        status: "Not Started", // Default status
      });
      setForm({ title: "", tasks: "" }); // Reset form
    },
    [form, onAdd]
  );

  return (
    // Animated form container
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow p-6"
    >
      <h2 className="text-lg font-semibold mb-4">Add New Goal</h2>

      {/* Goal title input */}
      <label className="block mb-1 text-sm font-medium">Goal title</label>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="e.g. Finish side project"
        className="w-full mb-3 p-2 rounded-md bg-slate-100 dark:bg-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
        required
      />

      {/* Tasks input (comma-separated) */}
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

      {/* Submit button */}
      <button
        type="submit"
        className="px-4 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition"
      >
        Add Your New Goal and track easily
      </button>
    </motion.form>
  );
}