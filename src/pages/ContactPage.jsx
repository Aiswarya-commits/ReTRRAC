import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Building2, 
  Globe2, 
  Clock, 
  ShieldCheck 
} from 'lucide-react';
import FloatingElements from '../components/common/FloatingElements';
import { siteMeta } from '../data/siteData';

export default function ContactPage() {
  const [selectedOffice, setSelectedOffice] = useState('london');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    inquiryType: 'Consulting',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        inquiryType: 'Consulting',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      
      {/* Hero Banner with Floating Purple/White Elements */}
      <div className="relative py-24 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white overflow-hidden">
        <div className="glow-orb w-96 h-96 -top-20 -left-20 bg-purple-500/20" />
        <div className="glow-orb w-96 h-96 -bottom-20 -right-20 bg-indigo-500/20" />

        {/* Floating particles */}
        <FloatingElements count={6} theme="dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full floating-pill-dark text-cyan-300 text-xs font-bold uppercase tracking-wider animate-float-medium">
            <Mail className="w-3.5 h-3.5 text-purple-400" />
            <span>London • Pune • Dubai</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Contact Us & Global Offices
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Get in touch with ReTRRAC executive leaders to discuss your compliance requirements, schedule a gap review, or enroll in academy certifications.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* Office Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div 
            onClick={() => setSelectedOffice('london')}
            className={`cursor-pointer p-7 rounded-3xl border transition-all ${
              selectedOffice === 'london'
                ? 'bg-white border-purple-500 shadow-xl shadow-purple-500/10'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                Global Headquarters
              </span>
              <Building2 className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">London - Global Headquarters</h3>
            <p className="text-xs text-slate-500 mt-1">{siteMeta.headquarters.address}</p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
              <p>+44 (0) 204 509 7100</p>
              <p>+44 (0) 7552 237 997 | +44 7380923453</p>
              <p className="text-indigo-600 font-semibold">ren@retrrac.org / info@retrrac.org</p>
            </div>
          </div>

          <div 
            onClick={() => setSelectedOffice('pune')}
            className={`cursor-pointer p-7 rounded-3xl border transition-all ${
              selectedOffice === 'pune'
                ? 'bg-white border-purple-500 shadow-xl shadow-purple-500/10'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                Global Resource Center
              </span>
              <Globe2 className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Pune - Global Resource Center</h3>
            <p className="text-xs text-slate-500 mt-1">Pune, India</p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
              <p>(+91) 7709991797</p>
              <p>(+91) 80890 07372 | (+91) 7758943485</p>
              <p className="text-indigo-600 font-semibold">info@retrrac.org</p>
            </div>
          </div>

          <div 
            onClick={() => setSelectedOffice('uae')}
            className={`cursor-pointer p-7 rounded-3xl border transition-all ${
              selectedOffice === 'uae'
                ? 'bg-white border-purple-500 shadow-xl shadow-purple-500/10'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 text-cyan-800">
                Middle East Operations
              </span>
              <Building2 className="w-5 h-5 text-cyan-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Dubai - UAE Operations</h3>
            <p className="text-xs text-slate-500 mt-1">Dubai, United Arab Emirates</p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
              <p>CBUAE Compliance Advisory Desk</p>
              <p className="text-indigo-600 font-semibold">info@retrrac.org</p>
            </div>
          </div>

        </div>

        {/* Form Grid */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl shadow-indigo-500/5 mb-20 relative overflow-hidden">
          <div className="h-2 absolute top-0 left-0 right-0 bg-gradient-tech" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Let’s Talk To Us</h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Our compliance consultants and directors are available for scheduled video calls or on-site visits in London, Pune, and Dubai.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50 border border-purple-100 space-y-3 text-xs">
                <p className="font-bold text-purple-950">Mail Us At:</p>
                <p className="text-purple-700 font-semibold text-sm">info@retrrac.org</p>
                <p className="text-slate-600">Executive: ren@retrrac.org</p>
              </div>
            </div>

            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-slate-900">Consultation Request Submitted</h4>
                  <p className="text-xs text-slate-600">Thank you, {formData.firstName}. We will reach out within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Contact No. *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+44 7552 237 997"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Service Area</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 bg-white"
                    >
                      <option value="Consulting">Consulting (Banks / Accountants / Lawyers / Estate / HVDs)</option>
                      <option value="Training">Training (ReTRRAC Academy / CAFS™ 60h)</option>
                      <option value="General Query">General Query</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Outline your regulatory requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-tech text-white font-bold text-xs shadow-md shadow-indigo-500/25 hover:opacity-95 transition-all"
                  >
                    Submit Consultation Request
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
