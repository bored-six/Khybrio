import { useRef } from 'react'
import { useProgressEffect, band, smooth } from '../hooks/useProgressEffect'
import { bundle } from '../content/site'

/**
 * The three service cards, overlaid on the final frame of the flight.
 *
 * All three services are already visible inside that one shot, so these are
 * plain CSS cards pinned over it — no extra generated images. They read the
 * same scene progress the flight does, so they can't drift out of sync with it.
 *
 * On phones the island frame is too tight to pin cards to specific points, so
 * they stack along the bottom instead of scattering.
 */
export function HotspotCards({ progressRef, appearAt = 0.8, reduced }) {
  const cardRefs = useRef([])

  useProgressEffect(progressRef, (p) => {
    if (reduced) return
    bundle.hotspots.forEach((_, i) => {
      const el = cardRefs.current[i]
      if (!el) return
      // Slight stagger so they land one after another, not as a block.
      const t = smooth(band(p, appearAt + i * 0.035, appearAt + 0.12 + i * 0.035))
      el.style.opacity = String(t)
      el.style.transform = `translate3d(0, ${(1 - t) * 14}px, 0)`
    })
  })

  return (
    <div className="pointer-events-none absolute inset-0 z-30">
      <div className="mx-auto flex h-full max-w-7xl flex-col justify-end gap-3 px-5 pb-8 sm:px-8 md:block md:pb-0">
        {bundle.hotspots.map((spot, i) => (
          <article
            key={spot.id}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className="pointer-events-auto w-full rounded-[var(--radius-card)] bg-cream/95 p-4 shadow-[0_10px_40px_rgba(15,43,41,0.22)] backdrop-blur-sm md:absolute md:top-[var(--hy)] md:left-[var(--hx)] md:w-[19rem] md:p-5"
            // Positions ride on custom properties so the md: breakpoint alone
            // decides between scattered and stacked — no JS width check.
            style={{
              opacity: reduced ? 1 : 0,
              '--hx': spot.position.left,
              '--hy': spot.position.top,
            }}
          >
            <h3 className="font-display text-base font-bold text-teal-deep md:text-lg">
              {spot.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{spot.body}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
