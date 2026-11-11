import React, { useState, useMemo } from 'react';
import { JobItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
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
import { Button } from '../../components/common/Button';

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
  const [jobs, setJobs] = useState<JobItem[]>(() => MockStorage.getJobs());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');

  const refreshList = () => {
    setJobs(MockStorage.getJobs());
    onDataChanged();
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the job posting "${title}"?`)) {
      MockStorage.deleteItem('trabaho', id);
      refreshList();
      showToast(`Deleted job posting: ${title}`, 'info');
    }
  };

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

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-ios-lightText dark:text-ios-darkText">
              Careers & Jobs Directory Management
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold">
              {jobs.length} positions
            </span>
          </div>
          <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-0.5">
            Manage Civil Service Commission notices, agency career openings, and government plantilla vacancies.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" variant="outline" onClick={refreshList} title="Refresh records list">
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
          <Button size="sm" variant="primary" onClick={onOpenCreate} className="font-bold">
            <Plus className="w-3.5 h-3.5" />
            <span>Post New Job</span>
          </Button>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="p-3.5 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-ios-lightMuted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search position title, agency, or duty location..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-ios-lg bg-slate-50 dark:bg-slate-800 border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightText dark:text-ios-darkText focus:outline-none focus:ring-2 focus:ring-ios-navy"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="flex-1 md:flex-initial px-2.5 py-1.5 rounded-ios-lg bg-slate-50 dark:bg-slate-800 border border-ios-lightBorder dark:border-ios-darkBorder text-xs text-ios-lightText dark:text-ios-darkText font-medium focus:outline-none"
          >
            <option value="all">All Employment Types</option>
            <option value="government">Government / Plantilla</option>
            <option value="full-time">Full-Time</option>
            <option value="contractual">Contract of Service (COS)</option>
          </select>

          <select
            value={selectedSector}
            onChange={e => setSelectedSector(e.target.value)}
            className="flex-1 md:flex-initial px-2.5 py-1.5 rounded-ios-lg bg-slate-50 dark:bg-slate-800 border border-ios-lightBorder dark:border-ios-darkBorder text-xs text-ios-lightText dark:text-ios-darkText font-medium focus:outline-none"
          >
            <option value="all">All Sectors</option>
            <option value="public">Public / Government</option>
            <option value="ngo">NGO / Development</option>
            <option value="private">Private Partnership</option>
          </select>
        </div>
      </div>

      {/* Jobs Records Table */}
      <div className="rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm overflow-hidden">
        {filteredJobs.length === 0 ? (
          <div className="p-8 text-center text-xs text-ios-lightMuted space-y-2">
            <Briefcase className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
            <p className="font-semibold text-ios-lightText dark:text-ios-darkText">No matching career openings</p>
            <p>Try modifying your search criteria or changing filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-ios-lightMuted uppercase text-[10px] font-bold border-b border-ios-lightBorder dark:border-ios-darkBorder">
                <tr>
                  <th className="p-3.5">Position Title & Station</th>
                  <th className="p-3.5">Agency</th>
                  <th className="p-3.5">Compensation Schedule</th>
                  <th className="p-3.5">Deadline & Vacancies</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ios-lightBorder dark:divide-ios-darkBorder">
                {filteredJobs.map(job => (
                  <tr key={job.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 max-w-sm">
                      <div className="font-bold text-ios-lightText dark:text-ios-darkText">
                        {job.title}
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-ios-lightMuted mt-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{job.location}</span>
                        <span>•</span>
                        <span className="capitalize">{job.employmentType}</span>
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-semibold text-ios-navy dark:text-blue-400">
                        {job.agencyAcronym || job.agency}
                      </span>
                      <p className="text-[10px] text-ios-lightMuted max-w-[150px] truncate">
                        {job.agency}
                      </p>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-bold text-ios-navy dark:text-blue-400">
                        {job.salaryRange.split('(')[0]}
                      </span>
                      <span className="text-[10px] text-ios-lightMuted block">
                        Monthly Base Pay
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-semibold">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{job.deadline}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-ios-lightMuted mt-0.5">
                        <Users className="w-3 h-3" />
                        <span>{job.vacancies} slot{job.vacancies > 1 ? 's' : ''} available</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap space-x-1">
                      {job.officialUrl && (
                        <a
                          href={job.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block p-1.5 text-ios-lightMuted hover:text-ios-navy rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="View official job bulletin"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => onOpenEdit(job)}
                        className="p-1.5 text-ios-lightMuted hover:text-ios-navy dark:hover:text-blue-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit position"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id, job.title)}
                        className="p-1.5 text-ios-lightMuted hover:text-red-500 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Delete position"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
