// Helpers that build and update booking records.
import crypto from 'node:crypto';

const sym = (cur) => (cur === 'INR' ? '₹' : '£');

export function nowStamp() {
  const d = new Date();
  return d.toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London', timeZoneName: 'short'
  });
}

function newBookingId(currency) {
  const prefix = currency === 'INR' ? 'IN' : 'UK';
  const rand = crypto.randomBytes(4).toString('hex').toUpperCase(); // hard to guess
  return `BK-${prefix}-${new Date().getFullYear()}-${rand}`;
}

// Shared shape for every paid booking (PayPal or Cashfree).
function baseBooking({ quote, customer, amount, isCompleted, provider, txnId }) {
  const cur = quote.chargeCurrency;
  const stamp = nowStamp();
  return {
    bookingId: newBookingId(cur),
    studentName: customer.name,
    email: customer.email,
    phone: customer.phone || '',
    organization: customer.organization || 'Independent Professional',
    country: customer.country || '',
    billingAddress: customer.address || '',
    courses: quote.lines.map((l) => ({
      courseId: l.courseId,
      code: l.code,
      title: l.title,
      cohort: l.cohort,
      price: l.unitPrice,
      currency: cur,
      cpdPoints: l.cpdPoints
    })),
    subtotal: Number(quote.subtotal),
    discount: Number(quote.discount),
    promoCode: quote.promoCode,
    totalAmount: amount,
    currency: cur,
    date: stamp,
    createdAt: new Date().toISOString(),
    lmsAccessGranted: false,
    lmsLoginUrl: 'https://lms.retrrac.org/student-login',
    certificateIssued: false,
    certificateId: null,
    timeline: [
      {
        step: 1,
        title: isCompleted ? `Order Placed & ${provider} Verified` : `Order Placed – ${provider} Reviewing Payment`,
        desc: isCompleted
          ? `Payment of ${sym(cur)}${amount.toLocaleString('en-GB')} captured by ${provider} (transaction ${txnId}).`
          : `${provider} is reviewing this payment (transaction ${txnId}). It usually clears within 24 hours.`,
        time: stamp,
        status: isCompleted ? 'completed' : 'in-progress'
      },
      {
        step: 2,
        title: 'UK Registrar Candidate Verification',
        desc: 'Application queued with ReTRRAC London Deanery for registration and cohort allocation.',
        time: 'Processing',
        status: isCompleted ? 'in-progress' : 'pending'
      },
      {
        step: 3,
        title: 'LMS Portal & Course Materials Activated',
        desc: 'Student credentials, virtual classroom access and course syllabi being generated.',
        time: 'Within 24 Hours',
        status: 'pending'
      },
      {
        step: 4,
        title: 'Academic Cohort In-Progress',
        desc: 'Interactive lectures and capstone project guidance with former Tier-1 UK MLROs.',
        time: quote.lines[0]?.cohort || 'Upcoming cohort',
        status: 'pending'
      },
      {
        step: 5,
        title: 'CPD UK Accreditation & Certificate Conferred',
        desc: 'Official CPD UK Registry ID and verifiable digital seal conferred upon evaluation.',
        time: 'Pending Completion',
        status: 'pending'
      }
    ]
  };
}

/** Booking saved after PayPal confirms the capture. */
export function buildPaidBooking({ quote, customer, capture, payer, orderId, fundingSource }) {
  const isCompleted = capture.status === 'COMPLETED';
  const amount = Number(capture.amount?.value ?? quote.total);
  const payerName = [payer?.name?.given_name, payer?.name?.surname].filter(Boolean).join(' ');
  const base = baseBooking({ quote, customer, amount, isCompleted, provider: 'PayPal', txnId: capture.id });

  return {
    ...base,
    paymentProvider: 'paypal',
    paymentGateway: fundingSource === 'card' ? 'Debit/Credit Card (via PayPal)' : 'PayPal',
    paypalOrderId: orderId,
    paypalCaptureId: capture.id,
    payerEmail: payer?.email_address || null,
    payerName: payerName || null,
    payerId: payer?.payer_id || null,
    paymentStatus: isCompleted ? 'Paid (PayPal Verified)' : 'Payment Pending (PayPal Review)',
    bookingStatus: isCompleted ? 'Confirmed' : 'Processing',
    adminNotes: quote.liveTest
      ? 'LIVE TEST order (owner voucher) – refund from the PayPal dashboard.'
      : quote.currencyConverted
      ? 'Visitor viewed INR prices; PayPal charged the GBP price (INR not enabled on merchant account).'
      : 'Online enrolment via PayPal checkout.'
  };
}

const CASHFREE_METHODS = {
  upi: 'UPI',
  credit_card: 'Credit Card',
  debit_card: 'Debit Card',
  credit_card_emi: 'Card EMI',
  debit_card_emi: 'Card EMI',
  cardless_emi: 'Cardless EMI',
  net_banking: 'Net Banking',
  wallet: 'Wallet',
  pay_later: 'Pay Later',
  bank_transfer: 'Bank Transfer'
};

/** Booking saved after Cashfree confirms the order is PAID. */
export function buildCashfreeBooking({ quote, customer, payment, orderId }) {
  const amount = Number(payment.payment_amount ?? quote.total);
  const paymentId = String(payment.cf_payment_id);
  const method = CASHFREE_METHODS[payment.payment_group] || null;
  const base = baseBooking({ quote, customer, amount, isCompleted: true, provider: 'Cashfree', txnId: paymentId });

  return {
    ...base,
    paymentProvider: 'cashfree',
    paymentGateway: method ? `${method} (via Cashfree)` : 'Cashfree',
    cashfreeOrderId: orderId,
    cashfreePaymentId: paymentId,
    bankReference: payment.bank_reference || null,
    paymentStatus: 'Paid (Cashfree Verified)',
    bookingStatus: 'Confirmed',
    adminNotes: quote.liveTest
      ? 'LIVE TEST order (owner voucher) – refund from the Cashfree dashboard.'
      : amount < Number(quote.total)
      ? `Online enrolment via Cashfree (India). Cashfree offer applied: paid ₹${amount} of ₹${quote.total}.`
      : 'Online enrolment via Cashfree checkout (India).'  };
}

/** Applies an admin status change and moves the timeline forward. */
export function applyStatus(b, status, adminNote) {
  const stamp = nowStamp();
  const t = b.timeline.map((s) => ({ ...s }));

  if (status === 'Processing') {
    t[1].status = 'in-progress';
  } else if (status === 'Access Granted') {
    t[1].status = 'completed';
    t[2].status = 'completed';
    t[2].time = stamp;
    t[3].status = 'in-progress';
  } else if (status === 'Completed') {
    for (let i = 1; i < 5; i++) t[i].status = 'completed';
    t[4].time = stamp;
  }

  return {
    ...b,
    bookingStatus: status,
    lmsAccessGranted: b.lmsAccessGranted || status === 'Access Granted' || status === 'Completed',
    adminNotes: adminNote || b.adminNotes,
    timeline: t
  };
}