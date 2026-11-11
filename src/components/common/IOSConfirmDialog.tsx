import React, { useEffect } from 'react';

export interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  confirmLabel?: string;
  cancelText?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

interface IOSConfirmDialogProps {
  isOpen: boolean;
  options: ConfirmOptions | null;
  onClose: () => void;
}

export const IOSConfirmDialog: React.FC<IOSConfirmDialogProps> = ({
  isOpen,
  options,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        options?.onCancel?.();
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
  }, [isOpen, options, onClose]);

  if (!isOpen || !options) return null;

  const handleConfirm = () => {
    options.onConfirm();
    onClose();
  };

  const handleCancel = () => {
    options.onCancel?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* iOS Frosted Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/45 backdrop-blur-md transition-opacity animate-in fade-in duration-150"
        onClick={handleCancel}
        aria-hidden="true"
      />

      {/* iOS Alert Dialog Box */}
      <div
        className="relative z-10 w-full max-w-[320px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-[20px] shadow-2xl border border-ios-lightBorder/80 dark:border-ios-darkBorder/80 overflow-hidden text-center animate-in zoom-in-95 duration-150"
        role="alertdialog"
        aria-modal="true"
      >
        {/* Content */}
        <div className="pt-5 pb-4 px-5 space-y-1.5">
          <h3 className="text-sm font-bold text-ios-lightText dark:text-ios-darkText tracking-tight">
            {options.title}
          </h3>
          <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted leading-relaxed">
            {options.message}
          </p>
        </div>

        {/* Apple Style Hairline Action Buttons */}
        <div className="flex items-center border-t border-slate-200/80 dark:border-slate-800 text-xs">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 py-3 text-ios-navy dark:text-blue-400 font-semibold border-r border-slate-200/80 dark:border-slate-800 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 active:bg-slate-200/60 transition-colors"
          >
            {options.cancelLabel || options.cancelText || 'Cancel'}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`flex-1 py-3 font-bold hover:bg-slate-100/60 dark:hover:bg-slate-800/60 active:bg-slate-200/60 transition-colors ${
              options.isDestructive
                ? 'text-red-600 dark:text-red-400'
                : 'text-ios-navy dark:text-blue-400'
            }`}
          >
            {options.confirmLabel || options.confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};
