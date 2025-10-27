import React from 'react';

const Button = ({ 
  variant = 'primary', 
  children, 
  onClick, 
  className = '',
  disabled = false 
}) => {
  const baseStyles = 'px-4 py-2 rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
  };

  const variantStyles = variants[variant] || variants.primary;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </button>
  );
};

export default Button; 