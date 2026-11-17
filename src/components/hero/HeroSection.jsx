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
          className="group block w-full py-2 px-5 rounded-full bg-brand-50 hover:bg-brand-100 border border-brand-200 text-ink text-xs sm:text-[13px] font-medium text-center transition-all shadow-xs"
        >
          <span>Controls Eﬃciency ...without 20 New Suppliers</span>
          <span className="ml-3 font-bold text-accent-600 group-hover:text-accent-700 transition-colors">
            Read Insight &gt;
          </span>
        </Link>
      </div>

      {/* 2. THE HERO CARD CONTAINER (With Animated Glass Building Background) */}
      <div
        ref={containerRef}
        className="relative max-w-[1400px] mx-auto min-h-[620px] sm:min-h-[700px] lg:min-h-[760px] rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl shadow-brand-900/10 border border-brand-100 flex flex-col justify-between bg-gradient-to-br from-white via-brand-50 to-[#fdf3ec]"
      >

        {/* Bright background in ReTRRAC logo colours */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Soft logo-coloured light: sky blue, royal blue and a warm orange glow */}
          <div className="absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full bg-brand-300/40 blur-[110px]" />
          <div className="absolute top-1/4 -right-40 w-[620px] h-[620px] rounded-full bg-brand-500/20 blur-[120px]" />
          <div className="absolute -bottom-48 left-1/3 w-[560px] h-[480px] rounded-full bg-accent-300/30 blur-[120px]" />

          {/* City architecture – softly visible behind the bright overlay (raise opacity-[0.22] to show it more) */}
          <img
            ref={bgImageRef}
            src="/hero-building.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.35] grayscale-[35%] will-change-transform"
          />

          {/* White glow behind the headline keeps the centre bright and readable */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_48%,rgba(255,255,255,0.80),rgba(255,255,255,0.40)_55%,transparent_80%)]" />

          {/* Fine dot grid for texture */}
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: 'radial-gradient(rgba(31,106,203,0.18) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)'
            }}
          />

          {/* Logo motif: three connected dots, top-right and bottom-left */}
          <svg className="absolute -right-10 top-28 w-72 h-72 opacity-[0.08] hidden md:block" viewBox="0 0 200 200" fill="none">
            <path d="M50 100 L100 100 L135 55 M100 100 L135 145" stroke="#1f6acb" strokeWidth="14" strokeLinecap="round" />
            <circle cx="45" cy="100" r="30" fill="#1f9ff6" />
            <circle cx="140" cy="50" r="30" fill="#1f82df" />
            <circle cx="140" cy="150" r="30" fill="#1f6acb" />
          </svg>
          <svg className="absolute -left-12 bottom-20 w-52 h-52 opacity-[0.06] hidden md:block" viewBox="0 0 200 200" fill="none">
            <path d="M50 100 L100 100 L135 55 M100 100 L135 145" stroke="#1f6acb" strokeWidth="14" strokeLinecap="round" />
            <circle cx="45" cy="100" r="30" fill="#1f9ff6" />
            <circle cx="140" cy="50" r="30" fill="#1f82df" />
            <circle cx="140" cy="150" r="30" fill="#1f6acb" />
          </svg>
        </div>

        {/* 3. HERO TOP NAVIGATION (Overlaid over the Building) */}
        <div ref={navRef} className="relative z-30 pt-6 sm:pt-8 px-6 sm:px-10 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between">

            {/* Logo with 3 DCM/ReTRRAC Indicators */}
            {/* Logo */}
            <Link to="/" className="flex items-center group shrink-0 mr-3 xl:mr-8">
              <img
                src="/Headerlogo.png"
                alt="ReTRRAC Global"
                className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>
            {/* Desktop Center Menu Links */}
            <nav className="hidden lg:flex items-center space-x-3 xl:space-x-5 text-[13px] xl:text-sm font-semibold text-ink-soft whitespace-nowrap">

              <Link to="/our-story" className="hover:text-brand-700 transition-colors">
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
                  className="flex items-center space-x-1 hover:text-brand-700 transition-colors py-2"
                >
                  <span>Consulting</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdown ? 'rotate-180 text-brand-700' : ''}`} />
                </button>

                {servicesDropdown && (
                  <div className="absolute top-full left-0 w-80 bg-white text-slate-900 rounded-2xl shadow-2xl p-3 border border-slate-100 z-50 animate-fadeIn">
                    <div className="p-2 border-b border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-400 uppercase text-[10px]">Consulting Sectors</span>
                      <Link to="/compliance-consulting" className="text-brand-700 font-bold text-[11px] hover:underline">
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
                            <div className="p-1.5 rounded-lg bg-slate-100 text-brand-700 group-hover/item:bg-brand-600 group-hover/item:text-white transition-colors">
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-800 group-hover/item:text-brand-700">
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
                <Link to="/retrrac-academy" className="flex items-center space-x-1 hover:text-brand-700 transition-colors py-2">
                  <span>ReTRRAC® Academy</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>

                {academyDropdown && (
                  <div className="absolute top-full left-0 w-80 bg-white text-slate-900 rounded-2xl shadow-2xl p-3 border border-slate-100 z-50 animate-fadeIn space-y-1.5">
                    <div className="p-2 border-b border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-brand-700 uppercase text-[10px]">CPD UK Accredited</span>
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
              <Link to="/our-success-stories" className="hover:text-brand-700 transition-colors">
                Work
              </Link>

              {/* Insights / Knowledge Hub */}
              <Link to="/knowledge-hub" className="hover:text-brand-700 transition-colors">
                Knowledge Hub
              </Link>

              {/* Partners */}
              <Link to="/internship-career" className="hover:text-brand-700 transition-colors">
                Partners
              </Link>

              {/* Team */}
              <Link to="/team" className="hover:text-brand-700 transition-colors">
                Team
              </Link>

              {/* Company (same page as Our Story – shown on very wide screens only) */}
              <Link to="/our-story" className="hidden 2xl:inline hover:text-brand-700 transition-colors">
                Company
              </Link>

            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center space-x-2.5 xl:space-x-3 shrink-0 ml-3 xl:ml-4">

              {/* Currency Toggle [🇬🇧 £ | 🇮🇳 ₹] */}
              <div className="hidden xl:flex items-center bg-white/80 backdrop-blur-md rounded-full p-1 border border-brand-100 text-[10px] font-bold text-ink-soft shadow-sm">
                <button
                  onClick={() => setCurrency('GBP')}
                  className={`px-2.5 py-1 rounded-full transition-all ${currency === 'GBP' ? 'bg-gradient-tech text-white font-black' : 'hover:text-brand-700'}`}
                >
                  🇬🇧 £
                </button>
                <button
                  onClick={() => setCurrency('INR')}
                  className={`px-2.5 py-1 rounded-full transition-all ${currency === 'INR' ? 'bg-gradient-tech text-white font-black' : 'hover:text-brand-700'}`}
                >
                  🇮🇳 ₹
                </button>
              </div>

              {/* Student Portal Shortcut */}
              <Link
                to="/user/dashboard"
                className="hidden 2xl:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-md text-ink text-xs font-semibold border border-brand-100 shadow-sm transition-all"
                title="Student Dashboard"
              >
                <User className="w-3.5 h-3.5 text-brand-600" />
                <span>Portal</span>
              </Link>

              {/* Contact Us Green Pill Button (Identical to DCM Reference) */}
              <Link
                to="/contact"
                className="whitespace-nowrap px-6 py-2.5 sm:px-6 xl:px-7 sm:py-3 rounded-full bg-gradient-tech text-white font-extrabold text-xs sm:text-sm tracking-tight transition-all shadow-lg shadow-brand-600/30 hover:scale-105 active:scale-95"
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
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold sm:font-extrabold text-ink tracking-tight leading-[1.12]"
          >
            Regulatory Transformation,<br className="hidden sm:inline" /> <span className="text-gradient">Risk Management </span><br className="hidden sm:inline" /> and Consulting
          </h1>

          {/* Sub-Headline: Confidence in Compliance. Clarity in Risk. */}
          <p
            ref={subheadlineRef}
            className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-ink"
          >
            Confidence in Compliance.{' '}
            <span className="text-accent-600 font-extrabold">
              Clarity in Risk.
            </span>
          </p>

          {/* Institutional Actions & PayPal Course Enrollment Triggers */}
          <div
            ref={ctaRef}
            className="pt-6 flex flex-wrap items-center justify-center gap-3.5"
          >
            {/* AI Risk Audit Button */}
            <button
              onClick={onOpenRiskScanner}
              className="px-6 py-3.5 rounded-full bg-white hover:bg-brand-50 text-ink border border-brand-200 shadow-md shadow-brand-900/5 font-bold text-xs sm:text-sm transition-all flex items-center space-x-2"
            >
              <Zap className="w-4 h-4 text-accent-600" />
              <span>Launch Free AI Risk Audit</span>
            </button>

            {/* AI Copilot Button */}
            <button
              onClick={onOpenCopilot}
              className="px-5 py-3.5 rounded-full bg-white/70 hover:bg-white backdrop-blur-md text-ink-soft border border-brand-100 font-semibold text-xs sm:text-sm transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-brand-600 animate-spin" />
              <span>Ask AI Copilot</span>
            </button>
          </div>

        </div>

        {/* 5. BOTTOM BAR INSIDE HERO CARD (London Standards & Quick Stats) */}
        <div className="relative z-20 pb-6 px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 border-t border-brand-100 pt-4 gap-3">
          <div className="flex items-center space-x-3">
            <span className="flex h-2 w-2 rounded-full bg-accent-500 animate-pulse" />
            <span className="text-ink font-semibold">London HQ: 60 Cannon Street, London EC4N</span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="hidden md:inline text-brand-700 font-medium">CPD UK Standards Office Accredited</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/user/dashboard" className="hover:text-brand-700 transition-colors flex items-center space-x-1">
              <User className="w-3.5 h-3.5 text-brand-600" />
              <span>Student Portal</span>
            </Link>
            <span className="text-slate-300">|</span>
            <Link to="/admin/dashboard" className="hover:text-accent-700 transition-colors flex items-center space-x-1 text-accent-600">
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}