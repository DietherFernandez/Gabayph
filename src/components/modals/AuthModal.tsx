import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../common/Modal';
import { TextInput } from '../common/Input';
import { Button } from '../common/Button';
import { SegmentedControl } from '../common/SegmentedControl';
import { Eye, EyeOff, Lock, Mail, User as UserIcon, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalTab, login } = useApp();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(authModalTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [regErrors, setRegErrors] = useState<{ [key: string]: string }>({});

  const validateLogin = () => {
    const errors: { email?: string; password?: string } = {};
    if (!loginEmail.trim()) {
      errors.email = 'Kailangang ilagay ang iyong email address.';
    } else if (!/\S+@\S+\.\S+/.test(loginEmail)) {
      errors.email = 'Hindi wasto ang format ng email address.';
    }
    if (!loginPassword) {
      errors.password = 'Kailangang ilagay ang iyong password.';
    } else if (loginPassword.length < 6) {
      errors.password = 'Ang password ay dapat hindi bababa sa 6 na karakter.';
    }
    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login(loginEmail, loginEmail.split('@')[0]);
      showToast('Maligayang pagbabalik! Matagumpay kang nakapag-login.', 'success');
      closeAuthModal();
    }, 600);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login('juan.delacruz@citizen.gov.ph', 'Juan Dela Cruz');
      showToast('Naka-login gamit ang Demo Citizen Account!', 'success');
      closeAuthModal();
    }, 400);
  };

  const validateRegister = () => {
    const errors: { [key: string]: string } = {};
    if (!regName.trim()) {
      errors.name = 'Kailangang ilagay ang buong pangalan.';
    }
    if (!regEmail.trim()) {
      errors.email = 'Kailangang ilagay ang email address.';
    } else if (!/\S+@\S+\.\S+/.test(regEmail)) {
      errors.email = 'Hindi wasto ang format ng email.';
    }
    if (!regPassword) {
      errors.password = 'Kailangang ilagay ang password.';
    } else if (regPassword.length < 6) {
      errors.password = 'Ang password ay dapat hindi bababa sa 6 na karakter.';
    }
    if (regPassword !== regConfirmPassword) {
      errors.confirmPassword = 'Hindi magkatugma ang dalawang password.';
    }
    if (!termsAgreed) {
      errors.terms = 'Kailangan mong tanggapin ang Mga Tuntunin at Patakaran.';
    }
    setRegErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegister()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login(regEmail, regName);
      showToast('Matagumpay ang pagpaparehistro! Maligayang pagdating sa GabayPH.', 'success');
      closeAuthModal();
    }, 700);
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      maxWidth="md"
      title="GabayPH Citizen Account"
      subtitle="I-access ang iyong naka-save na serbisyo at mga abiso"
    >
      <div className="space-y-4 pt-1">
        {/* Tab Switcher */}
        <div className="flex justify-center">
          <SegmentedControl
            options={[
              { value: 'login', label: 'Mag-login' },
              { value: 'register', label: 'Magparehistro' }
            ]}
            value={activeTab}
            onChange={setActiveTab}
            className="w-full"
          />
        </div>

        {/* Demo Account Quick-Fill Card */}
        <div className="p-3 rounded-ios-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-ios-navy dark:text-blue-400 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold text-ios-navy dark:text-blue-300">Subukan Agad:</span>{' '}
              <span className="text-ios-lightMuted dark:text-ios-darkMuted">
                Gamitin ang verified citizen preview profile.
              </span>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleDemoLogin}
            loading={isLoading}
            className="text-xs py-1 px-2.5 shrink-0 bg-white dark:bg-slate-900"
          >
            Demo Login
          </Button>
        </div>

        {/* LOGIN FORM */}
        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <TextInput
              label="Email Address"
              type="email"
              required
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              placeholder="halimbawa: maria@citizen.gov.ph"
              leadingIcon={<Mail className="w-4 h-4" />}
              error={loginErrors.email}
            />

            <div>
              <TextInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                required
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="Ilagay ang iyong password"
                leadingIcon={<Lock className="w-4 h-4" />}
                trailingIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                error={loginErrors.password}
              />
              <div className="flex items-center justify-between mt-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-ios-lightMuted dark:text-ios-darkMuted">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="rounded text-ios-navy focus:ring-ios-navy"
                  />
                  <span>Tandaan ako</span>
                </label>
                <button
                  type="button"
                  onClick={() => showToast('Ang simulated password reset link ay ipinadala sa iyong email.', 'info')}
                  className="text-ios-navy dark:text-blue-400 hover:underline font-medium"
                >
                  Nakalimutan ang password?
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              loading={isLoading}
            >
              Mag-login sa GabayPH
            </Button>
          </form>
        ) : (
          /* REGISTRATION FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-3">
            <TextInput
              label="Buong Pangalan"
              required
              value={regName}
              onChange={e => setRegName(e.target.value)}
              placeholder="Juan Santos Dela Cruz"
              leadingIcon={<UserIcon className="w-4 h-4" />}
              error={regErrors.name}
            />

            <TextInput
              label="Email Address"
              type="email"
              required
              value={regEmail}
              onChange={e => setRegEmail(e.target.value)}
              placeholder="juan@halimbawa.com"
              leadingIcon={<Mail className="w-4 h-4" />}
              error={regErrors.email}
            />

            <TextInput
              label="Password (Minimum 6 na karakter)"
              type={showPassword ? 'text' : 'password'}
              required
              value={regPassword}
              onChange={e => setRegPassword(e.target.value)}
              placeholder="Lumikha ng matibay na password"
              leadingIcon={<Lock className="w-4 h-4" />}
              error={regErrors.password}
            />

            <TextInput
              label="Kumpirmahin ang Password"
              type={showPassword ? 'text' : 'password'}
              required
              value={regConfirmPassword}
              onChange={e => setRegConfirmPassword(e.target.value)}
              placeholder="Ulitin ang password"
              leadingIcon={<Lock className="w-4 h-4" />}
              error={regErrors.confirmPassword}
            />

            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-ios-lightMuted dark:text-ios-darkMuted">
                <input
                  type="checkbox"
                  checked={termsAgreed}
                  onChange={e => setTermsAgreed(e.target.checked)}
                  className="rounded text-ios-navy focus:ring-ios-navy mt-0.5"
                />
                <span>
                  Sumasang-ayon ako sa mga <span className="text-ios-navy dark:text-blue-400 font-medium">Tuntunin ng Paggamit</span> at <span className="text-ios-navy dark:text-blue-400 font-medium">Patakaran sa Pagkapribado</span> alinsunod sa Data Privacy Act ng 2012 (RA 10173).
                </span>
              </label>
              {regErrors.terms && <p className="text-xs text-red-500 mt-1">{regErrors.terms}</p>}
            </div>

            <Button
              type="submit"
              variant="green"
              className="w-full mt-2"
              loading={isLoading}
            >
              Gumawa ng Citizen Account
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
};
