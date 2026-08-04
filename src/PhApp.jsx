import { useEffect } from 'react'
import { initSmoothScroll, ScrollTrigger } from './lib/smoothScroll'
import { Nav } from './components/Nav'
import { PhHero } from './sections/PhHero'
import { Problem } from './sections/Problem'
import { Services } from './sections/Services'
import { Reviews } from './sections/Reviews'
import { NfcTapDemo } from './sections/NfcTapDemo'
import { Process } from './sections/Process'
import { MascotIntro } from './sections/MascotIntro'
import { Pricing } from './sections/Pricing'
import { About } from './sections/About'
import { Faq } from './sections/Faq'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

/**
 * The local page (/ph) — Philippine market, pesos, Google Maps first.
 *
 * No scrubbed flight here: this page gets opened on a phone in a shop, often
 * on mobile data, straight after the Maps demo. It needs to load and answer
 * the question, not perform. The island tour stays on the main page.
 */
export default function PhApp() {
  useEffect(() => {
    const destroy = initSmoothScroll()
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
        <PhHero />
        <Problem />
        <Services />
        <Reviews />
        <NfcTapDemo />
        <Process />
        <MascotIntro />
        <Pricing />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
