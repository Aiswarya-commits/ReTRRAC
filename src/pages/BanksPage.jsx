import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Landmark, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  PhoneCall, 
  Calendar,
  Layers,
  Activity,
  Cpu,
  Sparkles
} from 'lucide-react';
import FloatingElements from '../components/common/FloatingElements';
import { bankingBespokeServices } from '../data/siteData';

export default function BanksPage() {
  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      
      {/* 1. HERO BANNER WITH SKYSCRAPER BACKDROP & FLOATING PARTICLES */}
      <div className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600" 
            alt="Banking Architecture" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-indigo-950/80 to-purple-950/80 z-0" /> */}

        {/* Floating Particles */}
        <FloatingElements count={6} theme="dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full floating-pill-dark text-cyan-300 text-xs font-bold uppercase tracking-wider animate-float-medium">
            <Landmark className="w-3.5 h-3.5 text-purple-400" />
            <span>Tier-1, Tier-2 & Neo-Banking Compliance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Banks & Financial Institutions
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Customised strategies and cutting-edge RegTech solutions to identify, prevent, and report financial crime risks across international jurisdictions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* 2. REGULATORY OVERVIEW & LOGOS (Matches Screenshot 3) */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Regulatory compliance in Banking and Financial Institutions is essential for establishing and implementing policies and procedures that adhere to both local and international compliance regulations. It is crucial for institutions to build trust, protect customers, ensure transparency, and extend protection beyond their customer base.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In order to achieve regulatory compliance, institutions must adhere to various requirements, including licensing and supervision, building a regulatory framework, maintaining capital adequacy and effective risk management, meeting reporting and disclosure requirements, conducting customer due diligence, ensuring consumer data privacy and protection, preventing money laundering and counter-terrorism financing, implementing internal controls and audits, managing outsourcing and vendor relationships, and providing training and awareness programs.
          </p>
          <p className="text-xs sm:text-sm text-indigo-900 font-semibold leading-relaxed">
            By prioritising regulatory compliance, banking and financial institutions can uphold their reputation, safeguard their customers, and contribute to a more secure and trustworthy financial system.
          </p>

          {/* Regulatory Authority Badges (Matches Screenshot 3: PRA, FCA, FATF) */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
            <div className="px-6 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 shadow-sm flex items-center space-x-2 hover:border-indigo-300 transition-colors">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>Prudential Regulation Authority (PRA)</span>
            </div>
            <div className="px-6 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 shadow-sm flex items-center space-x-2 hover:border-purple-300 transition-colors">
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              <span>Financial Conduct Authority (FCA)</span>
            </div>
            <div className="px-6 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 shadow-sm flex items-center space-x-2 hover:border-cyan-300 transition-colors">
              <ShieldCheck className="w-5 h-5 text-cyan-600" />
              <span>Financial Action Task Force (FATF)</span>
            </div>
          </div>
        </div>

        {/* 3. BESPOKE SERVICES (11 CARDS - Matches Screenshot 3) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
              Institutional Deliverables
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Bespoke Services</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Eleven specialized compliance and RegTech operational workflows designed for banking groups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bankingBespokeServices.map((service, idx) => (
              <div 
                key={service.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:border-purple-300 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-xl bg-purple-50 text-indigo-600 font-bold text-xs flex items-center justify-center border border-purple-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      Banking Module
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {service.title}
                  </h3>

                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    {service.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100">
                  <Link
                    to="/contact"
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                  >
                    <span>Request Service Scoping</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. BOOK A FREE CONSULTATION TODAY (Matches Screenshot 3 Bottom) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-950 opacity-90" />
          
          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Book a FREE Consultation today
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Speak with our senior banking regulatory directors regarding FCA/PRA reporting, RCSA frameworks, or CLM screening integration.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-xl hover:bg-slate-100 transition-all"
              >
                <span>Schedule your Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
