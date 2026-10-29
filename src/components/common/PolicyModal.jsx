import React from 'react';
import { X, ShieldCheck, FileText, Lock, Cookie, RotateCcw } from 'lucide-react';
import { policiesData } from '../../data/siteData';

export default function PolicyModal({ isOpen, policyKey, onClose }) {
  if (!isOpen || !policyKey || !policiesData[policyKey]) return null;

  const policy = policiesData[policyKey];

  const getIcon = () => {
    switch (policyKey) {
      case 'privacy': return <Lock className="w-6 h-6 text-purple-600" />;
      case 'terms': return <FileText className="w-6 h-6 text-indigo-600" />;
      case 'cancellation': return <RotateCcw className="w-6 h-6 text-pink-600" />;
      case 'dataProtection': return <ShieldCheck className="w-6 h-6 text-blue-600" />;
      case 'cookie': return <Cookie className="w-6 h-6 text-amber-600" />;
      default: return <FileText className="w-6 h-6 text-purple-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient bar */}
        <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
        
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-100">
                {getIcon()}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{policy.title}</h3>
                <p className="text-xs text-slate-500">Effective Date: {policy.lastUpdated} • ReTRRAC Global</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 text-slate-600 leading-relaxed text-sm max-h-[60vh] overflow-y-auto pr-2 space-y-4">
            <p>{policy.content}</p>
            
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500">
              <p className="font-semibold text-slate-700 mb-1">Supervisory Inquiries & Compliance Contact:</p>
              <p>For inquiries regarding data governance, AML policies, or certification rights, contact our Data Protection Officer at <a href="mailto:info@retrrac.org" className="text-purple-600 hover:underline">info@retrrac.org</a> or our London Global Headquarters.</p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-medium text-sm hover:bg-purple-900 transition-all shadow-md"
            >
              Close Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
