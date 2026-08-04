import { X } from 'lucide-react'
import { Words } from '../components/Words'
import { Reveal } from '../components/Reveal'
import { notFor } from '../content/site'

/**
 * Who this is not for — the page's only moment of pushing back.
 *
 * Sits immediately before the FAQ, which is where a reader who is still going
 * has stopped being sold to and started checking. Coming clean about the bad
 * fit right there is worth more than one more argument for the good one.
 *
 * Styled deliberately quieter than everything around it: no coral, muted
 * marks, plain rules. A disqualifier shouted in accent colour reads as a
 * humblebrag — "we're so selective" — which is the opposite of the point. It
 * should feel like someone lowering their voice to give you a straight answer.
 *
 * Main page only. It imports `notFor` directly rather than through the content
 * context because /ph has no equivalent block, and a shared section that
 * renders undefined on one page is a worse problem than a duplicated import.
 */
export function NotFor() {
  return (
    <section id="not-for" className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-deep/45">
            {notFor.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.7rem,4vw,2.5rem)] font-bold text-teal-deep">
            <Words text={notFor.title} />
          </h2>
          <p className="mt-4 leading-relaxed text-ink-muted">{notFor.body}</p>
        </div>

        <Reveal
          from={{ y: 28 }}
          stagger={0.08}
          duration={0.75}
          className="mt-10 grid gap-x-12 sm:grid-cols-2"
        >
          {notFor.items.map((item) => (
            <div key={item.title} className="border-t border-teal-deep/12 py-6">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-teal-deep/35">
                  <X size={16} strokeWidth={2.8} />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-teal-deep">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
