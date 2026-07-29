import { useRef } from 'react'
import { useInView } from 'motion/react'
import { AnimatedNumber } from './AnimatedNumber'
import { stats } from '../content/site'

/** Thin band of numbers that count up when scrolled into view. */
export function StatStrip() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="relative z-10 border-y border-cream/10 bg-teal-deep px-5 py-12 sm:px-8 sm:py-14"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-4xl font-bold text-cream sm:text-5xl">
              {/* The resting state is the real figure, not 0 — before this
                  strip scrolls into view the panel read "0-in-1 / 0 tap". */}
              {inView ? <AnimatedNumber value={s.value} from={0} /> : s.value}
              <span className="text-coral">{s.suffix}</span>
            </p>
            <p className="mt-1.5 text-sm leading-snug text-cream/60">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
