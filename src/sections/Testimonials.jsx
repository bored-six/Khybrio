import { motion } from 'motion/react'
import { StarRating } from '../components/StarRating'
import { testimonials } from '../content/site'

/**
 * Review cards. The star is a plain Lucide SVG — no generated image needed.
 *
 * Quotes are intentionally empty until real ones exist. Inventing reviews and
 * attributing them to plausible-sounding local businesses would be a problem
 * both legally and for the first customer who checks, so the slots show as
 * unfilled rather than shipping convincing fakes.
 */
export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative z-10 bg-cream px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
          {testimonials.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
          {testimonials.title}
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.items.map((item, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-[var(--radius-card)] p-6 sm:p-7 ${
                item.quote
                  ? 'bg-teal-soft/25'
                  : 'border border-dashed border-teal-soft bg-transparent'
              }`}
            >
              <StarRating rating={item.rating} />
              {item.quote ? (
                <>
                  <blockquote className="mt-4 text-lg leading-relaxed text-teal-deep">
                    “{item.quote}”
                  </blockquote>
                  <figcaption className="mt-5 text-sm text-ink-muted">
                    <span className="font-semibold text-teal-deep">{item.name}</span>
                    {item.business ? ` — ${item.business}` : null}
                  </figcaption>
                </>
              ) : (
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  Review slot {i + 1}. Add a real quote in{' '}
                  <code className="rounded bg-teal-soft/40 px-1.5 py-0.5 text-[0.8em]">
                    src/content/site.js
                  </code>{' '}
                  once you have one with permission to publish.
                </p>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
