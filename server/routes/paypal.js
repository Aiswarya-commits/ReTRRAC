import { Router } from 'express';
import crypto from 'node:crypto';
import {
  createPayPalOrder,
  capturePayPalOrder,
  getPayPalOrder,
  verifyWebhookSignature,
  isPayPalConfigured,
  PayPalError
} from '../paypal/client.js';
import { buildQuote, quoteToPayPalOrder, PricingError } from '../data/courses.js';
import { db, isPersistent } from '../store/db.js';
import { buildPaidBooking, nowStamp } from '../utils/bookings.js';

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
  return customer;
}

function sendError(res, err) {
  const status = err.status && err.status >= 400 && err.status < 600 ? err.status : 500;
  const issue = err.details?.details?.[0]?.issue || err.issue || null;
  if (status >= 500) console.error('[paypal]', err.message, err.details ? JSON.stringify(err.details) : '');
  res.status(status).json({ success: false, error: err.message, issue, debugId: err.details?.debug_id || null });
}

router.get('/config', (req, res) => {
  res.json({
    configured: isPayPalConfigured(),
    clientId: isPayPalConfigured() ? process.env.PAYPAL_CLIENT_ID : null,
    mode: (process.env.PAYPAL_MODE || 'sandbox').toLowerCase(),
    inrEnabled: String(process.env.PAYPAL_INR_ENABLED).toLowerCase() === 'true'
  });
});

router.post('/quote', (req, res) => {
  try {
    const { items, currency, promoCode } = req.body || {};
    res.json({ success: true, quote: buildQuote(items, currency, promoCode) });
  } catch (err) {
    sendError(res, err);
  }
});

