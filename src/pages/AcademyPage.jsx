import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Award, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  ChevronRight, 
  CreditCard, 
  MapPin, 
  CheckCircle, 
  FileText,
  Heart,
  ShoppingBag,
  Star,
  Check
} from 'lucide-react';
import FloatingElements from '../components/common/FloatingElements';
import PayPalCheckoutModal from '../components/payment/PayPalCheckoutModal';
import { coursesCatalog } from '../data/coursesCatalog';
import { useCurrency } from '../context/CurrencyContext';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useAuth } from '../context/AuthContext';

export default function AcademyPage({ onOpenCopilot }) {
  const { currency, formatAmount } = useCurrency();
  const { addToCart, isInCart, toggleWishlist, isInWishlist } = useCartWishlist();
  const { currentUser, openAuthModal } = useAuth();
  const navigate = useNavigate();

  const [selectedCourseForPayment, setSelectedCourseForPayment] = useState(null);
  const [payPalModalOpen, setPayPalModalOpen] = useState(false);

  const handleOpenPayPal = (prog, e) => {
    e.stopPropagation();
    if (!currentUser) {
      openAuthModal('signin', () => {
        setSelectedCourseForPayment(prog);
        setPayPalModalOpen(true);
      }, 'Please sign in or create an account to enrol and proceed to PayPal payment.');
      return;
    }
    setSelectedCourseForPayment(prog);
    setPayPalModalOpen(true);
  };

  const handleAddToCart = (prog, e) => {
    e.stopPropagation();
    addToCart(prog, prog.cohorts ? prog.cohorts[0].date : null, true);
  };

  const handleToggleWishlist = (prog, e) => {
    e.stopPropagation();
    toggleWishlist(prog);
  };

  const handleCardClick = (progId) => {
    navigate(`/retrrac-academy/courses/${progId}`);
  };

  return (
    <div className="bg-white pt-24 pb-20 overflow-hidden font-sans">
      
      {/* Hero Banner with UK Institutional Elements */}
      <div className="relative py-28 bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white overflow-hidden">
        <div className="glow-orb w-96 h-96 -top-20 -left-20 bg-purple-500/20" />
        <div className="glow-orb w-96 h-96 -bottom-20 -right-20 bg-indigo-500/20" />

        {/* Floating particles */}
        <FloatingElements count={6} theme="dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-900/80 border border-purple-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>CPD UK Accredited Training Institution • London HQ</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            ReTRRAC® Global Academy
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Empowering professionals, international banks, and legal gatekeepers with accredited qualifications, practical war room simulations, and direct PayPal enrollment for the UK and India.
          </p>

          <div className="pt-2 flex justify-center items-center space-x-4 text-xs text-slate-400">
            <span>Tuition Currency: <strong className="text-white font-bold">{currency === 'GBP' ? '🇬🇧 UK £ GBP' : '🇮🇳 India ₹ INR'}</strong></span>
            <span>•</span>
            <span className="text-emerald-400 font-semibold">PayPal Secure Gateway</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Globally Recognized <span className="text-gradient">Financial Crime Qualifications</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Click on any course card to inspect full curriculum details, modules, learning outcomes, and proceed to booking or add to your basket.
          </p>
        </div>

        {/* Accredited Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {coursesCatalog.map((prog) => {
            const inCart = isInCart(prog.id);
            const inWish = isInWishlist(prog.id);

            return (
              <div 
                key={prog.id}
                onClick={() => handleCardClick(prog.id)}
                className="cursor-pointer bg-white rounded-3xl p-7 border border-slate-200 hover:border-purple-400 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-purple-500/10 transition-all flex flex-col justify-between space-y-6 group relative"
              >
                {/* Wishlist Floating Button on Card */}
                <button
                  type="button"
                  onClick={(e) => handleToggleWishlist(prog, e)}
                  className={`absolute top-6 right-6 p-2 rounded-full border transition-all z-10 ${
                    inWish 
                      ? 'bg-pink-50 border-pink-300 text-pink-600 shadow-sm' 
                      : 'bg-white/80 border-slate-200 text-slate-400 hover:text-pink-600 hover:bg-white'
                  }`}
                  title={inWish ? 'Saved in Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-4 h-4 ${inWish ? 'fill-pink-600' : ''}`} />
                </button>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2 pr-10">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
                      {prog.code}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {prog.duration}
                    </span>
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg">
                      {prog.cpdPoints} CPD
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {prog.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {prog.tagline || prog.overview}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    {prog.learningOutcomes.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Tuition Fee</span>
                      <span className="text-2xl font-black text-slate-900 text-gradient">
                        {formatAmount(prog.priceGBP, prog.priceINR)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Upcoming Cohort</span>
                      <span className="text-xs font-bold text-slate-800">
                        {prog.cohorts && prog.cohorts[0] ? prog.cohorts[0].date : 'Enrolling Now'}
                      </span>
                    </div>
                  </div>

                  {/* 3 Core Actions on Card: PayPal Book, Add to Cart, View Details */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    
                    {/* Add to Cart */}
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(prog, e)}
                      className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-1 border ${
                        inCart
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-slate-900 hover:bg-slate-800 text-white border-transparent'
                      }`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-cyan-300" />
                      <span>{inCart ? 'In Basket' : 'Add to Cart'}</span>
                    </button>

                    {/* PayPal Direct Checkout */}
                    <button
                      type="button"
                      onClick={(e) => handleOpenPayPal(prog, e)}
                      className="py-2.5 px-3 rounded-xl bg-[#FFC439] hover:bg-[#F4B400] text-slate-900 font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center space-x-1 border border-amber-400"
                    >
                      {currency === 'INR' ? (
                        <span className="font-black text-[#6933D3]">₹ UPI / Card</span>
                      ) : (
                        <span className="italic font-black text-blue-900 text-[11px] tracking-tighter">Pay<span className="text-blue-600">Pal</span></span>
                      )}
                      <span>Book</span>                    </button>
                  </div>

                  {/* Full Details Link */}
                  <Link
                    to={`/retrrac-academy/courses/${prog.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-indigo-600 font-bold text-xs transition-colors flex items-center justify-center space-x-1 border border-slate-200"
                  >
                    <span>View Full Course Syllabus & Shop Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Group Training CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white mb-20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-white/10 px-3 py-1 rounded-full border border-white/20">
              Corporate & Bank Desk Training
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">Need Customized Training for Your Firm?</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We deliver bespoke in-house and live virtual cohorts for banking compliance teams, legal chambers, accounting practices, and financial institutions across London, Mumbai, and Dubai.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs shadow-lg transition-all"
            >
              Request Corporate Proposal
            </Link>
            <button
              onClick={onOpenCopilot}
              className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Ask AI Advisor</span>
            </button>
          </div>
        </div>

      </div>

      {/* PAYPAL CHECKOUT MODAL */}
      {payPalModalOpen && selectedCourseForPayment && (
        <PayPalCheckoutModal
          isOpen={payPalModalOpen}
          onClose={() => setPayPalModalOpen(false)}
          course={selectedCourseForPayment}
        />
      )}

    </div>
  );
}
