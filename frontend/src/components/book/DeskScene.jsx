'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

// ── Shared helper: absolute-positioned prop wrapper ───────────────────────────
function Prop({ x, y, children, title }) {
  return (
    <div
      title={title}
      style={{
        position: 'absolute', left: x, top: y,
        transform: 'translate(-50%, -50%)',
        zIndex: 15, userSelect: 'none',
      }}
    >
      {children}
    </div>
  )
}

// ── Coffee Mug ────────────────────────────────────────────────────────────────
function MugProp() {
  const [clicks, setClicks] = useState(0)
  const [steam, setSteam] = useState(false)
  const click = () => { setClicks(c => c + 1); setSteam(true); setTimeout(() => setSteam(false), 3200) }

  return (
    <Prop x="91%" y="18%" title="Coffee mug — click to refill">
      <motion.div onClick={click} whileHover={{ scale: 1.1, rotate: 5 }} style={{ cursor: 'pointer', position: 'relative' }}>
        {/* Steam wisps */}
        <AnimatePresence>
          {steam && [0,1,2].map(i => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 0, x: i * 7 - 7 }}
              animate={{ opacity: [0, 0.8, 0], y: -36, x: [i*7-7, i*10-10, i*7-7] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.4, delay: i * 0.25, ease: 'easeOut' }}
              style={{ position: 'absolute', bottom: '82%', left: `${28 + i * 14}%`,
                width: 3, height: 22, background: 'rgba(255,255,255,0.65)',
                borderRadius: 4, filter: 'blur(2px)', pointerEvents: 'none' }}
            />
          ))}
        </AnimatePresence>
        {clicks > 0 && (
          <div style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)',
            fontSize: 9, color: '#fff', background: 'rgba(0,0,0,0.65)',
            padding: '2px 7px', borderRadius: 3, whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
            ☕ ×{clicks}
          </div>
        )}
        <svg width="64" height="64" viewBox="-32 -32 64 64">
          <circle r="30" fill="#7a5130" />
          <circle r="24" fill="#5a3518" />
          <circle r="20" fill="#2a1005" />
          <ellipse cx="-7" cy="-7" rx="7" ry="4" fill="rgba(255,170,60,0.12)" />
          <path d="M30,-11 Q52,-11 52,0 Q52,11 30,11" stroke="#7a5130" strokeWidth="8" fill="none" strokeLinecap="round" />
        </svg>
      </motion.div>
    </Prop>
  )
}

// ── Eyeglasses ────────────────────────────────────────────────────────────────
function GlassesProp({ blurBook, setBlurBook }) {
  return (
    <Prop x="88%" y="82%" title="Glasses — toggle focus on book">
      <motion.div
        onClick={() => setBlurBook(b => !b)}
        whileHover={{ scale: 1.1 }}
        style={{ cursor: 'pointer', opacity: blurBook ? 1 : 0.8 }}
      >
        <svg width="76" height="40" viewBox="-38 -20 76 40">
          <circle cx="-18" cy="0" r="15"
            fill={blurBook ? 'rgba(120,190,255,0.35)' : 'rgba(180,220,255,0.18)'}
            stroke="#3a2a18" strokeWidth="2.8" />
          <circle cx="18" cy="0" r="15"
            fill={blurBook ? 'rgba(120,190,255,0.35)' : 'rgba(180,220,255,0.18)'}
            stroke="#3a2a18" strokeWidth="2.8" />
          <line x1="-3" y1="-1" x2="3" y2="-1" stroke="#3a2a18" strokeWidth="2.8" />
          <line x1="-33" y1="-5" x2="-48" y2="-13" stroke="#3a2a18" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="33"  y1="-5" x2="48"  y2="-13" stroke="#3a2a18" strokeWidth="2.2" strokeLinecap="round" />
          {blurBook && <text x="0" y="4" textAnchor="middle" fontSize="8" fill="rgba(30,80,160,0.6)">👁</text>}
        </svg>
      </motion.div>
    </Prop>
  )
}

