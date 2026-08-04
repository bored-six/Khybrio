import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { Words } from '../components/Words'
import { Reveal } from '../components/Reveal'
import { DeviceShowcase } from '../components/DeviceShowcase'
import { prefersReducedMotion } from '../lib/smoothScroll'
import { useContent } from '../content/context'

/** How long each line of work holds the cluster before handing it on. */
const DWELL_MS = 4200

/**
 * The lines of work: devices on one side, the list on the other, and one line
 * of work lit at a time in both.
 *
 * The pairing is the point. Three static devices beside a static list is two
 * decorations that happen to share a row — the reader has no reason to connect
 * "Websites & booking" with the tablet. Lighting them together says which
 * screen belongs to which line of work without a caption, and gives the section
 * something to do while it is being read.
 *
 * It cycles on its own so the block is never dead on arrival, and any hover or
 * keyboard focus takes it over — an auto-rotation that fights the reader is
 * worse than no motion at all. Under reduced-motion it does not cycle; the
 * first line of work stays lit and hover still works.
 */
export function Services() {
  const { services } = useContent()
  const [active, setActive] = useState(0)
  const [held, setHeld] = useState(false)
  const heldRef = useRef(false)
  heldRef.current = held

  const count = services.items.length

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setInterval(() => {
      if (!heldRef.current) setActive((a) => (a + 1) % count)
    }, DWELL_MS)
    return () => clearInterval(id)
  }, [count])

  const take = (i) => {
    setActive(i)
    setHeld(true)
  }

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
            <DeviceShowcase active={active} />
          </div>

          <div onMouseLeave={() => setHeld(false)}>
            {services.items.map((item, i) => {
              const on = i === active
              return (
                <div
                  key={item.name}
                  onMouseEnter={() => take(i)}
                  className={`relative mt-6 border-l-2 pl-4 transition-all duration-500 first:mt-0 sm:pl-5 ${
                    on ? 'border-coral' : 'border-teal-deep/10'
                  }`}
                >
                  <button
                    type="button"
                    onFocus={() => take(i)}
                    onClick={() => take(i)}
                    aria-pressed={on}
                    className={`rounded-sm text-left font-display text-sm font-bold transition-colors duration-500 ${
                      on ? 'text-coral' : 'text-teal-deep/45'
                    }`}
                  >
                    {item.n} · {item.name}
                  </button>

                  {/* The body only shows for the line of work being talked
                      about. Three of them at once is the wall of text the old
                      card grid already was. */}
                  <p
                    className={`overflow-hidden text-sm leading-relaxed text-ink-muted transition-all duration-500 ${
                      on ? 'mt-2 max-h-24 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    {item.body}
                  </p>

                  <ul
                    className={`mt-3 grid gap-2.5 transition-opacity duration-500 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 ${
                      on ? 'opacity-100' : 'opacity-55'
                    }`}
                  >
                    {item.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-teal-deep">
                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors duration-500 ${
                            on ? 'bg-coral/15' : 'bg-teal-deep/6'
                          }`}
                        >
                          <Check
                            size={13}
                            strokeWidth={3}
                            color={on ? 'var(--color-coral)' : 'var(--color-teal-deep)'}
                          />
                        </span>
                        <span className="text-sm leading-snug">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
