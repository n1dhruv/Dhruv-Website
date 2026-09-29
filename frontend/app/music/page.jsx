import Link from 'next/link'
import KeyboardNavigation from '../../src/components/KeyboardNavigation'
import MusicStatus from '../../src/components/MusicStatus'
import Quote from '../../src/components/Quote'
import Footer from '../../src/components/Footer'

export const metadata = {
  title: 'Music — Dhruv Sharma',
  description: 'Live listening activity, top artists, and top tracks scrobbled on Last.fm by Dhruv Sharma.',
}

export const dynamic = 'force-static'

export default function MusicPage() {
  return (
    <>
      <KeyboardNavigation />
      <main className="min-h-screen relative pt-8 pb-0">
        <div className="site-container flex flex-col gap-8">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
            <Link
              href="/"
              className="btn-ghost text-xs font-mono inline-flex items-center gap-2 group transition-all hover:border-[var(--lilac)]"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
            </Link>
            <span className="font-mono text-xs text-mist uppercase tracking-widest">
              Audio // Last.fm
            </span>
          </div>

          <MusicStatus />
        </div>

        <Quote />
        <Footer />
      </main>
    </>
  )
}
