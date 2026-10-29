import React, { useState } from 'react';
import { 
  GraduationCap, 
  Award, 
  Clock, 
  Briefcase, 
  CheckCircle, 
  Sparkles, 
  BookOpen, 
  Users, 
  Layers, 
  Calendar,
  FileCheck,
  ArrowRight
} from 'lucide-react';
import ParallaxCard from '../common/ParallaxCard';
import { academyData } from '../../data/siteData';

export default function AcademySection({ onOpenCopilot }) {
  const [activeTab, setActiveTab] = useState('cafs'); // 'cafs' | 'blackthrone'
  const [enrollModal, setEnrollModal] = useState(false);
  const [enrollForm, setEnrollForm] = useState({ name: '', email: '', phone: '', cohort: 'Upcoming Cohort' });
  const [enrolledSuccess, setEnrolledSuccess] = useState(false);

  const { cafsCourse, blackthrone } = academyData;

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    setEnrolledSuccess(true);
    setTimeout(() => {
      setEnrolledSuccess(false);
      setEnrollModal(false);
    }, 2800);
  };

  return (
    <section id="academy" className="py-24 bg-gradient-to-b from-white via-purple-50/20 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-purple-800 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-purple-600" />
            <span>CPD Accredited Academy & Certifications</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Elevating Financial Crime <span className="text-gradient">Excellence</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {academyData.description}
          </p>

          {/* Switcher Tab */}
          <div className="flex items-center justify-center space-x-3 pt-4">
            <button
              onClick={() => setActiveTab('cafs')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeTab === 'cafs'
                  ? 'bg-gradient-tech text-white shadow-purple-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              Flagship CAFS™ Certification
            </button>
            <button
              onClick={() => setActiveTab('blackthrone')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                activeTab === 'blackthrone'
                  ? 'bg-gradient-tech text-white shadow-purple-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              Blackthrone™ Corporate Training
            </button>
          </div>
        </div>

        {/* Tab 1: CAFS Flagship Certification Card */}
        {activeTab === 'cafs' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-100 shadow-2xl shadow-indigo-500/5 relative overflow-hidden">
            
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Course Details */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                    {cafsCourse.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    {cafsCourse.duration} Total
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                    {cafsCourse.durationBreakdown}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {cafsCourse.title} ({cafsCourse.code})
                  </h3>
                  <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
                    {cafsCourse.summary}
                  </p>
                </div>

                {/* Key Takeaways */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Course Takeaways & Global Syllabus:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {cafsCourse.takeaways.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700"
                      >
                        <CheckCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Practical Features */}
                <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2">
                  <h5 className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                    What’s Inside the CAFS™ Experience:
                  </h5>
                  <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                    {cafsCourse.curriculumFeatures.map((feat, fIdx) => (
                      <li key={fIdx}>{feat}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Right Column: Pricing, Cohort & Enrollment Box */}
              <div className="lg:col-span-5">
                <ParallaxCard maxTilt={10}>
                  <div className="rounded-3xl p-7 sm:p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border border-slate-800 relative">
                    
                    <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        Enrollment Status
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {cafsCourse.seatsStatus}
                      </span>
                    </div>

                    <div className="mt-5 space-y-4">
                      <div>
                        <p className="text-xs text-slate-400">Tuition & Capstone Fee</p>
                        <p className="text-3xl sm:text-4xl font-black text-white text-gradient">
                          {cafsCourse.investment}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Includes 20h LIVE client project & CPD certificate</p>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-300">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Duration:</span>
                          <span className="font-bold text-white">60 Hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Batch Schedule:</span>
                          <span className="font-bold text-cyan-300">{cafsCourse.upcomingBatch}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Career Placement:</span>
                          <span className="font-bold text-purple-300">CV Coaching & Mocks</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setEnrollModal(true)}
                        className="w-full py-4 rounded-xl bg-gradient-tech hover:opacity-95 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center space-x-2"
                      >
                        <GraduationCap className="w-5 h-5 text-cyan-200" />
                        <span>Apply / Enroll in CAFS™</span>
                      </button>

                      <button
                        onClick={onOpenCopilot}
                        className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-2"
                      >
                        <Sparkles className="w-4 h-4 text-cyan-300" />
                        <span>Ask AI Copilot about Syllabus</span>
                      </button>

                    </div>

                  </div>
                </ParallaxCard>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Blackthrone Corporate Training */}
        {activeTab === 'blackthrone' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-2xl shadow-indigo-500/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {blackthrone.badge}
                </span>
                <h3 className="text-3xl font-extrabold text-slate-900">
                  {blackthrone.title}
                </h3>
                <p className="text-slate-600 max-w-2xl mx-auto text-base">
                  {blackthrone.overview}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                {blackthrone.highlights.map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                      0{idx + 1}
                    </div>
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-900 text-white text-center space-y-4">
                <h4 className="text-xl font-bold">Request a Bespoke Corporate Workshop</h4>
                <p className="text-xs sm:text-sm text-purple-200 max-w-xl mx-auto">
                  Train your AML compliance team, front-line banking staff, or accounting partners with customized simulation scenarios.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white text-purple-900 font-bold text-xs sm:text-sm hover:bg-slate-100 transition-all shadow"
                >
                  <span>Book Corporate Masterclass</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Enrollment Modal */}
      {enrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden p-6 sm:p-8">
            <div className="h-2 absolute top-0 left-0 right-0 bg-gradient-tech" />
            
            {enrolledSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Application Submitted!</h3>
                <p className="text-xs text-slate-600">
                  Our admissions counselor will contact you via email & phone with cohort details and registration materials.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">CAFS™ Enrollment Application</h3>
                    <p className="text-xs text-slate-500">Certified Anti-Financial Crime Specialist (60 Hours)</p>
                  </div>
                  <button 
                    onClick={() => setEnrollModal(false)}
                    className="text-slate-400 hover:text-slate-600 font-bold text-lg"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleEnrollSubmit} className="mt-5 space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jane Doe"
                      value={enrollForm.name}
                      onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Corporate or Personal Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@organization.com"
                      value={enrollForm.email}
                      onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (with Country Code) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+44 7552 237 997"
                      value={enrollForm.phone}
                      onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-tech text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all"
                    >
                      Submit Application
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
