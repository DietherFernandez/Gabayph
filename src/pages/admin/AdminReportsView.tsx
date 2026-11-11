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
import { Button } from '../../components/common/Button';

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-ios-lightText dark:text-ios-darkText">
              Citizen Inaccuracy Reports & Moderation Queue
            </h1>
            {pendingCount > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold">
                {pendingCount} pending
              </span>
            )}
          </div>
          <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-0.5">
            Audit citizen-reported errors regarding processing fees, missing requirements, and outdated agency portal URLs.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" variant="outline" onClick={refreshList} title="Refresh reports list">
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Filter and Status Bar */}
      <div className="p-3.5 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-ios-lightMuted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search report by service title, citizen comments, or email..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-ios-lg bg-slate-50 dark:bg-slate-800 border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightText dark:text-ios-darkText focus:outline-none focus:ring-2 focus:ring-ios-navy"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {(['all', 'pending', 'resolved', 'dismissed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-ios-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                statusFilter === tab
                  ? 'bg-ios-navy text-white shadow-sm dark:bg-blue-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-ios-lightMuted hover:text-ios-lightText dark:hover:text-ios-darkText'
              }`}
            >
              {tab === 'all' ? `All (${reports.length})` : `${tab} (${reports.filter(r => r.status === tab).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Queue List */}
      <div className="space-y-3">
        {filteredReports.length === 0 ? (
          <div className="p-8 text-center text-xs text-ios-lightMuted bg-white dark:bg-slate-900 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder space-y-2">
            <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500" />
            <p className="font-semibold text-ios-lightText dark:text-ios-darkText">No reports in this view</p>
            <p>All citizen feedback for this category has been processed.</p>
          </div>
        ) : (
          filteredReports.map(report => (
            <div
              key={report.id}
              className="p-4 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-2.5 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm text-ios-lightText dark:text-ios-darkText">
                    {report.targetTitle}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Category: {report.reportType.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      report.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        : report.status === 'pending'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
              </div>

              {/* Citizen Details Box */}
              <div className="p-3 rounded-ios-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 text-xs">
                <div className="font-semibold text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                  Citizen Feedback:
                </div>
                "{report.details}"
              </div>

              {/* Reporter details & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-ios-lightBorder dark:border-ios-darkBorder text-[11px] text-ios-lightMuted">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Submitted: {report.submittedAt}</span>
                  </span>
                  {report.reporterEmail && (
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      <span>{report.reporterEmail}</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 justify-end">
                  {report.status !== 'resolved' && (
                    <Button
                      size="sm"
                      variant="green"
                      onClick={() => handleUpdateStatus(report.id, 'resolved', report.targetTitle)}
                      className="text-xs py-1 font-bold"
                    >
                      <Check className="w-3 h-3" />
                      <span>Mark Resolved</span>
                    </Button>
                  )}
                  {report.status !== 'dismissed' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateStatus(report.id, 'dismissed', report.targetTitle)}
                      className="text-xs py-1"
                    >
                      Dismiss
                    </Button>
                  )}
                  {report.status !== 'pending' && (
                    <button
                      onClick={() => handleUpdateStatus(report.id, 'pending', report.targetTitle)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 rounded"
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
