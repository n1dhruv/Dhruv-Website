import Hero from '../src/components/Hero'
import KeyboardNavigation from '../src/components/KeyboardNavigation'
import Projects from '../src/components/Projects'
import TreeTimeline from '../src/components/TreeTimeline'
import GithubActivity from '../src/components/GithubActivity'
import TableOfContents from '../src/components/TableOfContents'
import Skills from '../src/components/Skills'
import Quote from '../src/components/Quote'

export const dynamic = 'force-static'

export default function Home() {
  return (
    <>
      <KeyboardNavigation />
      <TableOfContents />
      <main className="min-h-screen relative pt-0 pb-10">
        <div className="site-container flex flex-col gap-8 md:gap-12">
          <Hero />
          <TreeTimeline />
          <Projects />
          <GithubActivity />
          <Skills />
        </div>
        
        {/* Quote section sits outside the tightly packed container to have its own massive spacing */}
        <Quote />
      </main>
    </>
  )
}
