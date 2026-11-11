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
        <div className="flex items-center justify-between mb-2 px-1">
          <div>
            {title && (
              <h3 className="text-xs font-semibold tracking-wider uppercase text-ios-lightMuted dark:text-ios-darkMuted">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="bg-ios-lightSurface dark:bg-ios-darkSurface rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder overflow-hidden shadow-ios-sm divide-y divide-ios-lightBorder dark:divide-ios-darkBorder">
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
      className={`flex items-center justify-between gap-3 px-4 py-3 transition-colors ${
        isClickable
          ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 active:bg-slate-100 dark:active:bg-slate-800'
          : ''
      } ${className}`}
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1">
        {leadingIcon && (
          <div className="w-9 h-9 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary flex items-center justify-center shrink-0 text-ios-navy dark:text-blue-400">
            {leadingIcon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-ios-lightText dark:text-ios-darkText truncate">
            {title}
          </div>
          {subtitle && (
            <div className="text-xs text-ios-lightMuted dark:text-ios-darkMuted truncate mt-0.5">
              {subtitle}
            </div>
          )}
          {metadata && (
            <div className="text-[11px] text-ios-lightMuted dark:text-ios-darkMuted mt-1 flex flex-wrap items-center gap-2">
              {metadata}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {trailing}
        {isClickable && showChevron && (
          <ChevronRight className="w-4 h-4 text-ios-lightMuted dark:text-ios-darkMuted opacity-60" />
        )}
      </div>
    </div>
  );
};
