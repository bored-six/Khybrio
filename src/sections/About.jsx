import { about } from '../content/site'

/**
 * Short origin story. Sits between the team and the reviews so a visitor meets
 * the people, hears why they started, and only then reads what others say.
 */
export function About() {
  return (
    <section id="about" className="relative z-10 bg-cream px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
            {about.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-tight text-teal-deep">
            {about.title}
          </h2>
        </div>

        <div>
          <p className="leading-relaxed text-ink-muted">{about.body}</p>

          <dl className="mt-9 flex flex-col gap-5">
            {about.points.map((point) => (
              <div
                key={point.label}
                className="border-l-2 border-teal-soft pl-5 sm:pl-6"
              >
                <dt className="font-semibold text-teal-deep">{point.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-muted">{point.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
