import { useEffect } from 'react'
import { initSmoothScroll, ScrollTrigger } from './lib/smoothScroll'
import { Nav } from './components/Nav'
import { SceneCounter } from './components/SceneCounter'
import { Flight } from './sections/Flight'
import { Problem } from './sections/Problem'
import { Showcase } from './sections/Showcase'
import { Testimonials } from './sections/Testimonials'
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
        <Problem />
        <Showcase />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
