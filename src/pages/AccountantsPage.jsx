import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  FileCheck2, 
  AlertCircle,
  FolderLock,
  Sparkles
} from 'lucide-react';
import FloatingElements from '../components/common/FloatingElements';

export default function AccountantsPage() {
  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      
      {/* 1. HERO BANNER WITH LAPTOP/DOCUMENTS BACKDROP & FLOATING PARTICLES */}
      <div className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img 
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1600" 
            alt="Accounting & Bookkeeping" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-purple-950/80 to-indigo-950/80 z-0" /> */}

        {/* Floating Ambient Particles */}
        <FloatingElements count={6} theme="dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full floating-pill-dark text-cyan-300 text-xs font-bold uppercase tracking-wider animate-float-medium">
            <Calculator className="w-3.5 h-3.5 text-purple-400" />
            <span>MLR 2017 & Statutory Accounting Compliance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Accountants & Bookkeepers
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Meeting statutory OPBAS, HMRC, ICAEW, and ACCA supervisory standards to shield your practice from crippling fines.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* 2. SUPERVISORY MANDATE & MLRO REQUIREMENTS (Matches Screenshot 4) */}
        <div className="max-w-4xl mx-auto space-y-8 mb-20 text-slate-700 leading-relaxed text-sm sm:text-base">
          <p>
            All financial institutions, businesses, and gatekeepers are regulated by either the Financial Conduct Authority (FCA), the Office for Professional Body Anti-Money Laundering Supervision (OPBAS), or Her Majesty's Revenue and Customs (HMRC). The Association of Chartered Certified Accountants (ACCA) and the Institute of Chartered Accountants in England and Wales (ICAEW) serve as anti-money laundering (AML) supervisors.
          </p>
          <p>
            As part of their supervisory responsibilities, ACCA/ICAEW conduct a thorough desk-based review to evaluate your firm's compliance with the Money Laundering, Terrorist Financing, and Transfer of Funds (Information on the Payer) Regulations 2017 (MLR 2017). ACCA/ICAEW expects all supervised firms to provide reliable, complete, and accurate information. It is crucial for accountants to exercise caution when disclosing information about their AML controls. Accountancy firms must identify and assess the specific money laundering, terrorist financing, and proliferation financing risks they face, and clearly outline how these risks are mitigated.
          </p>
          <p className="font-semibold text-slate-900">
            Money Laundering Reporting Officers (MLRO) of an accountancy firm are obligated to adhere to the guidelines outlined in MLR 2017. This includes completing, reviewing, and signing off on the following documents annually:
          </p>

          {/* Statutory Requirements Card List */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 space-y-4">
            
            <div className="flex items-start space-x-3 text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Customer Due Diligence (CDD) / Know Your Customer (KYC):</strong> Risk mitigation, Risk review, Risk classification of all clients, AML searches, Sanction searches, Adverse news searches, PEP searches, and proliferation financing searches.
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Account Activity Review:</strong> Red Flags / Internal Suspicious Activity Reports (SAR), and Escalation to the National Crime Agency (NCA).
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs sm:text-sm">
              <FolderLock className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Policy Packs:</strong>
                <ul className="list-disc list-inside mt-1.5 space-y-1 text-slate-600 pl-2">
                  <li>AML policy, controls, and procedures (PCP)</li>
                  <li>Anti-Bribery & Corruption Policy</li>
                  <li>Data Protection Policy & Computer Use Policy</li>
                  <li>Website & Social Media Policy</li>
                </ul>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Mandatory compliance staff trainings:</strong> Training manual, certified completion certificates, and auditable annual training logs.
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900">Firm wide risk assessment (FWRA):</strong> Documented and updated annually based on client risk typologies and service offerings.
              </div>
            </div>

          </div>
        </div>

        {/* 3. CATALOGUE DOWNLOAD BANNER (Matches Screenshot 4 Center Banner) */}
        <div className="relative rounded-3xl p-10 sm:p-14 bg-slate-900 text-white text-center space-y-6 mb-20 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
              alt="Accountants Team" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-950 opacity-90" />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Mandatory Compliance Training Catalogue for Accountants & Bookkeepers
            </h3>
            <p className="text-xs sm:text-sm text-purple-200">
              Download our comprehensive CPD-accredited syllabus, training manuals, and audit checklist.
            </p>
            <div className="pt-2">
              <a
                href="https://retrrac.org/wp-content/uploads/2025/01/ReTRRAC-Brochure.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-xl hover:bg-slate-100 transition-all hover:scale-105"
              >
                <Download className="w-4 h-4 text-purple-600" />
                <span>Download Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4. SUPERVISORY LOGOS (Matches Screenshot 4: ACCA, ICAEW, CIMA, OPBAS, FCA, HMRC) */}
        <div className="mb-20 text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
            Supervisory & Professional Bodies Aligned
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {["ACCA", "ICAEW", "CIMA", "OPBAS", "FCA", "HM Revenue & Customs"].map((name, idx) => (
              <div key={idx} className="px-6 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 shadow-sm flex items-center space-x-2 hover:border-purple-300 transition-colors">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. BOOK A FREE CONSULTATION TODAY (Matches Screenshot 4 Bottom) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-4 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Book a FREE Consultation today
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Don't risk disciplinary action or severe HMRC/ACCA penalties. Let ReTRRAC audit your firm-wide risk assessment and AML policies.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-xl hover:bg-slate-100 transition-all hover:scale-105"
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
