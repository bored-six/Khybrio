import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { Magnetic } from './Magnetic'
import { useContent } from '../content/context'
import { scrollToId, scrollToSceneProgress, ScrollTrigger } from '../lib/smoothScroll'
import { subscribeActiveIndex } from '../lib/sceneRegistry'

/**
 * Floating pill navigation — a bordered cream capsule with breathing room from
 * the page edges, in the broadsheet style the hero sets. Cream with ink text
 * stays readable over every surface on the page, including the dark flight, so
 * there is no scrolled "solid" state to manage.
 *
 * It does three jobs beyond linking, because five abstract labels floating in a
 * capsule told a visitor neither where they were nor what was behind any of it:
 *
 *   — A marker slides between items and sizes itself to each one, tracking the
 *     section actually on screen. Standard scrollspy behaviour: measure the old
 *     and new positions, then animate the delta.
 *   — Hovering an item drops a shelf under the dock with that destination's
 *     one-line description, and the shelf slides sideways between items rather
 *     than reappearing, so it reads as one object being moved.
 *   — A hairline across the bottom of the capsule tracks reading progress, on
 *     the straight part of the pill so the rounded ends never clip it.
 *
 * The marker follows the pointer while hovering and snaps back to the current
 * section on leave, so exploring the nav never costs you your place.
 */
