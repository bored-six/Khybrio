import { Fragment } from 'react'
import { Magnetic } from '../components/Magnetic'
import { IconArrow, IconFlow, IconPin, IconSite, IconYes } from '../components/icons/OfferIcons'
import { ExampleBadge } from './offer/shared'
import { jumpTo } from './offer/anchor'
import { hero } from '../content/offer'

/**
 * The opening chamber for the studio: who we are in one line, then one
 * customer walking through the three packages.
 *
 * The room is the same lit teal room as before (spot, aurora, sweep,
 * vignette, floor: see "Hero lighting" in index.css). What changed is the
 * object on the floor. The flow machine said "automation agency"; the card
 * now follows one invented customer from a Google listing, to a booking on
 * the site, to a confirmation nobody had to send. It is a story, not a menu,
 * so it does not repeat the services grid two sections down.
 *
 * Entrances are CSS only (`rise-step`, `word-rise`, `rise-in-late`, the pipe
 * keyframes): the headline and card are what a visitor must see, and CSS
 * keyframes finish and hold their end state even in a throttled tab. No
 * images, so first paint is fonts and DOM.
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

/**
 * The headline, split so each word lifts on its own beat. `start` carries the
 * index across fragments so the stagger runs through the whole line. Spaces
 * sit BETWEEN the inline-blocks so the lead fragment can still wrap.
 */
function SplitWords({ text, start = 0 }) {
  const words = text.trim().split(/\s+/)
  return words.map((word, i) => (
    <span key={`${word}-${i}`}>
      <span className="word-rise" style={{ '--i': start + i }}>
        {word}
      </span>
      {i < words.length - 1 ? ' ' : null}
    </span>
  ))
}

/* ── The journey card ───────────────────────────────────────────────────── */

const STEP_ICONS = { google: IconPin, site: IconSite, flow: IconFlow }

/** A thumbnail map: two roads, a block, the pin. 40px, decorative. */
function MiniMap() {
  return (
    <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0 rounded-lg" aria-hidden="true">
      <rect width="40" height="40" fill="var(--color-teal-soft)" opacity="0.55" />
      <path d="M-2 27L42 15" stroke="var(--color-cream)" strokeWidth="4" />
      <path d="M14 -2L22 42" stroke="var(--color-cream)" strokeWidth="3" />
      <rect x="26" y="22" width="10" height="9" rx="2" fill="var(--color-cream)" opacity="0.6" />
      <circle cx="18" cy="20" r="5" fill="var(--color-coral)" stroke="var(--color-cream)" strokeWidth="2" />
    </svg>
  )
}

function StepPreview({ step }) {
  const p = step.preview
  if (step.key === 'google') {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-teal-soft/25 p-2.5">
        <MiniMap />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-teal-deep">{p.name}</p>
          <p className="truncate text-xs text-ink-muted">{p.line}</p>
        </div>
      </div>
    )
  }
  if (step.key === 'site') {
    return (
      <div className="flex items-center gap-1.5 rounded-xl border-2 border-teal-deep/10 p-2">
        <span className="rounded-lg bg-teal-soft/35 px-2.5 py-1.5 text-xs font-semibold text-teal-deep">
          {p.day}
        </span>
        <span className="rounded-lg bg-coral px-2.5 py-1.5 text-xs font-semibold text-cream">
          {p.time}
        </span>
        <span className="ml-auto rounded-lg bg-teal-deep px-3 py-1.5 text-xs font-semibold text-cream">
          {p.button}
        </span>
      </div>
    )
  }
  return (
    <div>
      <p className="rounded-2xl rounded-bl-md bg-teal-bright px-3 py-2 text-xs leading-snug text-cream">
        {p.message}
      </p>
      <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-teal-deep">
        <IconYes size={15} className="text-teal-bright" />
        {p.logged}
      </p>
    </div>
  )
}

