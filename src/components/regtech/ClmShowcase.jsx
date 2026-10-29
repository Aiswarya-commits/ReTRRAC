import React, { useState } from 'react';
import { 
  ShieldAlert, 
  UserCheck, 
  FileCheck2, 
  Globe2, 
  Search, 
  Check, 
  ArrowRight, 
  Cpu, 
  Layers, 
  Database,
  ScanLine
} from 'lucide-react';
import ParallaxCard from '../common/ParallaxCard';
import { clmTechnology } from '../../data/siteData';

export default function ClmShowcase() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  const pillarIcons = [ShieldAlert, UserCheck, FileCheck2];

  return (
    <section id="clm" className="py-24 bg-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="glow-orb w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-cyan-600" />
            <span>Proprietary RegTech Infrastructure</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Client’s Lifecycle Management <span className="text-gradient">(CLM) System</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {clmTechnology.overview}
          </p>
        </div>

        {/* Global Reach Highlight Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-purple-50/40 border border-indigo-100 flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-indigo-600 text-white shrink-0 shadow-md shadow-indigo-600/20">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-indigo-900">237 Countries</p>
              <p className="text-xs text-slate-600 mt-1">
                Full-spectrum global jurisdictional screening and regulatory data alignment.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/60 to-pink-50/40 border border-purple-100 flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-purple-600 text-white shrink-0 shadow-md shadow-purple-600/20">
              <ScanLine className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-purple-900">13,000+ Documents</p>
              <p className="text-xs text-slate-600 mt-1">
                Automated biometric and OCR identity verification across global government ID types.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-50/60 to-blue-50/40 border border-cyan-100 flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-cyan-600 text-white shrink-0 shadow-md shadow-cyan-600/20">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-cyan-900">150M+ Entities</p>
              <p className="text-xs text-slate-600 mt-1">
                Instant KYB retrieval across 50+ national business registries and company registers.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Pillars Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Pillar Navigation / Tabs */}
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Three Architecture Pillars
            </p>
            
            {clmTechnology.pillars.map((pillar, idx) => {
              const Icon = pillarIcons[idx] || ShieldAlert;
              const isActive = activePillarIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActivePillarIndex(idx)}
                  className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-purple-50/80 border-purple-300 shadow-md shadow-purple-500/10'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`p-2.5 rounded-xl ${
                      isActive ? 'bg-indigo-600 text-white shadow' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{pillar.category}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{pillar.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pillar Details & Interactive Screen */}
          <div className="lg:col-span-7">
            <ParallaxCard maxTilt={8}>
              <div className="bg-slate-900 text-white rounded-3xl p-7 sm:p-9 border border-slate-800 shadow-2xl relative overflow-hidden">
                
                {/* Glow orbs inside card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                    <div className="flex items-center space-x-3">
                      <span className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                        <Layers className="w-5 h-5" />
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-white">
                          {clmTechnology.pillars[activePillarIndex].category}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {clmTechnology.pillars[activePillarIndex].description}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-3 py-1 rounded-full border border-cyan-800">
                      Module 0{activePillarIndex + 1}
                    </span>
                  </div>

                  {/* Feature Breakdown List */}
                  <div className="mt-6 space-y-4">
                    {clmTechnology.pillars[activePillarIndex].features.map((feat, fIdx) => (
                      <div key={fIdx} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                        <div className="flex items-center space-x-2 text-cyan-300 font-bold text-sm">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{feat.name}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed pl-6">
                          {feat.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Integrated with FCA, HMRC & European registries</span>
                    <a
                      href="#contact"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs transition-all shadow"
                    >
                      Request CLM Demo
                    </a>
                  </div>
                </div>

              </div>
            </ParallaxCard>
          </div>

        </div>

      </div>
    </section>
  );
}
