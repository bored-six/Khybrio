import { Check, ArrowRight } from 'lucide-react'
import { Magnetic } from '../components/Magnetic'
import { FlowMachine } from '../components/FlowMachine'
import { scrollToId } from '../lib/smoothScroll'
import { hero, runLog } from '../content/site'

/**
 * The opening chamber — editorial structure on the brand's own dark teal.
 *
 * The cream broadsheet version of this hero read as another site's page
 * stapled onto Khybrio; the identity here is teal-deep first. So the Wispr
 * playbook stays (serif commanding through scale at weight 400, a floating
 * pill nav, one accent colour doing all the pointing) but the room is dark,
 * which also restores the page's alternation: dark hero → cream problem →
 * dark flight.
 *
 * The room is LIT, not filled. Three drifting aurora fields alone averaged
 * out to the same teal they sat on, so the panel read as paint with type on
 * it: a spot above the headline, a vignette closing the corners, a darker
 * floor under the machine and a slow sweep across the whole thing are what
 * give it a near-far axis. See "Hero lighting" in index.css.
 *
 * Entrances are CSS (`rise-in`, `rise-step`, `word-rise`), not Motion — the
 * headline and machine are the two things a visitor must see, and a JS
 * entrance that starts at opacity 0 leaves both invisible wherever the frame
 * loop is throttled. CSS keyframes run off the compositor's own clock, so
 * they still finish and hold their end state in a background tab.
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
 * A stray task chip drifting at the hero's edge — the "before" litter.
 *
 * These used to be cream-on-teal at 8% and read as smudges on the panel. They
 * carry a real cost line now and sit on their own darker glass, because the
 * point they make — this is what the week currently costs — only lands if you
 * can read them.
 *
 * `show` is per-chip and never goes below xl: legible chips need real gutter,
 * and below 1280 the hero's side margins are narrower than a chip, so they
 * land on the CTA row instead of beside it.
 */
function DriftChip({ className, show = 'xl:block', tilt, label, body, cost, delay }) {
  return (
    <div
      className={`float-drift pointer-events-none absolute hidden max-w-[15.5rem] rounded-2xl border border-cream/20 bg-teal-deep/60 px-4 py-3 shadow-[0_22px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-md ${show} ${className}`}
      style={{ '--tilt': tilt, animationDelay: delay }}
      aria-hidden="true"
    >
      <p className="flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-coral">
        <span className="h-1.5 w-1.5 rounded-full bg-coral" />
        {label}
      </p>
      <p className="mt-1 text-[0.82rem] font-medium leading-snug text-cream/85">{body}</p>
      <p className="mt-1.5 text-[0.7rem] text-cream/45 line-through decoration-coral/60">
        {runLog.byHandLabel}: {cost}
      </p>
    </div>
  )
}

