import React, { useState, useMemo } from 'react';
import { EducationItem } from '../../types';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
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
import { Button } from '../../components/common/Button';

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
  const [education, setEducation] = useState<EducationItem[]>(() => MockStorage.getEducation());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const refreshList = () => {
    setEducation(MockStorage.getEducation());
    onDataChanged();
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the education program "${title}"?`)) {
      MockStorage.deleteItem('aral', id);
      refreshList();
      showToast(`Deleted education program: ${title}`, 'info');
    }
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-bold text-ios-lightText dark:text-ios-darkText">
              Education, Scholarships & TVET Management
            </h1>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-bold">
              {education.length} programs
            </span>
          </div>
          <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-0.5">
            Oversee DOST-SEI, CHED UniFAST, and TESDA skills training programs and student subsidies.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" variant="outline" onClick={refreshList} title="Refresh records list">
            <RefreshCw className="w-3.5 h-3.5" />
          </Button>
          <Button size="sm" variant="primary" onClick={onOpenCreate} className="font-bold">
            <Plus className="w-3.5 h-3.5" />
            <span>Add Education Program</span>
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="p-3.5 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-ios-lightMuted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search scholarship, TVET course, agency..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-ios-lg bg-slate-50 dark:bg-slate-800 border border-ios-lightBorder dark:border-ios-darkBorder text-ios-lightText dark:text-ios-darkText focus:outline-none focus:ring-2 focus:ring-ios-navy"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedLevel}
            onChange={e => setSelectedLevel(e.target.value)}
            className="flex-1 md:flex-initial px-2.5 py-1.5 rounded-ios-lg bg-slate-50 dark:bg-slate-800 border border-ios-lightBorder dark:border-ios-darkBorder text-xs text-ios-lightText dark:text-ios-darkText font-medium focus:outline-none"
          >
            <option value="all">All Academic Levels</option>
            <option value="tertiary">Tertiary / Undergraduate</option>
            <option value="vocational">Vocational / TVET</option>
            <option value="secondary">Secondary (SHS)</option>
            <option value="post-graduate">Post-Graduate</option>
          </select>

          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="flex-1 md:flex-initial px-2.5 py-1.5 rounded-ios-lg bg-slate-50 dark:bg-slate-800 border border-ios-lightBorder dark:border-ios-darkBorder text-xs text-ios-lightText dark:text-ios-darkText font-medium focus:outline-none"
          >
            <option value="all">All Program Types</option>
            <option value="scholarship">Full Scholarship</option>
            <option value="tvet">TESDA TVET Training</option>
            <option value="subsidy">Tuition Subsidy (UniFAST)</option>
            <option value="free_course">Online Certification</option>
          </select>
        </div>
      </div>

      {/* Records Table */}
      <div className="rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-xs text-ios-lightMuted space-y-2">
            <GraduationCap className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
            <p className="font-semibold text-ios-lightText dark:text-ios-darkText">No education programs found</p>
            <p>Try modifying your search or resetting filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-ios-lightMuted uppercase text-[10px] font-bold border-b border-ios-lightBorder dark:border-ios-darkBorder">
                <tr>
                  <th className="p-3.5">Scholarship / Program Title</th>
                  <th className="p-3.5">Agency</th>
                  <th className="p-3.5">Academic Level & Benefits</th>
                  <th className="p-3.5">Application Deadline</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ios-lightBorder dark:divide-ios-darkBorder">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 max-w-sm">
                      <div className="font-bold text-ios-lightText dark:text-ios-darkText">
                        {item.title}
                      </div>
                      <p className="text-[11px] text-ios-lightMuted line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                      <span className="inline-block text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 mt-1">
                        {item.educationType?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="font-semibold text-ios-navy dark:text-blue-400">
                        {item.agencyAcronym || item.agency}
                      </span>
                      <p className="text-[10px] text-ios-lightMuted max-w-[150px] truncate">
                        {item.agency}
                      </p>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="font-semibold text-ios-lightText dark:text-ios-darkText capitalize">
                        {item.educationalLevel}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                        <Award className="w-3 h-3" />
                        <span className="truncate max-w-[170px]">{item.benefits[0]}</span>
                      </div>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 font-semibold text-red-600 dark:text-red-400">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{item.deadline}</span>
                      </div>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap space-x-1">
                      {item.officialUrl && (
                        <a
                          href={item.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block p-1.5 text-ios-lightMuted hover:text-ios-navy rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Open official scholarship portal"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <button
                        onClick={() => onOpenEdit(item)}
                        className="p-1.5 text-ios-lightMuted hover:text-ios-navy dark:hover:text-blue-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Edit education program"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
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
