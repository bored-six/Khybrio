import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { Magnetic } from './Magnetic'
import { useContent } from '../content/context'
import { scrollToId, scrollToSceneProgress, ScrollTrigger } from '../lib/smoothScroll'
import { subscribeActiveIndex } from '../lib/sceneRegistry'

/**
 * Floating pill navigation — a bordered cream capsule with breathing room from
 * the page edges, in the broadsheet style the hero sets. Cream with ink text
 * stays readable over every surface on the page, including the dark flight,
 * so there is no scrolled "solid" state to manage any more.
 */
export function Nav() {
  const { nav } = useContent()
  const [open, setOpen] = useState(false)
  const [activeZone, setActiveZone] = useState(0)
  const [atFlight, setAtFlight] = useState(true)

  // Current flight zone drives which nav item lights up (reference-style).
  useEffect(() => subscribeActiveIndex(setActiveZone), [])

  useEffect(() => {
    // Lenis scrolls the real window, so scrollY stays authoritative.
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const st = ScrollTrigger.getById('flight')
        setAtFlight(st ? window.scrollY < st.end : true)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const isZoneActive = (item) =>
    item.zoneRange &&
    atFlight &&
    activeZone >= item.zoneRange[0] &&
    activeZone <= item.zoneRange[1]

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  // Nav item click — jump into the flight at a zone when `flightProgress` is set.
  const goItem = (item) => (e) => {
    e.preventDefault()
    setOpen(false)
    if (item.flightProgress != null) scrollToSceneProgress(item.id, item.flightProgress)
    else scrollToId(item.id)
  }

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full border-2 border-teal-deep bg-cream/95 py-2 pl-3 pr-2 backdrop-blur-md sm:pl-4">
        <a href="#hero" onClick={go('hero')} aria-label="Khybrio, back to top">
          <Logo tone="ink" markSize={28} />
        </a>

        <nav className="hidden items-center gap-6 md:flex lg:gap-7">
          {nav.map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={goItem(item)}
              className={`text-sm font-medium transition-colors ${
                isZoneActive(item) ? 'text-coral' : 'text-ink/70 hover:text-ink'
              }`}
            >
              {item.label}
            </a>
          ))}
          <Magnetic>
            <a
              href="#contact"
              onClick={go('contact')}
              className="inline-block rounded-full border-2 border-teal-deep bg-coral px-4 py-2 text-sm font-semibold text-cream transition-transform duration-300 hover:scale-[1.04]"
            >
              Get started
            </a>
          </Magnetic>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="p-1.5 text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <div className="mx-auto mt-2 max-w-5xl rounded-[24px] border-2 border-teal-deep bg-cream p-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.label}
                href={`#${item.id}`}
                onClick={goItem(item)}
                className="rounded-xl px-3 py-3 text-base font-medium text-ink/80 hover:bg-teal-soft/25 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={go('contact')}
              className="mt-2 rounded-full border-2 border-teal-deep bg-coral px-5 py-3 text-center text-base font-semibold text-cream"
            >
              Get started
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
