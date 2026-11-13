import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  id: string;
  label: string; // e.g., 'Employment', 'Sector', 'Category', 'Fees'
  options: FilterOption[];
}

interface InlineFilterBarProps {
  groups: FilterGroup[];
  selectedValues: Record<string, string>;
  onSelect: (groupId: string, value: string) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
  className?: string;
  resetLabel?: string;
}

export const InlineFilterBar: React.FC<InlineFilterBarProps> = ({
  groups,
  selectedValues,
  onSelect,
  onReset,
  hasActiveFilters,
  className = '',
  resetLabel
}) => {
  const [openGroupId, setOpenGroupId] = React.useState<string | null>(null);

  const toggleGroup = (groupId: string) => {
    setOpenGroupId(prev => (prev === groupId ? null : groupId));
  };

  const activeGroup = groups.find(g => g.id === openGroupId);

  return (
    <div className={`w-full ${className}`}>
      {/* 1. Main Filter Toggles Row (Compact & Subtle) */}
      <div className="flex items-center justify-between min-h-[28px] gap-2 pt-0.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          {groups.map(group => {
            const currentValue = selectedValues[group.id];
            const isSelected = Boolean(currentValue && currentValue !== 'all' && currentValue !== 'lahat');
            const isOpen = openGroupId === group.id;

            // Display text: either selected option label or group label
            const displayLabel = isSelected
              ? group.options.find(o => o.value === currentValue)?.label || group.label
              : group.label;

            return (
              <button
                key={group.id}
                type="button"
                onClick={() => toggleGroup(group.id)}
                aria-expanded={isOpen}
                aria-controls={`inline-filter-options-${group.id}`}
                className={`inline-flex items-center gap-1 h-7 px-2 rounded-[6px] text-[13px] font-medium transition-all select-none cursor-pointer ${
                  isSelected
                    ? 'bg-[#007AFF]/12 dark:bg-[#0A84FF]/20 text-[#007AFF] dark:text-[#0A84FF] font-semibold'
                    : isOpen
                    ? 'bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] text-black dark:text-white'
                    : 'text-[#8E8E93] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span>{displayLabel}</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 stroke-[2.2] ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Reset Link (appears ONLY when any filter or query is active) */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              onReset();
              setOpenGroupId(null);
            }}
            className="text-[13px] font-medium text-[#007AFF] dark:text-[#0A84FF] hover:underline px-1 py-0.5 shrink-0 ml-auto transition-opacity cursor-pointer select-none"
          >
            {resetLabel || 'I-reset'}
          </button>
        )}
      </div>

      {/* 2. Accordion Option Pills Panel (Compact & Subtle) */}
      <div
        className={`grid transition-[grid-template-rows] duration-250 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          openGroupId ? 'grid-rows-[1fr] mt-1.5' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          {activeGroup && (
            <div
              id={`inline-filter-options-${activeGroup.id}`}
              role="radiogroup"
              aria-label={activeGroup.label}
              className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5"
            >
              {activeGroup.options.map(option => {
                const isOptionActive =
                  selectedValues[activeGroup.id] === option.value ||
                  (!selectedValues[activeGroup.id] && (option.value === 'all' || option.value === ''));

                return (
                  <button
                    key={option.value}
                    role="radio"
                    aria-checked={isOptionActive}
                    type="button"
                    onClick={() => {
                      onSelect(activeGroup.id, option.value);
                      setTimeout(() => setOpenGroupId(null), 180);
                    }}
                    className={`h-7 px-3 rounded-full text-[12px] font-medium shrink-0 whitespace-nowrap transition-all select-none cursor-pointer ${
                      isOptionActive
                        ? 'bg-[#007AFF]/12 dark:bg-[#0A84FF]/20 text-[#007AFF] dark:text-[#0A84FF] font-semibold'
                        : 'bg-[rgba(118,118,128,0.1)] dark:bg-[rgba(118,118,128,0.2)] text-black/85 dark:text-white/85 hover:bg-[rgba(118,118,128,0.16)]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
