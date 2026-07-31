import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/smoothScroll'

/**
 * Scroll entrance for anything that isn't a headline (headlines use <Words>).
 *
 * `from` is the state the content animates OUT of, in GSAP terms, and it is
 * per-section on purpose — the sliding services cards, the settling problem
 * cards and the flipping team cards are meant to feel like different moments,
 * not one template applied nine times. Values may be functions of the child
 * index, so a grid can alternate direction: `x: (i) => (i % 2 ? 110 : -110)`.
 *
 * What IS shared is the safety contract, which is why this exists as a
 * component rather than nine hand-rolled variants:
 *
 *   1. The markup renders visible. GSAP applies the hidden start state, so if
 *      the script never runs the content is simply there.
 *   2. Anything still hidden while on screen after the page settles gets
 *      revealed anyway. A missed trigger costs the animation, never content.
 *
 * That second rule is the whole point. The previous entrances were driven by
 * an IntersectionObserver that could miss its trigger on this page's long
 * pinned scroll, and a missed trigger left the content stuck at `initial` —
 * permanently invisible, holding its full layout height. That is what the
 * blank blocks above the section bodies were.
 *
 * `blur` adds a short focus-pull to the entrance. It is what makes motion
 * register at a glance without making it larger or slower, and it is cleared
 * afterwards so text never sits on its own compositor layer.
 */
export function Reveal({
  children,
  className,
  as: Tag = 'div',
  from = { y: 44 },
  stagger = 0,
  delay = 0,
  duration = 0.9,
  blur = true,
  ease = 'power3.out',
  start = 'top 86%',
}) {
  const ref = useRef(null)

  // Read through a ref and run once on mount. An entrance plays a single time,
  // and callers pass `from` as an object literal — a fresh reference on every
  // render, which as an effect dependency would restart the animation each
  // time the parent re-rendered.
  const opts = useRef(null)
  opts.current = { from, stagger, delay, duration, blur, ease, start }

  useLayoutEffect(() => {
    const root = ref.current
    if (!root || prefersReducedMotion()) return
    const { from, stagger, delay, duration, blur, ease, start } = opts.current

    const targets = stagger ? Array.from(root.children) : [root]
    if (!targets.length) return

    const ctx = gsap.context(() => {
      // gsap.from() animates out of `from` and back to whatever the element
      // naturally is, so no rest state has to be declared or kept in sync.
      const tween = gsap.from(targets, {
        opacity: 0,
        ...from,
        ...(blur ? { filter: 'blur(8px)' } : null),
        duration,
        ease,
        delay,
        stagger,
        paused: true,
        // Leave the DOM exactly as authored once the entrance is done: no
        // inline transform to fight a Tailwind hover, and no stranded filter
        // keeping text on its own compositor layer.
        clearProps: 'all',
      })

      ScrollTrigger.create({
        trigger: root,
        start,
        once: true,
        onEnter: () => tween.play(),
      })

      const failsafe = window.setTimeout(() => {
        const box = root.getBoundingClientRect()
        const onScreen = box.top < window.innerHeight && box.bottom > 0
        if (onScreen && !tween.progress()) tween.progress(1)
      }, 2600)

      return () => window.clearTimeout(failsafe)
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
