import { useEffect } from 'react'
import { initSmoothScroll, ScrollTrigger } from './lib/smoothScroll'
import { Nav } from './components/Nav'
import { SceneCounter } from './components/SceneCounter'
import { HeroBundle } from './sections/HeroBundle'
import { Problem } from './sections/Problem'
import { Showcase } from './sections/Showcase'
import { People } from './sections/People'
import { Testimonials } from './sections/Testimonials'
import { Pricing } from './sections/Pricing'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'

export default function App() {
  useEffect(() => {
    const destroy = initSmoothScroll()

    // Fonts and lazily-swapped placeholder images change layout heights after
    // first paint, which would otherwise leave every pin measured against
    // stale positions.
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
        <HeroBundle />
        <Problem />
        <Showcase />
        <People />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
