import React, { useState, useMemo } from 'react';
import { CitizenReport } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import {
  CheckCircle2,
  RotateCcw,
  Search,
  Mail,
  Calendar,
  Check,
  RefreshCw
} from 'lucide-react';

interface AdminReportsViewProps {
  onDataChanged: () => void;
}

export const AdminReportsView: React.FC<AdminReportsViewProps> = ({ onDataChanged }) => {
  const { showToast } = useToast();
  const [reports, setReports] = useState<CitizenReport[]>(() => MockStorage.getReports());
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const refreshList = () => {
    setReports(MockStorage.getReports());
    onDataChanged();
  };

  const handleUpdateStatus = (id: string, status: CitizenReport['status'], title: string) => {
    MockStorage.updateReportStatus(id, status);
    refreshList();
    showToast(`Updated report status for "${title}" to ${status}.`, 'info');
  };

  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      const matchSearch =
        r.targetTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.reporterEmail && r.reporterEmail.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus = statusFilter === 'all' || r.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [reports, searchQuery, statusFilter]);

  const pendingCount = reports.filter(r => r.status === 'pending').length;

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* 1. View Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[rgba(255,149,0,0.12)] text-[#FF9500] font-mono">
              Moderation & Audit
            </span>
            <span className="text-[12px] text-[#8E8E93] flex items-center gap-1.5 font-medium">
              <span className={`w-1.5 h-1.5 rounded-full ${pendingCount > 0 ? 'bg-[#FF9500]' : 'bg-[#34C759]'}`} />
              {pendingCount > 0 ? `${pendingCount} Pending Reviews` : 'All Reports Resolved'}
            </span>
          </div>
          <h1 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-black dark:text-white leading-tight">
            Citizen Inaccuracy Reports
          </h1>
          <p className="text-[13px] text-[#8E8E93]">
            Audit citizen-reported errors regarding processing fees, requirements, and outdated agency portal URLs
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={refreshList}
            title="Refresh reports list"
            className="h-9 px-3 rounded-[10px] bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] hover:bg-[rgba(118,118,128,0.2)] text-black dark:text-white text-[13px] font-medium transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* 2. Cohesive Cardless Inset Queue Container */}
      <div className="rounded-[16px] bg-white dark:bg-[#1C1C1E] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] overflow-hidden">
        {/* Integrated Management Toolbar */}
        <div className="p-3 sm:p-3.5 bg-black/[0.015] dark:bg-white/[0.02] flex flex-col md:flex-row items-center gap-2.5">
          <div className="relative flex-1 w-full">
            <Search className="w-3.5 h-3.5 text-[#8E8E93] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search report by service title, citizen comments, or email..."
              className="w-full h-8 pl-8 pr-3 text-[13px] rounded-[8px] bg-[rgba(118,118,128,0.1)] dark:bg-[rgba(118,118,128,0.2)] text-black dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
            />
          </div>

          <div className="bg-[rgba(118,118,128,0.1)] dark:bg-[rgba(118,118,128,0.2)] p-0.5 rounded-[9px] flex items-center gap-0.5 w-full sm:w-auto overflow-x-auto shrink-0">
            {(['all', 'pending', 'resolved', 'dismissed'] as const).map(tab => {
              const active = statusFilter === tab;
              const count = tab === 'all' ? reports.length : reports.filter(r => r.status === tab).length;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setStatusFilter(tab)}
                  className={`h-7 px-3 rounded-[7px] text-[12px] font-medium capitalize whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? 'bg-[#007AFF] text-white font-semibold shadow-2xs'
                      : 'text-black dark:text-[#EBEBF5]/90 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {tab} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Reports Queue List */}
        {filteredReports.length === 0 ? (
          <div className="p-10 text-center text-[13px] text-[#8E8E93] space-y-2">
            <CheckCircle2 className="w-8 h-8 mx-auto text-[#34C759]" />
            <p className="font-semibold text-black dark:text-white">No reports in this view</p>
            <p className="text-[12px]">All citizen feedback for this status category has been processed.</p>
          </div>
        ) : (
          filteredReports.map(report => (
            <div
              key={report.id}
              className="p-4 sm:p-4.5 hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-[14px] text-black dark:text-white leading-tight">
                    {report.targetTitle}
                  </h3>
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/70">
                    Category: {report.reportType.replace('_', ' ')}
                  </span>
                </div>

                <div>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                      report.status === 'resolved'
                        ? 'bg-[rgba(52,199,89,0.12)] text-[#34C759]'
                        : report.status === 'pending'
                        ? 'bg-[rgba(255,149,0,0.12)] text-[#FF9500]'
                        : 'bg-black/5 dark:bg-white/10 text-[#8E8E93]'
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
              </div>

              {/* Citizen Details Callout Box */}
              <div className="p-3 rounded-[10px] bg-[rgba(118,118,128,0.06)] dark:bg-[rgba(118,118,128,0.12)] border border-[rgba(60,60,67,0.08)] dark:border-[rgba(84,84,88,0.2)] text-[13px] text-black/90 dark:text-white/90">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#8E8E93] mb-1">
                  Citizen Feedback
                </div>
                "{report.details}"
              </div>

              {/* Reporter Details & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[12px] text-[#8E8E93]">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#8E8E93]" />
                    <span>Submitted: {report.submittedAt}</span>
                  </span>
                  {report.reporterEmail && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[#8E8E93]" />
                      <span>{report.reporterEmail}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 justify-end">
                  {report.status !== 'resolved' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(report.id, 'resolved', report.targetTitle)}
                      className="h-7 px-3 rounded-[8px] bg-[#34C759] hover:bg-emerald-600 active:scale-[0.98] text-white text-[12px] font-semibold flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                    >
                      <Check className="w-3 h-3 stroke-[2.5]" />
                      <span>Mark Resolved</span>
                    </button>
                  )}
                  {report.status !== 'dismissed' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(report.id, 'dismissed', report.targetTitle)}
                      className="h-7 px-2.5 rounded-[8px] bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] hover:bg-[rgba(118,118,128,0.2)] text-black dark:text-white text-[12px] font-medium transition-colors cursor-pointer"
                    >
                      Dismiss
                    </button>
                  )}
                  {report.status !== 'pending' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(report.id, 'pending', report.targetTitle)}
                      className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                      title="Reopen report"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
