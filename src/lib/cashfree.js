// Loads Cashfree's checkout script (v3) once and opens the payment popup.
// No npm package needed – the script comes from Cashfree's own CDN.
const SDK_URL = 'https://sdk.cashfree.com/js/v3/cashfree.js';
let sdkPromise = null;

function loadSdk() {
  if (window.Cashfree) return Promise.resolve(window.Cashfree);
  if (!sdkPromise) {
    sdkPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SDK_URL;
      s.async = true;
      s.onload = () => (window.Cashfree ? resolve(window.Cashfree) : reject(new Error('Cashfree failed to load')));
      s.onerror = () => {
        sdkPromise = null;
        reject(new Error('Cashfree could not be loaded. Disable any ad-blocker for this site and try again.'));
      };
      document.head.appendChild(s);
    });
  }
  return sdkPromise;
}

/** Opens Cashfree checkout in a popup. Resolves with { error } | { redirect } | { paymentDetails }. */
export async function openCashfreeCheckout(paymentSessionId, mode) {
  const Cashfree = await loadSdk();
  const cashfree = Cashfree({ mode: mode === 'production' ? 'production' : 'sandbox' });
  return cashfree.checkout({ paymentSessionId, redirectTarget: '_modal' });
}