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
  Sparkles,
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
  const emergencyHotlines = MockStorage.getSafety().filter(s => s.isNationalHotline).slice(0, 3);

  const categories = [
    {
      id: 'trabaho',
      name: 'Trabaho',
      subtitle: 'Employment & Careers',
      count: '5+ Aktibong Trabaho',
      icon: <Briefcase className="w-5 h-5" />,
      color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300',
      path: '/trabaho'
    },
    {
      id: 'serbisyo',
      name: 'Serbisyo',
      subtitle: 'Government IDs & Docs',
      count: '8+ Pangunahing Serbisyo',
      icon: <FileText className="w-5 h-5" />,
      color: 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300',
      path: '/serbisyo'
    },
    {
      id: 'pera',
      name: 'Pera',
      subtitle: 'Financial Assistance & Aid',
      count: '5+ Programa ng Ayuda',
      icon: <DollarSign className="w-5 h-5" />,
      color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300',
      path: '/pera'
    },
    {
      id: 'bayanihan',
      name: 'Bayanihan',
      subtitle: 'Volunteer & Donations',
      count: '4+ Programang Pangkomunidad',
      icon: <HeartHandshake className="w-5 h-5" />,
      color: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300',
      path: '/bayanihan'
    },
    {
      id: 'aral',
      name: 'Aral',
      subtitle: 'Scholarships & TVET',
      count: '4+ Iskolarship at Kurso',
      icon: <GraduationCap className="w-5 h-5" />,
      color: 'bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300',
      path: '/aral'
    },
    {
      id: 'kaligtasan',
      name: 'Kaligtasan',
      subtitle: 'Emergency Hotlines & Guides',
      count: '10+ Pambansang Hotline',
      icon: <ShieldAlert className="w-5 h-5" />,
      color: 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300',
      path: '/kaligtasan'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Editorial Hero & Search Bar */}
      <section className="bg-gradient-to-b from-ios-navy/5 to-transparent dark:from-blue-950/20 pt-6 pb-2 rounded-2xl">
        <div className="max-w-3xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ios-navy/10 dark:bg-blue-900/30 text-ios-navy dark:text-blue-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-ios-navy dark:text-yellow-400" />
            <span>Ang Iyong Gabay sa Serbisyong Publiko ng Pilipinas</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-ios-lightText dark:text-ios-darkText mb-2.5">
            Mabilis, Maaasahan, at Malinaw na Impormasyon ng Pamahalaan
          </h1>

          <p className="text-xs sm:text-sm text-ios-lightMuted dark:text-ios-darkMuted max-w-xl mx-auto mb-5 leading-relaxed">
            Tuklasin ang mga kinakailangang dokumento para sa mga ID, bukas na trabaho sa gobyerno, tulong medikal, scholarship, at agarang numerong pang-emergency.
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
              Maghanap ng Serbisyo (hal. PhilSys ID, Passport, 4Ps, SSS)...
            </span>
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightMuted rounded border border-ios-lightBorder dark:border-ios-darkBorder">
              Pindutin
            </kbd>
          </div>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-xs">
            <span className="text-[11px] text-ios-lightMuted dark:text-ios-darkMuted mr-1">
              Popular:
            </span>
            {[
              { label: 'PhilSys National ID', id: 'srv-philsys' },
              { label: 'DFA Passport', id: 'srv-dfa-passport' },
              { label: 'NBI Clearance', id: 'srv-nbi-clearance' },
              { label: 'DSWD AICS Ayuda', id: 'ast-aics-dswd' },
              { label: 'Emergency 911', id: 'safe-911' }
            ].map(item => (
              <button
                key={item.label}
                onClick={() => navigate(`/item/${item.id}`)}
                className="px-2.5 py-1 rounded-full bg-white dark:bg-ios-darkSurface text-ios-lightText dark:text-ios-darkText border border-ios-lightBorder/80 dark:border-ios-darkBorder text-[11px] font-medium hover:border-ios-navy dark:hover:border-blue-400 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 6 Core Categories Grid */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-ios-lightText dark:text-ios-darkText tracking-tight">
              Anim na Pangunahing Kategorya
            </h2>
            <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted">
              Pumili ng sektor upang masuri ang mga kaugnay na serbisyo
            </p>
          </div>
          <button
            onClick={() => navigate('/serbisyo')}
            className="text-xs font-semibold text-ios-navy dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            Lahat ng Direktoryo <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => navigate(cat.path)}
              className="flex flex-col items-start p-3.5 rounded-ios-xl bg-ios-lightSurface dark:bg-ios-darkSurface border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm hover:shadow-ios hover:-translate-y-0.5 transition-all text-left group ios-active"
            >
              <div className={`w-9 h-9 rounded-ios-lg ${cat.color} flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform`}>
                {cat.icon}
              </div>
              <h3 className="text-sm font-bold text-ios-lightText dark:text-ios-darkText leading-tight">
                {cat.name}
              </h3>
              <p className="text-[11px] text-ios-lightMuted dark:text-ios-darkMuted mt-0.5 line-clamp-1">
                {cat.subtitle}
              </p>
              <span className="text-[10px] font-medium text-ios-navy dark:text-blue-400 mt-2">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Emergency Hotlines Strip (Kaligtasan Focus) */}
      <section className="bg-red-50/70 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 rounded-ios-xl p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-red-500 text-white">
              <PhoneCall className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-red-900 dark:text-red-200">
                Agarang Pambansang Emergency Hotlines
              </h3>
              <p className="text-xs text-red-700/80 dark:text-red-300/80">
                Toll-free 24/7 na mga numerong handang sumaklolo sa buong bansa
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/kaligtasan')}
            className="text-xs font-semibold text-red-700 dark:text-red-300 hover:underline flex items-center gap-1"
          >
            Tingnan Lahat ng Hotline & Gabay <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {emergencyHotlines.map(hotline => (
            <div
              key={hotline.id}
              className="bg-white dark:bg-ios-darkSurface p-3 rounded-ios-lg border border-red-100 dark:border-red-900/30 flex items-center justify-between"
            >
              <div>
                <span className="text-xs font-bold text-ios-lightText dark:text-ios-darkText block">
                  {hotline.title}
                </span>
                <span className="text-[11px] text-ios-lightMuted dark:text-ios-darkMuted truncate block max-w-[170px]">
                  {hotline.agencyAcronym || hotline.agency}
                </span>
              </div>
              <a
                href={`tel:${hotline.hotlineNumber?.replace(/[^0-9]/g, '')}`}
                className="px-3 py-1.5 rounded-ios-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm ios-active"
              >
                <PhoneCall className="w-3 h-3" />
                {hotline.hotlineNumber}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Government Services (Serbisyo) */}
      <section>
        <GroupedList
          title="Pinakasikat na mga Serbisyo ng Pamahalaan"
          subtitle="Mga kinakailangang ID, sertipiko, at lisensya"
          action={
            <button
              onClick={() => navigate('/serbisyo')}
              className="text-xs font-semibold text-ios-navy dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Iba pang Serbisyo <ChevronRight className="w-3 h-3" />
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
                      Na-verify: {srv.lastVerified}
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
                        state ? 'Nai-save sa iyong talaan!' : 'Inalis sa iyong talaan.',
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
            title="Bukas na mga Trabaho sa Gobyerno"
            subtitle="Mga regular at contractual na posisyon"
            action={
              <button
                onClick={() => navigate('/trabaho')}
                className="text-xs font-semibold text-ios-navy dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                Lahat ng Trabaho <ChevronRight className="w-3 h-3" />
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
            title="Tulong Pinansyal at Ayuda"
            subtitle="Mga ayuda at subsidyo mula sa DSWD, DOLE, at SSS"
            action={
              <button
                onClick={() => navigate('/pera')}
                className="text-xs font-semibold text-ios-navy dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                Lahat ng Ayuda <ChevronRight className="w-3 h-3" />
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
            title="Mga Iskolarship at Libreng Kurso"
            subtitle="Suporta sa edukasyon mula sa DOST, CHED, at TESDA"
            action={
              <button
                onClick={() => navigate('/aral')}
                className="text-xs font-semibold text-ios-navy dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                Iba pang Iskolarship <ChevronRight className="w-3 h-3" />
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
            title="Pinakahuling Opisyal na Abiso"
            subtitle="Mga anunsyo ukol sa presyo, holiday, at kaligtasan"
            action={
              <button
                onClick={() => navigate('/announcements')}
                className="text-xs font-semibold text-ios-navy dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                Lahat ng Abiso <ChevronRight className="w-3 h-3" />
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
