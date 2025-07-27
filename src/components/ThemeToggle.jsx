import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="text-xl p-2 rounded focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {darkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};