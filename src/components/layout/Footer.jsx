import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Youtube, 
  Twitter, 
  Award, 
  CheckCircle2,
  Lock,
  CreditCard,
  User,
  LayoutDashboard
} from 'lucide-react';
import { siteMeta, consultingSectors } from '../../data/siteData';

export default function Footer({ onOpenRiskScanner }) {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden font-sans">
      {/* Background subtle gradient orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Institutional Badge Banner */}
        <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 mb-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-white font-black text-lg">{siteMeta.accreditation}</h4>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> UK Standards Office
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                All ReTRRAC Academy qualifications, CAFS™ certifications, and Blackthrone™ simulations adhere to UK Continuing Professional Development standards.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/user/dashboard"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center space-x-1.5"
            >
              <User className="w-3.5 h-3.5 text-indigo-400" />
              <span>Student Portal</span>
            </Link>
            <Link
              to="/courses/certified-anti-financial-crime-specialist-cafs"
              className="px-5 py-2.5 rounded-xl bg-gradient-tech text-white font-bold text-xs transition-all shadow-lg shadow-purple-500/20"
            >
              Enroll in CAFS™ (60h)
            </Link>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: About & Headquarters */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center group">
              <img
                src="/Logohead.png"
                alt="ReTRRAC Global"
                className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {siteMeta.subheadline}
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">London Global HQ:</strong> {siteMeta.headquarters.address}
                </div>
              </div>
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Pune & Kochi Delivery Centers:</strong> Maharashtra & Kerala, India
                </div>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+44 7552 237 997 | +44 7380 923 453</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-pink-400 shrink-0" />
                <a href="mailto:info@retrrac.org" className="hover:text-purple-300 transition-colors">
                  info@retrrac.org / ren@retrrac.org
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-3 flex items-center space-x-3 text-slate-400">
              <a href="https://www.linkedin.com/company/retrrac-global/" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://x.com/ReTRRAC" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/people/Retrrac-Global/100078945916726/" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/rettrac_global/" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.youtube.com/@ReTRRAC" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-800 hover:bg-purple-600 hover:text-white transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Compliance Consulting */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide mb-4">Compliance Consulting</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {consultingSectors.map((sector) => (
                <li key={sector.id}>
                  <Link to={sector.path} className="hover:text-purple-300 transition-colors flex items-center space-x-1">
                    <span>{sector.title}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link to="/clients-lifecycle-management" className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center space-x-1">
                  <span>Client Lifecycle Management (CLM)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academy & Programs */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide mb-4">Academy & Programs</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/courses/certified-anti-financial-crime-specialist-cafs" className="hover:text-purple-300 transition-colors font-semibold text-purple-300">
                  CAFS™ Certification (60h)
                </Link>
              </li>
              <li>
                <Link to="/retrrac-academy" className="hover:text-purple-300 transition-colors">
                  ReTRRAC® Academy Catalog
                </Link>
              </li>
              <li>
                <Link to="/blackthrone-training" className="hover:text-purple-300 transition-colors">
                  Blackthrone™ War Room Lab
                </Link>
              </li>
              <li>
                <Link to="/user/dashboard" className="text-indigo-400 hover:text-indigo-300 font-semibold">
                  Student Dashboard & Certificates
                </Link>
              </li>
              <li>
                <Link to="/verify/CPD-UK-RETRRAC-2026-8942" className="hover:text-purple-300 transition-colors">
                  Verify Digital Certificate
                </Link>
              </li>
              <li>
                <Link to="/knowledge-hub" className="hover:text-purple-300 transition-colors">
                  Knowledge Hub & Enforcements
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-purple-300 transition-colors">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations & Portals */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wide mb-4">Operations & Gateway</h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/admin/dashboard" className="hover:text-purple-300 transition-colors flex items-center space-x-1 text-amber-400 font-bold">
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Admin Operations Command</span>
                </Link>
              </li>
              <li>
                <div className="flex items-center space-x-1.5 text-slate-400 py-1">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  <span>PayPal (UK) & Cashfree (India)</span>
                </div>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-purple-300 transition-colors block">
                  Privacy Policy & GDPR
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-purple-300 transition-colors block">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/cancellation-refund-policy" className="hover:text-purple-300 transition-colors block">
                  Cancellation & Refund Policy
                </Link>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenRiskScanner}
                  className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center space-x-1 text-xs"
                >
                  <span>⚡ AI Compliance Scanner</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with UK Flag & PayPal info */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ReTRRAC® Global Ltd. Registered in England & Wales. Regulatory Transformation, Risk Review & Consulting.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-slate-400">
              <span className="mr-1">🇬🇧</span> London HQ • Cannon Street EC4N
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center text-emerald-400">
              <Lock className="w-3 h-3 mr-1" /> Secure Payments
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
