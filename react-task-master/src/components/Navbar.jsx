import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const Navbar = ({ brandName = 'Task Manager', links = [] }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white">
              {brandName}
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    to={link.to}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white border border-transparent hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? '🌞 Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;