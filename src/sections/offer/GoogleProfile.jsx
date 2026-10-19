import { useLayoutEffect, useRef, useState } from 'react'
import { Reveal } from '../../components/Reveal'
import { IconYes } from '../../components/icons/OfferIcons'
import { ScrollTrigger, prefersReducedMotion } from '../../lib/smoothScroll'
import { google as G } from '../../content/offer'
import { ExampleBadge, QuoteButton, SectionHead } from './shared'
import './offer.css'

/**
 * The five Google jobs as an annotated phone.
 *
 * The listing on the phone is drawn in five regions, each tagged with the
 * number of the job that fixes it, like a diagram in a manual. With a job
 * off, its region shows what an unworked listing actually looks like (no
 * hours, no photos, a duplicate with the old address). Switch it on and the
 * region fills in. "Google muna" is the switch that does all five.
 *
 * On first sight it ticks the five on in order, so the listing visibly builds
 * itself. The markup and the reduced-motion state both start with all five
 * on; only a running script blanks it first, inside a layout effect, before
 * paint. A missed trigger leaves a blank listing beside a fully readable
 * list, never missing content, and the failsafe starts it if it is on screen.
 *
 * Nothing here is Google's artwork. The map, pin and layout are our own
 * drawing of a listing, and the whole phone carries the Example badge.
 */

const IDX = Object.fromEntries(G.items.map((it, i) => [it.key, i]))

/* ── The phone ──────────────────────────────────────────────────────────── */

/** Numbered tag beside a region of the listing, matching the list. */
function Region({ n, on, children }) {
  return (
    <div className="relative mt-3 pl-7">
      <span
        className={`absolute left-0 top-0.5 grid h-5 w-5 place-items-center rounded-full text-[0.6rem] font-bold transition-colors duration-300 ${
          on ? 'bg-teal-deep text-cream' : 'border-2 border-dashed border-teal-deep/30 text-teal-deep/45'
        }`}
      >
        {n}
      </span>
      {children}
    </div>
  )
}

function Missing({ children, className = '' }) {
  return (
    <div
      className={`grid place-items-center rounded-xl border-2 border-dashed border-teal-deep/20 px-3 text-center text-[0.68rem] font-semibold text-teal-deep/45 ${className}`}
    >
      {children}
    </div>
  )
}

/** The map: blocks, roads, a river, and the pin. Coral once it is claimed. */
function MapHead({ claimed }) {
  return (
    <svg viewBox="0 0 320 150" className="block h-36 w-full" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="150" fill="#dde8e6" />
      <path d="M-10 118 C 60 96, 120 140, 200 112 S 300 92, 330 104" stroke="var(--color-teal-soft)" strokeWidth="14" fill="none" />
      <rect x="18" y="16" width="62" height="40" rx="6" fill="var(--color-cream)" opacity="0.75" />
      <rect x="226" y="20" width="76" height="34" rx="6" fill="var(--color-cream)" opacity="0.75" />
      <rect x="196" y="66" width="44" height="28" rx="6" fill="var(--color-cream)" opacity="0.75" />
      <path d="M-10 70 H 330" stroke="var(--color-cream)" strokeWidth="9" />
      <path d="M110 -10 L 128 160" stroke="var(--color-cream)" strokeWidth="7" />
      <path d="M262 -10 L 248 160" stroke="var(--color-cream)" strokeWidth="5" />
      <ellipse cx="160" cy="90" rx="11" ry="3.5" fill="var(--color-teal-deep)" opacity="0.2" />
      {/* IconPin's outline at 2.4x, tip on (160, 90). */}
      <g transform="translate(131.2 38.4) scale(2.4)">
        <path
          d="M12 21.5C12 21.5 5 15.3 5 10A7 7 0 0 1 19 10C19 15.3 12 21.5 12 21.5Z"
          fill={claimed ? 'var(--color-coral)' : '#9fb3b0'}
          stroke="var(--color-cream)"
          strokeWidth="1.2"
          style={{ transition: 'fill 400ms' }}
        />
        <circle cx="12" cy="10" r="2.6" fill="var(--color-cream)" />
      </g>
    </svg>
  )
}

