import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck,
  UserCheck
} from 'lucide-react';
import FloatingElements from '../components/common/FloatingElements';
import { consultingSectors } from '../data/siteData';

export default function EstateAgencyPage() {
  const sector = consultingSectors.find(s => s.id === 'estate') || consultingSectors[3];

  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      
      {/* Hero Banner with Floating Particles */}
      <div className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1600" 
            alt="Estate & Letting Agency" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-purple-950/80 to-indigo-950/80 z-0" /> */}

        {/* Floating particles */}
        <FloatingElements count={6} theme="dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full floating-pill-dark text-cyan-300 text-xs font-bold uppercase tracking-wider animate-float-medium">
            <Building2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Property Sector MLR 2017 Compliance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Estate & Letting Agency Business
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Safeguarding real estate agencies and letting businesses against illicit financial exploitation and money laundering.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* Regulatory Details */}
        <div className="max-w-4xl mx-auto space-y-8 mb-20 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p>
            The Money Laundering, Terrorist Financing, and Transfer of Funds (Information on the Payer) Regulations 2017 (MLR 2017) set out specific statutory requirements for estate and letting agency businesses to prevent their services from being exploited for illegal financial activities.
          </p>
          <p>
            These regulations mandate the appointment of a Money Laundering Reporting Officer (MLRO), the implementation of robust anti-money laundering (AML) policies and procedures, the performance of customer due diligence (CDD), the provision of comprehensive staff training, and the regular execution of risk assessments.
          </p>

          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Key Compliance Requirements for Estate Agents:</h3>
            {sector.bulletPoints.map((bp, idx) => (
              <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <span className="text-slate-800">{bp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brochure CTA */}
        <div className="rounded-3xl p-10 bg-slate-900 text-white text-center space-y-6 mb-20 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-3 max-w-xl mx-auto">
            <h3 className="text-2xl font-extrabold">Compliance Training Catalogue for Estate & Letting Agents</h3>
            <p className="text-xs text-slate-300">Download our HMRC-compliant training modules, CDD workflows, and MLRO manuals.</p>
            <div className="pt-2">
              <a
                href="https://retrrac.org/wp-content/uploads/2025/01/ReTRRAC-Brochure.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-xl hover:bg-slate-100 transition-all"
              >
                <Download className="w-4 h-4 text-cyan-600" />
                <span>Download Catalogue</span>
              </a>
            </div>
          </div>
        </div>

        {/* Consultation Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-950 via-cyan-950 to-indigo-950 text-white text-center space-y-6 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Book a FREE Consultation today</h3>
          <p className="text-xs sm:text-sm text-cyan-200 max-w-xl mx-auto">Speak with our London property compliance specialists to ensure complete MLR 2017 readiness.</p>
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
