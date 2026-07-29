import { motion } from 'motion/react'
import { useContent } from '../content/context'

/**
 * The four (or three, locally) steps with real timeframes attached.
 *
 * Shared between both pages — the international page runs audit → map → build
 * → hand over, the local page runs a shorter Maps-first version — so the copy
 * comes from the provider rather than a fixed import.
 */
export function Process() {
  const { process } = useContent()

  return (
    <section id="process" className="relative z-10 bg-teal-deep px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-soft">
          {process.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-cream">
          {process.title}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-cream/75">{process.body}</p>

        <ol className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <motion.li
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Connector, desktop only — stops before the last step. */}
              {i < process.steps.length - 1 ? (
                <span className="absolute left-12 right-0 top-5 hidden h-px bg-cream/15 lg:block" />
              ) : null}

              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-coral font-display text-sm font-bold text-cream">
                  {step.n}
                </span>
                <span className="rounded-full bg-cream/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-cream/70">
                  {step.when}
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-bold text-cream">{step.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-cream/70">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
