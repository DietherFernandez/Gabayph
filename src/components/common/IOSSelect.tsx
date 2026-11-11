import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

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
  align?: 'left' | 'right';
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
  id,
  required,
  align = 'left'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);
  const isSmall = size === 'sm';

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={`relative w-full ${className}`} ref={containerRef} id={id}>
      {label && (
        <label className="block text-xs font-semibold text-ios-lightText dark:text-ios-darkText mb-1.5">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* iOS Pull-Down Menu Button Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between gap-2 rounded-[11px] bg-slate-100/90 dark:bg-[#2c2c2e]/80 border border-black/[0.08] dark:border-white/[0.12] text-ios-lightText dark:text-ios-darkText font-medium text-left transition-all active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#007AFF]/30 dark:focus:ring-[#0A84FF]/40 ${
          isSmall ? 'px-3 py-1.5 text-xs' : 'px-3.5 py-2.5 text-sm'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-200/80 dark:hover:bg-[#3a3a3c]/80'}`}
      >
        <div className="flex items-center gap-2 truncate min-w-0 flex-1">
          {selectedOption?.icon && (
            <span className="shrink-0 text-[#007AFF] dark:text-[#0A84FF]">
              {selectedOption.icon}
            </span>
          )}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`shrink-0 text-ios-lightMuted dark:text-ios-darkMuted transition-transform duration-200 ease-out ${
            isSmall ? 'w-3.5 h-3.5' : 'w-4 h-4'
          } ${isOpen ? 'rotate-180 text-[#007AFF] dark:text-[#0A84FF]' : ''}`}
        />
      </button>

      {/* iOS Context / Pull-Down Dropdown Menu (Attached directly below button - NOT A MODAL) */}
      {isOpen && (
        <div
          role="listbox"
          className={`absolute top-[calc(100%+6px)] z-50 min-w-full sm:min-w-[210px] bg-white/95 dark:bg-[#1c1c1e]/95 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.14] rounded-[14px] shadow-[0_12px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.5)] p-1.5 animate-in fade-in-0 zoom-in-95 duration-150 origin-top overflow-hidden ${
            align === 'right' ? 'right-0' : 'left-0'
          }`}
        >
          <div className="max-h-60 overflow-y-auto space-y-0.5 scrollbar-thin">
            {options.map(opt => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full flex items-center justify-between gap-2.5 px-3 py-2 rounded-[10px] text-xs font-medium text-left transition-colors select-none active:scale-[0.99] ${
                    isSelected
                      ? 'bg-[#007AFF]/10 dark:bg-[#0A84FF]/20 text-[#007AFF] dark:text-[#0A84FF] font-semibold'
                      : 'text-ios-lightText dark:text-ios-darkText hover:bg-black/[0.05] dark:hover:bg-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                    <span className="truncate">{opt.label}</span>
                  </div>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#007AFF] dark:text-[#0A84FF] shrink-0 ml-1.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
