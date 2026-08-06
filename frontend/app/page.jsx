import Footer from '../src/components/Footer'
import Hero from '../src/components/Hero'
import KeyboardNavigation from '../src/components/KeyboardNavigation'
import Projects from '../src/components/Projects'
import TreeTimeline from '../src/components/TreeTimeline'

export const dynamic = 'force-static'

export default function Home() {
  return (
    <>
      <KeyboardNavigation />
      <main className="min-h-screen relative pt-12 md:pt-20">
        <div className="container mx-auto px-4">
          <Hero />
          <TreeTimeline />
          <Projects />
        </div>
      </main>
      <Footer />
    </>
  )
}
