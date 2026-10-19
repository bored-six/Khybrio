import { useState } from 'react'
import { Reveal } from '../../components/Reveal'
import { IconCard, IconStand } from '../../components/icons/OfferIcons'
import { addOns as D } from '../../content/offer'
import { ExampleBadge, QuoteButton, SectionHead } from './shared'
import './offer.css'

/**
 * Add-ons on a ruler.
 *
 * The three bands are lengths of one measuring tape: Small gets the shortest
 * stretch, Large the longest, so "how long it takes" is read as distance
 * before anyone reads a label. Under each stretch hang the items, drawn as
 * plain hang tags with no price on them, because the band is the price:
 * every tag on one stretch costs the same. On phones the stretches stack and
 * keep their relative lengths.
 *
 * The two physical pieces sit apart in their own tray, since they are priced
 * one by one and are not part of any band. Each has a working demo: pick
 * where the card opens, or tap the stand, and the phone shows what a
 * customer would see. The URLs are invented, so each demo carries the badge.
 */

const MAX_TICKS = Math.max(...D.bands.map((b) => b.ticks))

/* ── The ruler ──────────────────────────────────────────────────────────── */

function Band({ band, i, last }) {
  return (
    <div className="min-w-0">
      {/* A stretch of tape. Major ticks every 48px, minor every 12px, and a
          boundary post at each end. Mobile width keeps the proportion. */}
      <div
        className="relative w-[var(--w)] lg:w-full"
        style={{ '--w': `${(band.ticks / MAX_TICKS) * 100}%` }}
        aria-hidden="true"
      >
        <div className="offer-ruler relative h-5 overflow-hidden border-t-2 border-teal-deep">
          <Reveal
            from={{ scaleX: 0, transformOrigin: '0% 50%' }}
            blur={false}
            duration={0.9}
            delay={i * 0.45}
            ease="power2.inOut"
            className="absolute inset-x-0 bottom-0 h-1.5 bg-teal-bright"
          />
        </div>
        <span className="absolute -top-2 left-0 h-9 w-0.5 bg-teal-deep" />
        <span className={`absolute -top-2 right-0 h-9 w-0.5 bg-teal-deep ${last ? '' : 'lg:hidden'}`} />
      </div>

      <div className="mt-5 lg:pr-8">
        <h3 className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-display text-3xl font-bold text-teal-deep">{band.name}</span>
          <span className="font-body text-sm font-medium tracking-normal text-ink-muted">{band.effort}</span>
        </h3>
        <p className="mt-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-teal-bright">
          {D.samePrice}
        </p>
        <Reveal
          as="ul"
          from={{ y: -14, rotate: -4, transformOrigin: '0% 50%' }}
          stagger={0.07}
          blur={false}
          delay={0.2 + i * 0.3}
          className="mt-4 flex flex-wrap gap-2 lg:flex-col lg:items-start"
        >
          {band.items.map((item) => (
            <li
              key={item}
              className="offer-tag relative rounded-r-lg bg-teal-soft/40 py-2 pl-7 pr-3.5 text-sm font-medium leading-snug text-teal-deep"
            >
              {/* the punched hole */}
              <span
                aria-hidden="true"
                className="absolute left-[13px] top-[calc(50%-4px)] h-2 w-2 rounded-full bg-cream"
              />
              {item}
            </li>
          ))}
        </Reveal>
      </div>
    </div>
  )
}

/* ── The physical pieces ────────────────────────────────────────────────── */

