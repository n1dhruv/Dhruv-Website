'use client'

import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useEffect, useState, useCallback, useMemo } from 'react'
import DeskScene from './DeskScene'
import OpenBookChrome from './OpenBookChrome'
import BookmarkTabs from './BookmarkTabs'
import BookPage from './BookPage'
import { projects } from '../../data/projects'
import { experiences } from '../../data/experience'
import { person } from '../../data/site'

// ─────────────────────────────────────────────────────────────────────────────
// Design tokens
// ─────────────────────────────────────────────────────────────────────────────
const ACCENT = '#ff4d00'
const INK    = '#1a1008'

// ─────────────────────────────────────────────────────────────────────────────
// Shared primitive components (module-level = stable references, won't
// unmount/remount on Book re-renders, so any internal useState is preserved)
// ─────────────────────────────────────────────────────────────────────────────

function ChapterEyebrow({ children }) {
  return (
    <p style={{
      fontFamily: 'var(--font-jetbrains-mono)', fontSize: 9.5,
      letterSpacing: '0.35em', textTransform: 'uppercase', color: ACCENT,
      marginBottom: 8,
    }}>{children}</p>
  )
}

function PageHeading({ children, size = 24, mb = 20 }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-playfair)', fontSize: size, fontWeight: 700,
      color: INK, lineHeight: 1.2, marginBottom: mb,
      borderBottom: '1px solid rgba(26,16,8,0.14)', paddingBottom: 12,
    }}>{children}</h2>
  )
}

function Ruled() {
  return (
    <div style={{
      position: 'absolute', inset: '46px 28px 38px',
      backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(26,16,8,0.055) 27px, rgba(26,16,8,0.055) 28px)',
      pointerEvents: 'none', zIndex: 0,
    }} />
  )
}

function PageShell({ eyebrow, children }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Ruled />
      <div style={{ position: 'relative', zIndex: 1, padding: '28px 24px 44px', height: '100%', overflow: 'auto', boxSizing: 'border-box' }}>
        {eyebrow && <ChapterEyebrow>{eyebrow}</ChapterEyebrow>}
        {children}
      </div>
    </div>
  )
}

function PaperBack({ label = '' }) {
  return (
    <div style={{
      height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#ede0c4',
    }}>
      {label && (
        <p style={{
          fontFamily: 'var(--font-playfair)', fontSize: 10, fontStyle: 'italic',
          color: 'rgba(26,16,8,0.2)', transform: 'rotate(-90deg)',
          userSelect: 'none', whiteSpace: 'nowrap',
        }}>{label}</p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page content components
// ─────────────────────────────────────────────────────────────────────────────

function CoverContent() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(145deg, #1a0c05 0%, #2a1408 45%, #1e1005 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      color: '#e8d5b7',
    }}>
      {/* Double border */}
      <div style={{ position: 'absolute', inset: 14, border: '1px solid rgba(232,213,183,0.2)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 18, border: '1px solid rgba(232,213,183,0.08)', pointerEvents: 'none' }} />

      {/* Spine strip */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 10,
        background: 'linear-gradient(to right, #0a0401, #1a0c05)',
        borderRight: `1px solid ${ACCENT}22`,
      }} />

      {/* Content */}
      <div style={{ textAlign: 'center', padding: '0 44px 0 54px' }}>
        <p style={{
          fontFamily: 'var(--font-jetbrains-mono)', fontSize: 9, letterSpacing: '0.45em',
          textTransform: 'uppercase', color: ACCENT, marginBottom: 20,
        }}>Field Notes of a</p>

        <h1 style={{
          fontFamily: 'var(--font-playfair)', fontSize: 'clamp(30px, 4.5vw, 50px)',
          fontWeight: 700, lineHeight: 1.05, color: '#f0dfc4', marginBottom: 6,
        }}>DHRUV<br />SHARMA</h1>

        <div style={{ width: 56, height: 2, background: ACCENT, margin: '18px auto' }} />

        <p style={{
          fontFamily: 'var(--font-playfair)', fontSize: 12, fontStyle: 'italic',
          color: 'rgba(240,223,196,0.62)', lineHeight: 1.6, maxWidth: 200, margin: '0 auto',
        }}>
          Backend & AI Engineer
        </p>

        <p style={{
          fontFamily: 'var(--font-playfair)', fontSize: 10, fontStyle: 'italic',
          color: 'rgba(240,223,196,0.38)', lineHeight: 1.5, maxWidth: 220, margin: '12px auto 0',
        }}>
          Building scalable web platforms, intelligent systems, and reliable APIs.
        </p>
      </div>

      {/* Scroll cue */}
      <p style={{
        position: 'absolute', bottom: 26,
        fontFamily: 'var(--font-jetbrains-mono)', fontSize: 8.5, letterSpacing: '0.32em',
        textTransform: 'uppercase', color: 'rgba(240,223,196,0.35)',
        animation: 'pulseOpacity 2.5s ease-in-out infinite',
      }}>↓ scroll to open</p>

      <style>{`@keyframes pulseOpacity { 0%,100%{opacity:0.4} 50%{opacity:1} }`}</style>
    </div>
  )
}

function HalfTitleBack() {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 40, background: '#ede0c4',
    }}>
      <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 26, fontWeight: 700, color: INK, marginBottom: 6 }}>
        Dhruv Sharma
      </h2>
      <p style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10, color: 'rgba(26,16,8,0.45)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
        Backend & AI Engineer
      </p>
      <div style={{ width: 28, height: 1, background: ACCENT, marginBottom: 16 }} />
      <p style={{ fontFamily: 'var(--font-playfair)', fontSize: 11.5, fontStyle: 'italic', color: 'rgba(26,16,8,0.45)', textAlign: 'center', lineHeight: 1.65 }}>
        Building scalable web platforms,<br />intelligent systems, and reliable APIs.
      </p>
    </div>
  )
}

