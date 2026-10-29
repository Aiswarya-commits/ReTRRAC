import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Award, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Calendar, 
  FileText, 
  Sparkles, 
  Users, 
  CheckCircle2, 
  Lock,
  CreditCard,
  Building2,
  ShieldCheck,
  MapPin,
  Download,
  Heart,
  ShoppingBag,
  Star,
  ChevronDown,
  ChevronUp,
  Share2,
  HelpCircle,
  BookOpen,
  PhoneCall
} from 'lucide-react';
import FloatingElements from '../components/common/FloatingElements';
import PayPalCheckoutModal from '../components/payment/PayPalCheckoutModal';
import { coursesCatalog, getCourseById } from '../data/coursesCatalog';
import { useCurrency } from '../context/CurrencyContext';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useAuth } from '../context/AuthContext';

export default function CourseDetailPage({ onOpenCopilot }) {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currency, formatAmount } = useCurrency();
  const { addToCart, isInCart, toggleWishlist, isInWishlist } = useCartWishlist();
  const { currentUser, openAuthModal } = useAuth();

  // Find course from catalog, fallback to CAFS
  const course = getCourseById(courseId) || coursesCatalog[0];

  const [selectedCohort, setSelectedCohort] = useState(
    course.cohorts && course.cohorts.length > 0 ? course.cohorts[0].date : 'July 01, 2026'
  );
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'syllabus' | 'outcomes' | 'audience' | 'faculty' | 'faqs'
  const [expandedModule, setExpandedModule] = useState(1);
  const [payPalModalOpen, setPayPalModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (course.cohorts && course.cohorts.length > 0) {
      setSelectedCohort(course.cohorts[0].date);
    }
  }, [courseId]);

  const inCartAlready = isInCart(course.id);
  const inWishlistAlready = isInWishlist(course.id);

  const handleAddToCart = () => {
    addToCart(course, selectedCohort, true);
  };

  const handleDirectBuy = () => {
    if (!currentUser) {
      openAuthModal('signin', () => setPayPalModalOpen(true), 'Please sign in or create an account to enrol and proceed to PayPal payment.');
      return;
    }
    setPayPalModalOpen(true);
  };

  return (
    <div className="bg-white pt-24 pb-20 font-sans">
      
      {/* Breadcrumb Navigation (Inspired by UCEM Online Academy) */}
      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/retrrac-academy" className="hover:text-indigo-600 transition-colors">ReTRRAC Academy</Link>
            <span>/</span>
            <span className="text-slate-400">Courses</span>
            <span>/</span>
            <span className="font-bold text-slate-800 truncate max-w-xs">{course.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Header Section */}
      <div className="relative py-16 sm:py-20 bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white overflow-hidden">
        <div className="glow-orb w-96 h-96 -top-20 -left-20 bg-purple-500/20" />
        <div className="glow-orb w-96 h-96 -bottom-20 -right-20 bg-indigo-500/20" />
        <FloatingElements count={5} theme="dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-purple-900/80 border border-purple-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider flex items-center">
                <GraduationCap className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
                {course.badge}
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 flex items-center">
                <Award className="w-3.5 h-3.5 mr-1" />
                {course.cpdPoints} CPD Points Conferred
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-medium flex items-center">
                <MapPin className="w-3 h-3 mr-1 text-cyan-300" /> London Studio Broadcast
              </span>
            </div>

            {/* Course Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {course.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-purple-300 to-indigo-200">({course.code})</span>
            </h1>

            {/* Tagline */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {course.tagline}
            </p>

            {/* Key Meta Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center text-amber-400 space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-white ml-1">{course.rating}</span>
                <span className="text-slate-400">({course.reviewsCount} reviews)</span>
              </div>

              <span>•</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                <span>Duration: <strong className="text-white">{course.duration}</strong></span>
              </div>

              <span>•</span>
              <div className="flex items-center space-x-1 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{course.accreditation}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Two-Column Layout (Shop & Syllabus View) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT 8 COLS: Tabs & In-depth Content */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* UCEM-Style Tab Navigation */}
            <div className="flex border-b border-slate-200 overflow-x-auto space-x-2 sm:space-x-4 text-xs sm:text-sm font-bold">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'outcomes', label: 'What You Will Learn' },
                { id: 'syllabus', label: 'Course Structure' },
                { id: 'audience', label: 'Who Should Attend' },
                { id: 'faculty', label: 'Lead Faculty' },
                { id: 'faqs', label: 'FAQs' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 px-2 border-b-2 whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-600 text-indigo-600 font-extrabold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fade-in">
                <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                    About this Programme
                  </h2>
                  {course.overview.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Key Course Highlights */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <h3 className="text-lg font-black text-slate-900">Key Programme Features:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {course.features.map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assessment & Study Mode Box */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 flex items-center">
                    <Award className="w-4 h-4 text-purple-600 mr-2" />
                    Assessment & Qualification Conferred
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {course.assessmentMethod}
                  </p>
                  <div className="flex items-center space-x-2 text-xs font-bold text-indigo-900 pt-1">
                    <span>Registry Verification:</span>
                    <span className="font-mono bg-white px-2 py-0.5 rounded border border-purple-200">
                      CPD-UK-RETRRAC-2026-XXXX
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Learning Outcomes */}
            {activeTab === 'outcomes' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Core Regulatory Competencies You Will Acquire
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Upon successful completion of the {course.title}, you will be qualified to independently execute the following functions:
                </p>

                <div className="grid grid-cols-1 gap-3.5">
                  {course.learningOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start space-x-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 hover:border-indigo-300 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                        ✓
                      </div>
                      <span className="leading-relaxed">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: Course Structure & Modules */}
            {activeTab === 'syllabus' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                      Detailed Curriculum & Syllabus Modules
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {course.breakdown}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                    {course.modules.length} Modules Total
                  </span>
                </div>

                <div className="space-y-3">
                  {course.modules.map((mod) => (
                    <div 
                      key={mod.num}
                      className="rounded-2xl border border-slate-200 overflow-hidden bg-white hover:border-purple-300 transition-all shadow-sm"
                    >
                      <button
                        onClick={() => setExpandedModule(expandedModule === mod.num ? null : mod.num)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between text-left bg-slate-50 hover:bg-slate-100/80 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-7 h-7 rounded-xl bg-purple-100 text-purple-800 text-xs font-black flex items-center justify-center">
                            {mod.num}
                          </span>
                          <div>
                            <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                              {mod.title}
                            </h3>
                            <span className="text-[11px] text-slate-500">{mod.duration}</span>
                          </div>
                        </div>

                        {expandedModule === mod.num ? (
                          <ChevronUp className="w-4 h-4 text-slate-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        )}
                      </button>

                      {expandedModule === mod.num && (
                        <div className="p-5 border-t border-slate-100 space-y-3 bg-white text-xs">
                          <p className="text-slate-600 leading-relaxed">{mod.description}</p>
                          <div className="space-y-1.5 pt-2">
                            <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">Topics Examined:</span>
                            {mod.topics.map((t, idx) => (
                              <div key={idx} className="flex items-center space-x-2 text-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                <span>{t}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB CONTENT: Target Audience */}
            {activeTab === 'audience' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Who Should Enroll in this Qualification?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {course.targetAudience.map((aud, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center">
                        <Users className="w-4 h-4 text-indigo-600 mr-2" />
                        {aud.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{aud.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Entry Requirements & Prerequisites:
                  </h4>
                  <ul className="list-disc list-inside text-xs text-amber-900 space-y-1">
                    {course.entryRequirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Faculty */}
            {activeTab === 'faculty' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Lead Faculty & Mentorship
                </h2>
                
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <img 
                    src={course.leadInstructor.image} 
                    alt={course.leadInstructor.name}
                    className="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-white"
                  />
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">{course.leadInstructor.name}</h3>
                      <p className="text-xs font-semibold text-purple-700">{course.leadInstructor.role}</p>
                      <p className="text-[11px] text-slate-500">{course.leadInstructor.credentials}</p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {course.leadInstructor.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: FAQs */}
            {activeTab === 'faqs' && (
              <div className="space-y-4 animate-fade-in">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  Frequently Asked Questions
                </h2>
                {course.faqs.map((faq, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                    <h3 className="font-bold text-slate-900 text-sm flex items-start">
                      <HelpCircle className="w-4 h-4 text-indigo-600 mr-2 shrink-0 mt-0.5" />
                      <span>{faq.q}</span>
                    </h3>
                    <p className="text-slate-600 pl-6 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* RIGHT 4 COLS: Sticky Buy Box & Cart Actions (Inspired by UCEM Shop) */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-purple-200 shadow-2xl shadow-indigo-500/10 sticky top-28 space-y-6">
              
              {/* Top Pricing Header */}
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-purple-700">
                    Tuition Investment
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Enrolling 2026 Batch
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-black text-slate-900 text-gradient">
                  {formatAmount(course.priceGBP, course.priceINR)}
                </div>
                <p className="text-[11px] text-slate-500">
                  Includes UK CPD Assessment, Live Lectures & London Seal
                </p>
              </div>

              {/* Cohort Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Select Upcoming Cohort Batch:
                </label>
                <select
                  value={selectedCohort}
                  onChange={(e) => setSelectedCohort(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {course.cohorts && course.cohorts.map((c) => (
                    <option key={c.id} value={c.date}>
                      {c.date} ({c.schedule})
                    </option>
                  ))}
                </select>
              </div>

              {/* ACTION BUTTONS (The 3 Core Options: Proceed to Payment, Add to Cart, Add to Wishlist) */}
              <div className="space-y-2.5 pt-1">
                
                {/* 1. Proceed to Payment with PayPal (Direct Booking) */}
                                {currency === 'INR' ? (
                  <button
                    type="button"
                    onClick={handleDirectBuy}
                    className="w-full py-4 px-6 rounded-2xl bg-[#6933D3] hover:bg-[#5a2bb8] text-white font-extrabold text-sm shadow-xl shadow-purple-500/25 transition-all flex items-center justify-center space-x-2 group"
                  >
                    <Lock className="w-4 h-4 text-emerald-300" />
                    <span>Book Now – Pay with UPI / Card (Cashfree)</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleDirectBuy}
                    className="w-full py-4 px-6 rounded-2xl bg-[#FFC439] hover:bg-[#F4B400] text-slate-900 font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center space-x-2 border border-amber-400 group"
                  >
                    <span className="italic font-black text-blue-900 text-base tracking-tighter">Pay<span className="text-blue-600">Pal</span></span>
                    <span className="text-slate-800 font-bold">Book Now with PayPal</span>
                    <ArrowRight className="w-4 h-4 text-blue-900 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}

                {/* 2. Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs transition-all flex items-center justify-center space-x-2 ${
                    inCartAlready
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-md'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-cyan-300" />
                  <span>{inCartAlready ? 'In Your Basket (Add Another)' : 'Add to Cart'}</span>
                </button>

                {/* 3. Add to Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(course)}
                  className={`w-full py-3 px-6 rounded-2xl font-bold text-xs transition-all flex items-center justify-center space-x-2 border ${
                    inWishlistAlready
                      ? 'bg-pink-50 border-pink-300 text-pink-700'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${inWishlistAlready ? 'fill-pink-600 text-pink-600' : 'text-slate-400'}`} />
                  <span>{inWishlistAlready ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>

              </div>

              {/* Guarantees & Accreditation Badges */}
              <div className="pt-2 border-t border-slate-100 space-y-2 text-[11px] text-slate-600">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Official CPD UK Standards Office Accredited</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Secure 256-bit Encrypted {currency === 'INR' ? 'Cashfree' : 'PayPal'} Settlement</span>                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>14-Day Full Satisfaction Guarantee</span>
                </div>
              </div>

              {/* Brochure Download Link */}
              <div className="pt-2 border-t border-slate-100 text-center">
                <a
                  href="https://retrrac.org/wp-content/uploads/2025/01/ReTRRAC-Brochure.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 inline-flex items-center"
                >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  <span>Download Complete Syllabus Brochure (PDF)</span>
                </a>
              </div>

              {/* Corporate Enquiry */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
                <p className="text-[11px] text-slate-600 font-semibold">Enrolling a team of 3 or more?</p>
                <Link
                  to="/contact"
                  className="text-xs font-bold text-purple-700 hover:underline block"
                >
                  Request Corporate Invoice Discount →
                </Link>
              </div>

            </div>
          </div>

        </div>

        {/* RELATED COURSES (Shop Recommendation Section) */}
        <div className="mt-20 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Recommended Complementary Qualifications
              </h3>
              <p className="text-xs text-slate-500">
                Frequently taken alongside {course.code}
              </p>
            </div>
            <Link
              to="/retrrac-academy"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center"
            >
              <span>View All Courses</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coursesCatalog
              .filter(c => c.id !== course.id)
              .slice(0, 3)
              .map(rel => (
                <div 
                  key={rel.id}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 shadow-md hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                        {rel.code}
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {rel.duration}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {rel.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="font-black text-slate-900 text-sm text-gradient">
                      {formatAmount(rel.priceGBP, rel.priceINR)}
                    </span>
                    <Link
                      to={`/retrrac-academy/courses/${rel.id}`}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>

      </div>

      {/* PAYPAL CHECKOUT MODAL */}
      {payPalModalOpen && (
        <PayPalCheckoutModal
          isOpen={payPalModalOpen}
          onClose={() => setPayPalModalOpen(false)}
          course={course}
          initialCohort={selectedCohort}
        />
      )}

    </div>
  );
}
