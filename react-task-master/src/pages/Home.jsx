import React from 'react';
import TaskManager from '../components/TaskManager';
import { useTheme } from '../hooks/useTheme';
import Button from '../components/Button';
import Card from '../components/Card';

function Home() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex justify-end">
        <Button
          variant="secondary"
          onClick={toggleTheme}
          className="flex items-center gap-2"
        >
          {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </Button>
      </div>

      <Card title="Task Manager">
        <TaskManager />
      </Card>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Features">
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
            <li>Add, complete, and delete tasks</li>
            <li>Filter tasks by status</li>
            <li>Dark mode support</li>
            <li>Persistent storage</li>
          </ul>
        </Card>

        <Card title="About">
          <p className="text-gray-600 dark:text-gray-400">
            This task manager uses React's useState and useEffect hooks for state management,
            useContext for theme handling, and a custom useLocalStorage hook for data persistence.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Home;