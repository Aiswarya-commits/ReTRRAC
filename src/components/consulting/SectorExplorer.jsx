import React, { useState } from 'react';
import { 
  Landmark, 
  Calculator, 
  Scale, 
  Building2, 
  Gem, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  FileText, 
  ShieldCheck,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { consultingSectors } from '../../data/siteData';

export default function SectorExplorer({ onOpenRiskScanner, onOpenCopilot }) {
  const [activeSectorId, setActiveSectorId] = useState(consultingSectors[0].id);

  const iconMap = {
    banks: Landmark,
    accountants: Calculator,
    lawyers: Scale,
    estate: Building2,
    high_value_dealers: Gem
  };

  const activeSector = consultingSectors.find(s => s.id === activeSectorId) || consultingSectors[0];
  const ActiveIcon = iconMap[activeSector.id] || Landmark;

  return (
    <section id="consulting" className="py-24 bg-slate-50/70 border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Statutory Compliance Consulting</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Consulting Tailored for <span className="text-gradient">Regulated Sectors</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            We combine two decades of Fortune 500 leadership with cutting-edge RegTech solutions to protect your firm against severe regulatory penalties under MLR 2017 and international standards.
          </p>
        </div>

        {/* Sector Tabs Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {consultingSectors.map((sector) => {
            const Icon = iconMap[sector.id] || Landmark;
            const isActive = sector.id === activeSectorId;
            return (
              <button
                key={sector.id}
                id={`sector-${sector.id}`}
                onClick={() => setActiveSectorId(sector.id)}
                className={`flex items-center space-x-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                  isActive
                    ? 'bg-gradient-tech text-white shadow-indigo-500/25 scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-100/80 border border-slate-200/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-200' : 'text-indigo-600'}`} />
                <span>{sector.title}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Sector Spotlight Display */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl shadow-indigo-500/5 relative overflow-hidden transition-all duration-300">
          
          {/* Top Gradient Border */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <ActiveIcon className="w-8 h-8" />
                </div>
                <div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                    {activeSector.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                    {activeSector.title}
                  </h3>
                </div>
              </div>

              <p className="text-lg font-semibold text-indigo-900 leading-snug">
                {activeSector.tagline}
              </p>

              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {activeSector.description}
              </p>

              {/* Statutory Requirements Checklist */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Mandatory Compliance Elements & Deliverables:
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {activeSector.bulletPoints.map((point, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 text-sm text-slate-700 hover:bg-purple-50/50 hover:border-purple-200 transition-colors"
                    >
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                      <span className="font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={onOpenRiskScanner}
                  className="px-6 py-3 rounded-xl bg-gradient-tech text-white font-bold text-xs sm:text-sm hover:opacity-95 transition-all shadow-md shadow-indigo-500/20 flex items-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Audit Your {activeSector.title.split('&')[0]} Firm</span>
                </button>

                <a
                  href="https://retrrac.org/wp-content/uploads/2025/01/ReTRRAC-Brochure.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-all flex items-center space-x-2"
                >
                  <Download className="w-4 h-4 text-slate-600" />
                  <span>Download Sector Brochure</span>
                </a>
              </div>

            </div>

            {/* Right Side: Quick Diagnostic / Guidance Card */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="rounded-2xl p-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-200">
                      ReTRRAC AI Sector Copilot
                    </span>
                  </div>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-slate-300">
                    Regulatory Advisor
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-xs text-slate-300">
                  <p className="leading-relaxed">
                    Have questions about statutory risk reviews, supervisory audits by HMRC/SRA, or automated CDD workflows for <strong className="text-white">{activeSector.title}</strong>?
                  </p>
                  
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                    <p className="font-semibold text-white">Suggested questions for AI Copilot:</p>
                    <button
                      onClick={onOpenCopilot}
                      className="block w-full text-left p-2 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-200 text-xs transition-colors"
                    >
                      → "What are the common audit findings in {activeSector.title}?"
                    </button>
                    <button
                      onClick={onOpenCopilot}
                      className="block w-full text-left p-2 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-200 text-xs transition-colors"
                    >
                      → "How does ReTRRAC assist with MLR 2017 remediation?"
                    </button>
                  </div>

                  <button
                    onClick={onOpenCopilot}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 text-slate-950 font-bold text-xs transition-all shadow"
                  >
                    Open AI Compliance Copilot
                  </button>
                </div>
              </div>

              {/* Supervisory Authority Box */}
              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-purple-700" />
                  <span className="text-xs font-bold text-purple-900">Regulatory Oversight Bodies</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Our frameworks directly align with HMRC, the Financial Conduct Authority (FCA), the Solicitors Regulation Authority (SRA), and professional accountancy bodies (ICAEW, ACCA).
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
