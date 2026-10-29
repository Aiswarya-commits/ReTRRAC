import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Building2, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Globe2
} from 'lucide-react';
import { siteMeta } from '../../data/siteData';

export default function ContactSection() {
  const [selectedOffice, setSelectedOffice] = useState('london'); // 'london' | 'pune' | 'uae'
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
    <section id="contact" className="py-24 bg-slate-50/70 border-t border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>Connect with ReTRRAC Leaders</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Global Offices & <span className="text-gradient">Advisory Contact</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Headquartered in the heart of London's financial district with operations in Pune, India, and the UAE, we are dedicated to empowering your business with statutory compliance excellence.
          </p>
        </div>

        {/* Global Office Switcher Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* London HQ */}
          <div 
            onClick={() => setSelectedOffice('london')}
            className={`cursor-pointer p-6 rounded-3xl border transition-all duration-300 relative ${
              selectedOffice === 'london'
                ? 'bg-white border-purple-400 shadow-xl shadow-purple-500/10 scale-[1.02]'
                : 'bg-white/80 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                Global Headquarters
              </span>
              <Building2 className="w-5 h-5 text-indigo-600" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">London, United Kingdom</h4>
            <p className="text-xs text-slate-500 mt-1">{siteMeta.headquarters.address}</p>
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
              <p><strong>Tel:</strong> +44 7552 237 997</p>
              <p><strong>Alt:</strong> +44 7380 923 453 | 0204 509 7100</p>
            </div>
          </div>

          {/* Pune Resource Center */}
          <div 
            onClick={() => setSelectedOffice('pune')}
            className={`cursor-pointer p-6 rounded-3xl border transition-all duration-300 relative ${
              selectedOffice === 'pune'
                ? 'bg-white border-purple-400 shadow-xl shadow-purple-500/10 scale-[1.02]'
                : 'bg-white/80 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                Global Resource Center
              </span>
              <Globe2 className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Pune, India</h4>
            <p className="text-xs text-slate-500 mt-1">{siteMeta.resourceCenter.address}</p>
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
              <p><strong>Tel:</strong> (+91) 7709991797</p>
              <p><strong>Alt:</strong> (+91) 80890 07372 | 7758943485</p>
            </div>
          </div>

          {/* UAE Operations */}
          <div 
            onClick={() => setSelectedOffice('uae')}
            className={`cursor-pointer p-6 rounded-3xl border transition-all duration-300 relative ${
              selectedOffice === 'uae'
                ? 'bg-white border-purple-400 shadow-xl shadow-purple-500/10 scale-[1.02]'
                : 'bg-white/80 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-100 text-cyan-800">
                Middle East Operations
              </span>
              <Building2 className="w-5 h-5 text-cyan-600" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Dubai, UAE</h4>
            <p className="text-xs text-slate-500 mt-1">CBUAE Compliance Advisory Hub</p>
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
              <p><strong>Email:</strong> info@retrrac.org</p>
              <p><strong>Coverage:</strong> MENA & GCC Compliance</p>
            </div>
          </div>

        </div>

        {/* Contact Form and Direct Assistance */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl shadow-indigo-500/5 relative overflow-hidden">
          <div className="h-2 absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Let’s Talk To Us
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Whether you require an immediate MLR 2017 firm-wide risk assessment, wish to integrate our CLM RegTech screening engine, or intend to enroll in the CPD-certified CAFS™ program, our senior executives are ready to assist.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-3 text-xs text-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-purple-600 text-white">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Executive Direct Inquiries</p>
                    <p className="text-slate-600">+44 7552237997 | +44 7380923453</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-indigo-600 text-white">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Official Correspondence</p>
                    <p className="text-indigo-600 font-medium">ren@retrrac.org / info@retrrac.org</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-500 space-y-1">
                <p className="font-semibold text-slate-700">Fast Regulatory Response Guarantee:</p>
                <p>All supervisory audit inquiries and risk remediation consultations receive responses within 24 business hours.</p>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3 animate-fadeIn">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Message Received!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you, {formData.firstName}. A senior ReTRRAC compliance consultant will reach out to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 bg-slate-50/50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 bg-slate-50/50 focus:bg-white"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 bg-slate-50/50 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="john.doe@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 bg-slate-50/50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Service Area of Interest</label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 bg-white"
                    >
                      <option value="Consulting">Compliance Consulting (FWRA / PWRA / SRA / HMRC)</option>
                      <option value="Training">ReTRRAC Academy / CAFS™ 60h Certification</option>
                      <option value="Blackthrone">Blackthrone™ Corporate Training Solutions</option>
                      <option value="RegTech">CLM RegTech System (KYC/KYB/Screening Demo)</option>
                      <option value="General Query">General Institutional Query</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Message / Compliance Requirements *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please outline your regulatory timeline, firm type, or specific compliance questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 bg-slate-50/50 focus:bg-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-tech hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Compliance Consultation Request</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
