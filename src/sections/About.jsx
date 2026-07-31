import { Reveal } from '../components/Reveal'
import { useContent } from '../content/context'

/**
 * Short origin story. Sits between the team and the reviews so a visitor meets
 * the people, hears why they started, and only then reads what others say.
 */
export function About() {
  const { about } = useContent()
  return (
    <section id="about" className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
        {/* The headline unmasks left-to-right — a wipe, not a fade. Opacity
            stays out of it so the wipe edge itself is the reveal. */}
        <Reveal
          from={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
          blur={false}
          duration={1.05}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
            {about.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-tight text-teal-deep">
            {about.title}
          </h2>
        </Reveal>

        <div>
          <p className="leading-relaxed text-ink-muted">{about.body}</p>

          <Reveal as="dl" from={{ x: -34 }} stagger={0.12} className="mt-9 flex flex-col gap-5">
            {about.points.map((point) => (
              <div key={point.label} className="border-l-2 border-teal-soft pl-5 sm:pl-6">
                <dt className="font-semibold text-teal-deep">{point.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-muted">{point.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
