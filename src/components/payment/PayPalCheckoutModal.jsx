import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  X, ShieldCheck, Lock, CreditCard, CheckCircle, Award, Globe, ArrowRight,
  ArrowLeft, User, FileCheck2, AlertCircle, Info, Loader2, Smartphone, RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCurrency } from '../../context/CurrencyContext';
import { useAuth } from '../../context/AuthContext';
import { useCartWishlist } from '../../context/CartWishlistContext';
import { useBookings } from '../../context/BookingContext';
import { getCourseById } from '../../data/coursesCatalog';
import { api } from '../../lib/api';
import { openCashfreeCheckout } from '../../lib/cashfree';

// GBP (UK & international) → PayPal.  INR (India) → Cashfree when configured, otherwise PayPal.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const fmt = (value, cur) =>
  cur === 'INR'
    ? `₹${Number(value).toLocaleString('en-IN', { maximumFractionDigits: 2 })}`
    : `£${Number(value).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

function isCashfreePhone(raw) {
  const text = String(raw || '').trim();
  let d = text.replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  if (/^[6-9]\d{9}$/.test(d)) return true;
  const all = text.replace(/\D/g, '');
  return text.startsWith('+') && all.length >= 8 && all.length <= 15;
}

let paypalConfigPromise = null;
function loadPayPalConfig() {
  if (!paypalConfigPromise) {
    paypalConfigPromise = api('/api/paypal/config')
      .then((cfg) => ({ ...cfg, clientId: cfg.clientId || import.meta.env.VITE_PAYPAL_CLIENT_ID || null }))
      .catch(() => {
        paypalConfigPromise = null;
        return {
          configured: Boolean(import.meta.env.VITE_PAYPAL_CLIENT_ID),
          clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || null,
          serverDown: true
        };
      });
  }
  return paypalConfigPromise;
}

let cashfreeConfigPromise = null;
function loadCashfreeConfig() {
  if (!cashfreeConfigPromise) {
    cashfreeConfigPromise = api('/api/cashfree/config').catch(() => {
      cashfreeConfigPromise = null;
      return { configured: false };
    });
  }
  return cashfreeConfigPromise;
}

export default function PayPalCheckoutModal({ isOpen, onClose, course = null, cartItems = null, initialCohort = null }) {
  const { currency, formatAmount } = useCurrency();
  const { currentUser, loginAsStudent } = useAuth();
  const { clearCart, discountPercent, discountCode, removeDiscount } = useCartWishlist();
  const { addBooking } = useBookings();
  const navigate = useNavigate();

  const isCartCheckout = Boolean(cartItems && cartItems.length > 0);

  const catalogCourse = course ? getCourseById(course.id) : null;
  const cohortOptions = useMemo(() => {
    const list = catalogCourse?.cohorts || course?.cohorts || [];
    return list.length
      ? list.map((c) => ({ value: `${c.date} Cohort`, label: `${c.date} (${c.schedule})` }))
      : [{ value: 'July 01, 2026 Cohort', label: 'Next available cohort' }];
  }, [catalogCourse, course]);

  const normaliseCohort = (c) => (c ? (/cohort$/i.test(c) ? c : `${c} Cohort`) : null);

  const [paymentStep, setPaymentStep] = useState('details'); // details | pay | processing | success
  const [studentDetails, setStudentDetails] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    organization: currentUser?.organization || '',
    address: '',
    country: currentUser?.country || (currency === 'INR' ? 'India' : 'United Kingdom'),
    cohort: normaliseCohort(initialCohort) || cohortOptions[0].value
  });
  const [formError, setFormError] = useState('');
  const [payError, setPayError] = useState('');
  const [notice, setNotice] = useState('');
  const [quote, setQuote] = useState(null);
  const [quoting, setQuoting] = useState(false);
  const [paypalConfig, setPaypalConfig] = useState(null);
  const [cashfreeConfig, setCashfreeConfig] = useState(null);
  const [preferPayPal, setPreferPayPal] = useState(false);
  const [cfBusy, setCfBusy] = useState(false);
  const [cfPendingOrder, setCfPendingOrder] = useState(null);
  const [createdBooking, setCreatedBooking] = useState(null);
  const fundingSourceRef = useRef('paypal');

  useEffect(() => {
    if (currentUser) {
      setStudentDetails((prev) => ({
        ...prev,
        name: prev.name || currentUser.name || '',
        email: prev.email || currentUser.email || '',
        phone: prev.phone || currentUser.phone || '',
        organization: prev.organization || currentUser.organization || '',
        country: currentUser.country || prev.country
      }));
    }
  }, [currentUser]);

  useEffect(() => {
    if (isOpen) {
      loadPayPalConfig().then(setPaypalConfig);
      loadCashfreeConfig().then(setCashfreeConfig);
    }
  }, [isOpen]);

  const cashfreeAvailable = Boolean(cashfreeConfig?.configured);
  const gateway = currency === 'INR' && cashfreeAvailable && !preferPayPal ? 'cashfree' : 'paypal';
  const isCashfree = gateway === 'cashfree';

  const orderItems = useMemo(() => {
    if (isCartCheckout) return cartItems.map((i) => ({ courseId: i.courseId, cohort: i.cohort }));
    if (course) return [{ courseId: course.id, cohort: studentDetails.cohort }];
    return [];
  }, [isCartCheckout, cartItems, course, studentDetails.cohort]);

  const displayItems = isCartCheckout
    ? cartItems
    : course
      ? [{ ...course, courseId: course.id, cohort: studentDetails.cohort }]
      : [];

  const promoCode = isCartCheckout && discountPercent > 0 ? discountCode : '';

  if (!isOpen || displayItems.length === 0) return null;

  const estGBP = displayItems.reduce((s, i) => s + (Number(i.priceGBP) || 0), 0);
  const estINR = displayItems.reduce((s, i) => s + (Number(i.priceINR) || 0), 0);
  const pct = promoCode ? discountPercent : 0;
  const estimate = formatAmount(Math.round(estGBP * (1 - pct / 100)), Math.round(estINR * (1 - pct / 100)));
  const totalCpd = displayItems.reduce((s, c) => s + (c.cpdPoints || 30), 0);

  const update = (field) => (e) => setStudentDetails((p) => ({ ...p, [field]: e.target.value }));

  // ── Step 1 → 2: validate details and get the server's price ──
  const handleContinueToPayment = async (e) => {
    e?.preventDefault();
    setFormError('');
    let useCashfree = isCashfree;
    if (currency === 'INR' && !preferPayPal && !cashfreeConfig) {
      const cfg = await loadCashfreeConfig();
      setCashfreeConfig(cfg);
      useCashfree = Boolean(cfg?.configured);
    }
    if (!studentDetails.name.trim()) return setFormError('Please enter the candidate’s full legal name.');
    if (!EMAIL_RE.test(studentDetails.email.trim())) return setFormError('Please enter a valid email address.');
    if (useCashfree && !isCashfreePhone(studentDetails.phone)) {
      return setFormError('Please enter a valid 10-digit mobile number – it is needed for UPI and card OTPs.');
    }

    setQuoting(true);
    try {
      const { quote: q } = await api(useCashfree ? '/api/cashfree/quote' : '/api/paypal/quote', {
        method: 'POST',
        body: { items: orderItems, currency, promoCode }
      });
      setQuote(q);
      setPayError('');
      setNotice('');
      setCfPendingOrder(null);
      setPaymentStep('pay');
    } catch (err) {
      setFormError(err.message);
    } finally {
      setQuoting(false);
    }
  };

  const completeBooking = (booking) => {
    addBooking(booking);
    if (!currentUser) {
      loginAsStudent({
        name: studentDetails.name,
        email: studentDetails.email.trim().toLowerCase(),
        phone: studentDetails.phone,
        organization: studentDetails.organization,
        country: studentDetails.country
      });
    }
    if (isCartCheckout) {
      clearCart();
      removeDiscount();
    }
    setCreatedBooking(booking);
    setPaymentStep('success');
    confetti({ particleCount: 130, spread: 80, origin: { y: 0.6 } });
  };

  // ── PayPal ──
  const createOrder = async () => {
    setPayError('');
    setNotice('');
    const data = await api('/api/paypal/create-order', {
      method: 'POST',
      body: { items: orderItems, currency, promoCode, customer: studentDetails }
    }).catch((err) => {
      setPayError(err.message);
      throw err;
    });
    return data.id;
  };

  const onApprove = async (data, actions) => {
    setPaymentStep('processing');
    try {
      const res = await api('/api/paypal/capture-order', {
        method: 'POST',
        body: { orderID: data.orderID, fundingSource: fundingSourceRef.current }
      });
      completeBooking(res.booking);
    } catch (err) {
      const issue = err.data?.issue;
      if (issue === 'INSTRUMENT_DECLINED' || issue === 'PAYER_ACTION_REQUIRED') {
        setPaymentStep('pay');
        setPayError('Your payment method was declined. Please choose another card or funding source.');
        return actions.restart();
      }
      setPaymentStep('pay');
      setPayError(err.message || 'We could not complete the payment. You have not been charged.');
    }
  };

  const onCancel = () => setNotice('Payment cancelled – you have not been charged. You can try again whenever you’re ready.');

  const onError = (err) => {
    console.error('PayPal error', err);
    setPaymentStep('pay');
    setPayError((prev) => prev || 'PayPal could not process this payment. Please try again or use a different method.');
  };

  // ── Cashfree ──
  const verifyCashfree = async (orderId, { quiet = false } = {}) => {
    setPaymentStep('processing');
    try {
      const res = await api('/api/cashfree/verify-order', { method: 'POST', body: { orderId } });
      if (res.state === 'paid' && res.booking) {
        setCfPendingOrder(null);
        completeBooking(res.booking);
        return;
      }
      setPaymentStep('pay');
      setCfPendingOrder(orderId);
      setNotice(res.message || 'Your payment is still being confirmed. Please check again in a moment.');
    } catch (err) {
      setPaymentStep('pay');
      setCfPendingOrder(null);
      if (!quiet) setPayError(err.message || 'We could not confirm the payment. You have not been charged.');
      else setNotice('Payment window closed – you have not been charged. You can try again whenever you’re ready.');
    }
  };

  const handleCashfreePay = async () => {
    setPayError('');
    setNotice('');
    setCfBusy(true);
    try {
      const data = await api('/api/cashfree/create-order', {
        method: 'POST',
        body: { items: orderItems, promoCode, customer: studentDetails }
      });
      const orderId = data.orderId;
      const result = await openCashfreeCheckout(data.paymentSessionId, data.mode);
      setCfBusy(false);
      if (result?.redirect) return; // Cashfree takes over and returns to /payment/cashfree
      await verifyCashfree(orderId, { quiet: Boolean(result?.error) });
    } catch (err) {
      setCfBusy(false);
      setPayError(err.message || 'Cashfree could not start the payment. Please try again.');
    }
  };

  const switchGateway = (toPayPal) => {
    setPreferPayPal(toPayPal);
    setQuote(null);
    setPayError('');
    setCfPendingOrder(null);
    setNotice('');
    setPaymentStep('details');
  };

  const handleTrackBooking = () => {
    onClose();
    navigate(`/user/dashboard?tab=bookings&trackId=${createdBooking?.bookingId || ''}`);
  };

  const handleGoToDashboard = () => {
    onClose();
    navigate('/user/dashboard');
  };

  const canClose = paymentStep !== 'processing' && !cfBusy;
  const testMode = isCashfree ? cashfreeConfig?.mode === 'sandbox' : paypalConfig?.mode === 'sandbox';
  const bookedWithCashfree = createdBooking?.paymentProvider === 'cashfree';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto animate-fade-in font-sans">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
          {canClose && (
            <button
              onClick={onClose}
              aria-label="Close checkout"
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center space-x-2 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {isCashfree ? 'Secure Cashfree Checkout • UPI, Cards & Net Banking' : 'Secure PayPal Checkout'}
              {testMode ? ' • Test mode' : ''}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white pr-10">
            {displayItems.length === 1 ? displayItems[0].title : `Checkout (${displayItems.length} Programmes)`}
          </h3>

          <div className="flex items-center gap-2 text-[11px] font-bold mt-3">
            {['Your details', 'Payment', 'Confirmation'].map((label, i) => {
              const active = { details: 0, pay: 1, processing: 1, success: 2 }[paymentStep];
              return (
                <React.Fragment key={label}>
                  <span className={`px-2.5 py-1 rounded-full ${i <= active ? 'bg-emerald-400/20 text-emerald-300' : 'bg-white/5 text-slate-400'}`}>
                    {i + 1}. {label}
                  </span>
                  {i < 2 && <span className="text-slate-600">›</span>}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="p-6 sm:p-8">

          {/* ─── STEP 1: DETAILS ─── */}
          {paymentStep === 'details' && (
            <form onSubmit={handleContinueToPayment} className="space-y-6" noValidate>
              <OrderSummary
                total={estimate}
                subtitle={displayItems.length === 1
                  ? 'Includes full live curriculum, capstone & CPD verification'
                  : `Enrolling in ${displayItems.length} accredited programmes`}
                promo={promoCode ? `${promoCode} (${discountPercent}% off)` : null}
                cpd={totalCpd}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center">
                    <User className="w-3.5 h-3.5 mr-1 text-indigo-600" />
                    Candidate Enrolment Information
                  </h4>
                  <span className="text-[11px] text-slate-500">* Required</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <Field label="Candidate Legal Name *" value={studentDetails.name} onChange={update('name')} placeholder="As it should appear on your certificate" autoComplete="name" />
                  <Field label="Email *" type="email" value={studentDetails.email} onChange={update('email')} placeholder="you@company.com" autoComplete="email" />
                  <Field
                    label={isCashfree ? 'Mobile Number *' : 'Phone / WhatsApp'}
                    type="tel"
                    value={studentDetails.phone}
                    onChange={update('phone')}
                    placeholder={isCashfree ? '98765 43210' : '+44 7552 237997'}
                    autoComplete="tel"
                  />
                  <Field label="Firm / Organization" value={studentDetails.organization} onChange={update('organization')} placeholder="Optional" autoComplete="organization" />

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Country of Residence</label>
                    <select value={studentDetails.country} onChange={update('country')} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white">
                      {['United Kingdom', 'India', 'United Arab Emirates', 'Singapore', 'Germany', 'United States', 'Other'].map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {!isCartCheckout && (
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Select Cohort Batch</label>
                      <select value={studentDetails.cohort} onChange={update('cohort')} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white">
                        {cohortOptions.map((c) => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <Field label="Billing Address (for your VAT invoice)" value={studentDetails.address} onChange={update('address')} placeholder="Optional" autoComplete="street-address" />
                  </div>
                </div>
              </div>

              {formError && <Alert tone="error">{formError}</Alert>}

              <button
                type="submit"
                disabled={quoting}
                className="w-full py-4 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-extrabold text-sm shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                {quoting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4 text-emerald-400" />}
                <span>{quoting ? 'Preparing secure checkout…' : 'Continue to Secure Payment'}</span>
                {!quoting && <ArrowRight className="w-4 h-4" />}
              </button>

              {currency === 'INR' && cashfreeAvailable && (
                <GatewaySwitch isCashfree={isCashfree} onSwitch={switchGateway} />
              )}

              <TrustStrip isCashfree={isCashfree} />
            </form>
          )}

          {/* ─── STEP 2: PAY ─── */}
          {(paymentStep === 'pay' || paymentStep === 'processing') && quote && (
            <div className="space-y-5">
              {paymentStep === 'pay' && !cfBusy && (
                <button onClick={() => setPaymentStep('details')} className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center">
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Edit details
                </button>
              )}

              <div className="rounded-2xl border border-slate-200 overflow-hidden text-xs">
                {quote.lines.map((l) => (
                  <div key={l.courseId} className="flex justify-between gap-4 px-4 py-3 border-b border-slate-100">
                    <div>
                      <p className="font-bold text-slate-900">{l.title}</p>
                      <p className="text-slate-500">{l.code} • {l.cohort}</p>
                    </div>
                    <span className="font-bold text-slate-900 whitespace-nowrap">{fmt(l.unitPrice, quote.chargeCurrency)}</span>
                  </div>
                ))}
                {Number(quote.discount) > 0 && (
                  <div className="flex justify-between px-4 py-2.5 bg-emerald-50 text-emerald-800 font-semibold">
                    <span>Voucher {quote.promoCode} ({quote.discountPercent}%)</span>
                    <span>−{fmt(quote.discount, quote.chargeCurrency)}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline px-4 py-3 bg-slate-50">
                  <span className="font-bold text-slate-900">Total to pay</span>
                  <span className="text-2xl font-black text-slate-900">{fmt(quote.total, quote.chargeCurrency)}</span>
                </div>
              </div>

              {quote.currencyConverted && (
                <Alert tone="info">
                  PayPal will charge this order in British Pounds ({fmt(quote.total, 'GBP')}). Your bank converts it to ₹ at its own rate.
                </Alert>
              )}

              {notice && <Alert tone="info">{notice}</Alert>}
              {payError && <Alert tone="error">{payError}</Alert>}

              {paymentStep === 'processing' ? (
                <div className="py-10 text-center space-y-3">
                  <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mx-auto" />
                  <h4 className="text-lg font-extrabold text-slate-900">
                    Confirming your payment with {quote.gateway === 'cashfree' ? 'Cashfree' : 'PayPal'}…
                  </h4>
                  <p className="text-xs text-slate-600">Please don’t close this window or refresh the page.</p>
                </div>
              ) : quote.gateway === 'cashfree' ? (
                <div className="space-y-3">
                  {cfPendingOrder && (
                    <button
                      onClick={() => verifyCashfree(cfPendingOrder)}
                      className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Check payment status again</span>
                    </button>
                  )}
                  <button
                    onClick={handleCashfreePay}
                    disabled={cfBusy}
                    className="w-full py-4 px-6 rounded-2xl bg-[#6933D3] hover:bg-[#5a2bb8] disabled:opacity-60 text-white font-extrabold text-sm shadow-xl shadow-purple-500/25 transition-all flex items-center justify-center space-x-2"
                  >
                    {cfBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4 text-emerald-300" />}
                    <span>{cfBusy ? 'Opening secure Cashfree window…' : `Pay ${fmt(quote.total, 'INR')} with Cashfree`}</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-500 flex items-center justify-center">
                    <Smartphone className="w-3.5 h-3.5 mr-1" /> UPI (GPay, PhonePe, Paytm), RuPay / Visa / Mastercard, Net Banking & wallets
                  </p>
                </div>
              ) : !paypalConfig ? (
                <div className="py-8 flex justify-center"><Loader2 className="w-6 h-6 text-slate-400 animate-spin" /></div>
              ) : !paypalConfig.clientId ? (
                <Alert tone="error">
                  {paypalConfig.serverDown
                    ? 'The payment server is not reachable right now. Please try again in a moment.'
                    : 'Online payments are not configured yet. Please contact info@retrrac.org to enrol.'}
                </Alert>
              ) : (
                <PayPalScriptProvider
                  key={quote.chargeCurrency}
                  options={{
                    clientId: paypalConfig.clientId,
                    currency: quote.chargeCurrency,
                    intent: 'capture',
                    components: 'buttons',
                    disableFunding: 'paylater,venmo'
                  }}
                >
                  <PayPalButtonsBlock
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onCancel={onCancel}
                    onError={onError}
                    onClick={(data) => {
                      fundingSourceRef.current = data?.fundingSource || 'paypal';
                      setPayError('');
                    }}
                    forceReRender={[quote.total, quote.chargeCurrency, orderItems.length]}
                  />
                </PayPalScriptProvider>
              )}

              {paymentStep === 'pay' && !cfBusy && currency === 'INR' && cashfreeAvailable && (
                <GatewaySwitch isCashfree={quote.gateway === 'cashfree'} onSwitch={switchGateway} />
              )}

              <TrustStrip isCashfree={quote.gateway === 'cashfree'} />
            </div>
          )}

          {/* ─── STEP 3: SUCCESS ─── */}
          {paymentStep === 'success' && createdBooking && (
            <div className="py-6 space-y-6 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  createdBooking.paymentStatus.startsWith('Paid')
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {createdBooking.paymentStatus.startsWith('Paid')
                    ? 'Payment Successful • Enrolment Confirmed'
                    : 'Payment Received • Awaiting PayPal Clearance'}
                </span>
                <h4 className="text-2xl font-black text-slate-900 pt-2">Welcome to ReTRRAC Academy!</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, {createdBooking.studentName.split(' ')[0]}. Your seat is secured.{' '}
                  {bookedWithCashfree ? (
                    <>Cashfree has sent your payment receipt to <strong className="text-slate-900">{createdBooking.email}</strong>.</>
                  ) : (
                    <>
                      PayPal has emailed your payment receipt
                      {createdBooking.payerEmail ? <> to <strong className="text-slate-900">{createdBooking.payerEmail}</strong></> : ''}.
                    </>
                  )}{' '}
                  Keep your booking reference to track your enrolment.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2.5 max-w-md mx-auto">
                <Row label="Booking Reference" value={<span className="font-mono font-black text-indigo-700 text-sm">{createdBooking.bookingId}</span>} />
                <Row
                  label={bookedWithCashfree ? 'Cashfree Payment ID' : 'PayPal Transaction ID'}
                  value={<span className="font-mono font-bold text-slate-800">{bookedWithCashfree ? createdBooking.cashfreePaymentId : createdBooking.paypalCaptureId}</span>}
                />
                <Row label="Programmes" value={createdBooking.courses.map((c) => c.code).join(', ')} />
                <Row label="Amount Paid" value={fmt(createdBooking.totalAmount, createdBooking.currency)} />
                <Row label="Paid With" value={createdBooking.paymentGateway} />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleTrackBooking}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-tech text-white font-bold text-xs shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
                >
                  <FileCheck2 className="w-4 h-4 text-cyan-200" />
                  <span>Track Booking Progress →</span>
                </button>
                <button
                  onClick={handleGoToDashboard}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Go to Student Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────

function PayPalButtonsBlock(props) {
  const [{ isPending, isRejected }] = usePayPalScriptReducer();
  if (isRejected) {
    return <Alert tone="error">PayPal could not be loaded. Disable any ad-blocker for this site and refresh the page.</Alert>;
  }
  return (
    <div className="relative min-h-[110px]">
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-slate-400 animate-spin" />
        </div>
      )}
      <PayPalButtons style={{ layout: 'vertical', shape: 'pill', color: 'gold', label: 'pay', height: 48 }} {...props} />
      <p className="text-[11px] text-center text-slate-500 flex items-center justify-center mt-2">
        <CreditCard className="w-3.5 h-3.5 mr-1" /> No PayPal account? Choose “Debit or Credit Card”.
      </p>
    </div>
  );
}

function GatewaySwitch({ isCashfree, onSwitch }) {
  return (
    <p className="text-[11px] text-center text-slate-500">
      {isCashfree ? (
        <>
          Paying with a card issued outside India?{' '}
          <button type="button" onClick={() => onSwitch(true)} className="font-bold text-indigo-600 hover:underline">
            Pay in GBP with PayPal instead
          </button>
        </>
      ) : (
        <>
          In India?{' '}
          <button type="button" onClick={() => onSwitch(false)} className="font-bold text-indigo-600 hover:underline">
            Pay in ₹ with UPI, cards or net banking (Cashfree)
          </button>
        </>
      )}
    </p>
  );
}

function OrderSummary({ total, subtitle, promo, cpd }) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Tuition Investment</div>
        <div className="text-3xl font-black text-slate-900 text-gradient">{total}</div>
        <div className="text-xs text-slate-500 mt-0.5">{subtitle}</div>
        {promo && <div className="text-[11px] text-emerald-700 font-bold mt-1">Voucher applied: {promo}</div>}
      </div>
      <div className="flex flex-col sm:items-end space-y-1">
        <span className="px-3 py-1 rounded-xl bg-purple-100 text-purple-800 text-xs font-bold border border-purple-200 flex items-center">
          <Award className="w-3.5 h-3.5 mr-1 text-purple-600" />
          {cpd} CPD Credits Total
        </span>
        <span className="text-[11px] text-slate-500">VAT included</span>
      </div>
    </div>
  );
}

function Field({ label, type = 'text', ...rest }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-slate-700 mb-1">{label}</label>
      <input type={type} {...rest} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none" />
    </div>
  );
}

function Alert({ tone, children }) {
  const styles = tone === 'error' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-blue-50 border-blue-200 text-blue-900';
  const Icon = tone === 'error' ? AlertCircle : Info;
  return (
    <div className={`p-3 rounded-xl border text-xs font-semibold flex items-start space-x-2 ${styles}`}>
      <Icon className="w-4 h-4 shrink-0 mt-0.5" />
      <span>{children}</span>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-500">{label}:</span>
      <span className="font-bold text-slate-900 text-right">{value}</span>
    </div>
  );
}

function TrustStrip({ isCashfree }) {
  return (
    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
      <span className="flex items-center">
        <Lock className="w-3.5 h-3.5 text-emerald-600 mr-1" /> Card & bank details are handled by {isCashfree ? 'Cashfree (RBI-authorised)' : 'PayPal'}, never stored by us
      </span>
      <span className="flex items-center"><CheckCircle className="w-3.5 h-3.5 text-emerald-600 mr-1" /> 14-day refund policy</span>
      <span className="flex items-center"><Globe className="w-3.5 h-3.5 text-indigo-600 mr-1" /> VAT invoice included</span>
    </div>
  );
}