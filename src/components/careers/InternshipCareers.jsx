import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  Building, 
  Send, 
  FileCheck
} from 'lucide-react';
import { internshipProgram } from '../../data/siteData';

export default function InternshipCareers() {
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', qualification: 'Undergraduate', resumeLink: '' });

  const handleApply = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setApplyModalOpen(false);
    }, 2500);
  };

  return (
    <section id="careers" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/80 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-600" />
            <span>Global Career Acceleration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Student <span className="text-gradient">Internship & Careers</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {internshipProgram.description}
          </p>
        </div>

        {/* 10 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {internshipProgram.benefits.map((b, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-purple-300 hover:bg-purple-50/30 transition-all duration-300 space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-xl bg-white text-indigo-600 font-bold text-xs flex items-center justify-center shadow-sm border border-slate-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  0{idx + 1}
                </span>
                <CheckCircle className="w-4 h-4 text-purple-600 opacity-60" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 pt-1 group-hover:text-indigo-900">
                {b.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {b.detail}
              </p>
            </div>
          ))}

          {/* Banner card filling 10th slot/callout */}
          <div className="md:col-span-2 lg:col-span-2 p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Global Applications Open
              </span>
              <h3 className="text-xl font-bold">Launch Your Career in Financial Crime Prevention</h3>
              <p className="text-xs text-purple-200 max-w-lg">
                Interns receive dedicated onboarding, work on live sanctions screening and CRRM tasks, and present their capstone projects directly to ReTRRAC executives.
              </p>
            </div>
            <button
              onClick={() => setApplyModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-400 hover:from-cyan-300 hover:to-indigo-300 text-slate-950 font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-lg"
            >
              Apply for Internship
            </button>
          </div>
        </div>

      </div>

      {/* Application Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8">
            <div className="h-2 absolute top-0 left-0 right-0 bg-gradient-tech" />
            
            {submitted ? (
              <div className="text-center py-6 space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900">Application Received</h4>
                <p className="text-xs text-slate-500">Our HR and training coordinators will review your submission.</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900">Student Internship Application</h3>
                  <button onClick={() => setApplyModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                </div>

                <form onSubmit={handleApply} className="mt-4 space-y-3 text-left">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={form.name} 
                      onChange={(e) => setForm({...form, name: e.target.value})}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:outline-none focus:border-indigo-600" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      value={form.email} 
                      onChange={(e) => setForm({...form, email: e.target.value})}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:outline-none focus:border-indigo-600" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Current Academic Level</label>
                    <select 
                      value={form.qualification} 
                      onChange={(e) => setForm({...form, qualification: e.target.value})}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:outline-none focus:border-indigo-600 bg-white"
                    >
                      <option>Undergraduate Student / Final Year</option>
                      <option>Master’s Degree (MSc / LLM)</option>
                      <option>MBA Graduate</option>
                      <option>PhD / Doctoral Scholar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn Profile or CV Link</label>
                    <input 
                      type="url" 
                      placeholder="https://linkedin.com/in/..." 
                      value={form.resumeLink} 
                      onChange={(e) => setForm({...form, resumeLink: e.target.value})}
                      className="w-full px-3 py-2 border rounded-xl text-xs focus:outline-none focus:border-indigo-600" 
                    />
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-gradient-tech text-white font-bold text-xs shadow-md"
                    >
                      Submit Internship Application
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
}
