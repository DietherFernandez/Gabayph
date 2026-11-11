import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import { CategoryType } from '../types';
import { Bookmark, Trash2, Layers } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { GroupedList, GroupedListItem } from '../components/common/GroupedList';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../context/ToastContext';

export const SavedItemsPage: React.FC = () => {
  const { savedIds, toggleSave, navigate } = useApp();
  const { showToast } = useToast();

  const [activeCategory, setActiveCategory] = useState<CategoryType | 'all'>('all');

  const savedItems = useMemo(() => {
    const all = MockStorage.getAllItems();
    return all.filter(item => savedIds.includes(item.id));
  }, [savedIds]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return savedItems;
    return savedItems.filter(item => item.category === activeCategory);
  }, [savedItems, activeCategory]);

  const handleClearAll = () => {
    if (window.confirm('Sigurado ka bang nais mong alisin ang lahat ng nai-save na serbisyo?')) {
      MockStorage.clearAllSavedItems();
      showToast('Inalis ang lahat ng naka-save na serbisyo.', 'info');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-5 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ios-navy dark:text-blue-400 mb-1">
            <Bookmark className="w-4 h-4 fill-current" />
            <span>Iyong Personal na Talaan</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-ios-lightText dark:text-ios-darkText tracking-tight">
            Nai-save na mga Serbisyo at Oportunidad
          </h1>
          <p className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted mt-0.5">
            Lokal na nakaimbak ang iyong mga piniling ID, trabaho, at tulong pinansyal para sa mabilisang pag-access.
          </p>
        </div>

        {savedItems.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900 shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" /> Alisin Lahat
          </Button>
        )}
      </div>

      {/* Category Filter Pills */}
      {savedItems.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {(['all', 'serbisyo', 'trabaho', 'pera', 'bayanihan', 'aral', 'kaligtasan'] as const).map(cat => {
            const count = cat === 'all' ? savedItems.length : savedItems.filter(i => i.category === cat).length;
            if (cat !== 'all' && count === 0) return null;

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeCategory === cat
                    ? 'bg-ios-navy text-white font-semibold shadow-sm'
                    : 'bg-ios-lightSurface dark:bg-ios-darkSurface text-ios-lightMuted border border-ios-lightBorder dark:border-ios-darkBorder hover:text-ios-lightText'
                }`}
              >
                <span className="capitalize">{cat === 'all' ? 'Lahat' : cat}</span>
                <span className="text-[10px] opacity-80 px-1 rounded-full bg-black/10 dark:bg-white/10">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Saved List */}
      <div>
        {filteredItems.length > 0 ? (
          <GroupedList
            title={`Nai-save na mga Tala (${filteredItems.length})`}
            subtitle="Pindutin para mabasa ang buong impormasyon o tanggalin gamit ang basurahan"
          >
            {filteredItems.map(item => (
              <GroupedListItem
                key={item.id}
                onClick={() => navigate(`/item/${item.id}`)}
                leadingIcon={<Layers className="w-4 h-4" />}
                title={
                  <div className="flex items-center gap-2 flex-wrap">
                    <span>{item.title}</span>
                    <Badge category={item.category} size="sm">
                      {item.category}
                    </Badge>
                  </div>
                }
                subtitle={`${item.agency} (${item.agencyAcronym || ''})`}
                metadata={<span className="line-clamp-1">{item.description}</span>}
                trailing={
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      toggleSave(item.id);
                      showToast('Inalis sa iyong talaan.', 'info');
                    }}
                    className="p-2 rounded-full text-ios-lightMuted hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    title="Tanggalin sa naka-save"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                }
              />
            ))}
          </GroupedList>
        ) : (
          <EmptyState
            icon={<Bookmark className="w-8 h-8" />}
            title="Walang Naka-save na Tala"
            description="I-bookmark ang mga serbisyo ng gobyerno, trabaho, o ayuda na nais mong balikan anumang oras."
            actionLabel="Maghanap sa Direktoryo"
            onAction={() => navigate('/serbisyo')}
          />
        )}
      </div>
    </div>
  );
};
