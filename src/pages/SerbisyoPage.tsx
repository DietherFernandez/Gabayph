import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import { FileText, Bookmark, Clock } from 'lucide-react';
import { SearchField, Select } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { GroupedList, GroupedListItem } from '../components/common/GroupedList';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../context/ToastContext';

export const SerbisyoPage: React.FC = () => {
  const { navigate, isSaved, toggleSave } = useApp();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<string>('all');
  const [feeFilter, setFeeFilter] = useState<'all' | 'free' | 'paid'>('all');

  const services = useMemo(() => MockStorage.getServices(), []);

  const filteredServices = useMemo(() => {
    return services.filter(srv => {
      const matchesSearch =
        srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (srv.agencyAcronym && srv.agencyAcronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
        srv.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesType = activeType === 'all' || srv.serviceType === activeType;

      const matchesFee =
        feeFilter === 'all'
          ? true
          : feeFilter === 'free'
          ? srv.fees.toLowerCase().includes('free') || srv.fees.includes('₱0')
          : !srv.fees.toLowerCase().includes('free');

      return matchesSearch && matchesType && matchesFee;
    });
  }, [services, searchQuery, activeType, feeFilter]);

  const typeOptions = [
    { value: 'all', label: 'All Services' },
    { value: 'identity', label: 'Government IDs' },
    { value: 'civil_registry', label: 'Civil Registry' },
    { value: 'clearance', label: 'Clearances' },
    { value: 'business', label: 'Business & Trade' },
    { value: 'health', label: 'Health & Medical' },
    { value: 'social_welfare', label: 'Social Welfare' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Editorial Category Header */}
      <div className="px-1 pt-1">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
          <FileText className="w-4 h-4" />
          <span>Government Services Directory</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-ios-lightText dark:text-ios-darkText tracking-tight">
          SERBISYO: Government IDs, Documents & Clearances
        </h1>
        <p className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted mt-1 max-w-2xl leading-relaxed">
          Comprehensive guides to required documents, application steps, fee schedules, and official portals for the Philippine National ID, Passport, NBI, SSS, LTO, and civil registry.
        </p>

        {/* Search & Filters */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8">
            <SearchField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search services or agencies (e.g. PSA, Passport, LTO, Driver's License)..."
            />
          </div>
          <div className="sm:col-span-4">
            <Select
              value={feeFilter}
              onChange={e => setFeeFilter(e.target.value as any)}
              options={[
                { value: 'all', label: 'All Fee Schedules' },
                { value: 'free', label: 'Free Services Only' },
                { value: 'paid', label: 'Standard Fees Only' }
              ]}
            />
          </div>
        </div>

        {/* Sub-category tabs */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {typeOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => setActiveType(opt.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeType === opt.value
                  ? 'bg-ios-navy text-white font-semibold shadow-sm'
                  : 'bg-white dark:bg-ios-darkSurface border border-ios-lightBorder/80 dark:border-ios-darkBorder text-ios-lightMuted hover:text-ios-lightText'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services List */}
      <div>
        {filteredServices.length > 0 ? (
          <GroupedList
            title={`Matching Services (${filteredServices.length})`}
            subtitle="Click a service to view the complete checklist of documentary requirements and application steps"
          >
            {filteredServices.map(srv => {
              const saved = isSaved(srv.id);
              return (
                <GroupedListItem
                  key={srv.id}
                  onClick={() => navigate(`/item/${srv.id}`)}
                  leadingIcon={<FileText className="w-4 h-4" />}
                  title={
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>{srv.title}</span>
                      <Badge category="serbisyo" size="sm">
                        {srv.serviceType}
                      </Badge>
                      {srv.onlineServiceAvailable && (
                        <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-900">
                          Online Portal Available
                        </span>
                      )}
                    </div>
                  }
                  subtitle={`${srv.agency} (${srv.agencyAcronym}) • ${srv.fees}`}
                  metadata={
                    <>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {srv.processingTime.split(';')[0]}
                      </span>
                      <span>•</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        Verified: {srv.lastVerified}
                      </span>
                    </>
                  }
                  trailing={
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        const state = toggleSave(srv.id);
                        showToast(state ? 'Saved to bookmarks!' : 'Removed from bookmarks.', 'info');
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        saved
                          ? 'text-ios-navy dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                          : 'text-ios-lightMuted hover:text-ios-lightText'
                      }`}
                      aria-label="Bookmark service"
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
            icon={<FileText className="w-8 h-8" />}
            title="No Services Found"
            description={`No government services matched your active filters or search query "${searchQuery}".`}
            actionLabel="Reset All Filters"
            onAction={() => {
              setSearchQuery('');
              setActiveType('all');
              setFeeFilter('all');
            }}
          />
        )}
      </div>
    </div>
  );
};
