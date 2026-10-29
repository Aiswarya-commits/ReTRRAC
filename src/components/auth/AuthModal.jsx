import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  User,
  Mail,
  KeyRound,
  ShieldCheck,
  ArrowRight,
  Building,
  Globe,
  Phone,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCurrency } from '../../context/CurrencyContext';
export default function AuthModal() {
  const {
    isAuthModalOpen,
    authModalMode,
    authModalMessage,
    closeAuthModal,
    signIn,
    signUp
  } = useAuth();
  const navigate = useNavigate();
  const { currency, setCurrency } = useCurrency();

  // India → ₹ INR (Cashfree). Everywhere else → £ GBP (PayPal).
  const applyCurrencyFor = (user) => {
    if (!user || user.role === 'admin') return;
    setCurrency(user.country === 'India' ? 'INR' : 'GBP');
  };
  const [activeTab, setActiveTab] = useState(authModalMode || 'signin');
  const [isAdminMode, setIsAdminMode] = useState(authModalMode === 'admin');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminPasscode, setAdminPasscode] = useState('');

  // Register fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [country, setCountry] = useState(currency === 'INR' ? 'India' : 'United Kingdom');
  useEffect(() => {
    setActiveTab(authModalMode === 'admin' ? 'signin' : (authModalMode || 'signin'));
    setIsAdminMode(authModalMode === 'admin');
    setError('');
    setSuccess('');
    if (isAuthModalOpen) setCountry(currency === 'INR' ? 'India' : 'United Kingdom');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authModalMode, isAuthModalOpen]);
  if (!isAuthModalOpen) return null;

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setBusy(true);

    const res = await signIn({
      email,
      password,
      isAdminMode,
      adminPasscode
    });
    setBusy(false);

    if (!res.success) {
      setError(res.error);
    } else {
      setSuccess(`Signed in successfully as ${res.user.name}`);
      if (isAdminMode) navigate('/admin/dashboard');
      else applyCurrencyFor(res.user);    }
  };
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const res = signUp({
      name,
      email,
      password,
      phone,
      organization,
      country
    });

    if (!res.success) {
      setError(res.error);
    } else {
      setSuccess(`Account created! Welcome to ReTRRAC, ${res.user.name}`);
      applyCurrencyFor(res.user);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto animate-fade-in font-sans">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">

        {/* Header */}
        <div className={`p-6 text-white relative transition-colors ${isAdminMode
          ? 'bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900'
          : 'bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900'
          }`}>
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider mb-1.5 text-cyan-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{isAdminMode ? 'London Deanery Admin Gateway' : 'ReTRRAC Academy Candidate Portal'}</span>
          </div>

          <h3 className="text-xl font-black">
            {activeTab === 'signin'
              ? (isAdminMode ? 'Administrator Authentication' : 'Candidate Sign In')
              : 'Create Candidate Account'}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            {isAdminMode
              ? 'Restricted to Deanery staff with authorized master credentials'
              : 'Sign in to book courses, access learning materials, and track your orders'}
          </p>
        </div>

        {/* Optional Action Message */}
        {authModalMessage && (
          <div className="p-3 bg-purple-50 border-b border-purple-200 text-purple-900 text-xs font-bold flex items-center space-x-2 px-6">
            <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
            <span>{authModalMessage}</span>
          </div>
        )}

        <div className="p-6 space-y-5">

          {/* Tabs */}
          <div className="flex border-b border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('signin');
                setError('');
              }}
              className={`pb-3 flex-1 border-b-2 transition-colors ${activeTab === 'signin'
                ? 'border-indigo-600 text-indigo-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('signup');
                setIsAdminMode(false);
                setError('');
              }}
              className={`pb-3 flex-1 border-b-2 transition-colors ${activeTab === 'signup'
                ? 'border-indigo-600 text-indigo-600 font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
            >
              Register as New Scholar
            </button>
          </div>

          {/* Feedback messages */}
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-start space-x-2 animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{success}</span>
            </div>
          )}

          {/* TAB 1: SIGN IN */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignInSubmit} className="space-y-4 text-xs">

              {!isAdminMode && (<>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. a.finch@mayfaircapital.co.uk"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Password *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </>)}

              {/* Admin Special Passcode Toggle */}
              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isAdminMode}
                    onChange={(e) => setIsAdminMode(e.target.checked)}
                    className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                  />
                  <span className="font-bold text-purple-900 text-xs flex items-center">
                    <KeyRound className="w-3.5 h-3.5 mr-1 text-purple-700" />
                    London Deanery Admin Sign In
                  </span>
                </label>

                {isAdminMode && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200 space-y-2 animate-fade-in">
                    <label className="block font-bold text-purple-950 text-[11px] uppercase tracking-wider">
                      Master Administrator Passcode *
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 absolute left-3.5 top-2.5 text-purple-500" />
                      <input
                        type="password"
                        required={isAdminMode}
                        value={adminPasscode}
                        onChange={(e) => setAdminPasscode(e.target.value)}
                        placeholder="Enter administrator passcode"
                        autoComplete="current-password"
                        className="w-full pl-10 pr-3 py-2 rounded-xl border border-purple-300 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={busy}
                className={`w-full py-3.5 disabled:opacity-60 rounded-xl text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 ${isAdminMode
                  ? 'bg-gradient-to-r from-purple-800 to-indigo-900 hover:opacity-95 shadow-purple-500/20'
                  : 'bg-slate-900 hover:bg-slate-800 shadow-slate-900/10'
                  }`}
              >
                <span>{busy ? 'Checking…' : isAdminMode ? 'Verify & Access Admin Dashboard' : 'Sign In & Continue'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}

          {/* TAB 2: REGISTER NEW SCHOLAR */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5 text-xs">

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Legal Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alistair Finch"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <span className="text-[10px] text-slate-400 pl-1">Will appear on your official CPD UK Certificate</span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Corporate / Personal Email *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. a.finch@mayfaircapital.co.uk"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Create Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Choose a secure password"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={country === 'India' ? '98765 43210' : '+44 7700 900123'}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="India">🇮🇳 India</option>
                    <option value="United Arab Emirates">🇦🇪 UAE</option>
                    <option value="Singapore">🇸🇬 Singapore</option>
                    <option value="Other">🌐 Other International</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Firm / Organization (Optional)</label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Mayfair Capital Partners London"
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-tech text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all flex items-center justify-center space-x-2 mt-2"
              >
                <span>Create Account & Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}