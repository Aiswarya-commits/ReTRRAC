import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  ShieldCheck,
  CheckCircle,
  Clock,
  Award,
  FileText,
  ExternalLink,
  ArrowRight,
  Download,
  AlertCircle,
  Building,
  User,
  CreditCard,
  MapPin
} from 'lucide-react';
import { useBookings } from '../context/BookingContext';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';

export default function TrackBookingPage() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || searchParams.get('bookingId') || '';

  const { lookupBooking } = useBookings();
  const { currentUser } = useAuth();
  const { formatAmount } = useCurrency();

  const [searchQuery, setSearchQuery] = useState(initialId);
  const [searchedBooking, setSearchedBooking] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [invoiceModalBooking, setInvoiceModalBooking] = useState(null);

  // A link with ?id=BK-... shows that booking.
  // A signed-in student automatically sees their own latest booking.
  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    } else if (currentUser?.email && currentUser.role !== 'admin') {
      setSearchQuery(currentUser.email);
      handleSearch(currentUser.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialId, currentUser?.email]); 
  const handleSearch = async (queryToUse = searchQuery) => {
    const q = (queryToUse || '').trim();
    if (!q) return;
    setHasSearched(true);
    setSearchedBooking(await lookupBooking(q));
  };
  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 font-sans">

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-purple-900/80 border border-purple-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>UK Official Academy Enrolment Tracker</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Track Your Course Booking Status
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Enter your Booking Reference Number (e.g. <span className="font-mono text-cyan-300 font-bold">BK-UK-2026-8942</span>) or your registered candidate email address to inspect live milestone verification.
          </p>

          {/* Search Box */}
          <div className="pt-4 max-w-md mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="flex space-x-2 bg-white/10 p-1.5 rounded-2xl border border-white/20 backdrop-blur-md"
            >
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter Booking ID (e.g. BK-UK-...) or Email"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 uppercase placeholder:normal-case font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-tech text-white font-bold text-xs shadow-md shadow-indigo-500/25 hover:opacity-95 transition-all"
              >
                Track Status
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">

        {searchedBooking ? (
          <div className="space-y-8 animate-fade-in">

            {/* Summary Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/5 space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-black text-xl text-indigo-700">
                      {searchedBooking.bookingId}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${searchedBooking.bookingStatus === 'Access Granted'
                      ? 'bg-purple-50 text-purple-800 border-purple-200'
                      : searchedBooking.bookingStatus === 'Completed'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : searchedBooking.bookingStatus === 'Confirmed'
                          ? 'bg-blue-50 text-blue-800 border-blue-200'
                          : searchedBooking.bookingStatus === 'Processing'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : 'bg-red-50 text-red-800 border-red-200'
                      }`}>
                      {searchedBooking.bookingStatus}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Order registered on {searchedBooking.date}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setInvoiceModalBooking(searchedBooking)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Invoice</span>
                  </button>

                  <Link
                    to="/user/dashboard"
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center space-x-1.5"
                  >
                    <span>Student Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Candidate & Enrolment Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Candidate Name</span>
                  <strong className="text-slate-900 text-sm block">{searchedBooking.studentName}</strong>
                  <span className="text-slate-500 text-[11px] block">{searchedBooking.email}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Course Enrolled</span>
                  <strong className="text-slate-900 block line-clamp-1">
                    {searchedBooking.courses ? searchedBooking.courses.map(c => c.title).join(', ') : 'CAFS™ Specialist'}
                  </strong>
                  <span className="text-purple-700 font-semibold text-[11px] block">
                    Cohort: {searchedBooking.courses && searchedBooking.courses[0] ? searchedBooking.courses[0].cohort : 'July 01, 2026'}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Payment Received</span>
                  <strong className="text-slate-900 text-sm block">
                    {searchedBooking.currency === 'INR' ? '₹' : '£'}{Number(searchedBooking.totalAmount).toLocaleString()}
                  </strong>
                  <span className="text-emerald-600 font-bold text-[11px] block">
                    ✓ {searchedBooking.paypalOrderId || searchedBooking.cashfreeOrderId}
                  </span>
                </div>
              </div>

              {/* 5-Step Visual Stepper Tracker */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                    Official UK Enrolment Milestone Timeline
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">
                    Supervised by London Deanery
                  </span>
                </div>

                <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200 before:z-0">
                  {searchedBooking.timeline.map((step) => {
                    const isDone = step.status === 'completed';
                    const isCurrent = step.status === 'in-progress';

                    return (
                      <div key={step.step} className="relative z-10 flex items-start space-x-4 pl-1">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0 shadow-sm ${isDone
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                            ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 animate-pulse'
                            : 'bg-white border-2 border-slate-300 text-slate-400'
                          }`}>
                          {isDone ? '✓' : step.step}
                        </div>

                        <div className={`flex-1 p-4 rounded-2xl border transition-all ${isDone
                          ? 'bg-slate-50 border-slate-200 text-slate-800'
                          : isCurrent
                            ? 'bg-purple-50/60 border-purple-200 shadow-sm'
                            : 'bg-white border-slate-100 text-slate-400'
                          }`}>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                            <h4 className={`text-xs sm:text-sm font-bold ${isCurrent ? 'text-indigo-900 font-extrabold' : 'text-slate-900'}`}>
                              {step.title}
                            </h4>
                            <span className="text-[10px] font-semibold text-slate-500 font-mono">
                              {step.time}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Banner depending on stage */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <h4 className="text-sm font-black">
                    {searchedBooking.lmsAccessGranted
                      ? 'London Virtual Classroom LMS Portal Active'
                      : 'Candidate Verification in Queue'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {searchedBooking.lmsAccessGranted
                      ? 'Your lecture links, pre-reading case studies, and synthetic datasets are ready.'
                      : 'The London registrar team is reviewing your registration files. Access links dispatch within 24 hours.'}
                  </p>
                </div>

                <div className="shrink-0 flex items-center space-x-2">
                  <Link
                    to="/user/dashboard"
                    className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors"
                  >
                    Open Student Portal
                  </Link>
                </div>
              </div>

            </div>

          </div>
        ) : hasSearched ? (
          <div className="p-12 rounded-3xl bg-white border border-slate-200 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900">No Booking Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We could not find an active enrolment matching "{searchQuery}". Please verify your reference number or contact our London support desk.
              </p>
            </div>
            <div className="pt-2">
              <Link
                to="/contact"
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-indigo-600 transition-colors inline-block"
              >
                Contact London Registrar
              </Link>
            </div>
          </div>
        ) : null}

      </div>

      {/* OFFICIAL UK INVOICE MODAL (Printable format) */}
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

            {/* Billed to */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Candidate / Client:</span>
                <strong className="text-slate-900 text-sm block">{invoiceModalBooking.studentName}</strong>
                <span className="text-slate-600 block">{invoiceModalBooking.email}</span>
                <span className="text-slate-500 block">{invoiceModalBooking.organization}</span>
                <span className="text-slate-500 block">{invoiceModalBooking.billingAddress}</span>
              </div>

              <div>
                <span className="text-slate-400 block font-bold text-[10px] uppercase">Payment Method:</span>
                <strong className="text-slate-800 block">{invoiceModalBooking.paymentGateway}</strong>
                <span className="text-slate-500 font-mono block">Order ID: {invoiceModalBooking.paypalOrderId || invoiceModalBooking.cashfreeOrderId}</span>
                <span className="text-slate-500 block">Accreditation: CPD UK Standards Office</span>
              </div>
            </div>

            {/* Line items */}
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
                  onClick={handlePrintInvoice}
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
