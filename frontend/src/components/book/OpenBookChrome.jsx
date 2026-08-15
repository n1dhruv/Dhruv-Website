// Fixed open-book chrome: two-page spread, central spine, paper textures.
// Rendered behind the animated BookPage elements.

const PAPER_LEFT  = '#ede0c4'  // slightly darker — back side of turned pages
const PAPER_RIGHT = '#f5e6c8'  // main page color
const SPINE_COLOR = '#1a0c05'

const RULED = {
  backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(0,0,0,0.055) 27px, rgba(0,0,0,0.055) 28px)',
  backgroundSize: '100% 28px',
}

export default function OpenBookChrome({ currentPage, totalPages }) {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', borderRadius: 2, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 10px 30px rgba(0,0,0,0.4)' }}>

      {/* ── Left page area (already-turned pages resting here) ── */}
      <div style={{
        width: '50%', height: '100%', background: PAPER_LEFT, position: 'relative', overflow: 'hidden',
        boxShadow: 'inset -10px 0 20px rgba(0,0,0,0.08)',
      }}>
        {/* Ruled lines */}
        <div style={{ position: 'absolute', inset: '48px 32px 40px', ...RULED }} />
        {/* Running footer */}
        <div style={{
          position: 'absolute', bottom: 14, left: 20,
          fontFamily: 'var(--font-playfair)', fontSize: 11,
          color: 'rgba(26,16,8,0.28)', fontStyle: 'italic', userSelect: 'none',
        }}>
          imdhruv.tech
        </div>
        {/* Pages-pile thickness illusion: thin bands on right edge */}
        <div style={{
          position: 'absolute', top: 4, right: 0, bottom: 4, width: 6,
          background: 'repeating-linear-gradient(180deg, #f0e0c0 0px, #e0d0b0 2px, #f0e0c0 4px)',
        }} />
      </div>

      {/* ── Central spine ── */}
      <div style={{
        width: 14, height: '100%', flexShrink: 0, zIndex: 5,
        background: `linear-gradient(to right, #0d0603 0%, ${SPINE_COLOR} 35%, #2a1208 65%, #0d0603 100%)`,
        boxShadow: '3px 0 10px rgba(0,0,0,0.5), -3px 0 10px rgba(0,0,0,0.5)',
      }} />

      {/* ── Right page area (current page resting / about to be flipped) ── */}
      <div style={{
        flex: 1, height: '100%', background: PAPER_RIGHT, position: 'relative', overflow: 'hidden',
        boxShadow: 'inset 8px 0 16px rgba(0,0,0,0.05)',
      }}>
        {/* Ruled lines */}
        <div style={{ position: 'absolute', inset: '48px 32px 40px', ...RULED }} />
        {/* Pages-pile thickness illusion: thin bands on left edge */}
        <div style={{
          position: 'absolute', top: 4, left: 0, bottom: 4, width: 4,
          background: 'repeating-linear-gradient(180deg, #f8f0e0 0px, #e8d8c0 2px, #f8f0e0 4px)',
        }} />
      </div>
    </div>
  )
}
