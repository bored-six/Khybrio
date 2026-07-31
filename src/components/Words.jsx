import { Fragment, useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/smoothScroll'

/**
 * Word-by-word masked reveal for section headlines. Each word rises out of
 * its own overflow clip as the heading scrolls into view — the editorial
 * "type being set" gesture that makes a section opening feel deliberate.
 *
 * Whole words, never letters: per-letter staggers read as a toy, and they
 * break screen readers' word boundaries. The joining spaces live OUTSIDE the
 * inline-block wrappers — a trailing space inside one collapses to nothing —
 * so the text selects, wraps and reads exactly like a plain string.
 *
 * Driven by ScrollTrigger rather than an IntersectionObserver, because this
 * page scrolls through Lenis and pins with ScrollTrigger; a second, unrelated
 * observer was missing its trigger on long scrolls and leaving the headline
 * parked below its clip — a blank block the exact height of the heading.
 *
 * Two rules keep that from ever happening again:
 *   1. The markup renders VISIBLE. Only JS hides the words, and only once it
 *      knows it can also reveal them. No JS, no GSAP, an exception — the
 *      headline is plain readable text.
 *   2. A failsafe reveals anything still hidden while on screen, so a missed
 *      trigger costs the animation, never the words.
 */
export function Words({ text }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root || prefersReducedMotion()) return

    const words = root.querySelectorAll('[data-word]')
    if (!words.length) return

    let done = false
    const reveal = (duration) => {
      if (done) return
      done = true
      gsap.to(words, {
        yPercent: 0,
        duration,
        ease: 'power4.out',
        stagger: 0.055,
        overwrite: true,
      })
    }

    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 118 })
      ScrollTrigger.create({
        trigger: root,
        start: 'top 88%',
        once: true,
        onEnter: () => reveal(0.9),
      })
    }, root)

    // Rule 2. If the heading is on screen and still hidden after the page has
    // settled, show it — short and undramatic, since the entrance moment has
    // already passed.
    const failsafe = window.setTimeout(() => {
      const box = root.getBoundingClientRect()
      if (box.top < window.innerHeight && box.bottom > 0) reveal(0.45)
    }, 2600)

    return () => {
      window.clearTimeout(failsafe)
      ctx.revert()
    }
  }, [text])

  return (
    <span ref={ref}>
      {String(text)
        .split(' ')
        .map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            {/* The pb/-mb pair gives descenders room inside the clip without
                adding visual line height. */}
            <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
              <span data-word className="inline-block">
                {word}
              </span>
            </span>{' '}
          </Fragment>
        ))}
    </span>
  )
}
