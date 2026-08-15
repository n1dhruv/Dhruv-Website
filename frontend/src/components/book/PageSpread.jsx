'use client'

import { motion } from 'framer-motion'
import { usePageTurn } from './usePageTurn'

export default function PageSpread({ children, backfaceContent, spacerRef, index, totalPages, isCover = false }) {
  const { rotateY, opacity, scaleX, zIndex, prefersReducedMotion, isMobile } = usePageTurn(spacerRef, index, totalPages)

  // Use simple fade for reduced motion, 2D squash for mobile, or 3D rotate for desktop
  const motionStyle = prefersReducedMotion ? {
    opacity,
    zIndex
  } : isMobile ? {
    scaleX,
    zIndex,
    transformOrigin: 'center'
  } : { 
    rotateY, 
    zIndex,
    transformOrigin: 'left center',
    transformStyle: 'preserve-3d',
  }

  return (
    <motion.div
      style={motionStyle}
      className={`absolute top-0 w-full md:w-1/2 h-full flex ${isCover ? '' : 'bg-[#f5ebd7]'} ${isMobile || prefersReducedMotion ? 'left-0 right-0 max-w-full rounded-md shadow-xl' : 'right-0'}`}
    >
      {/* Front Face */}
      <div 
        className="absolute inset-0 backface-hidden"
        style={{ backfaceVisibility: prefersReducedMotion || isMobile ? 'visible' : 'hidden', WebkitBackfaceVisibility: prefersReducedMotion || isMobile ? 'visible' : 'hidden' }}
      >
        {children}
      </div>
      
      {/* Back Face (Only for 3D desktop) */}
      {!prefersReducedMotion && !isMobile && (
        <div 
          className="absolute inset-0 backface-hidden [transform:rotateY(180deg)]"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {backfaceContent}
        </div>
      )}
    </motion.div>
  )
}