export function Nav() {
  const { nav } = useContent()
  const [open, setOpen] = useState(false)
  const [activeZone, setActiveZone] = useState(0)
  const [atFlight, setAtFlight] = useState(true)
  const [activeIdx, setActiveIdx] = useState(-1)
  const [hoverIdx, setHoverIdx] = useState(-1)
  const [progress, setProgress] = useState(0)
  const [marker, setMarker] = useState({ x: 0, w: 0, show: false })

  const navRef = useRef(null)
  const itemRefs = useRef([])
  // The scroll handler runs on every frame's worth of scrolling and must not
  // close over stale zone state, so these mirror it.
  const zoneRef = useRef(0)
  const flightRef = useRef(true)

  useEffect(() => subscribeActiveIndex(setActiveZone), [])
  useEffect(() => {
    zoneRef.current = activeZone
  }, [activeZone])
  useEffect(() => {
    flightRef.current = atFlight
  }, [atFlight])

  useEffect(() => {
    // Lenis scrolls the real window, so scrollY stays authoritative.
    let frame = 0
    const read = () => {
      frame = 0
      const st = ScrollTrigger.getById('flight')
      const inFlight = st ? window.scrollY < st.end : true
      setAtFlight(inFlight)
      flightRef.current = inFlight

      const scrollable = document.body.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0)

      // Whichever section owns the upper third of the viewport is the one being
      // read. Flight entries resolve by zone instead — the flight is a single
      // pinned element covering two nav items.
      const line = window.innerHeight * 0.38
      let found = -1
      nav.forEach((item, i) => {
        if (item.zoneRange) {
          if (
            inFlight &&
            zoneRef.current >= item.zoneRange[0] &&
            zoneRef.current <= item.zoneRange[1]
          ) {
            found = i
          }
          return
        }
        const el = document.getElementById(item.id)
        if (!el) return
        const r = el.getBoundingClientRect()
        if (r.top <= line && r.bottom > line) found = i
      })
      setActiveIdx(found)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [nav])

  // Marker geometry. Re-measured on resize and after fonts land, since a font
  // swap changes every label's width underneath it.
  const shownIdx = hoverIdx >= 0 ? hoverIdx : activeIdx
  useLayoutEffect(() => {
    const place = () => {
      const el = itemRefs.current[shownIdx]
      if (!el) return setMarker((m) => ({ ...m, show: false }))
      setMarker({ x: el.offsetLeft, w: el.offsetWidth, show: true })
    }
    place()
    window.addEventListener('resize', place)
    document.fonts?.ready.then(place)
    return () => window.removeEventListener('resize', place)
  }, [shownIdx, nav])

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

  const hinted = hoverIdx >= 0 ? nav[hoverIdx] : null

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5">
      <div className="relative mx-auto max-w-5xl">
        <div className="relative flex items-center justify-between gap-4 rounded-full border-2 border-teal-deep bg-cream/95 py-2 pl-3 pr-2 shadow-[0_10px_30px_rgba(15,43,41,0.10)] backdrop-blur-md sm:pl-4">
          <a href="#hero" onClick={go('hero')} aria-label="Khybrio, back to top">
            <Logo tone="ink" markSize={28} />
          </a>

          <nav
            ref={navRef}
            onMouseLeave={() => setHoverIdx(-1)}
            className="relative hidden items-center md:flex"
          >
            {/* The travelling marker, behind the labels. */}
            {/* Sized to the nav's own height rather than centred with a
                percentage: Tailwind v4 compiles translate utilities to the
                standalone `translate` property, which COMPOSES with an inline
                `transform` instead of overriding it, so a -translate-y-1/2
                class plus a translate(x, -50%) style moves it a full 100%. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 -z-10 rounded-full bg-teal-soft/60 transition-[transform,width,opacity] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                width: `${marker.w}px`,
                transform: `translateX(${marker.x}px)`,
                opacity: marker.show ? 1 : 0,
              }}
            />
            {nav.map((item, i) => (
              <a
                key={item.label}
                // Block body on purpose: React 19 treats a ref callback's
                // return value as a cleanup function, so an arrow that
                // implicitly returns the node never registers it.
                ref={(el) => {
                  itemRefs.current[i] = el
                }}
                href={`#${item.id}`}
                onClick={goItem(item)}
                onMouseEnter={() => setHoverIdx(i)}
                onFocus={() => setHoverIdx(i)}
                onBlur={() => setHoverIdx(-1)}
                aria-current={activeIdx === i ? 'true' : undefined}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors duration-300 lg:px-4 ${
                  activeIdx === i || hoverIdx === i
                    ? 'font-semibold text-teal-deep'
                    : 'font-medium text-ink/70'
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* The shelf. One element that slides between items, so the hint
                reads as the dock opening rather than five separate tooltips. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-full z-10 mt-[18px] whitespace-nowrap rounded-full border-2 border-teal-deep bg-cream px-4 py-1.5 text-xs font-medium text-ink/80 shadow-[0_10px_24px_rgba(15,43,41,0.14)] transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translate(calc(${marker.x + marker.w / 2}px - 50%), ${
                  hinted ? '0' : '-6px'
                })`,
                opacity: hinted ? 1 : 0,
              }}
            >
              {hinted?.hint ?? ''}
            </span>
          </nav>

          <Magnetic>
            <a
              href="#contact"
              onClick={go('contact')}
              className="hidden rounded-full border-2 border-teal-deep bg-coral px-4 py-2 text-sm font-semibold text-cream transition-transform duration-300 hover:scale-[1.04] md:inline-block"
            >
              Get started
            </a>
          </Magnetic>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="p-1.5 text-ink md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Reading progress, inset to the straight run of the capsule so the
              rounded ends never crop it. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-9 bottom-[3px] h-[2px] origin-left rounded-full bg-coral/70 transition-transform duration-150 ease-out"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        {open ? (
          <div className="mt-2 overflow-hidden rounded-[24px] border-2 border-teal-deep bg-cream p-3 md:hidden">
            <nav className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <a
                  key={item.label}
                  href={`#${item.id}`}
                  onClick={goItem(item)}
                  style={{ animationDelay: `${i * 55}ms` }}
                  className="nav-drawer-item rounded-xl px-3 py-2.5 hover:bg-teal-soft/25"
                >
                  <span className="block text-base font-semibold text-ink">{item.label}</span>
                  {item.hint ? (
                    <span className="mt-0.5 block text-[0.78rem] leading-snug text-ink-muted">
                      {item.hint}
                    </span>
                  ) : null}
                </a>
              ))}
              <a
                href="#contact"
                onClick={go('contact')}
                style={{ animationDelay: `${nav.length * 55}ms` }}
                className="nav-drawer-item mt-2 rounded-full border-2 border-teal-deep bg-coral px-5 py-3 text-center text-base font-semibold text-cream"
              >
                Get started
              </a>
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  )
}