// ── Mechanical Pencil ─────────────────────────────────────────────────────────
function PenProp() {
  return (
    <Prop x="5%" y="36%" title="Mechanical pencil">
      <motion.div whileHover={{ rotate: 6, scale: 1.05 }}>
        <svg width="18" height="96" viewBox="-9 -48 18 96">
          <rect x="-6" y="-42" width="12" height="68" rx="2" fill="#d4a830" />
          <rect x="-6" y="-42" width="12" height="6"  rx="2" fill="#c09820" />
          {[...Array(8)].map((_,i) => (
            <line key={i} x1="-5" y1={-36 + i*6} x2="5" y2={-36 + i*6} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
          ))}
          <rect x="-6"   y="22" width="12" height="12" rx="1" fill="#999" />
          <rect x="-6.5" y="18" width="13" height="5"  rx="1" fill="#bbb" />
          <rect x="-4"   y="-5" width="8"  height="2"  rx="1" fill="rgba(0,0,0,0.18)" />
          <polygon points="0,42 -5,30 5,30" fill="#888" />
          <line x1="0" y1="40" x2="0" y2="46" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
          <rect x="-4.5" y="-48" width="9" height="8" rx="2" fill="#f09090" />
        </svg>
      </motion.div>
    </Prop>
  )
}

// ── Succulent Plant ───────────────────────────────────────────────────────────
function PlantProp() {
  return (
    <Prop x="4.5%" y="76%" title="Succulent">
      <motion.div whileHover={{ scale: 1.08, rotate: -4 }}>
        <svg width="62" height="62" viewBox="-31 -31 62 62">
          <ellipse cx="0" cy="18" rx="18" ry="12" fill="#b85a30" />
          <ellipse cx="0" cy="12" rx="20" ry="8"  fill="#ce6a40" />
          <ellipse cx="0" cy="12" rx="16" ry="5"  fill="#3a1e08" />
          {[0,60,120,180,240,300].map((a,i) => (
            <ellipse key={i}
              cx={Math.cos(a*Math.PI/180)*14}
              cy={Math.sin(a*Math.PI/180)*14}
              rx="8" ry="5"
              fill={i%2===0 ? '#3e7038' : '#508a4a'}
              transform={`rotate(${a} ${Math.cos(a*Math.PI/180)*14} ${Math.sin(a*Math.PI/180)*14})`}
            />
          ))}
          <circle cx="0" cy="0" r="7" fill="#2e5a28" />
          <circle cx="0" cy="0" r="4" fill="#3e7038" />
        </svg>
      </motion.div>
    </Prop>
  )
}

// ── Phone ─────────────────────────────────────────────────────────────────────
function PhoneProp() {
  const [active, setActive] = useState(false)
  const [time, setTime] = useState('')
  useEffect(() => {
    if (!active) return
    const upd = () => setTime(new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}))
    upd()
    const id = setInterval(upd, 1000)
    return () => clearInterval(id)
  }, [active])

  return (
    <Prop x="93%" y="62%" title="Phone — click to see the time">
      <motion.div onClick={() => setActive(a => !a)} whileHover={{ scale: 1.08, rotate: -4 }} style={{ cursor: 'pointer' }}>
        <svg width="42" height="72" viewBox="-21 -36 42 72">
          <rect x="-19" y="-34" width="38" height="68" rx="6" fill={active ? '#16213e' : '#282828'} />
          <rect x="-15" y="-29" width="30" height="56" rx="3" fill={active ? '#0f3460' : '#111'} />
          <circle cx="0" cy="-27" r="3.5" fill={active ? '#1a4a80' : '#1e1e1e'} />
          {active ? (
            <>
              <rect x="-15" y="-29" width="30" height="56" rx="3" fill="#0a1628" />
              <text x="0" y="-10" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace" fontWeight="bold">{time}</text>
              <text x="0" y="0"   textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="4.5" fontFamily="monospace">
                {new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'})}
              </text>
              <text x="0" y="14" textAnchor="middle" fontSize="10">🔒</text>
            </>
          ) : null}
        </svg>
      </motion.div>
    </Prop>
  )
}