/** Three flat "photos": a shopfront, a product, the counter. */
function Photos() {
  return (
    <div className="offer-slot grid h-16 grid-cols-3 gap-1.5">
      <svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid slice" className="h-full w-full rounded-lg">
        <rect width="60" height="60" fill="var(--color-teal-deep)" />
        <path d="M6 22 H54 L50 14 H10 Z" fill="var(--color-coral)" />
        <rect x="12" y="26" width="16" height="34" fill="var(--color-teal-soft)" />
        <rect x="32" y="26" width="16" height="14" rx="2" fill="var(--color-cream)" opacity="0.8" />
      </svg>
      <svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid slice" className="h-full w-full rounded-lg">
        <rect width="60" height="60" fill="var(--color-teal-soft)" />
        <ellipse cx="30" cy="44" rx="22" ry="6" fill="var(--color-cream)" />
        <path d="M14 42 C 14 26, 46 26, 46 42 Z" fill="var(--color-coral)" />
        <path d="M22 34 Q 26 31 30 34 M30 32 Q 34 29 38 32" stroke="var(--color-cream)" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
      <svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid slice" className="h-full w-full rounded-lg">
        <rect width="60" height="60" fill="var(--color-teal-bright)" />
        <rect x="0" y="38" width="60" height="22" fill="var(--color-teal-deep)" />
        <circle cx="16" cy="18" r="6" fill="var(--color-cream)" opacity="0.85" />
        <circle cx="38" cy="22" r="4" fill="var(--color-cream)" opacity="0.6" />
        <rect x="26" y="30" width="22" height="8" rx="2" fill="var(--color-cream)" opacity="0.9" />
      </svg>
    </div>
  )
}

