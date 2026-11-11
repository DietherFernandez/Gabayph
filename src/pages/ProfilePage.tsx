import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Camera,
  Mail,
  Phone,
  MapPin,
  Moon,
  Sun,
  LogOut,
  Save,
  CheckCircle2
} from 'lucide-react';
import { TextInput } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useToast } from '../context/ToastContext';

export const ProfilePage: React.FC = () => {
  const { user, updateUser, logout, theme, toggleTheme, role, navigate } = useApp();
  const { showToast } = useToast();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [city, setCity] = useState(user.city);
  const [province, setProvince] = useState(user.province);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);

  const [notifEnabled, setNotifEnabled] = useState(user.notificationsEnabled);
  const [emergencyAlerts, setEmergencyAlerts] = useState(user.emergencyAlertsEnabled);

  const [saving, setSaving] = useState(false);

  // Handle local image file preview
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarUrl(result);
        updateUser({ avatarUrl: result });
        showToast('Nai-update ang iyong profile photo preview!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      updateUser({
        name,
        email,
        phone,
        city,
        province,
        avatarUrl,
        notificationsEnabled: notifEnabled,
        emergencyAlertsEnabled: emergencyAlerts
      });
      showToast('Matagumpay na nai-save ang iyong profile settings!', 'success');
    }, 500);
  };

  const handleLogout = () => {
    if (window.confirm('Nais mo bang mag-logout mula sa iyong citizen account?')) {
      logout();
      showToast('Naka-logout na mula sa iyong account.', 'info');
      navigate('/');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Profile Header Card */}
      <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-6 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Avatar with upload trigger */}
          <div className="relative group shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-ios-navy text-white flex items-center justify-center font-bold text-2xl ring-4 ring-ios-lightSecondary dark:ring-ios-darkSecondary shadow-ios">
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                name.charAt(0)
              )}
            </div>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 p-1.5 rounded-full bg-ios-navy hover:bg-ios-navyLight text-white shadow-ios-sm cursor-pointer transition-transform group-hover:scale-110"
              title="Mag-upload ng bagong profile photo"
            >
              <Camera className="w-3.5 h-3.5" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-xl font-bold text-ios-lightText dark:text-ios-darkText">
                {name}
              </h1>
              <Badge variant="verified">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Beripikadong Mamamayan
              </Badge>
            </div>
            <p className="text-xs text-ios-lightMuted dark:text-ios-darkMuted mb-2">
              {email} • {city}, {province}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="text-[11px] font-medium bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightMuted px-2.5 py-0.5 rounded-full">
                Role: <strong className="text-ios-lightText dark:text-ios-darkText uppercase">{role}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Personal Information Form */}
      <form onSubmit={handleSaveProfile} className="space-y-6">
        <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-6 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ios-lightMuted dark:text-ios-darkMuted">
            Personal na Impormasyon
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="Buong Pangalan"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              leadingIcon={<User className="w-4 h-4" />}
            />
            <TextInput
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              leadingIcon={<Mail className="w-4 h-4" />}
            />
            <TextInput
              label="Numero ng Mobile"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              leadingIcon={<Phone className="w-4 h-4" />}
            />
            <TextInput
              label="Lungsod / Bayan"
              value={city}
              onChange={e => setCity(e.target.value)}
              leadingIcon={<MapPin className="w-4 h-4" />}
            />
          </div>

          <TextInput
            label="Lalawigan / Probinsya"
            value={province}
            onChange={e => setProvince(e.target.value)}
            placeholder="Metro Manila, Cebu, Davao del Sur..."
          />
        </div>

        {/* Preferences & Settings */}
        <div className="bg-ios-lightSurface dark:bg-ios-darkSurface p-6 rounded-ios-xl border border-ios-lightBorder dark:border-ios-darkBorder shadow-ios-sm space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ios-lightMuted dark:text-ios-darkMuted">
            Mga Kagustuhan at Abiso
          </h2>

          <div className="divide-y divide-ios-lightBorder/80 dark:divide-ios-darkBorder/80">
            {/* Notification toggle */}
            <div className="flex items-center justify-between py-3">
              <div>
                <span className="text-sm font-semibold text-ios-lightText dark:text-ios-darkText block">
                  Mga Abiso sa App
                </span>
                <span className="text-xs text-ios-lightMuted dark:text-ios-darkMuted">
                  Makatanggap ng abiso kapag may update sa mga serbisyo
                </span>
              </div>
              <input
                type="checkbox"
                checked={notifEnabled}
                onChange={e => setNotifEnabled(e.target.checked)}
                className="w-5 h-5 rounded text-ios-navy focus:ring-ios-navy cursor-pointer"
              />
            </div>

            {/* Emergency alerts toggle */}
            <div className="flex items-center justify-between py-3">
              <div>
                <span className="text-sm font-semibold text-ios-lightText dark:text-ios-darkText block">
                  Mga Alerto sa Kalamidad at Sakuna
                </span>
                <span className="text-xs text-ios-lightMuted dark:text-ios-darkMuted">
                  Priority push broadcast alerts mula sa NDRRMC at PAGASA
                </span>
              </div>
              <input
                type="checkbox"
                checked={emergencyAlerts}
                onChange={e => setEmergencyAlerts(e.target.checked)}
                className="w-5 h-5 rounded text-ios-navy focus:ring-ios-navy cursor-pointer"
              />
            </div>

            {/* Dark Mode toggle */}
            <div className="flex items-center justify-between py-3">
              <div>
                <span className="text-sm font-semibold text-ios-lightText dark:text-ios-darkText block">
                  Tema ng Interface (Dark Mode)
                </span>
                <span className="text-xs text-ios-lightMuted dark:text-ios-darkMuted">
                  Kasalukuyang naka-{theme === 'dark' ? 'Dark' : 'Light'} Mode
                </span>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-ios-lg bg-ios-lightSecondary dark:bg-ios-darkSecondary text-ios-lightText dark:text-ios-darkText border border-ios-lightBorder dark:border-ios-darkBorder"
              >
                {theme === 'dark' ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-yellow-500" />}
              </button>
            </div>
          </div>
        </div>

        {/* Save button & Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            loading={saving}
            className="w-full sm:w-auto"
          >
            <Save className="w-4 h-4" /> I-save ang mga Pagbabago
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleLogout}
            className="w-full sm:w-auto text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900"
          >
            <LogOut className="w-4 h-4" /> Mag-logout
          </Button>
        </div>
      </form>
    </div>
  );
};
