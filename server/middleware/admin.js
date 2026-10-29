import crypto from 'node:crypto';

// Admin access is checked on the SERVER against ADMIN_PASSCODE.
// The browser sends the passcode in the "x-admin-key" header.
export function isValidAdminKey(provided) {
  const expected = process.env.ADMIN_PASSCODE || '';
  if (!expected || typeof provided !== 'string' || !provided) return false;
  const a = crypto.createHash('sha256').update(provided).digest();
  const b = crypto.createHash('sha256').update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

export function requireAdmin(req, res, next) {
  if (!process.env.ADMIN_PASSCODE) {
    return res.status(503).json({ success: false, error: 'Admin access is disabled. Set ADMIN_PASSCODE on the server.' });
  }
  if (!isValidAdminKey(req.get('x-admin-key'))) {
    return res.status(401).json({ success: false, error: 'Admin authorisation required.' });
  }
  next();
}