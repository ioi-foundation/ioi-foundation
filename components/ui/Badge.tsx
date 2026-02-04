import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'success' | 'warning' | 'purple';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const baseStyles = "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium";
  const variants = {
    default: "bg-zinc-800 text-zinc-300",
    outline: "border border-zinc-700 text-zinc-400",
    success: "bg-green-900/30 text-green-400 border border-green-900",
    warning: "bg-amber-900/30 text-amber-400 border border-amber-900",
    purple: "bg-indigo-900/30 text-indigo-300 border border-indigo-900",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};