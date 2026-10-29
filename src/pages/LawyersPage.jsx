import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  FolderLock, 
  FileCheck2,
  BookOpen
} from 'lucide-react';

import FloatingElements from '../components/common/FloatingElements';

export default function LawyersPage() {
  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      
      {/* 1. HERO BANNER WITH GAVEL/LEGAL BACKDROP (Matches Screenshot 5) */}
      <div className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img 
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1600" 
            alt="Lawyers & Legal Compliance" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-indigo-950/80 to-purple-950/80 z-0" /> */}

        {/* Floating Ambient Particles & Glows */}
        <FloatingElements count={6} theme="dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full floating-pill-dark text-cyan-300 text-xs font-bold uppercase tracking-wider animate-float-medium">
            <Scale className="w-3.5 h-3.5 text-purple-400" />
            <span>SRA & Regulation 18 Compliance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Lawyers & Solicitors
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Ensuring legal practices strictly adhere to Solicitors Regulation Authority (SRA) rules and Money Laundering Regulations 2017.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* 2. REGULATION 18 MANDATES (Matches Screenshot 5) */}
        <div className="max-w-4xl mx-auto space-y-8 mb-20 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p>
            Law firms must regularly conduct thorough assessments to identify and evaluate the risks of money laundering they may encounter. These assessments should be conducted at the practice-wide, client, and matter levels. Practice Wide Risk Assessments (PWRAs) are mandated by Regulation 18 of the Money Laundering, Terrorist Financing and Transfer of Funds (Information on the Payer) Regulations 2017 (MLR 2017).
          </p>
          <p>
            PWRAs should be comprehensive in their identification and evaluation of all money laundering and terrorist financing risks faced by the practice. The PWRA is a crucial component of the anti-money laundering (AML) controls implemented throughout the business and must address specific issues outlined in the Regulations.
          </p>
          <p>
            Client risk assessments should focus on identifying and evaluating ML/TF risks at the individual client level. Matter risk assessments should be conducted for each new matter involving a client, especially when risks are unique or non-repetitive. As a Compliance Officer for Legal Practice (COLP), it is imperative to adhere to the guidelines set forth in MLR 2017. The following documents must be completed, reviewed, and signed off on an annual basis:
          </p>

          {/* Legal Compliance Checklist Card */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-4">
            
            <div className="flex items-start space-x-3 text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Customer Due Diligence (CDD):</strong> Screening for Sanctions, Proliferation financing, SDN list search, PEP / RCA / SIP, and Adverse / Negative news.
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Identification of the Source of Funds (SoF) & Source of Wealth (SoW):</strong> Assessing plausibility, Red Flags, Internal SAR protocols, and Escalation to the National Crime Agency (NCA).
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs sm:text-sm">
              <FolderLock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Policy Packs:</strong>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-600 pl-2">
                  <li>AML policy, controls and procedures (PCP)</li>
                  <li>Anti-Bribery & Corruption Policy</li>
                  <li>Data Protection Policy & Computer Use Policy</li>
                  <li>Website & Social Media Policy</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">AML Training for staff:</strong> Training material, certificates, and verifiable annual training logs for legal practitioners and support staff.
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Practice-wide risk assessment (PWRA), Client and Matter Risk assessment:</strong> By diligently following these guidelines and conducting thorough risk assessments, law firms can effectively mitigate the risks associated with money laundering and terrorist financing.
              </div>
            </div>

          </div>
        </div>

        {/* 3. CATALOGUE DOWNLOAD BANNER (Matches Screenshot 5 Center Banner) */}
        <div className="relative rounded-3xl p-10 sm:p-14 bg-slate-900 text-white text-center space-y-6 mb-20 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200" 
              alt="Legal Practitioners" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 opacity-90" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Mandatory Compliance Training Catalogue for Lawyers & Solicitors
            </h3>
            <p className="text-xs sm:text-sm text-purple-200">
              Download our SRA-compliant training catalog, Source of Funds verification checklists, and PWRA templates.
            </p>
            <div className="pt-2">
              <a
                href="https://retrrac.org/wp-content/uploads/2025/01/ReTRRAC-Brochure.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-xl hover:bg-slate-100 transition-all"
              >
                <Download className="w-4 h-4 text-purple-600" />
                <span>Download Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4. LEGAL SUPERVISORY LOGOS (Matches Screenshot 5: FCA, HMRC, OPBAS, The Law Society, SRA) */}
        <div className="mb-20 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
            Legal Regulatory Authorities Aligned
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {["FCA", "HM Revenue & Customs", "OPBAS", "The Law Society", "Solicitors Regulation Authority (SRA)"].map((name, idx) => (
              <div key={idx} className="px-6 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 shadow-sm flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. BOOK A FREE CONSULTATION TODAY (Matches Screenshot 5 Bottom) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-4 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Book a FREE Consultation today
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Schedule a confidential discussion with our senior legal compliance consultants regarding your firm's PWRA or SRA audit preparation.
            </p>
            <div className="pt-2">
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

    </div>
  );
}
