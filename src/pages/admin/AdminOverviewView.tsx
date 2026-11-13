import { PesoSign } from '../../components/common/PesoSign';
import React, { useState } from 'react';
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
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { AdminNavCounts } from '../../components/admin/AdminSidebar';
import { BaseItem } from '../../types';

import { useToast } from '../../context/ToastContext';

interface AdminOverviewViewProps {
  counts: AdminNavCounts;
  onOpenCreate: (category: any) => void;
  onOpenEdit: (item: BaseItem) => void;
  onDataChanged?: () => void;
}

export const AdminOverviewView: React.FC<AdminOverviewViewProps> = ({
  counts,
  onOpenCreate,
  onOpenEdit,
  onDataChanged
}) => {
  const { navigate } = useApp();
  const { showToast } = useToast();
  const [, setTick] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTick(t => t + 1);
    window.dispatchEvent(new CustomEvent('gabayph_data_updated'));
    onDataChanged?.();
    showToast('Dashboard overview metrics refreshed.', 'info');
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const reports = MockStorage.getReports();
  const suggestions = MockStorage.getSuggestions();
  const logs = MockStorage.getActivityLogs();
  const allServices = MockStorage.getServices();

  const pendingReports = reports.filter(r => r.status === 'pending');
  const pendingSuggestions = suggestions.filter(s => s.status === 'pending');

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* 1. Header Toolbar (Cardless macOS/iOS Style) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[rgba(0,122,255,0.12)] text-[#007AFF] font-mono">
              Admin Workspace
            </span>
            <span className="text-[12px] text-[#8E8E93] flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#34C759]" />
              Active Session • Maria Santos
            </span>
          </div>

          <h1 className="text-[22px] sm:text-[26px] font-bold tracking-tight text-black dark:text-white leading-tight">
            Dashboard Overview
          </h1>

          <p className="text-[13px] text-[#8E8E93] mt-0.5">
            Citizen's Charter compliance, directory records, and public feedback
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Refresh dashboard metrics"
            className="h-9 px-3.5 rounded-[10px] bg-[rgba(118,118,128,0.1)] dark:bg-[rgba(118,118,128,0.2)] hover:bg-[rgba(118,118,128,0.18)] dark:hover:bg-[rgba(118,118,128,0.3)] text-black dark:text-white text-[13px] font-medium transition-all cursor-pointer flex items-center gap-2 active:scale-95 disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 stroke-[2.2] ${isRefreshing ? 'animate-spin text-[#007AFF]' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenCreate('serbisyo')}
            className="h-9 px-3.5 rounded-[10px] bg-[#007AFF] hover:bg-blue-600 active:scale-[0.98] text-white text-[13px] font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.2]" />
            <span>New Record</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/settings')}
            className="h-9 px-3 rounded-[10px] bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] hover:bg-[rgba(118,118,128,0.2)] text-black dark:text-white text-[13px] font-medium transition-colors cursor-pointer"
          >
            Settings
          </button>
        </div>
      </div>

      {/* 2. Cohesive Inset Segmented KPI Metrics Grid */}
      <div className="rounded-[16px] bg-white dark:bg-[#1C1C1E] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] divide-y sm:divide-y-0 sm:divide-x divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 overflow-hidden">
        {/* Services */}
        <div
          onClick={() => navigate('/admin/services')}
          className="p-3.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between text-[#8E8E93]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Services</span>
            <FileText className="w-3.5 h-3.5 text-[#007AFF]" />
          </div>
          <div className="text-[22px] font-bold text-black dark:text-white mt-1 leading-tight">
            {counts.services}
          </div>
          <span className="text-[11px] text-[#34C759] font-medium block mt-0.5">
            Verified
          </span>
        </div>

        {/* Jobs */}
        <div
          onClick={() => navigate('/admin/jobs')}
          className="p-3.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between text-[#8E8E93]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Careers</span>
            <Briefcase className="w-3.5 h-3.5 text-[#007AFF]" />
          </div>
          <div className="text-[22px] font-bold text-black dark:text-white mt-1 leading-tight">
            {counts.jobs}
          </div>
          <span className="text-[11px] text-[#8E8E93] font-medium block mt-0.5">
            Gov Openings
          </span>
        </div>

        {/* Financial Assistance */}
        <div
          onClick={() => navigate('/admin/assistance')}
          className="p-3.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between text-[#8E8E93]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Financial Aid</span>
            <PesoSign className="w-3.5 h-3.5 text-[#34C759]" />
          </div>
          <div className="text-[22px] font-bold text-black dark:text-white mt-1 leading-tight">
            {counts.assistance}
          </div>
          <span className="text-[11px] text-[#8E8E93] font-medium block mt-0.5">
            Subsidies & Aid
          </span>
        </div>

        {/* Education & TVET */}
        <div
          onClick={() => navigate('/admin/education')}
          className="p-3.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between text-[#8E8E93]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Education</span>
            <GraduationCap className="w-3.5 h-3.5 text-[#AF52DE]" />
          </div>
          <div className="text-[22px] font-bold text-black dark:text-white mt-1 leading-tight">
            {counts.education}
          </div>
          <span className="text-[11px] text-[#8E8E93] font-medium block mt-0.5">
            CHED & TESDA
          </span>
        </div>

        {/* Pending Reports */}
        <div
          onClick={() => navigate('/admin/reports')}
          className={`p-3.5 cursor-pointer transition-colors ${
            pendingReports.length > 0
              ? 'bg-[rgba(255,149,0,0.06)] hover:bg-[rgba(255,149,0,0.1)]'
              : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.03]'
          }`}
        >
          <div className="flex items-center justify-between text-[#8E8E93]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Reports</span>
            <AlertTriangle className={`w-3.5 h-3.5 ${pendingReports.length > 0 ? 'text-[#FF9500]' : 'text-[#8E8E93]'}`} />
          </div>
          <div className={`text-[22px] font-bold mt-1 leading-tight ${pendingReports.length > 0 ? 'text-[#FF9500]' : 'text-black dark:text-white'}`}>
            {pendingReports.length}
          </div>
          <span className="text-[11px] text-[#FF9500] font-medium block mt-0.5">
            {pendingReports.length > 0 ? 'Action Needed' : 'Cleared'}
          </span>
        </div>

        {/* Suggestions */}
        <div
          onClick={() => navigate('/admin/suggestions')}
          className="p-3.5 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] cursor-pointer transition-colors"
        >
          <div className="flex items-center justify-between text-[#8E8E93]">
            <span className="text-[10px] font-bold uppercase tracking-wider">Feedback</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759]" />
          </div>
          <div className="text-[22px] font-bold text-black dark:text-white mt-1 leading-tight">
            {counts.suggestions}
          </div>
          <span className="text-[11px] text-[#8E8E93] font-medium block mt-0.5">
            Submissions
          </span>
        </div>
      </div>

      {/* 3. Sleek Moderation Callout (if any) */}
      {(pendingReports.length > 0 || pendingSuggestions.length > 0) && (
        <div className="p-3.5 rounded-[14px] bg-[rgba(255,149,0,0.08)] dark:bg-[rgba(255,149,0,0.15)] border border-[rgba(255,149,0,0.25)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#FF9500] shrink-0" />
            <span className="font-semibold text-black dark:text-white">
              {pendingReports.length} inaccuracy report{pendingReports.length !== 1 ? 's' : ''} & {pendingSuggestions.length} suggestion{pendingSuggestions.length !== 1 ? 's' : ''} awaiting moderation
            </span>
          </div>
          <button
            type="button"
            onClick={() => navigate(pendingReports.length > 0 ? '/admin/reports' : '/admin/suggestions')}
            className="text-[13px] font-semibold text-[#FF9500] hover:underline flex items-center gap-1 shrink-0 cursor-pointer"
          >
            <span>Review Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 4. Quick Action Segmented Pills */}
      <div>
        <h2 className="text-[12px] font-bold uppercase tracking-wider text-[#8E8E93] mb-2 px-1 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#007AFF]" />
          <span>Quick Actions</span>
        </h2>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => onOpenCreate('serbisyo')}
            className="h-8 px-3 rounded-full bg-white dark:bg-[#1C1C1E] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] hover:border-[#007AFF] text-[12px] font-medium text-black dark:text-white flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#007AFF]" />
            <span>Public Service</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenCreate('trabaho')}
            className="h-8 px-3 rounded-full bg-white dark:bg-[#1C1C1E] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] hover:border-[#007AFF] text-[12px] font-medium text-black dark:text-white flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#007AFF]" />
            <span>Job Vacancy</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenCreate('pera')}
            className="h-8 px-3 rounded-full bg-white dark:bg-[#1C1C1E] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] hover:border-[#007AFF] text-[12px] font-medium text-black dark:text-white flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#007AFF]" />
            <span>Financial Aid</span>
          </button>
          <button
            type="button"
            onClick={() => onOpenCreate('announcements')}
            className="h-8 px-3 rounded-full bg-white dark:bg-[#1C1C1E] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] hover:border-[#007AFF] text-[12px] font-medium text-black dark:text-white flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#007AFF]" />
            <span>Advisory Bulletin</span>
          </button>
        </div>
      </div>

      {/* 5. Inset Grouped Two Columns: Recently Updated Records + Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recently Updated Services */}
        <div className="rounded-[16px] bg-white dark:bg-[#1C1C1E] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] overflow-hidden">
          <div className="px-4 py-3 border-b border-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-bold text-black dark:text-white">
                Recently Updated Records
              </h2>
              <p className="text-[11px] text-[#8E8E93]">
                Top verified entries in public directory
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/admin/services')}
              className="text-[12px] text-[#007AFF] font-medium hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)]">
            {allServices.slice(0, 5).map(item => (
              <div
                key={item.id}
                className="px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium text-black dark:text-white truncate">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-[#8E8E93] truncate">
                    {item.agency} • Fees: {item.fees}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpenEdit(item)}
                    className="h-6 px-2.5 rounded-[6px] bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] text-[11px] font-semibold text-[#007AFF] hover:bg-[#007AFF] hover:text-white transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Audit Trail Logs */}
        <div className="rounded-[16px] bg-white dark:bg-[#1C1C1E] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] overflow-hidden">
          <div className="px-4 py-3 border-b border-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] flex items-center justify-between">
            <div>
              <h2 className="text-[14px] font-bold text-black dark:text-white">
                Recent Audit Trail Events
              </h2>
              <p className="text-[11px] text-[#8E8E93]">
                Real-time activity log of operations
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate('/admin/logs')}
              className="text-[12px] text-[#007AFF] font-medium hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>Full Trail</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)]">
            {logs.slice(0, 5).map(log => (
              <div
                key={log.id}
                className="px-4 py-2.5 flex items-start justify-between gap-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-black dark:text-white truncate">
                    {log.action}
                  </p>
                  <p className="text-[11px] text-[#8E8E93] flex items-center gap-1.5 mt-0.5">
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
                  className="text-[10px] shrink-0"
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
