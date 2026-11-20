import React, { useState } from 'react';
import {
  CheckCircle,
  Lightbulb,
  Briefcase,
  Users,
  ListChecks,
  Network,
  Compass,
  FileText,
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import { internshipProgram } from '../data/siteData';

// One icon per benefit, in the same order as internshipProgram.benefits in siteData.js
const benefitIcons = [Lightbulb, Briefcase, Users, ListChecks, Network, Compass, FileText, TrendingUp, Award, Sparkles];

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
      
      {/* Banner – same light, logo-coloured style as every other page */}
      <PageBanner
        title="Student Internship & Careers"
        highlight="Internship & Careers"
        crumb="Internship & Careers"
        subtitle={internshipProgram.description}
        image="/Finance.jpg"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">

        {/* 10 Benefits */}
        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-accent-700 bg-accent-50 px-3.5 py-1.5 rounded-full border border-accent-200">
              Why Intern With Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-ink tracking-tight">
              10 Benefits of the <span className="text-gradient">ReTRRAC® Internship</span> Programme
            </h2>
            <p className="text-sm text-slate-500">
              Designed to help students and graduates transition into permanent roles in regulated banking &amp; compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {internshipProgram.benefits.map((b, idx) => {
              const Icon = benefitIcons[idx] || CheckCircle;
              const orange = idx % 2 === 1;
              return (
                <div
                  key={b.title}
                  className="group relative p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 hover:border-brand-300 transition-all duration-300 flex flex-col"
                >
                  <span className="absolute top-5 right-5 text-3xl font-black text-slate-100 group-hover:text-brand-100 transition-colors select-none">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div
                    className={`relative w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-md transition-transform group-hover:scale-110 ${
                      orange ? 'bg-accent-500 text-white shadow-accent-500/30' : 'bg-gradient-tech text-white shadow-brand-500/30'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-black text-ink leading-snug">{b.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">{b.detail}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Application Form Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-brand-200 shadow-2xl shadow-brand-500/10 mb-20 relative overflow-hidden">
          <div className="h-2 absolute top-0 left-0 right-0 bg-gradient-tech" />
          
          <div className="text-center space-y-2 mb-8">
            <h3 className="text-2xl font-black text-ink">Apply for Student Internship</h3>
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-600"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-600"
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Academic Degree / Year</label>
                <select
                  value={form.qualification}
                  onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-600 bg-white"
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-tech text-white font-bold text-xs shadow-lg shadow-brand-500/25 hover:opacity-95 transition-all"
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