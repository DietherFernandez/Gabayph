import { PesoSign } from '../../components/common/PesoSign';
import React from 'react';
import { useApp } from '../../context/AppContext';
import { MockStorage } from '../../data/mockStorage';
import {
  FileText,
  Briefcase,
    GraduationCap,
  AlertTriangle,
  CheckCircle2,
  Plus,
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { AdminNavCounts } from '../../components/admin/AdminSidebar';
import { BaseItem } from '../../types';

interface AdminOverviewViewProps {
  counts: AdminNavCounts;
  onOpenCreate: (category: any) => void;
  onOpenEdit: (item: BaseItem) => void;
}

export const AdminOverviewView: React.FC<AdminOverviewViewProps> = ({
  counts,
  onOpenCreate,
  onOpenEdit
}) => {
  const { navigate } = useApp();
  const reports = MockStorage.getReports();
  const suggestions = MockStorage.getSuggestions();
  const logs = MockStorage.getActivityLogs();
  const allServices = MockStorage.getServices();

  const pendingReports = reports.filter(r => r.status === 'pending');
  const pendingSuggestions = suggestions.filter(s => s.status === 'pending');

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Administrative Welcome & Prototype Banner */}
      <div className="bg-gradient-to-r from-ios-navy to-slate-900 text-white p-5 sm:p-6 rounded-ios-2xl shadow-ios-md relative overflow-hidden border border-slate-800">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-mono">
                Prototype Mode (Phase 1)
              </span>
              <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Local Session
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Welcome back, Administrator Maria Santos
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal">
              Manage public service entries, publish verified government opportunities, review citizen feedback, and oversee Citizen's Charter compliance across all national directories.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onOpenCreate('serbisyo')}
              className="text-xs font-bold bg-white text-slate-950 hover:bg-slate-100 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Record</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate('/admin/settings')}
              className="text-xs border-white/20 text-white hover:bg-white/10"
            >
              Settings
            </Button>
          </div>
        </div>

        {/* Subtle decorative background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        <div
          onClick={() => navigate('/admin/services')}
          className="p-3.5 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm hover:border-ios-navy/40 dark:hover:border-blue-400/40 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-ios-lightMuted">
            <span className="text-[10px] font-bold uppercase tracking-wider">Public Services</span>
            <FileText className="w-4 h-4 text-ios-navy dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-ios-lightText dark:text-ios-darkText mt-1">
            {counts.services}
          </div>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">
            ✓ 100% Verified
          </span>
        </div>

        <div
          onClick={() => navigate('/admin/jobs')}
          className="p-3.5 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm hover:border-blue-500/40 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-ios-lightMuted">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Careers</span>
            <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-ios-lightText dark:text-ios-darkText mt-1">
            {counts.jobs}
          </div>
          <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold block mt-0.5">
            Civil Service & Gov
          </span>
        </div>

        <div
          onClick={() => navigate('/admin/assistance')}
          className="p-3.5 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm hover:border-emerald-500/40 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-ios-lightMuted">
            <span className="text-[10px] font-bold uppercase tracking-wider">Financial Aid</span>
            <PesoSign className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-ios-lightText dark:text-ios-darkText mt-1">
            {counts.assistance}
          </div>
          <span className="text-[10px] text-ios-lightMuted block mt-0.5">
            4Ps, AICS, TUPAD
          </span>
        </div>

        <div
          onClick={() => navigate('/admin/education')}
          className="p-3.5 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm hover:border-purple-500/40 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-ios-lightMuted">
            <span className="text-[10px] font-bold uppercase tracking-wider">Education & TVET</span>
            <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-ios-lightText dark:text-ios-darkText mt-1">
            {counts.education}
          </div>
          <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold block mt-0.5">
            CHED & TESDA
          </span>
        </div>

        <div
          onClick={() => navigate('/admin/reports')}
          className={`p-3.5 rounded-ios-xl bg-white dark:bg-slate-900 border shadow-ios-sm cursor-pointer transition-all ${
            pendingReports.length > 0
              ? 'border-amber-400 bg-amber-50/20 dark:bg-amber-950/20 hover:border-amber-500'
              : 'border-ios-lightBorder dark:border-ios-darkBorder'
          }`}
        >
          <div className="flex items-center justify-between text-ios-lightMuted">
            <span className="text-[10px] font-bold uppercase tracking-wider">Pending Reports</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
            {pendingReports.length}
          </div>
          <span className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold block mt-0.5">
            Action Required
          </span>
        </div>

        <div
          onClick={() => navigate('/admin/suggestions')}
          className="p-3.5 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm hover:border-emerald-500/40 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between text-ios-lightMuted">
            <span className="text-[10px] font-bold uppercase tracking-wider">Suggestions</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {counts.suggestions}
          </div>
          <span className="text-[10px] text-ios-lightMuted block mt-0.5">
            Public Submissions
          </span>
        </div>
      </div>

      {/* Pending Moderation Callout (if any) */}
      {(pendingReports.length > 0 || pendingSuggestions.length > 0) && (
        <div className="p-4 rounded-ios-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-ios-lg bg-amber-500 text-white shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-amber-900 dark:text-amber-200">
                {pendingReports.length} Inaccuracy Report{pendingReports.length !== 1 ? 's' : ''} & {pendingSuggestions.length} Pending Suggestion{pendingSuggestions.length !== 1 ? 's' : ''}
              </h3>
              <p className="text-amber-800/80 dark:text-amber-300/80 text-[11px]">
                Citizen feedback and proposed public services are awaiting operator review and verification.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate(pendingReports.length > 0 ? '/admin/reports' : '/admin/suggestions')}
            className="text-xs bg-amber-600 hover:bg-amber-700 text-white shrink-0 font-bold"
          >
            Review Moderation Queue →
          </Button>
        </div>
      )}

      {/* Quick Operations Launchpad */}
      <div className="p-5 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-ios-lightMuted dark:text-ios-darkMuted flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-ios-navy dark:text-blue-400" />
            Quick Administrative Actions
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => onOpenCreate('serbisyo')}
            className="p-3 rounded-ios-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-left transition-colors border border-slate-200/70 dark:border-slate-700/60 group"
          >
            <div className="font-bold text-xs text-ios-lightText dark:text-ios-darkText group-hover:text-ios-navy dark:group-hover:text-blue-400">
              + Public Service
            </div>
            <p className="text-[10px] text-ios-lightMuted mt-0.5">
              Add new Citizen's Charter entry
            </p>
          </button>

          <button
            onClick={() => onOpenCreate('trabaho')}
            className="p-3 rounded-ios-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-left transition-colors border border-slate-200/70 dark:border-slate-700/60 group"
          >
            <div className="font-bold text-xs text-ios-lightText dark:text-ios-darkText group-hover:text-ios-navy dark:group-hover:text-blue-400">
              + Career Opportunity
            </div>
            <p className="text-[10px] text-ios-lightMuted mt-0.5">
              Post Civil Service job vacancy
            </p>
          </button>

          <button
            onClick={() => onOpenCreate('pera')}
            className="p-3 rounded-ios-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-left transition-colors border border-slate-200/70 dark:border-slate-700/60 group"
          >
            <div className="font-bold text-xs text-ios-lightText dark:text-ios-darkText group-hover:text-ios-navy dark:group-hover:text-blue-400">
              + Financial Assistance
            </div>
            <p className="text-[10px] text-ios-lightMuted mt-0.5">
              Publish subsidy or aid program
            </p>
          </button>

          <button
            onClick={() => onOpenCreate('announcements')}
            className="p-3 rounded-ios-lg bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 text-left transition-colors border border-slate-200/70 dark:border-slate-700/60 group"
          >
            <div className="font-bold text-xs text-ios-lightText dark:text-ios-darkText group-hover:text-ios-navy dark:group-hover:text-blue-400">
              + Public Bulletin
            </div>
            <p className="text-[10px] text-ios-lightMuted mt-0.5">
              Issue official advisory
            </p>
          </button>
        </div>
      </div>

      {/* Two Column Layout: Recent Directory Records + Recent Activity Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recently Updated Services */}
        <div className="p-5 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-ios-lightText dark:text-ios-darkText">
                Recently Updated Records
              </h2>
              <p className="text-[11px] text-ios-lightMuted">
                Top verified entries in public directory
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/services')}
              className="text-xs text-ios-navy dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-ios-lightBorder dark:divide-ios-darkBorder text-xs">
            {allServices.slice(0, 5).map(item => (
              <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-ios-lightText dark:text-ios-darkText truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-ios-lightMuted truncate">
                    {item.agency} • Fees: {item.fees}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onOpenEdit(item)}
                    className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-ios-navy dark:text-blue-400 hover:bg-slate-200"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Audit Trail Logs */}
        <div className="p-5 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-ios-lightText dark:text-ios-darkText">
                Recent Audit Trail Events
              </h2>
              <p className="text-[11px] text-ios-lightMuted">
                Real-time activity log of operations
              </p>
            </div>
            <button
              onClick={() => navigate('/admin/logs')}
              className="text-xs text-ios-navy dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
            >
              <span>View Full Trail</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-ios-lightBorder dark:divide-ios-darkBorder text-xs">
            {logs.slice(0, 5).map(log => (
              <div key={log.id} className="py-2.5 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ios-lightText dark:text-ios-darkText truncate">
                    {log.action}
                  </p>
                  <p className="text-[11px] text-ios-lightMuted flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{log.user}</span>
                    <span>•</span>
                    <span>{log.timestamp}</span>
                  </p>
                </div>
                <Badge
                  variant={
                    log.status === 'success'
                      ? 'verified'
                      : log.status === 'warning'
                      ? 'urgent'
                      : 'default'
                  }
                  className="text-[10px]"
                >
                  {log.entityType}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
