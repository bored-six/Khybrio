import { SearchX, MessageSquareOff, ScanLine } from 'lucide-react'
import { Words } from '../components/Words'
import { Reveal } from '../components/Reveal'
import { useContent } from '../content/context'

const icons = [SearchX, MessageSquareOff, ScanLine]

export function Problem() {
  const { problem } = useContent()
  return (
    <section
      id="problem"
      className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
          {problem.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
          <Words text={problem.title} />
        </h2>

        {/* Dominoes: outer cards tip in rotated toward the straight centre
            one, and land with a back-eased settle. */}
        <Reveal
          from={{ y: 70, rotate: (i) => (i === 1 ? 0 : i === 0 ? -7 : 7) }}
          stagger={0.13}
          duration={1}
          ease="back.out(1.4)"
          className="mt-12 grid gap-5 md:grid-cols-3"
        >
          {problem.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <article
                key={item.title}
                className="rounded-[var(--radius-card)] bg-teal-soft/25 p-6 sm:p-7"
              >
                <span className="inline-block">
                  <Icon size={26} strokeWidth={1.75} color="var(--color-coral)" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-teal-deep">{item.title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-muted">{item.body}</p>
              </article>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
