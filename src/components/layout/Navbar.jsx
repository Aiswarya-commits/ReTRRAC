import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { 
  Shield, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  Building2, 
  Landmark, 
  Calculator, 
  Scale, 
  Gem, 
  GraduationCap, 
  Cpu, 
  PhoneCall,
  ArrowRight,
  BookOpen,
  User,
  LayoutDashboard,
  Globe2,
  Award,
  Phone,
  Mail,
  Zap,
  ShoppingBag,
  Heart,
  FileCheck2,
  Lock,
  LogOut
} from 'lucide-react';
import { consultingSectors } from '../../data/siteData';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';
import { useCartWishlist } from '../../context/CartWishlistContext';

export default function Navbar({ onOpenRiskScanner, onOpenCopilot }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectorsDropdown, setSectorsDropdown] = useState(false);
  const [academyDropdown, setAcademyDropdown] = useState(false);
  const location = useLocation();

  const { currency, setCurrency } = useCurrency();
  const { currentUser, signOut, openAuthModal, isAdmin } = useAuth();
  const { cartCount, wishlistCount, openCart, openWishlist } = useCartWishlist();

  const isHomePage = location.pathname === '/';
  const shouldShowNav = !isHomePage || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSectorsDropdown(false);
    setAcademyDropdown(false);
  }, [location.pathname]);

  const sectorIcons = {
    banks: Landmark,
    accountants: Calculator,
    lawyers: Scale,
    estate: Building2,
    high_value_dealers: Gem
  };

  const navLinkClass = ({ isActive }) => 
    `px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-colors ${
      isActive 
        ? 'text-indigo-600 bg-purple-50/70 font-bold' 
        : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
    }`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 transform ${
      shouldShowNav ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
    }`}>
      
      {/* Top UK Institutional Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white text-[11px] py-1.5 px-4 border-b border-indigo-900/30 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-slate-200">UK Headquarters:</span>
            <span className="text-slate-300">60 Cannon Street, London EC4N 6NP</span>
            <span className="hidden md:inline text-slate-500">•</span>
            <span className="hidden md:inline text-cyan-300 font-semibold">CPD UK Standards Office Accredited</span>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              to="/track-booking" 
              className="text-cyan-300 hover:text-white transition-colors flex items-center space-x-1 font-bold"
              title="Track UK Enrolment Process"
            >
              <FileCheck2 className="w-3 h-3 text-cyan-300" />
              <span>Track Enrolment</span>
            </Link>

            <span className="text-slate-600 hidden sm:inline">|</span>

            {/* Subtle Deanery Admin Portal Gateway */}
            <button
              onClick={() => openAuthModal('admin')}
              className="text-slate-400 hover:text-purple-300 transition-colors flex items-center space-x-1 font-medium"
              title="Authorized London Deanery Administration Portal"
            >
              <Lock className="w-3 h-3 text-purple-400" />
              <span>Deanery Staff</span>
            </button>

            <span className="text-slate-600 hidden sm:inline">|</span>

            <a href="tel:+447552237997" className="hover:text-cyan-300 transition-colors hidden sm:flex items-center space-x-1">
              <Phone className="w-3 h-3 text-purple-400" />
              <span>+44 7552 237 997</span>
            </a>

            <span className="text-slate-600">|</span>

            {/* Currency Switcher */}
            <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/20 text-[10px] font-bold">
              <button
                onClick={() => setCurrency('GBP')}
                className={`px-2 py-0.5 rounded transition-all ${currency === 'GBP' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}`}
                title="Display fees in British Pounds (£)"
              >
                🇬🇧 GBP (£)
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={`px-2 py-0.5 rounded transition-all ${currency === 'INR' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}`}
                title="Display fees in Indian Rupees (₹)"
              >
                🇮🇳 INR (₹)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <nav className={`transition-all duration-300 font-sans ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-xl py-2.5 shadow-lg shadow-indigo-950/5 border-b border-slate-100' 
          : 'bg-white/95 backdrop-blur-md py-3 border-b border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src="/Headerlogo.png"
                alt="ReTRRAC Global"
                className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
              
              <NavLink to="/our-story" className={navLinkClass}>
                Our Story
              </NavLink>

              {/* Consulting Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setSectorsDropdown(true)}
                onMouseLeave={() => setSectorsDropdown(false)}
              >
                <NavLink 
                  to="/compliance-consulting" 
                  className={navLinkClass}
                >
                  <span className="flex items-center space-x-1">
                    <span>Consulting</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </span>
                </NavLink>

                {sectorsDropdown && (
                  <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 mt-1 animate-fadeIn z-50">
                    <div className="p-2 border-b border-slate-100">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-purple-700">Regulated Practice Areas</p>
                    </div>
                    <div className="space-y-1 mt-1">
                      {consultingSectors.map((sector) => {
                        const Icon = sectorIcons[sector.id] || Shield;
                        return (
                          <Link
                            key={sector.id}
                            to={sector.path}
                            onClick={() => setSectorsDropdown(false)}
                            className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-50 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-lg bg-purple-50 group-hover:bg-purple-100 flex items-center justify-center text-purple-700 shrink-0">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                {sector.title}
                              </p>
                              <p className="text-[11px] text-slate-500 line-clamp-1">{sector.tagline}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* ReTRRAC Academy Mega Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setAcademyDropdown(true)}
                onMouseLeave={() => setAcademyDropdown(false)}
              >
                <NavLink 
                  to="/retrrac-academy" 
                  className={navLinkClass}
                >
                  <span className="flex items-center space-x-1">
                    <span>ReTRRAC® Academy</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </span>
                </NavLink>

                {academyDropdown && (
                  <div className="absolute top-full left-0 w-88 bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 mt-1 animate-fadeIn z-50 space-y-2">
                    <div className="p-2 border-b border-slate-100 flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-purple-700">CPD Accredited Programs</p>
                      <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">PayPal Ready</span>
                    </div>

                    <Link
                      to="/retrrac-academy/courses/cafs-specialist"
                      onClick={() => setAcademyDropdown(false)}
                      className="block p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">CAFS™ Specialist (60h)</span>
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Flagship</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">40h Live Lectures + 20h Live Forensic Capstone</p>
                    </Link>

                    <Link
                      to="/retrrac-academy/courses/blackthrone-aml"
                      onClick={() => setAcademyDropdown(false)}
                      className="block p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Blackthrone™ Simulation</span>
                        <span className="text-[10px] text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded-full">30h Lab</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Live Scenario Sanctions & SARs War Room</p>
                    </Link>

                    <Link
                      to="/retrrac-academy/courses/clm-regtech"
                      onClick={() => setAcademyDropdown(false)}
                      className="block p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">CLM RegTech Architecture</span>
                        <span className="text-[10px] text-cyan-700 font-bold bg-cyan-50 px-2 py-0.5 rounded-full">25h Masterclass</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Client Lifecycle Management & IDV Engineering</p>
                    </Link>

                    <Link
                      to="/retrrac-academy/courses/firmwide-risk-assessment"
                      onClick={() => setAcademyDropdown(false)}
                      className="block p-2.5 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">Firm-Wide Risk Assessment (FWRA)</span>
                        <span className="text-[10px] text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded-full">20h Gatekeeper</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">UK MLR 2017 Regulation 18/19 Audit Compliance</p>
                    </Link>

                    <div className="pt-2 border-t border-slate-100 flex justify-between items-center px-1">
                      <Link
                        to="/retrrac-academy"
                        onClick={() => setAcademyDropdown(false)}
                        className="text-xs font-bold text-indigo-600 hover:underline"
                      >
                        All Academy Courses →
                      </Link>

                      <Link
                        to="/track-booking"
                        onClick={() => setAcademyDropdown(false)}
                        className="text-xs font-bold text-purple-700 hover:underline flex items-center"
                      >
                        <FileCheck2 className="w-3 h-3 mr-1" />
                        <span>Track Booking</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <NavLink to="/knowledge-hub" className={navLinkClass}>
                Knowledge Hub
              </NavLink>

              <NavLink to="/team" className={navLinkClass}>
                Team
              </NavLink>

              <NavLink to="/contact" className={navLinkClass}>
                Contact us
              </NavLink>

            </div>

            {/* Cart, Wishlist, Portals & CTAs */}
            <div className="hidden md:flex items-center space-x-2 xl:space-x-2.5">
              
              {/* Wishlist Button with Badge */}
              <button
                onClick={openWishlist}
                className="relative p-2 rounded-xl text-slate-600 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                title="Saved Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-600 text-white font-black text-[9px] flex items-center justify-center animate-scale-up">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Basket / Cart Button with Badge */}
              <button
                onClick={openCart}
                className="relative flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                title="View Basket / Cart"
              >
                <ShoppingBag className="w-4 h-4 text-indigo-600" />
                <span>Basket</span>
                {cartCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center animate-scale-up">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Authenticated User or Guest Authentication State */}
              {!currentUser ? (
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => openAuthModal('signin')}
                    className="flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Sign In</span>
                  </button>

                  <button
                    onClick={() => openAuthModal('signup')}
                    className="flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors border border-indigo-200/80 shadow-sm"
                  >
                    <span>Register</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  {/* Candidate Portal */}
                  <Link
                    to="/user/dashboard"
                    className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 transition-colors border border-slate-200/80"
                    title={`Signed in as ${currentUser.name}`}
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                      {currentUser.name ? currentUser.name[0] : 'U'}
                    </div>
                    <span className="max-w-[85px] xl:max-w-[110px] truncate">{currentUser.name?.split(' ')[0] || 'Portal'}</span>
                  </Link>

                  {/* Admin Portal (Strictly ONLY visible to admin role) */}
                  {currentUser.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center space-x-1 px-2.5 py-2 rounded-xl text-xs font-bold text-purple-900 bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-200/80"
                      title="Admin Management Command"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-purple-600" />
                      <span>Admin</span>
                    </Link>
                  )}

                  {/* Sign Out */}
                  <button
                    onClick={signOut}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* AI Copilot Quick Button */}
              <button
                onClick={onOpenCopilot}
                className="flex items-center space-x-1 px-3 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200/80 hover:bg-indigo-100 transition-all shadow-sm"
                title="Chat with ReTRRAC AI Copilot"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                <span className="hidden xl:inline">AI Copilot</span>
              </button>

              {/* Risk Scanner CTA */}
              <button
                onClick={onOpenRiskScanner}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-tech hover:opacity-95 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-200" />
                <span>AI Audit</span>
              </button>

            </div>

            {/* Mobile Menu & Quick Cart Buttons */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={openCart}
                className="relative p-2 rounded-lg bg-slate-100 text-slate-800"
              >
                <ShoppingBag className="w-4 h-4 text-indigo-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white font-bold text-[9px] flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setCurrency(currency === 'GBP' ? 'INR' : 'GBP')}
                className="px-2 py-1 text-[11px] font-bold bg-slate-100 rounded-lg text-slate-800"
              >
                {currency === 'GBP' ? '🇬🇧 £' : '🇮🇳 ₹'}
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-2 animate-fadeIn max-h-[85vh] overflow-y-auto shadow-2xl">
          <div className="flex justify-between items-center pb-2.5 border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 uppercase">
              {currentUser ? `Hi, ${currentUser.name.split(' ')[0]}` : 'Candidate Access'}
            </span>
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 font-bold text-xs"
              >
                Basket ({cartCount})
              </button>

              {!currentUser ? (
                <>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('signin');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-bold text-xs"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal('signup');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-200"
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/user/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs"
                  >
                    My Portal
                  </Link>
                  {currentUser.role === 'admin' && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-2.5 py-1 rounded-lg bg-purple-900 text-white font-bold text-xs"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-600"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Home
          </Link>
          <Link
            to="/retrrac-academy"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg font-bold text-indigo-600"
          >
            ReTRRAC® Academy (All Courses)
          </Link>
          <Link
            to="/track-booking"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-50 rounded-lg"
          >
            Track Course Enrolment Status
          </Link>
          <Link
            to="/our-story"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Our Story
          </Link>
          <Link
            to="/compliance-consulting"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Compliance Consulting
          </Link>
          <Link
            to="/knowledge-hub"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Knowledge Hub
          </Link>
          <Link
            to="/team"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Our Team
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 rounded-lg"
          >
            Contact us
          </Link>

          <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCopilot();
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Ask ReTRRAC AI Copilot</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRiskScanner();
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-tech shadow-md"
            >
              <Zap className="w-4 h-4 text-cyan-200" />
              <span>Launch AI Risk Audit Scanner</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
}
