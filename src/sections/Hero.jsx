import { Fragment, useEffect, useRef, useState } from 'react'
import { Magnetic } from '../components/Magnetic'
import { IconArrow, IconFlow, IconPin, IconSite, IconYes } from '../components/icons/OfferIcons'
import { ExampleBadge } from './offer/shared'
import { jumpTo } from './offer/anchor'
import { hero } from '../content/offer'
import './hero.css'

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

/* ── The live line ──────────────────────────────────────────────────────── */

/** Signal cycle and its start, shared by the CSS (as --lt / --l0) and the
 *  tile timing below, so the flashes land exactly when the signal does. */
const LIVE_CYCLE = 4.4
const LIVE_START = 2.6
/** Share of the cycle the signal spends travelling (cable-run's 72%). */
const LIVE_TRAVEL = 0.72

/** Layout box of `el` relative to `root`, from offsets, so the CSS entrance
 *  transforms running on the card and headline never skew the route. */
function boxIn(el, root) {
  let x = 0
  let y = 0
  let n = el
  while (n && n !== root) {
    x += n.offsetLeft
    y += n.offsetTop
    n = n.offsetParent
  }
  if (n !== root) return null
  return { x, y, w: el.offsetWidth, h: el.offsetHeight }
}

/** A tiny path builder that keeps a running length, so the tile flashes can
 *  be timed off where along the cable each tile sits. */
function tracer() {
  let d = ''
  let len = 0
  let px = 0
  let py = 0
  const marks = []
  return {
    M(x, y) {
      d += `M${x.toFixed(1)} ${y.toFixed(1)}`
      px = x
      py = y
    },
    L(x, y) {
      d += `L${x.toFixed(1)} ${y.toFixed(1)}`
      len += Math.hypot(x - px, y - py)
      px = x
      py = y
    },
    /** Rounded corner: quadratic through the corner point (cx, cy). */
    Q(cx, cy, x, y) {
      d += `Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`
      let lx = px
      let ly = py
      for (let i = 1; i <= 12; i++) {
        const t = i / 12
        const qx = (1 - t) ** 2 * px + 2 * (1 - t) * t * cx + t * t * x
        const qy = (1 - t) ** 2 * py + 2 * (1 - t) * t * cy + t * t * y
        len += Math.hypot(qx - lx, qy - ly)
        lx = qx
        ly = qy
      }
      px = x
      py = y
    },
    mark() {
      marks.push(len)
    },
    done: () => ({ d, len, marks, end: { x: px, y: py } }),
  }
}

/**
 * Builds the cable route from live layout. Two shapes:
 *  - row (md up): underline → margin → down → a bus just above the step
 *    cards, with a V that dips onto the top of each icon tile;
 *  - stack (phones): underline → margin → straight down the margin, with a
 *    V that reaches in to the left edge of each icon tile.
 * Returns null when anything is missing, and the hero simply keeps its
 * static pipe wires.
 */
function routeCable(section, accent, card, tiles) {
  if (!section || !accent || !card || tiles.some((t) => !t)) return null
  // Below 360px the accent may wrap and the underline is no longer one line.
  if (section.offsetWidth < 360) return null
  const a = boxIn(accent, section)
  const c = boxIn(card, section)
  const ts = tiles.map((t) => boxIn(t, section))
  if (!a || !c || ts.some((t) => !t)) return null

  const em = parseFloat(getComputedStyle(accent).fontSize) || 40
  // The squiggle's first point: x 2/100, y 8/12 of a 0.22em box sitting
  // 0.12em below the accent.
  const x0 = a.x + a.w * 0.02
  const y0 = a.y + a.h + 0.12 * em - 0.22 * em * (4 / 12)
  const gx = Math.max(8, c.x / 2)
  if (x0 - gx < 24) return null

  const p = tracer()
  const stacked = ts[1].y > ts[0].y + ts[0].h
  const V = 9 // half-width of each dip

  if (!stacked) {
    const busY = ts[0].y - 30
    const r = Math.min(30, (x0 - gx) / 2, (busY - y0) / 2)
    if (r < 6) return null
    p.M(x0, y0)
    p.L(gx + r, y0)
    p.Q(gx, y0, gx, y0 + r)
    p.L(gx, busY - r)
    p.Q(gx, busY, gx + r, busY)
    for (const t of ts) {
      const tx = t.x + t.w / 2
      p.L(tx - V, busY)
      p.L(tx, t.y - 1)
      p.mark()
      p.L(tx + V, busY)
    }
    p.L(c.x + c.w - 22, busY)
  } else {
    const r = Math.min(22, (x0 - gx) / 2)
    p.M(x0, y0)
    p.L(gx + r, y0)
    p.Q(gx, y0, gx, y0 + r)
    for (const t of ts) {
      const ty = t.y + t.h / 2
      p.L(gx, ty - V)
      p.L(t.x - 1, ty)
      p.mark()
      p.L(gx, ty + V)
    }
    const last = ts[ts.length - 1]
    p.L(gx, last.y + last.h / 2 + 46)
  }

  const { d, len, marks, end } = p.done()
  // The signal is ~72px long whatever the route, in pathLength units.
  const ld = Math.min(140, Math.max(28, (72 / len) * 1000))
  const travel = LIVE_CYCLE * LIVE_TRAVEL
  const pings = marks.map(
    (m) => `${(LIVE_START + (travel * ((m / len) * 1000)) / (1000 + ld)).toFixed(3)}s`,
  )
  return { d, ld: ld.toFixed(1), pings, start: { x: x0, y: y0 }, end }
}

