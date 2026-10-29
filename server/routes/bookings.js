import { Router } from 'express';
import crypto from 'node:crypto';
import { db } from '../store/db.js';
import { applyStatus, nowStamp } from '../utils/bookings.js';
import { refundCapture } from '../paypal/client.js';
import { refundCashfreeOrder } from '../cashfree/client.js';
import { requireAdmin, isValidAdminKey } from '../middleware/admin.js';

const router = Router();
const STATUSES = ['Confirmed', 'Processing', 'Access Granted', 'Completed', 'Cancelled'];
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// Public look-ups don't include phone numbers, payer/bank details or admin notes.
const publicView = ({ phone, payerEmail, payerId, payerName, adminNotes, bankReference, cashfreeRefundIds, ...rest }) => rest;

router.get('/', wrap(async (req, res) => {
  if (req.query.email) {
    const list = await db.bookingsByEmail(req.query.email);
    const full = isValidAdminKey(req.get('x-admin-key'));
    return res.json({ success: true, total: list.length, bookings: full ? list : list.map(publicView) });
  }
  if (!isValidAdminKey(req.get('x-admin-key'))) {
    return res.status(401).json({ success: false, error: 'Admin authorisation required.' });
  }
  let list = await db.allBookings();
  if (req.query.search) {
    const q = String(req.query.search).toLowerCase();
    list = list.filter(
      (b) => b.bookingId.toLowerCase().includes(q) || b.email.toLowerCase() === q || b.studentName.toLowerCase().includes(q)
    );
  }
  res.json({ success: true, total: list.length, bookings: list });
}));

router.get('/:bookingId', wrap(async (req, res) => {
  const booking = await db.findBooking(req.params.bookingId);
  if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
  res.json({ success: true, booking: isValidAdminKey(req.get('x-admin-key')) ? booking : publicView(booking) });
}));

router.post('/', (req, res) => {
  res.status(405).json({ success: false, error: 'Bookings are created automatically after a successful payment.' });
});

router.put('/:bookingId/status', requireAdmin, wrap(async (req, res) => {
  const { status, adminNote } = req.body || {};
  if (!STATUSES.includes(status)) return res.status(400).json({ success: false, error: 'Invalid status' });
  const booking = await db.updateBooking(req.params.bookingId, (b) => applyStatus(b, status, adminNote));
  if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
  res.json({ success: true, booking });
}));

router.put('/:bookingId/certificate', requireAdmin, wrap(async (req, res) => {
  const certId = String(
    req.body?.certificateId || `CPD-UK-RETRRAC-${new Date().getFullYear()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`
  ).trim().toUpperCase();
  const booking = await db.updateBooking(req.params.bookingId, (b) => {
    const t = b.timeline.map((s) => ({ ...s }));
    t[4] = { ...t[4], status: 'completed', desc: `Official CPD UK Certificate issued: ${certId}`, time: nowStamp() };
    return { ...b, bookingStatus: 'Completed', certificateIssued: true, certificateId: certId, timeline: t };
  });
  if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });
  res.json({ success: true, booking });
}));

// Real refund – PayPal or Cashfree, depending on how it was paid.
router.post('/:bookingId/refund', requireAdmin, async (req, res) => {
  try {
    const booking = await db.findBooking(req.params.bookingId);
    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });

    if (booking.cashfreeOrderId) {
      const amount = req.body?.amount ? Number(req.body.amount).toFixed(2) : null;
      const alnum = booking.bookingId.replace(/[^A-Za-z0-9]/g, '');
      const refund = await refundCashfreeOrder(booking.cashfreeOrderId, {
        amount: amount || Number(booking.totalAmount).toFixed(2),
        refundId: `RF${alnum}${amount ? `P${Date.now().toString(36)}` : 'FULL'}`.toUpperCase().slice(0, 40),
        note: req.body?.reason
      });
      const done = refund.refund_status === 'SUCCESS';
      const updated = await db.updateBooking(booking.bookingId, (b) => ({
        ...b,
        bookingStatus: amount ? b.bookingStatus : 'Cancelled',
        paymentStatus: amount
          ? `Partial Refund ${done ? 'Issued' : 'Initiated'} (INR ${amount})`
          : done ? 'Refunded via Cashfree' : 'Refund Initiated via Cashfree',
        cashfreeRefundIds: [...(b.cashfreeRefundIds || []), String(refund.cf_refund_id || refund.refund_id)],
        adminNotes: req.body?.reason || b.adminNotes
      }));
      return res.json({ success: true, refund, booking: updated });
    }

    if (!booking.paypalCaptureId) return res.status(400).json({ success: false, error: 'No PayPal capture on this booking' });

    const amount = req.body?.amount ? Number(req.body.amount).toFixed(2) : null;
    const refund = await refundCapture(
      booking.paypalCaptureId,
      { amount, currency: booking.currency, note: req.body?.reason || 'Refund from ReTRRAC Global Academy' },
      `refund-${booking.bookingId}-${amount || 'full'}`
    );
    const updated = await db.updateBooking(booking.bookingId, (b) => ({
      ...b,
      bookingStatus: amount ? b.bookingStatus : 'Cancelled',
      paymentStatus: amount ? `Partially Refunded (${b.currency} ${amount})` : 'Refunded via PayPal',
      paypalRefundId: refund.id,
      adminNotes: req.body?.reason || b.adminNotes
    }));
    res.json({ success: true, refund, booking: updated });
  } catch (err) {
    res.status(err.status || 500).json({ success: false, error: err.message });
  }
});

export default router;