import { useEffect } from 'react'
import { initSmoothScroll, ScrollTrigger } from './lib/smoothScroll'
import { Nav } from './components/Nav'
import { SceneCounter } from './components/SceneCounter'
import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { Flight } from './sections/Flight'
import { StatStrip } from './components/StatStrip'
import { Services } from './sections/Services'
import { Automate } from './sections/Automate'
import { Process } from './sections/Process'
import { Pricing } from './sections/Pricing'
import { Team } from './sections/Team'
import { About } from './sections/About'
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
        <StatStrip />
        <Services />
        <Automate />
        {/* Process and Pricing are both dark — fused into one rounded chamber
            so they read as a single velvet room set into the cream page. */}
        <div className="mx-2 overflow-clip rounded-[40px] sm:mx-4 sm:rounded-[64px]">
          <Process />
          <Pricing />
        </div>
        <Team />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
