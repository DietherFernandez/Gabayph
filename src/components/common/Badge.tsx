import React from 'react';
import { CategoryType } from '../../types';

interface BadgeProps {
  children: React.ReactNode;
  category?: CategoryType;
  variant?: 'default' | 'verified' | 'urgent' | 'outline' | 'success';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  category,
  variant = 'default',
  size = 'sm',
  className = ''
}) => {
  let colorStyles = 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';

  if (category) {
    switch (category) {
      case 'trabaho':
        colorStyles = 'bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900';
        break;
      case 'serbisyo':
        colorStyles = 'bg-sky-50 text-sky-700 border-sky-200/60 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900';
        break;
      case 'pera':
        colorStyles = 'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900';
        break;
      case 'bayanihan':
        colorStyles = 'bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900';
        break;
      case 'aral':
        colorStyles = 'bg-purple-50 text-purple-700 border-purple-200/60 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-900';
        break;
      case 'kaligtasan':
        colorStyles = 'bg-red-50 text-red-700 border-red-200/60 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900';
        break;
    }
  } else if (variant === 'verified') {
    colorStyles = 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800';
  } else if (variant === 'urgent') {
    colorStyles = 'bg-red-50 text-red-700 border border-red-200/60 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800';
  } else if (variant === 'success') {
    colorStyles = 'bg-green-50 text-green-700 border border-green-200 dark:bg-green-950/40 dark:text-green-300';
  } else if (variant === 'outline') {
    colorStyles = 'border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightMuted dark:text-ios-darkMuted bg-transparent';
  }

  const sizeStyles = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-md tracking-tight ${sizeStyles} ${colorStyles} ${className}`}
    >
      {children}
    </span>
  );
};
