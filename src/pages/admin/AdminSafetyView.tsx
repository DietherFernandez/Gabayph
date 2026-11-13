import React, { useState, useMemo } from 'react';
import { EmergencyResourceItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import { InlineFilterBar, FilterGroup } from '../../components/common/InlineFilterBar';
import {
  ShieldAlert,
  Search,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Clock,
  Copy,
  RefreshCw
} from 'lucide-react';

interface AdminSafetyViewProps {
  onOpenCreate: () => void;
  onOpenEdit: (item: EmergencyResourceItem) => void;
  onDataChanged: () => void;
}

export const AdminSafetyView: React.FC<AdminSafetyViewProps> = ({
  onOpenCreate,
  onOpenEdit,
  onDataChanged
}) => {
  const { showToast } = useToast();
  const { confirmAction } = useConfirm();
  const [safety, setSafety] = useState<EmergencyResourceItem[]>(() => MockStorage.getSafety());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const refreshList = () => {
    setSafety(MockStorage.getSafety());
    onDataChanged();
  };

  const handleDelete = (id: string, title: string) => {
    confirmAction({
      title: 'Delete Safety Resource?',
      message: `Are you sure you want to permanently remove "${title}"? This cannot be undone.`,
      confirmLabel: 'Delete Hotline',
      isDestructive: true,
      onConfirm: () => {
        MockStorage.deleteItem('kaligtasan', id);
        refreshList();
        showToast(`Deleted safety resource: ${title}`, 'info');
      }
    });
  };

  const copyHotline = (number: string, title: string) => {
    navigator.clipboard.writeText(number);
    showToast(`Copied ${title} hotline (${number}) to clipboard.`, 'success');
  };

  const filterGroups: FilterGroup[] = [
    {
      id: 'type',
      label: 'Resource Type',
      options: [
        { value: 'all', label: 'All Resources' },
        { value: 'hotline', label: 'Emergency Phone Hotlines' },
        { value: 'disaster_guide', label: 'Disaster Preparedness Guides' },
        { value: 'evacuation', label: 'Evacuation Center Network' },
        { value: 'first_aid', label: 'First Aid Protocols' },
      ]
    }
  ];

  const filteredItems = useMemo(() => {
    return safety.filter(item => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.hotlineNumber && item.hotlineNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = selectedType === 'all' || item.resourceType === selectedType;

      return matchSearch && matchType;
    });
  }, [safety, searchQuery, selectedType]);

  const hasActiveFilters = Boolean(selectedType !== 'all' || searchQuery.trim() !== '');

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* 1. View Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[rgba(255,59,48,0.12)] text-[#FF3B30] font-mono">
              Emergency Directory
            </span>
            <span className="text-[12px] text-[#8E8E93] flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
              {safety.length} Verified Hotlines & Guides
            </span>
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-black dark:text-white leading-tight">
              Safety, Emergency Hotlines & Protocols
            </h1>
            <button
              type="button"
              onClick={refreshList}
              title="Refresh hotlines list"
              className="p-1 rounded-[6px] text-[#8E8E93] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:rotate-180 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          <p className="text-[13px] text-[#8E8E93] mt-0.5">
            24/7 national hotlines (911, 8888, 143), disaster preparedness guides, and evacuation procedures
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenCreate}
            className="h-9 px-3.5 rounded-[10px] bg-[#007AFF] hover:bg-blue-600 active:scale-[0.98] text-white text-[13px] font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.2]" />
            <span>Add Emergency Hotline</span>
          </button>
        </div>
      </div>

      {/* 2. Primary 24/7 National Emergency Hotline Inset Row */}
      <div className="rounded-[16px] bg-white dark:bg-[#1C1C1E] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] divide-y sm:divide-y-0 sm:divide-x divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] grid grid-cols-1 sm:grid-cols-3 overflow-hidden">
        {/* 911 National Emergency */}
        <div className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF3B30]">
              National Emergency
            </span>
            <div className="text-[26px] font-extrabold text-[#FF3B30] tracking-tight leading-tight mt-0.5">
              911
            </div>
            <span className="text-[11px] text-[#8E8E93] block">Police, Fire, Medical, Rescue</span>
          </div>
          <button
            type="button"
            onClick={() => copyHotline('911', 'National Emergency')}
            className="h-7 px-2.5 rounded-[8px] bg-[rgba(255,59,48,0.12)] hover:bg-[rgba(255,59,48,0.2)] text-[#FF3B30] text-[12px] font-semibold transition-colors cursor-pointer"
          >
            Copy
          </button>
        </div>

        {/* 8888 Citizen Hotline */}
        <div className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#007AFF]">
              Citizen Hotline
            </span>
            <div className="text-[26px] font-extrabold text-[#007AFF] tracking-tight leading-tight mt-0.5">
              8888
            </div>
            <span className="text-[11px] text-[#8E8E93] block">Presidential Complaint Hotline</span>
          </div>
          <button
            type="button"
            onClick={() => copyHotline('8888', 'Citizen Complaints')}
            className="h-7 px-2.5 rounded-[8px] bg-[rgba(0,122,255,0.12)] hover:bg-[rgba(0,122,255,0.2)] text-[#007AFF] text-[12px] font-semibold transition-colors cursor-pointer"
          >
            Copy
          </button>
        </div>

        {/* 143 Red Cross */}
        <div className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#34C759]">
              Disaster Operations
            </span>
            <div className="text-[26px] font-extrabold text-[#34C759] tracking-tight leading-tight mt-0.5">
              143
            </div>
            <span className="text-[11px] text-[#8E8E93] block">Philippine Red Cross</span>
          </div>
          <button
            type="button"
            onClick={() => copyHotline('143', 'Red Cross')}
            className="h-7 px-2.5 rounded-[8px] bg-[rgba(52,199,89,0.12)] hover:bg-[rgba(52,199,89,0.2)] text-[#34C759] text-[12px] font-semibold transition-colors cursor-pointer"
          >
            Copy
          </button>
        </div>
      </div>

      {/* 3. Cohesive Cardless Inset Table Container */}
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
              placeholder="Search hotline name, agency, or phone number..."
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
            selectedValues={{ type: selectedType }}
            onSelect={(_groupId, val) => setSelectedType(val)}
            onReset={() => {
              setSelectedType('all');
              setSearchQuery('');
            }}
            hasActiveFilters={hasActiveFilters}
            resetLabel="Reset"
          />
        </div>

        {filteredItems.length === 0 ? (
          <div className="p-10 text-center text-[13px] text-[#8E8E93] space-y-2">
            <ShieldAlert className="w-8 h-8 mx-auto text-[#8E8E93]/60" />
            <p className="font-semibold text-black dark:text-white">No safety resources found</p>
            <p className="text-[12px]">Try modifying your search or resetting filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-black/[0.02] dark:bg-white/[0.03] text-[#8E8E93] uppercase text-[11px] font-semibold tracking-wider border-b border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)]">
                <tr>
                  <th className="p-3.5">Resource Details</th>
                  <th className="p-3.5">Agency</th>
                  <th className="p-3.5">Contact Number</th>
                  <th className="p-3.5">Operating Hours & Area</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] text-[13px]">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                    <td className="p-3.5 max-w-sm">
                      <div className="font-semibold text-black dark:text-white leading-tight">
                        {item.title}
                      </div>
                      <p className="text-[12px] text-[#8E8E93] line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                      <span className="inline-block text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/70 mt-1.5">
                        {item.resourceType?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-semibold text-[#007AFF]">
                        {item.agencyAcronym || item.agency}
                      </span>
                      <p className="text-[11px] text-[#8E8E93] max-w-[160px] truncate mt-0.5">
                        {item.agency}
                      </p>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      {item.hotlineNumber ? (
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-[#FF3B30] text-[14px]">
                            {item.hotlineNumber}
                          </span>
                          <button
                            type="button"
                            onClick={() => copyHotline(item.hotlineNumber!, item.title)}
                            className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded text-[#8E8E93] hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                            title="Copy number"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[#8E8E93] text-[12px]">Direct Guide</span>
                      )}
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1 font-medium text-black dark:text-white">
                        <Clock className="w-3.5 h-3.5 text-[#8E8E93]" />
                        <span>{item.operatingHours}</span>
                      </div>
                      <span className="text-[11px] text-[#8E8E93] block mt-0.5">
                        {item.coverage}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {item.officialUrl && (
                          <a
                            href={item.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            title="Open official agency hotline portal"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => onOpenEdit(item)}
                          className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                          title="Edit safety resource"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#FF3B30] hover:bg-[rgba(255,59,48,0.1)] transition-colors cursor-pointer"
                          title="Delete resource"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
