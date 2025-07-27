import { useState, useEffect } from "react";
import GoalForm from "./components/GoalForm";
import GoalItem from "./components/GoalItem";
import ProgressChart from "./components/ProgressChart";
import ToggleTheme from "./components/ToggleTheme";

export default function App() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = (goal) => setGoals([goal, ...goals]);
  const removeGoal = (id) => setGoals(goals.filter((g) => g.id !== id));
  const updateGoalStatus = (id, status) =>
    setGoals(
      goals.map((g) => (g.id === id ? { ...g, status } : g))
    );

  return (
    <div className="min-h-screen px-4 py-6 md:px-12 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition-all">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">🎯 Personal Goals Board</h1>
          <ToggleTheme />
        </div>
        <GoalForm onAdd={addGoal} />
        <div className="grid gap-4 mt-6">
          {goals.map((goal) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              onUpdate={updateGoalStatus}
              onDelete={removeGoal}
            />
          ))}
        </div>
        <ProgressChart goals={goals} />
      </div>
    </div>
  );
}
