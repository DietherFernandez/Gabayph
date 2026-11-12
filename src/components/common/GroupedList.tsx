import React from 'react';
import { ChevronRight } from 'lucide-react';

interface GroupedListProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const GroupedList: React.FC<GroupedListProps> = ({
  title,
  subtitle,
  action,
  children,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      {(title || action) && (
        <div className="flex items-end justify-between mb-2 px-0.5 pb-1 border-b border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)]">
          <div className="min-w-0 flex-1">
            {title && (
              <h3 className="text-[12px] font-bold tracking-wider uppercase text-ios-navy dark:text-blue-400">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-[12px] text-[#8E8E93] mt-0.5 truncate">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0 ml-3 text-[13px] font-medium text-[#007AFF] dark:text-[#0A84FF]">{action}</div>}
        </div>
      )}
      {/* Flat iOS Inset Separator Table */}
      <div className="w-full divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)]">
        {children}
      </div>
    </div>
  );
};

interface GroupedListItemProps {
  leadingIcon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  metadata?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
  showChevron?: boolean;
  className?: string;
}

export const GroupedListItem: React.FC<GroupedListItemProps> = ({
  leadingIcon,
  title,
  subtitle,
  metadata,
  trailing,
  onClick,
  showChevron = true,
  className = ''
}) => {
  const isClickable = Boolean(onClick);

  return (
    <div
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={e => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`flex items-center justify-between gap-2.5 py-2.5 px-0.5 transition-colors select-none ${
        isClickable
          ? 'cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 active:bg-black/10 dark:active:bg-white/10'
          : ''
      } ${className}`}
    >
      <div className="flex items-center gap-2.5 min-w-0 flex-1">
        {leadingIcon && (
          <div className="w-7 h-7 rounded-[7px] bg-[rgba(118,118,128,0.08)] dark:bg-[rgba(118,118,128,0.18)] flex items-center justify-center shrink-0 text-[#007AFF] dark:text-[#0A84FF]">
            {leadingIcon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="text-[14px] font-semibold text-black dark:text-white line-clamp-2 leading-snug break-words">
            {title}
          </div>
          {subtitle && (
            <div className="text-[12px] text-[#8E8E93] line-clamp-1 mt-0.5">
              {subtitle}
            </div>
          )}
          {metadata && (
            <div className="text-[11px] text-[#8E8E93] mt-0.5 flex flex-wrap items-center gap-1.5">
              {metadata}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {trailing}
        {isClickable && showChevron && (
          <ChevronRight className="w-3.5 h-3.5 text-[#8E8E93] opacity-50" />
        )}
      </div>
    </div>
  );
};
