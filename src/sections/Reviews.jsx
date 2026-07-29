import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { reviews } from '../content/ph'

/**
 * The review service — the local page's recurring line.
 *
 * The tap card is deliberately framed as the free mechanism rather than the
 * product. Charge for the card and a sharp owner points out that a printed QR
 * does nearly the same job for nothing, and they are right; bundle it and that
 * argument never starts. What is being sold is the review count and the Maps
 * position it buys.
 */
export function Reviews() {
  return (
    <section id="reviews" className="relative z-10 bg-teal-deep px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-coral">
            <Star size={15} strokeWidth={2.4} fill="var(--color-coral)" />
            {reviews.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-cream">
            {reviews.title}
          </h2>
          <p className="mt-4 leading-relaxed text-cream/75">{reviews.body}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.points.map((point, i) => (
            <motion.div
              key={point.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.55, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[var(--radius-card)] bg-cream/8 p-7 ring-1 ring-cream/15"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-teal-soft">
                {point.label}
              </p>
              <p className="mt-3 leading-relaxed text-cream/90">{point.value}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-cream/55">{reviews.note}</p>
      </div>
    </section>
  )
}