/**
 * Measures the route and keeps it current. A ResizeObserver on the section
 * covers first layout, font swap (the headline re-measures) and resizes; the
 * state only changes when the path string does, so it never loops.
 */
function useCable(section, accent, card, tiles) {
  const [cable, setCable] = useState(null)
  useEffect(() => {
    const el = section.current
    if (!el || typeof ResizeObserver === 'undefined') return
    let frame = 0
    const measure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const next = routeCable(el, accent.current, card.current, tiles.current)
        setCable((prev) => (prev?.d === next?.d ? prev : next))
      })
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    document.fonts?.ready.then(measure)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [section, accent, card, tiles])
  return cable
}

/** The cable, its glow, the travelling signal, and its two terminals. */
function LiveLine({ cable }) {
  return (
    <svg className="cable-line" aria-hidden="true" style={{ '--ld': cable.ld }}>
      <path
        className="cable-base"
        d={cable.d}
        pathLength="1000"
        fill="none"
        stroke="var(--color-coral)"
        strokeOpacity="0.7"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="cable-glow"
        d={cable.d}
        pathLength="1000"
        fill="none"
        stroke="var(--color-coral)"
        strokeOpacity="0.28"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="cable-pulse"
        d={cable.d}
        pathLength="1000"
        fill="none"
        stroke="var(--color-coral)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        className="cable-ring"
        cx={cable.start.x}
        cy={cable.start.y}
        r="4"
        fill="none"
        stroke="var(--color-coral)"
        strokeWidth="1.5"
      />
      <circle
        className="cable-dot"
        cx={cable.start.x}
        cy={cable.start.y}
        r="4"
        fill="var(--color-coral)"
      />
      <circle
        className="cable-end"
        cx={cable.end.x}
        cy={cable.end.y}
        r="3.5"
        fill="var(--color-cream)"
        stroke="var(--color-coral)"
        strokeWidth="2"
      />
    </svg>
  )
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

function JourneyCard({ tiles, pings }) {
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
                  <span
                    ref={(el) => {
                      tiles.current[i] = el
                    }}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal-deep text-cream ${
                      pings ? 'cable-tile' : ''
                    }`}
                    style={pings ? { '--ping': pings[i] } : undefined}
                  >
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
  const section = useRef(null)
  const accent = useRef(null)
  const card = useRef(null)
  const tiles = useRef([])
  const cable = useCable(section, accent, card, tiles)

  return (
    <section
      ref={section}
      id="hero"
      data-live={cable ? '' : undefined}
      style={{ '--lt': `${LIVE_CYCLE}s`, '--l0': `${LIVE_START}s` }}
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
            <span ref={accent} className="relative text-coral">
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
        <div ref={card} className="border-flow hero-card-lift" style={{ '--bf-r': '28px' }}>
          <JourneyCard tiles={tiles} pings={cable?.pings} />
        </div>
      </div>

      {/* Measured after layout; until then (and without JS) the card's own
          pipe wires carry the connection. */}
      {cable ? <LiveLine cable={cable} /> : null}

      {/* The handover to the next section: a dot falling down a hairline. */}
      <div className="relative z-10 mt-11 flex justify-center sm:mt-14" aria-hidden="true">
        <span className="relative block h-14 w-px overflow-hidden bg-cream/15">
          <span className="cue-dot absolute inset-x-0 top-0 block h-4 bg-coral" />
        </span>
      </div>
    </section>
  )
}
