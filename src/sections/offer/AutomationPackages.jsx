import { Fragment, useState } from 'react'
import { Reveal } from '../../components/Reveal'
import { automation as A } from '../../content/offer'
import { ExampleBadge, QuoteButton, SectionHead } from './shared'
import './offer.css'

/**
 * Workflow automation as a switchboard.
 *
 * The six workflows are jacks on a board. Plug one in and the "One workflow"
 * package lights; plug in a second and the light moves to the Operations
 * package, whose five sockets fill and wire together as you go. The board
 * answers the only question the two packages raise ("which one am I?") by
 * letting the visitor find out instead of reading a definition.
 *
 * Under the board, the workflow last plugged in runs as a three-beat
 * pipeline (when this happens, this runs, you get), built from the same pipe
 * pieces as the hero card. It is illustrative, so it carries the badge.
 *
 * Starts with one workflow plugged in, so the resting state is a complete,
 * readable answer with no script needed.
 */

const NODE_TONES = ['bg-teal-bright', 'bg-teal-deep', 'bg-coral']

/** A patch-bay jack: an empty socket, or plugged and coral. 24px. */
function Jack({ on }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" className="mt-0.5 shrink-0" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="9"
        fill={on ? 'var(--color-coral)' : 'none'}
        stroke={on ? 'var(--color-coral)' : 'currentColor'}
        strokeOpacity={on ? 1 : 0.45}
        strokeWidth="2"
        style={{ transition: 'fill 300ms, stroke 300ms' }}
      />
      <circle cx="12" cy="12" r="3.5" fill={on ? 'var(--color-cream)' : 'currentColor'} fillOpacity={on ? 1 : 0.3} />
    </svg>
  )
}

/** A package's sockets. Filled ones are wired to each other. */
function Sockets({ slots, filled, lit }) {
  return (
    <div className="mt-4 flex items-center" aria-hidden="true">
      {Array.from({ length: slots }, (_, i) => {
        const full = i < filled
        return (
          <Fragment key={i}>
            {i > 0 ? (
              <span
                className={`h-0.5 w-4 transition-colors duration-500 sm:w-6 ${
                  i < filled ? 'bg-coral' : lit ? 'bg-teal-deep/15' : 'bg-cream/15'
                }`}
              />
            ) : null}
            <span
              className={`h-4 w-4 rounded-full border-2 transition-colors duration-500 ${
                full
                  ? 'border-coral bg-coral'
                  : lit
                    ? 'border-teal-deep/25'
                    : 'border-cream/25'
              }`}
            />
          </Fragment>
        )
      })}
    </div>
  )
}

