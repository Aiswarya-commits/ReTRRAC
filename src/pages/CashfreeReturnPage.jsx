import React, { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, AlertCircle, Loader2, RefreshCw, ShieldCheck, FileCheck2 } from 'lucide-react';
import { api } from '../lib/api';
import { useBookings } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';

// Cashfree sends the buyer here (/payment/cashfree?order_id=...) when the popup could not be used.
// The server checks the order with Cashfree before anything is booked.
export default function CashfreeReturnPage() {
  const [params] = useSearchParams();
  const orderId = params.get('order_id') || '';
  const { addBooking } = useBookings();
  const { currentUser, loginAsStudent } = useAuth();

  const [state, setState] = useState('checking'); // checking | paid | pending | failed
  const [message, setMessage] = useState('');
  const [booking, setBooking] = useState(null);

  const check = useCallback(async () => {
    if (!orderId) {
      setState('failed');
      setMessage('No payment reference was found in this link.');
      return;
    }
    setState('checking');
    try {
      const res = await api('/api/cashfree/verify-order', { method: 'POST', body: { orderId } });
      if (res.state === 'paid' && res.booking) {
        addBooking(res.booking);
        if (!currentUser) {
          loginAsStudent({
            name: res.booking.studentName,
            email: res.booking.email,
            organization: res.booking.organization,
            country: res.booking.country
          });
        }
        setBooking(res.booking);
        setState('paid');
      } else {
        setState('pending');
        setMessage(res.message || 'Your payment is still being confirmed.');
      }
    } catch (err) {
      setState('failed');
      setMessage(err.message || 'We could not confirm this payment.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  useEffect(() => { check(); }, [check]);

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 flex items-center justify-center p-4 font-sans">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 text-center">
          <div className="inline-flex items-center space-x-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Cashfree Payment Confirmation</span>
          </div>
        </div>

        <div className="p-8 text-center space-y-5">
          {state === 'checking' && (
            <>
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mx-auto" />
              <h1 className="text-lg font-extrabold text-slate-900">Confirming your payment with Cashfree…</h1>
              <p className="text-xs text-slate-500">Please don’t close this page.</p>
            </>
          )}

          {state === 'paid' && booking && (
            <>
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-black text-slate-900">Payment successful</h1>
              <p className="text-xs text-slate-600">Thank you, {booking.studentName.split(' ')[0]}. Your enrolment is confirmed.</p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between"><span className="text-slate-500">Booking Reference:</span><span className="font-mono font-black text-indigo-700">{booking.bookingId}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Cashfree Payment ID:</span><span className="font-mono font-bold">{booking.cashfreePaymentId}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Amount Paid:</span><span className="font-bold">₹{Number(booking.totalAmount).toLocaleString('en-IN')}</span></div>
              </div>
              <Link
                to={`/user/dashboard?tab=bookings&trackId=${booking.bookingId}`}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-tech text-white font-bold text-xs shadow-lg"
              >
                <FileCheck2 className="w-4 h-4" />
                <span>Track Booking Progress →</span>
              </Link>
            </>
          )}

          {state === 'pending' && (
            <>
              <Loader2 className="w-10 h-10 text-amber-500 mx-auto" />
              <h1 className="text-lg font-extrabold text-slate-900">Payment being confirmed</h1>
              <p className="text-xs text-slate-600">{message}</p>
              <button onClick={check} className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs">
                <RefreshCw className="w-4 h-4" />
                <span>Check again</span>
              </button>
            </>
          )}

          {state === 'failed' && (
            <>
              <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
              <h1 className="text-lg font-extrabold text-slate-900">Payment not completed</h1>
              <p className="text-xs text-slate-600">{message}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/retrrac-academy" className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs">Back to courses</Link>
                <Link to="/contact" className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs">Contact us</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}