function TOCContent({ scrollToPage, tocEntries }) {
  return (
    <PageShell eyebrow="Index">
      <PageHeading>Table of Contents</PageHeading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {tocEntries.map(entry => (
          <button
            key={`${entry.label}-${entry.pageIndex}`}
            onClick={() => scrollToPage(entry.pageIndex)}
            style={{
              display: 'flex', alignItems: 'flex-end',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '5px 0', width: '100%', textAlign: 'left',
              borderBottom: '1px solid rgba(26,16,8,0.05)',
            }}
          >
            <span style={{
              fontFamily: 'var(--font-playfair)', fontSize: 12.5, color: INK,
              fontStyle: entry.italic ? 'italic' : 'normal',
              paddingLeft: entry.indent ? 16 : 0, lineHeight: 1.4,
            }}>{entry.label}</span>
            <span style={{ flex: 1, borderBottom: '1px dotted rgba(26,16,8,0.22)', marginBottom: 4, marginLeft: 8, marginRight: 8 }} />
            <span style={{ fontFamily: 'var(--font-playfair)', fontSize: 12, color: ACCENT, fontWeight: 700, flexShrink: 0 }}>
              {entry.pageNum}
            </span>
          </button>
        ))}
      </div>
    </PageShell>
  )
}

function AboutContent() {
  const links = [
    { href: person.email,                              label: 'Email — dhruv.sharma122004@gmail.com' },
    { href: 'https://github.com/n1dhruv',              label: 'GitHub — n1dhruv' },
    { href: 'https://www.linkedin.com/in/dhruvsharmaa14/', label: 'LinkedIn' },
    { href: 'https://x.com/nocapdhruv',               label: 'X / Twitter — @nocapdhruv' },
    { href: 'https://peerlist.io/dhruvsharma',        label: 'Peerlist — dhruvsharma' },
    { href: 'https://imdhruv.tech',                   label: 'View Résumé →', accent: true },
  ]
  return (
    <PageShell eyebrow="Preface">
      <PageHeading>About the Author</PageHeading>
      <p style={{ fontFamily: 'var(--font-playfair)', fontSize: 13, lineHeight: 1.78, color: INK, textAlign: 'justify', marginBottom: 14 }}>
        I am a Backend, AI and Open source developer. Love learning new things and building
        projects that solve real world problems.
      </p>
      <p style={{ fontFamily: 'var(--font-playfair)', fontSize: 13, lineHeight: 1.78, color: INK, textAlign: 'justify', marginBottom: 22 }}>
        Currently focused on building scalable web platforms, intelligent systems, and reliable APIs.
      </p>
      <div style={{ borderTop: '1px solid rgba(26,16,8,0.1)', paddingTop: 16 }}>
        <p style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 8.5, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(26,16,8,0.38)', marginBottom: 12 }}>
          Contact & Links
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {links.map(lnk => (
            <a key={lnk.href} href={lnk.href} target="_blank" rel="noreferrer"
              style={{
                fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10.5, color: lnk.accent ? ACCENT : INK,
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8,
                pointerEvents: 'auto',
              }}
            >
              <span style={{ display: 'inline-block', width: 18, height: 1, background: lnk.accent ? ACCENT : 'rgba(26,16,8,0.28)', flexShrink: 0 }} />
              {lnk.label}
            </a>
          ))}
        </div>
      </div>
    </PageShell>
  )
}

