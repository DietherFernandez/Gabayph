import React, { useState, useMemo } from 'react';
import { MockStorage } from '../data/mockStorage';
import { AlertCircle, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { SearchField, Select } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';

export const AnnouncementsPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const announcements = useMemo(() => MockStorage.getAnnouncements(), []);

  const filtered = useMemo(() => {
    return announcements.filter(anc => {
      const matchesSearch =
        anc.title.toLowerCase().includes(query.toLowerCase()) ||
        anc.summary.toLowerCase().includes(query.toLowerCase()) ||
        anc.content.toLowerCase().includes(query.toLowerCase()) ||
        anc.sourceAgency.toLowerCase().includes(query.toLowerCase());

      const matchesCat = filterCategory === 'all' || anc.category === filterCategory;

      return matchesSearch && matchesCat;
    });
  }, [announcements, query, filterCategory]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ios-navy dark:text-blue-400 mb-1">
          <AlertCircle className="w-4 h-4" />
          <span>Opisyal na Bulletin ng Pamahalaan</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-ios-lightText dark:text-ios-darkText tracking-tight">
          Mga Anunsyo, Alerto, at Pampublikong Payo
        </h1>
        <p className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted mt-1 max-w-2xl">
          Opisyal na balita mula sa Malacañang, DTI, DOH, DOST, LTO, at iba pang pangunahing ahensya ukol sa holidays, price freezes, at kaligtasan.
        </p>

        {/* Filters */}
        <div className="mt-4 pt-4 border-t border-ios-lightBorder/80 dark:border-ios-darkBorder/80 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8">
            <SearchField
              value={query}
              onChange={setQuery}
              placeholder="Maghanap sa mga anunsyo o ahensya..."
            />
          </div>
          <div className="sm:col-span-4">
            <Select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              options={[
                { value: 'all', label: 'Lahat ng Kategorya' },
                { value: 'pera', label: 'Ekonomiya at Presyo' },
                { value: 'serbisyo', label: 'Serbisyo at Lisensya' },
                { value: 'aral', label: 'Edukasyon at Scholarship' },
                { value: 'kaligtasan', label: 'Kaligtasan at Kalusugan' }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map(anc => (
            <article
              key={anc.id}
              className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm transition-all"
            >
              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                <div className="flex items-center gap-2">
                  {anc.urgent && <Badge variant="urgent">URGENT ADVISORY</Badge>}
                  <span className="text-xs font-bold text-ios-navy dark:text-blue-400">
                    {anc.sourceAgency} ({anc.agencyAcronym})
                  </span>
                </div>
                <span className="text-xs text-ios-lightMuted dark:text-ios-darkMuted flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {anc.datePublished}
                </span>
              </div>

              <h2 className="text-base font-bold text-ios-lightText dark:text-ios-darkText mb-2">
                {anc.title}
              </h2>

              <p className="text-xs sm:text-sm font-medium text-ios-lightText/90 dark:text-ios-darkText/90 mb-3 bg-ios-lightSecondary/60 dark:bg-ios-darkSecondary/60 p-3 rounded-ios-lg">
                {anc.summary}
              </p>

              <p className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted leading-relaxed mb-4">
                {anc.content}
              </p>

              {anc.affectedAreas && (
                <div className="flex items-center gap-2 text-xs text-ios-lightMuted dark:text-ios-darkMuted mb-3">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>Apektadong Lugar: <strong>{anc.affectedAreas.join(', ')}</strong></span>
                </div>
              )}

              {anc.relatedLink && (
                <div className="pt-3 border-t border-ios-lightBorder/80 dark:border-ios-darkBorder/80 flex justify-end">
                  <a
                    href={anc.relatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-ios-navy dark:text-blue-400 hover:underline"
                  >
                    Basahin sa Opisyal na Website <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </article>
          ))
        ) : (
          <EmptyState
            icon={<AlertCircle className="w-8 h-8" />}
            title="Walang Nahanap na Anunsyo"
            description={`Walang tumugmang anunsyo para sa iyong filter na "${query}".`}
            actionLabel="I-clear ang Filter"
            onAction={() => {
              setQuery('');
              setFilterCategory('all');
            }}
          />
        )}
      </div>
    </div>
  );
};
