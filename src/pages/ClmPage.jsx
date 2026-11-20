import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  Globe2, 
  ScanLine, 
  Database, 
  ShieldAlert, 
  UserCheck, 
  FileCheck2, 
  Check, 
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';
import ParallaxCard from '../components/common/ParallaxCard';
import PageBanner from '../components/common/PageBanner';
import { clmTechnology } from '../data/siteData';

export default function ClmPage() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const pillarIcons = [ShieldAlert, UserCheck, FileCheck2];

  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      
      {/* Banner – same light, logo-coloured style as every other page */}
      <PageBanner
        title="Client’s Lifecycle Management (CLM) System"
        highlight="Lifecycle Management"
        parent={{ label: 'Consulting', to: '/compliance-consulting' }}
        subtitle={clmTechnology.tagline}
        image="/hero-building.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        
        {/* Overview & Key Stats */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {clmTechnology.overview}
          </p>
        </div>

        {/* Global Scale Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="p-7 rounded-3xl bg-gradient-to-br from-brand-50/70 to-brand-50/50 border border-brand-100 flex items-start space-x-4">
            <div className="p-3.5 rounded-2xl bg-brand-600 text-white shrink-0 shadow-md">
              <Globe2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-black text-brand-900">237 Countries</p>
              <p className="text-xs text-slate-600 mt-1">Full global coverage with local regulatory watchlist compliance.</p>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-gradient-to-br from-brand-50/70 to-accent-50/50 border border-brand-100 flex items-start space-x-4">
            <div className="p-3.5 rounded-2xl bg-brand-600 text-white shrink-0 shadow-md">
              <ScanLine className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-black text-brand-900">13,000+ IDs</p>
              <p className="text-xs text-slate-600 mt-1">Automated biometric, MRZ, and NFC verification across international passports & IDs.</p>
            </div>
          </div>

          <div className="p-7 rounded-3xl bg-gradient-to-br from-brand-50/70 to-blue-50/50 border border-brand-100 flex items-start space-x-4">
            <div className="p-3.5 rounded-2xl bg-brand-600 text-white shrink-0 shadow-md">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-black text-brand-900">150M+ Entities</p>
              <p className="text-xs text-slate-600 mt-1">Automated KYB lookup across 50+ business registers worldwide.</p>
            </div>
          </div>
        </div>

        {/* Interactive 3 Pillars Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
          
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Three Architecture Pillars</h3>
            {clmTechnology.pillars.map((pillar, idx) => {
              const Icon = pillarIcons[idx] || ShieldAlert;
              const isActive = activePillarIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setActivePillarIndex(idx)}
                  className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-50/80 border-brand-400 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`p-2.5 rounded-xl ${
                      isActive ? 'bg-brand-600 text-white shadow' : 'bg-slate-100 text-slate-700'
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

          <div className="lg:col-span-7">
            <ParallaxCard maxTilt={8}>
              <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center space-x-3">
                      <span className="p-2 rounded-lg bg-brand-500/20 text-brand-400 border border-brand-500/30">
                        <Layers className="w-5 h-5" />
                      </span>
                      <div>
                        <h4 className="text-xl font-bold">{clmTechnology.pillars[activePillarIndex].category}</h4>
                        <p className="text-xs text-slate-400">{clmTechnology.pillars[activePillarIndex].description}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-brand-400 bg-brand-950/60 px-3 py-1 rounded-full border border-brand-800">
                      Live RegTech
                    </span>
                  </div>

                  <div className="space-y-3">
                    {clmTechnology.pillars[activePillarIndex].features.map((feat, fIdx) => (
                      <div key={fIdx} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                        <div className="flex items-center space-x-2 text-brand-300 font-bold text-xs sm:text-sm">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{feat.name}</span>
                        </div>
                        <p className="text-xs text-slate-300 pl-6 leading-relaxed">
                          {feat.detail}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <span className="text-xs text-slate-400">SOC2 & UK GDPR Compliant</span>
                    <Link
                      to="/contact"
                      className="px-5 py-2.5 rounded-xl bg-gradient-tech text-white font-bold text-xs shadow"
                    >
                      Request System Demo →
                    </Link>
                  </div>
                </div>
              </div>
            </ParallaxCard>
          </div>

        </div>

      </div>

    </div>
  );
}