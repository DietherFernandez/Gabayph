import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-ios-lightSurface dark:bg-ios-darkSurface rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder ${className}`}>
      <div className="w-12 h-12 rounded-full bg-ios-lightSecondary dark:bg-ios-darkSecondary flex items-center justify-center text-ios-lightMuted dark:text-ios-darkMuted mb-3">
        {icon}
      </div>
      <h4 className="text-base font-semibold text-ios-lightText dark:text-ios-darkText mb-1">
        {title}
      </h4>
      <p className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted max-w-sm mb-4">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
