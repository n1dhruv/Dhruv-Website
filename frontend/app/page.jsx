import Footer from '../src/components/Footer'
import Hero from '../src/components/Hero'
import SocialLinks from '../src/components/SocialLinks'
import KeyboardNavigation from '../src/components/KeyboardNavigation'
import Projects from '../src/components/Projects'
import TreeTimeline from '../src/components/TreeTimeline'

export const dynamic = 'force-static'

export default function Home() {
  return (
    <>
      <KeyboardNavigation />
      <main className="min-h-screen relative pt-0 pb-20">
        <div className="container mx-auto px-4 flex flex-col gap-8 md:gap-12">
          <div className="flex flex-col gap-4">
            <SocialLinks />
            <Hero />
          </div>
          <TreeTimeline />
          <Projects />
        </div>
      </main>
      <Footer />
    </>
  )
}
