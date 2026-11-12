import { PesoSign } from '../../components/common/PesoSign';
import React, { useState, useMemo } from 'react';
import { FinancialAssistanceItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import { IOSSelect } from '../../components/common/IOSSelect';
import {
    Search,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  CreditCard,
  Target,
  RefreshCw
} from 'lucide-react';
import { Button } from '../../components/common/Button';

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

  const refreshList = () => {
    setAssistance(MockStorage.getAssistance());
    onDataChanged();
  };

  const handleDelete = (id: string, title: string) => {
    confirmAction({
      title: 'Delete Assistance Program?',
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

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-ios-lightText dark:text-ios-darkText">
              Financial Assistance & Subsidies Management
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold">
              {assistance.length} programs
            </span>
          </div>
          <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-0.5">
            Oversee government cash transfers (4Ps), emergency aid (AICS), emergency employment (TUPAD), and livelihood grants.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" variant="outline" onClick={refreshList} title="Refresh records list">
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
          <Button size="sm" variant="primary" onClick={onOpenCreate} className="font-bold">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Assistance Program</span>
          </Button>
        </div>
      </div>

      {/* Assistance Records Table with Integrated Management Toolbar */}
      <div className="rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm overflow-hidden">
        {/* Integrated Management Toolbar */}
        <div className="p-3 bg-slate-50/60 dark:bg-slate-800/40 border-b border-ios-lightBorder dark:border-ios-darkBorder flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-ios-lightMuted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search assistance program title, agency, or coverage..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-ios-lg bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightText dark:text-ios-darkText focus:outline-none focus:ring-2 focus:ring-ios-navy"
            />
          </div>

          <div className="w-full md:w-64">
            <IOSSelect
              value={selectedType}
              onChange={setSelectedType}
              size="sm"
              className="w-full"
              options={[
                { value: 'all', label: 'All Assistance Types' },
                { value: 'emergency_aid', label: 'Emergency Aid / Outright Grant' },
                { value: 'subsidy', label: 'Direct Subsidy' },
                { value: 'cash_grant', label: 'Conditional Cash Grant (4Ps)' },
                { value: 'loan', label: 'Livelihood Loan / Micro-financing' },
                { value: 'pension', label: 'Social Pension' },
              ]}
            />
          </div>
        </div>
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-xs text-ios-lightMuted space-y-2">
            <PesoSign className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
            <p className="font-semibold text-ios-lightText dark:text-ios-darkText">No financial aid programs found</p>
            <p>Try modifying your search or resetting type filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-ios-lightMuted uppercase text-[10px] font-bold border-b border-ios-lightBorder dark:border-ios-darkBorder">
                <tr>
                  <th className="p-3.5">Assistance Program & Description</th>
                  <th className="p-3.5">Agency</th>
                  <th className="p-3.5">Coverage / Benefit</th>
                  <th className="p-3.5">Disbursement Mode</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ios-lightBorder dark:divide-ios-darkBorder">
                {filteredItems.map(ast => (
                  <tr key={ast.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 max-w-sm">
                      <div className="font-bold text-ios-lightText dark:text-ios-darkText">
                        {ast.title}
                      </div>
                      <p className="text-[11px] text-ios-lightMuted line-clamp-1 mt-0.5">
                        {ast.description}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-500">
                        <Target className="w-3 h-3" />
                        <span className="truncate">{ast.targetBeneficiaries.join(', ')}</span>
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-semibold text-ios-navy dark:text-blue-400">
                        {ast.agencyAcronym || ast.agency}
                      </span>
                      <p className="text-[10px] text-ios-lightMuted max-w-[150px] truncate">
                        {ast.agency}
                      </p>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-bold text-emerald-600 dark:text-emerald-400">
                        {ast.amountOrCoverage.split(';')[0]}
                      </div>
                      <span className="text-[10px] uppercase font-semibold text-ios-lightMuted">
                        {ast.assistanceType?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-medium text-ios-lightText dark:text-ios-darkText">
                        <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                        <span className="max-w-[160px] truncate">{ast.disbursementMode}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap space-x-1">
                      {ast.officialUrl && (
                        <a
                          href={ast.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block p-1.5 text-ios-lightMuted hover:text-ios-navy rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Open official agency guidelines"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => onOpenEdit(ast)}
                        className="p-1.5 text-ios-lightMuted hover:text-ios-navy dark:hover:text-blue-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit assistance program"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(ast.id, ast.title)}
                        className="p-1.5 text-ios-lightMuted hover:text-red-500 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Delete program"
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
