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
    setGoals(goals.map((g) => (g.id === id ? { ...g, status } : g)));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors">
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            🎯 Personal Goals Board
          </h1>
          <ToggleTheme />
        </header>

        {/* ------------- Add Goal ------------- */}
        <section className="mb-8">
          <GoalForm onAdd={addGoal} />
        </section>

        {/* ------------- Goals ------------- */}
        {goals.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Goals</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {goals.map((goal) => (
                <GoalItem
                  key={goal.id}
                  goal={goal}
                  onUpdate={updateGoalStatus}
                  onDelete={removeGoal}
                />
              ))}
            </div>
          </section>
        )}

        {/* ------------- Progress ------------- */}
        <section>
          <ProgressChart goals={goals} />
        </section>
      </main>
    </div>
  );
}