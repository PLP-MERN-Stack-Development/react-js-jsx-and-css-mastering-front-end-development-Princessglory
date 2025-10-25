import React from 'react';

function About() {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4">About Task Manager</h1>
        <p className="text-gray-600 dark:text-gray-400">
          This is a task management application built with React and Tailwind CSS.
        </p>
      </div>
    </div>
  );
}

export default About;