/** Two tap waves and the chip, cut from IconCard. */
function TapWaves({ className = '' }) {
  return (
    <svg viewBox="12 5 12 14" className={className} fill="none" aria-hidden="true">
      <circle cx="14.5" cy="12" r="1.6" fill="currentColor" />
      <path d="M17.6 9.4A4 4 0 0 1 17.6 14.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20.6 6.9A8 8 0 0 1 20.6 17.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** The coral sash every Khybrio-made piece carries. A hard-stop stripe, not
 *  a decorative gradient. */
const SASH = (deg, from, to) => ({
  background: `linear-gradient(${deg}deg, transparent ${from}%, var(--color-coral) ${from}%, var(--color-coral) ${to}%, transparent ${to}%)`,
})

function CardFace({ face }) {
  return (
    <div className="relative h-[5.4rem] w-[8.5rem] overflow-hidden rounded-xl bg-teal-deep p-2.5 shadow-[0_16px_30px_-14px_rgba(15,43,41,0.6)] sm:h-28 sm:w-44 sm:p-3.5">
      <span className="pointer-events-none absolute inset-0" style={SASH(118, 72, 84)} />
      <div className="relative flex h-full flex-col justify-between">
        <span className="font-display text-xs font-bold text-cream sm:text-sm">{face.name}</span>
        <div className="flex items-end justify-between">
          <span className="text-[0.45rem] font-semibold uppercase tracking-[0.14em] text-cream/75 sm:text-[0.5rem]">
            {face.hint}
          </span>
          <TapWaves className="h-4 w-4 text-cream sm:h-5 sm:w-5" />
        </div>
      </div>
    </div>
  )
}

function StandFace({ face }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-36 w-[6.6rem] overflow-hidden rounded-b-md rounded-t-2xl bg-teal-deep p-2.5 shadow-[0_16px_30px_-14px_rgba(15,43,41,0.6)]">
        <span className="pointer-events-none absolute inset-0" style={SASH(152, 80, 92)} />
        <div className="relative flex h-full flex-col items-center text-center">
          <span className="font-display text-[0.72rem] font-bold leading-tight text-cream">{face.name}</span>
          {/* Waves and hint sit high; the bottom corner belongs to the sash. */}
          <TapWaves className="mt-5 h-7 w-7 text-cream" />
          <span className="mt-1.5 whitespace-nowrap text-[0.45rem] font-semibold uppercase tracking-[0.08em] text-cream/80">
            {face.hint}
          </span>
        </div>
      </div>
      {/* the foot */}
      <span className="h-2.5 w-[7.6rem] rounded-b-lg bg-teal-deep/85" />
      <span className="mt-1 h-1.5 w-28 rounded-[50%] bg-teal-deep/15" />
    </div>
  )
}

/**
 * A small phone. Keyed by the tap from outside, so each tap remounts it: the
 * phone nudges toward the piece, the ripple spreads, the screen lands.
 */
function MiniPhone({ children }) {
  return (
    <div className="offer-tap shrink-0" style={{ '--tx': '-12px', '--ty': '-3px' }}>
      <div className="relative h-[10.5rem] w-24 rounded-[1.15rem] bg-teal-deep p-1 shadow-[0_18px_34px_-16px_rgba(15,43,41,0.6)] sm:h-48 sm:w-28">
        <span className="absolute left-[calc(50%-12px)] top-1.5 z-10 h-1 w-6 rounded-full bg-cream/25" />
        <div className="h-full overflow-hidden rounded-[0.9rem] bg-cream">{children}</div>
        <span className="offer-ripple pointer-events-none absolute left-[calc(50%-2rem)] top-[calc(50%-2rem)] h-16 w-16 rounded-full border-2 border-coral" />
      </div>
    </div>
  )
}

function PieceHead({ Icon, name, line }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-deep text-cream">
          <Icon size={22} />
        </span>
        <h4 className="font-display text-xl font-bold text-teal-deep">{name}</h4>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{line}</p>
    </div>
  )
}

