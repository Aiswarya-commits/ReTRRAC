// Cashfree checkout flow for Indian (INR) payments:
//   "Pay with Cashfree" → POST /create-order → Cashfree popup (UPI / cards / net banking)
//   popup closes        → POST /verify-order → server asks Cashfree; PAID + amount matches → booking saved
//   Cashfree webhook    → POST /webhook      → same check (catches buyers who closed the tab)
// A booking is only created after Cashfree's API itself says the order is PAID.

import { Router } from 'express';
import crypto from 'node:crypto';
import {
  createCashfreeOrder,
  getCashfreeOrder,
  getCashfreeOrderPayments,
  getCashfreeRefunds,
  verifyCashfreeSignature,
  isCashfreeConfigured,
  cashfreeMode
} from '../cashfree/client.js';
import { buildQuote, quoteToCashfreeOrder, PricingError } from '../data/courses.js';
import { db, isPersistent } from '../store/db.js';
import { buildCashfreeBooking, nowStamp } from '../utils/bookings.js';

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ORDER_ID_RE = /^[A-Za-z0-9_-]{3,45}$/;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pendingKey = (orderId) => `cf:${orderId}`;

/** Cashfree needs a 10-digit Indian mobile (or +country code for international numbers). */
export function toCashfreePhone(raw) {
  const text = String(raw || '').trim();
  let d = text.replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  if (/^[6-9]\d{9}$/.test(d)) return d;
  const all = text.replace(/\D/g, '');
  if (text.startsWith('+') && all.length >= 8 && all.length <= 15) return `+${all}`;
  return null;
}

function cleanCustomer(raw = {}) {
  const s = (v, max = 160) => String(v ?? '').trim().slice(0, max);
  const customer = {
    name: s(raw.name, 120),
    email: s(raw.email, 160).toLowerCase(),
    phone: s(raw.phone, 40),
    organization: s(raw.organization),
    country: s(raw.country, 60),
    address: s(raw.address, 240)
  };
  if (!customer.name) throw new PricingError('Please enter the candidate’s full legal name.');
  if (!EMAIL_RE.test(customer.email)) throw new PricingError('Please enter a valid email address.');
  customer.cashfreePhone = toCashfreePhone(customer.phone);
  if (!customer.cashfreePhone) {
    throw new PricingError('Please enter a valid 10-digit mobile number – Cashfree needs it for UPI and card OTPs.');
  }
  customer.cashfreeId = `CUST${crypto.createHash('sha256').update(customer.email).digest('hex').slice(0, 24)}`;
  return customer;
}

function sendError(res, err) {
  const status = err.status && err.status >= 400 && err.status < 600 ? err.status : 500;
  if (status >= 500) console.error('[cashfree]', err.message, err.details ? JSON.stringify(err.details) : '');
  res.status(status).json({ success: false, error: err.message, code: err.details?.code || null });
}

// Where Cashfree sends the buyer back to if the popup can't be used (e.g. in-app browsers).
function siteOrigin(req) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '');
  const origin = req.get('origin');
  if (origin && /^https?:\/\/[^/]+$/.test(origin)) return origin;
  const proto = req.get('x-forwarded-proto') || req.protocol;
  return `${proto}://${req.get('x-forwarded-host') || req.get('host')}`;
}

function apiOrigin(req) {
  const proto = (req.get('x-forwarded-proto') || req.protocol || '').split(',')[0].trim();
  return `${proto}://${req.get('x-forwarded-host') || req.get('host')}`;
}

// ── Public config for the frontend ───────────────────────────
router.get('/config', (req, res) => {
  res.json({ configured: isCashfreeConfigured(), mode: cashfreeMode() });
});

// ── Price preview in rupees ──────────────────────────────────
router.post('/quote', (req, res) => {
  try {
    const { items, promoCode } = req.body || {};
    res.json({ success: true, quote: buildQuote(items, 'INR', promoCode, { gateway: 'cashfree' }) });
  } catch (err) {
    sendError(res, err);
  }
});

