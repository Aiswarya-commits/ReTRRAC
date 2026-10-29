import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  CheckCircle, 
  ArrowRight, 
  Send, 
  FileCheck2,
  Users
} from 'lucide-react';
import FloatingElements from '../components/common/FloatingElements';
import { internshipProgram } from '../data/siteData';

export default function CareersPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', qualification: 'Undergraduate', linkedin: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', qualification: 'Undergraduate', linkedin: '' });
    }, 4000);
  };

  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden">
      
      {/* Hero Banner with Floating Particles */}
      <div className="relative py-24 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white overflow-hidden">
        <div className="glow-orb w-96 h-96 -top-20 -left-20 bg-purple-500/20" />
        <div className="glow-orb w-96 h-96 -bottom-20 -right-20 bg-indigo-500/20" />

        {/* Floating particles */}
        <FloatingElements count={6} theme="dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full floating-pill-dark text-cyan-300 text-xs font-bold uppercase tracking-wider animate-float-medium">
            <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
            <span>Banking & Financial Services Acceleration</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Student Internship & Careers
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            {internshipProgram.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* 10 Benefits Grid */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900">
              10 Benefits of the ReTRRAC® Internship Program
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Designed to help students and graduates transition into permanent roles in regulated banking & compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {internshipProgram.benefits.map((b, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-purple-300 hover:bg-purple-50/20 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-xl bg-white text-indigo-600 font-bold text-xs flex items-center justify-center shadow-sm border border-slate-200">
                    0{idx + 1}
                  </span>
                  <CheckCircle className="w-4 h-4 text-purple-600 opacity-60" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 pt-1">
                  {b.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {b.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-purple-200 shadow-2xl shadow-indigo-500/10 mb-20 relative overflow-hidden">
          <div className="h-2 absolute top-0 left-0 right-0 bg-gradient-tech" />
          
          <div className="text-center space-y-2 mb-8">
            <h3 className="text-2xl font-extrabold text-slate-900">Apply for Student Internship</h3>
            <p className="text-xs text-slate-500">Submit your details to be matched with upcoming global cohorts.</p>
          </div>

          {submitted ? (
            <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-slate-900">Application Submitted!</h4>
              <p className="text-xs text-slate-600">Our HR coordinator will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@university.edu"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+44 7552 237 997"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Academic Degree / Year</label>
                <select
                  value={form.qualification}
                  onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600 bg-white"
                >
                  <option>Undergraduate (Final Year)</option>
                  <option>Master’s Degree (MSc / LLM)</option>
                  <option>MBA Student / Graduate</option>
                  <option>PhD / Doctoral Scholar</option>
                  <option>Recent Graduate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn Profile or CV Link</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  value={form.linkedin}
                  onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-tech text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all"
              >
                Submit Internship Application
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