function ListingPhone({ on }) {
  const c = G.card
  const is = (key) => on[IDX[key]]
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[20rem]">
      <div className="rounded-[2.4rem] bg-teal-deep p-2.5 shadow-[0_44px_80px_-34px_rgba(15,43,41,0.6)]">
        <div className="relative overflow-hidden rounded-[1.9rem] bg-cream">
          <MapHead claimed={is('claim')} />
          <ExampleBadge label={c.badge} className="absolute right-3 top-3" />

          {/* The sheet, pulled up over the map like the real thing. */}
          <div className="relative -mt-5 rounded-t-[1.4rem] bg-cream px-4 pb-5 pt-2.5">
            <span className="mx-auto block h-1 w-10 rounded-full bg-teal-deep/15" />

            <Region n={IDX.merge + 1} on={is('merge')}>
              {is('merge') ? (
                <p key="on" className="offer-slot flex min-h-8 items-center gap-1.5 rounded-xl bg-teal-soft/30 px-3 text-[0.68rem] font-semibold text-teal-deep">
                  <IconYes size={14} />
                  {c.merged}
                </p>
              ) : (
                <p key="off" className="flex min-h-8 items-center rounded-xl bg-coral/12 px-3 py-1.5 text-[0.68rem] font-semibold leading-snug text-coral">
                  {c.duplicate}
                </p>
              )}
            </Region>

            <Region n={IDX.claim + 1} on={is('claim')}>
              <p className="font-display text-xl font-bold leading-tight text-teal-deep">{c.name}</p>
              {is('claim') ? (
                <p key="on" className="offer-slot mt-0.5 flex items-center gap-1 text-[0.68rem] font-semibold text-teal-bright">
                  <IconYes size={14} />
                  {c.claimed}
                </p>
              ) : (
                <p key="off" className="mt-0.5 text-[0.68rem] font-medium text-ink-muted underline decoration-dotted underline-offset-2">
                  {c.unclaimed}
                </p>
              )}
            </Region>

            <Region n={IDX.details + 1} on={is('details')}>
              {is('details') ? (
                <div key="on" className="offer-slot min-h-[3.25rem] space-y-0.5 text-[0.72rem] leading-snug text-teal-deep">
                  <p className="font-semibold">
                    {c.category} · {c.address}
                  </p>
                  <p>
                    <span className="font-semibold text-teal-bright">{c.hours.split(' · ')[0]}</span>
                    {' · '}
                    {c.hours.split(' · ')[1]}
                  </p>
                </div>
              ) : (
                <Missing className="min-h-[3.25rem]">{c.noDetails}</Missing>
              )}
            </Region>

            <Region n={IDX.photos + 1} on={is('photos')}>
              {is('photos') ? <Photos /> : <Missing className="h-16">{c.noPhotos}</Missing>}
            </Region>

            <Region n={IDX.posts + 1} on={is('posts')}>
              {is('posts') ? (
                <div key="on" className="offer-slot min-h-[3.25rem] rounded-xl border-2 border-teal-deep/10 px-3 py-2">
                  <p className="text-[0.72rem] font-bold text-teal-deep">{c.postTitle}</p>
                  <p className="text-[0.62rem] text-ink-muted">{c.postMeta}</p>
                </div>
              ) : (
                <Missing className="min-h-[3.25rem]">{c.noPosts}</Missing>
              )}
            </Region>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── The list ───────────────────────────────────────────────────────────── */

function Switch({ on }) {
  return (
    <span
      aria-hidden="true"
      className={`relative mt-1 inline-block h-6 w-10 shrink-0 rounded-full transition-colors duration-300 ${
        on ? 'bg-teal-bright' : 'bg-teal-deep/15'
      }`}
    >
      <span
        className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-cream shadow-[0_1px_3px_rgba(15,43,41,0.35)] transition-transform duration-300"
        style={{ transform: on ? 'translateX(16px)' : 'none' }}
      />
    </span>
  )
}

export function GoogleProfile() {
  const all = () => G.items.map(() => true)
  const none = () => G.items.map(() => false)
  const [on, setOn] = useState(all)
  const stageRef = useRef(null)
  const touched = useRef(false)

  useLayoutEffect(() => {
    const el = stageRef.current
    if (!el || prefersReducedMotion()) return
    // Blank it before paint, then build it once it is being looked at.
    setOn(G.items.map(() => false))
    const timers = []
    let played = false
    const play = () => {
      if (played || touched.current) return
      played = true
      G.items.forEach((_, i) => {
        timers.push(
          window.setTimeout(() => {
            if (touched.current) return
            setOn((prev) => prev.map((v, j) => (j === i ? true : v)))
          }, 450 + i * 620),
        )
      })
    }
    const st = ScrollTrigger.create({ trigger: el, start: 'top 70%', once: true, onEnter: play })
    const failsafe = window.setTimeout(() => {
      if (ScrollTrigger.isInViewport(el)) play()
    }, 2600)
    return () => {
      st.kill()
      window.clearTimeout(failsafe)
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  const toggle = (i) => {
    touched.current = true
    setOn((prev) => prev.map((v, j) => (j === i ? !v : v)))
  }

  const allOn = on.every(Boolean)
  const toggleAll = () => {
    touched.current = true
    setOn(allOn ? none() : all())
  }

  return (
    <section id="google" className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow={G.eyebrow} title={G.title} body={G.body} />

        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Sticky on desktop so the phone stays beside the list being read. */}
          <Reveal from={{ y: 70, rotate: -3 }} duration={1} className="lg:sticky lg:top-28">
            <div ref={stageRef}>
              <ListingPhone on={on} />
            </div>
          </Reveal>

          <div>
            <button
              type="button"
              aria-pressed={allOn}
              onClick={toggleAll}
              className={`flex w-full flex-col gap-3 rounded-[var(--radius-card)] border-2 p-5 text-left transition-colors duration-300 sm:flex-row sm:items-center sm:gap-5 sm:p-6 ${
                allOn
                  ? 'border-teal-deep bg-teal-deep text-cream'
                  : 'border-teal-deep/15 bg-teal-soft/20 text-teal-deep hover:border-teal-deep/40'
              }`}
            >
              <span>
                <span className="block font-display text-3xl font-bold leading-none">{G.muna.name}</span>
                <span className={`mt-2 block text-sm ${allOn ? 'text-cream/75' : 'text-ink-muted'}`}>
                  {G.muna.line}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`inline-flex min-h-10 items-center gap-2 self-start rounded-full px-4 text-sm font-semibold transition-colors duration-300 sm:ml-auto sm:self-center ${
                  allOn ? 'bg-coral text-cream' : 'border-2 border-teal-deep/20 text-teal-deep'
                }`}
              >
                {allOn ? <IconYes size={16} /> : null}
                {allOn ? G.muna.on : G.muna.off}
              </span>
            </button>

            <p className="mt-6 text-sm text-ink-muted">{G.pickNote}</p>

            <Reveal
              as="ul"
              from={{ x: -28 }}
              stagger={0.08}
              blur={false}
              className="mt-3 divide-y-2 divide-teal-deep/8"
            >
              {G.items.map((item, i) => (
                <li key={item.key}>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on[i]}
                    onClick={() => toggle(i)}
                    className="flex w-full items-start gap-4 rounded-2xl px-2 py-4 text-left transition-colors duration-300 hover:bg-teal-soft/15 sm:px-3"
                  >
                    <span
                      className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full font-display text-sm font-bold transition-colors duration-300 ${
                        on[i] ? 'bg-teal-deep text-cream' : 'border-2 border-dashed border-teal-deep/30 text-teal-deep/55'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-teal-deep">{item.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-ink-muted">{item.body}</span>
                    </span>
                    <Switch on={on[i]} />
                  </button>
                </li>
              ))}
            </Reveal>

            <QuoteButton className="mt-8" />
          </div>
        </div>
      </div>
    </section>
  )
}
