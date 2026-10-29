import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import {
  ChevronDown,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  GraduationCap,
  CreditCard,
  Building2,
  Landmark,
  Scale,
  Calculator,
  Gem,
  Award,
  Globe2,
  User,
  LayoutDashboard
} from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';
import { consultingSectors } from '../../data/siteData';

export default function HeroSection({ onOpenRiskScanner, onOpenCopilot, onOpenPayPal }) {
  const { currency, setCurrency, formatAmount } = useCurrency();
  const { currentUser } = useAuth();

  const containerRef = useRef(null);
  const bgImageRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadlineRef = useRef(null);
  const ctaRef = useRef(null);
  const navRef = useRef(null);
  const bannerRef = useRef(null);

  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [academyDropdown, setAcademyDropdown] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Reveal Timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(bannerRef.current, { y: -20, opacity: 0, duration: 0.6 })
        .from(containerRef.current, { scale: 0.96, opacity: 0, duration: 0.8 }, '-=0.3')
        .from(navRef.current, { y: -15, opacity: 0, duration: 0.6 }, '-=0.4')
        .from(headlineRef.current, { y: 40, opacity: 0, duration: 0.9 }, '-=0.3')
        .from(subheadlineRef.current, { y: 25, opacity: 0, duration: 0.7 }, '-=0.5')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.6 }, '-=0.4');

      // 2. Slow Continuous Ambient Background Zoom/Float Animation
      gsap.to(bgImageRef.current, {
        scale: 1.08,
        y: '-=15',
        x: '+=10',
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // 3. Mouse Move Interactive Parallax
      const handleMouseMove = (e) => {
        if (!containerRef.current || !bgImageRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(bgImageRef.current, {
          x: x * 35,
          y: y * 25,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });

        gsap.to([headlineRef.current, subheadlineRef.current], {
          x: -x * 15,
          y: -y * 10,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      };

      const containerEl = containerRef.current;
      if (containerEl) {
        containerEl.addEventListener('mousemove', handleMouseMove);
      }

      return () => {
        if (containerEl) {
          containerEl.removeEventListener('mousemove', handleMouseMove);
        }
      };
    });

    return () => ctx.revert();
  }, []);

  const sectorIcons = {
    banks: Landmark,
    accountants: Calculator,
    lawyers: Scale,
    estate: Building2,
    high_value_dealers: Gem
  };

  return (
    <div className="bg-white pt-3 pb-12 sm:pb-16 px-3 sm:px-6 lg:px-8">

      {/* 1. TOP ANNOUNCEMENT BANNER (Identical to DCM Reference) */}
      <div
        ref={bannerRef}
        className="max-w-5xl mx-auto mb-3"
      >
        <Link
          to="/knowledge-hub"
          className="group block w-full py-2 px-5 rounded-full bg-[#dcfce7] hover:bg-[#cbfad9] border border-emerald-200 text-emerald-950 text-xs sm:text-[13px] font-medium text-center transition-all shadow-xs"
        >
          <span>Controls Eﬃciency ...without 20 New Suppliers</span>
          <span className="ml-3 font-bold text-emerald-800 group-hover:text-emerald-950 transition-colors">
            Read Insight &gt;
          </span>
        </Link>
      </div>

      {/* 2. THE HERO CARD CONTAINER (With Animated Glass Building Background) */}
      <div
        ref={containerRef}
        className="relative max-w-[1400px] mx-auto min-h-[620px] sm:min-h-[700px] lg:min-h-[760px] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl shadow-slate-950/20 border border-slate-800/20 flex flex-col justify-between"
      >

        {/* Background Image Layer with GSAP Floating/Parallax Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            ref={bgImageRef}
            src="/hero-building.jpg"
            alt="London City Financial Center - DCM / ReTRRAC Skyscraper"
            className="w-full h-full object-cover object-center scale-100 will-change-transform"
          />
          {/* Cinematic Dark Gradient Vignette for Maximum Contrast & Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-slate-950/40" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/20 to-slate-950/60" />
        </div>

        {/* 3. HERO TOP NAVIGATION (Overlaid over the Building) */}
        <div ref={navRef} className="relative z-30 pt-6 sm:pt-8 px-6 sm:px-10 lg:px-12">
          <div className="flex items-center justify-between">

            {/* Logo with 3 DCM/ReTRRAC Indicators */}
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src="/Logohead.png"
                alt="ReTRRAC Global"
                className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>
            {/* Desktop Center Menu Links */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-semibold text-white/90">

              <Link to="/our-story" className="hover:text-[#00d084] transition-colors">
                Our Story
              </Link>


              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesDropdown(true)}
                onMouseLeave={() => setServicesDropdown(false)}
              >
                <button
                  onClick={() => setServicesDropdown(!servicesDropdown)}
                  className="flex items-center space-x-1 hover:text-[#00d084] transition-colors py-2"
                >
                  <span>Consulting</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdown ? 'rotate-180 text-[#00d084]' : ''}`} />
                </button>

                {servicesDropdown && (
                  <div className="absolute top-full left-0 w-80 bg-white text-slate-900 rounded-2xl shadow-2xl p-3 border border-slate-100 z-50 animate-fadeIn">
                    <div className="p-2 border-b border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-400 uppercase text-[10px]">Consulting Sectors</span>
                      <Link to="/compliance-consulting" className="text-indigo-600 font-bold text-[11px] hover:underline">
                        All Sectors →
                      </Link>
                    </div>
                    <div className="mt-1 space-y-1">
                      {consultingSectors.map((sector) => {
                        const Icon = sectorIcons[sector.id] || Shield;
                        return (
                          <Link
                            key={sector.id}
                            to={sector.path}
                            onClick={() => setServicesDropdown(false)}
                            className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group/item"
                          >
                            <div className="p-1.5 rounded-lg bg-slate-100 text-indigo-600 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-800 group-hover/item:text-indigo-600">
                                {sector.title}
                              </div>
                              <div className="text-[10px] text-slate-500 line-clamp-1">{sector.tagline}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Advantage / Story */}

              {/* Academy Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setAcademyDropdown(true)}
                onMouseLeave={() => setAcademyDropdown(false)}
              >
                <Link to="/retrrac-academy" className="flex items-center space-x-1 hover:text-[#00d084] transition-colors py-2">
                  <span>ReTRRAC® Academy</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>

                {academyDropdown && (
                  <div className="absolute top-full left-0 w-80 bg-white text-slate-900 rounded-2xl shadow-2xl p-3 border border-slate-100 z-50 animate-fadeIn space-y-1.5">
                    <div className="p-2 border-b border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-purple-700 uppercase text-[10px]">CPD UK Accredited</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">PayPal</span>
                    </div>

                    <Link
                      to="/courses/certified-anti-financial-crime-specialist-cafs"
                      onClick={() => setAcademyDropdown(false)}
                      className="block p-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="text-xs font-bold text-slate-900">CAFS™ Specialist (60h)</div>
                      <div className="text-[10px] text-slate-500">40h Lectures + 20h Live Capstone Project</div>
                    </Link>

                    <Link
                      to="/blackthrone-training"
                      onClick={() => setAcademyDropdown(false)}
                      className="block p-2 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="text-xs font-bold text-slate-900">Blackthrone™ War Room (30h)</div>
                      <div className="text-[10px] text-slate-500">Simulated Sanctions & SARs Investigations</div>
                    </Link>
                  </div>
                )}
              </div>

              {/* Work / Success Stories */}
              <Link to="/our-success-stories" className="hover:text-[#00d084] transition-colors">
                Work
              </Link>

              {/* Insights / Knowledge Hub */}
              <Link to="/knowledge-hub" className="hover:text-[#00d084] transition-colors">
                Knowledge Hub
              </Link>

              {/* Partners */}
              <Link to="/internship-career" className="hover:text-[#00d084] transition-colors">
                Partners
              </Link>

              {/* Team */}
              <Link to="/team" className="hover:text-[#00d084] transition-colors">
                Team
              </Link>

              {/* Company */}
              <Link to="/our-story" className="hover:text-[#00d084] transition-colors">
                Company
              </Link>

            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center space-x-3">

              {/* Currency Toggle [🇬🇧 £ | 🇮🇳 ₹] */}
              <div className="hidden sm:flex items-center bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20 text-[10px] font-bold text-white">
                <button
                  onClick={() => setCurrency('GBP')}
                  className={`px-2.5 py-1 rounded-full transition-all ${currency === 'GBP' ? 'bg-[#00d084] text-slate-950 font-black' : 'hover:text-white'}`}
                >
                  🇬🇧 £
                </button>
                <button
                  onClick={() => setCurrency('INR')}
                  className={`px-2.5 py-1 rounded-full transition-all ${currency === 'INR' ? 'bg-[#00d084] text-slate-950 font-black' : 'hover:text-white'}`}
                >
                  🇮🇳 ₹
                </button>
              </div>

              {/* Student Portal Shortcut */}
              <Link
                to="/user/dashboard"
                className="hidden xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-semibold border border-white/15 transition-all"
                title="Student Dashboard"
              >
                <User className="w-3.5 h-3.5 text-cyan-300" />
                <span>Portal</span>
              </Link>

              {/* Contact Us Green Pill Button (Identical to DCM Reference) */}
              <Link
                to="/contact"
                className="px-6 py-2.5 sm:px-7 sm:py-3 rounded-full bg-[#00d084] hover:bg-[#00b875] text-slate-950 font-extrabold text-xs sm:text-sm tracking-tight transition-all shadow-lg shadow-emerald-500/25 hover:scale-105 active:scale-95"
              >
                Contact us
              </Link>

            </div>

          </div>
        </div>

        {/* 4. CENTER HEADLINE CONTENT (Exact Layout as in Uploaded Screenshot) */}
        <div className="relative z-20 my-auto py-16 sm:py-24 px-4 sm:px-8 text-center max-w-6xl mx-auto space-y-6">

          {/* Main Title: Exact Text from Reference Image */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold sm:font-extrabold text-white tracking-tight leading-[1.12] drop-shadow-md"
          >
            Regulatory Compliance and<br className="hidden sm:inline" /> Financial Crime Risk<br className="hidden sm:inline" /> Management
          </h1>

          {/* Sub-Headline: Enabling Growth. Managing Risk. */}
          <p
            ref={subheadlineRef}
            className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-sm"
          >
            Enabling Growth.{' '}
            <span className="text-[#00d084] font-extrabold">
              Managing Risk.
            </span>
          </p>

          {/* Institutional Actions & PayPal Course Enrollment Triggers */}
          <div
            ref={ctaRef}
            className="pt-6 flex flex-wrap items-center justify-center gap-3.5"
          >
            {/* PayPal Flagship Course Enrollment Button */}
            <button
              onClick={() => onOpenPayPal({
                id: "cafs-specialist",
                code: "CAFS™",
                title: "Certified Anti-Financial Crime Specialist",
                duration: "60 Hours",
                priceGBP: 1250,
                priceINR: 125000,
                accreditation: "CPD UK Certified",
                cpdPoints: 60
              })}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl transition-all flex items-center space-x-2.5 group"
            >
              {currency === 'INR' ? (
                <span className="font-black text-[#6933D3]">₹ UPI / Card</span>
              ) : (
                <span className="italic font-black text-blue-900 tracking-tighter">Pay<span className="text-blue-600">Pal</span></span>
              )}
              <span>Enroll in CAFS™ ({formatAmount(1250, 125000)})</span>
              <ArrowRight className="w-4 h-4 text-slate-900 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* AI Risk Audit Button */}
            <button
              onClick={onOpenRiskScanner}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 font-bold text-xs sm:text-sm transition-all flex items-center space-x-2"
            >
              <Zap className="w-4 h-4 text-[#00d084]" />
              <span>Launch Free AI Risk Audit</span>
            </button>

            {/* AI Copilot Button */}
            <button
              onClick={onOpenCopilot}
              className="px-5 py-3.5 rounded-full bg-slate-900/60 hover:bg-slate-900/90 backdrop-blur-md text-slate-200 border border-white/15 font-semibold text-xs sm:text-sm transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
              <span>Ask AI Copilot</span>
            </button>
          </div>

        </div>

        {/* 5. BOTTOM BAR INSIDE HERO CARD (London Standards & Quick Stats) */}
        <div className="relative z-20 pb-6 px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between text-xs text-white/70 border-t border-white/10 pt-4 gap-3">
          <div className="flex items-center space-x-3">
            <span className="flex h-2 w-2 rounded-full bg-[#00d084] animate-pulse" />
            <span className="text-white font-semibold">London HQ: 60 Cannon Street, London EC4N</span>
            <span className="hidden md:inline text-white/40">•</span>
            <span className="hidden md:inline text-cyan-300 font-medium">CPD UK Standards Office Accredited</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/user/dashboard" className="hover:text-white transition-colors flex items-center space-x-1">
              <User className="w-3.5 h-3.5 text-[#00d084]" />
              <span>Student Portal</span>
            </Link>
            <span className="text-white/30">|</span>
            <Link to="/admin/dashboard" className="hover:text-white transition-colors flex items-center space-x-1 text-amber-300">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
