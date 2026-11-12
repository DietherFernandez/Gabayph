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
        <div className="flex items-end justify-between mb-2.5 px-0.5 pb-1 border-b border-ios-lightBorder/60 dark:border-ios-darkBorder/60">
          <div className="min-w-0 flex-1">
            {title && (
              <h3 className="text-[13px] sm:text-[14px] font-bold tracking-wider uppercase text-ios-navy dark:text-blue-400">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-[12px] sm:text-[13px] text-ios-lightMuted dark:text-ios-darkMuted mt-0.5 truncate">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0 ml-3">{action}</div>}
        </div>
      )}
      {/* Cardless Flat iOS Inset Separator Table */}
      <div className="w-full divide-y divide-ios-lightBorder/80 dark:divide-ios-darkBorder/80">
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
      className={`flex items-center justify-between gap-3 py-3 px-1 transition-colors ${
        isClickable
          ? 'cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-800/40 active:bg-slate-100/80 dark:active:bg-slate-800/80'
          : ''
      } ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        {leadingIcon && (
          <div className="w-8 h-8 rounded-lg bg-ios-lightSecondary/80 dark:bg-ios-darkSecondary flex items-center justify-center shrink-0 text-ios-navy dark:text-blue-400">
            {leadingIcon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="text-[15px] font-semibold text-ios-lightText dark:text-ios-darkText line-clamp-2 leading-snug break-words">
            {title}
          </div>
          {subtitle && (
            <div className="text-[13px] text-ios-lightMuted dark:text-ios-darkMuted line-clamp-1 mt-0.5">
              {subtitle}
            </div>
          )}
          {metadata && (
            <div className="text-[12px] text-ios-lightMuted dark:text-ios-darkMuted mt-1 flex flex-wrap items-center gap-2">
              {metadata}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {trailing}
        {isClickable && showChevron && (
          <ChevronRight className="w-4 h-4 text-ios-lightMuted dark:text-ios-darkMuted opacity-50" />
        )}
      </div>
    </div>
  );
};
