import { StarRating } from '../components/StarRating'
import { testimonials } from '../content/site'

/**
 * Reviews as a two-row auto-scrolling marquee — the rows drift in opposite
 * directions and pause on hover so a card can be read. The stars are plain
 * Lucide SVGs.
 *
 * Every card is tagged "Sample": the copy in content/site.js is placeholder,
 * not real endorsements, so nothing here claims a specific business said it.
 * Replace with genuine, permissioned quotes before launch.
 */
function ReviewCard({ item }) {
  return (
    <figure className="mr-5 flex w-[19rem] shrink-0 flex-col rounded-[var(--radius-card)] bg-teal-soft/25 p-6 sm:w-[22rem]">
      <div className="flex items-center justify-between">
        <StarRating rating={item.rating} />
        {item.sample ? (
          <span className="rounded-full bg-teal-soft/50 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-teal-deep/70">
            Sample
          </span>
        ) : null}
      </div>
      <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-teal-deep">
        “{item.quote}”
      </blockquote>
      <figcaption className="mt-5 text-sm text-ink-muted">
        <span className="font-semibold text-teal-deep">{item.name}</span>
        {item.business ? ` — ${item.business}` : null}
      </figcaption>
    </figure>
  )
}

function Row({ items, reverse = false, duration = '38s' }) {
  // Rendered twice for the seamless -50% loop; the copy is aria-hidden.
  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]">
      <div
        className="flex shrink-0 [animation:marquee-x_var(--dur)_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]"
        style={{ '--dur': duration, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {items.map((item, i) => (
          <ReviewCard key={`a-${i}`} item={item} />
        ))}
        {items.map((item, i) => (
          <div key={`b-${i}`} aria-hidden="true" className="flex">
            <ReviewCard item={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function Testimonials() {
  // Each row carries every review so the set is always wider than the viewport
  // — the -50% loop then stays seamless (no gap) at any screen width.
  const items = testimonials.items
  const mid = Math.ceil(items.length / 2)
  const rowA = [...items.slice(0, mid), ...items.slice(mid)]
  const rowB = [...items.slice(mid), ...items.slice(0, mid)]

  return (
    <section id="testimonials" className="relative z-10 overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto mb-12 max-w-7xl px-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
          {testimonials.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
          {testimonials.title}
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        <Row items={rowA} duration="42s" />
        <Row items={rowB} reverse duration="52s" />
      </div>
    </section>
  )
}
