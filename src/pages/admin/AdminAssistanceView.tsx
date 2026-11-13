import React, { useState, useMemo } from 'react';
import { FinancialAssistanceItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import { InlineFilterBar, FilterGroup } from '../../components/common/InlineFilterBar';
import { PesoSign } from '../../components/common/PesoSign';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Target,
  CreditCard,
  RefreshCw
} from 'lucide-react';

interface AdminAssistanceViewProps {
  onOpenCreate: () => void;
  onOpenEdit: (item: FinancialAssistanceItem) => void;
  onDataChanged: () => void;
}

export const AdminAssistanceView: React.FC<AdminAssistanceViewProps> = ({
  onOpenCreate,
  onOpenEdit,
  onDataChanged
}) => {
  const { showToast } = useToast();
  const { confirmAction } = useConfirm();
  const [assistance, setAssistance] = useState<FinancialAssistanceItem[]>(() => MockStorage.getAssistance());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshList = () => {
    setIsRefreshing(true);
    setAssistance(MockStorage.getAssistance());
    onDataChanged();
    window.dispatchEvent(new CustomEvent('gabayph_data_updated'));
    showToast('Financial assistance directory refreshed.', 'info');
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleDelete = (id: string, title: string) => {
    confirmAction({
      title: 'Delete Financial Aid Program?',
      message: `Are you sure you want to permanently delete "${title}"? This cannot be undone.`,
      confirmLabel: 'Delete Program',
      isDestructive: true,
      onConfirm: () => {
        MockStorage.deleteItem('pera', id);
        refreshList();
        showToast(`Deleted assistance program: ${title}`, 'info');
      }
    });
  };

  const filterGroups: FilterGroup[] = [
    {
      id: 'type',
      label: 'Assistance Type',
      options: [
        { value: 'all', label: 'All Assistance Types' },
        { value: 'emergency_aid', label: 'Emergency Aid / Outright Grant' },
        { value: 'subsidy', label: 'Direct Subsidy' },
        { value: 'cash_grant', label: 'Conditional Cash Grant (4Ps)' },
        { value: 'loan', label: 'Livelihood Loan / Micro-financing' },
        { value: 'pension', label: 'Social Pension' },
      ]
    }
  ];

  const filteredItems = useMemo(() => {
    return assistance.filter(item => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.agencyAcronym && item.agencyAcronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchType = selectedType === 'all' || item.assistanceType === selectedType;

      return matchSearch && matchType;
    });
  }, [assistance, searchQuery, selectedType]);

  const hasActiveFilters = Boolean(selectedType !== 'all' || searchQuery.trim() !== '');

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
              {assistance.length} Active Aid Programs
            </span>
          </div>

          <h1 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-black dark:text-white leading-tight">
            Financial Assistance & Subsidies
          </h1>

          <p className="text-[13px] text-[#8E8E93] mt-0.5">
            Cash transfers (4Ps), emergency aid (AICS), emergency employment (TUPAD), and livelihood grants
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={refreshList}
            disabled={isRefreshing}
            title="Refresh aid programs list"
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
            <span>Add Assistance Program</span>
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
              placeholder="Search assistance program title, agency, or coverage..."
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
            <PesoSign className="w-8 h-8 mx-auto text-[#8E8E93]/60" />
            <p className="font-semibold text-black dark:text-white">No financial aid programs found</p>
            <p className="text-[12px]">Try modifying your search or resetting type filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-black/[0.02] dark:bg-white/[0.03] text-[#8E8E93] uppercase text-[11px] font-semibold tracking-wider border-b border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)]">
                <tr>
                  <th className="p-3.5">Assistance Details</th>
                  <th className="p-3.5">Agency</th>
                  <th className="p-3.5">Coverage / Benefit</th>
                  <th className="p-3.5">Disbursement Channel</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] text-[13px]">
                {filteredItems.map(ast => (
                  <tr key={ast.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                    <td className="p-3.5 max-w-sm">
                      <div className="font-semibold text-black dark:text-white leading-tight">
                        {ast.title}
                      </div>
                      <p className="text-[12px] text-[#8E8E93] line-clamp-1 mt-0.5">
                        {ast.description}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-[#8E8E93]">
                        <Target className="w-3 h-3 text-[#8E8E93] shrink-0" />
                        <span className="truncate">{ast.targetBeneficiaries.join(', ')}</span>
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-semibold text-[#007AFF]">
                        {ast.agencyAcronym || ast.agency}
                      </span>
                      <p className="text-[11px] text-[#8E8E93] max-w-[160px] truncate mt-0.5">
                        {ast.agency}
                      </p>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-semibold text-[#34C759]">
                        {ast.amountOrCoverage.split(';')[0]}
                      </div>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/70 block w-fit mt-1">
                        {ast.assistanceType?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-medium text-black dark:text-white">
                        <CreditCard className="w-3.5 h-3.5 text-[#8E8E93]" />
                        <span className="max-w-[160px] truncate">{ast.disbursementMode}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {ast.officialUrl && (
                          <a
                            href={ast.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            title="Open official agency guidelines"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => onOpenEdit(ast)}
                          className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                          title="Edit assistance program"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(ast.id, ast.title)}
                          className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#FF3B30] hover:bg-[rgba(255,59,48,0.1)] transition-colors cursor-pointer"
                          title="Delete program"
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
