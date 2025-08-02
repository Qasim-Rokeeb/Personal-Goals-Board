import { useEffect, useState } from "react";

export default function ToggleTheme() {
  const [dark, setDark] = useState(() => localStorage.theme === "dark");

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition"
      aria-label="Toggle theme"
    >
      <span className="text-xl">{dark ? "🌞" : "🌙"}</span>
    </button>
  );
}