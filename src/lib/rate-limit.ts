/**
 * Simple in-memory rate limiter for serverless.
 * Tracks requests per IP using a sliding window.
 *
 * Note: In-memory state resets on cold starts, which is acceptable
 * for a low-traffic intake form. For high-traffic, use Redis.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

// Clean stale entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  const cutoff = now - WINDOW_MS;
  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff);
    if (entry.timestamps.length === 0) store.delete(key);
  }
}

export function isRateLimited(ip: string): boolean {
  cleanup();

  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const entry = store.get(ip) || { timestamps: [] };

  // Remove expired timestamps
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff);

  if (entry.timestamps.length >= MAX_REQUESTS) {
    return true;
  }

  entry.timestamps.push(now);
  store.set(ip, entry);
  return false;
}
