import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import OurStoryPage from './pages/OurStoryPage';
import ComplianceConsultingPage from './pages/ComplianceConsultingPage';
import BanksPage from './pages/BanksPage';
import AccountantsPage from './pages/AccountantsPage';
import LawyersPage from './pages/LawyersPage';
import EstateAgencyPage from './pages/EstateAgencyPage';
import HighValueDealersPage from './pages/HighValueDealersPage';
import AcademyPage from './pages/AcademyPage';
import CourseDetailPage from './pages/CourseDetailPage';
import BlackthronePage from './pages/BlackthronePage';
import ClmPage from './pages/ClmPage';
import KnowledgeHubPage from './pages/KnowledgeHubPage';
import SuccessStoriesPage from './pages/SuccessStoriesPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import TeamPage from './pages/TeamPage';
import PolicyPage from './pages/PolicyPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import VerifyCertificatePage from './pages/VerifyCertificatePage';
import TrackBookingPage from './pages/TrackBookingPage';
import CashfreeReturnPage from './pages/CashfreeReturnPage';
import CartDrawer from './components/cart/CartDrawer';
import WishlistDrawer from './components/cart/WishlistDrawer';
import PayPalCheckoutModal from './components/payment/PayPalCheckoutModal';
import AdminProtectedRoute from './components/auth/AdminProtectedRoute';
import AuthModal from './components/auth/AuthModal';
import AiComplianceCopilot from './components/ai/AiComplianceCopilot';
import AiRiskScanner from './components/ai/AiRiskScanner';
import { Sparkles } from 'lucide-react';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider } from './context/AuthContext';
import { CartWishlistProvider } from './context/CartWishlistContext';
import { BookingProvider } from './context/BookingContext';

export default function App() {
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [riskScannerOpen, setRiskScannerOpen] = useState(false);

  // Cart multi-item checkout state
  const [cartCheckoutOpen, setCartCheckoutOpen] = useState(false);
  const [cartCheckoutItems, setCartCheckoutItems] = useState([]);

  const openCopilot = () => setCopilotOpen(true);
  const openScanner = () => setRiskScannerOpen(true);

  const handleProceedCartCheckout = (items) => {
    setCartCheckoutItems(items);
    setCartCheckoutOpen(true);
  };

  const home = <HomePage onOpenRiskScanner={openScanner} onOpenCopilot={openCopilot} />;

  return (
    <AuthProvider>
      <CurrencyProvider>
        <CartWishlistProvider>
          <BookingProvider>
            <Router>
              <ScrollToTop />
              <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-purple-500 selection:text-white relative">

                <Navbar onOpenRiskScanner={openScanner} onOpenCopilot={openCopilot} />

                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={home} />
                    <Route path="/our-story" element={<OurStoryPage onOpenCopilot={openCopilot} />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/compliance-consulting" element={<ComplianceConsultingPage onOpenRiskScanner={openScanner} />} />
                    <Route path="/compliance-consulting/banks-financial-institutions" element={<BanksPage />} />
                    <Route path="/compliance-consulting/accountants-and-bookkeepers" element={<AccountantsPage />} />
                    <Route path="/compliance-consulting/lawyers-and-solicitors" element={<LawyersPage />} />
                    <Route path="/compliance-consulting/estate-and-letting-agency-business" element={<EstateAgencyPage />} />
                    <Route path="/compliance-consulting/high-value-dealers" element={<HighValueDealersPage />} />
                    <Route path="/retrrac-academy" element={<AcademyPage onOpenCopilot={openCopilot} />} />
                    <Route path="/retrrac-academy/courses/:courseId" element={<CourseDetailPage onOpenCopilot={openCopilot} />} />
                    <Route path="/courses/:courseId" element={<CourseDetailPage onOpenCopilot={openCopilot} />} />
                    <Route path="/blackthrone-training" element={<BlackthronePage />} />
                    <Route path="/clients-lifecycle-management" element={<ClmPage />} />
                    <Route path="/knowledge-hub" element={<KnowledgeHubPage onOpenCopilot={openCopilot} />} />
                    <Route path="/our-success-stories" element={<SuccessStoriesPage onOpenRiskScanner={openScanner} />} />
                    <Route path="/internship-career" element={<CareersPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/track-booking" element={<TrackBookingPage />} />
                    <Route path="/payment/cashfree" element={<CashfreeReturnPage />} />
                    <Route path="/user/dashboard" element={<UserDashboard />} />
                    <Route
                      path="/admin/dashboard"
                      element={
                        <AdminProtectedRoute>
                          <AdminDashboard />
                        </AdminProtectedRoute>
                      }
                    />
                    <Route path="/verify/:certId" element={<VerifyCertificatePage />} />
                    <Route path="/verify" element={<VerifyCertificatePage />} />
                    <Route path="/privacy-policy" element={<PolicyPage defaultKey="privacy" />} />
                    <Route path="/terms-conditions" element={<PolicyPage defaultKey="terms" />} />
                    <Route path="/cancellation-refund-policy" element={<PolicyPage defaultKey="cancellation" />} />
                    <Route path="/data-protection" element={<PolicyPage defaultKey="dataProtection" />} />
                    <Route path="/cookie-policy" element={<PolicyPage defaultKey="cookie" />} />
                    <Route path="*" element={home} />
                  </Routes>
                </main>

                <Footer onOpenRiskScanner={openScanner} />

                {/* Floating AI Copilot button */}
                <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2">
                  <button
                    onClick={openCopilot}
                    className="group flex items-center space-x-2 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-bold text-xs shadow-2xl shadow-purple-500/30 hover:scale-105 transition-all border border-white/20"
                    title="Chat with ReTRRAC AI Copilot"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-200 animate-spin" />
                    <span className="hidden sm:inline">AI Compliance Copilot</span>
                    <span className="sm:hidden">AI Assistant</span>
                  </button>
                </div>

                <AiComplianceCopilot isOpen={copilotOpen} onClose={() => setCopilotOpen(false)} />
                <AiRiskScanner isOpen={riskScannerOpen} onClose={() => setRiskScannerOpen(false)} />

                <CartDrawer onProceedToCheckout={handleProceedCartCheckout} />
                <WishlistDrawer />
                <AuthModal />

                {cartCheckoutOpen && (
                  <PayPalCheckoutModal
                    isOpen={cartCheckoutOpen}
                    onClose={() => setCartCheckoutOpen(false)}
                    cartItems={cartCheckoutItems}
                  />
                )}
              </div>
            </Router>
          </BookingProvider>
        </CartWishlistProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}
