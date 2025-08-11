import React from 'react';

function Button({ 
  children, 
  variant = "primary", 
  onClick, 
  className = "", 
  startIcon,
  size = "medium",
  fullWidth = false,
  ...props 
}) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    text: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500"
  };

  const sizes = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base"
  };
  
  const classes = `
    ${baseClasses} 
    ${variants[variant]} 
    ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;
  
  return (
    <button 
      className={classes}
      onClick={onClick}
      {...props}
    >
      {startIcon && <span className="mr-2 -ml-1">{startIcon}</span>}
      {children}
    </button>
  );
}

export default Button;
