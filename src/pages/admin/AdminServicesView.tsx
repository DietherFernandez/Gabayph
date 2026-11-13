import React, { useState, useMemo } from 'react';
import { ServiceItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import { InlineFilterBar, FilterGroup } from '../../components/common/InlineFilterBar';
import {
  FileText,
  Search,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  Globe
} from 'lucide-react';

interface AdminServicesViewProps {
  onOpenCreate: () => void;
  onOpenEdit: (item: ServiceItem) => void;
  onDataChanged: () => void;
}

export const AdminServicesView: React.FC<AdminServicesViewProps> = ({
  onOpenCreate,
  onOpenEdit,
  onDataChanged
}) => {
  const { showToast } = useToast();
  const { confirmAction } = useConfirm();
  const [services, setServices] = useState<ServiceItem[]>(() => MockStorage.getServices());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedFee, setSelectedFee] = useState<string>('all');

  const refreshList = () => {
    setServices(MockStorage.getServices());
    onDataChanged();
  };

  const handleDelete = (id: string, title: string) => {
    confirmAction({
      title: 'Delete Public Service?',
      message: `Are you sure you want to permanently remove "${title}" from the public services directory?`,
      confirmLabel: 'Delete Service',
      isDestructive: true,
      onConfirm: () => {
        MockStorage.deleteItem('serbisyo', id);
        refreshList();
        showToast(`Deleted service record: ${title}`, 'info');
      }
    });
  };

  const filterGroups: FilterGroup[] = [
    {
      id: 'type',
      label: 'Service Type',
      options: [
        { value: 'all', label: 'All Service Types' },
        { value: 'identity', label: 'Identity & Civil Registry' },
        { value: 'clearance', label: 'Clearances & Permits' },
        { value: 'business', label: 'Business & Licensing' },
        { value: 'social_welfare', label: 'Social Welfare' },
        { value: 'health', label: 'Health & Medical' },
      ]
    },
    {
      id: 'fee',
      label: 'Fee Schedule',
      options: [
        { value: 'all', label: 'All Fee Schedules' },
        { value: 'free', label: 'Free Only (₱0)' },
        { value: 'paid', label: 'Processing Fee Required' },
      ]
    }
  ];

  const filteredServices = useMemo(() => {
    return services.filter(srv => {
      const matchSearch =
        srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (srv.agencyAcronym && srv.agencyAcronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
        srv.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = selectedType === 'all' || srv.serviceType === selectedType;
      const isFree = srv.fees.toLowerCase().includes('free') || srv.fees.toLowerCase().includes('libre') || srv.fees.includes('₱0');
      const matchFee =
        selectedFee === 'all'
          ? true
          : selectedFee === 'free'
          ? isFree
          : !isFree;

      return matchSearch && matchType && matchFee;
    });
  }, [services, searchQuery, selectedType, selectedFee]);

  const hasActiveFilters = Boolean(selectedType !== 'all' || selectedFee !== 'all' || searchQuery.trim() !== '');

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* 1. View Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[rgba(0,122,255,0.12)] text-[#007AFF] font-mono">
              Directory Management
            </span>
            <span className="text-[12px] text-[#8E8E93] flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
              {services.length} Verified Records
            </span>
          </div>

          <div className="flex items-center gap-2">
            <h1 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-black dark:text-white leading-tight">
              Public Services Directory
            </h1>
            <button
              type="button"
              onClick={refreshList}
              title="Refresh records list"
              className="p-1 rounded-[6px] text-[#8E8E93] hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 active:rotate-180 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          <p className="text-[13px] text-[#8E8E93] mt-0.5">
            Citizen's Charter procedures, requirements, fees, and official agency portals
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenCreate}
            className="h-9 px-3.5 rounded-[10px] bg-[#007AFF] hover:bg-blue-600 active:scale-[0.98] text-white text-[13px] font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.2]" />
            <span>Add Public Service</span>
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
              placeholder="Search service title, government agency, or keyword..."
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
            selectedValues={{ type: selectedType, fee: selectedFee }}
            onSelect={(groupId, val) => {
              if (groupId === 'type') setSelectedType(val);
              if (groupId === 'fee') setSelectedFee(val);
            }}
            onReset={() => {
              setSelectedType('all');
              setSelectedFee('all');
              setSearchQuery('');
            }}
            hasActiveFilters={hasActiveFilters}
            resetLabel="Reset"
          />
        </div>

        {filteredServices.length === 0 ? (
          <div className="p-10 text-center text-[13px] text-[#8E8E93] space-y-2">
            <FileText className="w-8 h-8 mx-auto text-[#8E8E93]/60" />
            <p className="font-semibold text-black dark:text-white">No matching services found</p>
            <p className="text-[12px]">Try modifying your search term or clearing the type filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-black/[0.02] dark:bg-white/[0.03] text-[#8E8E93] uppercase text-[11px] font-semibold tracking-wider border-b border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)]">
                <tr>
                  <th className="p-3.5">Service Details</th>
                  <th className="p-3.5">Agency</th>
                  <th className="p-3.5">Fees & Turnaround</th>
                  <th className="p-3.5">Charter Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] text-[13px]">
                {filteredServices.map(srv => (
                  <tr key={srv.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                    <td className="p-3.5 max-w-sm">
                      <div className="font-semibold text-black dark:text-white leading-tight">
                        {srv.title}
                      </div>
                      <p className="text-[12px] text-[#8E8E93] line-clamp-1 mt-0.5">
                        {srv.description}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/70">
                          {srv.serviceType?.replace('_', ' ')}
                        </span>
                        {srv.onlineServiceAvailable && (
                          <span className="text-[10px] font-bold text-[#34C759] flex items-center gap-0.5">
                            <Globe className="w-2.5 h-2.5" /> Online Portal
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-semibold text-[#007AFF]">
                        {srv.agencyAcronym || srv.agency}
                      </span>
                      <p className="text-[11px] text-[#8E8E93] max-w-[160px] truncate mt-0.5">
                        {srv.agency}
                      </p>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-medium text-black dark:text-white">
                        {srv.fees}
                      </div>
                      <div className="text-[11px] text-[#8E8E93] mt-0.5">
                        {srv.processingTime}
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="text-[#34C759] font-medium text-[12px] flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified</span>
                      </span>
                      <span className="text-[11px] text-[#8E8E93] block mt-0.5">
                        {srv.lastVerified}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {srv.officialUrl && (
                          <a
                            href={srv.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            title="Open official agency portal"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => onOpenEdit(srv)}
                          className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                          title="Edit service record"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(srv.id, srv.title)}
                          className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#FF3B30] hover:bg-[rgba(255,59,48,0.1)] transition-colors cursor-pointer"
                          title="Delete service record"
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
