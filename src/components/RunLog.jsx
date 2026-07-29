import { useEffect, useState } from 'react'
import { Check, Zap } from 'lucide-react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { runLog } from '../content/site'

const { flows } = runLog

/**
 * "Pick the one that sounds like your week" — the hero's interactive panel.
 *
 * The visitor choosing which job to watch is the whole point: it rehearses the
 * ask the page builds to ("name your three tasks") before anyone has to fill in
 * a form. It auto-cycles so the panel is never sitting still when someone
 * arrives, and stops cycling permanently on the first click — once a visitor
 * has expressed a preference, moving the content out from under them is rude.
 *
 * Deliberately a cream card in the brand's own type, not a terminal. A dark
 * monospace console reads as a developer tool, and the buyer here is an owner
 * who does not think of themselves as technical.
 */
export function RunLog() {
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(0)
  const [step, setStep] = useState(0)
  const [auto, setAuto] = useState(true)

  const flow = flows[active]

  // Not gated on an in-view observer. The panel is in the hero, so it is on
  // screen at load and the gate buys nothing — while its failure mode is the
  // worst on the page: an observer that never fires leaves every step greyed
  // out, which reads as broken rather than as waiting.
  useEffect(() => {
    if (reduced) {
      setStep(flow.steps.length)
      return
    }
    setStep(0)
    const timers = flow.steps.map((_, i) =>
      setTimeout(() => setStep(i + 1), 420 + i * 430)
    )
    if (auto) {
      const runtime = 420 + flow.steps.length * 430 + 1800
      timers.push(setTimeout(() => setActive((a) => (a + 1) % flows.length), runtime))
    }
    return () => timers.forEach(clearTimeout)
    // `flow.steps` is stable per `active` — flows is a module constant, so the
    // array identity only changes when the selected flow does.
  }, [active, auto, reduced, flow.steps])

  const complete = step >= flow.steps.length

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] bg-cream shadow-[0_24px_70px_rgba(15,43,41,0.35)]">
      <div className="flex items-center justify-between gap-3 border-b border-teal-soft/50 px-5 py-4 sm:px-6">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-teal-bright">
          {runLog.hint}
        </p>
        {/* Load-bearing, not decoration — see the note in content/site.js. */}
        <span className="shrink-0 rounded-full bg-teal-deep/8 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-ink-muted/70">
          {runLog.badge}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 px-5 pt-5 sm:px-6">
        {flows.map((f, i) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={i === active}
            onClick={() => {
              setAuto(false)
              setActive(i)
            }}
            className={`rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold transition-colors duration-300 ${
              i === active
                ? 'bg-coral text-cream'
                : 'bg-teal-deep/8 text-teal-deep hover:bg-teal-soft/50'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="px-5 pb-5 pt-6 sm:px-6">
        <p className="text-sm font-medium text-ink-muted">
          <span className="text-teal-bright">When</span> {flow.trigger}
        </p>

        <ol className="relative mt-5 flex flex-col gap-4">
          {/* Connector, behind the markers. */}
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-[0.6875rem] top-4 w-px bg-teal-soft/60"
          />
          {flow.steps.map((label, i) => {
            const done = i < step
            return (
              <li key={label} className="relative flex items-center gap-3.5">
                <span
                  className={`grid h-[1.375rem] w-[1.375rem] shrink-0 place-items-center rounded-full transition-colors duration-300 ${
                    done ? 'bg-coral' : 'bg-cream ring-1 ring-teal-soft'
                  }`}
                >
                  {done ? <Check size={13} strokeWidth={3.2} color="var(--color-cream)" /> : null}
                </span>
                <span
                  className={`text-[0.92rem] leading-snug transition-colors duration-300 ${
                    done ? 'font-medium text-teal-deep' : 'text-ink-muted/50'
                  }`}
                >
                  {label}
                </span>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-teal-soft/50 bg-teal-soft/20 px-5 py-4 sm:px-6">
        <p className="flex items-baseline gap-2">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-muted/70">
            {runLog.automatedLabel}
          </span>
          <span
            className="font-display text-2xl font-bold text-coral tabular-nums transition-opacity duration-500"
            style={{ opacity: complete ? 1 : 0.25 }}
          >
            {flow.time}
          </span>
          <Zap
            size={15}
            strokeWidth={2.4}
            color="var(--color-coral)"
            className="transition-opacity duration-500"
            style={{ opacity: complete ? 1 : 0 }}
          />
        </p>
        <p className="flex items-baseline gap-2">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-muted/70">
            {runLog.byHandLabel}
          </span>
          <span className="text-sm font-medium text-ink-muted line-through decoration-coral/50">
            {flow.byHand}
          </span>
        </p>
      </div>
    </div>
  )
}
