import React from 'react';
import { useApp } from '../../context/AppContext';
import { MockStorage } from '../../data/mockStorage';
import { useToast } from '../../context/ToastContext';
import {
  ShieldCheck,
  RotateCcw,
  Download,
  Database,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../../components/common/Button';
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
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-150 text-xs">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-bold text-ios-lightText dark:text-ios-darkText">
          Administrative Settings & Prototype Data Management
        </h1>
        <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mt-0.5">
          Platform configurations, local prototype client storage, operator access details, and mock fixture controls.
        </p>
      </div>

      {/* Operator Session Card */}
      <div className="p-5 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-ios-lightMuted dark:text-ios-darkMuted flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-ios-navy dark:text-blue-400" />
          Active Administrator Identity
        </h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-ios-lg bg-slate-50 dark:bg-slate-800/50 border border-ios-lightBorder dark:border-ios-darkBorder">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-ios-navy text-amber-400 font-bold flex items-center justify-center text-sm shadow-ios-sm">
              MS
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-ios-lightText dark:text-ios-darkText">
                  Maria Santos
                </span>
                <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300">
                  Senior Operations Admin
                </span>
              </div>
              <p className="text-[11px] text-ios-lightMuted mt-0.5">
                maria.santos@gabay.gov.ph • Gov Operator ID: ADM-2026-PH
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-medium mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Full CRUD & Moderation Permissions Granted</span>
              </div>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setRole('citizen');
              navigate('/');
              showToast('Returned to Citizen View.', 'info');
            }}
            className="text-xs shrink-0 flex items-center gap-1 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Switch to Citizen View</span>
          </Button>
        </div>
      </div>

      {/* Client-Side Prototype Database Volume */}
      <div className="p-5 rounded-ios-xl bg-white dark:bg-slate-900 border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-ios-lightMuted dark:text-ios-darkMuted flex items-center gap-1.5">
            <Database className="w-4 h-4 text-emerald-500" />
            Local Prototype Storage Metrics
          </h2>
          <Button size="sm" variant="secondary" onClick={handleBackupExport} className="font-bold flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" />
            <span>Backup Database (JSON)</span>
          </Button>
        </div>

        <p className="text-ios-lightMuted leading-relaxed">
          The prototype runs on localized mock persistence (`localStorage`), enabling complete offline responsiveness without requiring an external database backend.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-ios-lg bg-slate-50 dark:bg-slate-800/40 border border-ios-lightBorder dark:border-ios-darkBorder">
            <span className="text-[10px] uppercase font-bold text-ios-lightMuted">Services Directory</span>
            <div className="text-lg font-bold text-ios-navy dark:text-blue-400 mt-0.5">{services.length} items</div>
          </div>
          <div className="p-3 rounded-ios-lg bg-slate-50 dark:bg-slate-800/40 border border-ios-lightBorder dark:border-ios-darkBorder">
            <span className="text-[10px] uppercase font-bold text-ios-lightMuted">Careers & Jobs</span>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-0.5">{jobs.length} items</div>
          </div>
          <div className="p-3 rounded-ios-lg bg-slate-50 dark:bg-slate-800/40 border border-ios-lightBorder dark:border-ios-darkBorder">
            <span className="text-[10px] uppercase font-bold text-ios-lightMuted">Financial Aid</span>
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{assistance.length} items</div>
          </div>
          <div className="p-3 rounded-ios-lg bg-slate-50 dark:bg-slate-800/40 border border-ios-lightBorder dark:border-ios-darkBorder">
            <span className="text-[10px] uppercase font-bold text-ios-lightMuted">Education Programs</span>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400 mt-0.5">{education.length} items</div>
          </div>
          <div className="p-3 rounded-ios-lg bg-slate-50 dark:bg-slate-800/40 border border-ios-lightBorder dark:border-ios-darkBorder">
            <span className="text-[10px] uppercase font-bold text-ios-lightMuted">Public Bulletins</span>
            <div className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-0.5">{bulletins.length} items</div>
          </div>
          <div className="p-3 rounded-ios-lg bg-slate-50 dark:bg-slate-800/40 border border-ios-lightBorder dark:border-ios-darkBorder">
            <span className="text-[10px] uppercase font-bold text-ios-lightMuted">Citizen Inaccuracies</span>
            <div className="text-lg font-bold text-red-600 dark:text-red-400 mt-0.5">{reports.length} reports</div>
          </div>
        </div>
      </div>

      {/* Dangerous Operations: Reset Mock Data */}
      <div className="p-5 rounded-ios-xl bg-red-50/60 dark:bg-red-950/20 border border-red-200 dark:border-red-900/60 space-y-3">
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-red-600 dark:text-red-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-red-800 dark:text-red-300">
            Factory Data Reset
          </h2>
        </div>

        <p className="text-red-900/80 dark:text-red-300/80 leading-relaxed">
          Resetting will clear all locally created, edited, and deleted records from your browser's client storage and restore the original verified government fixtures.
        </p>

        <div className="pt-2 flex justify-end">
          <Button
            size="sm"
            variant="destructive"
            onClick={handleTriggerReset}
            className="font-bold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Prototype Data</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
