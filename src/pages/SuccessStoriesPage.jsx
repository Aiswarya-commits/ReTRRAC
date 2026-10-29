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
import FloatingElements from '../components/common/FloatingElements';
import { successStories } from '../data/siteData';

export default function SuccessStoriesPage({ onOpenRiskScanner }) {
  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      
      {/* Hero Banner with Floating Particles */}
      <div className="relative py-24 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white overflow-hidden">
        <div className="glow-orb w-96 h-96 -top-20 -left-20 bg-purple-500/20" />
        <div className="glow-orb w-96 h-96 -bottom-20 -right-20 bg-indigo-500/20" />

        {/* Floating particles */}
        <FloatingElements count={6} theme="dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full floating-pill-dark text-cyan-300 text-xs font-bold uppercase tracking-wider animate-float-medium">
            <Trophy className="w-3.5 h-3.5 text-purple-400" />
            <span>Proven Regulatory Track Record</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Our Success Stories
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Examining how ReTRRAC helps regulated firms navigate complex MLR 2017 audits, avoid fines, and modernize compliance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        <div className="space-y-12 max-w-4xl mx-auto mb-20">
          {successStories.map((story, idx) => (
            <div 
              key={story.id}
              className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl shadow-indigo-500/5 space-y-6 relative overflow-hidden"
            >
              <div className="h-2 absolute top-0 left-0 right-0 bg-gradient-tech" />
              
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
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

                <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                  <h4 className="font-bold text-indigo-900 mb-1">ReTRRAC Strategic Intervention:</h4>
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
                  className="px-6 py-2.5 rounded-xl bg-purple-50 text-purple-900 font-bold text-xs hover:bg-purple-100 transition-colors"
                >
                  ⚡ Audit Your Firm’s Risk Exposure
                </button>

                <Link
                  to="/contact"
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-indigo-900 transition-colors"
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
