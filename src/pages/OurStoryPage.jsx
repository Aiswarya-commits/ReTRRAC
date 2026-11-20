import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ShieldCheck,
  BadgeCheck,
  HeartHandshake,
  Lightbulb,
  Award,
  Handshake,
  History,
  BookOpen,
  TrendingUp,
  ClipboardList,
  LifeBuoy,
  GraduationCap,
  Eye,
  Target,
  MapPin,
  Star,
  Quote,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import { ourStoryData, consultingSectors } from '../data/siteData';

// Icons are matched to the titles in siteData.js (ourStoryData.coreValues / whyPartnerWithUs).
// If a title is renamed there, add the new name here – otherwise a default icon is used.
const valueIcons = {
  Integrity: Shield,
  Accountability: BadgeCheck,
  'Client-Centricity': HeartHandshake,
  Innovation: Lightbulb,
  Excellence: Award,
  Collaboration: Handshake
};

const partnerIcons = {
  'More than 20 years of experience': History,
  'Industry Knowledge': BookOpen,
  'Market Positioning': TrendingUp,
  'Project Management': ClipboardList,
  'Continuous Support': LifeBuoy,
  'Training & Hand Holding': GraduationCap,
  'Regulatory Readiness': ShieldCheck
};

// "Barclays Alumni Network" -> "BA"
const initials = (name) =>
  name.split(/\s+/).filter((w) => /^[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

/** Small reusable section heading in the home-page style */
function SectionHeading({ eyebrow, title, highlight, text }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
      {eyebrow && (
        <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-accent-700 bg-accent-50 px-3.5 py-1.5 rounded-full border border-accent-200">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-black text-ink tracking-tight">
        {title} {highlight && <span className="text-gradient">{highlight}</span>}
      </h2>
      {text && <p className="text-sm text-slate-500">{text}</p>}
    </div>
  );
}

export default function OurStoryPage({ onOpenCopilot }) {
  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">

      {/* 1. BANNER – light, logo-coloured (same style as the home hero) */}
      <PageBanner
        title="Our Story"
        highlight="Story"
        subtitle={ourStoryData.heroSubtitle}
        image="/ourstory.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">

        {/* 2. LEAD STORY & IMAGE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200">
              Who We Are
            </span>

            <h2 className="text-3xl sm:text-4xl font-black text-ink leading-tight tracking-tight">
              Regulatory Transformation <span className="text-gradient">Risk Review</span> and Consulting
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {ourStoryData.leadParagraph}
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {ourStoryData.secondParagraph}
            </p>

            {/* Office locations (replaces the old 2018 / 100% boxes) */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['London, United Kingdom (HQ)', 'India', 'United Arab Emirates'].map((loc, i) => (
                <span
                  key={loc}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border ${
                    i === 0
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-ink-soft border-slate-200'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${i === 0 ? 'text-white' : 'text-accent-500'}`} />
                  {loc}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            {/* Soft logo-colour frame behind the photo */}
            <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-br from-brand-200/60 via-brand-50 to-accent-200/50 -z-0" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-900/15 border-4 border-white">
              {/* London City HQ photo – swap for a real team / office photo in /public whenever available */}
              <img
                src="/Build.jpg"
                alt="ReTRRAC Global headquarters in the City of London"
                className="w-full h-[440px] object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-ink/80 to-transparent">
                <p className="text-white text-sm font-bold">60 Cannon Street, London</p>
                <p className="text-white/75 text-xs">Global headquarters</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. VISION, MISSION & VALUES */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-brand-50 to-white border border-brand-100 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-600/30">
                  <Eye className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-ink">Our Vision</h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{ourStoryData.vision}</p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-accent-50 to-white border border-accent-100 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-accent-500 text-white flex items-center justify-center shadow-md shadow-accent-500/30">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-ink">Our Mission</h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">{ourStoryData.mission}</p>
            </div>
          </div>

          <SectionHeading eyebrow="What Guides Us" title="Our" highlight="Values" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ourStoryData.coreValues.map((val) => {
              const Icon = valueIcons[val.title] || CheckCircle2;
              return (
                <div
                  key={val.title}
                  className="group p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-brand-500/10 hover:border-brand-300 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-black text-ink">{val.title}</h4>
                  <p className="text-sm text-slate-600 leading-relaxed mt-1">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 4. OUR JOURNEY TIMELINE */}
        <section className="mb-24">
          <SectionHeading
            eyebrow="Evolution & Milestones"
            title="Our"
            highlight="Journey"
            text="Leadership, international expansion, and technological innovation."
          />

          <div className="relative border-l-2 border-brand-200 max-w-3xl mx-auto pl-6 sm:pl-10 space-y-8">
            {ourStoryData.journey.map((item, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[35px] sm:-left-[51px] top-5 w-8 h-8 rounded-full bg-gradient-tech text-white text-[11px] font-bold flex items-center justify-center shadow-md ring-4 ring-white group-hover:scale-110 transition-transform">
                  ✓
                </div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-300">
                  <span className="text-xs font-bold text-accent-700 px-2.5 py-1 rounded-full bg-accent-50 border border-accent-100">
                    {item.year}
                  </span>
                  <h4 className="text-base font-extrabold text-ink mt-2.5">{item.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. TRUSTED BY – organised logo-style tiles */}
        <section className="mb-24 rounded-3xl bg-gradient-to-br from-brand-50/70 via-white to-accent-50/50 border border-slate-200 p-8 sm:p-12">
          <SectionHeading eyebrow="Our Clients" title="Trusted by Leading" highlight="Regulated Institutions" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {ourStoryData.trustedBrands.map((brand) => (
              <div
                key={brand}
                className="flex flex-col items-center justify-center text-center gap-3 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-brand-300 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-tech text-white text-sm font-black flex items-center justify-center">
                  {initials(brand)}
                </div>
                <span className="text-xs font-bold text-ink-soft leading-snug">{brand}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. COMPLIANCE CONSULTING HIGHLIGHT */}
        <section className="p-8 sm:p-12 rounded-3xl bg-ink text-white mb-24 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-brand-500/25 blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent-500/20 blur-[90px] pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-accent-300 bg-accent-500/15 px-3.5 py-1 rounded-full border border-accent-400/30">
                End-to-End Governance
              </span>
              <h3 className="text-2xl sm:text-3xl font-black">Compliance Consulting</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We empower institutions to meet the latest Money Laundering Regulations 2017 (MLR 2017), FCA/PRA guidelines, and SRA requirements with zero compliance breach records.
              </p>

              <div className="grid sm:grid-cols-2 gap-2 pt-2 text-xs">
                {consultingSectors.map((sector) => (
                  <Link
                    key={sector.id}
                    to={sector.path}
                    className="flex items-center gap-2 text-slate-200 hover:text-brand-300 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-400 shrink-0" />
                    <span className="font-semibold">{sector.title}</span>
                  </Link>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/compliance-consulting"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-tech hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-brand-500/30"
                >
                  <span>Explore Consulting Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
                  alt="Compliance Discussion"
                  className="w-full h-72 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 7. LEARNING & DEVELOPMENT */}
        <section className="mb-24">
          <SectionHeading
            eyebrow="Capacity Building"
            title="Learning &"
            highlight="Development"
            text="CPD-accredited courses and corporate simulations to advance your career and institutional preparedness."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ourStoryData.learningPrograms.map((prog, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-md hover:border-brand-300 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-black">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-extrabold text-ink">{prog.title}</h4>
                  <p className="text-[11px] font-semibold text-accent-600">{prog.duration}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{prog.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <Link
                    to={prog.path}
                    className="text-xs font-bold text-brand-600 hover:text-brand-800 inline-flex items-center gap-1"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. WHY PARTNER WITH US */}
        <section className="mb-24">
          <SectionHeading
            eyebrow="Why ReTRRAC"
            title="Why Partner"
            highlight="With Us"
            text="Experience, institutional rigour, and continuous hand-holding."
          />

          <div className="flex flex-wrap justify-center gap-5">
            {ourStoryData.whyPartnerWithUs.map((w, idx) => {
              const Icon = partnerIcons[w.title] || CheckCircle2;
              const orange = idx % 2 === 1;
              return (
                <div
                  key={w.title}
                  className="w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)] p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${orange ? 'bg-accent-50 text-accent-600' : 'bg-brand-50 text-brand-600'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h5 className="text-sm font-black text-ink">{w.title}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1.5">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 9. CLIENT TESTIMONIALS & REVIEWS */}
        <section className="mb-20 p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200">
          <SectionHeading eyebrow="What Clients Say" title="Client Testimonials" highlight="& Reviews" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ourStoryData.testimonials.map((t, idx) => (
              <div key={idx} className="relative p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
                <Quote className="absolute top-5 right-5 w-8 h-8 text-brand-100" />
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 italic leading-relaxed">"{t.comment}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-gradient-tech text-white text-xs font-black flex items-center justify-center">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-ink">{t.name}</p>
                    <p className="text-[11px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. FREE CONSULTATION CTA */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-800 via-brand-700 to-brand-600 text-white text-center shadow-2xl shadow-brand-900/20 relative overflow-hidden">
          <div className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full bg-accent-500/30 blur-[90px] pointer-events-none" />
          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black">Book a FREE Consultation today</h3>
            <p className="text-sm text-brand-100">
              Speak directly with our senior compliance directors in London to evaluate your firm’s regulatory obligations.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-accent-900/30 transition-all"
              >
                <span>Schedule your Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}