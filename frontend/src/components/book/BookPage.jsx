'use client'

import { motion, useTransform, useReducedMotion } from 'framer-motion'

const PAPER_FRONT = '#f5e6c8'
const PAPER_BACK  = '#ede0c4'

function PageNum({ num, side }) {
  return (
    <div style={{
      position: 'absolute', bottom: 14, [side]: 18, zIndex: 10,
      fontFamily: 'var(--font-playfair)', fontSize: 11,
      color: 'rgba(26,16,8,0.4)', fontStyle: 'italic', pointerEvents: 'none',
      userSelect: 'none',
    }}>
      {num}
    </div>
  )
}

const SPINE_SHADOW_FRONT = {
  position: 'absolute', top: 0, left: 0, width: 30, height: '100%',
  background: 'linear-gradient(to right, rgba(0,0,0,0.20), transparent)',
  pointerEvents: 'none', zIndex: 5,
}

const SPINE_SHADOW_BACK = {
  position: 'absolute', top: 0, right: 0, width: 30, height: '100%',
  background: 'linear-gradient(to left, rgba(0,0,0,0.20), transparent)',
  pointerEvents: 'none', zIndex: 5,
}

export default function BookPage({
  scrollYProgress,
  index,
  totalPages,
  front,
  back,
  pageNum,
  isMobile,
}) {
  const prefersReducedMotion = useReducedMotion()

  const pps       = 1 / totalPages
  const pageStart = index * pps
  const pageEnd   = (index + 1) * pps
  const innerStart = pageStart + pps * 0.05
  const innerEnd   = pageEnd   - pps * 0.05

  // ── 3D desktop rotation ──
  const rotateY = useTransform(scrollYProgress, [innerStart, innerEnd], [0, -180], { clamp: true })

  // ── 2D mobile squash ──
  const scaleX = useTransform(
    scrollYProgress,
    [innerStart, (pageStart + pageEnd) / 2, innerEnd],
    [1, 0.04, 1],
    { clamp: true },
  )

  // ── Reduced-motion fade ──
  const opacity = useTransform(
    scrollYProgress,
    [pageEnd - pps * 0.2, pageEnd],
    [1, 0],
    { clamp: true },
  )

  // ── Z-index: un-flipped pages stack on the right (high z), flipped pages
  //    stack on the left (low z), currently-flipping page is on top ──
  const zIndex = useTransform(scrollYProgress, (v) => {
    if (v < pageStart) return (totalPages - index) + 10  // right pile
    if (v >= pageEnd)  return index + 1                  // left pile
    return totalPages + 100                               // flipping now
  })

  const base = {
    position: 'absolute', top: 0, height: '100%', zIndex,
  }

  // ─── Reduced-motion path ─────────────────────────────────────────────────
  if (prefersReducedMotion) {
    return (
      <motion.div style={{ ...base, left: '50%', width: '50%', opacity, background: PAPER_FRONT, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>{front}</div>
        {pageNum && <PageNum num={pageNum} side="right" />}
      </motion.div>
    )
  }

  // ─── Mobile 2D path ──────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <motion.div
        style={{
          ...base, left: 0, width: '100%', scaleX,
          transformOrigin: 'center center',
          background: PAPER_FRONT, overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>{front}</div>
        {pageNum && <PageNum num={pageNum} side="right" />}
      </motion.div>
    )
  }

  // ─── Desktop 3D path ─────────────────────────────────────────────────────
  return (
    <motion.div
      style={{
        ...base,
        left: '50%',     // starts at the spine
        width: '50%',
        transformOrigin: 'left center',    // rotates around spine
        transformStyle: 'preserve-3d',    // CRITICAL — enables 3D children
        rotateY,
        // Static shadow  (filter would break preserve-3d in many browsers)
        boxShadow: '-4px 2px 24px rgba(0,0,0,0.35), 2px 4px 14px rgba(0,0,0,0.18)',
      }}
    >
      {/* ── Front face ── */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          background: PAPER_FRONT,
          overflow: 'hidden',
        }}
      >
        <div style={SPINE_SHADOW_FRONT} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>{front}</div>
        {pageNum && <PageNum num={pageNum} side="right" />}
      </div>

      {/* ── Back face — visible when page has turned past 90° ── */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',   // CRITICAL — pre-rotated so it faces left after flip
          background: PAPER_BACK,
          overflow: 'hidden',
        }}
      >
        <div style={SPINE_SHADOW_BACK} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>{back}</div>
      </div>
    </motion.div>
  )
}