// ── Sticky Note ───────────────────────────────────────────────────────────────
function StickyNoteProp() {
  const [flipped, setFlipped] = useState(false)
  return (
    <Prop x="6%" y="57%" title="Sticky note — flip it over">
      <motion.div onClick={() => setFlipped(f => !f)} whileHover={{ scale: 1.1, rotate: flipped ? -3 : 3 }} style={{ cursor: 'pointer' }}>
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 140, damping: 16 }}
          style={{ transformStyle: 'preserve-3d', width: 58, height: 58 }}
        >
          {/* Front */}
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
            <svg width="58" height="58" viewBox="-29 -29 58 58">
              <rect x="-28" y="-28" width="56" height="56" fill="#f9e84a" />
              <rect x="-28" y="-28" width="56" height="9"  fill="rgba(0,0,0,0.07)" />
              {[...Array(5)].map((_,i) => (
                <line key={i} x1="-22" y1={-14+i*9} x2="22" y2={-14+i*9} stroke="rgba(0,0,0,0.1)" strokeWidth="0.8" />
              ))}
            </svg>
          </div>
          {/* Back */}
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
            <svg width="58" height="58" viewBox="-29 -29 58 58">
              <rect x="-28" y="-28" width="56" height="56" fill="#f5d820" />
              <text x="0" y="-9"  textAnchor="middle" fill="#3a2800" fontSize="5.5" fontFamily="Georgia, serif" fontStyle="italic">always</text>
              <text x="0" y="1"   textAnchor="middle" fill="#3a2800" fontSize="5.5" fontFamily="Georgia, serif" fontStyle="italic">learning</text>
              <text x="0" y="14"  textAnchor="middle" fontSize="10">✨</text>
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </Prop>
  )
}

// ── Second Notebook ───────────────────────────────────────────────────────────
function NotepadProp() {
  const [open, setOpen] = useState(false)
  const [fact, setFact] = useState('')
  useEffect(() => {
    const facts = [
      'Ranked 7th globally — Capsule Vision 2024',
      '1st Runner-up — HackJKLU v5.0',
      'Deployed across 5 AWS services',
      '8+ full-stack projects shipped',
    ]
    setFact(facts[Math.floor(Math.random() * facts.length)])
  }, [])

  return (
    <Prop x="88%" y="85%" title="Notebook — click to open">
      <motion.div onClick={() => setOpen(o => !o)} whileHover={{ scale: 1.08, rotate: open ? 0 : -4 }} style={{ cursor: 'pointer' }}>
        <svg width="68" height="52" viewBox="-34 -26 68 52">
          <rect x="-32" y="-24" width="60" height="48" rx="3" fill="#2c1810" />
          <rect x="24"  y="-22" width="6"  height="44" rx="1" fill="#ddd0b8" />
          <rect x="23"  y="-22" width="3"  height="44" rx="1" fill="#cdc0a8" />
          <rect x="-32" y="-24" width="7"  height="48" rx="3" fill="#1a0c05" />
          <rect x="-20" y="-16" width="36" height="9"  rx="1" fill="rgba(255,255,255,0.08)" />
          {open && (
            <>
              <rect x="-32" y="-24" width="60" height="48" rx="3" fill="#f5e6c8" />
              <text x="-2" y="-10" textAnchor="middle" fill="#1a0c05" fontSize="5" fontFamily="Georgia, serif" fontStyle="italic">{fact}</text>
            </>
          )}
        </svg>
      </motion.div>
    </Prop>
  )
}

