import { useEffect } from 'react'
import { initSmoothScroll, ScrollTrigger } from './lib/smoothScroll'
import { Nav } from './components/Nav'
import { SceneCounter } from './components/SceneCounter'
import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { Flight } from './sections/Flight'
import { Services } from './sections/Services'
import { Automate } from './sections/Automate'
import { Improves } from './sections/Improves'
import { Process } from './sections/Process'
import { Pricing } from './sections/Pricing'
import { NotFor } from './sections/NotFor'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

/**
 * The international page (/) — workflow automation, USD, no local offering.
 *
 * Order is deliberate: the run log shows work executing before any claim is
 * made about it, the pain lands next, and only then do the three lines of work
 * appear. Pricing sits after the process so a reader meets the number knowing
 * what the four weeks contain.
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
      <SceneCounter />
      <main>
        <Hero />
        <Problem />
        {/* The island tour, re-cut: three lines of work, then the process. */}
        <Flight />
        <Services />
        <Automate />
        <Improves />
        {/* Process and Pricing are both dark — fused into one rounded chamber
            set into the cream page. The wrapper carries its own teal fill so
            any subpixel seam between the two sections shows teal, not the
            cream body behind — that was the "cut" hairline. */}
        <div className="mx-2 overflow-clip rounded-[40px] bg-teal-deep sm:mx-4 sm:rounded-[64px]">
          <Process />
          <Pricing />
        </div>
        <NotFor />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
