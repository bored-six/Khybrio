import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

// Dev-only handle. Pinned, scrubbed sections are near-impossible to inspect
// from the console otherwise, and it lets an automated check drive
// ScrollTrigger.update() directly instead of relying on rAF, which browsers
// pause in a backgrounded tab.
if (import.meta.env.DEV && typeof window !== 'undefined') {
  window.__khybrio = { gsap, ScrollTrigger }
}

let lenis = null

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function isCoarsePointer() {
  return (
    typeof window !== 'undefined' &&
    (window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
      window.innerWidth <= 860)
  )
}

/**
 * One Lenis instance for the whole page, driven off GSAP's ticker so
 * ScrollTrigger and Lenis never disagree about the current scroll position.
 * Skipped entirely under reduced-motion — native scrolling takes over.
 */
export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {}

  lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    // Native momentum on touch feels better than emulating it.
    syncTouch: false,
  })

  lenis.on('scroll', ScrollTrigger.update)

  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    lenis.destroy()
    lenis = null
  }
}

/** Anchor navigation that respects Lenis instead of fighting it. */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.2 })
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
