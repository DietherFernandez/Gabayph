import React from 'react';
import { useApp } from '../../context/AppContext';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import {
  ShieldCheck,
  RotateCcw,
  Download,
  Database,
  ArrowLeft,
  FileText,
  Briefcase,
  GraduationCap,
  HeartHandshake,
  ShieldAlert,
  Bell,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { PesoSign } from '../../components/common/PesoSign';
import { useConfirm } from '../../context/ConfirmContext';

export const AdminSettingsView: React.FC = () => {
  const { setRole, navigate } = useApp();
  const { showToast } = useToast();
  const { confirmAction } = useConfirm();

  const services = MockStorage.getServices();
  const jobs = MockStorage.getJobs();
  const assistance = MockStorage.getAssistance();
  const education = MockStorage.getEducation();
  const bayanihan = MockStorage.getBayanihan();
  const safety = MockStorage.getSafety();
  const bulletins = MockStorage.getAnnouncements();
  const reports = MockStorage.getReports();
  const suggestions = MockStorage.getSuggestions();

  const handleBackupExport = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      version: 'GabayPH-Prototype-v1.0.4',
      storageData: {
        services,
        jobs,
        assistance,
        education,
        bayanihan,
        safety,
        bulletins,
        reports,
        suggestions
      }
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `gabayph_full_database_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Downloaded full database JSON backup successfully.', 'success');
  };

  const handleTriggerReset = () => {
    confirmAction({
      title: 'Confirm Factory Data Reset',
      message: 'Are you sure you want to restore all directories, user bookmarks, and moderation queues back to their initial factory fixtures? Any records added or modified will be permanently erased.',
      confirmLabel: 'Reset Everything',
      isDestructive: true,
      onConfirm: () => {
        showToast('Resetting prototype database to default mock fixtures...', 'info');
        setTimeout(() => {
          MockStorage.resetAllToDefaults();
        }, 300);
      }
    });
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-150">
      {/* 1. View Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[rgba(0,122,255,0.12)] text-[#007AFF] font-mono">
              System Configuration
            </span>
            <span className="text-[12px] text-[#8E8E93] flex items-center gap-1.5 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
              Active Administrator Session
            </span>
          </div>
          <h1 className="text-[20px] sm:text-[24px] font-bold tracking-tight text-black dark:text-white leading-tight">
            Administrative Settings & Storage
          </h1>
          <p className="text-[13px] text-[#8E8E93]">
            Platform configurations, local prototype storage, operator credentials, and fixture controls
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setRole('citizen');
              navigate('/');
              showToast('Returned to Citizen View.', 'info');
            }}
            className="h-9 px-3.5 rounded-[10px] bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] hover:bg-[rgba(118,118,128,0.2)] text-black dark:text-white text-[13px] font-medium transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Switch to Citizen View</span>
          </button>
        </div>
      </div>

      {/* 2. Operator Session Profile Card (Apple ID Style) */}
      <div className="space-y-2">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E93] px-1 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#007AFF]" />
          <span>Active Administrator Identity</span>
        </h2>

        <div className="p-4 sm:p-5 rounded-[16px] bg-white dark:bg-[#1C1C1E] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#007AFF] text-white font-bold flex items-center justify-center text-[15px] shadow-2xs shrink-0">
              MS
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-[15px] text-black dark:text-white">
                  Maria Santos
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[rgba(0,122,255,0.12)] text-[#007AFF] font-mono">
                  Senior Operations Admin
                </span>
              </div>
              <p className="text-[12px] text-[#8E8E93] mt-0.5">
                maria.santos@gabay.gov.ph • Operator ID: <span className="font-mono">ADM-2026-PH</span>
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-[#34C759] font-medium mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34C759]" />
                <span>Full Directory CRUD & Public Moderation Authority Granted</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Local Prototype Database Volume */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E93] flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#34C759]" />
            <span>Local Storage Volume & Fixtures</span>
          </h2>
          <button
            type="button"
            onClick={handleBackupExport}
            className="h-7 px-3 rounded-[8px] bg-[#007AFF] hover:bg-blue-600 active:scale-[0.98] text-white text-[12px] font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
          >
            <Download className="w-3 h-3 stroke-[2.2]" />
            <span>Backup Database (JSON)</span>
          </button>
        </div>

        <div className="rounded-[16px] bg-white dark:bg-[#1C1C1E] border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] overflow-hidden">
          <div className="p-4 sm:p-4.5 bg-black/[0.015] dark:bg-white/[0.02] border-b border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)]">
            <p className="text-[13px] text-[#8E8E93] leading-relaxed">
              The prototype operates with localized mock persistence (<code className="font-mono text-black dark:text-white px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 text-[12px]">localStorage</code>), providing instant zero-latency responses without requiring external database servers.
            </p>
          </div>

          <div className="divide-y sm:divide-y-0 sm:divide-x divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] grid grid-cols-2 sm:grid-cols-3">
            {/* Services */}
            <div className="p-3.5 sm:p-4 hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center justify-between text-[#8E8E93]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Public Services</span>
                <FileText className="w-3.5 h-3.5 text-[#007AFF]" />
              </div>
              <div className="text-[20px] font-bold text-black dark:text-white mt-1 leading-tight">
                {services.length}
              </div>
              <span className="text-[11px] text-[#8E8E93] block mt-0.5">Directory Items</span>
            </div>

            {/* Jobs */}
            <div className="p-3.5 sm:p-4 hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center justify-between text-[#8E8E93]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Careers & Jobs</span>
                <Briefcase className="w-3.5 h-3.5 text-[#007AFF]" />
              </div>
              <div className="text-[20px] font-bold text-black dark:text-white mt-1 leading-tight">
                {jobs.length}
              </div>
              <span className="text-[11px] text-[#8E8E93] block mt-0.5">Plantilla Openings</span>
            </div>

            {/* Financial Aid */}
            <div className="p-3.5 sm:p-4 hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center justify-between text-[#8E8E93]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Financial Aid</span>
                <PesoSign className="w-3.5 h-3.5 text-[#34C759]" />
              </div>
              <div className="text-[20px] font-bold text-black dark:text-white mt-1 leading-tight">
                {assistance.length}
              </div>
              <span className="text-[11px] text-[#8E8E93] block mt-0.5">Aid Programs</span>
            </div>

            {/* Education */}
            <div className="p-3.5 sm:p-4 border-t sm:border-t border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)] hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center justify-between text-[#8E8E93]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Education</span>
                <GraduationCap className="w-3.5 h-3.5 text-[#AF52DE]" />
              </div>
              <div className="text-[20px] font-bold text-black dark:text-white mt-1 leading-tight">
                {education.length}
              </div>
              <span className="text-[11px] text-[#8E8E93] block mt-0.5">Scholarships & TVET</span>
            </div>

            {/* Bayanihan */}
            <div className="p-3.5 sm:p-4 border-t sm:border-t border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)] hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center justify-between text-[#8E8E93]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Bayanihan</span>
                <HeartHandshake className="w-3.5 h-3.5 text-[#34C759]" />
              </div>
              <div className="text-[20px] font-bold text-black dark:text-white mt-1 leading-tight">
                {bayanihan.length}
              </div>
              <span className="text-[11px] text-[#8E8E93] block mt-0.5">Volunteer Drives</span>
            </div>

            {/* Safety */}
            <div className="p-3.5 sm:p-4 border-t sm:border-t border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)] hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center justify-between text-[#8E8E93]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Safety Hotlines</span>
                <ShieldAlert className="w-3.5 h-3.5 text-[#FF3B30]" />
              </div>
              <div className="text-[20px] font-bold text-black dark:text-white mt-1 leading-tight">
                {safety.length}
              </div>
              <span className="text-[11px] text-[#8E8E93] block mt-0.5">Emergency Guides</span>
            </div>

            {/* Bulletins */}
            <div className="p-3.5 sm:p-4 border-t sm:border-t border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)] hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center justify-between text-[#8E8E93]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Public Bulletins</span>
                <Bell className="w-3.5 h-3.5 text-[#FF9500]" />
              </div>
              <div className="text-[20px] font-bold text-black dark:text-white mt-1 leading-tight">
                {bulletins.length}
              </div>
              <span className="text-[11px] text-[#8E8E93] block mt-0.5">Official Notices</span>
            </div>

            {/* Reports */}
            <div className="p-3.5 sm:p-4 border-t sm:border-t border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)] hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center justify-between text-[#8E8E93]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Citizen Reports</span>
                <AlertTriangle className="w-3.5 h-3.5 text-[#FF3B30]" />
              </div>
              <div className="text-[20px] font-bold text-black dark:text-white mt-1 leading-tight">
                {reports.length}
              </div>
              <span className="text-[11px] text-[#8E8E93] block mt-0.5">Feedback Audits</span>
            </div>

            {/* Suggestions */}
            <div className="p-3.5 sm:p-4 border-t sm:border-t border-[rgba(60,60,67,0.1)] dark:border-[rgba(84,84,88,0.3)] hover:bg-black/[0.015] dark:hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center justify-between text-[#8E8E93]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Suggestions</span>
                <Sparkles className="w-3.5 h-3.5 text-[#34C759]" />
              </div>
              <div className="text-[20px] font-bold text-black dark:text-white mt-1 leading-tight">
                {suggestions.length}
              </div>
              <span className="text-[11px] text-[#8E8E93] block mt-0.5">Crowdsourced</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Factory Data Reset (Danger Zone) */}
      <div className="space-y-2 pt-2">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-[#FF3B30] px-1 flex items-center gap-1.5">
          <RotateCcw className="w-3.5 h-3.5 text-[#FF3B30]" />
          <span>Danger Zone: Prototype Data State</span>
        </h2>

        <div className="p-4 sm:p-5 rounded-[16px] bg-white dark:bg-[#1C1C1E] border border-[rgba(255,59,48,0.25)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h3 className="font-semibold text-[14px] text-black dark:text-white">
              Restore Factory Fixtures
            </h3>
            <p className="text-[13px] text-[#8E8E93] leading-relaxed max-w-xl">
              Permanently clear all locally created, edited, and deleted records from browser client storage and restore the original verified government fixtures.
            </p>
          </div>

          <button
            type="button"
            onClick={handleTriggerReset}
            className="h-8 px-3.5 rounded-[8px] bg-[rgba(255,59,48,0.12)] hover:bg-[rgba(255,59,48,0.2)] text-[#FF3B30] text-[12px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3 h-3 stroke-[2.2]" />
            <span>Reset Everything</span>
          </button>
        </div>
      </div>
    </div>
  );
};
