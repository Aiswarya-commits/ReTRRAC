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
import PageBanner from '../components/common/PageBanner';
import { bankingBespokeServices } from '../data/siteData';

export default function BanksPage() {
  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      
      {/* Banner – same light, logo-coloured style as every other page */}
      <PageBanner
        title="Banks & Financial Institutions"
        highlight="Institutions"
        parent={{ label: 'Consulting', to: '/compliance-consulting' }}
        subtitle="Customised strategies and cutting-edge RegTech solutions to identify, prevent, and report financial crime risks across international jurisdictions."
        image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        
        {/* 2. REGULATORY OVERVIEW & LOGOS (Matches Screenshot 3) */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Regulatory compliance in Banking and Financial Institutions is essential for establishing and implementing policies and procedures that adhere to both local and international compliance regulations. It is crucial for institutions to build trust, protect customers, ensure transparency, and extend protection beyond their customer base.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            In order to achieve regulatory compliance, institutions must adhere to various requirements, including licensing and supervision, building a regulatory framework, maintaining capital adequacy and effective risk management, meeting reporting and disclosure requirements, conducting customer due diligence, ensuring consumer data privacy and protection, preventing money laundering and counter-terrorism financing, implementing internal controls and audits, managing outsourcing and vendor relationships, and providing training and awareness programmes.
          </p>
          <p className="text-xs sm:text-sm text-brand-900 font-semibold leading-relaxed">
            By prioritising regulatory compliance, banking and financial institutions can uphold their reputation, safeguard their customers, and contribute to a more secure and trustworthy financial system.
          </p>

          {/* Regulatory Authority Badges (Matches Screenshot 3: PRA, FCA, FATF) */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
            <div className="px-6 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 shadow-sm flex items-center space-x-2 hover:border-brand-300 transition-colors">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <span>Prudential Regulation Authority (PRA)</span>
            </div>
            <div className="px-6 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 shadow-sm flex items-center space-x-2 hover:border-brand-300 transition-colors">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <span>Financial Conduct Authority (FCA)</span>
            </div>
            <div className="px-6 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 shadow-sm flex items-center space-x-2 hover:border-brand-300 transition-colors">
              <ShieldCheck className="w-5 h-5 text-brand-600" />
              <span>Financial Action Task Force (FATF)</span>
            </div>
          </div>
        </div>

        {/* 3. BESPOKE SERVICES (11 CARDS - Matches Screenshot 3) */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
              Institutional Deliverables
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Bespoke Services</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Eleven specialised compliance and RegTech operational workflows designed for banking groups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bankingBespokeServices.map((service, idx) => (
              <div 
                key={service.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:border-brand-300 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 font-bold text-xs flex items-center justify-center border border-brand-100 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      0{idx + 1}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      Banking Module
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {service.title}
                  </h3>

                  <ul className="space-y-2 text-xs text-slate-600 leading-relaxed">
                    {service.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100">
                  <Link
                    to="/contact"
                    className="text-xs font-bold text-brand-600 hover:text-brand-800 flex items-center space-x-1"
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
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-800 via-brand-700 to-brand-600 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          
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
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-accent-500 text-white font-bold text-xs sm:text-sm shadow-xl hover:bg-accent-600 transition-all"
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