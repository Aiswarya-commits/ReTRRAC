import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, FileText, Lock, Cookie, RotateCcw, ArrowLeft } from 'lucide-react';
import { policiesData } from '../data/siteData';

export default function PolicyPage({ defaultKey }) {
  const { policySlug } = useParams();

  // Find policy either by defaultKey prop or by slug
  let policy = null;
  if (defaultKey && policiesData[defaultKey]) {
    policy = policiesData[defaultKey];
  } else if (policySlug) {
    policy = Object.values(policiesData).find(p => p.slug === policySlug);
  }

  if (!policy) {
    policy = policiesData.privacy;
  }

  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      
      {/* Hero Banner */}
      <div className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3">
          <Link to="/" className="inline-flex items-center text-xs text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black">{policy.title}</h1>
          <p className="text-xs text-slate-400">Effective Date: {policy.lastUpdated} • ReTRRAC Global Ltd.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p>{policy.content}</p>

          <div className="p-6 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2 text-xs text-slate-600">
            <h4 className="font-bold text-purple-950">Statutory Governance & Compliance Officer</h4>
            <p>
              ReTRRAC Global Ltd. is registered in the United Kingdom. For data protection inquiries or policy disclosures, contact: <a href="mailto:info@retrrac.org" className="text-purple-700 underline font-semibold">info@retrrac.org</a>.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
