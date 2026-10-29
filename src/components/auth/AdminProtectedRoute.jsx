import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, KeyRound, ArrowRight, Home, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AdminProtectedRoute({ children }) {
  const { isAdmin, signIn } = useAuth();
  const [passcodeInput, setPasscodeInput] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);

  if (isAdmin) return <>{children}</>;

  const handleVerifyPasscode = async (e) => {
    e.preventDefault();
    setError('');
    setChecking(true);
    const res = await signIn({ email: 'ren@retrrac.org', isAdminMode: true, adminPasscode: passcodeInput });
    setChecking(false);
    if (!res.success) setError(res.error || 'Invalid passcode. Access denied.');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 pt-24 font-sans text-white">
      <div className="max-w-md w-full bg-slate-900 border border-purple-500/30 rounded-3xl p-8 shadow-2xl space-y-6 text-center relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-purple-900/60 border border-purple-400/40 text-purple-300 flex items-center justify-center mx-auto shadow-lg shadow-purple-900/50">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-red-950/80 text-red-400 border border-red-800/40 inline-block">
            Restricted Access
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white">London Deanery Admin Gateway</h2>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
            Only authorised ReTRRAC Academy administrators can view candidate records and control course fulfilment.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-semibold">{error}</div>
        )}

        <form onSubmit={handleVerifyPasscode} className="space-y-3 text-left">
          <div>
            <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
              Administrator Passcode
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3.5 top-3 text-purple-400" />
              <input
                type="password"
                required
                autoComplete="current-password"
                value={passcodeInput}
                onChange={(e) => setPasscodeInput(e.target.value)}
                placeholder="Enter passcode"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono tracking-wider"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={checking}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-60 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center space-x-2"
          >
            {checking ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            <span>{checking ? 'Verifying…' : 'Authorize & Unlock Dashboard'}</span>
            {!checking && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-end text-xs text-slate-400">
          <Link to="/" className="flex items-center space-x-1 hover:text-white transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}