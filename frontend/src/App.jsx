import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'
import TreeTimeline from './components/TreeTimeline'
import Projects from './components/Projects'

import Footer from './components/Footer'



function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.documentElement.classList.add('dark')
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toLowerCase();

      const sectionMap = {
        'p': 'projects',
        'h': 'hero',
        'e': 'experience',
      };

      if (!e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
        if (e.key === "r") {
          window.open('https://drive.google.com/file/d/1SdLAOyati9rMjoxcMe5JeqyKrDvkju7q/view', '_blank');
        }
        if (sectionMap[key]) {
          const element = document.getElementById(sectionMap[key]);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }

      }
      if (e.shiftKey) {
        if (e.code === 'Digit1') window.open('https://github.com/n1dhruv', '_blank');
        if (e.code === 'Digit2') window.open('https://www.linkedin.com/in/dhruvsharmaa14/', '_blank');
        if (e.code === 'Digit3') window.open('https://x.com/nocapdhruv', '_blank');
        if (e.code === 'Digit4') window.open('https://peerlist.io/dhruvsharma', '_blank');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [])

  return (
    <>
      <div className="min-h-screen relative pt-12 md:pt-20">
        <div className="container mx-auto px-4">
          <Hero onOpenResume={() => setShowResume(true)} />
          <TreeTimeline />
          <Projects />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
