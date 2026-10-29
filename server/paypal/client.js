// PayPal REST API (Orders v2) client.
// Talks to PayPal directly with fetch – no SDK needed. Node 18+ has fetch built in.

const BASE_URLS = {
  sandbox: 'https://api-m.sandbox.paypal.com',
  live: 'https://api-m.paypal.com'
};

export function paypalBaseUrl() {
  if (process.env.PAYPAL_API_BASE) return process.env.PAYPAL_API_BASE; // testing override
  const mode = (process.env.PAYPAL_MODE || 'sandbox').toLowerCase();
  return BASE_URLS[mode] || BASE_URLS.sandbox;
}

export function isPayPalConfigured() {
  const id = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  return Boolean(id && secret && !id.startsWith('your-') && !secret.startsWith('your-'));
}

// ── Access token (cached until ~1 min before expiry) ──────────
let cachedToken = null;
let tokenExpiresAt = 0;

async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken;

  if (!isPayPalConfigured()) {
    throw new PayPalError('PayPal credentials are not configured on the server (PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET).', 500);
  }

  const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString('base64');
  const res = await fetch(`${paypalBaseUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new PayPalError(`PayPal authentication failed: ${data.error_description || res.statusText}`, 502, data);
  }

  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken;
}

export class PayPalError extends Error {
  constructor(message, status = 502, details = null) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

async function paypalRequest(path, { method = 'GET', body, idempotencyKey } = {}) {
  const token = await getAccessToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation'
  };
  // PayPal-Request-Id makes create/capture safe to retry without double charging
  if (idempotencyKey) headers['PayPal-Request-Id'] = idempotencyKey;

  const res = await fetch(`${paypalBaseUrl()}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const issue = data?.details?.[0];
    const msg = issue ? `${issue.issue}: ${issue.description}` : (data.message || res.statusText);
    throw new PayPalError(msg, res.status, data);
  }
  return data;
}

// ── Orders v2 ────────────────────────────────────────────────
export function createPayPalOrder(payload, idempotencyKey) {
  return paypalRequest('/v2/checkout/orders', { method: 'POST', body: payload, idempotencyKey });
}

export function capturePayPalOrder(orderId, idempotencyKey) {
  return paypalRequest(`/v2/checkout/orders/${encodeURIComponent(orderId)}/capture`, {
    method: 'POST',
    idempotencyKey
  });
}

export function getPayPalOrder(orderId) {
  return paypalRequest(`/v2/checkout/orders/${encodeURIComponent(orderId)}`);
}

// ── Payments v2 (refunds) ────────────────────────────────────
export function refundCapture(captureId, { amount, currency, note } = {}, idempotencyKey) {
  const body = {};
  if (amount) body.amount = { value: amount, currency_code: currency };
  if (note) body.note_to_payer = note.slice(0, 255);
  return paypalRequest(`/v2/payments/captures/${encodeURIComponent(captureId)}/refund`, {
    method: 'POST',
    body,
    idempotencyKey
  });
}

// ── Webhook signature verification ───────────────────────────
export async function verifyWebhookSignature(headers, event) {
  if (!process.env.PAYPAL_WEBHOOK_ID) return false;
  const result = await paypalRequest('/v1/notifications/verify-webhook-signature', {
    method: 'POST',
    body: {
      auth_algo: headers['paypal-auth-algo'],
      cert_url: headers['paypal-cert-url'],
      transmission_id: headers['paypal-transmission-id'],
      transmission_sig: headers['paypal-transmission-sig'],
      transmission_time: headers['paypal-transmission-time'],
      webhook_id: process.env.PAYPAL_WEBHOOK_ID,
      webhook_event: event
    }
  });
  return result.verification_status === 'SUCCESS';
}
