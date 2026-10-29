import { Router } from 'express';
import { db, storageKind } from '../store/db.js';
import { COURSES } from '../data/courses.js';
import { isPayPalConfigured } from '../paypal/client.js';
import { isCashfreeConfigured, cashfreeMode } from '../cashfree/client.js';
import { requireAdmin, isValidAdminKey } from '../middleware/admin.js';

const router = Router();
const wrap = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    time: new Date().toISOString(),
    storage: storageKind,
    adminConfigured: Boolean(process.env.ADMIN_PASSCODE),
    paypal: {
      configured: isPayPalConfigured(),
      mode: (process.env.PAYPAL_MODE || 'sandbox').toLowerCase(),
      webhook: Boolean(process.env.PAYPAL_WEBHOOK_ID)
    },
    cashfree: { configured: isCashfreeConfigured(), mode: cashfreeMode() }
  });
});

router.get('/courses', (req, res) => {
  res.json({ success: true, courses: Object.entries(COURSES).map(([id, c]) => ({ id, ...c })) });
});

router.post('/admin/login', (req, res) => {
  if (!process.env.ADMIN_PASSCODE) {
    return res.status(503).json({ success: false, error: 'Admin access is disabled. Set ADMIN_PASSCODE on the server.' });
  }
  if (!isValidAdminKey(String(req.body?.passcode || '').trim())) {
    return res.status(401).json({ success: false, error: 'Invalid administrator passcode.' });
  }
  res.json({ success: true });
});

router.get('/verify/:certId', wrap(async (req, res) => {
  const id = String(req.params.certId).trim().toUpperCase();
  const b = (await db.allBookings()).find((x) => x.certificateIssued && String(x.certificateId).toUpperCase() === id);
  if (!b) return res.status(404).json({ success: false, valid: false, certificateId: id });
  res.json({
    success: true,
    valid: true,
    certificateId: b.certificateId,
    recipient: b.studentName,
    course: b.courses.map((c) => `${c.title} (${c.code})`).join(', '),
    accreditation: 'CPD UK Standards Office',
    awardedDate: b.timeline?.[4]?.time || b.date,
    institution: 'ReTRRAC Global Academy, 60 Cannon Street, London EC4N 6NP'
  });
}));

router.get('/admin/stats', requireAdmin, wrap(async (req, res) => {
  const active = (await db.allBookings()).filter((b) => b.bookingStatus !== 'Cancelled');
  const sum = (cur) => active.filter((b) => b.currency === cur).reduce((s, b) => s + Number(b.totalAmount || 0), 0);
  res.json({
    success: true,
    stats: {
      totalRevenueGBP: sum('GBP'),
      totalRevenueINR: sum('INR'),
      totalStudents: new Set(active.map((b) => b.email)).size,
      totalBookings: active.length
    }
  });
}));

router.post('/ai/advisor', (req, res) => {
  const q = String(req.body?.message || '').toLowerCase();
  let reply =
    'ReTRRAC specialises in AML/KYC reviews, Firm-wide Risk Assessments (FWRA/PWRA), CLM RegTech and CPD-accredited training. Ask me about MLR 2017, CDD vs EDD, or our CAFS™ certification.';
  if (/(price|fee|cost|paypal|pay)/.test(q)) {
    reply =
      'CAFS™ tuition is £1,250 (₹1,25,000). Blackthrone™ is £850, CLM RegTech £650, FWRA Masterclass £550 and Crypto AML £750. UK and international candidates pay with PayPal or any debit/credit card; candidates in India pay in rupees with Cashfree (UPI, cards or net banking).';
  } else if (/(contact|phone|office|email)/.test(q)) {
    reply = 'London HQ: 60 Cannon Street, London EC4N 6NP · +44 7552 237 997 · info@retrrac.org';
  } else if (/(team|leader|director|staff)/.test(q)) {
    reply = 'Our leadership is headed by CEO & Founder Renjith Kalappurackal (Ren). Meet the full team on our Team page.';
  }
  res.json({ success: true, reply });
});

export default router;