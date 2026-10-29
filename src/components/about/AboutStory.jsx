import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  Lightbulb, 
  Award, 
  CheckCircle2, 
  Globe, 
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';
import ParallaxCard from '../common/ParallaxCard';

export default function AboutStory({ onOpenCopilot }) {
  const pillars = [
    {
      title: "Technology-Driven RegTech",
      description: "Proprietary CLM engine connecting 237 jurisdictions, 13,000+ document types, and 150M+ verified corporate entity records.",
      icon: Cpu,
      color: "from-blue-600 to-indigo-600"
    },
    {
      title: "CPD-Accredited Excellence",
      description: "Officially accredited training programs including the flagship CAFS™ 60-hour certification empowering future compliance officers.",
      icon: Award,
      color: "from-purple-600 to-pink-600"
    },
    {
      title: "Fortune 500 Leadership",
      description: "Direct executive leadership with over two decades of high-level advisory experience across Deutsche Bank, HSBC, and Santander.",
      icon: Target,
      color: "from-indigo-600 to-purple-600"
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-purple-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Our Story & Institutional DNA</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Pioneering <span className="text-gradient">Regulatory Resilience</span> & Compliance Growth.
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              ReTRRAC Global is a leading Global Compliance and Risk Review Consulting & Training Company, committed to providing businesses with innovative, technology-driven solutions for regulatory compliance and risk management.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Headquartered in London with strategic operations in India and the UAE, our team of seasoned practitioners brings decades of experience navigating the Prudential Regulation Authority (PRA), Financial Conduct Authority (FCA), MLR 2017, and international AML frameworks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                "20+ Years Fortune 500 Proven Advisory",
                "100% Client Penalty Protection Track Record",
                "Full MLR 2017 & SRA Framework Alignment",
                "Global RegTech System Across 237 Countries"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center space-x-4">
              <a
                href="#consulting"
                className="px-6 py-3 rounded-xl bg-gradient-tech text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/20 hover:opacity-95 transition-all"
              >
                Explore Consulting Services
              </a>
              <button
                onClick={onOpenCopilot}
                className="px-5 py-3 rounded-xl bg-purple-50 text-purple-900 font-semibold text-xs sm:text-sm hover:bg-purple-100 transition-colors"
              >
                Ask AI About ReTRRAC
              </button>
            </div>
          </div>

          {/* Right Column: Values & Highlights Cards */}
          <div className="lg:col-span-6 space-y-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <ParallaxCard key={idx} maxTilt={6}>
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/20 transition-all duration-300 flex items-start space-x-4 shadow-sm group">
                    <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${pillar.color} text-white shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-900">
                        {pillar.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </ParallaxCard>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
