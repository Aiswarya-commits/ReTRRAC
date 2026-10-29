import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Download, 
  CheckCircle2, 
  Landmark, 
  Calculator, 
  Scale, 
  Building2, 
  Gem, 
  ChevronRight,
  Zap
} from 'lucide-react';
import { consultingSectors } from '../data/siteData';
import FloatingElements from '../components/common/FloatingElements';

export default function ComplianceConsultingPage({ onOpenRiskScanner }) {
  const iconMap = {
    banks: Landmark,
    accountants: Calculator,
    lawyers: Scale,
    estate: Building2,
    high_value_dealers: Gem
  };

  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      
      {/* Hero Banner with Floating Particles */}
      <div className="relative py-24 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white overflow-hidden">
        <div className="glow-orb w-96 h-96 -top-20 -left-20 bg-indigo-500/20" />
        <div className="glow-orb w-96 h-96 -bottom-20 -right-20 bg-purple-500/20" />

        {/* Floating particles */}
        <FloatingElements count={6} theme="dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full floating-pill-dark text-cyan-300 text-xs font-bold uppercase tracking-wider animate-float-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Statutory Supervisory Advisory</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Compliance Consulting
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Full-spectrum regulatory transformation, MLR 2017 remediation, and risk review solutions tailored to your industry sector.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Five Regulated Domains, One Standard of <span className="text-gradient">Excellence</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Whether supervised by the PRA, FCA, SRA, OPBAS, or HMRC, ReTRRAC provides the expertise, audit-ready documentation, and automated RegTech to guarantee compliance.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenRiskScanner}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 font-bold text-xs hover:bg-purple-100 transition-all shadow-sm"
            >
              <Zap className="w-4 h-4 text-purple-600" />
              <span>Launch Free AI Compliance Risk Audit</span>
            </button>
          </div>
        </div>

        {/* 5 Sectors Deep Dive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {consultingSectors.map((sector) => {
            const Icon = iconMap[sector.id] || Landmark;
            return (
              <div 
                key={sector.id}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                      {sector.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {sector.title}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-900/80 mt-1">
                      {sector.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {sector.summary}
                  </p>

                  <div className="space-y-2 pt-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Key Deliverables:</p>
                    {sector.bulletPoints.slice(0, 3).map((bp, bIdx) => (
                      <div key={bIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{bp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    to={sector.path}
                    className="w-full py-2.5 rounded-xl bg-gradient-tech hover:opacity-95 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-1"
                  >
                    <span>View Dedicated Sector Page</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* RegTech CLM Highlight Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-7 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                Proprietary Technology
              </span>
              <h3 className="text-2xl font-extrabold text-white">
                Client’s Lifecycle Management (CLM)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated customer onboarding, sanctions screening, PEP checks, and continuous monitoring covering 237 countries and 150M+ companies.
              </p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-cyan-200">
                Seamless API & portal integration for your compliance team.
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800">
              <Link
                to="/clients-lifecycle-management"
                className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center space-x-1"
              >
                <span>Explore CLM RegTech System</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white text-center space-y-6 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Need an Urgent Supervisory Gap-Audit?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">Contact our London Headquarters to schedule a confidential compliance review.</p>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-xl hover:bg-slate-100 transition-all"
            >
              <span>Schedule your Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