// ── Desk Lamp ─────────────────────────────────────────────────────────────────
function LampProp({ on, onClick }) {
  return (
    <Prop x="3.5%" y="5.5%" title="Desk lamp — toggle light">
      <motion.div onClick={onClick} whileHover={{ scale: 1.1 }} style={{ cursor: 'pointer', position: 'relative' }}>
        {on && (
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              position: 'absolute', inset: -18,
              background: 'radial-gradient(circle, rgba(255,200,80,0.55) 0%, transparent 70%)',
              borderRadius: '50%', pointerEvents: 'none',
            }}
          />
        )}
        <svg width="64" height="64" viewBox="-32 -32 64 64">
          {/* Base */}
          <ellipse cx="-10" cy="26" rx="14" ry="5" fill="#3a3a3a" />
          <rect x="-12" y="16" width="4" height="12" rx="2" fill="#444" />
          {/* Arm */}
          <line x1="-10" y1="16" x2="8"  y2="-12" stroke="#555" strokeWidth="4.5" strokeLinecap="round" />
          {/* Head hinge */}
          <circle cx="8" cy="-12" r="5" fill="#555" />
          {/* Lamp head */}
          <ellipse cx="16" cy="-18" rx="20" ry="13" fill="#606060" transform="rotate(25 16 -18)" />
          <ellipse cx="16" cy="-18" rx="15" ry="9"  fill={on ? '#fff8c0' : '#282828'} transform="rotate(25 16 -18)" />
          {on && <ellipse cx="16" cy="-18" rx="8" ry="5" fill="rgba(255,255,200,0.8)" transform="rotate(25 16 -18)" />}
        </svg>
      </motion.div>
    </Prop>
  )
}

// ── Main DeskScene ────────────────────────────────────────────────────────────
export default function DeskScene({ lampOn, setLampOn, blurBook, setBlurBook, isMobile }) {

  // ── Mobile: simple static gradient ──────────────────────────────────────────
  if (isMobile) {
    return (
      <div style={{
        position: 'absolute', inset: 0,
        background: lampOn
          ? 'radial-gradient(ellipse at 50% 50%, rgba(255,200,100,0.2) 0%, #3d2810 60%, #1a0f05 100%)'
          : '#c8b89a',
        transition: 'background 1s ease',
      }} />
    )
  }

  // ── Desktop: full interactive desk ──────────────────────────────────────────
  return (
    <div
      style={{
        position: 'absolute', inset: 0,
        // Wood grain desk texture via CSS
        background: `
          repeating-linear-gradient(95deg, transparent, transparent 14px, rgba(0,0,0,0.014) 14px, rgba(0,0,0,0.014) 15px),
          repeating-linear-gradient(5deg,  transparent, transparent 28px, rgba(255,255,255,0.008) 28px, rgba(255,255,255,0.008) 30px),
          linear-gradient(155deg, #7a5530 0%, #6b4520 18%, #8a6035 38%, #7a5230 55%, #6b4520 72%, #8a6035 88%, #7a5230 100%)
        `,
        overflow: 'hidden',
      }}
    >
      {/* ── Lamp warm glow ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 65% 60% at 10% 10%, rgba(255,200,90,0.32) 0%, rgba(255,160,50,0.1) 40%, transparent 70%)',
          opacity: lampOn ? 1 : 0,
          transition: 'opacity 1s ease',
          pointerEvents: 'none',
        }}
      />

      {/* ── Vignette ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)',
        pointerEvents: 'none',
      }} />

      {/* ── Cooldown / daytime fill when lamp is off ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        background: 'rgba(200,185,160,0.25)',
        opacity: lampOn ? 0 : 1,
        transition: 'opacity 1s ease',
        pointerEvents: 'none',
      }} />

      {/* ── Book shadow on desk ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -48%)',
        width: 'min(82vw, 1140px)',
        height: 'calc(min(82vw, 1140px) * 2 / 3 + 24px)',
        borderRadius: 4,
        boxShadow: '0 24px 70px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.4)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* ── Interactive Props ── */}
      <MugProp />
      <GlassesProp blurBook={blurBook} setBlurBook={setBlurBook} />
      <PenProp />
      <PlantProp />
      <PhoneProp />
      <StickyNoteProp />
      <NotepadProp />
      <LampProp on={lampOn} onClick={() => setLampOn(v => !v)} />
    </div>
  )
}
