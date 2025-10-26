import React from 'react';

export default function Navbar({ isDark, onToggle }) {
  return (
    <nav className={`w-full p-4 flex justify-between items-center ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow`}>
      <h1 className="text-xl font-bold">Developer Dashboard</h1>
      <button onClick={onToggle} className="p-2 rounded bg-gray-200 hover:bg-gray-300">
        {isDark ? '☀️ Light' : '🌙 Dark'}
      </button>
    </nav>
  );
}
