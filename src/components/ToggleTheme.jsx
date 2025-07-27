import { useEffect, useState } from "react";

export default function ToggleTheme() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="text-2xl"
      title="Toggle Theme"
    >
      {dark ? "🌞" : "🌙"}
    </button>
  );
}
