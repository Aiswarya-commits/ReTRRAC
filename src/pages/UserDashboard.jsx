import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, Navigate } from 'react-router-dom';
import {
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  Download,
  CreditCard,
  PlayCircle,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  User,
  Check,
  Printer,
  QrCode,
  FileCheck2,
  Calendar,
  Lock,
  Layers,
  ArrowRight,
  LogOut,
  ShoppingBag,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { useBookings } from '../context/BookingContext';
import { coursesCatalog } from '../data/coursesCatalog';

function UserDashboardInner() {
  const { currentUser, signOut, openAuthModal } = useAuth();
  const { formatAmount } = useCurrency();
  const { bookings, getBookingsByEmail } = useBookings();
  const [searchParams] = useSearchParams();

  const urlTab = searchParams.get('tab');
  const trackIdParam = searchParams.get('trackId');

  const [activeTab, setActiveTab] = useState(urlTab || 'bookings'); // 'bookings' | 'courses' | 'certificates' | 'invoices' | 'tutor'
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [learningModalOpen, setLearningModalOpen] = useState(false);
  const [certificateModalOpen, setCertificateModalOpen] = useState(false);
  const [invoiceModalBooking, setInvoiceModalBooking] = useState(null);

  // If user is not logged in, show access barrier
  // if (!currentUser) {
  //   return (
  //     <div className="min-h-screen bg-slate-50 pt-28 pb-20 flex items-center justify-center p-4 font-sans">
  //       <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5">
  //         <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
  //           <Lock className="w-8 h-8" />
  //         </div>
  //         <div className="space-y-1.5">
  //           <h2 className="text-2xl font-black text-slate-900">Sign In Required</h2>
  //           <p className="text-xs text-slate-500 leading-relaxed">
  //             Please sign in to access your Candidate Portal, view your enrolled qualifications, track course bookings, and download official CPD UK certificates.
  //           </p>
  //         </div>
  //         <div className="pt-2 flex flex-col sm:flex-row gap-3">
  //           <button
  //             onClick={() => openAuthModal('signin')}
  //             className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors"
  //           >
  //             Sign In to Your Account
  //           </button>
  //           <button
  //             onClick={() => openAuthModal('signup')}
  //             className="flex-1 py-3 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold text-xs transition-colors"
  //           >
  //             Register as New Scholar
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // STRICT PER-USER FILTER: Only show bookings belonging to the current user!
  const displayBookings = getBookingsByEmail(currentUser.email);

  useEffect(() => {
    if (urlTab) {
      setActiveTab(urlTab);
    }
  }, [urlTab]);

  // Derive enrolled courses for this user based on their bookings and profile
  const isAlistairDemo = currentUser.email.toLowerCase() === 'a.finch@mayfaircapital.co.uk';

  // Base modules template
  const defaultModules = [
    { id: 1, title: "Module 1: Global Financial Crime Framework & UK MLR 2017", duration: "10 Hours", completed: true },
    { id: 2, title: "Module 2: Customer Due Diligence (CDD), EDD & PEP Screening", duration: "10 Hours", completed: true },
    { id: 3, title: "Module 3: Sanctions Advisory & Proliferation Financing", duration: "10 Hours", completed: true },
    { id: 4, title: "Module 4: Transaction Monitoring & UK NCA Reporting", duration: "10 Hours", completed: false },
    { id: 5, title: "Module 5: RegTech Automation & CLM Systems Architecture", duration: "10 Hours", completed: false },
    { id: 6, title: "Module 6: Live 20-Hour Forensic Capstone Project", duration: "20 Hours", completed: false }
  ];

  // Build active courses for this specific user
  const initialUserCourses = isAlistairDemo ? [
    {
      id: "cafs-specialist",
      code: "CAFS™",
      title: "Certified Anti-Financial Crime Specialist",
      cohort: "July 01, 2026 Cohort",
      progress: 68,
      totalHours: 60,
      completedHours: 41,
      cpdPoints: 60,
      certificateReady: true,
      certificateId: "CPD-UK-RETRRAC-2026-8942",
      nextLesson: "Module 4: Transaction Monitoring & SARs Reporting",
      modules: defaultModules
    },
    {
      id: "blackthrone-aml",
      code: "BT-SIM",
      title: "Blackthrone™ AML & Sanctions Evasion Simulation",
      cohort: "July 15, 2026 Cohort",
      progress: 25,
      totalHours: 30,
      completedHours: 8,
      cpdPoints: 30,
      certificateReady: false,
      certificateId: null,
      nextLesson: "Phase 2: Complex Sanctions Circumvention via Transshipment Hubs",
      modules: [
        { id: 1, title: "Phase 1: Shell Entity Networks & UBO Tracing", duration: "6 Hours", completed: true },
        { id: 2, title: "Phase 2: Complex Sanctions Circumvention via Transshipment Hubs", duration: "8 Hours", completed: false },
        { id: 3, title: "Phase 3: Digital Asset & Crypto Mixer Forensic Tracing", duration: "8 Hours", completed: false },
        { id: 4, title: "Phase 4: Regulatory Defense & Defense Dossier Submission", duration: "8 Hours", completed: false }
      ]
    }
  ] : (
    // If not Alistair, build strictly from their confirmed bookings!
    displayBookings.flatMap(b => (b.courses || []).map((c, idx) => ({
      id: c.courseId || `course-${idx}`,
      code: c.code || 'CAFS™',
      title: c.title,
      cohort: c.cohort || 'July 01, 2026 Cohort',
      progress: b.bookingStatus === 'Completed' ? 100 : b.bookingStatus === 'Access Granted' ? 15 : 0,
      totalHours: 60,
      completedHours: b.bookingStatus === 'Completed' ? 60 : b.bookingStatus === 'Access Granted' ? 9 : 0,
      cpdPoints: c.cpdPoints || 30,
      certificateReady: b.certificateIssued || b.bookingStatus === 'Completed',
      certificateId: b.certificateId,
      nextLesson: "Module 1: Orientation & Regulatory Framework",
      modules: defaultModules
    })))
  );

  const [myCourses, setMyCourses] = useState(initialUserCourses);

  // Sync courses if bookings change
  useEffect(() => {
    if (!isAlistairDemo) {
      const derived = displayBookings.flatMap(b => (b.courses || []).map((c, idx) => ({
        id: c.courseId || `course-${idx}`,
        code: c.code || 'CAFS™',
        title: c.title,
        cohort: c.cohort || 'July 01, 2026 Cohort',
        progress: b.bookingStatus === 'Completed' ? 100 : b.bookingStatus === 'Access Granted' ? 15 : 0,
        totalHours: 60,
        completedHours: b.bookingStatus === 'Completed' ? 60 : b.bookingStatus === 'Access Granted' ? 9 : 0,
        cpdPoints: c.cpdPoints || 30,
        certificateReady: b.certificateIssued || b.bookingStatus === 'Completed',
        certificateId: b.certificateId,
        nextLesson: "Module 1: Orientation & Regulatory Framework",
        modules: defaultModules
      })));
      setMyCourses(derived);
    }
  }, [displayBookings.map((b) => `${b.bookingId}:${b.bookingStatus}:${b.certificateIssued}`).join('|'), isAlistairDemo]);
  // AI Tutor chat
  const [tutorQuery, setTutorQuery] = useState('');
  const [tutorChat, setTutorChat] = useState([
    {
      sender: 'ai',
      text: `Hello ${currentUser.name}! I'm your ReTRRAC AI Academic Tutor. I can explain any MLR 2017 case study, break down PEP guidelines, or prepare you for your upcoming assessment. What would you like to review?`
    }
  ]);

  const handleSendTutor = (e) => {
    e.preventDefault();
    if (!tutorQuery.trim()) return;

    const userText = tutorQuery;
    setTutorChat(prev => [...prev, { sender: 'user', text: userText }]);
    setTutorQuery('');

    setTimeout(() => {
      let reply = "Under UK MLR 2017 (Regulation 33), Enhanced Due Diligence (EDD) is strictly mandatory where a transaction or business relationship involves a Politically Exposed Person (PEP), high-risk third countries designated by FATF, or any transaction that is complex, unusually large, or with no apparent lawful purpose.";
      if (userText.toLowerCase().includes('sar') || userText.toLowerCase().includes('nca')) {
        reply = "A Suspicious Activity Report (SAR) must be filed with the UK National Crime Agency (NCA) as soon as practicable whenever a nominated officer suspects money laundering or terrorist financing under POCA 2002. Remember to avoid tipping off under Section 333A!";
      }
      setTutorChat(prev => [...prev, { sender: 'ai', text: reply }]);
    }, 700);
  };

  const handleToggleModule = (courseIndex, moduleIndex) => {
    setMyCourses(prev => {
      const copy = [...prev];
      if (!copy[courseIndex]) return prev;
      const targetCourse = { ...copy[courseIndex] };
      const modules = [...targetCourse.modules];
      modules[moduleIndex].completed = !modules[moduleIndex].completed;
      targetCourse.modules = modules;

      const completedCount = modules.filter(m => m.completed).length;
      targetCourse.progress = Math.round((completedCount / modules.length) * 100);
      targetCourse.completedHours = Math.round((targetCourse.progress / 100) * targetCourse.totalHours);

      if (targetCourse.progress >= 100) {
        targetCourse.certificateReady = true;
        if (!targetCourse.certificateId) {
          targetCourse.certificateId = `CPD-UK-RETRRAC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        }
      }

      copy[courseIndex] = targetCourse;
      return copy;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 font-sans">

      {/* Top Banner & Profile Overview */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-xl shadow-indigo-500/20">
                <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center font-black text-2xl text-indigo-700">
                  {currentUser.name ? currentUser.name.charAt(0) : 'U'}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-black text-slate-900">
                    {currentUser.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                    {currentUser.role === 'admin' ? 'Deanery Administrator' : 'Candidate Scholar'}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {currentUser.email} • {currentUser.organization || "London Financial District"}
                </p>
                <div className="flex items-center space-x-3 text-xs text-slate-600 mt-1">
                  <span className="flex items-center text-emerald-600 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> CPD Candidate Verified
                  </span>
                  <span>•</span>
                  <span>Country: <strong className="text-slate-800">{currentUser.country || "United Kingdom"}</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Sign Out */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="p-2 px-3 rounded-xl bg-purple-50 border border-purple-200 text-right">
                <span className="text-[10px] uppercase font-bold text-purple-700 block">My Active Enrolments</span>
                <span className="text-xl font-black text-purple-900">{displayBookings.length} Programmes</span>
              </div>

              {currentUser.role === 'admin' && (
                <Link
                  to="/admin/dashboard"
                  className="px-4 py-2.5 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1"
                >
                  <Lock className="w-3.5 h-3.5 mr-1 text-purple-300" />
                  <span>Admin Command →</span>
                </Link>
              )}

              <button
                onClick={signOut}
                className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold text-xs transition-colors flex items-center space-x-1"
                title="Sign out of candidate account"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-2 sm:space-x-4 mt-8 border-t border-slate-100 pt-4 overflow-x-auto">

            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${activeTab === 'bookings'
                ? 'bg-gradient-tech text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <FileCheck2 className="w-4 h-4 text-cyan-200" />
              <span>Track My Bookings ({displayBookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${activeTab === 'courses'
                ? 'bg-gradient-tech text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Enrolled Programs ({myCourses.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${activeTab === 'certificates'
                ? 'bg-gradient-tech text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <Award className="w-4 h-4" />
              <span>Digital CPD Certificates</span>
            </button>

            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${activeTab === 'invoices'
                ? 'bg-gradient-tech text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>PayPal Invoices & Receipts ({displayBookings.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('tutor')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${activeTab === 'tutor'
                ? 'bg-gradient-tech text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>AI Study Coach</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* 1. TRACK MY BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  My Enrolment & Booking Progress Tracker
                </h2>
                <p className="text-xs text-slate-500">
                  Showing live fulfillment updates for orders registered under <strong className="text-slate-700">{currentUser.email}</strong>.
                </p>
              </div>

              <Link
                to="/retrrac-academy"
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center space-x-1.5 self-start"
              >
                <span>Browse More Academy Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* List of Bookings with Stepper */}
            {displayBookings.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">No Course Bookings Yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    You have not enrolled in any programmes under this account yet. Browse our CPD UK accredited courses and book via PayPal to see your live progress here.
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    to="/retrrac-academy"
                    className="px-5 py-2.5 rounded-xl bg-gradient-tech text-white font-bold text-xs shadow-md transition-all inline-flex items-center space-x-2"
                  >
                    <span>Explore ReTRRAC Academy Courses</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {displayBookings.map((b) => {
                  const isTarget = trackIdParam && b.bookingId.toLowerCase() === trackIdParam.toLowerCase();

                  return (
                    <div
                      key={b.bookingId}
                      className={`bg-white rounded-3xl p-6 sm:p-8 border transition-all space-y-6 ${isTarget
                        ? 'border-indigo-500 shadow-2xl ring-2 ring-indigo-200'
                        : 'border-slate-200/90 shadow-lg shadow-slate-900/5'
                        }`}
                    >
                      {/* Booking Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                        <div>
                          <div className="flex items-center space-x-2.5">
                            <span className="font-mono font-black text-lg text-indigo-700">
                              {b.bookingId}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${b.bookingStatus === 'Access Granted'
                              ? 'bg-purple-50 text-purple-800 border-purple-200'
                              : b.bookingStatus === 'Completed'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : b.bookingStatus === 'Confirmed'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : b.bookingStatus === 'Processing'
                                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                                    : 'bg-red-50 text-red-800 border-red-200'
                              }`}>
                              {b.bookingStatus}
                            </span>
                          </div>
                          <h3 className="text-base font-extrabold text-slate-900 mt-1">
                            {b.courses ? b.courses.map(c => c.title).join(', ') : 'CAFS™ Specialist'}
                          </h3>
                          <p className="text-xs text-slate-500">
                            Cohort: <strong className="text-slate-800">{b.courses && b.courses[0] ? b.courses[0].cohort : 'July 01, 2026 Batch'}</strong> • Booked: {b.date}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2.5">
                          <button
                            onClick={() => setInvoiceModalBooking(b)}
                            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center space-x-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>VAT Invoice</span>
                          </button>

                          {b.lmsAccessGranted ? (
                            <button
                              onClick={() => {
                                if (myCourses.length > 0) {
                                  setSelectedCourse(myCourses[0]);
                                  setLearningModalOpen(true);
                                }
                              }}
                              className="px-4 py-2 rounded-xl bg-gradient-tech text-white font-bold text-xs shadow-md shadow-indigo-500/20 hover:opacity-95 transition-all flex items-center space-x-1"
                            >
                              <PlayCircle className="w-3.5 h-3.5" />
                              <span>Launch LMS Course</span>
                            </button>
                          ) : (
                            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
                              LMS Provisioning (Within 24h)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Step-by-Step Milestone Progress Stepper */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>Enrolment Process Milestones:</span>
                          <span className="text-slate-400 font-mono">Payment ID: {b.paypalOrderId || b.cashfreeOrderId}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                          {b.timeline.map((step) => {
                            const isDone = step.status === 'completed';
                            const isCurrent = step.status === 'in-progress';

                            return (
                              <div
                                key={step.step}
                                className={`p-3.5 rounded-2xl border text-xs space-y-1.5 transition-all ${isDone
                                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                                  : isCurrent
                                    ? 'bg-indigo-50 border-indigo-300 ring-2 ring-indigo-200 text-indigo-950'
                                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-75'
                                  }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${isDone ? 'bg-emerald-600 text-white' : isCurrent ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-200 text-slate-500'
                                    }`}>
                                    {isDone ? '✓' : step.step}
                                  </span>
                                  <span className="text-[9px] font-mono text-slate-500">
                                    {step.time.split(' ')[0]}
                                  </span>
                                </div>
                                <h4 className="font-bold text-xs leading-tight">
                                  {step.title}
                                </h4>
                                <p className="text-[10px] line-clamp-2 leading-relaxed opacity-90">
                                  {step.desc}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Payment & London Accreditation Note */}
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
                        <div className="flex items-center space-x-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span>Payment Settled: <strong>{b.currency === 'INR' ? '₹' : '£'}{Number(b.totalAmount).toLocaleString()}</strong> ({b.paymentGateway} · {b.paypalOrderId || b.cashfreeOrderId})</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-purple-600" />
                          <span>Accreditation: <strong>CPD UK Standards Office (London Registry)</strong></span>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 2. ENROLLED COURSES TAB */}
        {activeTab === 'courses' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">My Active Qualifications</h2>
              <p className="text-xs text-slate-500">Resume study modules, capstone simulation labs, and interactive tests.</p>
            </div>

            {myCourses.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">No Enrolled Courses</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Once you book an accredited course via PayPal, your curriculum modules and virtual London classroom links will be activated here.
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    to="/retrrac-academy"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors inline-block"
                  >
                    Browse Academy Courses
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myCourses.map((c, idx) => (
                  <div key={c.id} className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-1.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                            {c.code}
                          </span>
                          <span className="text-xs text-slate-500 font-semibold">{c.cohort}</span>
                        </div>
                        <h3 className="text-lg font-black text-slate-900">{c.title}</h3>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-2xl font-black text-indigo-700">{c.progress}%</span>
                        <span className="text-[10px] text-slate-400 block font-semibold">Completed</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-500 mt-1.5">
                        <span>{c.completedHours} of {c.totalHours} Hours Logged</span>
                        <span className="font-semibold text-purple-700">{c.cpdPoints} CPD Points</span>
                      </div>
                    </div>

                    {/* Next Lesson Box */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Up Next:</span>
                        <span className="font-semibold text-slate-800">{c.nextLesson}</span>
                      </div>
                      <PlayCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => {
                          setSelectedCourse({ ...c, courseIndex: idx });
                          setLearningModalOpen(true);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-tech text-white font-bold text-xs shadow-md shadow-indigo-500/20 hover:opacity-95 transition-all flex items-center space-x-1.5"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Resume Study & Syllabus</span>
                      </button>

                      {c.certificateReady ? (
                        <button
                          onClick={() => {
                            setSelectedCourse(c);
                            setCertificateModalOpen(true);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs hover:bg-emerald-100 transition-colors flex items-center space-x-1"
                        >
                          <Award className="w-4 h-4 text-emerald-600" />
                          <span>View CPD Certificate</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-1" /> Finish all modules to unlock certificate
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. CERTIFICATES TAB */}
        {activeTab === 'certificates' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">My Accredited CPD UK Digital Credentials</h2>
              <p className="text-xs text-slate-500">Official London HQ verifications registered with CPD UK Standards Office.</p>
            </div>

            {myCourses.filter(c => c.certificateReady).length === 0 ? (
              <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
                <Award className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No Certificates Issued Yet</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Complete all modules and the 20-hour forensic capstone project in your enrolled programmes to unlock your verified CPD UK Certificate.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myCourses.filter(c => c.certificateReady).map((c) => (
                  <div key={c.id} className="bg-white rounded-3xl p-8 border-2 border-purple-200/80 shadow-xl shadow-purple-500/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-200/40 via-cyan-100/20 to-transparent rounded-bl-full pointer-events-none" />

                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 rounded-2xl bg-purple-100 text-purple-700">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">CPD Accredited UK Certificate</span>
                        <h3 className="text-lg font-black text-slate-900">{c.title}</h3>
                      </div>
                    </div>

                    <div className="space-y-2 py-4 border-y border-slate-100 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span>Recipient:</span>
                        <strong className="text-slate-800">{currentUser.name}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Certificate Verification ID:</span>
                        <strong className="font-mono text-purple-700">{c.certificateId}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>CPD Credits Conferred:</span>
                        <strong className="text-emerald-700">{c.cpdPoints} Hours (UK Standards)</strong>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <Link
                        to={`/verify/${c.certificateId}`}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center"
                      >
                        <span>Public Registry Link</span>
                        <ExternalLink className="w-3.5 h-3.5 ml-1" />
                      </Link>

                      <button
                        onClick={() => {
                          setSelectedCourse(c);
                          setCertificateModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                      >
                        Open Full Certificate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. INVOICES TAB */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Official PayPal Receipts & London Invoices</h3>
              <p className="text-xs text-slate-500">VAT compliant receipts issued by ReTRRAC Global Ltd. Cannon Street, London for {currentUser.email}.</p>
            </div>

            {displayBookings.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No invoices recorded under this account.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="p-4">Invoice / Booking Ref</th>
                      <th className="p-4">Program</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Settled Amount</th>
                      <th className="p-4">Gateway</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {displayBookings.map((b) => (
                      <tr key={b.bookingId} className="hover:bg-slate-50/50">
                        <td className="p-4 font-mono font-bold text-indigo-700">{b.bookingId}</td>
                        <td className="p-4 font-semibold text-slate-900">
                          {b.courses ? b.courses.map(c => c.title).join(', ') : 'CAFS™ Specialist'}
                        </td>
                        <td className="p-4">{b.date}</td>
                        <td className="p-4 font-black text-slate-900">
                          {b.currency === 'INR' ? '₹' : '£'}{Number(b.totalAmount).toLocaleString()}
                        </td>
                        <td className="p-4">
                          <span className="font-mono text-[10px] bg-amber-50 text-amber-900 px-2 py-0.5 rounded border border-amber-200 font-bold">
                            {b.paymentGateway} · {b.paypalOrderId || b.cashfreeOrderId}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => setInvoiceModalBooking(b)}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                          >
                            View / Print Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* 5. AI TUTOR TAB */}
        {activeTab === 'tutor' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 animate-fade-in">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">ReTRRAC AI Academic Coach & Exam Prep</h3>
              <p className="text-xs text-slate-500">Directly ask regulatory questions regarding MLR 2017, SAR filings, CDD/EDD, or sanctions case studies.</p>
            </div>

            <div className="h-80 overflow-y-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              {tutorChat.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-br-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendTutor} className="flex space-x-2">
              <input
                type="text"
                value={tutorQuery}
                onChange={(e) => setTutorQuery(e.target.value)}
                placeholder="Ask your AI tutor e.g. What is the statutory threshold for Enhanced Due Diligence under MLR 2017?"
                className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md"
              >
                Send Question
              </button>
            </form>
          </div>
        )}

      </div>

      {/* LEARNING / MODULE MODAL */}
      {learningModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-6 my-8">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">{selectedCourse.code}</span>
                <h3 className="text-xl font-black text-slate-900">{selectedCourse.title}</h3>
                <p className="text-xs text-slate-500">{selectedCourse.cohort}</p>
              </div>
              <button onClick={() => setLearningModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Curriculum Module Checklist:</h4>
              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {selectedCourse.modules.map((m, mIdx) => (
                  <div
                    key={m.id}
                    onClick={() => handleToggleModule(selectedCourse.courseIndex ?? 0, mIdx)}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-purple-300 flex items-center justify-between text-xs cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={m.completed}
                        onChange={() => { }}
                        className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                      />
                      <span className={`font-semibold ${m.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {m.title}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 shrink-0">{m.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={() => setLearningModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Save Progress & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ACCREDITED CERTIFICATE MODAL */}
      {certificateModalOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-purple-900/10 p-8 sm:p-12 my-8 text-slate-900">
            <button
              onClick={() => setCertificateModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              ✕
            </button>

            <div className="border-4 border-double border-indigo-950/20 p-8 sm:p-12 rounded-2xl text-center space-y-6 relative bg-gradient-to-b from-slate-50/50 via-white to-purple-50/30">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="text-left">
                  <span className="text-[11px] font-black tracking-widest text-indigo-950 uppercase block">RETRRAC GLOBAL</span>
                  <span className="text-[9px] text-slate-500 font-semibold">CANNON STREET • LONDON EC4N 6NP</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-7 h-7 text-purple-700" />
                  <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider">CPD Standards UK</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">This is to certify that</p>
                <h3 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
                  {currentUser.name}
                </h3>
                <p className="text-xs text-slate-500 max-w-xl mx-auto">
                  has successfully fulfilled all curriculum, forensic examination, and practical project requirements for
                </p>
              </div>

              <div className="py-2">
                <h4 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950">
                  {selectedCourse.title}
                </h4>
                <p className="text-xs font-semibold text-purple-700 mt-1">
                  Accredited Qualification Code: {selectedCourse.code} • 60 Continuing Professional Development Hours
                </p>
              </div>

              <div className="grid grid-cols-3 items-end pt-8 border-t border-slate-200">
                <div className="text-center">
                  <p className="font-serif italic text-base text-slate-800">Renjith Kalappurackal</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">Chief Executive & Dean</p>
                  <p className="text-[9px] text-slate-400">ReTRRAC Global Ltd, UK</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full border-2 border-amber-500/50 bg-amber-50 flex items-center justify-center text-amber-700 shadow-inner">
                    <ShieldCheck className="w-9 h-9" />
                  </div>
                  <span className="text-[9px] font-bold text-amber-900 mt-1 uppercase">Official London Seal</span>
                </div>

                <div className="text-center">
                  <p className="font-mono text-xs font-bold text-slate-800">{selectedCourse.certificateId}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">Verifiable CPD Registry ID</p>
                  <p className="text-[9px] text-emerald-600 font-semibold">Status: Active & Verified</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500 flex items-center">
                <QrCode className="w-4 h-4 mr-1 text-slate-400" />
                Scan QR or visit <strong className="text-indigo-600 ml-1">retrrac.org/verify/{selectedCourse.certificateId}</strong>
              </span>

              <div className="flex space-x-3">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  onClick={() => setCertificateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OFFICIAL UK INVOICE MODAL */}
      {invoiceModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 sm:p-10 space-y-6 text-slate-800 my-8">
            <div className="flex justify-between items-start pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Official VAT Tax Invoice</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">ReTRRAC Global Ltd.</h3>
                <p className="text-xs text-slate-500">60 Cannon Street, London EC4N 6NP, United Kingdom</p>
                <p className="text-[11px] text-slate-500">Company Reg: #13892014 • VAT Reg: GB 384 9201 82</p>
              </div>

              <div className="text-right">
                <span className="font-mono text-sm font-bold text-indigo-700 block">{invoiceModalBooking.bookingId}</span>
                <span className="text-xs text-slate-400 block">{invoiceModalBooking.date}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-block mt-1">
                  PAID IN FULL
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Candidate / Client:</span>
                <strong className="text-slate-900 text-sm block">{invoiceModalBooking.studentName}</strong>
                <span className="text-slate-600 block">{invoiceModalBooking.email}</span>
                <span className="text-slate-500 block">{invoiceModalBooking.organization}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Payment Gateway:</span>
                <strong className="text-slate-800 block">{invoiceModalBooking.paymentGateway}</strong>
                <span className="text-slate-500 font-mono block">Order ID: {invoiceModalBooking.paypalOrderId || invoiceModalBooking.cashfreeOrderId}</span>
                <span className="text-slate-500 block">Accreditation: CPD UK Standards Office</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3">Program Description</th>
                    <th className="p-3">Cohort Batch</th>
                    <th className="p-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoiceModalBooking.courses && invoiceModalBooking.courses.map((c, i) => (
                    <tr key={i}>
                      <td className="p-3 font-semibold text-slate-900">{c.title} ({c.code})</td>
                      <td className="p-3 text-slate-500">{c.cohort}</td>
                      <td className="p-3 text-right font-bold text-slate-900">
                        {invoiceModalBooking.currency === 'INR' ? '₹' : '£'}{Number(c.price).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 font-bold text-xs border-t border-slate-200">
                  <tr>
                    <td colSpan="2" className="p-3 text-slate-700">Total Paid:</td>
                    <td className="p-3 text-right text-indigo-700 font-black text-sm">
                      {invoiceModalBooking.currency === 'INR' ? '₹' : '£'}{Number(invoiceModalBooking.totalAmount).toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-slate-500 text-[11px]">Authorized by London Registrar & Dean Renjith Kalappurackal</span>
              <div className="space-x-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold"
                >
                  Print / Save as PDF
                </button>
                <button
                  onClick={() => setInvoiceModalBooking(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Sign-in gate. The dashboard only renders once someone is signed in,
// so React hooks always run in the same order.
export default function UserDashboard() {
  const { currentUser, openAuthModal } = useAuth();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 pt-28 pb-20 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-2xl font-black text-slate-900">Sign In Required</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Please sign in to access your Candidate Portal, view your enrolled qualifications, track course bookings, and download official CPD UK certificates.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => openAuthModal('signin')}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors"
            >
              Sign In to Your Account
            </button>
            <button
              onClick={() => openAuthModal('signup')}
              className="flex-1 py-3 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold text-xs transition-colors"
            >
              Register as New Scholar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentUser.role === 'admin') return <Navigate to="/admin/dashboard" replace />;

  return <UserDashboardInner key={currentUser.email} />;
}
