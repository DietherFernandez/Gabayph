import React, { useState, useMemo } from 'react';
import { ServiceSuggestion, ServiceItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import { InlineFilterBar, FilterGroup } from '../../components/common/InlineFilterBar';
import {
  CheckCircle2,
  Search,
  ExternalLink,
  Calendar,
  Building2,
  RefreshCw,
  Sparkles
} from 'lucide-react';

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
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshList = () => {
    setIsRefreshing(true);
    setSuggestions(MockStorage.getSuggestions());
    onDataChanged();
    window.dispatchEvent(new CustomEvent('gabayph_data_updated'));
    showToast('Service suggestions queue refreshed.', 'info');
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleUpdateStatus = (id: string, status: ServiceSuggestion['status'], name: string) => {
    MockStorage.updateSuggestionStatus(id, status);
    refreshList();
    showToast(`Suggestion "${name}" updated to ${status}.`, 'info');
  };

  const handleApproveAndPromote = (sug: ServiceSuggestion) => {
    MockStorage.updateSuggestionStatus(sug.id, 'approved');

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

  const filterGroups: FilterGroup[] = [
    {
      id: 'status',
      label: 'Submission Status',
      options: [
        { value: 'all', label: `All (${suggestions.length})` },
        { value: 'pending', label: `Pending (${suggestions.filter(s => s.status === 'pending').length})` },
        { value: 'approved', label: `Approved (${suggestions.filter(s => s.status === 'approved').length})` },
        { value: 'rejected', label: `Rejected (${suggestions.filter(s => s.status === 'rejected').length})` },
      ]
    }
  ];

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

  const pendingCount = suggestions.filter(s => s.status === 'pending').length;
  const hasActiveFilters = Boolean(statusFilter !== 'all' || searchQuery.trim() !== '');

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* 1. View Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[rgba(52,199,89,0.12)] text-[#34C759] font-mono">
              Crowdsourcing Queue
            </span>
            <span className="text-[12px] text-[#8E8E93] flex items-center gap-1.5 font-medium">
              <span className={`w-1.5 h-1.5 rounded-full ${pendingCount > 0 ? 'bg-[#FF9500]' : 'bg-[#34C759]'}`} />
              {pendingCount > 0 ? `${pendingCount} Submissions Awaiting Review` : `${suggestions.length} Submissions Processed`}
            </span>
          </div>

          <h1 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-black dark:text-white leading-tight">
            Service Suggestions Queue
          </h1>

          <p className="text-[13px] text-[#8E8E93] mt-0.5">
            Review crowdsourced government services submitted by citizens for directory inclusion
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={refreshList}
            disabled={isRefreshing}
            title="Refresh suggestions list"
            className="h-9 px-3.5 rounded-[10px] bg-[rgba(118,118,128,0.1)] dark:bg-[rgba(118,118,128,0.2)] hover:bg-[rgba(118,118,128,0.18)] dark:hover:bg-[rgba(118,118,128,0.3)] text-black dark:text-white text-[13px] font-medium transition-all cursor-pointer flex items-center gap-2 active:scale-95 disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 stroke-[2.2] ${isRefreshing ? 'animate-spin text-[#007AFF]' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* 2. Cohesive Cardless Inset Queue Container */}
      <div className="rounded-[16px] bg-white dark:bg-[#1C1C1E] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] overflow-hidden">
        {/* Integrated Management Toolbar (Compact & Subtle Search + Filter) */}
        <div className="p-3 sm:p-3.5 bg-black/[0.015] dark:bg-white/[0.02] space-y-2">
          {/* Search Pill Input */}
          <div className="w-full flex items-center gap-2.5 bg-[rgba(118,118,128,0.08)] dark:bg-[rgba(118,118,128,0.18)] h-9 px-3 rounded-[10px]">
            <Search className="w-4 h-4 text-[#8E8E93] shrink-0 stroke-[2.2]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search suggestion name, government agency, or details..."
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
            selectedValues={{ status: statusFilter }}
            onSelect={(_groupId, val) => setStatusFilter(val)}
            onReset={() => {
              setStatusFilter('all');
              setSearchQuery('');
            }}
            hasActiveFilters={hasActiveFilters}
            resetLabel="Reset"
          />
        </div>

        {/* Suggestions Queue List */}
        {filteredSuggestions.length === 0 ? (
          <div className="p-10 text-center text-[13px] text-[#8E8E93] space-y-2">
            <CheckCircle2 className="w-8 h-8 mx-auto text-[#34C759]" />
            <p className="font-semibold text-black dark:text-white">No suggestions found in this view</p>
            <p className="text-[12px]">Citizen submissions will appear here for administrative verification.</p>
          </div>
        ) : (
          filteredSuggestions.map(sug => (
            <div
              key={sug.id}
              className="p-4 sm:p-4.5 hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-[14px] text-black dark:text-white leading-tight">
                    {sug.serviceName}
                  </h3>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#007AFF]">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{sug.agencyName}</span>
                  </span>
                </div>

                <div>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                      sug.status === 'approved'
                        ? 'bg-[rgba(52,199,89,0.12)] text-[#34C759]'
                        : sug.status === 'pending'
                        ? 'bg-[rgba(255,149,0,0.12)] text-[#FF9500]'
                        : 'bg-[rgba(255,59,48,0.12)] text-[#FF3B30]'
                    }`}
                  >
                    {sug.status}
                  </span>
                </div>
              </div>

              <p className="text-[13px] text-[#8E8E93] leading-relaxed">
                {sug.description}
              </p>

              {sug.sourceUrl && (
                <div className="text-[12px]">
                  <a
                    href={sug.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#007AFF] hover:underline inline-flex items-center gap-1 font-medium"
                  >
                    <span>Suggested URL: {sug.sourceUrl}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[12px] text-[#8E8E93]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#8E8E93]" />
                    <span>Submitted: {sug.submittedAt}</span>
                  </span>
                  {sug.submittedBy && (
                    <span>By: {sug.submittedBy}</span>
                  )}
                </div>

                <div className="flex items-center gap-2 justify-end">
                  {sug.status !== 'approved' && (
                    <button
                      type="button"
                      onClick={() => handleApproveAndPromote(sug)}
                      className="h-7 px-3 rounded-[8px] bg-[#34C759] hover:bg-emerald-600 active:scale-[0.98] text-white text-[12px] font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Approve & Promote</span>
                    </button>
                  )}
                  {sug.status !== 'rejected' && (
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(sug.id, 'rejected', sug.serviceName)}
                      className="h-7 px-2.5 rounded-[8px] bg-[rgba(255,59,48,0.12)] hover:bg-[rgba(255,59,48,0.2)] text-[#FF3B30] text-[12px] font-medium transition-colors cursor-pointer"
                    >
                      Reject
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
