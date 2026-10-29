import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import { useAuth } from './AuthContext';

// Bookings live on the server and are only created after PayPal / Cashfree confirm payment.
// • Admins load every booking (the server checks the admin key).
// • Signed-in candidates load only the bookings for their own email.
const BookingContext = createContext();

export function BookingProvider({ children }) {
  const { currentUser, isAdmin } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncError, setSyncError] = useState('');

  const email = currentUser?.email || '';

  // Remove old browser caches that could hold other people's data.
  useEffect(() => {
    try {
      localStorage.removeItem('retrrac_bookings');
      localStorage.removeItem('retrrac_bookings_cache_v2');
    } catch { /* ignore */ }
  }, []);

  const refreshBookings = useCallback(async () => {
    if (!email) {
      setBookings([]);
      return;
    }
    setLoading(true);
    try {
      const path = isAdmin ? '/api/bookings' : `/api/bookings?email=${encodeURIComponent(email)}`;
      const data = await api(path);
      setBookings(data.bookings || []);
      setSyncError('');
    } catch (err) {
      setSyncError(err.message);
    } finally {
      setLoading(false);
    }
  }, [email, isAdmin]);

  useEffect(() => {
    refreshBookings();
  }, [refreshBookings]);

  const replaceBooking = (updated) =>
    setBookings((prev) => {
      const exists = prev.some((b) => b.bookingId === updated.bookingId);
      return exists ? prev.map((b) => (b.bookingId === updated.bookingId ? updated : b)) : [updated, ...prev];
    });

  const addBooking = (booking) => {
    if (booking?.bookingId) replaceBooking(booking);
  };

  const updateBookingStatus = async (bookingId, newStatus, adminNote = null) => {
    const data = await api(`/api/bookings/${encodeURIComponent(bookingId)}/status`, {
      method: 'PUT',
      body: { status: newStatus, adminNote }
    });
    replaceBooking(data.booking);
    return data.booking;
  };

  const grantLmsAccess = (bookingId) =>
    updateBookingStatus(bookingId, 'Access Granted', 'LMS portal credentials and live link dispatched by London Admin.');

  const issueCertificate = async (bookingId, customCertId = null) => {
    const data = await api(`/api/bookings/${encodeURIComponent(bookingId)}/certificate`, {
      method: 'PUT',
      body: customCertId ? { certificateId: customCertId } : {}
    });
    replaceBooking(data.booking);
    return data.booking;
  };

  const cancelBooking = (bookingId, reason = 'Cancelled by administrator') =>
    updateBookingStatus(bookingId, 'Cancelled', reason);

  const getBookingById = (bookingId) => {
    if (!bookingId) return null;
    const clean = bookingId.trim().toUpperCase();
    return bookings.find((b) => b.bookingId.toUpperCase() === clean) || null;
  };

  const getBookingsByEmail = (mail) => {
    if (!mail) return [];
    const clean = mail.trim().toLowerCase();
    return bookings.filter((b) => b.email.toLowerCase() === clean);
  };

  /** Track Booking page: look up by booking reference or email, asking the server if needed. */
  const lookupBooking = async (query) => {
    const q = (query || '').trim();
    if (!q) return null;
    const local = q.includes('@') ? getBookingsByEmail(q)[0] : getBookingById(q);
    if (local) return local;
    try {
      if (q.includes('@')) {
        const data = await api(`/api/bookings?email=${encodeURIComponent(q)}`);
        return data.bookings?.[0] || null;
      }
      const data = await api(`/api/bookings/${encodeURIComponent(q)}`);
      return data.booking || null;
    } catch {
      return null;
    }
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        syncError,
        refreshBookings,
        addBooking,
        updateBookingStatus,
        grantLmsAccess,
        issueCertificate,
        cancelBooking,
        getBookingById,
        getBookingsByEmail,
        lookupBooking
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBookings must be used within a BookingProvider');
  return context;
}