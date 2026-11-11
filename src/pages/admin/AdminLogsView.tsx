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
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { IOSSelect } from '../../components/common/IOSSelect';

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

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-ios-lightText dark:text-ios-darkText">
              System Audit Trail & Operations History
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
              {logs.length} logged events
            </span>
          </div>
          <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-0.5">
            Immutable audit logging for all record additions, updates, deletions, citizen report resolutions, and admin logins.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" variant="outline" onClick={refreshList} title="Refresh audit log">
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
          <Button size="sm" variant="secondary" onClick={handleExportJSON} className="font-bold flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>Export Trail (JSON)</span>
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-3.5 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-ios-lightMuted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search action description, operator name, or entity ID..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-ios-lg bg-slate-50 dark:bg-slate-800 border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightText dark:text-ios-darkText focus:outline-none focus:ring-2 focus:ring-ios-navy"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
          <IOSSelect
            value={statusFilter}
            onChange={setStatusFilter}
            size="sm"
            className="w-full sm:w-44"
            options={[
              { value: 'all', label: 'All Severities' },
              { value: 'success', label: 'Success / Additions' },
              { value: 'warning', label: 'Warning / Deletions' },
              { value: 'info', label: 'Informational Updates' },
            ]}
          />

          <IOSSelect
            value={entityFilter}
            onChange={setEntityFilter}
            size="sm"
            className="w-full sm:w-44"
            options={[
              { value: 'all', label: 'All Entity Types' },
              { value: 'service', label: 'Services (Serbisyo)' },
              { value: 'trabaho', label: 'Careers (Trabaho)' },
              { value: 'pera', label: 'Financial (Pera)' },
              { value: 'bulletin', label: 'Public Bulletins' },
              { value: 'report', label: 'Reports' },
              { value: 'system', label: 'System Core' },
            ]}
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm overflow-hidden">
        {filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-xs text-ios-lightMuted space-y-2">
            <History className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
            <p className="font-semibold text-ios-lightText dark:text-ios-darkText">No audit events match your search</p>
            <p>Try resetting the status or entity filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-ios-lightMuted uppercase text-[10px] font-bold border-b border-ios-lightBorder dark:border-ios-darkBorder">
                <tr>
                  <th className="p-3.5">Timestamp</th>
                  <th className="p-3.5">Operator / Actor</th>
                  <th className="p-3.5">Action Description</th>
                  <th className="p-3.5">Entity Type & ID</th>
                  <th className="p-3.5 text-right">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ios-lightBorder dark:divide-ios-darkBorder">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 whitespace-nowrap text-slate-500 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{log.timestamp}</span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-bold text-ios-lightText dark:text-ios-darkText">
                        <User className="w-3.5 h-3.5 text-ios-navy dark:text-blue-400" />
                        <span>{log.user}</span>
                      </div>
                    </td>
                    <td className="p-3.5 max-w-md">
                      <span className="font-medium text-ios-lightText dark:text-ios-darkText">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {log.entityType}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono">
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
