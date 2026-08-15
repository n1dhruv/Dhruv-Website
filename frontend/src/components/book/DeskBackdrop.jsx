'use client'
import { useState } from 'react'

export default function DeskBackdrop({ isMobile }) {
  const [lampOn, setLampOn] = useState(true)

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[-10] bg-[#1a1510] flex items-center justify-center">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,220,150,0.15)_0%,_transparent_70%)]" />
      </div>
    )
  }

  return (
    <div className={`fixed inset-0 z-[-10] transition-colors duration-1000 ${lampOn ? 'bg-[#1e1510]' : 'bg-[#e0d6c8]'}`}>
      {/* Wood texture background */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] mix-blend-overlay" />
      
      {/* Lamp glow effect */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${lampOn ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'radial-gradient(circle at 10% 10%, rgba(255, 210, 120, 0.25) 0%, rgba(0,0,0,0.8) 100%)'
        }}
      />
      
      {/* Flat lighting for when lamp is off */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${!lampOn ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4) 0%, rgba(0,0,0,0.1) 100%)'
        }}
      />

      {/* Interactive Props layer */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* The Lamp Toggle */}
        <button 
          onClick={() => setLampOn(!lampOn)}
          className="pointer-events-auto absolute top-8 left-8 w-24 h-24 rounded-full flex items-center justify-center group outline-none"
          title="Toggle Desk Lamp"
        >
          <div className="relative w-16 h-16 bg-zinc-800 rounded-full shadow-2xl border-2 border-zinc-700 transform group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className={`w-10 h-10 rounded-full transition-colors ${lampOn ? 'bg-yellow-100 shadow-[0_0_20px_rgba(255,255,0,0.5)]' : 'bg-zinc-600'}`} />
          </div>
        </button>

      </div>
    </div>
  )
}
