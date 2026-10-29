import React from 'react';
import { 
  Trophy, 
  CheckCircle, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  FileCheck2,
  Building
} from 'lucide-react';
import ParallaxCard from '../common/ParallaxCard';
import { successStories } from '../../data/siteData';

export default function SuccessStories({ onOpenRiskScanner }) {
  return (
    <section id="stories" className="py-24 bg-slate-50/60 border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5 text-emerald-600" />
            <span>Proven Client Results</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Our <span className="text-gradient">Success Stories</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            We combine industry expertise and cutting-edge technology to go beyond the status quo, helping our clients navigate complex regulatory scrutiny and avoid crippling fines under MLR 2017.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {successStories.map((story, idx) => (
            <ParallaxCard key={story.id} maxTilt={6}>
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl shadow-indigo-500/5 relative overflow-hidden h-full flex flex-col justify-between">
                
                {/* Accent top gradient line */}
                <div className={`h-2 absolute top-0 left-0 right-0 ${
                  idx === 0 ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-purple-600 to-pink-600'
                }`} />

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {story.tag}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      Case Study 0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      {story.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center">
                      <Building className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      Client Profile: {story.client}
                    </p>
                  </div>

                  {/* Challenge & Solution */}
                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100">
                      <strong className="text-rose-900 block mb-1">Regulatory Challenge:</strong>
                      {story.challenge}
                    </div>

                    <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                      <strong className="text-indigo-900 block mb-1">ReTRRAC Strategy & Solution:</strong>
                      {story.solution}
                    </div>
                  </div>

                  {/* Results Highlights */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Measurable Outcomes:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {story.results.map((res, rIdx) => (
                        <div key={rIdx} className="flex items-center space-x-2 text-xs font-semibold text-slate-800">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">100% Client Penalty Protection</span>
                  <button
                    onClick={onOpenRiskScanner}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                  >
                    <span>Assess Your Exposure</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </ParallaxCard>
          ))}
        </div>

      </div>
    </section>
  );
}
