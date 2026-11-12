import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import { CategoryType } from '../types';
import { Bookmark, Lock, Layers, MinusCircle } from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { GroupedList, GroupedListItem } from '../components/common/GroupedList';
import { EmptyState } from '../components/common/EmptyState';
import { useToast } from '../context/ToastContext';
import { useConfirm } from '../context/ConfirmContext';

export const SavedItemsPage: React.FC = () => {
  const { savedIds, toggleSave, navigate } = useApp();
  const { showToast } = useToast();
  const { confirmAction } = useConfirm();

  const [activeCategory, setActiveCategory] = useState<CategoryType | 'all'>('all');
  const [isEditMode, setIsEditMode] = useState(false);

  const savedItems = useMemo(() => {
    const all = MockStorage.getAllItems();
    return all.filter(item => savedIds.includes(item.id));
  }, [savedIds]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return savedItems;
    return savedItems.filter(item => item.category === activeCategory);
  }, [savedItems, activeCategory]);

  const handleClearAll = () => {
    confirmAction({
      title: 'Remove all saved bookmarks?',
      message: 'Are you sure you want to delete all saved items from this device?',
      confirmLabel: 'Delete All',
      isDestructive: true,
      onConfirm: () => {
        MockStorage.clearAllSavedItems();
        showToast('Cleared all saved items', 'info');
        setIsEditMode(false);
      }
    });
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200 max-w-3xl mx-auto px-4 sm:px-6 pt-1">
      {/* 1. Header: Large Title + Edit Button */}
      <div className="flex items-center justify-between gap-3 pt-1">
        <div>
          <h1 className="text-[22px] sm:text-[26px] font-bold tracking-tight text-black dark:text-white leading-tight">
            Saved
          </h1>
          <p className="text-[13px] text-[#8E8E93]">
            Stored on this device only
          </p>
        </div>

        {savedItems.length > 0 && (
          <div className="flex items-center gap-2">
            {isEditMode && (
              <button
                type="button"
                onClick={handleClearAll}
                className="text-[13px] font-medium text-[#FF3B30] hover:underline px-1 py-0.5 select-none cursor-pointer"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsEditMode(!isEditMode)}
              className="text-[14px] font-semibold text-[#007AFF] dark:text-[#0A84FF] hover:underline px-1 py-0.5 select-none cursor-pointer"
            >
              {isEditMode ? 'Done' : 'Edit'}
            </button>
          </div>
        )}
      </div>

      {/* 2. Scrollable Category Pills with Counts (Compact & Subtle) */}
      {savedItems.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {(['all', 'serbisyo', 'trabaho', 'pera', 'bayanihan', 'aral', 'kaligtasan'] as const).map(cat => {
            const count = cat === 'all' ? savedItems.length : savedItems.filter(i => i.category === cat).length;
            if (cat !== 'all' && count === 0) return null;

            const isSelected = activeCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`h-7 px-3 rounded-full text-[12px] font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 select-none cursor-pointer ${
                  isSelected
                    ? 'bg-[#007AFF] text-white font-semibold shadow-2xs'
                    : 'bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] text-black dark:text-white hover:bg-[rgba(118,118,128,0.2)]'
                }`}
              >
                <span className="capitalize">{cat === 'all' ? 'All' : cat}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-black/10 dark:bg-white/10 text-[#8E8E93]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 3. Inset Grouped List of Bookmarks */}
      <div>
        {filteredItems.length > 0 ? (
          <GroupedList
            title={`${filteredItems.length} SAVED ITEMS`}
            subtitle="Tap to view official details and requirements"
          >
            {filteredItems.map(item => (
              <GroupedListItem
                key={item.id}
                onClick={() => navigate(`/item/${item.id}`)}
                leadingIcon={
                  isEditMode ? (
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        toggleSave(item.id);
                        showToast('Removed from bookmarks', 'info');
                      }}
                      className="p-1 text-[#FF3B30] hover:scale-110 transition-transform"
                      aria-label="Remove item"
                    >
                      <MinusCircle className="w-5 h-5 fill-[#FF3B30] text-white" />
                    </button>
                  ) : (
                    <Layers className="w-4 h-4 stroke-[2]" />
                  )
                }
                title={
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>{item.title}</span>
                    <Badge category={item.category} size="sm">
                      {item.category}
                    </Badge>
                  </div>
                }
                subtitle={`${item.agency} ${item.agencyAcronym ? `(${item.agencyAcronym})` : ''}`}
                metadata={<span className="line-clamp-1">{item.description}</span>}
              />
            ))}
          </GroupedList>
        ) : (
          <EmptyState
            icon={<Bookmark className="w-10 h-10 opacity-50" />}
            title="No saved items yet"
            description="Bookmark services, jobs, or scholarships to quickly access them here anytime."
            actionLabel="Browse Directory"
            onAction={() => navigate('/serbisyo')}
          />
        )}
      </div>

      {/* 4. Footnote with Lock Icon */}
      <div className="pt-2 pb-6 flex items-center justify-center gap-1.5 text-[12px] text-[#8E8E93]">
        <Lock className="w-3.5 h-3.5" />
        <span>Bookmarks are stored locally on your device.</span>
      </div>
    </div>
  );
};
