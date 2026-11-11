import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'md',
  showCloseButton = true
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: 'sm:max-w-sm',
    md: 'sm:max-w-md',
    lg: 'sm:max-w-lg',
    xl: 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl'
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Surface (iOS sheet on mobile, centered card on desktop) */}
      <div
        className={`relative z-10 w-full ${maxWidthStyles[maxWidth]} bg-ios-lightSurface dark:bg-ios-darkSurface rounded-t-[20px] sm:rounded-ios-xl shadow-ios-sheet sm:shadow-ios-lg border-t sm:border border-ios-lightBorder dark:border-ios-darkBorder overflow-hidden max-h-[92vh] sm:max-h-[85vh] flex flex-col animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200`}
        role="dialog"
        aria-modal="true"
      >
        {/* iOS Grab Handle for Mobile */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center">
          <div className="w-10 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
        </div>

        {/* Modal Header */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between px-5 pt-3.5 pb-3 border-b border-ios-lightBorder dark:border-ios-darkBorder">
            <div className="pr-4">
              {title && (
                <h3 className="text-base font-semibold text-ios-lightText dark:text-ios-darkText tracking-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-ios-lightMuted hover:text-ios-lightText dark:text-ios-darkMuted dark:hover:text-ios-darkText p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto px-5 py-4 safe-bottom">
          {children}
        </div>
      </div>
    </div>
  );
};
