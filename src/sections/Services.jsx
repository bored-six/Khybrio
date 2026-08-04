import { Globe, MapPin, Check, Workflow, Star } from 'lucide-react'
import { Words } from '../components/Words'
import { Reveal } from '../components/Reveal'
import { AssetImage } from '../components/AssetImage'
import { A } from '../lib/assets'
import { useContent } from '../content/context'

const ICONS = { globe: Globe, pin: MapPin, workflow: Workflow, star: Star }

/**
 * The lines of work — one full-width row each: the island zone that stands for
 * the work on one side, what it actually is on the other, alternating sides
 * down the section.
 *
 * This replaced a three-card grid. The cards gave each line of work a third of
 * a row and a 12-word summary, which read as a menu; a row gives it half the
 * page and a picture, which reads as an argument. The zone renders were already
 * carrying that meaning in the flight above — the desk nook IS the automation
 * zone — so pairing them here costs no new assets and keeps the island running
 * through the page instead of ending when the flight does.
 *
 * The image side alternates so the eye is handed across the page rather than
 * marching down one column, and the numeral sits in the image corner where it
 * doubles as the visual's label.
 */
export function Services() {
  const { services } = useContent()

  return (
    <section id="services" className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Centred opening — the heading has to sit over the whole section now
            that what follows is two columns wide rather than three. */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
            {services.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
            <Words text={services.title} />
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-ink-muted">{services.body}</p>
        </div>

        <div className="mt-14 flex flex-col gap-16 sm:mt-16 sm:gap-20">
          {services.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Globe
            const flipped = i % 2 === 1
            return (
              <Reveal
                key={item.name}
                // Halves converge from their own sides, so a row assembles
                // instead of arriving as one block.
                from={{ x: (c) => ((c === 0) !== flipped ? -70 : 70) }}
                stagger={0.08}
                duration={0.9}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
              >
                {/* `md:order-2` moves the visual right on odd rows without
                    reordering the DOM, so reading order stays image-then-copy
                    for a screen reader on every row. */}
                <div className={flipped ? 'md:order-2' : ''}>
                  <div className="group relative overflow-hidden rounded-[var(--radius-card)] bg-teal-soft/20 ring-1 ring-teal-deep/5">
                    <AssetImage
                      asset={A[item.still] ?? A.hero}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    {/* On a solid chip, not bare cream type. Every one of
                        these renders is pale cream haze in the top corner —
                        cream numerals measured 1.2:1 against it, which is
                        invisible, and on two of the three the darkest pixel in
                        that whole region was 222, so there was nothing to sit
                        on. The chip carries its own background instead. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-2xl bg-teal-deep/90 font-display text-lg font-bold leading-none text-cream backdrop-blur-sm"
                    >
                      {item.n}
                    </span>
                  </div>
                </div>

                <div className={flipped ? 'md:order-1' : ''}>
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-deep">
                      <Icon size={22} color="var(--color-cream)" strokeWidth={1.9} />
                    </span>
                    <span className="font-display text-sm font-bold text-coral">{item.n}</span>
                  </div>

                  <h3 className="mt-5 font-display text-[clamp(1.35rem,2.4vw,1.9rem)] font-bold text-teal-deep">
                    {item.name}
                  </h3>
                  <p className="mt-3 max-w-xl leading-relaxed text-ink-muted">{item.body}</p>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
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
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
