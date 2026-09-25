'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Detect touch-only / coarse pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true)
      return
    }

    const onPointerMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)

      const target = e.target
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer') ||
          (target instanceof Element && window.getComputedStyle(target).cursor === 'pointer'))
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    const onPointerDown = () => setIsClicked(true)
    const onPointerUp = () => setIsClicked(false)
    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [isVisible])

  if (isTouchDevice || !isVisible) return null

  return (
    <>
      {/* Outer Following Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] rounded-full border border-lilac/70"
        animate={{
          x: mousePosition.x - (isHovered ? 24 : 16),
          y: mousePosition.y - (isHovered ? 24 : 16),
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          backgroundColor: isHovered ? 'rgb(var(--lilac) / 0.12)' : 'rgb(var(--lilac) / 0.03)',
          borderColor: isHovered ? 'rgb(var(--lilac) / 0.9)' : 'rgb(var(--lilac) / 0.5)',
          scale: isClicked ? 0.8 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 450,
          damping: 30,
          mass: 0.4,
        }}
      />

      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full bg-lilac"
        animate={{
          x: mousePosition.x - (isHovered ? 4 : 3),
          y: mousePosition.y - (isHovered ? 4 : 3),
          width: isHovered ? 8 : 6,
          height: isHovered ? 8 : 6,
          scale: isClicked ? 1.6 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 850,
          damping: 35,
        }}
      />
    </>
  )
}
