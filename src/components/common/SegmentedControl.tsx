import React from 'react';

export interface SegmentOption<T extends string = string> {
  value: T;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface SegmentedControlProps<T extends string = string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  className = '',
  size = 'md'
}: SegmentedControlProps<T>) {
  const sizeClasses = size === 'sm' ? 'p-0.5 text-xs' : 'p-1 text-sm';
  const itemPadding = size === 'sm' ? 'py-1 px-2.5' : 'py-1.5 px-3';

  return (
    <div
      className={`inline-flex items-center bg-ios-lightSecondary dark:bg-ios-darkSecondary rounded-ios-lg border border-ios-lightBorder/80 dark:border-ios-darkBorder/80 ${sizeClasses} ${className}`}
      role="tablist"
    >
      {options.map(option => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(option.value)}
            className={`flex items-center gap-1.5 font-medium rounded-md transition-all duration-150 select-none ${itemPadding} ${
              isSelected
                ? 'bg-ios-lightSurface dark:bg-ios-darkSurface text-ios-lightText dark:text-ios-darkText shadow-ios-sm font-semibold'
                : 'text-ios-lightMuted dark:text-ios-darkMuted hover:text-ios-lightText dark:hover:text-ios-darkText'
            }`}
          >
            {option.icon && <span className="shrink-0">{option.icon}</span>}
            <span>{option.label}</span>
            {typeof option.count === 'number' && (
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                  isSelected
                    ? 'bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightText dark:text-ios-darkText'
                    : 'bg-slate-200/70 dark:bg-slate-800 text-ios-lightMuted dark:text-ios-darkMuted'
                }`}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
