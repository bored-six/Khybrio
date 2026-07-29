import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { scrollToId } from '../lib/smoothScroll'
import { automate } from '../content/site'

/**
 * The six named workflows. This is the section that decides whether
 * "automation" reads as a specialism or as a vague capability, so every card
 * names a job an owner recognises as their own rather than a technology.
 */
export function Automate() {
  return (
    <section id="automate" className="relative z-10 bg-cream px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
          {automate.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
          {automate.title}
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">{automate.body}</p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {automate.items.map((item, i) => (
            <motion.article
              key={item.workflow}
              initial={{ opacity: 0, scale: 0.8, y: 18 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-70px' }}
              transition={{
                duration: 0.55,
                delay: (i % 3) * 0.09 + Math.floor(i / 3) * 0.16,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col rounded-[var(--radius-card)] bg-teal-soft/20 p-6 ring-1 ring-transparent transition-all duration-300 hover:bg-teal-deep hover:ring-coral/40"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-teal-bright transition-colors duration-300 group-hover:text-teal-soft">
                {item.label}
              </p>
              <p className="mt-3 font-display text-lg font-bold leading-snug text-teal-deep transition-colors duration-300 group-hover:text-cream">
                {item.workflow}
              </p>
            </motion.article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToId('contact')}
          className="mt-10 inline-flex items-center gap-2 font-semibold text-teal-deep underline-offset-4 transition-colors hover:text-coral hover:underline"
        >
          Not sure which one is yours? Send us your three
          <ArrowRight size={17} strokeWidth={2.4} />
        </button>
      </div>
    </section>
  )
}
