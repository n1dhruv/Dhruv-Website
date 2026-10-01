import { NextResponse } from 'next/server';

// Same-origin proxy for the portfolio view counter.
// Why: browsers with shields/adblockers (e.g. Brave) block direct
// third-party calls to counting APIs, so the client calls /api/views
// (same origin, never blocked) and the server forwards to Abacus.
const NAMESPACE = process.env.NEXT_PUBLIC_COUNTER_WORKSPACE || 'dhruv-portfolio';
const KEY = process.env.NEXT_PUBLIC_COUNTER_NAME || 'homepage-views';
const BASE = 'https://abacus.jasoncameron.dev';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function extractCount(data) {
  if (data == null) return null;
  if (typeof data === 'number') return data;
  if (typeof data.value === 'number') return data.value;
  if (typeof data.data === 'number') return data.data;
  if (typeof data.count === 'number') return data.count;
  return null;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const increment = searchParams.get('fresh') === '1';
  const action = increment ? 'hit' : 'get';
  const url = `${BASE}/${action}/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(KEY)}`;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      return NextResponse.json({ error: `counter HTTP ${res.status}` }, { status: 502 });
    }
    const data = await res.json();
    const value = extractCount(data);
    if (value == null) {
      return NextResponse.json({ error: 'unexpected counter response' }, { status: 502 });
    }
    return NextResponse.json(
      { views: value },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    return NextResponse.json({ error: err?.message || 'counter failed' }, { status: 502 });
  }
}
