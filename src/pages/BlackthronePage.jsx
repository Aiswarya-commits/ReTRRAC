import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Layers, 
  FileCheck, 
  Calendar 
} from 'lucide-react';
import FloatingElements from '../components/common/FloatingElements';
import { academyData } from '../data/siteData';

export default function BlackthronePage() {
  const { blackthrone } = academyData;

  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      
      {/* Hero Banner with Floating Purple/Pink Elements */}
      <div className="relative py-24 bg-gradient-to-r from-slate-900 via-purple-950 to-pink-950 text-white overflow-hidden">
        <div className="glow-orb w-96 h-96 -top-20 -left-20 bg-purple-500/20" />
        <div className="glow-orb w-96 h-96 -bottom-20 -right-20 bg-pink-500/20" />

        {/* Floating elements */}
        <FloatingElements count={6} theme="dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full floating-pill-dark text-pink-300 text-xs font-bold uppercase tracking-wider animate-float-medium">
            <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
            <span>Corporate Compliance Simulation Drills</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Blackthrone™ Corporate Training
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            {blackthrone.overview}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Transforming Mandatory Compliance into <span className="text-gradient">Operational Readiness</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              At Blackthrone Training, we specialise in delivering high-quality training solutions tailored to meet the unique needs of regulated entities. Our expert-led masterclasses simulate live suspicious transaction scenarios and test front-line defense capabilities before actual audits occur.
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blackthrone.highlights.map((h, idx) => (
              <div key={idx} className="p-7 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
                <span className="w-10 h-10 rounded-xl bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-sm">
                  0{idx + 1}
                </span>
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">{h}</p>
              </div>
            ))}
          </div>

          {/* Book Masterclass Banner */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white text-center space-y-6 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold">Schedule a Custom Corporate Simulation</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Our London training directors will align scenarios to your firm’s specific customer base, products, and supervisory regime.
            </p>
            <div>
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm shadow-xl hover:bg-slate-100 transition-all"
              >
                <span>Book Corporate Masterclass</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
