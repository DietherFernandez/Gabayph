import React from 'react';
import { Search, X } from 'lucide-react';

interface InputBaseProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement>, InputBaseProps {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  helperText,
  required,
  leadingIcon,
  trailingIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-ios-lightText dark:text-ios-darkText mb-1.5"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {leadingIcon && (
          <div className="absolute left-3 text-ios-lightMuted dark:text-ios-darkMuted pointer-events-none">
            {leadingIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightText dark:text-ios-darkText text-sm rounded-ios-lg px-3.5 py-2.5 transition-all border ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400'
              : 'border-ios-lightBorder dark:border-ios-darkBorder focus:border-ios-navy focus:ring-1 focus:ring-ios-navy'
          } ${leadingIcon ? 'pl-9' : ''} ${trailingIcon ? 'pr-9' : ''} outline-none placeholder:text-ios-lightMuted/70 ${className}`}
          {...props}
        />
        {trailingIcon && (
          <div className="absolute right-3 text-ios-lightMuted dark:text-ios-darkMuted">
            {trailingIcon}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {!error && helperText && <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-1">{helperText}</p>}
    </div>
  );
};

export interface SearchFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search services, jobs, hotlines...',
  className = '',
  ...props
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="w-4 h-4 text-ios-lightMuted dark:text-ios-darkMuted absolute left-3 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightText dark:text-ios-darkText text-sm rounded-ios-lg pl-9 pr-8 py-2 border border-ios-lightBorder dark:border-ios-darkBorder focus:border-ios-navy dark:focus:border-blue-400 focus:ring-1 focus:ring-ios-navy outline-none placeholder:text-ios-lightMuted/70 transition-all"
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            if (onClear) onClear();
          }}
          className="absolute right-2.5 text-ios-lightMuted hover:text-ios-lightText dark:text-ios-darkMuted dark:hover:text-white p-0.5 rounded-full"
          aria-label="Clear search input"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>, InputBaseProps {
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  required,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-medium text-ios-lightText dark:text-ios-darkText mb-1.5"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightText dark:text-ios-darkText text-sm rounded-ios-lg px-3.5 py-2.5 transition-all border ${
          error
            ? 'border-red-400 focus:border-red-500'
            : 'border-ios-lightBorder dark:border-ios-darkBorder focus:border-ios-navy focus:ring-1 focus:ring-ios-navy'
        } outline-none cursor-pointer ${className}`}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-white dark:bg-slate-900">
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {!error && helperText && <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-1">{helperText}</p>}
    </div>
  );
};

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, InputBaseProps {}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  required,
  className = '',
  id,
  rows = 3,
  ...props
}) => {
  const areaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={areaId}
          className="block text-xs font-medium text-ios-lightText dark:text-ios-darkText mb-1.5"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={areaId}
        rows={rows}
        className={`w-full bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightText dark:text-ios-darkText text-sm rounded-ios-lg px-3.5 py-2.5 transition-all border ${
          error
            ? 'border-red-400 focus:border-red-500'
            : 'border-ios-lightBorder dark:border-ios-darkBorder focus:border-ios-navy focus:ring-1 focus:ring-ios-navy'
        } outline-none placeholder:text-ios-lightMuted/70 ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {!error && helperText && <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-1">{helperText}</p>}
    </div>
  );
};
