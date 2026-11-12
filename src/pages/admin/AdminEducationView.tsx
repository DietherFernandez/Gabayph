import React, { useState, useMemo } from 'react';
import { EducationItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import { useConfirm } from '../../context/ConfirmContext';
import { IOSSelect } from '../../components/common/IOSSelect';
import {
  GraduationCap,
  Search,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Calendar,
  Award,
  RefreshCw
} from 'lucide-react';

interface AdminEducationViewProps {
  onOpenCreate: () => void;
  onOpenEdit: (item: EducationItem) => void;
  onDataChanged: () => void;
}

export const AdminEducationView: React.FC<AdminEducationViewProps> = ({
  onOpenCreate,
  onOpenEdit,
  onDataChanged
}) => {
  const { showToast } = useToast();
  const { confirmAction } = useConfirm();
  const [education, setEducation] = useState<EducationItem[]>(() => MockStorage.getEducation());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const refreshList = () => {
    setEducation(MockStorage.getEducation());
    onDataChanged();
  };

  const handleDelete = (id: string, title: string) => {
    confirmAction({
      title: 'Delete Education Program?',
      message: `Are you sure you want to permanently delete "${title}"? This cannot be undone.`,
      confirmLabel: 'Delete Program',
      isDestructive: true,
      onConfirm: () => {
        MockStorage.deleteItem('aral', id);
        refreshList();
        showToast(`Deleted education program: ${title}`, 'info');
      }
    });
  };

  const filteredItems = useMemo(() => {
    return education.filter(item => {
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.agencyAcronym && item.agencyAcronym.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchLevel = selectedLevel === 'all' || item.educationalLevel === selectedLevel;
      const matchType = selectedType === 'all' || item.educationType === selectedType;

      return matchSearch && matchLevel && matchType;
    });
  }, [education, searchQuery, selectedLevel, selectedType]);

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
              {education.length} Programs & Subsidies
            </span>
          </div>
          <h1 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-black dark:text-white leading-tight">
            Education, Scholarships & TVET
          </h1>
          <p className="text-[13px] text-[#8E8E93]">
            DOST-SEI scholarships, CHED UniFAST grants, and TESDA skills training programs
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={refreshList}
            title="Refresh records list"
            className="h-9 px-3 rounded-[10px] bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] hover:bg-[rgba(118,118,128,0.2)] text-black dark:text-white text-[13px] font-medium transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
          <button
            type="button"
            onClick={onOpenCreate}
            className="h-9 px-3.5 rounded-[10px] bg-[#007AFF] hover:bg-blue-600 active:scale-[0.98] text-white text-[13px] font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.2]" />
            <span>Add Education Program</span>
          </button>
        </div>
      </div>

      {/* 2. Cohesive Cardless Inset Table Container */}
      <div className="rounded-[16px] bg-white dark:bg-[#1C1C1E] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] overflow-hidden">
        {/* Integrated Management Toolbar */}
        <div className="p-3 sm:p-3.5 bg-black/[0.015] dark:bg-white/[0.02] border-b border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)] flex flex-col md:flex-row items-center gap-2.5">
          <div className="relative flex-1 w-full">
            <Search className="w-3.5 h-3.5 text-[#8E8E93] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search scholarship, TVET course, agency..."
              className="w-full h-8 pl-8 pr-3 text-[13px] rounded-[8px] bg-[rgba(118,118,128,0.1)] dark:bg-[rgba(118,118,128,0.2)] text-black dark:text-white placeholder-[#8E8E93] focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
            <IOSSelect
              value={selectedLevel}
              onChange={setSelectedLevel}
              size="sm"
              className="w-full sm:w-48"
              options={[
                { value: 'all', label: 'All Academic Levels' },
                { value: 'tertiary', label: 'Tertiary / Undergraduate' },
                { value: 'vocational', label: 'Vocational / TVET' },
                { value: 'secondary', label: 'Secondary (SHS)' },
                { value: 'post-graduate', label: 'Post-Graduate' },
              ]}
            />

            <IOSSelect
              value={selectedType}
              onChange={setSelectedType}
              size="sm"
              className="w-full sm:w-44"
              options={[
                { value: 'all', label: 'All Program Types' },
                { value: 'scholarship', label: 'Full Scholarship' },
                { value: 'tvet', label: 'TESDA TVET Training' },
                { value: 'subsidy', label: 'Tuition Subsidy (UniFAST)' },
                { value: 'free_course', label: 'Online Certification' },
              ]}
            />
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="p-10 text-center text-[13px] text-[#8E8E93] space-y-2">
            <GraduationCap className="w-8 h-8 mx-auto text-[#8E8E93]/60" />
            <p className="font-semibold text-black dark:text-white">No education programs found</p>
            <p className="text-[12px]">Try modifying your search or resetting filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-black/[0.02] dark:bg-white/[0.03] text-[#8E8E93] uppercase text-[11px] font-semibold tracking-wider border-b border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)]">
                <tr>
                  <th className="p-3.5">Scholarship & Program Details</th>
                  <th className="p-3.5">Agency</th>
                  <th className="p-3.5">Level & Key Benefits</th>
                  <th className="p-3.5">Application Window</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] text-[13px]">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-colors">
                    <td className="p-3.5 max-w-sm">
                      <div className="font-semibold text-black dark:text-white leading-tight">
                        {item.title}
                      </div>
                      <p className="text-[12px] text-[#8E8E93] line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                      <span className="inline-block text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 text-black/70 dark:text-white/70 mt-1.5">
                        {item.educationType?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-semibold text-[#007AFF]">
                        {item.agencyAcronym || item.agency}
                      </span>
                      <p className="text-[11px] text-[#8E8E93] max-w-[160px] truncate mt-0.5">
                        {item.agency}
                      </p>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-semibold text-black dark:text-white capitalize">
                        {item.educationalLevel}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-[#34C759] mt-0.5">
                        <Award className="w-3 h-3 text-[#34C759] shrink-0" />
                        <span className="truncate max-w-[170px]">{item.benefits[0]}</span>
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-medium text-[12px] text-[#FF3B30]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.deadline}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {item.officialUrl && (
                          <a
                            href={item.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            title="Open official scholarship portal"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => onOpenEdit(item)}
                          className="p-1.5 rounded-[6px] text-[#8E8E93] hover:text-[#007AFF] hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                          title="Edit education program"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id, item.title)}
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
