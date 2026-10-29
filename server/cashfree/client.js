// Cashfree Payment Gateway (PG) REST client – used for Indian (INR) payments.
// Talks to Cashfree directly with fetch – no SDK needed (Node 18+).
import crypto from 'node:crypto';

const BASE_URLS = {
  sandbox: 'https://sandbox.cashfree.com/pg',
  production: 'https://api.cashfree.com/pg'
};

/** "sandbox" (test) or "production" (real money). "live"/"prod" are accepted too. */
export function cashfreeMode() {
  const m = String(process.env.CASHFREE_MODE || 'sandbox').trim().toLowerCase();
  return ['production', 'prod', 'live'].includes(m) ? 'production' : 'sandbox';
}

export function cashfreeBaseUrl() {
  if (process.env.CASHFREE_API_BASE) return process.env.CASHFREE_API_BASE; // testing override
  return BASE_URLS[cashfreeMode()];
}

export function isCashfreeConfigured() {
  const id = process.env.CASHFREE_APP_ID;
  const secret = process.env.CASHFREE_SECRET_KEY;
  return Boolean(id && secret && !id.startsWith('your-') && !secret.startsWith('your-'));
}

export class CashfreeError extends Error {
  constructor(message, status = 502, details = null) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

async function cashfreeRequest(path, { method = 'GET', body, idempotencyKey } = {}) {
  if (!isCashfreeConfigured()) {
    throw new CashfreeError('Cashfree is not configured on the server (CASHFREE_APP_ID / CASHFREE_SECRET_KEY).', 500);
  }
  const headers = {
    'x-client-id': process.env.CASHFREE_APP_ID,
    'x-client-secret': process.env.CASHFREE_SECRET_KEY,
    'x-api-version': process.env.CASHFREE_API_VERSION || '2025-01-01',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
  if (idempotencyKey) headers['x-idempotency-key'] = idempotencyKey;

  let res;
  try {
    res = await fetch(`${cashfreeBaseUrl()}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
  } catch (err) {
    throw new CashfreeError(`Could not reach Cashfree: ${err.message}`, 502);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    // Cashfree errors look like { message, code, type }
    const msg = data.message || res.statusText || 'Cashfree request failed';
    const status = res.status === 401 ? 502 : res.status; // bad keys are a server problem, not the buyer's
    throw new CashfreeError(msg, status, data);
  }
  return data;
}

// ── Orders ───────────────────────────────────────────────────
export function createCashfreeOrder(payload) {
  return cashfreeRequest('/orders', { method: 'POST', body: payload, idempotencyKey: crypto.randomUUID() });
}

export function getCashfreeOrder(orderId) {
  return cashfreeRequest(`/orders/${encodeURIComponent(orderId)}`);
}

export async function getCashfreeOrderPayments(orderId) {
  const data = await cashfreeRequest(`/orders/${encodeURIComponent(orderId)}/payments`);
  return Array.isArray(data) ? data : [];
}

// ── Refunds ──────────────────────────────────────────────────
export function refundCashfreeOrder(orderId, { amount, refundId, note }) {
  const body = {
    refund_amount: Number(amount),
    refund_id: refundId,
    refund_note: (note || 'Refund from ReTRRAC Global Academy').slice(0, 100).padEnd(3, '.')
  };
  return cashfreeRequest(`/orders/${encodeURIComponent(orderId)}/refunds`, { method: 'POST', body });
}

export async function getCashfreeRefunds(orderId) {
  const data = await cashfreeRequest(`/orders/${encodeURIComponent(orderId)}/refunds`);
  return Array.isArray(data) ? data : [];
}

// ── Webhook signature: Base64(HMAC-SHA256(timestamp + rawBody, secret)) ──
export function verifyCashfreeSignature(rawBody, timestamp, signature) {
  const secret = process.env.CASHFREE_SECRET_KEY;
  if (!secret || !rawBody || !timestamp || !signature) return false;
  const expected = crypto.createHmac('sha256', secret).update(String(timestamp) + rawBody).digest('base64');
  const a = Buffer.from(expected);
  const b = Buffer.from(String(signature));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}