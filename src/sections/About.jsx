import { motion } from 'motion/react'
import { useContent } from '../content/context'

/**
 * Short origin story. Sits between the team and the reviews so a visitor meets
 * the people, hears why they started, and only then reads what others say.
 */
export function About() {
  const { about } = useContent()
  return (
    <section id="about" className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
        {/* The headline unmasks left-to-right — a wipe, not a fade. */}
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
            {about.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-tight text-teal-deep">
            {about.title}
          </h2>
        </motion.div>

        <div>
          <p className="leading-relaxed text-ink-muted">{about.body}</p>

          <dl className="mt-9 flex flex-col gap-5">
            {about.points.map((point, i) => (
              <motion.div
                key={point.label}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="border-l-2 border-teal-soft pl-5 sm:pl-6"
              >
                <dt className="font-semibold text-teal-deep">{point.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-muted">{point.value}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
