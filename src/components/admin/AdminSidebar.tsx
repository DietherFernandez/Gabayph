import { PesoSign } from '../common/PesoSign';
import React from 'react';
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
  Plus,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { Button } from '../common/Button';

export interface AdminNavCounts {
  services: number;
  jobs: number;
  assistance: number;
  education: number;
  bayanihan: number;
  safety: number;
  bulletins: number;
  pendingReports: number;
  suggestions: number;
  logs: number;
}

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

interface AdminSidebarProps {
  counts: AdminNavCounts;
  onOpenCreateRecord?: () => void;
  onResetData?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  counts,
  onOpenCreateRecord,
  onResetData
}) => {
  const { currentPath, navigate } = useApp();

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
          icon: <AlertTriangle className="w-4 h-4 shrink-0 text-amber-500 dark:text-amber-400" />,
          count: counts.pendingReports,
          highlight: 'urgent'
        },
        {
          id: 'suggestions',
          label: 'Service Suggestions',
          path: '/admin/suggestions',
          icon: <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500 dark:text-emerald-400" />,
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

  const isCurrentActive = (itemPath: string) => {
    if (itemPath === '/admin') {
      return currentPath === '/admin' || currentPath === '/admin/overview';
    }
    return currentPath === itemPath;
  };

  return (
    <aside className="w-64 xl:w-72 shrink-0 hidden lg:flex flex-col bg-white dark:bg-slate-900 border-r border-ios-lightBorder dark:border-ios-darkBorder h-[calc(100vh-4rem)] sticky top-16 select-none transition-colors">
      {/* Top Admin Identity Card */}
      <div className="p-4 border-b border-ios-lightBorder dark:border-ios-darkBorder bg-slate-50/60 dark:bg-slate-800/40">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-ios-navy text-amber-400 font-bold flex items-center justify-center text-sm shadow-ios-sm">
              MS
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-ios-lightText dark:text-ios-darkText truncate">
                Maria Santos
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            </div>
            <p className="text-[10px] text-ios-lightMuted dark:text-ios-darkMuted truncate">
              Senior Operations Admin
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Active Session
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Group Items List */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 text-xs scrollbar-thin">
        {navGroups.map(group => (
          <div key={group.group} className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ios-lightMuted dark:text-ios-darkMuted/80">
              {group.group}
            </div>
            <div className="space-y-0.5">
              {group.items.map(item => {
                const active = isCurrentActive(item.path);
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-ios-lg text-xs font-semibold transition-all ${
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
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                            : item.highlight === 'success' && item.count > 0
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
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

      {/* Sidebar Bottom Controls */}
      <div className="p-3 border-t border-ios-lightBorder dark:border-ios-darkBorder bg-slate-50/50 dark:bg-slate-800/20 space-y-2">
        {onOpenCreateRecord && (
          <Button
            size="sm"
            variant="primary"
            onClick={onOpenCreateRecord}
            className="w-full flex items-center justify-center gap-2 text-xs py-2 shadow-sm font-bold"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Record</span>
          </Button>
        )}

        <div className="flex items-center justify-between text-[11px] text-ios-lightMuted dark:text-ios-darkMuted pt-1 px-1">
          <span className="truncate font-medium">GabayPH v1.0.4 Prototype</span>
          {onResetData && (
            <button
              onClick={onResetData}
              className="text-red-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 font-semibold"
              title="Reset Mock Fixtures"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
