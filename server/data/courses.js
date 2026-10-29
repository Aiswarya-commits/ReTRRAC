// Server-side price list. THIS is what customers are charged –
// prices sent from the browser are ignored. Keep it in sync with src/data/coursesCatalog.js.

export const COURSES = {
  'cafs-specialist': {
    code: 'CAFS™',
    title: 'Certified Anti-Financial Crime Specialist',
    priceGBP: 1250,
    priceINR: 125000,
    cpdPoints: 60,
    cohorts: ['July 01, 2026', 'July 15, 2026', 'August 01, 2026']
  },
  'blackthrone-aml': {
    code: 'BT-SIM',
    title: 'Blackthrone™ AML & Sanctions Evasion Simulation',
    priceGBP: 850,
    priceINR: 85000,
    cpdPoints: 30,
    cohorts: ['July 15, 2026', 'August 10, 2026']
  },
  'clm-regtech': {
    code: 'CLM-PRO',
    title: 'Client Lifecycle Management & RegTech Architecture',
    priceGBP: 650,
    priceINR: 65000,
    cpdPoints: 25,
    cohorts: ['August 01, 2026', 'August 22, 2026']
  },
  'firmwide-risk-assessment': {
    code: 'FWRA-UK',
    title: 'UK MLR 2017 Firm-Wide Risk Assessment (FWRA) Masterclass',
    priceGBP: 550,
    priceINR: 55000,
    cpdPoints: 20,
    cohorts: ['July 22, 2026', 'August 18, 2026']
  },
  'crypto-fintech-aml': {
    code: 'CRYPTO-AML',
    title: 'FinTech, Crypto & Digital Assets Financial Crime Masterclass',
    priceGBP: 750,
    priceINR: 75000,
    cpdPoints: 20,
    cohorts: ['August 10, 2026', 'September 05, 2026']
  }
};

export const PROMO_CODES = {
  UKCPD10: 10,
  RETRRAC10: 10,
  LONDON15: 15
};

export class PricingError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

const money = (n) => (Math.round(n * 100) / 100).toFixed(2);

/**
 * Builds a trusted quote from untrusted cart input.
 * gateway: 'paypal' (GBP unless PAYPAL_INR_ENABLED) or 'cashfree' (always INR)
 */
export function buildQuote(items, displayCurrency = 'GBP', promoCode = '', { gateway = 'paypal' } = {}) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new PricingError('Your basket is empty.');
  }
  if (items.length > 10) throw new PricingError('Too many items in one order.');

  const inrEnabled = String(process.env.PAYPAL_INR_ENABLED).toLowerCase() === 'true';
  const wanted = gateway === 'cashfree' ? 'INR' : displayCurrency === 'INR' ? 'INR' : 'GBP';
  const chargeCurrency = gateway === 'cashfree' ? 'INR' : wanted === 'INR' && inrEnabled ? 'INR' : 'GBP';
  const priceKey = chargeCurrency === 'INR' ? 'priceINR' : 'priceGBP';

  const seen = new Set();
  const lines = items.map((raw) => {
    const id = String(raw?.courseId || raw?.id || '').trim();
    const course = COURSES[id];
    if (!course) throw new PricingError(`Unknown course: "${id}"`);
    if (seen.has(id)) throw new PricingError(`"${course.title}" appears twice in the basket.`);
    seen.add(id);

    let cohort = String(raw?.cohort || '').replace(/\s*Cohort$/i, '').trim();
    if (!course.cohorts.includes(cohort)) cohort = course.cohorts[0];

    return {
      courseId: id,
      code: course.code,
      title: course.title,
      cohort: `${cohort} Cohort`,
      unitPrice: course[priceKey],
      cpdPoints: course.cpdPoints
    };
  });

  const code = String(promoCode || '').trim().toUpperCase();
  const subtotal = lines.reduce((s, l) => s + l.unitPrice, 0);

  // Owner's live test: when LIVE_TEST_PROMO is set, that code makes the order cost exactly 1.00
  // (£1.00 on PayPal, ₹1.00 on Cashfree). Remove the variable after testing.
  const testCode = String(process.env.LIVE_TEST_PROMO || '').trim().toUpperCase();
  const isLiveTest = Boolean(testCode) && code === testCode && subtotal > 1;

  let discountPercent = PROMO_CODES[code] || 0;
  let discount = Math.round((subtotal * discountPercent) / 100 * 100) / 100;
  if (isLiveTest) {
    discount = subtotal - 1;
    discountPercent = Math.round((discount / subtotal) * 10000) / 100;
  }
  const total = subtotal - discount;

  return {
    gateway,
    chargeCurrency,
    displayCurrency: wanted,
    currencyConverted: wanted !== chargeCurrency,
    lines,
    promoCode: discountPercent ? code : null,
    discountPercent,
    liveTest: isLiveTest,
    subtotal: money(subtotal),
    discount: money(discount),
    total: money(total)
  };
}

/** Converts a quote into a PayPal Orders v2 request body. */
export function quoteToPayPalOrder(quote, { referenceId, customer, brandName }) {
  const cur = quote.chargeCurrency;
  return {
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: referenceId,
        custom_id: referenceId,
        invoice_id: referenceId,
        description: quote.lines.length === 1
          ? quote.lines[0].title.slice(0, 127)
          : `ReTRRAC Academy – ${quote.lines.length} programmes`,
        soft_descriptor: 'RETRRAC ACADEMY',
        amount: {
          currency_code: cur,
          value: quote.total,
          breakdown: {
            item_total: { currency_code: cur, value: quote.subtotal },
            discount: { currency_code: cur, value: quote.discount }
          }
        },
        items: quote.lines.map((l) => ({
          name: `${l.code} ${l.title}`.slice(0, 127),
          description: l.cohort.slice(0, 127),
          sku: l.courseId,
          unit_amount: { currency_code: cur, value: money(l.unitPrice) },
          quantity: '1',
          category: 'DIGITAL_GOODS'
        }))
      }
    ],
    application_context: {
      brand_name: (brandName || 'ReTRRAC Global Academy').slice(0, 127),
      shipping_preference: 'NO_SHIPPING',
      user_action: 'PAY_NOW',
      locale: 'en-GB'
    }
  };
}

/** Converts a quote into a Cashfree "Create Order" request body (INR). */
export function quoteToCashfreeOrder(quote, { orderId, customer, returnUrl, notifyUrl }) {
  const note = quote.lines.length === 1
    ? quote.lines[0].title
    : `ReTRRAC Academy – ${quote.lines.length} programmes`;
  const body = {
    order_id: orderId,
    order_amount: Number(quote.total),
    order_currency: 'INR',
    customer_details: {
      customer_id: customer.cashfreeId,
      ...(customer.name.length >= 3 ? { customer_name: customer.name.slice(0, 100) } : {}),
      customer_email: customer.email,
      customer_phone: customer.cashfreePhone
    },
    order_meta: { return_url: returnUrl },
    order_note: note.slice(0, 200),
    order_tags: { courses: quote.lines.map((l) => l.courseId).join(',').slice(0, 250) }
  };
  if (notifyUrl) body.order_meta.notify_url = notifyUrl;
  return body;
}