import { useEffect, useRef, useState } from 'react'
import { Reveal } from '../../components/Reveal'
import { IconFlow, IconNo, IconPin, IconYes } from '../../components/icons/OfferIcons'
import { ScrollTrigger, prefersReducedMotion } from '../../lib/smoothScroll'
import { quoteCta, websites as W } from '../../content/offer'
import { ExampleBadge, QuoteButton, SectionHead } from './shared'
import { jumpTo } from './anchor'
import './offer.css'

/**
 * Website packages as a site that builds itself.
 *
 * Pick a package and the example site on the right changes to match: page
 * tabs pop into its nav (3, 6, 10), the booking widget slots into the space
 * Starter leaves empty, the payment step lands for Premium, and the Google
 * link and automations dock underneath. The empty slots stay drawn as dashed
 * outlines naming the package that fills them, so the difference between
 * tiers is visible as missing pieces rather than read off a list.
 *
 * On first sight it plays Starter to Premium once, so a visitor who never
 * touches it still sees it assemble. Any click hands it over for good.
 * Scanners get the full table underneath, synced to the same choice.
 *
 * The mock is aria-hidden: everything it shows is in the panel and the table,
 * which is what a screen reader should get.
 */

const AUTOMATIONS_BY_TIER = [0, 1, 3]

/* ── The tier picker ────────────────────────────────────────────────────── */

