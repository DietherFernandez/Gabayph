import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import {
  Shield,
  Menu,
  Sun,
  Moon,
  Bell,
  ArrowLeft,
  Search,
  PhoneCall,
  X
} from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

interface AdminHeaderProps {
  onOpenMobileDrawer: () => void;
  onSearchClick?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onOpenMobileDrawer,
  onSearchClick
}) => {
  const { theme, toggleTheme, setRole, navigate, unreadNotifsCount } = useApp();
  const { showToast } = useToast();
  const [isHotlineModalOpen, setIsHotlineModalOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);

  const copyHotline = (number: string, name: string) => {
    navigator.clipboard.writeText(number);
    showToast(`Copied ${name} (${number}) to clipboard.`, 'success');
  };

  const handleReturnToCitizen = () => {
    setRole('citizen');
    navigate('/');
    showToast('Returned to Citizen View.', 'info');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl border-b border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] transition-colors">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left section: Hamburger (Mobile) + GabayPH Admin Branding */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {/* Mobile Drawer Trigger Button */}
            <button
              onClick={onOpenMobileDrawer}
              className="lg:hidden p-1.5 rounded-[8px] text-[#8E8E93] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Open Admin Navigation Menu"
            >
              <Menu className="w-5 h-5 text-black dark:text-white" />
            </button>

            {/* GabayPH Logo & Admin Identification */}
            <div
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 cursor-pointer group shrink-0"
              title="GabayPH Admin Home"
            >
              <div className="w-8 h-8 rounded-[8px] bg-[#007AFF] text-white flex items-center justify-center font-bold shadow-2xs group-hover:scale-105 transition-transform">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div className="hidden xs:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold tracking-tight text-black dark:text-white">
                    GabayPH
                  </span>
                  <span className="text-[10px] font-bold tracking-wide uppercase px-1.5 py-0.2 rounded bg-[rgba(0,122,255,0.12)] text-[#007AFF]">
                    Admin
                  </span>
                </div>
              </div>
            </div>

            {/* Emergency Hotline Indicator */}
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)]">
              <button
                type="button"
                onClick={() => setIsHotlineModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(118,118,128,0.1)] dark:bg-[rgba(118,118,128,0.2)] text-[11px] font-medium text-[#8E8E93] hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                title="View National Emergency Hotlines"
              >
                <PhoneCall className="w-3 h-3 text-[#FF3B30]" />
                <span>Hotlines: 911 | 8888</span>
              </button>
            </div>
          </div>

          {/* Right section: Search + Notifs + Theme + Role Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Search Shortcut */}
            <button
              onClick={() => {
                if (onSearchClick) onSearchClick();
                else navigate('/admin/services');
              }}
              className="h-8 px-2.5 rounded-[8px] bg-[rgba(118,118,128,0.1)] dark:bg-[rgba(118,118,128,0.2)] hover:bg-[rgba(118,118,128,0.18)] flex items-center gap-1.5 text-[12px] text-[#8E8E93] hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              title="Search records"
              aria-label="Quick search admin records"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden xl:inline text-[12px]">Quick search...</span>
              <kbd className="hidden xl:inline-block text-[10px] font-mono bg-black/5 dark:bg-white/10 px-1 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Notifications Trigger */}
            <div className="relative">
              <button
                onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                className="relative p-2 rounded-ios-lg text-ios-lightMuted dark:text-ios-darkMuted hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="View Administrative Alerts"
                title="Notifications & System Alerts"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                )}
              </button>

              {/* Notification Popover */}
              {isNotifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-lg p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-ios-lightBorder dark:border-ios-darkBorder mb-2">
                    <span className="text-xs font-bold text-ios-lightText dark:text-ios-darkText">
                      Administrative Alerts
                    </span>
                    <button
                      onClick={() => setIsNotifDropdownOpen(false)}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50">
                      <p className="font-bold text-amber-800 dark:text-amber-300">
                        Citizen Moderation Queue
                      </p>
                      <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-0.5">
                        Inaccuracy reports pending operator verification.
                      </p>
                      <button
                        onClick={() => {
                          setIsNotifDropdownOpen(false);
                          navigate('/admin/reports');
                        }}
                        className="text-[11px] font-bold text-amber-800 dark:text-amber-300 underline mt-1 block"
                      >
                        Open Reports Queue →
                      </button>
                    </div>
                    <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <p className="font-bold text-slate-800 dark:text-slate-200">
                        System Integrity Standard
                      </p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                        All directory records synchronized with latest Citizen's Charter standards.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-1.5 rounded-[8px] text-[#8E8E93] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-yellow-500" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Role Switcher: Return to Citizen View */}
            <button
              type="button"
              onClick={handleReturnToCitizen}
              className="h-8 px-2.5 sm:px-3 rounded-[8px] bg-[rgba(0,122,255,0.1)] hover:bg-[#007AFF] text-[#007AFF] hover:text-white text-[12px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
              title="Switch role and return to Citizen Public Portal"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Citizen View</span>
              <span className="sm:hidden">Citizen</span>
            </button>
          </div>
        </div>
      </header>

      {/* Emergency Hotlines Reference Modal */}
      <Modal
        isOpen={isHotlineModalOpen}
        onClose={() => setIsHotlineModalOpen(false)}
        title="Official Philippine Emergency Hotlines & Contact Directory"
        maxWidth="md"
      >
        <div className="space-y-3.5 text-xs">
          <p className="text-ios-lightMuted dark:text-ios-darkMuted">
            Direct national emergency hotlines and rapid-response government assistance numbers active 24/7.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-ios-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 flex items-center justify-between">
              <div>
                <span className="font-bold text-red-900 dark:text-red-300">National Emergency</span>
                <div className="text-xl font-black text-red-700 dark:text-red-400">911</div>
                <span className="text-[10px] text-red-600 dark:text-red-300">Police, Fire, Medical, Rescue</span>
              </div>
              <Button size="sm" variant="destructive" onClick={() => copyHotline('911', 'National Emergency')}>
                Copy
              </Button>
            </div>

            <div className="p-3 rounded-ios-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-center justify-between">
              <div>
                <span className="font-bold text-blue-900 dark:text-blue-300">Citizen Complaints Center</span>
                <div className="text-xl font-black text-blue-700 dark:text-blue-400">8888</div>
                <span className="text-[10px] text-blue-600 dark:text-blue-300">Presidential Complaint Hotline</span>
              </div>
              <Button size="sm" variant="secondary" onClick={() => copyHotline('8888', 'Citizen Hotline')}>
                Copy
              </Button>
            </div>

            <div className="p-3 rounded-ios-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between">
              <div>
                <span className="font-bold text-emerald-900 dark:text-emerald-300">Philippine Red Cross</span>
                <div className="text-xl font-black text-emerald-700 dark:text-emerald-400">143</div>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-300">Blood Bank & Disaster Relief</span>
              </div>
              <Button size="sm" variant="secondary" onClick={() => copyHotline('143', 'Red Cross')}>
                Copy
              </Button>
            </div>

            <div className="p-3 rounded-ios-lg bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 flex items-center justify-between">
              <div>
                <span className="font-bold text-purple-900 dark:text-purple-300">DOH Mental Health Crisis</span>
                <div className="text-xl font-black text-purple-700 dark:text-purple-400">1553</div>
                <span className="text-[10px] text-purple-600 dark:text-purple-300">Toll-free Hopeline Assistance</span>
              </div>
              <Button size="sm" variant="secondary" onClick={() => copyHotline('1553', 'DOH Hopeline')}>
                Copy
              </Button>
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button size="sm" variant="secondary" onClick={() => setIsHotlineModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