function JourneyCard() {
  const { journey } = hero
  return (
    <div className="overflow-hidden rounded-[28px] bg-cream text-left">
      <div className="flex items-center justify-between gap-3 border-b-2 border-teal-deep/12 px-5 py-3 sm:px-7">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-teal-bright">
          {journey.title}
        </p>
        <ExampleBadge label={journey.badge} />
      </div>

      {/* Vertical on phones, a left-to-right line from md up. The wires and
          their travelling pulse carry the customer from one package to the
          next. */}
      <div className="flex flex-col px-4 py-5 sm:px-6 sm:py-6 md:flex-row md:items-stretch">
        {journey.steps.map((step, i) => {
          const Icon = STEP_ICONS[step.key]
          return (
            <Fragment key={step.key}>
              {i > 0 ? (
                <div
                  className="pipe-wire mx-auto my-1 h-6 w-[3px] shrink-0 md:mx-2 md:my-0 md:h-[3px] md:w-10 md:self-center"
                  style={{ '--i': i - 1 }}
                  aria-hidden="true"
                >
                  <span className="pipe-current" />
                  <span className="pipe-pulse" />
                </div>
              ) : null}
              <div
                className="pipe-node flex flex-1 flex-col rounded-2xl border-2 border-teal-deep/10 bg-cream p-4"
                style={{ '--i': i }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal-deep text-cream">
                    <Icon size={20} />
                  </span>
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.13em] text-ink-muted">
                    {i + 1} · {step.tag}
                  </span>
                </div>
                <p className="mt-3 font-display text-[1.05rem] font-semibold leading-snug text-teal-deep">
                  {step.title}
                </p>
                <div className="mt-auto pt-3">
                  <StepPreview step={step} />
                </div>
              </div>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}

/* ── The hero ───────────────────────────────────────────────────────────── */

export function Hero() {
  const leadWords = hero.title[0].trim().split(/\s+/).length

  return (
    <section
      id="hero"
      className="relative z-10 overflow-hidden bg-teal-deep px-5 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-32"
    >
      {/* Depth, back to front: the light pool, the drifting colour fields,
          the sweep, then the vignette and floor that close the room in. */}
      <div className="hero-atmos" aria-hidden="true">
        <span className="hero-spot" />
        <span
          className="hero-aurora"
          style={{
            background: 'var(--color-teal-bright)',
            opacity: 0.38,
            width: '46vw',
            height: '46vw',
            left: '-8vw',
            top: '-14vw',
            '--ax': '9%',
            '--ay': '12%',
            '--as': 1.2,
            '--ad': '19s',
          }}
        />
        <span
          className="hero-aurora"
          style={{
            background: 'var(--color-coral)',
            opacity: 0.2,
            width: '38vw',
            height: '38vw',
            right: '-6vw',
            top: '6vw',
            '--ax': '-8%',
            '--ay': '10%',
            '--as': 1.14,
            '--ad': '24s',
          }}
        />
        <span
          className="hero-aurora"
          style={{
            background: 'var(--color-teal-soft)',
            opacity: 0.18,
            width: '52vw',
            height: '34vw',
            left: '22vw',
            bottom: '-16vw',
            '--ax': '-6%',
            '--ay': '-9%',
            '--as': 1.16,
            '--ad': '28s',
          }}
        />
        <span className="hero-sweep" />
        <span className="hero-vignette" />
        <span className="hero-floor" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p
          className="rise-step inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-teal-soft backdrop-blur-sm"
          style={{ '--i': 0 }}
        >
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-coral" aria-hidden="true" />
          {hero.eyebrow}
        </p>

        {/* Sized so "A digital services studio" holds one line on desktop and
            the nowrap accent fits a 360px phone. Below 360 the accent is
            allowed to wrap rather than run off the screen. */}
        <h1 className="mt-6 text-balance font-normal leading-[0.98] tracking-[-0.03em] text-cream [font-size:clamp(2.4rem,6.6vw,4.75rem)]">
          <SplitWords text={hero.title[0]} />{' '}
          <span className="min-[360px]:whitespace-nowrap">
            <span className="relative text-coral">
              <SplitWords text={hero.title[1]} start={leadWords} />
              <Squiggle />
            </span>
            {hero.title[2]}
          </span>
        </h1>

        <p
          className="rise-step mx-auto mt-7 max-w-2xl text-base leading-relaxed text-cream/80 sm:text-lg"
          style={{ '--i': 6 }}
        >
          {hero.sub}
        </p>

        <div className="rise-step mt-9 flex flex-wrap justify-center gap-3" style={{ '--i': 7 }}>
          <Magnetic>
            <a
              href={hero.ctas.primary.href}
              onClick={jumpTo(hero.ctas.primary.href)}
              className="cta-glow inline-flex min-h-12 items-center gap-2.5 rounded-full border-2 border-cream bg-coral px-7 py-3.5 font-semibold text-cream transition-transform duration-300 hover:scale-[1.04]"
            >
              {hero.ctas.primary.label}
              <IconArrow size={18} />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={hero.ctas.secondary.href}
              onClick={jumpTo(hero.ctas.secondary.href)}
              className="inline-flex min-h-12 items-center rounded-full border-2 border-cream/35 px-7 py-3.5 font-semibold text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-cream/10"
            >
              {hero.ctas.secondary.label}
            </a>
          </Magnetic>
        </div>

        <ul
          className="rise-step mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2"
          style={{ '--i': 8 }}
        >
          {hero.trust.map((t) => (
            <li key={t} className="flex items-center gap-1.5 text-sm text-cream/70">
              <IconYes size={15} className="text-coral" />
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="rise-in-late relative z-10 mx-auto mt-12 max-w-5xl sm:mt-14">
        {/* A pool of light under the card so its shadow reads as lift. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-[8%] -bottom-6 -z-10 h-24 rounded-[50%] bg-teal-bright/25 blur-3xl"
        />
        <div className="border-flow hero-card-lift" style={{ '--bf-r': '28px' }}>
          <JourneyCard />
        </div>
      </div>

      {/* The handover to the next section: a dot falling down a hairline. */}
      <div className="relative z-10 mt-11 flex justify-center sm:mt-14" aria-hidden="true">
        <span className="relative block h-14 w-px overflow-hidden bg-cream/15">
          <span className="cue-dot absolute inset-x-0 top-0 block h-4 bg-coral" />
        </span>
      </div>
    </section>
  )
}
