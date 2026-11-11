import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

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
}

export const IOSSelect: React.FC<IOSSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select option',
  size = 'sm',
  disabled = false,
  className = '',
  id
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  // Close on outside click (Desktop)
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  // Lock body scroll on mobile when sheet is open
  useEffect(() => {
    if (isOpen) {
      const isMobile = window.innerWidth < 640;
      if (isMobile) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  const isSmall = size === 'sm';

  return (
    <div className={`relative ${className}`} ref={containerRef} id={id}>
      {label && (
        <label className="block text-xs font-semibold text-ios-lightText dark:text-ios-darkText mb-1.5">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 rounded-ios-lg bg-slate-50 dark:bg-slate-800/80 border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightText dark:text-ios-darkText font-medium transition-all text-left shadow-2xs hover:bg-slate-100 dark:hover:bg-slate-700/60 focus:outline-none focus:ring-2 focus:ring-ios-navy/30 dark:focus:ring-blue-500/30 ios-active ${
          isSmall ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-2.5 text-sm'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {selectedOption?.icon && (
            <span className="shrink-0 text-ios-navy dark:text-blue-400">
              {selectedOption.icon}
            </span>
          )}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-ios-lightMuted dark:text-ios-darkMuted transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-ios-navy dark:text-blue-400' : ''
          }`}
        />
      </button>

      {/* Desktop Dropdown Popover (>= 640px) */}
      {isOpen && (
        <div className="hidden sm:block absolute z-50 left-0 right-0 mt-1.5 min-w-[200px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-ios-lightBorder dark:border-ios-darkBorder rounded-ios-xl shadow-ios-lg p-1 animate-in fade-in zoom-in-95 duration-150">
          <div className="max-h-60 overflow-y-auto scrollbar-thin py-0.5 space-y-0.5">
            {options.map(opt => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-ios-lg text-xs font-medium transition-colors text-left ${
                    isSelected
                      ? 'bg-ios-navy/10 dark:bg-blue-600/20 text-ios-navy dark:text-blue-300 font-bold'
                      : 'text-ios-lightText dark:text-ios-darkText hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-2 truncate">
                    {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                    <span className="truncate">{opt.label}</span>
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-ios-navy dark:text-blue-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile iOS Action / Picker Sheet (< 640px) */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 z-50 flex flex-col justify-end animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Sheet Surface */}
          <div className="relative z-10 w-full bg-white dark:bg-slate-900 rounded-t-[24px] shadow-2xl border-t border-ios-lightBorder dark:border-ios-darkBorder flex flex-col max-h-[80vh] animate-in slide-in-from-bottom duration-200">
            {/* Grab Handle */}
            <div className="pt-3 pb-1 flex justify-center">
              <div className="w-10 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            </div>

            {/* Sheet Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-ios-lightBorder dark:border-ios-darkBorder">
              <div>
                <h4 className="text-sm font-bold text-ios-lightText dark:text-ios-darkText">
                  {label || placeholder}
                </h4>
                <p className="text-[11px] text-ios-lightMuted dark:text-ios-darkMuted">
                  Choose an option from the list
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close picker"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sheet Options List */}
            <div className="overflow-y-auto p-3 space-y-1 divide-y divide-ios-lightBorder/50 dark:divide-ios-darkBorder/50 safe-bottom">
              {options.map(opt => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-ios-xl text-sm transition-all text-left ios-active ${
                      isSelected
                        ? 'bg-ios-navy text-white font-bold shadow-sm dark:bg-blue-600'
                        : 'text-ios-lightText dark:text-ios-darkText hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                      <span className="truncate">{opt.label}</span>
                    </div>
                    {isSelected && (
                      <Check className="w-4 h-4 text-white shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
