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
import PageBanner from '../components/common/PageBanner';
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
      
      {/* Banner – same light, logo-coloured style as every other page */}
      <PageBanner
        title="Contact Our Compliance Experts"
        highlight="Compliance Experts"
        crumb="Contact us"
        subtitle="Supporting businesses and professionals with compliance, risk management, regulatory advisory, and certification programmes. Get in touch today."
        image="/hero-building.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        
        {/* Office Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div 
            onClick={() => setSelectedOffice('london')}
            className={`cursor-pointer p-7 rounded-3xl border transition-all ${
              selectedOffice === 'london'
                ? 'bg-white border-brand-500 shadow-xl shadow-brand-500/10'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-100 text-brand-800">
                Global Headquarters
              </span>
              <Building2 className="w-5 h-5 text-brand-600" />
            </div>
            <h3 className="text-lg font-bold text-ink">London - Global Headquarters</h3>
            <p className="text-xs text-slate-500 mt-1">{siteMeta.headquarters.address}</p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
              <p>+44 (0) 204 509 7100</p>
              <p>+44 (0) 7552 237 997 | +44 7380923453</p>
              <a href="mailto:info@retrrac.org" className="block text-brand-600 font-semibold hover:underline">info@retrrac.org</a>
            </div>
          </div>

          <div 
            onClick={() => setSelectedOffice('pune')}
            className={`cursor-pointer p-7 rounded-3xl border transition-all ${
              selectedOffice === 'pune'
                ? 'bg-white border-brand-500 shadow-xl shadow-brand-500/10'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-accent-100 text-accent-800">
                Global Resource Centre
              </span>
              <Globe2 className="w-5 h-5 text-accent-600" />
            </div>
            <h3 className="text-lg font-bold text-ink">Pune - Global Resource Centre</h3>
            <p className="text-xs text-slate-500 mt-1">Pune, India</p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
              <p>(+91) 7709991797 | 9043222911</p>
              <a href="mailto:info@retrrac.org" className="block text-brand-600 font-semibold hover:underline">info@retrrac.org</a>
            </div>
          </div>

          <div 
            onClick={() => setSelectedOffice('uae')}
            className={`cursor-pointer p-7 rounded-3xl border transition-all ${
              selectedOffice === 'uae'
                ? 'bg-white border-brand-500 shadow-xl shadow-brand-500/10'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-100 text-brand-800">
                Middle East Operations
              </span>
              <Building2 className="w-5 h-5 text-brand-600" />
            </div>
            <h3 className="text-lg font-bold text-ink">Dubai - UAE Operations</h3>
            <p className="text-xs text-slate-500 mt-1">Dubai, United Arab Emirates</p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
              <p>CBUAE Compliance Advisory Desk</p>
              <a href="mailto:info@retrrac.org" className="block text-brand-600 font-semibold hover:underline">info@retrrac.org</a>
            </div>
          </div>

        </div>

        {/* Form Grid */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl shadow-brand-500/5 mb-20 relative overflow-hidden">
          <div className="h-2 absolute top-0 left-0 right-0 bg-gradient-tech" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-ink">Let’s Talk To Us</h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Our compliance consultants and directors are available for scheduled video calls or on-site visits in London, Pune, and Dubai.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-brand-50 border border-brand-100 space-y-2 text-xs">
                <p className="font-bold text-ink">Mail Us At:</p>
                <a href="mailto:info@retrrac.org" className="inline-flex items-center gap-2 text-brand-700 font-semibold text-sm hover:underline">
                  <Mail className="w-4 h-4 text-accent-500" />
                  info@retrrac.org
                </a>
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-600"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-600"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-600"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Service Area</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-600 bg-white"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-tech text-white font-bold text-xs shadow-md shadow-brand-500/25 hover:opacity-95 transition-all"
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