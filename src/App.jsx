import { useEffect } from 'react'
import { initSmoothScroll, ScrollTrigger } from './lib/smoothScroll'
import { Nav } from './components/Nav'
import { Hero } from './sections/Hero'
import { Packages } from './sections/offer/Packages'
import { Services } from './sections/offer/Services'
import { Process } from './sections/Process'
import { About } from './sections/About'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

/**
 * The whole site, one page, kept short on purpose (2026-11-10: it had grown
 * to ~23 screens and read as bloated).
 *
 * Order: the promise (Hero), the three packages, the services they are made
 * from, how buying works (Process), who we are, the objections, the ask.
 * The island fly-through, the problem section and the per-service package
 * configurators were cut; git history has them.
 */
export default function App() {
  useEffect(() => {
    const destroy = initSmoothScroll()

    // Fonts and lazily-swapped images change layout heights after first paint,
    // which would otherwise leave every pin measured against stale positions.
    const refresh = () => ScrollTrigger.refresh()
    if (document.fonts?.ready) document.fonts.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      destroy()
    }
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Packages />
        <Services />
        {/* Process sits in the dark rounded chamber set into the cream page.
            The wrapper carries its own teal fill so any subpixel seam between
            sections shows teal, not the cream body behind. */}
        <div className="mx-2 overflow-clip rounded-[40px] bg-teal-deep sm:mx-4 sm:rounded-[64px]">
          <Process />
        </div>
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