function ExperienceContent({ exp }) {
  return (
    <PageShell eyebrow="Chapter I — Experience">
      {/* Date + badge row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{
          fontFamily: 'var(--font-jetbrains-mono)', fontSize: 9.5, color: 'rgba(26,16,8,0.52)',
          border: '1px solid rgba(26,16,8,0.2)', padding: '3px 9px',
        }}>{exp.duration}</span>
        {exp.type && (
          <span style={{
            fontFamily: 'var(--font-jetbrains-mono)', fontSize: 8.5, letterSpacing: '0.15em',
            textTransform: 'uppercase', background: ACCENT, color: '#fff', padding: '3px 9px',
          }}>{exp.type}</span>
        )}
      </div>

      <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 20, fontWeight: 700, color: INK, lineHeight: 1.2, marginBottom: 4 }}>
        {exp.role}
      </h2>
      <p style={{ fontFamily: 'var(--font-playfair)', fontSize: 13, fontStyle: 'italic', color: ACCENT, marginBottom: 16 }}>
        {exp.company}
      </p>

      <p style={{ fontFamily: 'var(--font-playfair)', fontSize: 12.5, lineHeight: 1.72, color: INK, textAlign: 'justify', marginBottom: 20 }}>
        {exp.description}
      </p>

      <div style={{ borderTop: '1px solid rgba(26,16,8,0.1)', paddingTop: 12 }}>
        <p style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 8.5, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(26,16,8,0.38)', marginBottom: 10 }}>
          Stack_Trace:
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {exp.tech.map(t => (
            <span key={t} style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10, color: INK, border: '1px solid rgba(26,16,8,0.22)', padding: '2px 8px', background: 'rgba(26,16,8,0.03)' }}>{t}</span>
          ))}
        </div>
      </div>
    </PageShell>
  )
}

function ProjectsIndexContent({ scrollToPage, projPageStart }) {
  const [search, setSearch] = useState('')
  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  )
  return (
    <PageShell eyebrow="Chapter II — Projects">
      <PageHeading>Projects</PageHeading>

      {/* Search */}
      <input
        type="text" value={search} onChange={e => setSearch(e.target.value)}
        placeholder="find a project in this chapter…"
        style={{
          width: '100%', padding: '7px 11px', boxSizing: 'border-box',
          fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10.5,
          background: 'rgba(26,16,8,0.04)', border: '1px solid rgba(26,16,8,0.18)',
          color: INK, outline: 'none', marginBottom: 16,
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {filtered.map(proj => {
          const i = projects.findIndex(p => p.id === proj.id)
          return (
            <button
              key={proj.id}
              onClick={() => scrollToPage(projPageStart + i)}
              style={{
                display: 'flex', alignItems: 'flex-end',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '5px 0', width: '100%', textAlign: 'left',
                borderBottom: '1px solid rgba(26,16,8,0.05)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-playfair)', fontSize: 12, color: INK }}>{proj.title}</span>
              <span style={{ flex: 1, borderBottom: '1px dotted rgba(26,16,8,0.2)', marginBottom: 3, marginLeft: 6, marginRight: 6 }} />
              <span style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 9.5, color: ACCENT }}>{String(i + 1).padStart(2, '0')}</span>
            </button>
          )
        })}
      </div>
    </PageShell>
  )
}

