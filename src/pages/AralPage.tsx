import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import { GraduationCap, Bookmark } from 'lucide-react';
import { SearchField, Select } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { GroupedList, GroupedListItem } from '../components/common/GroupedList';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../context/ToastContext';

export const AralPage: React.FC = () => {
  const { navigate, isSaved, toggleSave } = useApp();
  const { showToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const educationList = useMemo(() => MockStorage.getEducation(), []);

  const filteredList = useMemo(() => {
    return educationList.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.agencyAcronym && item.agencyAcronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel = levelFilter === 'all' || item.educationalLevel === levelFilter || item.educationalLevel === 'all';
      const matchesType = typeFilter === 'all' || item.educationType === typeFilter;

      return matchesSearch && matchesLevel && matchesType;
    });
  }, [educationList, searchQuery, levelFilter, typeFilter]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
          <GraduationCap className="w-4 h-4" />
          <span>Direktoryo ng Edukasyon at Iskolarship</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-ios-lightText dark:text-ios-darkText tracking-tight">
          ARAL: Mga Iskolarship, TVET, at Libreng Pagsasanay
        </h1>
        <p className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted mt-1 max-w-2xl">
          Tuklasin ang mga opisyal na scholarship mula sa DOST-SEI, CHED Tulong Dunong, libreng kurso sa TESDA, at digital upskilling programs ng DICT para sa mga mag-aaral at manggagawang Pilipino.
        </p>

        {/* Search & Filters */}
        <div className="mt-4 pt-4 border-t border-ios-lightBorder/80 dark:border-ios-darkBorder/80 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6">
            <SearchField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Maghanap ng scholarship o ahensya (hal. DOST, CHED, TESDA)..."
            />
          </div>
          <div className="sm:col-span-3">
            <Select
              value={levelFilter}
              onChange={e => setLevelFilter(e.target.value)}
              options={[
                { value: 'all', label: 'Lahat ng Antas ng Pag-aaral' },
                { value: 'tertiary', label: 'Kolehiyo (Tertiary / BS)' },
                { value: 'vocational', label: 'Bokasyonal (TVET)' },
                { value: 'secondary', label: 'Senior High School' }
              ]}
            />
          </div>
          <div className="sm:col-span-3">
            <Select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              options={[
                { value: 'all', label: 'Lahat ng Uri' },
                { value: 'scholarship', label: 'Scholarship Grants' },
                { value: 'tvet', label: 'Free Technical TVET' },
                { value: 'free_course', label: 'Libreng Online Courses' }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Grouped List */}
      <div>
        {filteredList.length > 0 ? (
          <GroupedList
            title={`Mga Oportunidad sa Edukasyon (${filteredList.length})`}
            subtitle="Pindutin ang scholarship para makita ang mga buwanang benepisyo, allowance, at checklist"
          >
            {filteredList.map(item => {
              const saved = isSaved(item.id);
              return (
                <GroupedListItem
                  key={item.id}
                  onClick={() => navigate(`/item/${item.id}`)}
                  leadingIcon={<GraduationCap className="w-4 h-4" />}
                  title={
                    <div className="flex items-center gap-2 flex-wrap">
                      <span>{item.title}</span>
                      <Badge category="aral" size="sm">
                        {item.educationalLevel}
                      </Badge>
                      <span className="text-[10px] text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/40 px-1.5 py-0.2 rounded font-medium">
                        {item.educationType}
                      </span>
                    </div>
                  }
                  subtitle={`${item.agency} (${item.agencyAcronym})`}
                  metadata={
                    <>
                      <span className="text-red-600 dark:text-red-400 font-semibold">
                        Deadline: {item.deadline}
                      </span>
                      <span>•</span>
                      <span className="truncate max-w-[280px]">
                        {item.benefits[0]}
                      </span>
                    </>
                  }
                  trailing={
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        const state = toggleSave(item.id);
                        showToast(state ? 'Nai-save ang scholarship!' : 'Inalis sa talaan.', 'info');
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        saved
                          ? 'text-ios-navy dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40'
                          : 'text-ios-lightMuted hover:text-ios-lightText'
                      }`}
                      aria-label="Bookmark scholarship"
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
            icon={<GraduationCap className="w-8 h-8" />}
            title="Walang Nahanap na Iskolarship"
            description={`Walang nahanap na programa para sa iyong paghahanap na "${searchQuery}".`}
            actionLabel="I-reset ang Paghahanap"
            onAction={() => {
              setSearchQuery('');
              setLevelFilter('all');
              setTypeFilter('all');
            }}
          />
        )}
      </div>
    </div>
  );
};
