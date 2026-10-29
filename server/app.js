// The Express app – shared by local dev (server/server.js) and Vercel (api/index.js).
import express from 'express';
import cors from 'cors';
import paypalRoutes from './routes/paypal.js';
import cashfreeRoutes from './routes/cashfree.js';
import bookingRoutes from './routes/bookings.js';
import miscRoutes from './routes/misc.js';

const app = express();
app.set('trust proxy', 1);

const allowed = (process.env.CLIENT_ORIGIN || 'http://localhost:3000,http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(cors({ origin(origin, cb) { cb(null, !origin || allowed.includes(origin)); } }));

// rawBody is kept so the Cashfree webhook signature can be checked against the exact bytes sent.
app.use(
  express.json({
    limit: '200kb',
    verify: (req, _res, buf) => {
      req.rawBody = buf.toString('utf8');
    }
  })
);

app.use('/api/paypal', paypalRoutes);
app.use('/api/cashfree', cashfreeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api', miscRoutes);

app.use('/api', (req, res) => res.status(404).json({ success: false, error: 'Not found' }));
app.use((err, req, res, _next) => {
  console.error('[server]', err.message);
  res.status(500).json({ success: false, error: 'Server error. Please try again.' });
});

export default app;