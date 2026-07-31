import { Words } from '../components/Words'
import { Reveal } from '../components/Reveal'
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
    <section id="process" className="relative z-10 bg-teal-deep px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-soft">
          {process.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-cream">
          <Words text={process.title} />
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-cream/75">{process.body}</p>

        <Reveal
          as="ol"
          from={{ y: 40, scale: 0.94 }}
          stagger={0.14}
          className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {process.steps.map((step, i) => (
            <li key={step.n} className="relative">
              {/* Connector, desktop only. A dashed rail that is always fully
                  drawn — the old scaleX draw looked like a cut line mid-way —
                  with a coral runner travelling it toward the next step. */}
              {i < process.steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-12 right-2 top-5 hidden lg:block"
                >
                  <span className="block h-px w-full [background:repeating-linear-gradient(90deg,rgba(245,247,246,0.35)_0_6px,transparent_6px_14px)]" />
                  <span
                    className="rail-dot absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-coral"
                    style={{ animationDelay: `${i * 0.45}s` }}
                  />
                </span>
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
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
