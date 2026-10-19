import { useEffect } from 'react'
import { initSmoothScroll, ScrollTrigger } from './lib/smoothScroll'
import { Nav } from './components/Nav'
import { SceneCounter } from './components/SceneCounter'
import { Hero } from './sections/Hero'
import { Problem } from './sections/Problem'
import { Flight } from './sections/Flight'
import { ServicesOverview } from './sections/offer/ServicesOverview'
import { WebsitePackages } from './sections/offer/WebsitePackages'
import { GoogleProfile } from './sections/offer/GoogleProfile'
import { AutomationPackages } from './sections/offer/AutomationPackages'
import { AddOns } from './sections/offer/AddOns'
import { Process } from './sections/Process'
import { About } from './sections/About'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

/**
 * The whole site, one page.
 *
 * Order is deliberate: the gap a small business has (Problem), the island tour
 * that frames the three services, the offer itself (services, then each
 * package and the add-ons), how buying works (Process), who we are, the
 * objections, and finally the ask.
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
        <Flight />
        <ServicesOverview />
        <WebsitePackages />
        <GoogleProfile />
        <AutomationPackages />
        <AddOns />
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