// ── Step 1: create the Cashfree order ────────────────────────
router.post('/create-order', async (req, res) => {
  try {
    if (!isPersistent) {
      return res.status(503).json({
        success: false,
        error: 'Online payments are temporarily unavailable (booking database not connected). Please contact info@retrrac.org.'
      });
    }
    if (!isCashfreeConfigured()) {
      return res.status(503).json({ success: false, error: 'Indian payments are not configured yet. Please contact info@retrrac.org.' });
    }

    const { items, promoCode, customer: rawCustomer } = req.body || {};
    const customer = cleanCustomer(rawCustomer);
    const quote = buildQuote(items, 'INR', promoCode, { gateway: 'cashfree' });
    const orderId = `RTIN-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

    const site = siteOrigin(req);
    const api = apiOrigin(req);
    const order = await createCashfreeOrder(
      quoteToCashfreeOrder(quote, {
        orderId,
        customer,
        returnUrl: `${site}/payment/cashfree?order_id=${orderId}`,
        // Cashfree only accepts https notify URLs (so not on localhost)
        notifyUrl: api.startsWith('https://') ? `${api}/api/cashfree/webhook` : null
      })
    );

    if (!order.payment_session_id) {
      throw Object.assign(new Error('Cashfree did not return a payment session. No money was taken.'), { status: 502 });
    }

    const { cashfreePhone, cashfreeId, ...storedCustomer } = customer;
    await db.savePendingOrder(pendingKey(orderId), { orderId, quote, customer: storedCustomer });
    res.json({ success: true, orderId, paymentSessionId: order.payment_session_id, mode: cashfreeMode(), quote });
  } catch (err) {
    sendError(res, err);
  }
});

/**
 * Checks an order with Cashfree and creates the booking once it is PAID.
 * Safe to call many times (browser, return page and webhook may all call it).
 */
export async function finalizeCashfreeOrder(orderId) {
  const existing = await db.findBookingByCashfreeOrder(orderId);
  if (existing) return { state: 'paid', booking: existing };

  // Only orders this site created are looked up.
  if (!(await db.getPendingOrder(pendingKey(orderId)))) return { state: 'unknown' };

  const lockName = `cfverify:${orderId}`;
  if (!(await db.acquireLock(lockName))) {
    for (let i = 0; i < 16; i++) {
      await sleep(500);
      const b = await db.findBookingByCashfreeOrder(orderId);
      if (b) return { state: 'paid', booking: b };
    }
    return { state: 'pending', message: 'Your payment is still being confirmed. Please check again in a moment.' };
  }

  try {
    const again = await db.findBookingByCashfreeOrder(orderId);
    if (again) return { state: 'paid', booking: again };
    const pending = await db.getPendingOrder(pendingKey(orderId));
    if (!pending) return { state: 'unknown' };

    const order = await getCashfreeOrder(orderId);
    const payments = await getCashfreeOrderPayments(orderId);

    if (order.order_status !== 'PAID') {
      if (payments.some((p) => p.payment_status === 'PENDING')) {
        return { state: 'pending', message: 'Your bank is still confirming this payment. This page will update when it clears.' };
      }
      const last = payments[0];
      const reason = last?.payment_message ? ` (${last.payment_message})` : '';
      return {
        state: 'failed',
        message: ['EXPIRED', 'TERMINATED'].includes(order.order_status)
          ? 'This payment session has expired. You have not been charged – please try again.'
          : `The payment was not completed${reason}. You have not been charged.`
      };
    }

    const payment = payments.find((p) => p.payment_status === 'SUCCESS');
    if (!payment) return { state: 'pending', message: 'Cashfree is finalising this payment. Please check again in a moment.' };

    const expected = Number(pending.quote.total);
    const paid = Number(payment.payment_amount);
    // The order must be for our exact price. A Cashfree offer/coupon (set up in the
    // Cashfree dashboard) may make the buyer pay a little less – that is allowed.
    if (
      order.order_currency !== 'INR' ||
      Number(order.order_amount) !== expected ||
      !(paid > 0 && paid <= expected)
    ) {      console.error('[cashfree] Amount mismatch', { orderId, order: order.order_amount, paid: payment.payment_amount, expected });
      return { state: 'mismatch', message: 'Payment amount did not match the order. Our team has been alerted – please contact info@retrrac.org.' };
    }

    const booking = buildCashfreeBooking({ quote: pending.quote, customer: pending.customer, payment, orderId });
    await db.insertBooking(booking);
    await db.deletePendingOrder(pendingKey(orderId));
    console.log(`[cashfree] ✔ ${booking.bookingId} – INR ${payment.payment_amount} paid (${payment.cf_payment_id}) for ${booking.email}`);
    return { state: 'paid', booking };
  } finally {
    await db.releaseLock(lockName).catch(() => {});
  }
}

// ── Step 2: confirm the payment after the popup closes ───────
router.post('/verify-order', async (req, res) => {
  const orderId = String(req.body?.orderId || req.body?.order_id || '').trim();
  if (!ORDER_ID_RE.test(orderId)) return res.status(400).json({ success: false, error: 'Missing or invalid order reference.' });

  try {
    const result = await finalizeCashfreeOrder(orderId);
    switch (result.state) {
      case 'paid':
        return res.json({ success: true, state: 'paid', booking: result.booking });
      case 'pending':
        return res.status(202).json({ success: true, state: 'pending', message: result.message });
      case 'unknown':
        return res.status(404).json({ success: false, state: 'unknown', error: 'We could not find this checkout session. If you were charged, please contact info@retrrac.org.' });
      case 'mismatch':
        return res.status(409).json({ success: false, state: 'mismatch', error: result.message });
      default:
        return res.status(402).json({ success: false, state: 'failed', error: result.message });
    }
  } catch (err) {
    sendError(res, err);
  }
});

// Marks a booking refunded once Cashfree reports successful refunds.
async function syncRefunds(orderId) {
  const booking = await db.findBookingByCashfreeOrder(orderId);
  if (!booking) return;
  const refunds = (await getCashfreeRefunds(orderId)).filter((r) => r.refund_status === 'SUCCESS');
  if (!refunds.length) return;
  const refunded = refunds.reduce((s, r) => s + Number(r.refund_amount || 0), 0);
  const full = refunded + 0.001 >= Number(booking.totalAmount);
  await db.updateBooking(booking.bookingId, (b) => ({
    ...b,
    paymentStatus: full ? 'Refunded via Cashfree' : `Partially Refunded (INR ${refunded.toFixed(2)})`,
    bookingStatus: full ? 'Cancelled' : b.bookingStatus,
    cashfreeRefundIds: refunds.map((r) => String(r.cf_refund_id || r.refund_id)),
    adminNotes: `${full ? 'Refunded' : 'Partially refunded'} via Cashfree – ${nowStamp()}`
  }));
}

// ── Webhooks (payment success/failure, refunds) ──────────────
// Cashfree dashboard → Developers → Webhooks:  https://YOUR-DOMAIN/api/cashfree/webhook
router.post('/webhook', async (req, res) => {
  const signed = verifyCashfreeSignature(req.rawBody, req.get('x-webhook-timestamp'), req.get('x-webhook-signature'));
  if (!signed) console.warn('[cashfree webhook] signature not verified – the order will still be checked with the Cashfree API');

  const data = req.body?.data || {};
  const type = String(req.body?.type || '');
  const orderId = String(data.order?.order_id || data.refund?.order_id || '').trim();
  if (!ORDER_ID_RE.test(orderId)) return res.json({ success: true, ignored: true });

  try {
    if (type.includes('REFUND')) await syncRefunds(orderId);
    else await finalizeCashfreeOrder(orderId);
    res.json({ success: true });
  } catch (err) {
    console.error('[cashfree webhook]', err.message);
    res.status(500).json({ success: false }); // Cashfree retries later
  }
});

export default router;