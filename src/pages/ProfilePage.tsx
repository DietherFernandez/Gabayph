import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Camera,
  CheckCircle2,
  LogOut,
  Save,
  Moon,
  Sun
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { useToast } from '../context/ToastContext';
import { useConfirm } from '../context/ConfirmContext';

export const ProfilePage: React.FC = () => {
  const { user, updateUser, theme, toggleTheme, logout, navigate } = useApp();
  const { showToast } = useToast();
  const { confirmAction } = useConfirm();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');
  const [city, setCity] = useState(user.city || '');
  const [province, setProvince] = useState(user.province || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');

  const [notifEnabled, setNotifEnabled] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);
  const [saving, setSaving] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
        showToast('Profile photo updated', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      updateUser({
        name,
        email,
        phone,
        city,
        province,
        avatarUrl
      });
      setSaving(false);
      showToast('Profile changes saved successfully', 'success');
    }, 400);
  };

  const handleLogout = () => {
    confirmAction({
      title: 'Sign Out?',
      message: 'Are you sure you want to sign out of your citizen profile?',
      confirmLabel: 'Sign Out',
      isDestructive: true,
      onConfirm: () => {
        logout();
        showToast('Signed out successfully', 'info');
        navigate('/');
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto space-y-5 animate-in fade-in duration-200 px-4 sm:px-6 pt-1 pb-16">
      {/* 1. Profile Header (Centered, Clean Compact iOS Apple ID Style) */}
      <div className="flex flex-col items-center text-center pt-2">
        <div className="relative w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] mx-auto mb-2 shrink-0">
          <div className="w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] rounded-full overflow-hidden bg-[#007AFF] text-white flex items-center justify-center font-bold text-xl shadow-2xs">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              name.charAt(0)
            )}
          </div>
          <label
            htmlFor="avatar-upload"
            className="absolute -bottom-0.5 -right-0.5 p-1 rounded-full bg-[#007AFF] text-white shadow-2xs cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            title="Upload photo"
          >
            <Camera className="w-3 h-3" />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex items-center justify-center gap-1.5 mb-0.5">
          <h1 className="text-[17px] sm:text-[19px] font-bold text-black dark:text-white leading-tight">
            {name}
          </h1>
          <Badge variant="verified">
            <CheckCircle2 className="w-3 h-3 text-[#34C759]" /> Verified
          </Badge>
        </div>

        <p className="text-[12px] text-[#8E8E93]">
          {email} • {city || 'Quezon City'}, {province || 'Metro Manila'}
        </p>
      </div>

      {/* 2. Personal Information Inset Grouped Form */}
      <form onSubmit={handleSaveProfile} className="space-y-5">
        <div>
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-[#8E8E93] mb-2 px-1">
            Personal Information
          </h2>
          <div className="bg-white dark:bg-[#1C1C1E] rounded-[16px] overflow-hidden border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] text-[14px]">
            <div className="flex items-center px-4 py-2.5">
              <span className="w-28 sm:w-36 text-[13px] text-[#8E8E93] shrink-0">Full Name</span>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="min-w-0 flex-1 bg-transparent text-black dark:text-white text-[13px] sm:text-[14px] font-medium focus:outline-none"
              />
            </div>

            <div className="flex items-center px-4 py-2.5">
              <span className="w-28 sm:w-36 text-[13px] text-[#8E8E93] shrink-0">Email Address</span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="min-w-0 flex-1 bg-transparent text-black dark:text-white text-[13px] sm:text-[14px] font-medium focus:outline-none"
              />
            </div>

            <div className="flex items-center px-4 py-2.5">
              <span className="w-28 sm:w-36 text-[13px] text-[#8E8E93] shrink-0">Mobile Number</span>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="0917 000 0000"
                className="min-w-0 flex-1 bg-transparent text-black dark:text-white text-[13px] sm:text-[14px] font-medium focus:outline-none"
              />
            </div>

            <div className="flex items-center px-4 py-2.5">
              <span className="w-28 sm:w-36 text-[13px] text-[#8E8E93] shrink-0">City / Town</span>
              <input
                type="text"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Quezon City, Manila..."
                className="min-w-0 flex-1 bg-transparent text-black dark:text-white text-[13px] sm:text-[14px] font-medium focus:outline-none"
              />
            </div>

            <div className="flex items-center px-4 py-2.5">
              <span className="w-28 sm:w-36 text-[13px] text-[#8E8E93] shrink-0">Province</span>
              <input
                type="text"
                value={province}
                onChange={e => setProvince(e.target.value)}
                placeholder="Metro Manila, Cebu..."
                className="min-w-0 flex-1 bg-transparent text-black dark:text-white text-[13px] sm:text-[14px] font-medium focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Preferences & Alert Settings */}
        <div>
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-[#8E8E93] mb-2 px-1">
            Preferences & Alerts
          </h2>
          <div className="bg-white dark:bg-[#1C1C1E] rounded-[16px] overflow-hidden border border-[rgba(60,60,67,0.12)] dark:border-[rgba(84,84,88,0.35)] divide-y divide-[rgba(60,60,67,0.1)] dark:divide-[rgba(84,84,88,0.3)] text-[14px]">
            {/* In-App Notifications Switch */}
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <span className="text-[14px] font-medium text-black dark:text-white block">
                  In-App Notifications
                </span>
                <span className="text-[12px] text-[#8E8E93]">
                  Receive updates regarding service procedures and deadlines
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifEnabled}
                onChange={e => setNotifEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-[#007AFF] focus:ring-[#007AFF] cursor-pointer"
              />
            </div>

            {/* Emergency Alerts Switch */}
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <span className="text-[14px] font-medium text-black dark:text-white block">
                  Emergency & Disaster Advisories
                </span>
                <span className="text-[12px] text-[#8E8E93]">
                  Priority emergency alerts from NDRRMC and PAGASA
                </span>
              </div>
              <input
                type="checkbox"
                checked={emergencyAlerts}
                onChange={e => setEmergencyAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-[#007AFF] focus:ring-[#007AFF] cursor-pointer"
              />
            </div>

            {/* Dark Mode toggle */}
            <div className="flex items-center justify-between px-4 py-3">
              <div>
                <span className="text-[14px] font-medium text-black dark:text-white block">
                  Interface Theme
                </span>
                <span className="text-[12px] text-[#8E8E93]">
                  Currently in {theme === 'dark' ? 'Dark' : 'Light'} Mode
                </span>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="p-1.5 rounded-[8px] bg-[rgba(118,118,128,0.12)] dark:bg-[rgba(118,118,128,0.24)] text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {theme === 'dark' ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-yellow-500" />}
              </button>
            </div>
          </div>
        </div>

        {/* 4. Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            type="submit"
            disabled={saving}
            className="w-full h-11 rounded-[12px] bg-[#007AFF] hover:bg-blue-600 active:scale-[0.98] text-white font-semibold text-[15px] flex items-center justify-center gap-1.5 shadow-ios-sm transition-all cursor-pointer"
          >
            <Save className="w-4 h-4 stroke-[2.2]" />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full h-11 rounded-[12px] bg-[rgba(255,59,48,0.1)] hover:bg-[rgba(255,59,48,0.18)] active:scale-[0.98] text-[#FF3B30] font-semibold text-[15px] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 stroke-[2.2]" />
            <span>Sign Out</span>
          </button>
        </div>
      </form>
    </div>
  );
};
