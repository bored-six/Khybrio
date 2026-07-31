import { Fragment, useEffect, useState } from 'react'
import { ArrowRight, Check, Cog, Zap } from 'lucide-react'
import { Words } from '../components/Words'
import { Reveal } from '../components/Reveal'
import { scrollToId } from '../lib/smoothScroll'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { automate } from '../content/site'

/**
 * The six named workflows, shown as the thing we actually sell: a wired
 * pipeline. Pick a workflow and its three beats draw themselves left to right
 * — trigger, action, result — with current running down the wires between.
 *
 * It replaced a laptop mockup. The laptop was a picture of software, which is
 * a category this business is not in; the pipeline is a picture of the work
 * happening without anyone touching it, which is the whole pitch. It also
 * stopped competing with the hero machine for "screen with things in it".
 *
 * The build animation is CSS keyed off the workflow name, so re-picking
 * replays it and a throttled tab shows a finished diagram, never a half-drawn
 * one. Auto-cycles until the visitor takes the wheel, same contract as the
 * hero machine.
 *
 * The `Example` badge is load-bearing: these are illustrative builds, and
 * unlabelled they would read as a live product with real activity in it.
 */
const NODE_ICONS = [Zap, Cog, Check]
const NODE_TONES = ['bg-teal-bright', 'bg-teal-deep', 'bg-coral']

export function Automate() {
  const reduced = usePrefersReducedMotion()
  const [idx, setIdx] = useState(0)
  const [auto, setAuto] = useState(true)
  const item = automate.items[idx]
  const { lab } = automate

  useEffect(() => {
    if (reduced || !auto) return
    const t = setInterval(() => setIdx((i) => (i + 1) % automate.items.length), 4200)
    return () => clearInterval(t)
  }, [auto, reduced])

  const pick = (i) => {
    setAuto(false)
    setIdx(i)
  }

  return (
    <section id="automate" className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
          {automate.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
          <Words text={automate.title} />
        </h2>
        <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">{automate.body}</p>

        <Reveal className="mt-12" y={56}>
          <div className="border-flow mx-auto max-w-5xl" style={{ '--bf-r': '28px' }}>
            <div className="rounded-[28px] bg-teal-deep p-2.5 sm:p-3">
              <div className="overflow-hidden rounded-[20px] bg-cream">
                <div className="flex items-center justify-between gap-3 border-b-2 border-teal-deep/10 px-4 py-2.5 sm:px-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-teal-bright">
                    {lab.window}
                  </p>
                  <span className="shrink-0 rounded-lg bg-teal-deep px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-cream">
                    {lab.badge}
                  </span>
                </div>

                {/* The six workflows as a scrolling rail. Horizontal at every
                    width now — a vertical sidebar stole room the pipeline
                    needs to be read left to right. */}
                <nav
                  aria-label={lab.menu}
                  className="flex gap-1.5 overflow-x-auto border-b-2 border-teal-deep/10 bg-teal-soft/15 p-2.5 [scrollbar-width:none] sm:px-4 [&::-webkit-scrollbar]:hidden"
                >
                  {automate.items.map((it, i) => (
                    <button
                      key={it.workflow}
                      type="button"
                      aria-pressed={i === idx}
                      onClick={() => pick(i)}
                      className={`shrink-0 rounded-xl px-3 py-2 text-[0.78rem] font-semibold transition-colors duration-300 ${
                        i === idx
                          ? 'bg-coral text-cream'
                          : 'text-teal-deep hover:bg-teal-soft/50'
                      }`}
                    >
                      {it.label}
                    </button>
                  ))}
                </nav>

                {/* Keyed remount replays the CSS build on every selection. */}
                <div key={item.workflow} className="px-5 py-7 sm:px-8 sm:py-9">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-coral">
                    {item.label}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-teal-deep sm:text-2xl">
                    {item.workflow}
                  </h3>

                  {/* min-height holds the frame steady between workflows,
                      whose step text runs to one line or two. */}
                  <div className="mt-7 flex flex-col md:min-h-[7rem] md:flex-row md:items-stretch">
                    {item.steps.map((step, i) => {
                      const Icon = NODE_ICONS[i]
                      return (
                        <Fragment key={step}>
                          {i > 0 && (
                            <div
                              className="pipe-wire mx-auto my-1 h-7 w-[3px] shrink-0 md:mx-2 md:my-0 md:h-[3px] md:w-12 md:self-center"
                              style={{ '--i': i - 1 }}
                              aria-hidden="true"
                            >
                              <span className="pipe-current" />
                              <span className="pipe-pulse" />
                            </div>
                          )}
                          <div
                            className="pipe-node flex-1 rounded-2xl border-2 border-teal-deep/10 bg-cream p-4"
                            style={{ '--i': i }}
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${NODE_TONES[i]}`}
                              >
                                <Icon size={15} strokeWidth={2.6} color="var(--color-cream)" />
                              </span>
                              <span className="text-[0.6rem] font-bold uppercase tracking-[0.13em] text-ink-muted/70">
                                {lab.roles[i]}
                              </span>
                            </div>
                            <p className="mt-3 text-sm font-semibold leading-snug text-teal-deep">
                              {step}
                            </p>
                          </div>
                        </Fragment>
                      )
                    })}
                  </div>

                  <p className="mt-6 flex items-center gap-2.5 text-xs font-medium text-ink-muted">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-bright opacity-60" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-bright" />
                    </span>
                    {lab.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => scrollToId('contact')}
            className="inline-flex items-center gap-2 font-semibold text-teal-deep underline-offset-4 transition-colors hover:text-coral hover:underline"
          >
            Not sure which one is yours? Send us your three
            <ArrowRight size={17} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </section>
  )
}
