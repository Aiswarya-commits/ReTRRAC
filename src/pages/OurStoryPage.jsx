import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Target, 
  Eye, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Star, 
  ArrowRight, 
  Building2, 
  Briefcase, 
  Users, 
  Check, 
  PhoneCall,
  Clock,
  Sparkles
} from 'lucide-react';
import FloatingElements from '../components/common/FloatingElements';
import { ourStoryData, consultingSectors } from '../data/siteData';

export default function OurStoryPage({ onOpenCopilot }) {
  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      
      {/* 1. HERO BANNER WITH FLOATING PURPLE/WHITE ELEMENTS */}
      <div
  className="relative py-24 text-white overflow-hidden bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/ourstory.jpg')" }}
>
  {/* Purple overlay so the text stays readable */}
  <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-indigo-950/80 to-purple-950/80" />

  {/* Ambient Gradient Glows */}
        
        {/* Ambient Gradient Glows */}
        <div className="glow-orb w-96 h-96 -top-20 -left-20 bg-purple-500/25" />
        <div className="glow-orb w-96 h-96 -bottom-20 -right-20 bg-indigo-500/25" />

        {/* Floating Particles */}
        <FloatingElements count={6} theme="dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full floating-pill-dark text-cyan-300 text-xs font-bold uppercase tracking-wider animate-float-medium">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Institutional DNA & History</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Our Story
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            {ourStoryData.heroSubtitle}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* 2. LEAD STORY & IMAGE SECTION (Matches Screenshot 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
              Pioneering Regulatory Governance
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-snug">
              Global Compliance and Risk Review Consulting & Training
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {ourStoryData.leadParagraph}
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {ourStoryData.secondParagraph}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
                <p className="text-3xl font-black text-indigo-700">2018</p>
                <p className="text-xs text-slate-600 font-bold mt-1">Founded in London</p>
              </div>
              <div className="p-5 rounded-3xl bg-purple-50/70 border border-purple-200 shadow-sm">
                <p className="text-3xl font-black text-purple-700">100%</p>
                <p className="text-xs text-purple-900 font-bold mt-1">Audit Sign-off Record</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            {/* Floating decorative badge */}
            <div className="absolute -top-4 -right-4 z-20 hidden sm:flex items-center space-x-2 px-3.5 py-2 rounded-2xl floating-pill animate-float-slow">
              <Award className="w-4 h-4 text-purple-600" />
              <span className="text-xs font-bold text-slate-800">CPD Accredited</span>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white shadow-purple-500/15">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                alt="ReTRRAC Compliance Professional" 
                className="w-full h-[460px] object-cover"
              />
            </div>
          </div>

        </div>

        {/* 3. CORE VALUES, VISION & MISSION (Matches Screenshot 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          {/* Core Values Box */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-600/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Our Values</h3>
            </div>

            <div className="space-y-4">
              {ourStoryData.coreValues.map((val, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">{val.title}:</strong>{' '}
                    <span className="text-slate-300">{val.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Vision & Mission Stacked Boxes */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/90 shadow-sm space-y-2">
              <div className="flex items-center space-x-2 text-indigo-700 font-bold text-base">
                <Eye className="w-5 h-5 text-indigo-600" />
                <span>Our Vision</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {ourStoryData.vision}
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100/90 shadow-sm space-y-2">
              <div className="flex items-center space-x-2 text-purple-700 font-bold text-base">
                <Target className="w-5 h-5 text-purple-600" />
                <span>Our Mission</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {ourStoryData.mission}
              </p>
            </div>
          </div>

        </div>

        {/* 4. OUR JOURNEY VERTICAL TIMELINE (Matches Screenshot 2) */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3.5 py-1.5 rounded-full border border-indigo-200">
              Evolution & Milestones
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Our Journey</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              A decade of leadership, international expansion, and technological innovation.
            </p>
          </div>

          <div className="relative border-l-2 border-indigo-200 max-w-3xl mx-auto pl-6 sm:pl-10 space-y-10">
            {ourStoryData.journey.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Year Marker Badge with floating animation */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-8 h-8 rounded-full bg-gradient-tech text-white text-[11px] font-bold flex items-center justify-center shadow-md group-hover:scale-125 transition-transform">
                  ✓
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 hover:border-purple-300 hover:bg-purple-50/20 hover:shadow-lg transition-all duration-300">
                  <span className="text-xs font-bold text-indigo-600 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100">
                    {item.year}
                  </span>
                  <h4 className="text-base font-extrabold text-slate-900 mt-2.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. TRUSTED BY LEADING BRANDS (Matches Screenshot 2) */}
        <div className="mb-24 text-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
            Trusted by Leading Regulated Institutions
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {ourStoryData.trustedBrands.map((brand, idx) => (
              <div key={idx} className="px-7 py-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 shadow-sm hover:border-purple-300 transition-colors">
                {brand}
              </div>
            ))}
          </div>
        </div>

        {/* 6. COMPLIANCE CONSULTING HIGHLIGHT (Matches Screenshot 2) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white mb-24 relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950 px-3.5 py-1 rounded-full border border-cyan-800">
                End-to-End Governance
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Compliance Consulting
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We empower institutions to meet the latest Money Laundering Regulations 2017 (MLR 2017), FCA/PRA guidelines, and SRA requirements with zero compliance breach records.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                {consultingSectors.map((sector) => (
                  <Link 
                    key={sector.id} 
                    to={sector.path}
                    className="flex items-center space-x-2 text-slate-200 hover:text-cyan-300 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-semibold">{sector.title}</span>
                  </Link>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to="/compliance-consulting"
                  className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 text-slate-950 font-bold text-xs shadow-lg"
                >
                  <span>Explore Consulting Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800" 
                  alt="Compliance Discussion" 
                  className="w-full h-72 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 7. LEARNING & DEVELOPMENT (4 CARDS - Matches Screenshot 2) */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1 rounded-full border border-purple-200">
              Capacity Building
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Learning & Development</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              CPD-accredited courses and corporate simulations to advance your career and institutional preparedness.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ourStoryData.learningPrograms.map((prog, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-md hover:border-purple-300 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-3 w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">
                    {prog.title}
                  </h4>
                  <p className="text-[11px] font-semibold text-indigo-600">
                    {prog.duration}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {prog.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <Link
                    to={prog.path}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. WHY PARTNER WITH US & TESTIMONIALS (Matches Screenshot 2 Bottom) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-900">Why Partner With Us</h3>
            <p className="text-xs text-slate-500">Experience, institutional rigor, and continuous hand-holding.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {ourStoryData.whyPartnerWithUs.map((w, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-sm hover:border-purple-300 transition-colors">
                <h5 className="text-sm font-bold text-slate-900">{w.title}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>

          {/* Customer Reviews */}
          <div className="border-t border-slate-200 pt-10">
            <h4 className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
              Customer Experience & Google Reviews
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ourStoryData.testimonials.map((t, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 italic leading-relaxed">
                    "{t.comment}"
                  </p>
                  <div>
                    <p className="text-xs font-bold text-slate-900">{t.name}</p>
                    <p className="text-[10px] text-slate-400">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 9. APPOINTMENT SCHEDULER CTA (Matches Screenshot 2 Bottom) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Book a FREE Consultation today
            </h3>
            <p className="text-xs sm:text-sm text-purple-200">
              Speak directly with our senior compliance directors in London to evaluate your firm’s regulatory obligations.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-xl hover:bg-slate-100 transition-all"
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
