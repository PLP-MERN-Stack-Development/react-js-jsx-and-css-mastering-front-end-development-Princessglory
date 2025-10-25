import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ 
  links = [], 
  copyrightText = `© ${new Date().getFullYear()} Task Manager. All rights reserved.` 
}) => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {links.length > 0 && (
          <div className="flex justify-center space-x-6 mb-4">
            {links.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                {link.text}
              </Link>
            ))}
          </div>
        )}
        <p className="text-center text-gray-500 dark:text-gray-400">
          {copyrightText}
        </p>
      </div>
    </footer>
  );
};

export default Footer;