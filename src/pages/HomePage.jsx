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
import { siteMeta, consultingSectors, leadershipTeam, successStories } from '../data/siteData';
import TestimonialCards from '../components/common/TestimonialCards';
import { clientTestimonials } from '../data/testimonialsData';
import TeamPreviewSection from '../components/team/TeamPreviewSection';

export default function HomePage({ onOpenRiskScanner, onOpenCopilot }) {

  // Client / credentials bar (runs continuously below the hero)
  const credentialBar = [
    { label: 'DEUTSCHE BANK ALUMNI', Icon: Landmark },
    { label: 'FORMER HSBC LEADERSHIP', Icon: Building2 },
    { label: 'CPD UK STANDARDS', Icon: ShieldCheck },
    { label: 'SRA AML EXPERTISE', Icon: Scale },
    { label: 'HMRC MLR 2017 ALIGNMENT', Icon: Calculator },
    { label: 'FATF & 6AMLD BEST PRACTICES', Icon: Globe2 }
  ];

  // Consulting section – three service pillars
  const consultingPillars = [
    {
      label: 'Risk Management',
      title: 'Financial Crime Risk Advisory',
      description: 'Helping organisations manage AML, sanctions, and regulatory risk with confidence.',
      points: ['Risk Assessments', 'AML Reviews', 'Sanctions Advisory'],
      Icon: CheckCircle,
      link: '/compliance-consulting/banks-financial-institutions',
      linkLabel: 'Explore Risk Advisory'
    },
    {
      label: 'Advisory',
      title: 'Regulatory Compliance Consulting',
      description: 'Helping regulated firms achieve FCA readiness, maintain MLR compliance, and navigate regulatory change with confidence.',
      points: ['FCA Authorisations', 'Consumer Duty', 'MLR 2017 Compliance', 'Governance & Control Frameworks'],
      Icon: CheckCircle,
      link: '/compliance-consulting',
      linkLabel: 'Explore Compliance Advisory'
    },
    {
      label: 'Education & Certifications',
      title: 'ReTRRAC® Global Academy',
      description: 'Accredited learning pathways and immersive simulations designed for compliance, risk, and financial crime professionals.',
      points: ['CAFS™ Certification', 'Blackthrone™ AML & Sanctions Simulations', 'CPD-Accredited Executive Programmes'],
      Icon: Award,
      link: '/retrrac-academy',
      linkLabel: 'Explore the Academy',
      featured: true
    }
  ];

  return (
    <div className="bg-white overflow-hidden font-sans">

      {/* 1. HERO SECTION WITH GSAP PARALLAX & UK VISUALS */}
      <HeroSection
        onOpenRiskScanner={onOpenRiskScanner}
        onOpenCopilot={onOpenCopilot}
      />

      {/* 2. CLIENT / CREDENTIALS BAR – runs continuously below the hero */}
      <section className="py-8 bg-slate-50/80 border-y border-slate-200/80 overflow-hidden">
        <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-500 mb-5 px-4">
          Guided by Industry Leaders. Grounded in Regulatory Excellence.
        </p>

        <div className="group relative overflow-hidden marquee-fade">
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                {credentialBar.map(({ label, Icon }) => (
                  <div key={label} className="flex items-center whitespace-nowrap px-6 sm:px-10">
                    <Icon className="w-4 h-4 mr-2 text-brand-600" />
                    <span className="font-black text-slate-700 text-sm tracking-tight">{label}</span>
                    <span className="ml-12 sm:ml-20 h-1.5 w-1.5 rounded-full bg-accent-400" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LONDON HERITAGE. GLOBAL PERSPECTIVE. */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accent-50 text-accent-700 border border-accent-200">
                City of London Headquarters
              </span>

              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                London Heritage. <span className="text-gradient">Global Perspective.</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Located in the City of London, ReTRRAC Global operates at the intersection of financial services, regulation, and innovation. Our presence in one of the world's foremost financial hubs enables us to deliver trusted advisory services to organisations across the UK, Middle East, and beyond.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center space-x-2 text-brand-700 font-bold text-xs uppercase">
                    <MapPin className="w-4 h-4 text-brand-600" />
                    <span>United Kingdom HQ</span>
                  </div>
                  <p className="text-xs text-slate-800 font-semibold">60 Cannon Street, London EC4N 6NP</p>
                  <p className="text-[11px] text-slate-500">+44 (0) 7552 237 997</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex items-center space-x-2 text-brand-700 font-bold text-xs uppercase">
                    <Globe2 className="w-4 h-4 text-brand-600" />
                    <span>India & UAE Hubs</span>
                  </div>
                  <p className="text-xs text-slate-800 font-semibold">Pune, Kochi & Chennai Global Delivery Centres</p>
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
                  <Download className="w-4 h-4 text-brand-300" />
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


      {/* 4. CONSULTING – three service pillars */}
      <section id="services" className="py-24 bg-slate-50/60 border-t border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {consultingPillars.map((pillar) => (
              <div
                key={pillar.label}
                className={`rounded-3xl p-8 flex flex-col justify-between group relative overflow-hidden transition-all hover:shadow-2xl ${
                  pillar.featured
                    ? 'bg-gradient-to-b from-brand-50/70 via-white to-white border-2 border-brand-200/90 shadow-xl shadow-brand-500/10'
                    : 'bg-white border border-slate-200 hover:border-brand-300 shadow-xl shadow-slate-900/5 hover:shadow-brand-500/10'
                }`}
              >
                {pillar.featured && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-tech text-white text-[10px] font-bold uppercase rounded-bl-xl">
                    Accredited Academy
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-accent-600">{pillar.label}</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">{pillar.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mt-2.5">{pillar.description}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-2.5 text-sm text-slate-700">
                    {pillar.points.map((point) => (
                      <div key={point} className="flex items-center space-x-2">
                        <pillar.Icon className="w-4 h-4 text-brand-600 shrink-0" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <Link
                    to={pillar.link}
                    className="inline-flex items-center text-xs font-bold text-brand-700 hover:text-brand-900 group-hover:translate-x-1 transition-transform"
                  >
                    <span>{pillar.linkLabel}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* OUR TEAM */}
      <TeamPreviewSection />

      {/* 6. CLIENT TESTIMONIALS */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-accent-50 text-accent-700 border border-accent-200">
              Client Testimonials
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Trusted by the firms <span className="text-gradient">we advise.</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              What compliance and risk leaders across the UK, India, and the Middle East say about working with ReTRRAC.
            </p>
          </div>

          {/* Testimonials live in src/data/testimonialsData.js – add new ones there */}
          <TestimonialCards items={clientTestimonials} />

        </div>
      </section>

    </div>
  );
}