function TierPicker({ idx, onPick }) {
  const refs = useRef([])

  const onKeyDown = (e) => {
    const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
    if (!dir) return
    e.preventDefault()
    const next = (idx + dir + W.tiers.length) % W.tiers.length
    onPick(next)
    refs.current[next]?.focus()
  }

  return (
    <div
      role="radiogroup"
      aria-label={W.pickerLabel}
      onKeyDown={onKeyDown}
      className="relative grid grid-cols-3 rounded-full bg-cream/10 p-1.5 ring-1 ring-cream/15"
    >
      {/* The coral slider. Inline transform only, no translate utility, so
          the two never compose. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-1.5 left-1.5 w-[calc((100%-0.75rem)/3)] rounded-full bg-coral transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(${idx * 100}%)` }}
      />
      {W.tiers.map((t, i) => (
        <button
          key={t.key}
          ref={(el) => {
            refs.current[i] = el
          }}
          type="button"
          role="radio"
          aria-checked={i === idx}
          tabIndex={i === idx ? 0 : -1}
          onClick={() => onPick(i)}
          className={`relative z-10 min-h-11 rounded-full px-2 font-semibold transition-colors duration-300 sm:text-lg ${
            i === idx ? 'text-cream' : 'text-cream/65 hover:text-cream'
          }`}
        >
          {t.name}
        </button>
      ))}
    </div>
  )
}

/* ── The panel: what this package is ────────────────────────────────────── */

function TierPanel({ tier }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-soft">
        {tier.pagesLabel}
      </p>
      <h3 className="mt-2 font-display text-[clamp(2.6rem,6vw,4rem)] font-normal leading-none text-cream">
        {tier.name}
      </h3>
      <p className="mt-4 max-w-md leading-relaxed text-cream/75">{tier.line}</p>

      <p className="mt-8 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-cream/50">
        {tier.addsLabel}
      </p>
      {/* Keyed so the list replays its stagger on every switch. */}
      <ul key={tier.key} className="mt-3 space-y-3">
        {tier.adds.map((a, i) => (
          <li key={a} className="offer-slot flex items-start gap-3 text-cream" style={{ '--i': i }}>
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-coral/20 text-coral">
              <IconYes size={15} />
            </span>
            <span className="leading-snug">{a}</span>
          </li>
        ))}
      </ul>

      <QuoteButton className="mt-9" />
    </div>
  )
}

/* ── The example site ───────────────────────────────────────────────────── */

function EmptySlot({ label, className = '' }) {
  return (
    <div
      className={`grid place-items-center rounded-2xl border-2 border-dashed border-teal-deep/20 p-3 text-center text-[0.7rem] font-semibold leading-snug text-teal-deep/45 ${className}`}
    >
      {label}
    </div>
  )
}

function Booking() {
  const b = W.mock.booking
  return (
    <div className="offer-slot min-h-[9.5rem] rounded-2xl border-2 border-teal-deep/10 p-3.5">
      <p className="text-xs font-bold text-teal-deep">{b.title}</p>
      <div className="mt-2.5 grid grid-cols-5 gap-1">
        {b.days.map((d, i) => (
          <span
            key={d}
            className={`rounded-md py-1 text-center text-[0.6rem] font-semibold ${
              i === 2 ? 'bg-teal-deep text-cream' : 'bg-teal-soft/30 text-teal-deep'
            }`}
          >
            {d}
          </span>
        ))}
      </div>
      <div className="mt-1.5 grid grid-cols-3 gap-1">
        {b.times.map((t, i) => (
          <span
            key={t}
            className={`rounded-md py-1 text-center text-[0.6rem] font-semibold ${
              i === 1 ? 'bg-coral text-cream' : 'border border-teal-deep/15 text-teal-deep'
            }`}
          >
            {t}
          </span>
        ))}
      </div>
      <span className="mt-2.5 block rounded-lg bg-teal-deep py-1.5 text-center text-[0.65rem] font-semibold text-cream">
        {b.button}
      </span>
    </div>
  )
}

function Payment() {
  const p = W.mock.payment
  return (
    <div className="offer-slot min-h-[4.25rem] rounded-2xl border-2 border-teal-deep/10 px-3.5 py-3">
      <p className="text-xs font-bold text-teal-deep">{p.title}</p>
      <ol className="mt-2 flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {p.steps.map((s, i) => (
          <li key={s} className="flex items-center gap-1.5">
            {i > 0 ? <span className="h-0.5 w-3 bg-teal-deep/20 sm:w-5" aria-hidden="true" /> : null}
            <span
              className={`grid h-4 w-4 place-items-center rounded-full text-cream ${
                i === p.steps.length - 1 ? 'bg-coral' : 'bg-teal-bright'
              }`}
            >
              <IconYes size={11} />
            </span>
            <span className="text-[0.62rem] font-semibold text-teal-deep">{s}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

function SiteMock({ idx }) {
  const m = W.mock
  const tier = W.tiers[idx]
  const hasBooking = idx >= 1
  const hasPayment = idx >= 2
  const autos = AUTOMATIONS_BY_TIER[idx]

  return (
    <div aria-hidden="true">
      <div className="overflow-hidden rounded-[22px] bg-cream shadow-[0_44px_90px_-34px_rgba(0,0,0,0.75)]">
        {/* Address bar */}
        <div className="flex items-center gap-3 border-b-2 border-teal-deep/10 bg-teal-soft/30 px-3 py-2.5 sm:px-4">
          <span className="min-w-0 flex-1 truncate rounded-full bg-cream px-3 py-1 text-[0.7rem] font-medium text-teal-deep/70">
            {m.url}
          </span>
          <ExampleBadge label={m.badge} />
        </div>

        {/* The site's own nav. Tabs keyed by name, so going up a package
            mounts only the new ones, and only they pop in. */}
        <div className="flex flex-wrap items-center gap-1.5 border-b-2 border-teal-deep/8 px-3 py-2.5 sm:px-4">
          {m.pages.slice(0, tier.pages).map((p, i) => (
            <span
              key={p}
              className="offer-pop rounded-md bg-teal-soft/30 px-2 py-1 text-[0.62rem] font-semibold text-teal-deep"
              style={{ '--i': Math.max(0, i - 3) }}
            >
              {p}
            </span>
          ))}
          <span className="ml-auto pl-1 text-[0.62rem] font-medium text-ink-muted">
            {tier.pagesLabel}
          </span>
        </div>

        <div className="space-y-3 p-3 sm:p-4">
          {/* Every package: the opener and the contact buttons. */}
          <div className="rounded-2xl bg-teal-deep p-4 sm:p-5">
            <p className="font-display text-lg font-bold text-cream sm:text-xl">{m.name}</p>
            <p className="mt-1 text-[0.7rem] text-cream/70">{m.line}</p>
            <div className="mt-3 flex gap-2">
              {m.buttons.map((b, i) => (
                <span
                  key={b}
                  className={`rounded-full px-3.5 py-1.5 text-[0.65rem] font-semibold ${
                    i === 0 ? 'bg-coral text-cream' : 'bg-cream/15 text-cream'
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {/* Every package: the inquiry form. */}
            <div className="min-h-[9.5rem] rounded-2xl border-2 border-teal-deep/10 p-3.5">
              <p className="text-xs font-bold text-teal-deep">{m.form.title}</p>
              {m.form.fields.map((f, i) => (
                <div key={f} className="mt-2.5">
                  <p className="text-[0.58rem] font-semibold uppercase tracking-wider text-ink-muted">{f}</p>
                  <span className={`mt-1 block rounded-md bg-teal-deep/6 ${i === 1 ? 'h-7' : 'h-4'}`} />
                </div>
              ))}
              <span className="mt-2.5 inline-block rounded-lg bg-teal-deep px-3 py-1.5 text-[0.65rem] font-semibold text-cream">
                {m.form.button}
              </span>
            </div>
            {hasBooking ? <Booking /> : <EmptySlot label={m.empty.booking} className="min-h-[9.5rem]" />}
          </div>

          {hasPayment ? <Payment /> : <EmptySlot label={m.empty.payment} className="min-h-[4.25rem]" />}
        </div>
      </div>

      {/* The dock: what the site is wired to, outside the browser. */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {idx >= 1 ? (
          <span className="offer-slot inline-flex items-center gap-2 rounded-full bg-cream/10 py-1.5 pl-2 pr-3.5 text-xs font-medium text-cream ring-1 ring-cream/15">
            <span className="text-teal-soft">
              <IconPin size={20} />
            </span>
            {m.google}
          </span>
        ) : null}
        {m.automations.slice(0, autos).map((a, i) => (
          <span
            key={a}
            className="offer-slot inline-flex items-center gap-2 rounded-full bg-cream/10 py-1.5 pl-2 pr-3.5 text-xs font-medium text-cream ring-1 ring-cream/15"
            style={{ '--i': i + 1 }}
          >
            <span className="text-teal-soft">
              <IconFlow size={20} />
            </span>
            {a}
          </span>
        ))}
        {idx === 0 ? (
          <span className="rounded-full border-2 border-dashed border-cream/20 px-3.5 py-1.5 text-xs font-medium text-cream/45">
            {m.empty.dock}
          </span>
        ) : null}
      </div>
    </div>
  )
}

/* ── The table, for scanners ────────────────────────────────────────────── */

function Cell({ value }) {
  if (value === true) {
    return (
      <span className="inline-grid place-items-center text-coral">
        <IconYes size={20} />
        <span className="sr-only">{W.table.yes}</span>
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-grid place-items-center text-cream/30">
        <IconNo size={20} />
        <span className="sr-only">{W.table.no}</span>
      </span>
    )
  }
  return <span className="text-[0.78rem] font-semibold text-cream sm:text-sm">{value}</span>
}

function CompareTable({ idx, onPick }) {
  const t = W.table
  return (
    <div className="mt-16 sm:mt-20">
      <h3 className="font-display text-2xl font-bold text-cream sm:text-3xl">{t.caption}</h3>
      <div className="mt-5 overflow-hidden rounded-[var(--radius-card)] ring-1 ring-cream/15">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">{t.caption}</caption>
          <colgroup>
            <col className="w-[37%] sm:w-[46%]" />
            <col />
            <col />
            <col />
          </colgroup>
          <thead>
            <tr>
              <th
                scope="col"
                className="px-3 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-cream/55 sm:px-6"
              >
                {t.featureHeader}
              </th>
              {W.tiers.map((tier, i) => (
                <th
                  key={tier.key}
                  scope="col"
                  className={`px-0.5 py-1.5 text-center transition-colors duration-300 ${
                    i === idx ? 'bg-cream/10' : ''
                  }`}
                >
                  {/* The headers pick too, so the table and the site stay
                      one control. */}
                  <button
                    type="button"
                    aria-pressed={i === idx}
                    onClick={() => onPick(i)}
                    className={`min-h-11 w-full rounded-lg px-0.5 font-display text-[0.76rem] font-bold transition-colors sm:text-base ${
                      i === idx ? 'text-coral' : 'text-cream hover:text-teal-soft'
                    }`}
                  >
                    {tier.name}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.rows.map((row) => (
              <tr key={row.label} className="border-t border-cream/10">
                <th
                  scope="row"
                  className="px-3 py-3.5 align-middle text-[0.8rem] font-medium leading-snug text-cream/85 sm:px-6 sm:text-sm"
                >
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td
                    key={W.tiers[i].key}
                    className={`px-0.5 py-3.5 text-center align-middle transition-colors duration-300 ${
                      i === idx ? 'bg-cream/10' : ''
                    }`}
                  >
                    <Cell value={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm leading-relaxed text-cream/65">{W.note}</p>
        <a
          href={quoteCta.href}
          onClick={jumpTo(quoteCta.href)}
          className="inline-flex min-h-11 shrink-0 items-center font-semibold text-cream underline decoration-coral decoration-2 underline-offset-[6px] transition-colors hover:text-teal-soft"
        >
          {quoteCta.label}
        </a>
      </div>
    </div>
  )
}

/* ── The section ────────────────────────────────────────────────────────── */

export function WebsitePackages() {
  const [idx, setIdx] = useState(0)
  const stageRef = useRef(null)
  const touched = useRef(false)

  // The one-time build: Starter, then Standard, then Premium, the first time
  // the stage comes into view. A click at any point stops it where it is.
  useEffect(() => {
    const el = stageRef.current
    if (!el || prefersReducedMotion()) return
    const timers = []
    let played = false
    const play = () => {
      if (played || touched.current) return
      played = true
      ;[1, 2].forEach((step, i) => {
        timers.push(
          window.setTimeout(() => {
            if (!touched.current) setIdx(step)
          }, 1100 + i * 1500),
        )
      })
    }
    const st = ScrollTrigger.create({ trigger: el, start: 'top 72%', once: true, onEnter: play })
    const failsafe = window.setTimeout(() => {
      if (ScrollTrigger.isInViewport(el)) play()
    }, 2600)
    return () => {
      st.kill()
      window.clearTimeout(failsafe)
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  const pick = (i) => {
    touched.current = true
    setIdx(i)
  }

  const tier = W.tiers[idx]

  return (
    <section
      id="websites"
      className="relative z-10 mx-2 rounded-[40px] bg-teal-deep px-5 py-16 sm:mx-4 sm:rounded-[64px] sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow={W.eyebrow} title={W.title} body={W.body} dark center />

        <div className="mx-auto mt-10 max-w-md">
          <TierPicker idx={idx} onPick={pick} />
        </div>

        <Reveal
          from={{ y: 50 }}
          className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-14"
        >
          {/* Text first in the DOM for screen readers; on phones the site
              goes first visually, because watching it change is the hook. */}
          <TierPanel tier={tier} />
          <div ref={stageRef} className="order-first lg:order-none">
            <SiteMock idx={idx} />
          </div>
        </Reveal>

        <CompareTable idx={idx} onPick={pick} />
      </div>
    </section>
  )
}
