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
      <div className="relative w-72 max-w-[85vw] bg-white dark:bg-[#1C1C1E] h-full flex flex-col shadow-2xl z-10 transition-transform animate-in slide-in-from-left duration-200 border-r border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)]">
        {/* Drawer Header */}
        <div className="p-3.5 border-b border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[8px] bg-[#007AFF] text-white flex items-center justify-center font-bold shadow-2xs">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[13px] text-black dark:text-white">
                  GabayPH
                </span>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-[rgba(0,122,255,0.12)] text-[#007AFF]">
                  Admin
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#8E8E93] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Admin Profile */}
        <div className="p-3 border-b border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)] flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#007AFF] text-white font-bold flex items-center justify-center text-[12px] shadow-2xs">
            MS
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span className="text-[13px] font-semibold text-black dark:text-white truncate">
                Maria Santos
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#007AFF] shrink-0" />
            </div>
            <p className="text-[11px] text-[#8E8E93] truncate">
              Senior Operations Admin
            </p>
          </div>
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-3.5 text-xs no-scrollbar">
          {navGroups.map(group => (
            <div key={group.group} className="space-y-0.5">
              <div className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#8E8E93]">
                {group.group}
              </div>
              <div className="space-y-0.5">
                {group.items.map(item => {
                  const active = isCurrentActive(item.path);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.path)}
                      className={`w-full h-8 flex items-center justify-between px-2.5 rounded-[8px] text-[13px] font-medium transition-colors cursor-pointer select-none ${
                        active
                          ? 'bg-[#007AFF] text-white font-semibold shadow-2xs'
                          : 'text-black dark:text-[#EBEBF5]/90 hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={active ? 'text-white' : 'text-[#8E8E93]'}>
                          {item.icon}
                        </span>
                        <span className="truncate">{item.label}</span>
                      </div>

                      {typeof item.count === 'number' && (
                        <span
                          className={`text-[11px] font-semibold px-1.5 py-0.2 rounded-full min-w-[18px] text-center ${
                            active
                              ? 'bg-white/20 text-white'
                              : item.highlight === 'urgent' && item.count > 0
                              ? 'bg-[rgba(255,149,0,0.15)] text-[#FF9500]'
                              : item.highlight === 'success' && item.count > 0
                              ? 'bg-[rgba(52,199,89,0.15)] text-[#34C759]'
                              : 'bg-black/5 dark:bg-white/10 text-[#8E8E93]'
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
        <div className="p-3 border-t border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)] space-y-2">
          {onOpenCreateRecord && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCreateRecord();
              }}
              className="w-full h-9 rounded-[10px] bg-[#007AFF] hover:bg-blue-600 active:scale-[0.98] text-white text-[13px] font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Create Record</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleReturnToCitizen}
            className="w-full h-9 rounded-[10px] bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] hover:bg-[rgba(118,118,128,0.2)] active:scale-[0.98] text-black dark:text-white text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Citizen View</span>
          </button>
        </div>
      </div>
    </div>
  );
};