/**
 * The headline, split so each word can lift on its own beat.
 *
 * `start` continues the index across the copy fragments, so the stagger runs
 * left-to-right through the whole line rather than restarting at the accent.
 * The separating spaces are plain text nodes BETWEEN the spans, never inside
 * them: a word that owns its trailing space inside an inline-block can't be
 * broken there, and the lead fragment has to stay free to wrap on mobile.
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

export function Hero() {
  const go = (href) => (e) => {
    e.preventDefault()
    scrollToId(href.slice(1))
  }

  const leadWords = hero.title[0].trim().split(' ').length

  return (
    <section
      id="hero"
      className="relative z-10 overflow-hidden bg-teal-deep px-5 pb-10 pt-28 sm:px-8 sm:pb-14 sm:pt-32"
    >
      {/* Depth behind the headline, back to front: the light pool, the drifting
          colour fields, the sweep, then the vignette and floor that close the
          room in. Sizes are in vw/vh so everything scales with the panel
          instead of pooling in a corner on wide screens. */}
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

      {/* Kept to the hero's gutters — at 4xl the headline owns the middle
          band, so the chips sit high-right and low-left where it never is. */}
      <DriftChip
        className="left-[3%] top-[36%]"
        tilt="-7deg"
        delay="0s"
        label={runLog.flows[0].label}
        body={runLog.flows[0].trigger}
        cost={runLog.flows[0].byHand}
      />
      <DriftChip
        className="right-[4%] top-[12%]"
        tilt="5deg"
        delay="1.4s"
        label={runLog.flows[1].label}
        body={runLog.flows[1].trigger}
        cost={runLog.flows[1].byHand}
      />
      {/* The third one waits for 2xl. It sits level with the CTA row, which is
          the busiest band in the hero — there has to be clear air beside the
          buttons before it earns its place. It also stops at 44%: the machine
          card's top edge is at roughly 57% of the section and its gutters are
          narrower than a chip, so anything lower lands on the card. */}
      <DriftChip
        className="right-[5%] top-[44%]"
        show="2xl:block"
        tilt="-4deg"
        delay="2.6s"
        label={runLog.flows[3].label}
        body={runLog.flows[3].trigger}
        cost={runLog.flows[3].byHand}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p
          className="rise-step inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-4 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-teal-soft backdrop-blur-sm"
          style={{ '--i': 0 }}
        >
          <span className="live-dot h-1.5 w-1.5 rounded-full bg-coral" aria-hidden="true" />
          {hero.eyebrow}
        </p>

        <h1 className="mt-6 font-normal leading-[0.95] tracking-[-0.03em] text-cream [font-size:clamp(2.9rem,7.5vw,5.6rem)]">
          <SplitWords text={hero.title[0]} />{' '}
          {/* The punctuation rides inside the nowrap group so it can never
              wrap onto a line of its own. */}
          <span className="whitespace-nowrap">
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
              onClick={go(hero.ctas.primary.href)}
              className="cta-glow inline-flex items-center gap-2 rounded-full border-2 border-cream bg-coral px-7 py-3.5 font-semibold text-cream transition-transform duration-300 hover:scale-[1.04]"
            >
              {hero.ctas.primary.label}
              <ArrowRight size={17} strokeWidth={2.4} />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={hero.ctas.secondary.href}
              onClick={go(hero.ctas.secondary.href)}
              className="inline-block rounded-full border-2 border-cream/35 px-7 py-3.5 font-semibold text-cream backdrop-blur-sm transition-colors duration-300 hover:bg-cream/10"
            >
              {hero.ctas.secondary.label}
            </a>
          </Magnetic>
        </div>

        <div
          className="rise-step mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2"
          style={{ '--i': 8 }}
        >
          {hero.trust.map((t) => (
            <span key={t} className="flex items-center gap-1.5 text-sm text-cream/70">
              <Check size={14} strokeWidth={2.6} color="var(--color-coral)" />
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="rise-in-late relative z-10 mx-auto mt-12 max-w-5xl sm:mt-14">
        {/* A pool of light on the floor under the card, so the shadow reads as
            the card being lifted rather than a dark rectangle behind it. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-[8%] -bottom-6 -z-10 h-24 rounded-[50%] bg-teal-bright/25 blur-3xl"
        />
        {/* The animated ring is the machine's border now. */}
        <div className="border-flow hero-card-lift" style={{ '--bf-r': '32px' }}>
          <FlowMachine />
        </div>
      </div>

      {/* The band under the card was dead teal. A hairline with a dot falling
          down it carries the handover instead — unlabelled on purpose: the
          next section's own eyebrow is already on screen by the time this is,
          and naming it here just printed the same words twice. */}
      <div className="relative z-10 mt-11 flex justify-center sm:mt-14" aria-hidden="true">
        <span className="relative block h-14 w-px overflow-hidden bg-cream/15">
          <span className="cue-dot absolute inset-x-0 top-0 block h-4 bg-coral" />
        </span>
      </div>
    </section>
  )
}
