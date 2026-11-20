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
import PageBanner from '../components/common/PageBanner';
import { consultingSectors } from '../data/siteData';

export default function EstateAgencyPage() {
  const sector = consultingSectors.find(s => s.id === 'estate') || consultingSectors[3];

  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      
      {/* Banner – same light, logo-coloured style as every other page */}
      <PageBanner
        title="Estate & Letting Agency Business"
        highlight="Letting Agency Business"
        parent={{ label: 'Consulting', to: '/compliance-consulting' }}
        subtitle="Safeguarding real estate agencies and letting businesses against illicit financial exploitation and money laundering."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1600"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        
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
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
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
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-accent-500 text-white font-bold text-xs sm:text-sm shadow-xl hover:bg-accent-600 transition-all"
              >
                <Download className="w-4 h-4 text-brand-600" />
                <span>Download Catalogue</span>
              </a>
            </div>
          </div>
        </div>

        {/* Consultation Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-800 via-brand-700 to-brand-600 text-white text-center space-y-6 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Book a FREE Consultation today</h3>
          <p className="text-xs sm:text-sm text-brand-200 max-w-xl mx-auto">Speak with our London property compliance specialists to ensure complete MLR 2017 readiness.</p>
          <div>
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-accent-500 text-white font-bold text-xs sm:text-sm shadow-xl hover:bg-accent-600 transition-all"
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