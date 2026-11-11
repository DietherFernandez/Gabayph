import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface IOSSelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface IOSSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: IOSSelectOption[];
  placeholder?: string;
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
  id?: string;
  required?: boolean;
}

export const IOSSelect: React.FC<IOSSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
  size = 'sm',
  disabled = false,
  className = '',
  id,
  required
}) => {
  const isSmall = size === 'sm';
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold text-ios-lightText dark:text-ios-darkText mb-1.5"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          id={selectId}
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={disabled}
          className={`w-full appearance-none rounded-ios-lg bg-slate-50 dark:bg-slate-800/90 border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightText dark:text-ios-darkText font-medium transition-all shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-700/60 focus:outline-none focus:ring-2 focus:ring-ios-navy/30 dark:focus:ring-blue-500/30 cursor-pointer ${
            isSmall ? 'px-3 py-1.5 pr-8 text-xs' : 'px-3.5 py-2.5 pr-9 text-sm'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {placeholder && (
            <option value="" disabled className="bg-white dark:bg-slate-900 text-slate-400">
              {placeholder}
            </option>
          )}
          {options.map(opt => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-1"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className={`text-ios-lightMuted dark:text-ios-darkMuted pointer-events-none absolute right-2.5 ${
            isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'
          }`}
        />
      </div>
    </div>
  );
};
