import React, { useState, useMemo } from 'react';
import { ServiceSuggestion, ServiceItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import {
  CheckCircle2,
  Search,
  ExternalLink,
  Calendar,
  Building2,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/common/Button';

interface AdminSuggestionsViewProps {
  onDataChanged: () => void;
}

export const AdminSuggestionsView: React.FC<AdminSuggestionsViewProps> = ({
  onDataChanged
}) => {
  const { showToast } = useToast();
  const [suggestions, setSuggestions] = useState<ServiceSuggestion[]>(() => MockStorage.getSuggestions());
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const refreshList = () => {
    setSuggestions(MockStorage.getSuggestions());
    onDataChanged();
  };

  const handleUpdateStatus = (id: string, status: ServiceSuggestion['status'], name: string) => {
    MockStorage.updateSuggestionStatus(id, status);
    refreshList();
    showToast(`Suggestion "${name}" updated to ${status}.`, 'info');
  };

  const handleApproveAndPromote = (sug: ServiceSuggestion) => {
    // 1. Mark suggestion as approved
    MockStorage.updateSuggestionStatus(sug.id, 'approved');

    // 2. Automatically create new verified service in public directory
    const newService: ServiceItem = {
      id: `srv-promoted-${Date.now()}`,
      title: sug.serviceName,
      category: 'serbisyo',
      serviceType: 'identity',
      agency: sug.agencyName,
      agencyAcronym: sug.agencyName.slice(0, 4).toUpperCase(),
      description: sug.description,
      requirements: ['Valid Government-issued ID', 'Proof of Billing / Address'],
      eligibility: ['All qualified Filipino citizens'],
      fees: 'Standard Citizen\'s Charter Schedule',
      processingTime: '3–5 working days',
      steps: ['Submit online application via agency portal.', 'Verify identity at regional satellite office.'],
      officeLocations: ['Regional Offices nationwide'],
      onlineServiceAvailable: !!sug.sourceUrl,
      onlineServiceUrl: sug.sourceUrl || 'https://gov.ph',
      lastVerified: 'November 2026',
      isVerified: true
    };

    MockStorage.addItem(newService);
    refreshList();
    showToast(`Approved & promoted "${sug.serviceName}" to official Services Directory!`, 'success');
  };

  const filteredSuggestions = useMemo(() => {
    return suggestions.filter(sug => {
      const matchSearch =
        sug.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sug.agencyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sug.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'all' || sug.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [suggestions, searchQuery, statusFilter]);

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-ios-lightText dark:text-ios-darkText">
              Public Service Suggestions Queue
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold">
              {suggestions.length} submissions
            </span>
          </div>
          <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-0.5">
            Review community crowdsourced government services submitted by Filipino citizens for directory inclusion.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" variant="outline" onClick={refreshList} title="Refresh suggestions list">
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
            placeholder="Search suggestion name, government agency, or details..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-ios-lg bg-slate-50 dark:bg-slate-800 border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightText dark:text-ios-darkText focus:outline-none focus:ring-2 focus:ring-ios-navy"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {(['all', 'pending', 'approved', 'rejected'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-ios-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                statusFilter === tab
                  ? 'bg-ios-navy text-white shadow-sm dark:bg-blue-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-ios-lightMuted hover:text-ios-lightText dark:hover:text-ios-darkText'
              }`}
            >
              {tab === 'all' ? `All (${suggestions.length})` : `${tab} (${suggestions.filter(s => s.status === tab).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Suggestions Queue Cards */}
      <div className="space-y-3">
        {filteredSuggestions.length === 0 ? (
          <div className="p-8 text-center text-xs text-ios-lightMuted bg-white dark:bg-slate-900 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder space-y-2">
            <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500" />
            <p className="font-semibold text-ios-lightText dark:text-ios-darkText">No suggestions found in this view</p>
            <p>Citizen submissions will appear here for administrative verification.</p>
          </div>
        ) : (
          filteredSuggestions.map(sug => (
            <div
              key={sug.id}
              className="p-4 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-2.5 text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-ios-lightText dark:text-ios-darkText">
                    {sug.serviceName}
                  </h3>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-ios-navy dark:text-blue-400">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{sug.agencyName}</span>
                  </span>
                </div>

                <div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      sug.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        : sug.status === 'pending'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                        : 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border border-red-300 dark:border-red-800'
                    }`}
                  >
                    {sug.status}
                  </span>
                </div>
              </div>

              <p className="text-ios-lightMuted dark:text-ios-darkMuted leading-relaxed">
                {sug.description}
              </p>

              {sug.sourceUrl && (
                <div className="text-[11px]">
                  <a
                    href={sug.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ios-navy dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Suggested URL: {sug.sourceUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-ios-lightBorder dark:border-ios-darkBorder text-[11px] text-ios-lightMuted">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>Submitted: {sug.submittedAt}</span>
                  </span>
                  {sug.submittedBy && (
                    <span>By: {sug.submittedBy}</span>
                  )}
                </div>

                <div className="flex items-center gap-2 justify-end">
                  {sug.status !== 'approved' && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleApproveAndPromote(sug)}
                      className="text-xs py-1 font-bold flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Approve & Promote to Directory</span>
                    </Button>
                  )}
                  {sug.status !== 'rejected' && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleUpdateStatus(sug.id, 'rejected', sug.serviceName)}
                      className="text-xs py-1"
                    >
                      Reject
                    </Button>
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
