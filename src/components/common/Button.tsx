import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'green' | 'destructive' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-ios-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ios-active select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
    icon: 'p-2 text-sm'
  };

  const variantStyles = {
    primary: 'bg-ios-navy hover:bg-ios-navyLight active:bg-ios-navyDark text-white shadow-ios-sm focus-visible:ring-ios-navy',
    green: 'bg-ios-green hover:bg-ios-greenLight active:bg-ios-greenDark text-white shadow-ios-sm focus-visible:ring-ios-green',
    secondary: 'bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightText dark:text-ios-darkText hover:bg-slate-200 dark:hover:bg-slate-700/60 focus-visible:ring-slate-400',
    outline: 'border border-ios-lightBorder dark:border-ios-darkBorder bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-ios-lightText dark:text-ios-darkText',
    destructive: 'bg-ios-red hover:bg-red-700 text-white shadow-ios-sm focus-visible:ring-red-500',
    ghost: 'bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-ios-lightText dark:text-ios-darkText'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};