function ProjectFront({ proj }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <Ruled />
      <div style={{ position: 'relative', zIndex: 1, padding: '18px 18px 44px', height: '100%', overflow: 'auto', boxSizing: 'border-box' }}>
        {/* ID badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{
            fontFamily: 'var(--font-jetbrains-mono)', fontSize: 8.5,
            color: ACCENT, border: `1px solid ${ACCENT}`, padding: '2px 8px',
            letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            ID: {proj.id.toUpperCase()} · {proj.year}
          </span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 18, fontWeight: 700, color: INK, lineHeight: 1.2, marginBottom: 10 }}>
          {proj.title}
        </h2>

        {/* Polaroid-style image */}
        <div style={{
          background: '#fff', padding: '5px 5px 18px',
          boxShadow: '0 3px 10px rgba(0,0,0,0.18)',
          transform: 'rotate(-0.6deg)', marginBottom: 10, display: 'inline-block', width: '100%', boxSizing: 'border-box',
        }}>
          <img
            src={proj.image.src} alt={proj.imageAlt} loading="lazy"
            style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block' }}
          />
          <p style={{ fontFamily: 'var(--font-playfair)', fontSize: 8, color: 'rgba(26,16,8,0.5)', fontStyle: 'italic', textAlign: 'center', marginTop: 4, lineHeight: 1.3 }}>
            {proj.imageAlt}
          </p>
        </div>

        <p style={{ fontFamily: 'var(--font-playfair)', fontSize: 11.5, lineHeight: 1.62, color: INK, textAlign: 'justify', marginBottom: proj.achievement ? 8 : 10 }}>
          {proj.description}
        </p>

        {proj.achievement && (
          <div style={{ borderLeft: `3px solid ${ACCENT}`, padding: '5px 9px', background: `${ACCENT}08`, marginBottom: 10 }}>
            <p style={{ fontFamily: 'var(--font-playfair)', fontSize: 10.5, fontStyle: 'italic', color: INK, lineHeight: 1.5 }}>
              {proj.achievement}
            </p>
          </div>
        )}

        {/* Features (first 3 shown here, rest on back) */}
        {proj.features && proj.features.length > 0 && (
          <div style={{ marginBottom: 10 }}>
            <p style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(26,16,8,0.38)', marginBottom: 6 }}>
              Key Features
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 3 }}>
              {proj.features.slice(0, 3).map((f, fi) => (
                <li key={fi} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                  <span style={{ color: ACCENT, flexShrink: 0, fontSize: 11, lineHeight: 1.4 }}>›</span>
                  <span style={{ fontFamily: 'var(--font-playfair)', fontSize: 10.5, color: INK, lineHeight: 1.45 }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        <div style={{ marginBottom: 10 }}>
          <p style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(26,16,8,0.38)', marginBottom: 6 }}>
            Stack_Trace:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {proj.tags.map(t => (
              <span key={t} style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 8.5, color: INK, border: '1px solid rgba(26,16,8,0.2)', padding: '1px 6px', background: 'rgba(26,16,8,0.03)' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 14 }}>
          {proj.github && (
            <a href={proj.github} target="_blank" rel="noreferrer"
              style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 9.5, color: INK, textDecoration: 'none', borderBottom: '1px solid rgba(26,16,8,0.3)', paddingBottom: 2, pointerEvents: 'auto' }}>
              ↗ Source Code
            </a>
          )}
          {proj.demo && proj.demo !== '#' && (
            <a href={proj.demo} target="_blank" rel="noreferrer"
              style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 9.5, color: ACCENT, textDecoration: 'none', borderBottom: `1px solid ${ACCENT}`, paddingBottom: 2, pointerEvents: 'auto' }}>
              ↗ Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

function ProjectBack({ proj }) {
  const remaining = proj.features ? proj.features.slice(3) : []
  return (
    <div style={{ height: '100%', padding: '28px 22px 40px', boxSizing: 'border-box', overflow: 'auto' }}>
      {remaining.length > 0 ? (
        <>
          <p style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 8.5, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(26,16,8,0.38)', marginBottom: 12 }}>
            {proj.title} — continued
          </p>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {remaining.map((f, fi) => (
              <li key={fi} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ color: ACCENT, flexShrink: 0, fontSize: 12 }}>›</span>
                <span style={{ fontFamily: 'var(--font-playfair)', fontSize: 12, color: INK, lineHeight: 1.55 }}>{f}</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <PaperBack label={proj.title} />
      )}
    </div>
  )
}

function ContactContent() {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 32px', textAlign: 'center', position: 'relative', boxSizing: 'border-box',
    }}>
      <Ruled />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 9, letterSpacing: '0.38em', textTransform: 'uppercase', color: ACCENT, marginBottom: 14 }}>Fin</p>
        <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: 28, fontWeight: 700, color: INK, marginBottom: 10 }}>
          Let's Work Together
        </h2>
        <div style={{ width: 36, height: 1, background: ACCENT, margin: '0 auto 20px' }} />
        <p style={{ fontFamily: 'var(--font-playfair)', fontSize: 13, color: INK, lineHeight: 1.65, marginBottom: 28, maxWidth: 280 }}>
          I'm currently looking for new opportunities. Whether you have a question or just want
          to say hi, I'll try my best to get back to you.
        </p>
        <a href={person.email} style={{
          fontFamily: 'var(--font-jetbrains-mono)', fontSize: 11, color: '#fff',
          background: ACCENT, padding: '11px 28px', textDecoration: 'none',
          letterSpacing: '0.12em', textTransform: 'uppercase', pointerEvents: 'auto',
          display: 'inline-block', marginBottom: 28,
        }}>Say Hello</a>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, alignItems: 'center' }}>
          {person.sameAs.map(link => {
            const u = new URL(link)
            const label = `${u.hostname.replace('www.','')}${u.pathname}`
            return (
              <a key={link} href={link} target="_blank" rel="noreferrer"
                style={{ fontFamily: 'var(--font-jetbrains-mono)', fontSize: 10, color: 'rgba(26,16,8,0.55)', textDecoration: 'none', pointerEvents: 'auto' }}>
                {label}
              </a>
            )
          })}
        </div>
      </div>
      <p style={{
        position: 'absolute', bottom: 22,
        fontFamily: 'var(--font-playfair)', fontSize: 10, fontStyle: 'italic', color: 'rgba(26,16,8,0.3)',
      }}>
        © 2026 Dhruv Sharma
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Book component
// ─────────────────────────────────────────────────────────────────────────────

