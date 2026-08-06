'use client'

import { useEffect } from 'react'

const links = {
  r: 'https://drive.google.com/file/d/1SdLAOyati9rMjoxcMe5JeqyKrDvkju7q/view',
  Digit1: 'https://github.com/n1dhruv',
  Digit2: 'https://www.linkedin.com/in/dhruvsharmaa14/',
  Digit3: 'https://x.com/nocapdhruv',
  Digit4: 'https://peerlist.io/dhruvsharma',
}

export default function KeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return

      const section = { p: 'projects', h: 'hero', e: 'experience' }[event.key.toLowerCase()]

      if (!event.ctrlKey && !event.altKey && !event.metaKey && !event.shiftKey) {
        if (event.key.toLowerCase() === 'r') window.open(links.r, '_blank', 'noopener,noreferrer')
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
      } else if (event.shiftKey && links[event.code]) {
        window.open(links[event.code], '_blank', 'noopener,noreferrer')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return null
}