router.post('/create-order', async (req, res) => {
  try {
    if (!isPersistent) {
      return res.status(503).json({
        success: false,
        error: 'Online payments are temporarily unavailable (booking database not connected). Please contact info@retrrac.org.'
      });
    }
    const { items, currency, promoCode, customer: rawCustomer } = req.body || {};
    const customer = cleanCustomer(rawCustomer);
    const quote = buildQuote(items, currency, promoCode);
    const referenceId = `RT-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;

    const order = await createPayPalOrder(
      quoteToPayPalOrder(quote, { referenceId, customer, brandName: process.env.BRAND_NAME }),
      `create-${referenceId}`
    );

    await db.savePendingOrder(order.id, { referenceId, quote, customer });
    res.json({ success: true, id: order.id, quote });
  } catch (err) {
    sendError(res, err);
  }
});

router.post('/capture-order', async (req, res) => {
  const orderId = String(req.body?.orderID || req.body?.orderId || '').trim();
  const fundingSource = String(req.body?.fundingSource || 'paypal');
  if (!orderId) return res.status(400).json({ success: false, error: 'Missing PayPal order ID.' });

  const lockName = `capture:${orderId}`;
  let locked = false;

  try {
    const existing = await db.findBookingByPayPalOrder(orderId);
    if (existing) return res.json({ success: true, booking: existing, alreadyCaptured: true });

    locked = await db.acquireLock(lockName);
    if (!locked) {
      for (let i = 0; i < 16; i++) {
        await sleep(500);
        const b = await db.findBookingByPayPalOrder(orderId);
        if (b) return res.json({ success: true, booking: b, alreadyCaptured: true });
      }
      return res.status(409).json({ success: false, error: 'Your payment is still being confirmed. Please refresh in a moment.' });
    }

    const pending = await db.getPendingOrder(orderId);
    if (!pending) {
      return res.status(404).json({ success: false, error: 'This checkout session has expired. Please start again.' });
    }

    let result;
    try {
      result = await capturePayPalOrder(orderId, `capture-${orderId}`);
    } catch (err) {
      if (err.details?.details?.[0]?.issue === 'ORDER_ALREADY_CAPTURED') {
        result = await getPayPalOrder(orderId);
      } else {
        throw err;
      }
    }

    const capture = result.purchase_units?.[0]?.payments?.captures?.[0];

    if (!capture) {
      return res.status(502).json({ success: false, error: 'PayPal did not return a capture. No money was taken.' });
    }
    if (!['COMPLETED', 'PENDING'].includes(capture.status)) {
      return res.status(402).json({
        success: false,
        error: `Payment was not completed (status: ${capture.status}). Please try another payment method.`,
        issue: 'CAPTURE_' + capture.status
      });
    }

    const paidValue = capture.amount?.value;
    const paidCurrency = capture.amount?.currency_code;
    if (Number(paidValue) !== Number(pending.quote.total) || paidCurrency !== pending.quote.chargeCurrency) {
      console.error('[paypal] Amount mismatch', { orderId, paidValue, paidCurrency, expected: pending.quote });
      return res.status(409).json({
        success: false,
        error: 'Payment amount did not match the order. Our team has been alerted – please contact info@retrrac.org.'
      });
    }

    const booking = buildPaidBooking({
      quote: pending.quote,
      customer: pending.customer,
      capture,
      payer: result.payer,
      orderId,
      fundingSource
    });

    await db.insertBooking(booking);
    await db.deletePendingOrder(orderId);

    console.log(`[paypal] ✔ ${booking.bookingId} – ${paidCurrency} ${paidValue} captured (${capture.id}) for ${booking.email}`);
    res.json({ success: true, booking });
  } catch (err) {
    sendError(res, err);
  } finally {
    if (locked) await db.releaseLock(lockName).catch(() => {});
  }
});

router.post('/webhook', async (req, res) => {
  const event = req.body;
  try {
    const verified = await verifyWebhookSignature(req.headers, event).catch(() => false);
    if (!verified) {
      console.warn('[paypal webhook] signature not verified – ignored', event?.id);
      return res.status(400).json({ success: false });
    }
    if (await db.seenWebhook(event.id)) return res.json({ success: true, duplicate: true });

    const resource = event.resource || {};
    const stamp = nowStamp();

    switch (event.event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED': {
        const b = await db.findBookingByCapture(resource.id);
        if (b && b.paymentStatus !== 'Paid (PayPal Verified)') {
          await db.updateBooking(b.bookingId, (x) => {
            x.paymentStatus = 'Paid (PayPal Verified)';
            if (x.bookingStatus === 'Processing') x.bookingStatus = 'Confirmed';
            x.timeline[0] = { ...x.timeline[0], title: 'Order Placed & PayPal Verified', status: 'completed', time: stamp };
            x.timeline[1].status = 'in-progress';
            return x;
          });
        }
        break;
      }
      case 'PAYMENT.CAPTURE.REFUNDED':
      case 'PAYMENT.CAPTURE.REVERSED':
      case 'PAYMENT.CAPTURE.DENIED': {
        const captureId =
          event.event_type === 'PAYMENT.CAPTURE.REFUNDED'
            ? (resource.links || []).find((l) => l.rel === 'up')?.href?.split('/').pop()
            : resource.id;
        const b = captureId && (await db.findBookingByCapture(captureId));
        if (b) {
          const label = {
            'PAYMENT.CAPTURE.REFUNDED': 'Refunded via PayPal',
            'PAYMENT.CAPTURE.REVERSED': 'Reversed (PayPal dispute/chargeback)',
            'PAYMENT.CAPTURE.DENIED': 'Payment Denied by PayPal'
          }[event.event_type];
          await db.updateBooking(b.bookingId, (x) => ({
            ...x,
            paymentStatus: label,
            bookingStatus: 'Cancelled',
            adminNotes: `${label} – ${stamp}`
          }));
        }
        break;
      }
      default:
        break;
    }

    await db.markWebhook(event.id);
    res.json({ success: true });
  } catch (err) {
    console.error('[paypal webhook]', err.message);
    res.status(500).json({ success: false });
  }
});

export default router;
export { PayPalError };