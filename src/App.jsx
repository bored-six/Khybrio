import { useEffect } from 'react'
import { initSmoothScroll, ScrollTrigger } from './lib/smoothScroll'
import { Nav } from './components/Nav'
import { SceneCounter } from './components/SceneCounter'
import { Flight } from './sections/Flight'
import { MascotIntro } from './sections/MascotIntro'
import { StatStrip } from './components/StatStrip'
import { Problem } from './sections/Problem'
import { Services } from './sections/Services'
import { NfcTapDemo } from './sections/NfcTapDemo'
import { Showcase } from './sections/Showcase'
import { Team } from './sections/Team'
import { About } from './sections/About'
import { Testimonials } from './sections/Testimonials'
import { Faq } from './sections/Faq'
import { Pricing } from './sections/Pricing'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

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
        {/* The whole island tour — hero, bundle and crew — as one scrubbed flight. */}
        <Flight />
        <MascotIntro />
        <StatStrip />
        <Problem />
        <Services />
        <NfcTapDemo />
        <Showcase />
        <Team />
        <About />
        <Testimonials />
        <Faq />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