function Lamps({ count, picked, onShow, focus }) {
  const fit = count === 1 ? 'one' : count >= 2 ? 'ops' : null
  const readout = count === 0 ? A.emptyNote : count === 1 ? A.fitOne : A.fitOps(count)

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {A.packages.map((p) => {
          const lit = p.key === fit
          return (
            <div
              key={p.key}
              className={`rounded-[var(--radius-card)] p-5 transition-colors duration-500 ${
                lit ? 'bg-cream text-teal-deep ring-2 ring-coral' : 'bg-cream/6 text-cream ring-1 ring-cream/15'
              }`}
            >
              <h3 className="font-display text-xl font-bold">{p.name}</h3>
              <p className={`mt-1.5 text-sm leading-relaxed ${lit ? 'text-ink-muted' : 'text-cream/65'}`}>
                {p.line}
              </p>
              <Sockets slots={p.slots} filled={lit ? count : 0} lit={lit} />
              {/* Inside the lit Operations lamp, the plugged-in workflows are
                  the chain itself, and each one shows its pipeline below. */}
              {lit && p.key === 'ops' ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {picked.map((key) => {
                    const w = A.workflows.find((x) => x.key === key)
                    return (
                      <button
                        key={key}
                        type="button"
                        aria-pressed={focus === key}
                        onClick={() => onShow(key)}
                        className={`min-h-11 rounded-full px-3.5 text-xs font-semibold transition-colors ${
                          focus === key ? 'bg-teal-deep text-cream' : 'bg-teal-soft/35 text-teal-deep hover:bg-teal-soft/60'
                        }`}
                      >
                        {w.short}
                      </button>
                    )
                  })}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
      <p aria-live="polite" className="mt-4 text-sm font-medium text-cream/80">
        {readout}
      </p>
    </div>
  )
}

function Pipeline({ workflow }) {
  const d = A.demo
  return (
    <div className="mt-6 overflow-hidden rounded-[24px] bg-cream">
      <div className="flex items-center justify-between gap-3 border-b-2 border-teal-deep/10 px-4 py-2.5 sm:px-5">
        <p className="min-w-0 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-teal-bright">
          {d.lead}: <span className="text-teal-deep">{workflow.short}</span>
        </p>
        <ExampleBadge label={d.badge} />
      </div>
      {/* Keyed so a new workflow replays the build. */}
      <div key={workflow.key} className="flex flex-col p-4 sm:p-5 md:flex-row md:items-stretch">
        {workflow.steps.map((step, i) => (
          <Fragment key={step}>
            {i > 0 ? (
              <div
                className="pipe-wire mx-auto my-1 h-6 w-[3px] shrink-0 md:mx-1.5 md:my-0 md:h-[3px] md:w-8 md:self-center"
                style={{ '--i': i - 1 }}
                aria-hidden="true"
              >
                <span className="pipe-current" />
                <span className="pipe-pulse" />
              </div>
            ) : null}
            <div className="pipe-node flex-1 rounded-2xl border-2 border-teal-deep/10 p-3.5" style={{ '--i': i }}>
              <div className="flex items-center gap-2">
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg font-display text-xs font-bold text-cream ${NODE_TONES[i]}`}
                >
                  {i + 1}
                </span>
                <span className="text-[0.58rem] font-bold uppercase tracking-[0.13em] text-ink-muted">
                  {d.roles[i]}
                </span>
              </div>
              <p className="mt-2.5 text-sm font-semibold leading-snug text-teal-deep">{step}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export function AutomationPackages() {
  // One state object, updated functionally, so two quick taps can never
  // both read the same stale selection and drop one of them.
  const [board, setBoard] = useState({ picked: [A.workflows[0].key], focus: A.workflows[0].key })
  const { picked, focus } = board
  const full = picked.length >= A.max

  const toggle = (key) => {
    setBoard((b) => {
      if (b.picked.includes(key)) {
        const next = b.picked.filter((k) => k !== key)
        return { picked: next, focus: b.focus === key ? (next[next.length - 1] ?? null) : b.focus }
      }
      if (b.picked.length >= A.max) return b
      return { picked: [...b.picked, key], focus: key }
    })
  }

  const show = (key) => setBoard((b) => ({ ...b, focus: key }))

  const shown = A.workflows.find((w) => w.key === focus)

  return (
    <section
      id="automation"
      className="relative z-10 mx-2 rounded-[40px] bg-teal-deep px-5 py-16 sm:mx-4 sm:rounded-[64px] sm:px-8 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <div>
          <SectionHead eyebrow={A.eyebrow} title={A.title} body={A.body} dark />
          <div className="mt-9">
            <Lamps count={picked.length} picked={picked} focus={focus} onShow={show} />
          </div>
          <div className="mt-8 hidden lg:block">
            <QuoteButton />
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-soft">{A.boardLabel}</p>
            <p className="text-xs tabular-nums text-cream/55">
              {picked.length} / {A.max}
            </p>
          </div>

          <Reveal
            from={{ y: 24, scale: 0.94 }}
            stagger={0.06}
            blur={false}
            className="mt-4 grid gap-2.5 sm:grid-cols-2"
          >
            {A.workflows.map((w) => {
              const isOn = picked.includes(w.key)
              const blocked = !isOn && full
              return (
                <button
                  key={w.key}
                  type="button"
                  aria-pressed={isOn}
                  aria-disabled={blocked || undefined}
                  onClick={() => toggle(w.key)}
                  className={`flex min-h-[4.75rem] items-start gap-3 rounded-2xl p-4 text-left transition-colors duration-300 ${
                    isOn
                      ? 'bg-cream text-teal-deep'
                      : 'bg-cream/6 text-cream ring-1 ring-cream/15 hover:bg-cream/12'
                  } ${blocked ? 'cursor-not-allowed opacity-45 hover:bg-cream/6' : ''}`}
                >
                  <Jack on={isOn} />
                  <span className="min-w-0">
                    <span className={`block text-[0.6rem] font-bold uppercase tracking-[0.14em] ${isOn ? 'text-teal-bright' : 'text-teal-soft'}`}>
                      {w.short}
                    </span>
                    <span className="mt-1 block text-sm font-semibold leading-snug">{w.name}</span>
                  </span>
                </button>
              )
            })}
          </Reveal>

          {full ? <p className="mt-3 text-sm text-teal-soft">{A.capNote}</p> : null}

          {shown ? <Pipeline workflow={shown} /> : null}

          <div className="mt-8 lg:hidden">
            <QuoteButton />
          </div>
        </div>
      </div>
    </section>
  )
}
