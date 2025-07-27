import React from 'react';
import GoalsBoard from './components/GoalsBoard';
import { ThemeToggle } from './components/ThemeToggle';

const App = () => {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-8 md:px-12">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🎯 Personal Goals Board</h1>
        <ThemeToggle />
      </div>
      <GoalsBoard />
    </div>
  );
};

export default App;