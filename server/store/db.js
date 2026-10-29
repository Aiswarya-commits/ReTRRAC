// Booking database.
// • On Vercel (UPSTASH_REDIS_REST_URL / KV_REST_API_URL set) → Upstash Redis.
// • Locally without Redis → JSON file (server/store/db.json).
// Every function is async – always `await` them.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SEED_BOOKINGS } from './seed.js';

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const useRedis = Boolean(REDIS_URL && REDIS_TOKEN);

let redis = null;
let redisReady = null;
function connect() {
  if (!useRedis) return Promise.resolve(null);
  redisReady ||= import('@upstash/redis').then(({ Redis }) => {
    redis = new Redis({ url: REDIS_URL, token: REDIS_TOKEN });
    return redis;
  });
  return redisReady;
}

export const storageKind = useRedis ? 'redis' : process.env.VERCEL ? 'memory (NOT persistent)' : 'file';
export const isPersistent = storageKind !== 'memory (NOT persistent)';

const PENDING_TTL = 3 * 24 * 3600;
const WEBHOOK_TTL = 30 * 24 * 3600;
const key = (id) => String(id || '').trim().toUpperCase();
const newestFirst = (a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || ''));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, 'db.json');
let local = null;

function loadLocal() {
  if (local) return local;
  local = { bookings: [...SEED_BOOKINGS], pendingOrders: {}, webhookEvents: [] };
  if (storageKind === 'file') {
    try {
      if (fs.existsSync(DB_FILE)) local = { ...local, ...JSON.parse(fs.readFileSync(DB_FILE, 'utf8')) };
    } catch (e) {
      console.error('[db] Could not read db.json, starting fresh:', e.message);
    }
  }
  return local;
}

function saveLocal() {
  if (storageKind !== 'file') return;
  const tmp = `${DB_FILE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(local, null, 2));
  fs.renameSync(tmp, DB_FILE);
}

export const db = {
  async allBookings() {
    await connect();
    if (redis) {
      const all = (await redis.hvals('bookings')) || [];
      return all.filter(Boolean).sort(newestFirst);
    }
    return [...loadLocal().bookings].sort(newestFirst);
  },

  async findBooking(bookingId) {
    await connect();
    const id = key(bookingId);
    if (!id) return null;
    if (redis) return (await redis.hget('bookings', id)) || null;
    return loadLocal().bookings.find((b) => key(b.bookingId) === id) || null;
  },

  async findBookingByPayPalOrder(orderId) {
    await connect();
    if (redis) {
      const id = await redis.get(`idx:order:${orderId}`);
      return id ? this.findBooking(id) : null;
    }
    return loadLocal().bookings.find((b) => b.paypalOrderId === orderId) || null;
  },

  async findBookingByCapture(captureId) {
    await connect();
    if (redis) {
      const id = await redis.get(`idx:capture:${captureId}`);
      return id ? this.findBooking(id) : null;
    }
    return loadLocal().bookings.find((b) => b.paypalCaptureId === captureId) || null;
  },

  async findBookingByCashfreeOrder(orderId) {
    await connect();
    if (redis) {
      const id = await redis.get(`idx:cforder:${orderId}`);
      return id ? this.findBooking(id) : null;
    }
    return loadLocal().bookings.find((b) => b.cashfreeOrderId === orderId) || null;
  },

  async bookingsByEmail(email) {
    await connect();
    const e = String(email || '').trim().toLowerCase();
    if (!e) return [];
    return (await this.allBookings()).filter((b) => String(b.email).toLowerCase() === e);
  },

  async insertBooking(booking) {
    await connect();
    const id = key(booking.bookingId);
    if (redis) {
      await redis.hset('bookings', { [id]: booking });
      if (booking.paypalOrderId) await redis.set(`idx:order:${booking.paypalOrderId}`, id);
      if (booking.paypalCaptureId) await redis.set(`idx:capture:${booking.paypalCaptureId}`, id);
      if (booking.cashfreeOrderId) await redis.set(`idx:cforder:${booking.cashfreeOrderId}`, id);
      return booking;
    }
    loadLocal().bookings.unshift(booking);
    saveLocal();
    return booking;
  },

  async updateBooking(bookingId, updater) {
    await connect();
    const current = await this.findBooking(bookingId);
    if (!current) return null;
    const next = updater(structuredClone(current));
    if (redis) {
      await redis.hset('bookings', { [key(current.bookingId)]: next });
      return next;
    }
    const list = loadLocal().bookings;
    list[list.findIndex((b) => key(b.bookingId) === key(current.bookingId))] = next;
    saveLocal();
    return next;
  },

  async savePendingOrder(orderId, data) {
    await connect();
    const value = { ...data, createdAt: new Date().toISOString() };
    if (redis) {
      await redis.set(`pending:${orderId}`, value, { ex: PENDING_TTL });
      return;
    }
    const s = loadLocal();
    s.pendingOrders[orderId] = value;
    const cutoff = Date.now() - PENDING_TTL * 1000;
    for (const [k, v] of Object.entries(s.pendingOrders)) {
      if (new Date(v.createdAt).getTime() < cutoff) delete s.pendingOrders[k];
    }
    saveLocal();
  },

  async getPendingOrder(orderId) {
    await connect();
    if (redis) return (await redis.get(`pending:${orderId}`)) || null;
    return loadLocal().pendingOrders[orderId] || null;
  },

  async deletePendingOrder(orderId) {
    await connect();
    if (redis) {
      await redis.del(`pending:${orderId}`);
      return;
    }
    delete loadLocal().pendingOrders[orderId];
    saveLocal();
  },

  async acquireLock(name, seconds = 60) {
    await connect();
    if (redis) return (await redis.set(`lock:${name}`, '1', { nx: true, ex: seconds })) === 'OK';
    const s = loadLocal();
    s.locks = s.locks || {};
    if (s.locks[name] && s.locks[name] > Date.now()) return false;
    s.locks[name] = Date.now() + seconds * 1000;
    return true;
  },

  async releaseLock(name) {
    await connect();
    if (redis) {
      await redis.del(`lock:${name}`);
      return;
    }
    if (loadLocal().locks) delete local.locks[name];
  },

  async seenWebhook(eventId) {
    await connect();
    if (redis) return Boolean(await redis.get(`webhook:${eventId}`));
    return loadLocal().webhookEvents.includes(eventId);
  },

  async markWebhook(eventId) {
    await connect();
    if (redis) {
      await redis.set(`webhook:${eventId}`, '1', { ex: WEBHOOK_TTL });
      return;
    }
    const s = loadLocal();
    s.webhookEvents.push(eventId);
    if (s.webhookEvents.length > 500) s.webhookEvents = s.webhookEvents.slice(-500);
    saveLocal();
  }
};