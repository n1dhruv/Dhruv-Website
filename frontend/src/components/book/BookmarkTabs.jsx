'use client'

import { motion } from 'framer-motion'

const ACCENT = '#ff4d00'

export default function BookmarkTabs({ chapters, activePageIndex, scrollToPage, isMobile }) {

  // ── Mobile: slim bottom bar ──────────────────────────────────────────────────
  if (isMobile) {
    return (
      <nav
        aria-label="Book chapters"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          display: 'flex', zIndex: 200,
          background: 'rgba(22,14,6,0.97)',
          borderTop: `1px solid ${ACCENT}40`,
          backdropFilter: 'blur(8px)',
        }}
      >
        {chapters.map((ch, i) => {
          const next  = chapters[i + 1]
          const isAct = activePageIndex >= ch.pageIndex && (!next || activePageIndex < next.pageIndex)
          return (
            <button
              key={ch.pageIndex}
              onClick={() => scrollToPage(ch.pageIndex)}
              aria-current={isAct ? 'page' : undefined}
              style={{
                flex: 1, padding: '10px 4px 12px',
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-jetbrains-mono)', fontSize: 8.5,
                textTransform: 'uppercase', letterSpacing: '0.08em',
                color: isAct ? ACCENT : 'rgba(232,213,183,0.4)',
                borderTop: isAct ? `2px solid ${ACCENT}` : '2px solid transparent',
                transition: 'color 0.25s, border-color 0.25s',
              }}
            >
              {ch.label}
            </button>
          )
        })}
      </nav>
    )
  }

  // ── Desktop: right-edge tabs ─────────────────────────────────────────────────
  return (
    <nav
      aria-label="Book chapters"
      style={{
        position: 'fixed', right: 0, top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: 3,
        zIndex: 200,
      }}
    >
      {chapters.map((ch, i) => {
        const next  = chapters[i + 1]
        const isAct = activePageIndex >= ch.pageIndex && (!next || activePageIndex < next.pageIndex)
        return (
          <motion.button
            key={ch.pageIndex}
            onClick={() => scrollToPage(ch.pageIndex)}
            aria-current={isAct ? 'page' : undefined}
            initial={false}
            animate={{ x: isAct ? 0 : 8 }}
            whileHover={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div style={{
              background: isAct ? ACCENT : 'rgba(22,14,6,0.82)',
              color: isAct ? '#fff' : 'rgba(232,213,183,0.75)',
              fontFamily: 'var(--font-jetbrains-mono)',
              fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '7px 16px 7px 14px',
              borderRadius: '6px 0 0 6px',
              borderTop:    '1px solid rgba(255,255,255,0.1)',
              borderLeft:   '1px solid rgba(255,255,255,0.1)',
              borderBottom: '1px solid rgba(0,0,0,0.25)',
              boxShadow: isAct
                ? `-3px 2px 10px rgba(255,77,0,0.4)`
                : `-1px 1px 5px rgba(0,0,0,0.3)`,
              transition: 'background 0.2s, color 0.2s, box-shadow 0.2s',
              whiteSpace: 'nowrap',
            }}>
              {ch.label}
            </div>
          </motion.button>
        )
      })}
    </nav>
  )
}
