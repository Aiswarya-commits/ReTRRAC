import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  Calendar,
  FileText,
  Sparkles,
  Users,
  CheckCircle2,
  Lock,
  CreditCard,
  Building2,
  ShieldCheck,
  MapPin,
  Download
} from 'lucide-react';
import FloatingElements from '../components/common/FloatingElements';
import PayPalCheckoutModal from '../components/payment/PayPalCheckoutModal';
import { academyData } from '../data/siteData';
import { useCurrency } from '../context/CurrencyContext';

export default function CafsCoursePage({ onOpenCopilot }) {
  const { cafsCourse } = academyData;
  const { currency, formatAmount } = useCurrency();
  const [payPalModalOpen, setPayPalModalOpen] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState('July 01, 2026 Cohort');

  const courseObject = {
    id: "cafs-specialist",
    code: "CAFS™",
    title: "Certified Anti-Financial Crime Specialist",
    category: "Accredited Certification",
    badge: "Flagship CPD Certification",
    duration: "60 Hours",
    priceGBP: 1250,
    priceINR: 125000,
    accreditation: "CPD UK Certified",
    cpdPoints: 60,
    upcomingCohort: selectedCohort
  };

  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden font-sans">

      {/* Hero Banner with UK Financial District Backdrop */}
      <div className="relative py-28 bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white overflow-hidden">
        <div className="glow-orb w-96 h-96 -top-20 -left-20 bg-purple-500/20" />
        <div className="glow-orb w-96 h-96 -bottom-20 -right-20 bg-indigo-500/20" />

        {/* Floating UK Particles */}
        <FloatingElements count={6} theme="dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-4 py-1.5 rounded-full bg-purple-900/80 border border-purple-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider flex items-center">
              <GraduationCap className="w-4 h-4 mr-1.5 text-purple-400" />
              {cafsCourse.badge}
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {cafsCourse.duration} (40h Lectures + 20h Live Project)
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-semibold flex items-center">
              <MapPin className="w-3 h-3 mr-1 text-cyan-300" /> London Studio Broadcast
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Certified Anti-Financial Crime Specialist <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-indigo-200">(CAFS™)</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            The globally recognized benchmark qualification for AML compliance, CDD/EDD investigation, sanctions advisory, and transaction monitoring under UK MLR 2017 & international FATF standards.
          </p>

          <div className="pt-2 flex items-center space-x-4 text-xs text-slate-400">
            <span className="flex items-center text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4 mr-1" /> CPD UK Accredited (60 Points)
            </span>
            <span>•</span>
            <span>Instructors: Former HSBC & Deutsche Bank MLROs</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Syllabus, Capstone & Features */}
          <div className="lg:col-span-7 space-y-10">

            {/* Takeaways */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Curriculum Takeaways & Regulatory Competencies
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {cafsCourse.takeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6-Module Syllabus Accordion */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-slate-900">
                Detailed 60-Hour Syllabus Structure:
              </h3>

              <div className="space-y-3">
                {[
                  {
                    num: "Module 1",
                    title: "Global Financial Crime Framework & UK MLR 2017 Regulations",
                    hours: "10 Hours",
                    desc: "In-depth study of POCA 2002, MLR 2017 amendments, 6AMLD, FCA supervisory manuals, and legal obligations of regulated gatekeepers."
                  },
                  {
                    num: "Module 2",
                    title: "Customer Due Diligence (CDD), Enhanced Due Diligence (EDD) & PEPs",
                    hours: "10 Hours",
                    desc: "Source of Wealth (SoW), Source of Funds (SoF), beneficial ownership (UBO) unravelling, and sanctions screening algorithms."
                  },
                  {
                    num: "Module 3",
                    title: "Sanctions Advisory, Proliferation Financing & OFSI Regime",
                    hours: "10 Hours",
                    desc: "UK OFSI, EU, UN, and US OFAC sanctions circumvention patterns, dual-use goods, and maritime shipping transshipment checks."
                  },
                  {
                    num: "Module 4",
                    title: "Transaction Monitoring, Red Flags & SAR Filings with UK NCA",
                    hours: "10 Hours",
                    desc: "Real-world scenarios identifying structuring, smurfing, crypto laundering, and drafting auditable SAR disclosures."
                  },
                  {
                    num: "Module 5",
                    title: "RegTech Automation & CLM Systems Architecture",
                    hours: "10 Hours",
                    desc: "Implementing automated IDV, optical character recognition (OCR), perpetual KYC triggers, and screening calibration."
                  },
                  {
                    num: "Module 6",
                    title: "Live 20-Hour Forensic Capstone Project & Viva Defense",
                    hours: "20 Hours",
                    desc: "Students receive an anonymized 5,000-transaction financial dossier to investigate, remediate, and present before a panel of former banking MLROs."
                  }
                ].map((mod, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">{mod.num}</span>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">{mod.hours}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{mod.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{mod.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Advisor Banner */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white flex items-center justify-between shadow-xl shadow-slate-900/10">
              <div className="space-y-1 pr-4">
                <p className="text-sm font-bold text-white flex items-center">
                  <Sparkles className="w-4 h-4 text-cyan-300 mr-1.5" />
                  Have questions regarding your career or syllabus eligibility?
                </p>
                <p className="text-xs text-slate-300">Ask the ReTRRAC AI Copilot for personalized learning advice.</p>
              </div>
              <button
                onClick={onOpenCopilot}
                className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs shrink-0 transition-colors"
              >
                Ask Copilot
              </button>
            </div>

          </div>

          {/* Right Column: Enrollment & PayPal Payment Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border-2 border-purple-200 shadow-2xl shadow-indigo-500/10 sticky top-28 space-y-6">

              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                  Tuition Investment
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Enrolling 2026 Batch
                </span>
              </div>

              <div>
                <p className="text-4xl font-black text-slate-900 text-gradient">
                  {formatAmount(1250, 125000)}
                </p>
                <p className="text-xs text-slate-500 mt-1">Full 60-Hour Programme + 20h LIVE Capstone Project</p>
              </div>

              {/* Course Badges */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Accreditation:</span>
                  <strong className="text-purple-700">CPD UK Standards Office</strong>
                </div>
                <div className="flex justify-between">
                  <span>Credits Conferred:</span>
                  <strong className="text-slate-900">60 CPD Points</strong>
                </div>
                <div className="flex justify-between">
                  <span>Format:</span>
                  <strong className="text-slate-900">Live Interactive Virtual + London Labs</strong>
                </div>
                <div className="flex justify-between">
                  <span>Assessment:</span>
                  <strong className="text-emerald-700">Capstone Project & Viva</strong>
                </div>
              </div>

              {/* Cohort Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Select Upcoming Batch:</label>
                <select
                  value={selectedCohort}
                  onChange={(e) => setSelectedCohort(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="July 01, 2026 Cohort">July 01, 2026 (Weekend Live Batch)</option>
                  <option value="July 15, 2026 Cohort">July 15, 2026 (Weekday Evening Batch)</option>
                  <option value="August 01, 2026 Cohort">August 01, 2026 (Global Fast-Track)</option>
                </select>
              </div>

              {/* Primary PayPal Checkout Button */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => setPayPalModalOpen(true)}
                  className="w-full py-4 px-6 rounded-2xl bg-[#FFC439] hover:bg-[#F4B400] text-slate-900 font-extrabold text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center space-x-2 border border-amber-400 group"
                >
                  {currency === 'INR' ? (
                    <span className="font-black text-[#6933D3]">₹ UPI / Card</span>
                  ) : (
                    <span className="italic font-black text-blue-900 tracking-tighter">Pay<span className="text-blue-600">Pal</span></span>
                  )}                  <span className="text-slate-800 font-bold">{currency === 'INR' ? 'with Cashfree' : 'with PayPal'}({formatAmount(1250, 125000)})</span>
                  <ArrowRight className="w-4 h-4 text-blue-900 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[11px] text-center text-slate-500 flex items-center justify-center space-x-1">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>Supports UK (£), India (₹), & International Credit Cards</span>
                </p>
              </div>

              {/* Brochure Download */}
              <div className="pt-2 border-t border-slate-100 text-center">
                <a
                  href="https://retrrac.org/wp-content/uploads/2025/01/ReTRRAC-Brochure.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center"
                >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  <span>Download Complete Syllabus Brochure (PDF)</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* PAYPAL CHECKOUT MODAL */}
      {payPalModalOpen && (
        <PayPalCheckoutModal
          isOpen={payPalModalOpen}
          onClose={() => setPayPalModalOpen(false)}
          course={courseObject}
          initialCohort={selectedCohort}
        />
      )}

    </div>
  );
}
