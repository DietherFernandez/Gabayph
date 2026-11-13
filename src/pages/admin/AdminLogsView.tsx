import React, { useState, useMemo } from 'react';
import { ActivityLogItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import {
  History,
  Search,
  Download,
  Clock,
  User,
  RefreshCw
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { InlineFilterBar, FilterGroup } from '../../components/common/InlineFilterBar';

interface AdminLogsViewProps {
  onDataChanged: () => void;
}

export const AdminLogsView: React.FC<AdminLogsViewProps> = ({ onDataChanged }) => {
  const { showToast } = useToast();
  const [logs, setLogs] = useState<ActivityLogItem[]>(() => MockStorage.getActivityLogs());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [entityFilter, setEntityFilter] = useState<string>('all');

  const refreshList = () => {
    setLogs(MockStorage.getActivityLogs());
    onDataChanged();
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `gabayph_audit_trail_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported audit trail log as JSON file.', 'success');
  };

  const filterGroups: FilterGroup[] = [
    {
      id: 'status',
      label: 'Severity',
      options: [
        { value: 'all', label: 'All Severities' },
        { value: 'success', label: 'Success / Additions' },
        { value: 'warning', label: 'Warning / Deletions' },
        { value: 'info', label: 'Informational Updates' },
      ]
    },
    {
      id: 'entity',
      label: 'Entity Type',
      options: [
        { value: 'all', label: 'All Entity Types' },
        { value: 'service', label: 'Services (Serbisyo)' },
        { value: 'trabaho', label: 'Careers (Trabaho)' },
        { value: 'pera', label: 'Financial (Pera)' },
        { value: 'bulletin', label: 'Public Bulletins' },
        { value: 'report', label: 'Reports' },
        { value: 'system', label: 'System Core' },
      ]
    }
  ];

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const matchSearch =
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.entityId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'all' || log.status === statusFilter;
      const matchEntity = entityFilter === 'all' || log.entityType.toLowerCase() === entityFilter.toLowerCase();

      return matchSearch && matchStatus && matchEntity;
    });
  }, [logs, searchQuery, statusFilter, entityFilter]);

  const hasActiveFilters = Boolean(statusFilter !== 'all' || entityFilter !== 'all' || searchQuery.trim() !== '');

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* 1. View Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[rgba(0,122,255,0.12)] text-[#007AFF] font-mono">
              Security & Compliance
            </span>
            <span className="text-[12px] text-[#8E8E93] flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
              {logs.length} Audit Events Logged
            </span>
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-black dark:text-white leading-tight">
              System Audit Trail & Operations Log
            </h1>
            <button
              type="button"
              onClick={refreshList}
              title="Refresh audit log"
              className="p-1 rounded-[6px] text-[#8E8E93] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:rotate-180 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          <p className="text-[13px] text-[#8E8E93] mt-0.5">
            Immutable logging for all record creations, edits, deletions, moderation reviews, and logins
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleExportJSON}
            className="h-9 px-3.5 rounded-[10px] bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] hover:bg-[rgba(118,118,128,0.2)] text-black dark:text-white text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Trail (JSON)</span>
          </button>
        </div>
      </div>

      {/* 2. Cohesive Cardless Inset Table Container */}
      <div className="rounded-[16px] bg-white dark:bg-[#1C1C1E] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] overflow-hidden">
        {/* Integrated Management Toolbar (Compact & Subtle Search + Filter) */}
        <div className="p-3 sm:p-3.5 bg-black/[0.015] dark:bg-white/[0.02] border-b border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)] space-y-2">
          {/* Search Pill Input */}
          <div className="w-full flex items-center gap-2.5 bg-[rgba(118,118,128,0.08)] dark:bg-[rgba(118,118,128,0.18)] h-9 px-3 rounded-[10px]">
            <Search className="w-4 h-4 text-[#8E8E93] shrink-0 stroke-[2.2]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search action description, operator name, or entity ID..."
              className="w-full bg-transparent text-[13px] text-black dark:text-white placeholder-[#8E8E93] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[11px] font-medium text-[#8E8E93] hover:text-black dark:hover:text-white px-1 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Compact InlineFilterBar */}
          <InlineFilterBar
            groups={filterGroups}
            selectedValues={{ status: statusFilter, entity: entityFilter }}
            onSelect={(groupId, val) => {
              if (groupId === 'status') setStatusFilter(val);
              if (groupId === 'entity') setEntityFilter(val);
            }}
            onReset={() => {
              setStatusFilter('all');
              setEntityFilter('all');
              setSearchQuery('');
            }}
            hasActiveFilters={hasActiveFilters}
            resetLabel="Reset"
          />
        </div>

        {filteredLogs.length === 0 ? (
          <div className="p-10 text-center text-[13px] text-[#8E8E93] space-y-2">
            <History className="w-8 h-8 mx-auto text-[#8E8E93]/60" />
            <p className="font-semibold text-black dark:text-white">No audit events match your search</p>
            <p className="text-[12px]">Try resetting the severity or entity filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-black/[0.02] dark:bg-white/[0.03] text-[#8E8E93] uppercase text-[11px] font-semibold tracking-wider border-b border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)]">
                <tr>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Operator</th>
                  <th className="p-3.5">Action Event</th>
                  <th className="p-3.5">Target Entity</th>
                  <th className="p-3.5 text-right">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] text-[13px]">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                    <td className="p-3.5 whitespace-nowrap text-[#8E8E93]">
                      <div className="flex items-center gap-1.5 font-mono text-[12px]">
                        <Clock className="w-3.5 h-3.5 text-[#8E8E93]" />
                        <span>{log.timestamp}</span>
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-medium text-black dark:text-white">
                        <User className="w-3.5 h-3.5 text-[#007AFF]" />
                        <span>{log.user}</span>
                      </div>
                    </td>
                    <td className="p-3.5 max-w-md">
                      <span className="font-medium text-black dark:text-white">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-semibold text-black/80 dark:text-white/80">
                        {log.entityType}
                      </span>
                      <span className="text-[11px] text-[#8E8E93] block font-mono">
                        {log.entityId}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <Badge
                        variant={
                          log.status === 'success'
                            ? 'verified'
                            : log.status === 'warning'
                            ? 'urgent'
                            : 'default'
                        }
                      >
                        {log.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
