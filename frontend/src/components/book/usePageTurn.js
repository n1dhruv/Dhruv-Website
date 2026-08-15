'use client'

import { useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function usePageTurn(spacerRef, index, totalPages) {
  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ['start end', 'end start']
  })

  const prefersReducedMotion = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // RotateY is for desktop
  const rotateY = useTransform(scrollYProgress, [0.2, 0.8], [0, -180], { clamp: true })
  
  // Opacity is for reduced motion / mobile fallback
  const opacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0], { clamp: true })
  
  // ScaleX for mobile 2D flip squash
  const scaleX = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [1, 0, 1], { clamp: true })

  const zIndex = useTransform(scrollYProgress, (progress) => {
    if (progress < 0.5) {
      return totalPages - index + 10
    } else {
      return index + 10
    }
  })

  return { rotateY, opacity, scaleX, zIndex, prefersReducedMotion, isMobile }
}
