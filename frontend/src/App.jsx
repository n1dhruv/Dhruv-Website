import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'
import TreeTimeline from './components/TreeTimeline'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import GithubSection from './components/GithubSection'
import Loader from './components/Loader'
import ResumeModal from './components/ResumeModal'
import resumePDF from './assets/Dhruv_Sharma_Resume.pdf'

function App() {
  const [loading, setLoading] = useState(true)
  const [showResume, setShowResume] = useState(false)

  useEffect(() => {
    // Force dark mode for retro theme compatibility
    document.documentElement.classList.add('dark')

    // Keyboard navigation
    const handleKeyDown = (e) => {
      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toLowerCase();

      // Section Navigation
      const sectionMap = {
        'p': 'projects',
        'c': 'contact',
        'g': 'opensource',
        'h': 'hero',
        'e': 'experience'
      };

      if (!e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
        if (sectionMap[key]) {
          const element = document.getElementById(sectionMap[key]);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }

        // External Links
        if (key === 'b') window.open('/', '_blank');
        // if (key === 's') window.open('https://volt.fm/user/f0uqsd4ky115yma4?time_frame=short', '_blank');

        // Resume Shortcut
        if (key === 'r') setShowResume(prev => !prev);
      }

      // Social Links Shortcuts (Shift + 1-5)
      if (e.shiftKey) {
        if (e.code === 'Digit1') window.open('https://github.com/dhruv14122004', '_blank');
        if (e.code === 'Digit2') window.open('https://www.linkedin.com/in/dhruvsharmaa14/', '_blank');
        if (e.code === 'Digit3') window.open('https://instagram.com/dhruv14122004', '_blank');
        if (e.code === 'Digit4') window.open('https://x.com/dhruvshxrmaa', '_blank');
        if (e.code === 'Digit5') window.open('https://peerlist.io/dhruvsharma', '_blank');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen relative pt-12 md:pt-20">
        <div className="container mx-auto px-4">
          <Hero onOpenResume={() => setShowResume(true)} />
          <TreeTimeline />
          <Projects />
          <GithubSection />
        </div>
        <Footer />

        <ResumeModal
          isOpen={showResume}
          onClose={() => setShowResume(false)}
          file={resumePDF}
          filename="Dhruv Sharma - Resume"
        />
      </div>
    </>
  )
}

export default App