function CardPiece() {
  const c = D.physical.card
  const [dest, setDest] = useState(2)
  const [taps, setTaps] = useState(0)
  const d = c.destinations[dest]

  const choose = (i) => {
    setDest(i)
    setTaps((t) => t + 1)
  }

  return (
    <div className="flex flex-col rounded-[var(--radius-card)] bg-cream p-5 sm:p-6">
      <PieceHead Icon={IconCard} name={c.name} line={c.line} />

      <div className="relative mt-6 flex items-center justify-center gap-4 rounded-2xl bg-teal-soft/15 px-3 pb-6 pt-12 sm:gap-7 sm:pt-8" aria-hidden="true">
        <ExampleBadge label={D.physical.badge} className="absolute right-2.5 top-2.5" />
        <CardFace face={c.face} />
        <MiniPhone key={`${d.key}-${taps}`}>
          <div className="offer-screen flex h-full flex-col p-2 pt-4">
            <p className="truncate rounded-full bg-teal-soft/40 px-1.5 py-0.5 text-[0.45rem] font-medium text-teal-deep/80">
              {d.url}
            </p>
            <p className="mt-2 font-display text-[0.8rem] font-bold leading-tight text-teal-deep">{d.label}</p>
            <span className="mt-1.5 block h-1.5 w-4/5 rounded-full bg-teal-deep/12" />
            <span className="mt-1 block h-1.5 w-3/5 rounded-full bg-teal-deep/12" />
            <div className="mt-auto grid grid-cols-2 gap-1">
              {[0, 1, 2, 3].map((n) => (
                <span key={n} className={`h-6 rounded-md ${n === 1 ? 'bg-coral/70' : 'bg-teal-soft/45'}`} />
              ))}
            </div>
          </div>
        </MiniPhone>
      </div>

      <p className="mt-5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-teal-bright">
        {c.pickLabel}
      </p>
      <div role="group" aria-label={c.pickLabel} className="mt-2.5 flex flex-wrap gap-2">
        {c.destinations.map((x, i) => (
          <button
            key={x.key}
            type="button"
            aria-pressed={i === dest}
            onClick={() => choose(i)}
            className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-colors duration-300 ${
              i === dest
                ? 'bg-teal-deep text-cream'
                : 'border-2 border-teal-deep/15 text-teal-deep hover:border-teal-deep/40'
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {c.opens}: {d.url}
      </p>
    </div>
  )
}

function StandPiece() {
  const s = D.physical.stand
  const [taps, setTaps] = useState(0)

  return (
    <div className="flex flex-col rounded-[var(--radius-card)] bg-cream p-5 sm:p-6">
      <PieceHead Icon={IconStand} name={s.name} line={s.line} />

      <div className="relative mt-6 flex items-center justify-center gap-4 rounded-2xl bg-teal-soft/15 px-3 pb-6 pt-12 sm:gap-7 sm:pt-8">
        <ExampleBadge label={D.physical.badge} className="absolute right-2.5 top-2.5" />
        {/* The stand is the control: tap it. */}
        <button
          type="button"
          onClick={() => setTaps((t) => t + 1)}
          aria-label={`${s.tap}. ${s.opens}`}
          className="rounded-2xl p-1.5 transition-transform duration-300 hover:-translate-y-0.5"
        >
          <StandFace face={s.face} />
        </button>
        <div aria-hidden="true">
          <MiniPhone key={taps}>
            <div className="offer-screen flex h-full flex-col p-2 pt-4">
              <p className="font-display text-[0.72rem] font-bold leading-tight text-teal-deep">
                {s.screen.title}
              </p>
              <div className="mt-2 flex-1 rounded-md border border-teal-deep/15 p-1.5 text-[0.48rem] leading-snug text-ink-muted">
                {s.screen.field}
              </div>
              <span className="mt-1.5 rounded-md bg-teal-deep py-1 text-center text-[0.5rem] font-semibold text-cream">
                {s.screen.button}
              </span>
            </div>
          </MiniPhone>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setTaps((t) => t + 1)}
        className="mt-5 inline-flex min-h-11 items-center self-start rounded-full border-2 border-teal-deep/15 px-4 text-sm font-semibold text-teal-deep transition-colors hover:border-teal-deep/40"
      >
        {s.tap}
      </button>
    </div>
  )
}

/* ── The section ────────────────────────────────────────────────────────── */

export function AddOns() {
  return (
    <section id="add-ons" className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow={D.eyebrow} title={D.title} body={D.body} />

        <div
          className="mt-14 grid gap-12 lg:grid-cols-[var(--cols)] lg:gap-0"
          style={{ '--cols': D.bands.map((b) => `${b.ticks}fr`).join(' ') }}
        >
          {D.bands.map((band, i) => (
            <Band key={band.key} band={band} i={i} last={i === D.bands.length - 1} />
          ))}
        </div>

        <div className="mt-20 rounded-[32px] bg-teal-soft/25 p-5 sm:p-8 lg:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
              {D.physical.eyebrow}
            </p>
            <h3 className="mt-2 font-display text-2xl font-bold text-teal-deep sm:text-3xl">
              {D.physical.title}
            </h3>
            <p className="mt-3 leading-relaxed text-ink-muted">{D.physical.body}</p>
          </div>
          <Reveal
            from={{ y: 50, rotate: (i) => (i === 0 ? -2 : 2) }}
            stagger={0.12}
            className="mt-8 grid gap-4 lg:grid-cols-2"
          >
            <CardPiece />
            <StandPiece />
          </Reveal>
        </div>

        <div className="mt-12 flex justify-center">
          <QuoteButton label={D.cta} />
        </div>
      </div>
    </section>
  )
}
