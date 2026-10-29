// Single place for the backend URL.
// • On Vercel the API is on the same domain (/api/...) – leave VITE_API_BASE_URL unset.
// • In local dev it defaults to http://localhost:5000.
const configured = import.meta.env.VITE_API_BASE_URL;
const fallback = import.meta.env.DEV ? 'http://localhost:5000' : '';
const safe = import.meta.env.PROD && configured && /localhost|127\.0\.0\.1/.test(configured) ? '' : configured;
export const API_BASE = (safe ?? fallback).replace(/\/$/, '');

const ADMIN_KEY_STORAGE = 'retrrac_admin_key';

export function getAdminKey() {
  try { return localStorage.getItem(ADMIN_KEY_STORAGE) || ''; } catch { return ''; }
}

export function setAdminKey(value) {
  try {
    if (value) localStorage.setItem(ADMIN_KEY_STORAGE, value);
    else localStorage.removeItem(ADMIN_KEY_STORAGE);
  } catch { /* storage unavailable */ }
}

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export async function api(path, { method = 'GET', body, headers } = {}) {
  const adminKey = getAdminKey();
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(adminKey ? { 'x-admin-key': adminKey } : {}),
        ...headers
      },
      body: body ? JSON.stringify(body) : undefined
    });
  } catch {
    throw new ApiError('Cannot reach the ReTRRAC server. Please check your connection and try again.', 0, null);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.success === false) {
    if (res.status === 401 && adminKey) window.dispatchEvent(new Event('retrrac:admin-unauthorized'));
    throw new ApiError(data.error || `Request failed (${res.status})`, res.status, data);
  }
  return data;
}