import { ArrowUpRight } from 'lucide-react'
import { Words } from '../components/Words'
import { Reveal } from '../components/Reveal'
import { useContent } from '../content/context'

/**
 * What changes in the owner's week — the page's "so what".
 *
 * Everything above this says what we do; this is the first section that says
 * what is different afterwards, which is the thing a buyer is actually
 * shopping for. It sits after the named workflows on purpose: the concrete
 * jobs make the promise legible, and this collects them into a consequence.
 *
 * Deliberately NOT another card grid. The page already has problem cards,
 * workflow cards, process steps and pricing cards, and a fifth boxed grid
 * would read as more of the same and get skimmed as decoration. This is a
 * plain two-column ledger with a rule between rows — lighter than everything
 * around it, which is what makes it register.
 */
export function Improves() {
  const { improves } = useContent()

  return (
    <section id="improves" className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
            {improves.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
            <Words text={improves.title} />
          </h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">{improves.body}</p>
        </div>

        <Reveal
          from={{ y: 34 }}
          stagger={0.07}
          duration={0.8}
          className="mt-12 grid gap-x-12 border-t border-teal-deep/12 sm:grid-cols-2"
        >
          {improves.items.map((item) => (
            <div
              key={item.title}
              className="group border-b border-teal-deep/12 py-6 sm:py-7"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 shrink-0 text-coral transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  <ArrowUpRight size={18} strokeWidth={2.6} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold leading-snug text-teal-deep">
                    {item.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-muted">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
