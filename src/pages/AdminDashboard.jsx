import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Users,
  BookOpen,
  CreditCard,
  Sparkles,
  Plus,
  Search,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  FileText,
  DollarSign,
  TrendingUp,
  Award,
  Globe,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Filter,
  Check,
  X,
  FileCheck2,
  Lock,
  Layers,
  Settings,
  Clock,
  Send,
  Eye,
  Download
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';
import { useBookings } from '../context/BookingContext';
import { coursesCatalog } from '../data/coursesCatalog';
import { api } from '../lib/api';

export default function AdminDashboard() {
  const { currentUser, signOut } = useAuth();
  const { formatAmount } = useCurrency();
  const {
    bookings,
    loading,
    syncError,
    refreshBookings,
    updateBookingStatus,
    grantLmsAccess,
    issueCertificate,
    cancelBooking
  } = useBookings();
  const [busyId, setBusyId] = useState(null);
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'overview' | 'courses' | 'ai-logs'
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currencyFilter, setCurrencyFilter] = useState('ALL');
  const [addCourseModal, setAddCourseModal] = useState(false);
  const [selectedDossier, setSelectedDossier] = useState(null);

  // Courses list
  const [courseList, setCourseList] = useState(coursesCatalog);

  // Compute live statistics from bookings
  const liveGBP = bookings
    .filter(b => b.currency === 'GBP' && b.bookingStatus !== 'Cancelled')
    .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

  const liveINR = bookings
    .filter(b => b.currency === 'INR' && b.bookingStatus !== 'Cancelled')
    .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

  const totalScholars = new Set(bookings.filter(b => b.bookingStatus !== 'Cancelled').map(b => b.email)).size;
  const pendingRegistrar = bookings.filter(b => b.bookingStatus === 'Confirmed' || b.bookingStatus === 'Processing').length;
  const accessGrantedCount = bookings.filter(b => b.bookingStatus === 'Access Granted' || b.bookingStatus === 'Completed').length;

  // New Course Form state
  const [newCourse, setNewCourse] = useState({
    title: '',
    code: '',
    priceGBP: '',
    priceINR: '',
    duration: '40 Hours',
    cpdPoints: 40,
    cohort: 'August 15, 2026'
  });

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.title || !newCourse.priceGBP) return;

    const created = {
      id: `course-${Date.now()}`,
      code: newCourse.code || 'CERT',
      title: newCourse.title,
      enrolled: 0,
      priceGBP: Number(newCourse.priceGBP),
      priceINR: Number(newCourse.priceINR) || Number(newCourse.priceGBP) * 105,
      status: 'Active',
      duration: newCourse.duration,
      cpdPoints: Number(newCourse.cpdPoints),
      cohorts: [{ id: 'c1', date: newCourse.cohort, schedule: 'Live Batch', seatsLeft: 15 }]
    };

    setCourseList([created, ...courseList]);
    setAddCourseModal(false);
    setNewCourse({
      title: '',
      code: '',
      priceGBP: '',
      priceINR: '',
      duration: '40 Hours',
      cpdPoints: 40,
      cohort: 'August 15, 2026'
    });
  };

  // Filter bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch =
      b.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.courses && b.courses.some(c => c.title.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesStatus = statusFilter === 'ALL' || b.bookingStatus.toUpperCase() === statusFilter.toUpperCase();
    const matchesCurrency = currencyFilter === 'ALL' || b.currency === currencyFilter;

    return matchesSearch && matchesStatus && matchesCurrency;
  });

  // ── Admin actions (show an error instead of failing silently) ──
  const run = async (bookingId, action) => {
    setBusyId(bookingId);
    try {
      await action();
    } catch (err) {
      alert(err.message || 'That action failed. Please try again.');
    } finally {
      setBusyId(null);
    }
  };

  const isRefunded = (b) => /refund|reversed/i.test(b.paymentStatus || '');

  // Sends the money back through PayPal or Cashfree (whichever the candidate paid with).
  const refundBooking = (b) =>
    run(b.bookingId, async () => {
      const amount = `${b.currency === 'INR' ? '₹' : '£'}${Number(b.totalAmount).toLocaleString()}`;
      const via = b.paymentProvider === 'cashfree' ? 'Cashfree' : 'PayPal';
      if (!window.confirm(`Refund ${amount} to ${b.studentName} through ${via}?\n\nReal money goes back to the candidate and the booking is cancelled.`)) return;
      const reason = window.prompt('Reason for the refund (saved in admin notes):', 'Refund requested by candidate');
      if (reason === null) return;
      await api(`/api/bookings/${encodeURIComponent(b.bookingId)}/refund`, {
        method: 'POST',
        body: { reason: reason || 'Refund from ReTRRAC Global Academy' }
      });
      await refreshBookings();
      setSelectedDossier(null);
    });

  // Downloads the bookings currently shown (after filters) as a spreadsheet.
  const exportCsv = () => {
    const header = ['Booking ID', 'Date', 'Name', 'Email', 'Phone', 'Organisation', 'Country', 'Courses', 'Cohort',
      'Currency', 'Amount', 'Paid With', 'Payment ID', 'Order ID', 'Payment Status', 'Booking Status', 'Certificate ID'];
    const rows = filteredBookings.map((b) => [
      b.bookingId, b.date, b.studentName, b.email, b.phone, b.organization, b.country,
      (b.courses || []).map((c) => c.code).join(' + '), b.courses?.[0]?.cohort || '',
      b.currency, b.totalAmount, b.paymentGateway,
      b.cashfreePaymentId || b.paypalCaptureId || '', b.cashfreeOrderId || b.paypalOrderId || '',
      b.paymentStatus, b.bookingStatus, b.certificateId || ''
    ]);
    const csv = [header, ...rows]
      .map((r) => r.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\r\n');
    const url = URL.createObjectURL(new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `retrrac-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // AI Query Logs
  const aiLogs = [
    {
      id: "AI-901",
      query: "Can our UK firm outsource the MLRO function under MLR 2017?",
      userType: "Partner at City of London Law Firm",
      recommended: "CAFS™ Module 1 & FWRA Masterclass",
      time: "12 mins ago",
      sentiment: "High Intent Lead"
    },
    {
      id: "AI-902",
      query: "How does Blackthrone simulation prepare analysts for SAR filings with the UK NCA?",
      userType: "Head of Financial Crime (Fintech Bank)",
      recommended: "Blackthrone™ War Room Demo",
      time: "48 mins ago",
      sentiment: "Corporate Cohort Inquirer"
    },
    {
      id: "AI-903",
      query: "Is CAFS certificate recognized for CPD credits in India and UK?",
      userType: "Risk Analyst (Mumbai)",
      recommended: "CAFS™ CPD UK Accreditation Guide",
      time: "2 hours ago",
      sentiment: "Enrolled Candidate"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 font-sans">

      {/* Top Admin Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-900 text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-slate-900/20">
                UK
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-black text-slate-900">
                    ReTRRAC Academy Operations Command
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    London Deanery Admin
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Global Headquarters: 60 Cannon Street, London EC4N 6NP • Supervised by Dean Renjith Kalappurackal
                </p>
                <div className="flex items-center space-x-3 text-xs text-slate-600 mt-1">
                  <span className="flex items-center text-emerald-600 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> PayPal (UK) & Cashfree (India) Gateways Online
                  </span>
                  <span>•</span>
                  <span>Live Bookings Synced: <strong className="text-slate-800 font-bold">{bookings.length}</strong></span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Role Switcher */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => refreshBookings()}
                disabled={loading}
                className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 transition-all flex items-center space-x-1.5 disabled:opacity-60"
                title="Load the latest bookings from the server"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              <button
                onClick={exportCsv}
                className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 transition-all flex items-center space-x-1.5"
                title="Download the bookings shown below as a spreadsheet (CSV)"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
              <button
                onClick={() => setAddCourseModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-tech text-white font-bold text-xs shadow-md shadow-indigo-500/20 hover:opacity-95 transition-all flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Program</span>
              </button>

              <Link
                to="/user/dashboard"
                className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs border border-purple-200 transition-all flex items-center space-x-2"
              >
                <span>View Candidate Portal →</span>
              </Link>

              <button
                onClick={signOut}
                className="px-3.5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs border border-red-200 transition-all flex items-center space-x-1.5"
                title="Sign out of London Deanery"
              >
                <span>Sign Out</span>
              </button>
            </div>

          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-2 sm:space-x-4 mt-8 border-t border-slate-100 pt-4 overflow-x-auto">

            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${activeTab === 'bookings'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Course Bookings & Enrolments ({bookings.length})</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500 text-white">
                Live
              </span>
            </button>

            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Executive Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${activeTab === 'courses'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Course Catalog ({courseList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('ai-logs')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 ${activeTab === 'ai-logs'
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>AI Copilot Inquiries</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {syncError && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center justify-between gap-3">
            <span>Could not load bookings from the server: {syncError}</span>
            <button onClick={() => refreshBookings()} className="px-3 py-1.5 rounded-lg bg-white border border-red-200 font-bold">Try again</button>
          </div>
        )}

        {/* KPI CARDS (Always visible) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Tuition Revenue (UK & Global)</span>
              <DollarSign className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              £{liveGBP.toLocaleString('en-GB')}
            </div>
            <div className="text-xs text-slate-500">
              India Settlement: <span className="font-semibold text-emerald-600">₹{liveINR.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Active Scholars</span>
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              {totalScholars.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500">
              Across UK, India, UAE & 237 jurisdictions
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Registrar Queue</span>
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-amber-600">
              {pendingRegistrar} Pending
            </div>
            <div className="text-xs text-slate-500">
              Awaiting candidate file review & LMS link
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">LMS Access Live</span>
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-600">
              {accessGrantedCount} Active
            </div>
            <div className="text-xs text-slate-500">
              Enrolled students in London virtual labs
            </div>
          </div>
        </div>

        {/* 1. BOOKINGS & ENROLMENT CONTROL TAB */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Course Bookings & Candidate Enrollment Control
                </h3>
                <p className="text-xs text-slate-500">
                  Manage real-time PayPal payments, change fulfillment stages, grant LMS access credentials, and issue official CPD UK Certificates.
                </p>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search candidate, email, ID..."
                    className="pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none w-56 sm:w-64"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Access Granted">Access Granted</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                {/* Currency Filter */}
                <select
                  value={currencyFilter}
                  onChange={(e) => setCurrencyFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="ALL">All Currencies</option>
                  <option value="GBP">🇬🇧 GBP (£)</option>
                  <option value="INR">🇮🇳 INR (₹)</option>
                </select>
              </div>
            </div>

            {/* Bookings Management Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="p-4">Booking Ref</th>
                    <th className="p-4">Candidate & Organization</th>
                    <th className="p-4">Programme & Cohort</th>
                    <th className="p-4">Tuition & Payment ID</th>
                    <th className="p-4">Booking Stage</th>
                    <th className="p-4">Admin Status Control</th>
                    <th className="p-4">Fulfillment Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="p-8 text-center text-slate-400">
                        No bookings match the selected search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.bookingId} className="hover:bg-slate-50/70 transition-colors">

                        {/* Booking Ref */}
                        <td className="p-4">
                          <span className="font-mono font-bold text-indigo-700 block">
                            {b.bookingId}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {b.date}
                          </span>
                        </td>

                        {/* Candidate */}
                        <td className="p-4">
                          <strong className="text-slate-900 block">{b.studentName}</strong>
                          <span className="text-[11px] text-slate-500 block">{b.email}</span>
                          <span className="text-[10px] text-purple-700 font-semibold">{b.organization} • {b.country}</span>
                        </td>

                        {/* Programme */}
                        <td className="p-4">
                          <span className="font-bold text-slate-800 block line-clamp-1">
                            {b.courses ? b.courses.map(c => c.title).join(', ') : 'CAFS™ Specialist'}
                          </span>
                          <span className="text-[11px] text-emerald-700 font-semibold block">
                            {b.courses && b.courses[0] ? b.courses[0].cohort : 'July 01, 2026 Batch'}
                          </span>
                        </td>

                        {/* Tuition & PayPal */}
                        <td className="p-4">
                          <strong className="text-slate-900 text-sm block">
                            {b.currency === 'INR' ? '₹' : '£'}{Number(b.totalAmount).toLocaleString()}
                          </strong>
                          <span className="font-mono text-[10px] text-slate-400 block">
                            {b.paypalOrderId || b.cashfreeOrderId}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-600">
                            ✓ {b.paymentProvider === 'cashfree' ? 'Cashfree' : 'PayPal'} Verified
                          </span>
                        </td>

                        {/* Stage Pill */}
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border inline-block ${b.bookingStatus === 'Access Granted'
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
                        </td>

                        {/* Status Change Control Dropdown */}
                        <td className="p-4">
                          <select
                            value={b.bookingStatus}
                            disabled={busyId === b.bookingId}
                            onChange={(e) => {
                              const next = e.target.value;
                              run(b.bookingId, () => updateBookingStatus(b.bookingId, next));
                            }}
                            className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Access Granted">Access Granted</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        {/* Fulfillment Actions */}
                        <td className="p-4">
                          <div className="flex items-center space-x-1.5">

                            {/* Grant LMS Access */}
                            {!b.lmsAccessGranted && b.bookingStatus !== 'Cancelled' && (
                              <button
                                onClick={() => run(b.bookingId, () => grantLmsAccess(b.bookingId))}
                                className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-[11px] border border-indigo-200 transition-colors"
                                title="Issue LMS Virtual Classroom credentials"
                              >
                                Grant LMS
                              </button>
                            )}

                            {/* Issue Certificate */}
                            {!b.certificateIssued && b.bookingStatus !== 'Cancelled' && (
                              <button
                                onClick={() => run(b.bookingId, () => issueCertificate(b.bookingId))}
                                className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] border border-emerald-200 transition-colors"
                                title="Issue official CPD UK certificate"
                              >
                                Issue Cert
                              </button>
                            )}

                            {/* Inspect Dossier */}
                            <button
                              onClick={() => setSelectedDossier(b)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                              title="View full booking dossier"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* 2. EXECUTIVE OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Global Enrolment Trends & Geographical Distribution
                </h3>
                <p className="text-xs text-slate-500">
                  Tuition streams across United Kingdom, India, UAE, and European banking hubs.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                  <span className="text-[11px] font-bold text-indigo-900 uppercase">United Kingdom</span>
                  <div className="text-xl font-black text-indigo-950 mt-1">64%</div>
                  <p className="text-[10px] text-indigo-700 mt-0.5">London Financial Centre & SRA Law Firms</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                  <span className="text-[11px] font-bold text-purple-900 uppercase">India Operations</span>
                  <div className="text-xl font-black text-purple-950 mt-1">26%</div>
                  <p className="text-[10px] text-purple-700 mt-0.5">Pune Resource Centre & FinTech Hubs</p>
                </div>
                <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-100">
                  <span className="text-[11px] font-bold text-cyan-900 uppercase">Middle East & Global</span>
                  <div className="text-xl font-black text-cyan-950 mt-1">10%</div>
                  <p className="text-[10px] text-cyan-700 mt-0.5">Dubai DIFC & Cross-border Banks</p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Supervisory Audit Health Check
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">UK MLR 2017 Compliance Audit Log:</span>
                    <span className="font-bold text-emerald-600 flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> 100% Audit Ready
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">CPD UK Standards Office Accreditation Seal:</span>
                    <span className="font-bold text-emerald-600 flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> Valid through 2027
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">PayPal International Merchant Health:</span>
                    <span className="font-bold text-emerald-600 flex items-center">
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> 99.2% Authorization Rate
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 rounded-3xl p-6 text-white space-y-4">
                <div className="flex items-center space-x-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>London Deanery</span>
                </div>
                <h4 className="text-lg font-black text-white">
                  Spring 2026 Cohort Capacity
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All 4 course syllabi comply with UK MLR 2017 amendment guidelines and FCA Senior Managers Regime (SMCR).
                </p>
                <div className="pt-2">
                  <a
                    href="https://retrrac.org/wp-content/uploads/2025/01/ReTRRAC-Brochure.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Download London Brochure</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 3. COURSE CATALOG TAB */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Program & Certification Catalog</h3>
                <p className="text-xs text-slate-500">Configure curriculum pricing in £ GBP and ₹ INR, cohorts, and CPD credits.</p>
              </div>

              <button
                onClick={() => setAddCourseModal(true)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center space-x-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Program</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courseList.map((c) => (
                <div key={c.id} className="p-6 rounded-3xl border border-slate-200/90 bg-slate-50/50 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                        {c.code}
                      </span>
                      <h4 className="text-base font-extrabold text-slate-900 mt-1">{c.title}</h4>
                      <p className="text-xs text-slate-500">
                        Upcoming Cohort: {c.cohorts && c.cohorts[0] ? c.cohorts[0].date : 'Enrolling Now'}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      Active
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-200 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Tuition (UK £)</span>
                      <strong className="text-slate-900 text-sm">£{c.priceGBP.toLocaleString()} GBP</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Tuition (India ₹)</span>
                      <strong className="text-slate-900 text-sm">₹{c.priceINR.toLocaleString()} INR</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Accredited CPD</span>
                      <strong className="text-purple-700">{c.cpdPoints} Points</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration</span>
                      <strong className="text-indigo-700">{c.duration}</strong>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-1">
                    <Link
                      to={`/retrrac-academy/courses/${c.id}`}
                      className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-xs"
                    >
                      View Live Course Page →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. AI LOGS TAB */}
        {activeTab === 'ai-logs' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">ReTRRAC AI Intelligence Query Logs</h3>
              <p className="text-xs text-slate-500">Live questions submitted by prospective students and regulated corporate clients.</p>
            </div>

            <div className="space-y-4">
              {aiLogs.map((log) => (
                <div key={log.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-indigo-700">{log.id} • {log.userType}</span>
                    <span className="text-[11px] text-slate-400">{log.time}</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">
                    "{log.query}"
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-purple-700 font-medium">Recommended: {log.recommended}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                      {log.sentiment}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* FULL BOOKING DOSSIER MODAL */}
      {selectedDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 flex justify-between items-center">
              <div>
                <span className="text-cyan-300 text-xs font-bold uppercase tracking-wider block">Candidate Enrolment Dossier</span>
                <h3 className="text-xl font-black">{selectedDossier.bookingId}</h3>
              </div>
              <button onClick={() => setSelectedDossier(null)} className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-xs text-slate-700 max-h-[75vh] overflow-y-auto">
              {/* Candidate Info Grid */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Candidate Name</span>
                  <strong className="text-slate-900 text-sm">{selectedDossier.studentName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Email</span>
                  <span className="font-semibold text-slate-800">{selectedDossier.email}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Phone</span>
                  <span>{selectedDossier.phone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Organization</span>
                  <span>{selectedDossier.organization}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Billing Address</span>
                  <span>{selectedDossier.billingAddress}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Country</span>
                  <span>{selectedDossier.country}</span>
                </div>
              </div>

              {/* PayPal Transaction Info */}
              {/* Payment Info */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
                <h4 className="font-bold text-amber-900 uppercase text-[10px] tracking-wider">
                  {selectedDossier.paymentProvider === 'cashfree' ? 'Cashfree' : 'PayPal'} Payment Details
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">{selectedDossier.cashfreeOrderId ? 'Cashfree Order ID:' : 'PayPal Order ID:'}</span>
                    <span className="font-mono font-bold block text-slate-800">{selectedDossier.paypalOrderId || selectedDossier.cashfreeOrderId}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Transaction ID:</span>
                    <span className="font-mono font-bold block text-slate-800">{selectedDossier.cashfreePaymentId || selectedDossier.paypalCaptureId || '—'}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Tuition Settled:</span>
                    <strong className="block text-slate-900">{selectedDossier.currency === 'INR' ? '₹' : '£'}{Number(selectedDossier.totalAmount).toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Paid With:</span>
                    <span className="block text-slate-700">{selectedDossier.paymentGateway}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Payment Status:</span>
                    <span className={`font-bold block ${isRefunded(selectedDossier) ? 'text-red-700' : 'text-emerald-700'}`}>{selectedDossier.paymentStatus}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Date Logged:</span>
                    <span className="block text-slate-700">{selectedDossier.date}</span>
                  </div>
                  {selectedDossier.adminNotes && (
                    <div className="col-span-2">
                      <span className="text-slate-500">Admin Notes:</span>
                      <span className="block text-slate-700">{selectedDossier.adminNotes}</span>
                    </div>
                  )}
                </div>
              </div>              {/* Timeline Steps */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 uppercase text-[10px] tracking-wider">Fulfillment Timeline Milestones</h4>
                <div className="space-y-2.5">
                  {selectedDossier.timeline.map((step) => (
                    <div key={step.step} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 ${step.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-700'
                        : step.status === 'in-progress'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-slate-200 text-slate-500'
                        }`}>
                        {step.status === 'completed' ? '✓' : step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <strong className="text-slate-900">{step.title}</strong>
                          <span className="text-[10px] text-slate-400">{step.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Admin Action Buttons */}
              {/* Admin Action Buttons */}
              <div className="flex flex-wrap justify-between items-center gap-2 pt-3 border-t border-slate-200">
                <div className="flex flex-wrap gap-2">
                  {!isRefunded(selectedDossier) && (
                    <button
                      onClick={() => refundBooking(selectedDossier)}
                      disabled={busyId === selectedDossier.bookingId}
                      className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs disabled:opacity-50"
                    >
                      {busyId === selectedDossier.bookingId ? 'Working…' : 'Refund Payment'}
                    </button>
                  )}
                  {selectedDossier.bookingStatus !== 'Cancelled' && (
                    <button
                      onClick={() =>
                        run(selectedDossier.bookingId, async () => {
                          if (!window.confirm('Cancel this booking WITHOUT refunding the money?')) return;
                          await cancelBooking(selectedDossier.bookingId, 'Cancelled from admin dossier (no refund)');
                          setSelectedDossier(null);
                        })
                      }
                      disabled={busyId === selectedDossier.bookingId}
                      className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs disabled:opacity-50"
                    >
                      Cancel (no refund)
                    </button>
                  )}
                </div>

                <div className="space-x-2">
                  {!selectedDossier.lmsAccessGranted && selectedDossier.bookingStatus !== 'Cancelled' && (
                    <button
                      onClick={() =>
                        run(selectedDossier.bookingId, async () => {
                          await grantLmsAccess(selectedDossier.bookingId);
                          setSelectedDossier(null);
                        })
                      }
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
                    >
                      Grant LMS Access
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedDossier(null)}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PUBLISH COURSE MODAL */}
      {addCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-black text-slate-900">Publish New Academic Program</h3>
              <button onClick={() => setAddCourseModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleAddCourse} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sanctions & Export Controls Masterclass"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SEC-UK"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">CPD Credits</label>
                  <input
                    type="number"
                    value={newCourse.cpdPoints}
                    onChange={(e) => setNewCourse({ ...newCourse, cpdPoints: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fee in UK (£ GBP) *</label>
                  <input
                    type="number"
                    required
                    placeholder="950"
                    value={newCourse.priceGBP}
                    onChange={(e) => setNewCourse({ ...newCourse, priceGBP: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fee in India (₹ INR)</label>
                  <input
                    type="number"
                    placeholder="95000"
                    value={newCourse.priceINR}
                    onChange={(e) => setNewCourse({ ...newCourse, priceINR: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Upcoming Cohort Date</label>
                <input
                  type="text"
                  value={newCourse.cohort}
                  onChange={(e) => setNewCourse({ ...newCourse, cohort: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setAddCourseModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold"
                >
                  Publish Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
