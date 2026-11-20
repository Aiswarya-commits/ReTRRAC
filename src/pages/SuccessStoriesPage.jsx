import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  CheckCircle, 
  ArrowRight, 
  ShieldCheck, 
  Building, 
  FileCheck2 
} from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import { successStories } from '../data/siteData';

export default function SuccessStoriesPage({ onOpenRiskScanner }) {
  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      
      {/* Banner – same light, logo-coloured style as every other page */}
      <PageBanner
        title="Our Success Stories"
        highlight="Success Stories"
        subtitle="Examining how ReTRRAC helps regulated firms navigate complex MLR 2017 audits, avoid fines, and modernise compliance."
        image="/Build.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        
        <div className="space-y-12 max-w-4xl mx-auto mb-20">
          {successStories.map((story, idx) => (
            <div 
              key={story.id}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl shadow-brand-500/5 space-y-6 relative overflow-hidden"
            >
              <div className="h-2 absolute top-0 left-0 right-0 bg-gradient-tech" />
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-200">
                  {story.tag}
                </span>
                <span className="text-xs font-bold text-slate-400">Case Study 0{idx + 1}</span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{story.title}</h2>
                <p className="text-xs font-semibold text-slate-500 mt-1">Client Profile: {story.client}</p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100">
                  <h4 className="font-bold text-rose-900 mb-1">Regulatory Background & Vulnerability:</h4>
                  <p>{story.challenge}</p>
                </div>

                <div className="p-5 rounded-2xl bg-brand-50/60 border border-brand-100">
                  <h4 className="font-bold text-brand-900 mb-1">ReTRRAC Strategic Intervention:</h4>
                  <p>{story.solution}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Client Results:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {story.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-center space-x-2 text-xs font-semibold text-slate-800">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={onOpenRiskScanner}
                  className="px-6 py-2.5 rounded-xl bg-brand-50 text-brand-900 font-bold text-xs hover:bg-brand-100 transition-colors"
                >
                  ⚡ Audit Your Firm’s Risk Exposure
                </button>

                <Link
                  to="/contact"
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-brand-900 transition-colors"
                >
                  Book Consultation →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}