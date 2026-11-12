import React from 'react';
import { useApp } from '../context/AppContext';
import { MockStorage } from '../data/mockStorage';
import {
  Search,
  Briefcase,
  FileText,
  DollarSign,
  HeartHandshake,
  GraduationCap,
  ShieldAlert,
  ChevronRight,
  Bookmark,
  PhoneCall,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { GroupedList, GroupedListItem } from '../components/common/GroupedList';
import { useToast } from '../context/ToastContext';

export const HomePage: React.FC = () => {
  const { navigate, openSearchModal, toggleSave, isSaved } = useApp();
  const { showToast } = useToast();

  const services = MockStorage.getServices().slice(0, 4);
  const jobs = MockStorage.getJobs().slice(0, 3);
  const assistance = MockStorage.getAssistance().slice(0, 3);
  const education = MockStorage.getEducation().slice(0, 3);
  const announcements = MockStorage.getAnnouncements().slice(0, 3);

  const categories = [
    {
      id: 'trabaho',
      name: 'Trabaho',
      subtitle: 'Employment & Careers',
      count: '5+ Active Job Openings',
      icon: <Briefcase className="w-5 h-5" />,
      color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
      path: '/trabaho'
    },
    {
      id: 'serbisyo',
      name: 'Serbisyo',
      subtitle: 'Government IDs & Docs',
      count: '8+ Essential Services',
      icon: <FileText className="w-5 h-5" />,
      color: 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300',
      path: '/serbisyo'
    },
    {
      id: 'pera',
      name: 'Pera',
      subtitle: 'Financial Assistance & Aid',
      count: '5+ Assistance Programs',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
      path: '/pera'
    },
    {
      id: 'bayanihan',
      name: 'Bayanihan',
      subtitle: 'Volunteer & Donations',
      count: '4+ Community Programs',
      icon: <HeartHandshake className="w-5 h-5" />,
      color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
      path: '/bayanihan'
    },
    {
      id: 'aral',
      name: 'Aral',
      subtitle: 'Scholarships & TVET',
      count: '4+ Scholarship Programs',
      icon: <GraduationCap className="w-5 h-5" />,
      color: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300',
      path: '/aral'
    },
    {
      id: 'kaligtasan',
      name: 'Kaligtasan',
      subtitle: 'Emergency Hotlines & Guides',
      count: '10+ Verified Hotlines',
      icon: <ShieldAlert className="w-5 h-5" />,
      color: 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300',
      path: '/kaligtasan'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Editorial Hero & Search Bar */}
      <section className="pt-2 sm:pt-4 pb-1">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h1 className="text-xl sm:text-3xl font-bold tracking-tight text-ios-lightText dark:text-ios-darkText mb-2">
            Fast, Verified, and Clear Philippine Government Information
          </h1>

          <p className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted max-w-xl mx-auto mb-3.5 sm:mb-5 leading-relaxed">
            Discover verified requirements for government IDs, civil service careers, cash assistance, scholarships, and 24/7 emergency hotlines.
          </p>

          {/* iOS Compact Search Field Trigger */}
          <div
            onClick={openSearchModal}
            className="w-full max-w-xl mx-auto flex items-center gap-3 bg-white dark:bg-ios-darkSurface p-3 rounded-ios-xl shadow-ios border border-ios-lightBorder dark:border-ios-darkBorder cursor-pointer hover:border-ios-navy dark:hover:border-blue-400 transition-all group ios-active"
          >
            <div className="w-8 h-8 rounded-ios-lg bg-ios-navy text-white flex items-center justify-center shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <span className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted text-left flex-1 truncate">
              Search directory (e.g. PhilSys ID, DFA Passport, 4Ps, SSS, TUPAD)...
            </span>
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightMuted rounded border border-ios-lightBorder dark:border-ios-darkBorder">
              Press /
            </kbd>
          </div>

          {/* Quick Search Chips */}
          <div className="flex items-center justify-start sm:justify-center gap-1.5 mt-2.5 sm:mt-3 text-xs overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
            <span className="text-[11px] text-ios-lightMuted dark:text-ios-darkMuted shrink-0 font-medium mr-1">
              Popular:
            </span>
            {[
              { label: 'PhilSys National ID', id: 'srv-philsys' },
              { label: 'DFA e-Passport', id: 'srv-dfa-passport' },
              { label: 'NBI Clearance', id: 'srv-nbi-clearance' },
              { label: 'DSWD AICS Assistance', id: 'ast-aics-dswd' },
              { label: 'National Emergency 911', id: 'safe-911' }
            ].map(item => (
              <button
                key={item.label}
                onClick={() => navigate(`/item/${item.id}`)}
                className="px-3 py-1 rounded-full bg-white dark:bg-ios-darkSurface text-ios-lightText dark:text-ios-darkText border border-ios-lightBorder/80 dark:border-ios-darkBorder text-[11px] font-medium hover:border-ios-navy dark:hover:border-blue-400 transition-colors whitespace-nowrap shrink-0 shadow-2xs"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Core Categories Grid */}
      <section>
        <div className="flex items-center justify-between gap-2 mb-2.5 px-1">
          <div className="min-w-0 flex-1">
            <h2 className="text-sm sm:text-base font-bold text-ios-lightText dark:text-ios-darkText tracking-tight">
              Six Core Categories
            </h2>
            <p className="text-[11px] sm:text-xs text-ios-lightMuted dark:text-ios-darkMuted truncate">
              Select a sector to explore public services, requirements, and guides
            </p>
          </div>
          <button
            onClick={() => navigate('/serbisyo')}
            className="text-xs font-semibold text-ios-navy dark:text-blue-400 hover:underline flex items-center gap-1 shrink-0 whitespace-nowrap"
          >
            Full Directory <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate(cat.path)}
              className="flex flex-col items-center sm:items-start p-2 sm:p-2.5 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-800/50 active:scale-[0.97] transition-all text-center sm:text-left group ios-active"
            >
              <div className={`w-10 h-10 rounded-xl ${cat.color} flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform shadow-2xs`}>
                {cat.icon}
              </div>
              <h3 className="text-[13px] sm:text-[14px] font-bold text-ios-lightText dark:text-ios-darkText leading-tight truncate w-full">
                {cat.name}
              </h3>
              <span className="text-[11px] font-medium text-ios-lightMuted dark:text-ios-darkMuted mt-0.5">
                {cat.count.split('+')[0] || ''}+ items
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Emergency Hotlines Strip (Cardless Official Callout) */}
      <section className="py-2 px-3 border-y border-red-200 dark:border-red-900/50 bg-red-50/40 dark:bg-red-950/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="p-1.5 rounded-full bg-red-600 text-white shrink-0">
              <PhoneCall className="w-3.5 h-3.5" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-[14px] font-bold text-red-950 dark:text-red-200 leading-tight">
                  24/7 National Emergency Hotlines
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-red-600 text-white uppercase tracking-wider">
                  Toll-Free
                </span>
              </div>
              <p className="text-[12px] text-red-800/80 dark:text-red-300/80 truncate mt-0.5">
                Police, BFP Fire, Red Cross 143, Citizens' 8888, & NDRRMC
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 pt-0.5 sm:pt-0">
            <a
              href="tel:911"
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs ios-active"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Call 911</span>
            </a>
            <button
              onClick={() => navigate('/kaligtasan')}
              className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 font-semibold text-xs hover:bg-red-50 flex items-center justify-center gap-1 transition-colors"
            >
              <span>All Hotlines</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>

      {/* Popular Government Services (Serbisyo) */}
      <section>
        <GroupedList
          title="Popular Government Services"
          subtitle="Essential national IDs, civil registry, and clearances"
          action={
            <button
              onClick={() => navigate('/serbisyo')}
              className="text-xs font-semibold text-ios-navy dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              More Services <ChevronRight className="w-3.5 h-3.5" />
            </button>
          }
        >
          {services.map(srv => {
            const saved = isSaved(srv.id);
            return (
              <GroupedListItem
                key={srv.id}
                onClick={() => navigate(`/item/${srv.id}`)}
                leadingIcon={<FileText className="w-4 h-4" />}
                title={
                  <div className="flex items-center gap-2">
                    <span>{srv.title}</span>
                    <Badge category="serbisyo" size="sm">
                      {srv.serviceType}
                    </Badge>
                  </div>
                }
                subtitle={`${srv.agency} (${srv.agencyAcronym}) • ${srv.fees}`}
                metadata={
                  <>
                    <span className="flex items-center gap-1 text-[11px]">
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
                      showToast(
                        state ? 'Saved to your bookmarks!' : 'Removed from bookmarks.',
                        'info'
                      );
                    }}
                    className={`p-1.5 rounded-full transition-colors ${
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
      </section>

      {/* Two Column Layout: Trabaho & Pera */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured Trabaho */}
        <div>
          <GroupedList
            title="Open Government & Public Sector Jobs"
            subtitle="Plantilla civil service and contractual vacancies"
            action={
              <button
                onClick={() => navigate('/trabaho')}
                className="text-xs font-semibold text-ios-navy dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                All Job Listings <ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            {jobs.map(job => (
              <GroupedListItem
                key={job.id}
                onClick={() => navigate(`/item/${job.id}`)}
                leadingIcon={<Briefcase className="w-4 h-4" />}
                title={job.title}
                subtitle={`${job.agencyAcronym || job.agency} • ${job.location}`}
                metadata={
                  <>
                    <span className="font-semibold text-ios-navy dark:text-blue-400">
                      {job.salaryRange.split('(')[0]}
                    </span>
                    <span>•</span>
                    <span>Deadline: {job.deadline}</span>
                  </>
                }
              />
            ))}
          </GroupedList>
        </div>

        {/* Featured Financial Aid (Pera) */}
        <div>
          <GroupedList
            title="Financial Assistance & Emergency Subsidies"
            subtitle="DSWD, DOLE, and SSS emergency cash aid"
            action={
              <button
                onClick={() => navigate('/pera')}
                className="text-xs font-semibold text-ios-navy dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                All Financial Programs <ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            {assistance.map(ast => (
              <GroupedListItem
                key={ast.id}
                onClick={() => navigate(`/item/${ast.id}`)}
                leadingIcon={<DollarSign className="w-4 h-4" />}
                title={ast.title}
                subtitle={`${ast.agencyAcronym || ast.agency} • ${ast.assistanceType}`}
                metadata={
                  <>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400 truncate max-w-[220px]">
                      {ast.amountOrCoverage.split(';')[0]}
                    </span>
                  </>
                }
              />
            ))}
          </GroupedList>
        </div>
      </section>

      {/* Education (Aral) & Announcements */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Education & Scholarships */}
        <div>
          <GroupedList
            title="Scholarships & Free Skills Training"
            subtitle="DOST, CHED, and TESDA opportunities"
            action={
              <button
                onClick={() => navigate('/aral')}
                className="text-xs font-semibold text-ios-navy dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                More Scholarships <ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            {education.map(edu => (
              <GroupedListItem
                key={edu.id}
                onClick={() => navigate(`/item/${edu.id}`)}
                leadingIcon={<GraduationCap className="w-4 h-4" />}
                title={edu.title}
                subtitle={`${edu.agencyAcronym || edu.agency} • ${edu.educationalLevel}`}
                metadata={<span>Deadline: {edu.deadline}</span>}
              />
            ))}
          </GroupedList>
        </div>

        {/* Official Advisories / Announcements */}
        <div>
          <GroupedList
            title="Latest Official Public Advisories"
            subtitle="Official government advisories and notices"
            action={
              <button
                onClick={() => navigate('/announcements')}
                className="text-xs font-semibold text-ios-navy dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                All Advisories <ChevronRight className="w-3 h-3" />
              </button>
            }
          >
            {announcements.map(anc => (
              <GroupedListItem
                key={anc.id}
                onClick={() => navigate('/announcements')}
                leadingIcon={<AlertCircle className={`w-4 h-4 ${anc.urgent ? 'text-red-500' : 'text-ios-navy'}`} />}
                title={
                  <div className="flex items-center gap-1.5">
                    {anc.urgent && <Badge variant="urgent">URGENT</Badge>}
                    <span className="truncate">{anc.title}</span>
                  </div>
                }
                subtitle={`${anc.agencyAcronym || anc.sourceAgency} • ${anc.datePublished}`}
                metadata={<span className="line-clamp-1">{anc.summary}</span>}
              />
            ))}
          </GroupedList>
        </div>
      </section>
    </div>
  );
};
