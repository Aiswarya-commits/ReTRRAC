import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle, AlertCircle, ArrowRight, Search, Loader2 } from 'lucide-react';
import { api } from '../lib/api';

// Only certificates that the admin really issued (stored on the server) are shown as valid.
export default function VerifyCertificatePage() {
  const { certId } = useParams();
  const navigate = useNavigate();
  const [certData, setCertData] = useState(null);
  const [loading, setLoading] = useState(Boolean(certId));
  const [input, setInput] = useState(certId || '');

  useEffect(() => {
    setInput(certId || '');
    if (!certId) {
      setCertData(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    api(`/api/verify/${encodeURIComponent(certId)}`)
      .then((data) => setCertData(data))
      .catch(() => setCertData({ valid: false, certificateId: certId }))
      .finally(() => setLoading(false));
  }, [certId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = input.trim().toUpperCase();
    if (id) navigate(`/verify/${encodeURIComponent(id)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">

        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ReTRRAC Certificate Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Digital Credential Verification</h1>
          <p className="text-xs text-slate-300">Enter the certificate ID printed on the certificate.</p>

          <form onSubmit={handleSubmit} className="pt-3 max-w-md mx-auto flex space-x-2 bg-white/10 p-1.5 rounded-2xl border border-white/20">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. CPD-UK-RETRRAC-2026-1A2B3C"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-semibold font-mono uppercase placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-tech text-white font-bold text-xs">
              Verify
            </button>
          </form>
        </div>

        <div className="p-8 sm:p-10 space-y-6">
          {loading ? (
            <div className="py-10 flex justify-center">
              <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
            </div>
          ) : !certId ? (
            <p className="text-center text-xs text-slate-500 py-6">
              Employers and regulators can confirm any ReTRRAC certificate here.
            </p>
          ) : certData?.valid ? (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-600/20">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-emerald-950">Credential Status: Active &amp; Valid</h3>
                  <p className="text-xs text-emerald-800">This certificate was issued by ReTRRAC Global Academy.</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5 text-xs text-slate-700">
                {[
                  ['Certificate Number', <strong key="id" className="font-mono text-indigo-700 text-sm">{certData.certificateId}</strong>],
                  ['Awarded To', <strong key="to" className="text-slate-900 text-sm">{certData.recipient}</strong>],
                  ['Qualification / Program', <strong key="c" className="text-slate-900">{certData.course}</strong>],
                  ['Accreditation Body', <strong key="a" className="text-purple-700">{certData.accreditation}</strong>],
                  ['Issue Date', <strong key="d" className="text-slate-800">{certData.awardedDate}</strong>],
                  ['Awarding Institution', <strong key="i" className="text-slate-800 text-right">{certData.institution}</strong>]
                ].map(([label, value], i, arr) => (
                  <div key={label} className={`flex justify-between gap-4 ${i < arr.length - 1 ? 'border-b border-slate-200 pb-2.5' : ''}`}>
                    <span className="text-slate-400 font-semibold uppercase text-[10px]">{label}</span>
                    {value}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <Link
                  to="/retrrac-academy"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-2"
                >
                  <span>Explore ReTRRAC Academy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-slate-800">Return to Home</Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-3">
              <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">Certificate Not Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No issued certificate matches <span className="font-mono font-bold">{certId}</span>. Check the ID or contact{' '}
                <a href="mailto:info@retrrac.org" className="text-indigo-600 font-semibold">info@retrrac.org</a>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}