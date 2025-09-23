import { useEffect, useState, useCallback } from "react";

export default function ToggleTheme() {
  // Initialize theme from localStorage or system preference
  const getInitialTheme = () => {
    if (typeof window === "undefined") return false;
    if (localStorage.theme) return localStorage.theme === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };
  const [dark, setDark] = useState(getInitialTheme);

  // Update root class and localStorage when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  // Toggle theme handler
  const toggleTheme = useCallback(() => setDark((prev) => !prev), []);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition"
      aria-label="Toggle theme"
    >
      <span className="text-xl">{dark ? "🌞" : "🌙"}</span>
    </button>
  );
}