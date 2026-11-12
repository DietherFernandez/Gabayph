import { PesoSign } from '../common/PesoSign';
import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
    GraduationCap,
  HeartHandshake,
  ShieldAlert,
  Bell,
  AlertTriangle,
  CheckCircle2,
  History,
  Settings,
  X,
  Shield,
  ShieldCheck,
  ArrowLeft,
  Plus
} from 'lucide-react';
import { Button } from '../common/Button';
import { AdminNavCounts } from './AdminSidebar';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  count?: number;
  highlight?: 'urgent' | 'success';
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

interface AdminMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  counts: AdminNavCounts;
  onOpenCreateRecord?: () => void;
}

export const AdminMobileDrawer: React.FC<AdminMobileDrawerProps> = ({
  isOpen,
  onClose,
  counts,
  onOpenCreateRecord
}) => {
  const { currentPath, navigate, setRole } = useApp();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const navGroups: NavGroup[] = [
    {
      group: 'MAIN WORKSPACE',
      items: [
        {
          id: 'overview',
          label: 'Overview',
          path: '/admin',
          icon: <LayoutDashboard className="w-4 h-4 shrink-0" />
        }
      ]
    },
    {
      group: 'DIRECTORY MANAGEMENT',
      items: [
        {
          id: 'services',
          label: 'Public Services',
          path: '/admin/services',
          icon: <FileText className="w-4 h-4 shrink-0" />,
          count: counts.services
        },
        {
          id: 'jobs',
          label: 'Careers & Jobs',
          path: '/admin/jobs',
          icon: <Briefcase className="w-4 h-4 shrink-0" />,
          count: counts.jobs
        },
        {
          id: 'assistance',
          label: 'Financial Assistance',
          path: '/admin/assistance',
          icon: <PesoSign className="w-4 h-4 shrink-0" />,
          count: counts.assistance
        },
        {
          id: 'education',
          label: 'Education & TVET',
          path: '/admin/education',
          icon: <GraduationCap className="w-4 h-4 shrink-0" />,
          count: counts.education
        },
        {
          id: 'bayanihan',
          label: 'Community Programs',
          path: '/admin/bayanihan',
          icon: <HeartHandshake className="w-4 h-4 shrink-0" />,
          count: counts.bayanihan
        },
        {
          id: 'safety',
          label: 'Safety & Hotlines',
          path: '/admin/safety',
          icon: <ShieldAlert className="w-4 h-4 shrink-0" />,
          count: counts.safety
        },
        {
          id: 'bulletins',
          label: 'Public Bulletins',
          path: '/admin/bulletins',
          icon: <Bell className="w-4 h-4 shrink-0" />,
          count: counts.bulletins
        }
      ]
    },
    {
      group: 'CITIZEN GOVERNANCE',
      items: [
        {
          id: 'reports',
          label: 'Moderation Reports',
          path: '/admin/reports',
          icon: <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500" />,
          count: counts.pendingReports,
          highlight: 'urgent'
        },
        {
          id: 'suggestions',
          label: 'Service Suggestions',
          path: '/admin/suggestions',
          icon: <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />,
          count: counts.suggestions,
          highlight: 'success'
        }
      ]
    },
    {
      group: 'SYSTEM & AUDIT',
      items: [
        {
          id: 'logs',
          label: 'Audit Trail Logs',
          path: '/admin/logs',
          icon: <History className="w-4 h-4 shrink-0" />,
          count: counts.logs
        },
        {
          id: 'settings',
          label: 'Admin Settings',
          path: '/admin/settings',
          icon: <Settings className="w-4 h-4 shrink-0" />
        }
      ]
    }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleReturnToCitizen = () => {
    setRole('citizen');
    navigate('/');
    onClose();
  };

  const isCurrentActive = (itemPath: string) => {
    if (itemPath === '/admin') {
      return currentPath === '/admin' || currentPath === '/admin/overview';
    }
    return currentPath === itemPath;
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer Panel */}
      <div className="relative w-80 max-w-[85vw] bg-white dark:bg-slate-900 h-full flex flex-col shadow-2xl z-10 transition-transform animate-in slide-in-from-left duration-200 border-r border-ios-lightBorder dark:border-ios-darkBorder">
        {/* Drawer Header */}
        <div className="p-4 border-b border-ios-lightBorder dark:border-ios-darkBorder flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-ios-lg bg-ios-navy text-amber-400 flex items-center justify-center font-bold">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-ios-lightText dark:text-ios-darkText">
                  GabayPH
                </span>
                <span className="text-[9px] font-bold uppercase px-1 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400">
                  Admin
                </span>
              </div>
              <p className="text-[10px] text-ios-lightMuted dark:text-ios-darkMuted">
                Operations Workspace
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Admin Profile */}
        <div className="p-3.5 border-b border-ios-lightBorder dark:border-ios-darkBorder bg-white dark:bg-slate-900 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-ios-navy text-amber-400 font-bold flex items-center justify-center text-xs shadow-ios-sm">
            MS
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-ios-lightText dark:text-ios-darkText truncate">
                Maria Santos
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            </div>
            <p className="text-[10px] text-ios-lightMuted dark:text-ios-darkMuted truncate">
              Senior Operations Administrator
            </p>
          </div>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {navGroups.map(group => (
            <div key={group.group} className="space-y-1">
              <div className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ios-lightMuted dark:text-ios-darkMuted">
                {group.group}
              </div>
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const active = isCurrentActive(item.path);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.path)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-ios-lg text-xs font-semibold transition-all ${
                        active
                          ? 'bg-ios-navy text-white shadow-sm dark:bg-blue-600'
                          : 'text-ios-lightText dark:text-ios-darkText hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={active ? 'text-white' : 'text-ios-lightMuted dark:text-ios-darkMuted'}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>

                      {typeof item.count === 'number' && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${
                            active
                              ? 'bg-white/20 text-white'
                              : item.highlight === 'urgent' && item.count > 0
                              ? 'bg-amber-100 text-amber-700'
                              : item.highlight === 'success' && item.count > 0
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="p-3 border-t border-ios-lightBorder dark:border-ios-darkBorder space-y-2 bg-slate-50/50 dark:bg-slate-800/20">
          {onOpenCreateRecord && (
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                onClose();
                onOpenCreateRecord();
              }}
              className="w-full flex items-center justify-center gap-2 text-xs py-2 font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Record</span>
            </Button>
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={handleReturnToCitizen}
            className="w-full flex items-center justify-center gap-2 text-xs border-ios-navy/30 text-ios-navy dark:text-blue-300 py-2 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Citizen View</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