const VH_PER_PAGE = 200  // scroll travel per page

export default function Book() {
  const { scrollYProgress } = useScroll()
  const [isMobile, setIsMobile]   = useState(false)
  const [lampOn,   setLampOn]     = useState(true)
  const [blurBook, setBlurBook]   = useState(false)
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // ── Page index arithmetic ────────────────────────────────────────────────
  const EXP_START          = 2                           // 0=cover, 1=toc, 2=about, 3=exp[0]…
  const PROJ_IDX_PAGE      = EXP_START + experiences.length  // projects chapter index page
  const PROJ_START         = PROJ_IDX_PAGE + 1           // individual project pages
  const CONTACT_PAGE       = PROJ_START + projects.length
  const TOTAL_PAGES        = CONTACT_PAGE + 1

  // ── Scroll-to-page helper ────────────────────────────────────────────────
  const scrollToPage = useCallback((pageIdx) => {
    const docH = document.documentElement.scrollHeight - window.innerHeight
    // Go to 10% into the page's window so the page is fully visible
    window.scrollTo({ top: ((pageIdx + 0.1) / TOTAL_PAGES) * docH, behavior: 'smooth' })
  }, [TOTAL_PAGES])

  // ── Track current page for bookmark highlight ────────────────────────────
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setCurrentPage(Math.min(Math.floor(v * TOTAL_PAGES), TOTAL_PAGES - 1))
  })

  // ── TOC entries ──────────────────────────────────────────────────────────
  const tocEntries = useMemo(() => [
    { label: 'Preface / About the Author',               pageIndex: 2,          pageNum: '1', italic: true },
    { label: 'Chapter I — Experience',                   pageIndex: EXP_START,  pageNum: '2' },
    { label: '  Aerilon Tech — Backend Developer',       pageIndex: EXP_START,  pageNum: '2', indent: true },
    { label: '  Dynamicore — AI/Backend Developer',      pageIndex: EXP_START + 1, pageNum: '3', indent: true },
    { label: 'Chapter II — Projects',                    pageIndex: PROJ_IDX_PAGE, pageNum: String(3 + experiences.length) },
    ...projects.map((p, i) => ({
      label: `  ${p.title}`,
      pageIndex: PROJ_START + i,
      pageNum: String(4 + experiences.length + i),
      indent: true,
    })),
    { label: 'Colophon & Contact',                       pageIndex: CONTACT_PAGE, pageNum: String(4 + experiences.length + projects.length) },
  ], [EXP_START, PROJ_IDX_PAGE, PROJ_START, CONTACT_PAGE])

  // ── Bookmark tabs ────────────────────────────────────────────────────────
  const bookmarkChapters = useMemo(() => [
    { label: 'Cover',      pageIndex: 0 },
    { label: 'About',      pageIndex: 2 },
    { label: 'Experience', pageIndex: EXP_START },
    { label: 'Projects',   pageIndex: PROJ_IDX_PAGE },
    { label: 'Contact',    pageIndex: CONTACT_PAGE },
  ], [EXP_START, PROJ_IDX_PAGE, CONTACT_PAGE])

  // ── Page definitions ─────────────────────────────────────────────────────
  // Using useMemo with stable deps so page content components aren't recreated
  // on every render (important for components with internal state like search input)
  const pages = useMemo(() => [
    // 0 — Cover
    {
      id: 'cover', pageNum: null,
      front: <CoverContent />,
      back:  <HalfTitleBack />,
    },
    // 1 — Table of Contents
    {
      id: 'toc', pageNum: 'i',
      front: <TOCContent scrollToPage={scrollToPage} tocEntries={tocEntries} />,
      back:  <PaperBack />,
    },
    // 2 — About
    {
      id: 'about', pageNum: '1',
      front: <AboutContent />,
      back:  <PaperBack label="About the Author" />,
    },
    // 3,4,… — Experience pages
    ...experiences.map((exp, i) => ({
      id: `exp-${i}`, pageNum: String(2 + i),
      front: <ExperienceContent exp={exp} />,
      back:  <PaperBack label={exp.company} />,
    })),
    // Projects chapter index
    {
      id: 'projects-index', pageNum: String(2 + experiences.length),
      front: <ProjectsIndexContent scrollToPage={scrollToPage} projPageStart={PROJ_START} />,
      back:  <PaperBack label="Projects" />,
    },
    // Individual project pages
    ...projects.map((proj, i) => ({
      id: `proj-${proj.id}`, pageNum: String(3 + experiences.length + i),
      front: <ProjectFront proj={proj} />,
      back:  <ProjectBack  proj={proj} />,
    })),
    // Contact / colophon
    {
      id: 'contact', pageNum: String(3 + experiences.length + projects.length),
      front: <ContactContent />,
      back:  <PaperBack label="© 2026 Dhruv Sharma" />,
    },
  ], [scrollToPage, tocEntries, PROJ_START])

  // ── Scroll container height ──────────────────────────────────────────────
  const scrollHeightVh = TOTAL_PAGES * VH_PER_PAGE

  // ── Book sizing ──────────────────────────────────────────────────────────
  const bookW = isMobile ? '92vw' : 'min(78vw, 1100px)'
  const bookAspect = isMobile ? '2/3' : '3/2'

  return (
    <>
      {/* Scroll driver — gives document its scroll height */}
      <div aria-hidden="true" style={{ height: `${scrollHeightVh}vh` }} />

      {/* Fixed visual layer */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>

        {/* Desk backdrop */}
        <DeskScene
          lampOn={lampOn} setLampOn={setLampOn}
          blurBook={blurBook} setBlurBook={setBlurBook}
          isMobile={isMobile}
        />

        {/* Centered book */}
        <div
          id="book-container"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: bookW,
            aspectRatio: bookAspect,
            transition: 'filter 0.4s ease',
            filter: blurBook ? 'blur(4px) saturate(0.6)' : 'none',
          }}
        >
          {/* Static open-book chrome (spine, paper, ruled lines) */}
          <OpenBookChrome currentPage={currentPage} totalPages={TOTAL_PAGES} />

          {/* ── PERSPECTIVE CONTAINER ──────────────────────────────────────────
              CRITICAL RULES:
              1. perspective must be on the PARENT of the rotating element
              2. NO overflow:hidden (clips the page during rotation)
              3. NO opacity < 1  (creates stacking context, breaks preserve-3d)
              4. NO CSS filter   (same reason)
          ─────────────────────────────────────────────────────────────────── */}
          <div
            style={{
              position: 'absolute', inset: 0,
              perspective: '1800px',
              perspectiveOrigin: '50% 50%',
              // overflow: 'hidden'  ← DO NOT ADD
            }}
          >
            {pages.map((page, i) => (
              <BookPage
                key={page.id}
                scrollYProgress={scrollYProgress}
                index={i}
                totalPages={TOTAL_PAGES}
                front={page.front}
                back={page.back}
                pageNum={page.pageNum}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        {/* Bookmark / chapter navigation */}
        <BookmarkTabs
          chapters={bookmarkChapters}
          activePageIndex={currentPage}
          scrollToPage={scrollToPage}
          isMobile={isMobile}
        />
      </div>
    </>
  )
}
