import React, { useState, useMemo } from 'react';
import { JobItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import { InlineFilterBar, FilterGroup } from '../../components/common/InlineFilterBar';
import {
  Briefcase,
  Search,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  MapPin,
  Calendar,
  Users,
  RefreshCw
} from 'lucide-react';

interface AdminJobsViewProps {
  onOpenCreate: () => void;
  onOpenEdit: (item: JobItem) => void;
  onDataChanged: () => void;
}

export const AdminJobsView: React.FC<AdminJobsViewProps> = ({
  onOpenCreate,
  onOpenEdit,
  onDataChanged
}) => {
  const { showToast } = useToast();
  const { confirmAction } = useConfirm();
  const [jobs, setJobs] = useState<JobItem[]>(() => MockStorage.getJobs());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshList = () => {
    setIsRefreshing(true);
    setJobs(MockStorage.getJobs());
    onDataChanged();
    window.dispatchEvent(new CustomEvent('gabayph_data_updated'));
    showToast('Careers & job postings refreshed.', 'info');
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleDelete = (id: string, title: string) => {
    confirmAction({
      title: 'Delete Job Posting?',
      message: `Are you sure you want to permanently delete "${title}"? This cannot be undone.`,
      confirmLabel: 'Delete Job',
      isDestructive: true,
      onConfirm: () => {
        MockStorage.deleteItem('trabaho', id);
        refreshList();
        showToast(`Deleted job posting: ${title}`, 'info');
      }
    });
  };

  const filterGroups: FilterGroup[] = [
    {
      id: 'type',
      label: 'Employment',
      options: [
        { value: 'all', label: 'All Employment' },
        { value: 'government', label: 'Government / Plantilla' },
        { value: 'full-time', label: 'Full-Time' },
        { value: 'contractual', label: 'Contract of Service (COS)' },
      ]
    },
    {
      id: 'sector',
      label: 'Sector',
      options: [
        { value: 'all', label: 'All Sectors' },
        { value: 'public', label: 'Public / Government' },
        { value: 'ngo', label: 'NGO / Development' },
        { value: 'private', label: 'Private Partnership' },
      ]
    }
  ];

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.agencyAcronym && job.agencyAcronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = selectedType === 'all' || job.employmentType === selectedType;
      const matchSector = selectedSector === 'all' || job.sector === selectedSector;

      return matchSearch && matchType && matchSector;
    });
  }, [jobs, searchQuery, selectedType, selectedSector]);

  const hasActiveFilters = Boolean(selectedType !== 'all' || selectedSector !== 'all' || searchQuery.trim() !== '');

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
              {jobs.length} Active Positions
            </span>
          </div>

          <h1 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-black dark:text-white leading-tight">
            Careers & Job Postings
          </h1>

          <p className="text-[13px] text-[#8E8E93] mt-0.5">
            Civil Service notices, agency career openings, and government plantilla vacancies
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={refreshList}
            disabled={isRefreshing}
            title="Refresh positions list"
            className="h-9 px-3.5 rounded-[10px] bg-[rgba(118,118,128,0.1)] dark:bg-[rgba(118,118,128,0.2)] hover:bg-[rgba(118,118,128,0.18)] dark:hover:bg-[rgba(118,118,128,0.3)] text-black dark:text-white text-[13px] font-medium transition-all cursor-pointer flex items-center gap-2 active:scale-95 disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 stroke-[2.2] ${isRefreshing ? 'animate-spin text-[#007AFF]' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            type="button"
            onClick={onOpenCreate}
            className="h-9 px-3.5 rounded-[10px] bg-[#007AFF] hover:bg-blue-600 active:scale-[0.98] text-white text-[13px] font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.2]" />
            <span>Post New Job</span>
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
              placeholder="Search job titles, agencies, or duty locations..."
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
            selectedValues={{ type: selectedType, sector: selectedSector }}
            onSelect={(groupId, val) => {
              if (groupId === 'type') setSelectedType(val);
              if (groupId === 'sector') setSelectedSector(val);
            }}
            onReset={() => {
              setSelectedType('all');
              setSelectedSector('all');
              setSearchQuery('');
            }}
            hasActiveFilters={hasActiveFilters}
            resetLabel="Reset"
          />
        </div>

        {filteredJobs.length === 0 ? (
          <div className="p-10 text-center text-[13px] text-[#8E8E93] space-y-2">
            <Briefcase className="w-8 h-8 mx-auto text-[#8E8E93]/60" />
            <p className="font-semibold text-black dark:text-white">No matching career openings</p>
            <p className="text-[12px]">Try modifying your search criteria or changing filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-black/[0.02] dark:bg-white/[0.03] text-[#8E8E93] uppercase text-[11px] font-semibold tracking-wider border-b border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)]">
                <tr>
                  <th className="p-3.5">Position & Station</th>
                  <th className="p-3.5">Agency</th>
                  <th className="p-3.5">Compensation</th>
                  <th className="p-3.5">Application Window</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] text-[13px]">
                {filteredJobs.map(job => (
                  <tr key={job.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                    <td className="p-3.5 max-w-sm">
                      <div className="font-semibold text-black dark:text-white leading-tight">
                        {job.title}
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] text-[#8E8E93] mt-1 flex-wrap">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#8E8E93]" />
                          {job.location}
                        </span>
                        <span>•</span>
                        <span className="capitalize">{job.employmentType}</span>
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-semibold text-[#007AFF]">
                        {job.agencyAcronym || job.agency}
                      </span>
                      <p className="text-[11px] text-[#8E8E93] max-w-[160px] truncate mt-0.5">
                        {job.agency}
                      </p>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-medium text-black dark:text-white">
                        {job.salaryRange.split('(')[0].trim()}
                      </div>
                      <span className="text-[11px] text-[#8E8E93] block mt-0.5">
                        Monthly Base Pay
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-[#FF3B30] font-medium text-[12px]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{job.deadline}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#8E8E93] mt-0.5">
                        <Users className="w-3 h-3" />
                        <span>{job.vacancies} slot{job.vacancies > 1 ? 's' : ''} available</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {job.officialUrl && (
                          <a
                            href={job.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            title="View official job bulletin"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => onOpenEdit(job)}
                          className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                          title="Edit position"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(job.id, job.title)}
                          className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#FF3B30] hover:bg-[rgba(255,59,48,0.1)] transition-colors cursor-pointer"
                          title="Delete position"
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
