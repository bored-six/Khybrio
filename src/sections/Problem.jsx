import { motion } from 'motion/react'
import { SearchX, MessageSquareOff, ScanLine } from 'lucide-react'
import { problem } from '../content/site'

const icons = [SearchX, MessageSquareOff, ScanLine]

export function Problem() {
  return (
    <section
      id="problem"
      className="relative z-10 bg-cream px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
          {problem.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
          {problem.title}
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {problem.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-[var(--radius-card)] bg-teal-soft/25 p-6 sm:p-7"
              >
                <Icon size={26} strokeWidth={1.75} color="var(--color-coral)" />
                <h3 className="mt-5 text-xl font-bold text-teal-deep">{item.title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-muted">{item.body}</p>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
