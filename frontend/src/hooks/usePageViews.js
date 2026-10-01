'use client';

import { useEffect, useState } from 'react';

// Global view counter with zero backend to manage.
// The browser calls our own same-origin /api/meta route (never blocked
// by shields/adblockers); that route forwards to the free Abacus
// counting API server-side (https://abacus.jasoncameron.dev).
//   increment -> GET /api/meta?fresh=1  (forwards to Abacus /hit)
//   read-only -> GET /api/meta          (forwards to Abacus /get)
// Counters auto-create on first hit and return `{ views: <n> }`.
// (CounterAPI v1 — the old keyless `.../v1/ns/name/up` URL — was retired
// Aug 2026, and its v2 needs a pre-registered workspace, so Abacus is
// the true no-signup option now.)
const SESSION_KEY = 'portfolio-view-counted';

// Module-level single-flight: shared across React StrictMode's
// mount → unmount → remount in dev, so only ONE request ever fires.
// (A per-effect AbortController + didRun-ref guard was the old approach:
// StrictMode cleanup aborted the first fetch and the guard blocked the
// retry, leaving the skeleton stuck forever.)
let inflight = null;

function alreadyCounted() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}

function markCounted() {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // private mode — counting still succeeded server-side
  }
}

function extractCount(data) {
  if (data == null) return null;
  if (typeof data.views === 'number') return data.views;
  if (typeof data.value === 'number') return data.value;
  return null;
}

function fetchViews() {
  if (!inflight) {
    const url = alreadyCounted() ? '/api/meta' : '/api/meta?fresh=1';
    inflight = (async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`counter HTTP ${res.status}`);
        const value = extractCount(await res.json());
        if (value == null) throw new Error('unexpected counter response');
        markCounted();
        return value;
      } finally {
        clearTimeout(timeoutId);
      }
    })();
    // Allow a later mount to retry after failure.
    inflight.then(null, () => {
      inflight = null;
    });
  }
  return inflight;
}

/**
 * Global portfolio view counter (no own backend).
 * - First visit per session hits `/hit` (increments once).
 * - Repeat renders / refreshes in same session hit `/get` (read-only).
 * - Never leaves the skeleton stuck: every path resolves loading.
 * - Never throws: on failure returns { count: null, error } and the
 *   UI hides itself.
 */
export function usePageViews() {
  const [count, setCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    fetchViews().then(
      (value) => {
        if (!mounted) return;
        setCount(value);
        setError(null);
        setIsLoading(false);
      },
      (err) => {
        if (!mounted) return;
        if (process.env.NODE_ENV !== 'production') {
          console.warn('[page-views] counter request failed:', err);
        }
        setError(err?.message || 'counter failed');
        setIsLoading(false);
      }
    );
    return () => {
      mounted = false;
    };
  }, []);

  return { count, isLoading, error };
}
