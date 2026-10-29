import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  Shield,
  ArrowRight,
  Download,
  CheckCircle2,
  Sparkles,
  Award,
  Landmark,
  Calculator,
  Scale,
  Building2,
  Gem,
  GraduationCap,
  Cpu,
  Zap,
  Phone,
  Mail,
  ChevronRight,
  ShieldCheck,
  Lock,
  Globe2,
  Activity,
  CreditCard,
  CheckCircle,
  MapPin,
  Clock,
  PlayCircle,
  Quote,
  Star
} from 'lucide-react';
import HeroSection from '../components/hero/HeroSection';
import ParallaxCard from '../components/common/ParallaxCard';
import FloatingElements from '../components/common/FloatingElements';
import PayPalCheckoutModal from '../components/payment/PayPalCheckoutModal';
import { siteMeta, consultingSectors, leadershipTeam, successStories } from '../data/siteData';
import { useCurrency } from '../context/CurrencyContext';
import TeamPreviewSection from '../components/team/TeamPreviewSection';

export default function HomePage({ onOpenRiskScanner, onOpenCopilot }) {
  const { currency, formatAmount } = useCurrency();
  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState(null);
  const [payPalModalOpen, setPayPalModalOpen] = useState(false);

  // Institution Programs for PayPal Checkout
  const featuredCourses = [
    {
      id: "cafs-specialist",
      code: "CAFS™",
      title: "Certified Anti-Financial Crime Specialist",
      category: "Accredited Certification",
      badge: "Flagship CPD Certification",
      duration: "60 Hours",
      breakdown: "40h Lectures + 20h Live Capstone Project",
      priceGBP: 1250,
      priceINR: 125000,
      accreditation: "CPD UK Certified",
      cpdPoints: 60,
      upcomingCohort: "July 01, 2026",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      summary: "The definitive qualification for AML, KYC, Sanctions, and Financial Crime risk management in the UK and globally.",
      highlights: [
        "20-Hour Live Forensic Capstone Project on real cases",
        "UK MLR 2017 & 6AMLD transaction monitoring drills",
        "Mentorship by former HSBC & Deutsche Bank leaders",
        "Verifiable CPD UK Digital Certificate & London Seal"
      ]
    },
    {
      id: "blackthrone-aml",
      code: "BT-SIM",
      title: "Blackthrone™ AML & Sanctions Evasion Simulation",
      category: "War Room Simulation",
      badge: "High-Intensity Lab",
      duration: "30 Hours",
      breakdown: "20h War Room Investigations + 10h Debrief",
      priceGBP: 850,
      priceINR: 85000,
      accreditation: "CPD UK Certified",
      cpdPoints: 30,
      upcomingCohort: "July 15, 2026",
      image: "https://media.istockphoto.com/id/2225405260/photo/london-cityscape-with-the-gherkin-building.jpg?s=612x612&w=0&k=20&c=0-JJ_-oCxKoq1fcRlE0bh4O_HhxvTRqYw2NvhCmQ-24=",
      summary: "Simulated high-pressure war room tackling complex offshore shell companies, crypto mixers, and sanctions evasion.",
      highlights: [
        "Synthetic UK banking transaction forensic dataset",
        "Live drafting and submission of NCA SAR filings",
        "Peer-reviewed tactical defense dossier submission",
        "Advanced investigative competency CPD credentials"
      ]
    },
    {
      id: "clm-regtech",
      code: "CLM-PRO",
      title: "Client Lifecycle Management & RegTech Architecture",
      category: "Executive Masterclass",
      badge: "RegTech Specialization",
      duration: "25 Hours",
      breakdown: "15h Architecture Labs + 10h Case Studies",
      priceGBP: 650,
      priceINR: 65000,
      accreditation: "CPD UK Certified",
      cpdPoints: 25,
      upcomingCohort: "August 01, 2026",
      image: "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=800&q=80",
      summary: "Master enterprise digital onboarding workflows, IDV biometrics, perpetual KYC, and scalable risk screening infrastructure.",
      highlights: [
        "Hands-on sandbox labs in ReTRRAC CLM engine",
        "FCA safeguarding & CASS 15 readiness blueprints",
        "API integrations with global watchlists and PEP databases",
        "CPD certificate in Enterprise RegTech Implementation"
      ]
    }
  ];

  // Testimonials inspired by DCM Operations caliber
  const testimonials = [
    {
      quote: "Deep technical knowledge, but equally important, the ability to integrate into an existing institutional structure to ensure value is added immediately. Exactly what our compliance desk required to satisfy FCA scrutiny.",
      author: "Chief Compliance Officer",
      org: "UK Trade Finance Bank, London",
      initials: "CC"
    },
    {
      quote: "The CAFS™ program and Blackthrone simulations elevated our entire AML analysis unit. The real-world transaction drills and SAR filing procedures gave our analysts the confidence to handle high-risk international audits.",
      author: "Global Head of Financial Crime",
      org: "Tier-1 UK FinTech & Electronic Money Institution",
      initials: "FC"
    },
    {
      quote: "ReTRRAC's Firm-Wide Risk Assessment templates and guidance helped us prepare our practice for ICAEW and HMRC supervisory review with zero findings. Outstanding professionalism and measured judgement.",
      author: "Senior Partner & MLRO",
      org: "Chartered Accounting Firm, Birmingham",
      initials: "SP"
    }
  ];

  const handleOpenPayPal = (course) => {
    setSelectedCourseForPayment(course);
    setPayPalModalOpen(true);
  };

  return (
    <div className="bg-white overflow-hidden font-sans">

      {/* 1. HERO SECTION WITH GSAP PARALLAX & UK VISUALS */}
      <HeroSection
        onOpenRiskScanner={onOpenRiskScanner}
        onOpenCopilot={onOpenCopilot}
        onOpenPayPal={handleOpenPayPal}
      />

      {/* 2. INSTITUTIONAL CLIENT LOGO / ACCREDITATION TICKER (Inspired by DCM Operations) */}
      <section className="py-10 bg-slate-50/80 border-y border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
            Trusted by Leaders Across Banking, Legal, and Accounting Gatekeepers
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
            <div className="flex items-center space-x-2 font-black text-slate-700 text-sm tracking-tight">
              <Landmark className="w-4 h-4 text-indigo-700" />
              <span>DEUTSCHE BANK ALUMNI</span>
            </div>
            <div className="flex items-center space-x-2 font-black text-slate-700 text-sm tracking-tight">
              <Building2 className="w-4 h-4 text-indigo-700" />
              <span>HSBC LEADERSHIP</span>
            </div>
            <div className="flex items-center space-x-2 font-black text-slate-700 text-sm tracking-tight">
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              <span>CPD UK STANDARDS</span>
            </div>
            <div className="flex items-center space-x-2 font-black text-slate-700 text-sm tracking-tight">
              <Scale className="w-4 h-4 text-indigo-700" />
              <span>SRA AML ADHERENCE</span>
            </div>
            <div className="flex items-center space-x-2 font-black text-slate-700 text-sm tracking-tight">
              <Calculator className="w-4 h-4 text-indigo-700" />
              <span>HMRC MLR 2017</span>
            </div>
            <div className="flex items-center space-x-2 font-black text-slate-700 text-sm tracking-tight">
              <Globe2 className="w-4 h-4 text-cyan-700" />
              <span>FATF / 6AMLD COMPLIANT</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "THE DIFFERENCE IS OUR DEPTH" BENTO GRID (Direct Homage to DCM Operations Caliber) */}
      <section id="services" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-800 border border-purple-200">
              Institutional Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              The difference is our <span className="text-gradient">depth</span>.
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Our model is built around speed, flexibility, and forensic specialism. We partner with an international client base comprising UK and Global Banks, FinTechs, EMIs, Brokers, Legal Firms, and Accountants.
            </p>
          </div>

          {/* 3 Main Pillars Bento Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Pillar 1: Financial Crime Risk Management */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-purple-300 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-purple-500/10 transition-all flex flex-col justify-between group">
              <div className="space-y-6">
                {/* <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                  <ShieldCheck className="w-7 h-7" />
                </div> */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pillar 01 • Risk Management</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">Financial Crime Risk Management</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
                    Our teams combine deep technical expertise with scalable delivery capability to strengthen controls, enhance frameworks, and provide confidence across AML, sanctions, and transaction monitoring.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                  <div className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-purple-700">Targeted Assurance</div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Business-Wide Risk Assessments (BWRA)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Independent AML Health Checks & Audits</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Sanctions Advisory & Screening Optimization</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/compliance-consulting/banks-financial-institutions"
                  className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-800 group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore Risk Management</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Pillar 2: Regulatory Compliance Consulting */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 hover:border-purple-300 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-purple-500/10 transition-all flex flex-col justify-between group">
              <div className="space-y-6">
                {/* <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-sm">
                  <Scale className="w-7 h-7" />
                </div> */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Pillar 02 • Advisory</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">Regulatory Compliance Consulting</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
                    Specialist compliance support to firms navigating FCA licensing, authorization, Consumer Duty, and evolving MLR 2017 supervisory expectations across legal, accounting, and estate sectors.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2.5 text-xs text-slate-700">
                  <div className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-purple-700">Preparedness & Authorisation</div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>FCA EMI & Payment Institution Licensing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Safeguarding & CASS 15 Readiness Reviews</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>SRA & ICAEW Practice-Wide Risk Manuals</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/compliance-consulting"
                  className="inline-flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-800 group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore Consulting Services</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Pillar 3: ReTRRAC Academy & Simulation (CPD Accredited) */}
            <div className="bg-gradient-to-b from-purple-50/60 via-white to-white rounded-3xl p-8 border-2 border-purple-200/90 shadow-xl shadow-purple-500/10 hover:shadow-2xl transition-all flex flex-col justify-between group relative overflow-hidden">
              <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-tech text-white text-[10px] font-bold uppercase rounded-bl-xl">
                Accredited Academy
              </div>

              <div className="space-y-6">
                {/* <div className="w-14 h-14 rounded-2xl bg-gradient-tech text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                  <GraduationCap className="w-7 h-7" />
                </div> */}
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">Pillar 03 • Education & Certifications</span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">ReTRRAC® Global Academy</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2.5">
                    CPD-accredited executive masterclasses, the globally recognized CAFS™ certification, and live-fire Blackthrone™ simulation war rooms with direct PayPal enrollment for UK and India.
                  </p>
                </div>

                <div className="pt-2 border-t border-purple-100 space-y-2.5 text-xs text-slate-700">
                  <div className="font-bold text-slate-900 uppercase text-[10px] tracking-wider text-purple-700">Certified Programs</div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>CAFS™ 60h Professional Certification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Blackthrone™ AML & Sanctions War Room</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>PayPal Instant UK & India Checkout</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/retrrac-academy"
                  className="inline-flex items-center text-xs font-bold text-purple-700 hover:text-purple-900 group-hover:translate-x-1 transition-transform"
                >
                  <span>Explore Academy Syllabi</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. FEATURED COURSES & PROGRAMS WITH PAYPAL PAYMENT INTEGRATION */}
      <section className="py-24 bg-slate-50/60 border-t border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
                <Award className="w-3.5 h-3.5" />
                <span>CPD UK Standards Office Accredited</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Accredited Academy <span className="text-gradient">Programs</span>
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl mt-2">
                Elevate your compliance team with benchmark qualifications. Secure your cohort placement instantly via PayPal with international credit cards or balances.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-slate-500">Currency:</span>
              <div className="p-1 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center space-x-1 text-xs font-bold">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700">
                  {currency === 'GBP' ? '🇬🇧 UK £ GBP' : '🇮🇳 India ₹ INR'}
                </span>
              </div>
            </div>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:border-purple-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image with Tag */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-purple-900/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                      {course.badge}
                    </span>

                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-extrabold">
                      {course.duration}
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider block">
                        {course.category}
                      </span>
                      <h3 className="text-base font-black leading-tight">
                        {course.title}
                      </h3>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Tuition Investment</span>
                        <div className="text-2xl font-black text-slate-900 text-gradient">
                          {formatAmount(course.priceGBP, course.priceINR)}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Cohort</span>
                        <span className="text-xs font-bold text-indigo-700">{course.upcomingCohort}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {course.summary}
                    </p>

                    <div className="space-y-2 pt-1 text-xs text-slate-700">
                      {course.highlights.map((h, i) => (
                        <div key={i} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                          <span className="text-[11px]">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer with PayPal */}
                <div className="p-6 pt-0 space-y-2.5">
                  <button
                    onClick={() => handleOpenPayPal(course)}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#FFC439] hover:bg-[#F4B400] text-slate-900 font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 border border-amber-400 group/btn"
                  >
                    {currency === 'INR' ? (
                      <span className="font-black text-[#6933D3]">₹ UPI / Card</span>
                    ) : (
                      <span className="italic font-black text-blue-900 tracking-tighter">Pay<span className="text-blue-600">Pal</span></span>
                    )}
                    <span className="text-slate-800 font-bold">{currency === 'INR' ? 'with Cashfree' : 'with PayPal'} ({formatAmount(course.priceGBP, course.priceINR)})</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-900 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <Link
                    to={course.id === 'cafs-specialist' ? '/courses/certified-anti-financial-crime-specialist-cafs' : '/retrrac-academy'}
                    className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors text-center block border border-slate-200"
                  >
                    View Detailed Syllabus →
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. UK LONDON HEADQUARTERS & GLOBAL FOOTPRINT */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-6 space-y-6">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
                🇬🇧 London Headquarters & International Presence
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Anchored in the <span className="text-gradient">City of London</span>. Empowering Global RegTech.
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                ReTRRAC Global's global headquarters is situated at Cannon Street in the historic core of London's financial district, adjacent to the Bank of England and leading international investment banks.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center space-x-2 text-indigo-700 font-bold text-xs uppercase">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span>United Kingdom HQ</span>
                  </div>
                  <p className="text-xs text-slate-800 font-semibold">60 Cannon Street, London EC4N 6NP</p>
                  <p className="text-[11px] text-slate-500">+44 (0) 7552 237 997</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center space-x-2 text-indigo-700 font-bold text-xs uppercase">
                    <Globe2 className="w-4 h-4 text-cyan-600" />
                    <span>India & UAE Hubs</span>
                  </div>
                  <p className="text-xs text-slate-800 font-semibold">Pune & Kochi Global Delivery Centers</p>
                  <p className="text-[11px] text-slate-500">Dubai Regional Advisory Office</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="https://retrrac.org/wp-content/uploads/2025/01/ReTRRAC-Brochure.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-2 shadow-md transition-all"
                >
                  <Download className="w-4 h-4 text-cyan-300" />
                  <span>Download Institutional Brochure (PDF)</span>
                </a>

                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                >
                  Schedule London Consultation
                </Link>
              </div>
            </div>

            {/* London High-Standard Building Imagery Parallax */}
            <div className="lg:col-span-6">
              <ParallaxCard maxTilt={8} className="w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="rounded-3xl overflow-hidden shadow-lg h-52">
                      <img
                        src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80"
                        alt="London City Skyline"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-lg h-64">
                      <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80"
                        alt="ReTRRAC Boardroom Consultation"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-6">
                    <div className="rounded-3xl overflow-hidden shadow-lg h-64">
                      <img
                        src="https://media.istockphoto.com/id/2225405260/photo/london-cityscape-with-the-gherkin-building.jpg?s=612x612&w=0&k=20&c=0-JJ_-oCxKoq1fcRlE0bh4O_HhxvTRqYw2NvhCmQ-24="
                        alt="London Financial Towers"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="rounded-3xl overflow-hidden shadow-lg h-52">
                      <img
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80"
                        alt="ReTRRAC Academy Lecture Hall"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </ParallaxCard>
            </div>

          </div>
        </div>
      </section>

      {/* OUR TEAM */}
      <TeamPreviewSection />

      {/* 6. EXECUTIVE TESTIMONIALS (Inspired by DCM Operations) */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-800 border border-purple-200">
              Institutional Endorsements
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Our team brings together the brightest minds in regulatory risk. <span className="text-gradient">Our clients agree.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Proven partners across the United Kingdom, India, and the Middle East.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-xl shadow-slate-900/5 flex flex-col justify-between space-y-6 hover:border-purple-300 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-purple-300" />
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-xs">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{t.author}</h4>
                    <p className="text-[11px] text-slate-500">{t.org}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. PAYPAL CHECKOUT MODAL TRIGGERED FROM HOME */}
      {payPalModalOpen && selectedCourseForPayment && (
        <PayPalCheckoutModal
          isOpen={payPalModalOpen}
          onClose={() => setPayPalModalOpen(false)}
          course={selectedCourseForPayment}
        />
      )}

    </div>
  );
}
