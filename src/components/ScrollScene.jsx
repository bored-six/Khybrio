import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/smoothScroll'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { setActiveIndex } from '../lib/sceneRegistry'

/**
 * The one scrubbed-section primitive. It owns pinning and scroll progress and
 * deliberately nothing else — it never learns whether it is driving a <video>
 * or an <img>. That is what makes upgrading a still section to a real camera
 * flight a one-line change in scenes.config.js (`mediaType: 'image'` ->
 * `'video'`) rather than a rewrite.
 *
 * `children` is a render prop receiving `{ progressRef, reduced }`. Progress
 * lives in a ref, not state — see useProgressEffect for why.
 *
 * Under reduced motion the section is never pinned: it falls back to normal
 * document flow and children render their static end state.
 */
export function ScrollScene({
  id,
  scroll = 1.5,
  className = '',
  contentClassName = '',
  /**
   * Extra anchor targets placed at a fraction of the section's scroll
   * distance. A pinned scene can span more than one nav destination — the
   * hero flight covers both #hero and #bundle — and this is how those get a
   * real position to scroll to.
   */
  anchors = [],
  /**
   * Counter milestone this scene owns — a number, or a function of progress
   * for a scene spanning more than one (the hero flight switches mid-pin).
   *
   * This lives on the scene rather than in child components on purpose: it is
   * only ever applied from inside the ScrollTrigger's own onUpdate, which
   * fires exclusively while this scene is the one on screen. Children running
   * off the shared ticker have no idea whether they are in view, so letting
   * them set it directly meant every scene overwrote the counter on every
   * frame and the last one mounted always won.
   */
  milestone,
  children,
}) {
  const rootRef = useRef(null)
  const pinRef = useRef(null)
  const progressRef = useRef(0)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced) {
      progressRef.current = 1
      return
    }

    progressRef.current = 0
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        // Resolved in pixels against one viewport height, NOT as a percentage.
        // A percentage end ("+=260%") is measured against the trigger
        // element's height — and pin-spacing grows that same element, so every
        // ScrollTrigger.refresh() fed a larger height back in and the document
        // grew without bound.
        //
        // The pinned child is 100svh by construction and sits inside the
        // spacer rather than wrapping it, so its height is a stable unit that
        // never inherits pin spacing. Falling back through innerHeight to a
        // constant keeps the pin from collapsing to zero length in any
        // environment that reports a zero-height viewport at measure time —
        // a zero-length pin reads as "instantly complete" and jumps every
        // scene straight to its end state.
        end: () => {
          const unit = pinRef.current?.offsetHeight || window.innerHeight || 800
          return `+=${Math.round(unit * scroll)}`
        },
        pin: pinRef.current,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress
          if (milestone === undefined) return
          setActiveIndex(
            typeof milestone === 'function' ? milestone(self.progress) : milestone,
          )
        },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [scroll, reduced, milestone])

  return (
    <section id={id} ref={rootRef} className={`relative ${className}`}>
      {anchors.map((anchor) => (
        <span
          key={anchor.id}
          id={anchor.id}
          aria-hidden="true"
          className="absolute left-0 h-px w-px"
          style={{ top: `${(reduced ? 1 : anchor.at) * 100}%` }}
        />
      ))}
      <div
        ref={pinRef}
        className={
          reduced
            ? `relative w-full ${contentClassName}`
            : `relative h-[100svh] w-full overflow-hidden ${contentClassName}`
        }
      >
        {children({ progressRef, reduced })}
      </div>
    </section>
  )
}
