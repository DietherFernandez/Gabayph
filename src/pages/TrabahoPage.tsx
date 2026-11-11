import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import { Briefcase, Bookmark } from 'lucide-react';
import { SearchField, Select } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { GroupedList, GroupedListItem } from '../components/common/GroupedList';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../context/ToastContext';

export const TrabahoPage: React.FC = () => {
  const { navigate, isSaved, toggleSave } = useApp();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [employmentType, setEmploymentType] = useState<string>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('all');

  const jobs = useMemo(() => MockStorage.getJobs(), []);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (job.agencyAcronym && job.agencyAcronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = employmentType === 'all' || job.employmentType === employmentType;
      const matchesSector = sectorFilter === 'all' || job.sector === sectorFilter;

      return matchesSearch && matchesType && matchesSector;
    });
  }, [jobs, searchQuery, employmentType, sectorFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Editorial Category Header */}
      <div className="px-1 pt-1">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
          <Briefcase className="w-4 h-4" />
          <span>Careers & Employment Directory</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-ios-lightText dark:text-ios-darkText tracking-tight">
          TRABAHO: Government & Public Sector Careers
        </h1>
        <p className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted mt-1 max-w-2xl leading-relaxed">
          Explore verified civil service vacancies, agency plantilla postings, and partner institutional career opportunities.
        </p>

        {/* Search & Filters */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6">
            <SearchField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search job titles, agencies, or locations..."
            />
          </div>
          <div className="sm:col-span-3">
            <Select
              value={employmentType}
              onChange={e => setEmploymentType(e.target.value)}
              options={[
                { value: 'all', label: 'All Employment Types' },
                { value: 'government', label: 'Government / Plantilla' },
                { value: 'contractual', label: 'Contract of Service' },
                { value: 'full-time', label: 'Full-Time NGO/Private' }
              ]}
            />
          </div>
          <div className="sm:col-span-3">
            <Select
              value={sectorFilter}
              onChange={e => setSectorFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Sectors' },
                { value: 'public', label: 'Public Sector / Government' },
                { value: 'ngo', label: 'NGO / Humanitarian' },
                { value: 'private', label: 'Private Sector' }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Jobs Grouped List */}
      <div>
        {filteredJobs.length > 0 ? (
          <GroupedList
            title={`Open Job Positions (${filteredJobs.length})`}
            subtitle="Click a position to review qualifications, requirements, and application procedures"
          >
            {filteredJobs.map(job => {
              const saved = isSaved(job.id);
              return (
                <GroupedListItem
                  key={job.id}
                  onClick={() => navigate(`/item/${job.id}`)}
                  leadingIcon={<Briefcase className="w-4 h-4" />}
                  title={
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>{job.title}</span>
                      <Badge category="trabaho" size="sm">
                        {job.employmentType}
                      </Badge>
                      <span className="text-[10px] text-ios-lightMuted dark:text-ios-darkMuted bg-ios-lightSecondary dark:bg-ios-darkSecondary px-1.5 py-0.2 rounded">
                        {job.vacancies} {job.vacancies === 1 ? 'vacancy' : 'vacancies'}
                      </span>
                    </div>
                  }
                  subtitle={`${job.agency} (${job.agencyAcronym}) • ${job.location}`}
                  metadata={
                    <>
                      <span className="font-semibold text-ios-navy dark:text-blue-400">
                        {job.salaryRange}
                      </span>
                      <span>•</span>
                      <span className="text-red-600 dark:text-red-400 font-medium">
                        Deadline: {job.deadline}
                      </span>
                    </>
                  }
                  trailing={
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        const state = toggleSave(job.id);
                        showToast(state ? 'Saved job to your bookmarks!' : 'Removed job from bookmarks.', 'info');
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        saved
                          ? 'text-ios-navy dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                          : 'text-ios-lightMuted hover:text-ios-lightText'
                      }`}
                      aria-label="Bookmark job"
                    >
                      <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                    </button>
                  }
                />
              );
            })}
          </GroupedList>
        ) : (
          <EmptyState
            icon={<Briefcase className="w-8 h-8" />}
            title="No Job Positions Found"
            description={`No job vacancies matched your search query "${searchQuery}".`}
            actionLabel="Reset Filters"
            onAction={() => {
              setSearchQuery('');
              setEmploymentType('all');
              setSectorFilter('all');
            }}
          />
        )}
      </div>
    </div>
  );
};
