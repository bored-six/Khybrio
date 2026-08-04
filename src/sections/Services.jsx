import { Check } from 'lucide-react'
import { Words } from '../components/Words'
import { Reveal } from '../components/Reveal'
import { DeviceShowcase } from '../components/DeviceShowcase'
import { useContent } from '../content/context'

/**
 * The lines of work, as one block: the devices on the left with the work
 * running in them, the capability list on the right.
 *
 * This was three alternating image rows before, and before that a card grid.
 * The single block is the tighter read — one visual carries "here is the thing"
 * and the column beside it says what it does, instead of the same argument
 * being made three times down the page.
 *
 * The list stays grouped by line of work rather than flattening to one run of
 * ticks. The section's own copy leans on that order ("Automation leads"), and
 * three coral leads cost one line each while keeping 01/02/03 legible.
 */
export function Services() {
  const { services } = useContent()

  return (
    <section id="services" className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
            {services.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
            <Words text={services.title} />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-ink-muted">{services.body}</p>
        </div>

        <Reveal
          from={{ x: (i) => (i === 0 ? -70 : 70) }}
          stagger={0.12}
          duration={0.95}
          className="mt-14 grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20"
        >
          <div>
            <DeviceShowcase />
          </div>

          <div>
            {services.items.map((item) => (
              <div key={item.name} className="mt-7 first:mt-0">
                <p className="font-display text-sm font-bold text-coral">
                  {item.n} · {item.name}
                </p>
                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-teal-deep">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-coral/12">
                        <Check size={13} strokeWidth={3} color="var(--color-coral)" />
                      </span>
                      <span className="text-sm leading-snug">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
