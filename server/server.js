// Local development server:  npm run server
// On Vercel this file is not used – api/index.js serves the same app.
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
dotenv.config({ path: fileURLToPath(new URL('./.env', import.meta.url)) }); // server/.env
dotenv.config(); // project-root .env

const { default: app } = await import('./app.js');
const { isPayPalConfigured, paypalBaseUrl } = await import('./paypal/client.js');
const { isCashfreeConfigured, cashfreeMode } = await import('./cashfree/client.js');
const { storageKind } = await import('./store/db.js');

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`\n  ReTRRAC API running on http://localhost:${PORT}`);
  console.log(`  Storage: ${storageKind}`);
  console.log(`  PayPal: ${isPayPalConfigured() ? `configured (${paypalBaseUrl()})` : '⚠ NOT configured'}`);
  console.log(`  Cashfree: ${isCashfreeConfigured() ? `configured (${cashfreeMode()})` : '⚠ NOT configured – add CASHFREE_APP_ID / CASHFREE_SECRET_KEY'}`);
  console.log(`  Admin: ${process.env.ADMIN_PASSCODE ? 'enabled' : '⚠ disabled – set ADMIN_PASSCODE'}\n`);
});