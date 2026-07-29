import { useEffect, useState } from 'react'
import { Check, Inbox } from 'lucide-react'
import { AssetImage } from './AssetImage'
import { A } from '../lib/assets'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { runLog } from '../content/site'

const { flows } = runLog

/**
 * Work in, automation out — the hero's proof, played on loop.
 *
 * Wispr Flow's hero shows speech becoming words; this is the same gesture for
 * a different product: a messy task feeds in on the left, the engine churns,
 * and the finished job drops out the right with the time it took. The visitor
 * can grab the machine at any point via the chips, which rehearses the ask the
 * whole page builds to — "name your three tasks" — before any form appears.
 *
 * Runs as a four-phase loop (enter → process → out → rest). JS only advances
 * the phase; all motion is CSS keyframes on state classes, so a throttled tab
 * shows a static machine instead of a blank hole. Auto-cycles through the five
 * flows until the visitor picks one, then follows the visitor for good.
 */
const PHASE_MS = { enter: 820, process: 640, out: 620, rest: 1200 }

export function FlowMachine() {
  const reduced = usePrefersReducedMotion()
  const [flowIdx, setFlowIdx] = useState(0)
  const [phase, setPhase] = useState('enter')
  const [auto, setAuto] = useState(true)
  const [cycle, setCycle] = useState(0)
  const [rows, setRows] = useState([])

  const flow = flows[flowIdx]

  // Reduced motion: the finished state, standing still. The comparison is the
  // content; the choreography is garnish.
  useEffect(() => {
    if (!reduced) return
    setRows(flows.slice(0, 3).map((f, i) => ({ id: `static-${i}`, flow: f })))
    setPhase('rest')
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const t = setTimeout(() => {
      if (phase === 'enter') {
        setPhase('process')
      } else if (phase === 'process') {
        setRows((r) => [{ id: cycle, flow }, ...r].slice(0, 3))
        setPhase('out')
      } else if (phase === 'out') {
        setPhase('rest')
      } else {
        if (auto) setFlowIdx((i) => (i + 1) % flows.length)
        setCycle((c) => c + 1)
        setPhase('enter')
      }
    }, PHASE_MS[phase])
    return () => clearTimeout(t)
  }, [phase, reduced, auto, cycle, flow])

  const pick = (i) => {
    setAuto(false)
    if (i !== flowIdx) {
      setFlowIdx(i)
      setCycle((c) => c + 1)
      if (!reduced) setPhase('enter')
    }
  }

  return (
    <div className="overflow-hidden rounded-[32px] border-2 border-teal-deep bg-cream text-left">
      {/* Header band */}
      <div className="flex items-center justify-between gap-3 border-b-2 border-teal-deep/15 px-5 py-3.5 sm:px-7">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-teal-bright">
          {runLog.hint}
        </p>
        {/* Load-bearing, not decoration — see the note in content/site.js. */}
        <span className="shrink-0 rounded-lg bg-teal-deep px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-cream">
          {runLog.badge}
        </span>
      </div>

      {/* The machine floor */}
      <div className="grid items-center gap-8 px-5 py-7 sm:px-7 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
        {/* IN — the task queue */}
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-muted/70">
            {runLog.inLabel}
          </p>
          <div className="relative mt-3">
            {/* Ghosts of the queue behind the live card. */}
            <div className="absolute inset-x-3 -bottom-2 h-full rotate-[1.6deg] rounded-2xl border-2 border-teal-deep/10 bg-teal-soft/20" />
            <div className="absolute inset-x-6 -bottom-4 h-full rotate-[-2deg] rounded-2xl border-2 border-teal-deep/5 bg-teal-soft/10" />
            <div
              key={`${cycle}-${flow.key}`}
              className={`relative rotate-[-1.2deg] rounded-2xl border-2 border-teal-deep/20 bg-white/70 px-4 py-3.5 ${
                reduced ? '' : phase === 'enter' ? 'machine-feed' : 'machine-next'
              }`}
            >
              <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-coral">
                <Inbox size={13} strokeWidth={2.6} />
                {flow.label}
              </p>
              <p className="mt-1.5 text-[0.95rem] font-medium leading-snug text-ink">
                {flow.trigger}
              </p>
              <p className="mt-1.5 text-xs text-ink-muted line-through decoration-coral/50">
                {runLog.byHandLabel}: {flow.byHand}
              </p>
            </div>
          </div>
        </div>

        {/* ENGINE — the waveform, recast: work being processed */}
        <div className="flex flex-col items-center gap-2 justify-self-center">
          <div
            className={`flex h-16 items-center gap-1.5 rounded-full border-2 border-teal-deep bg-teal-deep px-6 ${
              phase === 'process' && !reduced ? 'machine-churn' : ''
            }`}
          >
            <AssetImage
              asset={A.markGlyph}
              className="mr-1.5 h-6 w-6 shrink-0 opacity-90"
              loading="eager"
            />
            {[0, 1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className="eng-bar block w-1.5 rounded-full bg-coral"
                style={{ height: [14, 26, 34, 22, 16][i], animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ink-muted/60">
            {runLog.engineLabel}
          </p>
        </div>

        {/* OUT — done, logged, gone */}
        <div>
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-muted/70">
            {runLog.outLabel}
          </p>
          <ul className="mt-3 flex min-h-[8.5rem] flex-col gap-2">
            {rows.map((row, i) => (
              <li
                key={row.id}
                className={`flex items-center gap-3 rounded-xl border-2 border-teal-deep/10 bg-teal-soft/20 px-3.5 py-2.5 ${
                  i === 0 && !reduced ? 'machine-pop' : ''
                }`}
                style={{ opacity: i === 0 ? 1 : i === 1 ? 0.65 : 0.4 }}
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal-bright">
                  <Check size={13} strokeWidth={3.2} color="var(--color-cream)" />
                </span>
                <span className="flex-1 text-sm font-medium leading-snug text-teal-deep">
                  {row.flow.steps[row.flow.steps.length - 1]}
                </span>
                <span className="shrink-0 font-display text-sm font-bold text-coral tabular-nums">
                  {row.flow.time}
                </span>
              </li>
            ))}
            {rows.length === 0 ? (
              <li className="rounded-xl border-2 border-dashed border-teal-deep/15 px-3.5 py-2.5 text-sm text-ink-muted/50">
                Warming up…
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      {/* Footer band — the same control the machine runs on, labelled. */}
      <div className="flex flex-wrap items-center gap-2 border-t-2 border-teal-deep/15 bg-teal-soft/15 px-5 py-4 sm:px-7">
        {flows.map((f, i) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={i === flowIdx}
            onClick={() => pick(i)}
            className={`rounded-full border-2 px-3.5 py-1.5 text-[0.78rem] font-semibold transition-colors duration-300 ${
              i === flowIdx
                ? 'border-teal-deep bg-coral text-cream'
                : 'border-teal-deep/20 bg-cream text-teal-deep hover:border-teal-deep/60'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}
