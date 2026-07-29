import { useEffect, useState } from 'react'
import { subscribeActiveIndex, subscribeSceneVisible } from '../lib/sceneRegistry'
import { milestones } from '../content/site'
import { scrollToId } from '../lib/smoothScroll'

const pad = (n) => String(n).padStart(2, '0')

/**
 * "03 / 06" plus the thin vertical dot trail, fixed to the viewport edge.
 *
 * It runs off the flat milestone list rather than off any individual section's
 * animation, which is the point: it keeps counting straight through the
 * video-scrubbed opening and the still-scrubbed sections after it, so the
 * handoff between the two techniques never surfaces to the visitor.
 */
export function SceneCounter() {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => subscribeActiveIndex(setActive), [])
  useEffect(() => subscribeSceneVisible(setVisible), [])

  return (
    <div
      className="pointer-events-none fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 transition-opacity duration-300 sm:right-7 sm:flex"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden={!visible}
    >
      <span className="font-display text-xs font-semibold tabular-nums tracking-widest text-teal-deep/70 mix-blend-multiply">
        {pad(active + 1)} / {pad(milestones.length)}
      </span>

      <span className="flex flex-col items-center gap-2.5">
        {milestones.map((m, i) => (
          <button
            key={m.label}
            type="button"
            title={m.label}
            aria-label={`Go to ${m.label}`}
            onClick={() => scrollToId(m.id)}
            className="pointer-events-auto grid h-4 w-4 place-items-center"
          >
            <span
              className="block rounded-full transition-all duration-500"
              style={{
                width: i === active ? 8 : 5,
                height: i === active ? 8 : 5,
                background:
                  i === active ? 'var(--color-coral)' : 'var(--color-teal-soft)',
              }}
            />
          </button>
        ))}
      </span>
    </div>
  )
}
