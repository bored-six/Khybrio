import { Check, ArrowRight } from 'lucide-react'
import { Magnetic } from '../components/Magnetic'
import { FlowMachine } from '../components/FlowMachine'
import { scrollToId } from '../lib/smoothScroll'
import { hero, runLog } from '../content/site'

/**
 * Editorial broadsheet hero — cream canvas, serif that commands through scale
 * at regular weight, 2px ink borders, and the flow machine as the proof.
 *
 * The structure is borrowed from Wispr Flow's playbook (their speech-to-words
 * hero); the skin is entirely Khybrio's — Fraunces for Garamond, teal-deep for
 * ink, coral for lavender. Authority comes from the type size, never from
 * weight: the headline is weight 400 on purpose. Do not "fix" it to bold.
 *
 * Entrances are CSS (`rise-in`), not Motion — the headline and machine are the
 * two things a visitor must see, and a JS entrance that starts at opacity 0
 * leaves both invisible wherever the frame loop is throttled.
 */

/** Hand-drawn coral squiggle under the headline accent, drawn in on load. */
function Squiggle() {
  return (
    <svg
      className="squiggle absolute -bottom-[0.12em] left-0 h-[0.22em] w-full"
      viewBox="0 0 100 12"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2 8 Q 14 3, 26 7 T 50 7 T 74 7 T 98 5"
        pathLength="140"
        fill="none"
        stroke="var(--color-coral)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** A stray task chip drifting at the hero's edge — the "before" litter. */
function DriftChip({ className, tilt, label, body, delay }) {
  return (
    <div
      className={`float-drift pointer-events-none absolute hidden max-w-[15rem] rounded-2xl border-2 border-teal-deep/15 bg-white/80 px-4 py-3 xl:block ${className}`}
      style={{ '--tilt': tilt, animationDelay: delay }}
      aria-hidden="true"
    >
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-coral">{label}</p>
      <p className="mt-1 text-[0.82rem] font-medium leading-snug text-ink-muted">{body}</p>
    </div>
  )
}

export function Hero() {
  const go = (href) => (e) => {
    e.preventDefault()
    scrollToId(href.slice(1))
  }

  return (
    <section
      id="hero"
      className="relative z-10 overflow-hidden border-b-2 border-teal-deep/10 bg-cream px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40"
    >
      {/* Kept to the hero's gutters — at 4xl the headline owns the middle
          band, so the chips sit high-right and low-left where it never is. */}
      <DriftChip
        className="left-[3%] top-[38%]"
        tilt="-7deg"
        delay="0s"
        label={runLog.flows[0].label}
        body={runLog.flows[0].trigger}
      />
      <DriftChip
        className="right-[4%] top-[13%]"
        tilt="5deg"
        delay="1.4s"
        label={runLog.flows[1].label}
        body={runLog.flows[1].trigger}
      />

      <div className="rise-in mx-auto max-w-4xl text-center">
        <p className="inline-flex rounded-full bg-teal-deep px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-cream">
          {hero.eyebrow}
        </p>

        <h1 className="mt-6 font-normal leading-[0.95] tracking-[-0.03em] text-ink [font-size:clamp(2.9rem,7.5vw,5.6rem)]">
          {hero.title[0]}
          {/* The punctuation rides inside the nowrap group so it can never
              wrap onto a line of its own. */}
          <span className="whitespace-nowrap">
            <span className="relative text-coral">
              {hero.title[1]}
              <Squiggle />
            </span>
            {hero.title[2]}
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {hero.sub}
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <a
              href={hero.ctas.primary.href}
              onClick={go(hero.ctas.primary.href)}
              className="inline-flex items-center gap-2 rounded-full border-2 border-teal-deep bg-coral px-7 py-3.5 font-semibold text-cream transition-transform duration-300 hover:scale-[1.04]"
            >
              {hero.ctas.primary.label}
              <ArrowRight size={17} strokeWidth={2.4} />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={hero.ctas.secondary.href}
              onClick={go(hero.ctas.secondary.href)}
              className="inline-block rounded-full border-2 border-teal-deep bg-cream px-7 py-3.5 font-semibold text-teal-deep transition-colors duration-300 hover:bg-teal-soft/30"
            >
              {hero.ctas.secondary.label}
            </a>
          </Magnetic>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {hero.trust.map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-sm text-ink-muted">
              <Check size={14} strokeWidth={2.6} color="var(--color-coral)" />
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="rise-in-late mx-auto mt-14 max-w-5xl sm:mt-16">
        <FlowMachine />
      </div>
    </section>
  )
}
