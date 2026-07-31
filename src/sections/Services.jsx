import { Globe, MapPin, Check, Workflow, Star } from 'lucide-react'
import { Words } from '../components/Words'
import { Reveal } from '../components/Reveal'
import { useContent } from '../content/context'

const ICONS = { globe: Globe, pin: MapPin, workflow: Workflow, star: Star }

/**
 * The lines of work. Cards slide in from alternating wings on a spring, a
 * ghost numeral sits behind each one, and every checklist point lands with
 * its own beat — the section has to feel built, not listed.
 */
export function Services() {
  const { services } = useContent()
  return (
    <section id="services" className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
          {services.eyebrow}
        </p>
        <h2 className="mt-3 max-w-3xl text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
          <Words text={services.title} />
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">{services.body}</p>

        <Reveal
          from={{ x: (i) => (i % 2 ? 110 : -110) }}
          stagger={0.11}
          duration={1}
          className={`mt-12 grid gap-5 md:grid-cols-2 ${services.items.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}
        >
          {services.items.map((item) => {
            const Icon = ICONS[item.icon] ?? Globe
            return (
              <article
                key={item.name}
                className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-teal-soft/20 p-7 ring-1 ring-transparent transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(15,43,41,0.15)] hover:ring-coral/40"
              >
                {/* Accent bars sweep opposite ways on hover — top from the
                    left, bottom from the right — so the border feels drawn. */}
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-coral transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="absolute inset-x-0 bottom-0 h-1 origin-right scale-x-0 bg-coral transition-transform duration-500 ease-out group-hover:scale-x-100" />

                {/* Ghost numeral, the editorial watermark. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] font-bold leading-none text-teal-deep/6 transition-colors duration-500 group-hover:text-coral/10"
                >
                  {item.n}
                </span>

                <div className="flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-deep transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110">
                    <Icon size={22} color="var(--color-cream)" strokeWidth={1.9} />
                  </span>
                  <span className="font-display text-sm font-bold text-coral">{item.n}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-teal-deep">{item.name}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-muted">{item.body}</p>
                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {item.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2 text-sm text-teal-deep transition-transform duration-300 group-hover:translate-x-0.5"
                    >
                      <Check size={15} strokeWidth={2.5} color="var(--color-coral)" className="shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </Reveal>

      </div>
    </section>
  )
}
