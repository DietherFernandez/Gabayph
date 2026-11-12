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
}

export const InlineFilterBar: React.FC<InlineFilterBarProps> = ({
  groups,
  selectedValues,
  onSelect,
  onReset,
  hasActiveFilters,
  className = ''
}) => {
  const [openGroupId, setOpenGroupId] = React.useState<string | null>(null);

  const toggleGroup = (groupId: string) => {
    setOpenGroupId(prev => (prev === groupId ? null : groupId));
  };

  const activeGroup = groups.find(g => g.id === openGroupId);

  return (
    <div className={`w-full ${className}`}>
      {/* 1. Main Filter Toggles Row */}
      <div className="flex items-center justify-between min-h-[36px] gap-2 pt-1">
        <div className="flex items-center gap-2 flex-wrap">
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
                className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-[12px] text-[15px] font-medium transition-all select-none cursor-pointer ${
                  isSelected
                    ? 'bg-[#007AFF]/15 dark:bg-[#0A84FF]/25 text-[#007AFF] dark:text-[#0A84FF] font-semibold'
                    : isOpen
                    ? 'bg-[rgba(118,118,128,0.18)] dark:bg-[rgba(118,118,128,0.3)] text-black dark:text-white'
                    : 'text-[#8E8E93] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span>{displayLabel}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 stroke-[2.6] ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* I-reset Link (appears ONLY when any filter or query is active) */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              onReset();
              setOpenGroupId(null);
            }}
            className="text-[15px] font-semibold text-[#007AFF] dark:text-[#0A84FF] hover:underline px-2 py-1 shrink-0 ml-auto transition-opacity cursor-pointer select-none"
          >
            I-reset
          </button>
        )}
      </div>

      {/* 2. Accordion Option Pills Panel (Expands directly below without overlay) */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          openGroupId ? 'grid-rows-[1fr] mt-2.5' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          {activeGroup && (
            <div
              id={`inline-filter-options-${activeGroup.id}`}
              role="radiogroup"
              aria-label={activeGroup.label}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1"
            >
              {activeGroup.options.map(option => {
                const isOptionActive =
                  selectedValues[activeGroup.id] === option.value ||
                  (!selectedValues[activeGroup.id] && (option.value === 'all' || option.value === 'lahat'));

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
                    className={`h-9 px-4 rounded-full text-[14px] font-medium shrink-0 whitespace-nowrap transition-all select-none cursor-pointer ${
                      isOptionActive
                        ? 'bg-[#007AFF]/15 dark:bg-[#0A84FF]/25 text-[#007AFF] dark:text-[#0A84FF] font-semibold'
                        : 'bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] text-black dark:text-white hover:bg-[rgba(118,118,128,0.2)]'
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
