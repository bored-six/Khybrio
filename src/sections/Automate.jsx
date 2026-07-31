import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'
import { Words } from '../components/Words'
import { scrollToId } from '../lib/smoothScroll'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { automate } from '../content/site'

/**
 * The six named workflows, shown as software instead of listed as cards — a
 * laptop running an example build. Pick a workflow in the sidebar and the
 * screen plays its three beats. Auto-cycles until the visitor takes the
 * wheel, same contract as the hero machine.
 *
 * The `Example` badge in the window chrome is load-bearing: these screens
 * are illustrative builds, and unlabelled they would read as a shipped
 * product with real activity in it.
 */
export function Automate() {
  const reduced = usePrefersReducedMotion()
  const [idx, setIdx] = useState(0)
  const [auto, setAuto] = useState(true)
  const item = automate.items[idx]

  useEffect(() => {
    if (reduced || !auto) return
    const t = setInterval(() => setIdx((i) => (i + 1) % automate.items.length), 3400)
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

        {/* The laptop. Tips up from flat as it enters — a lid opening. */}
        <motion.div
          initial={{ opacity: 0, y: 80, rotateX: 22, transformPerspective: 1100 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14"
        >
          <div className="border-flow mx-auto max-w-4xl rounded-[26px]">
            {/* bezel */}
            <div className="rounded-[26px] bg-teal-deep p-2.5 sm:p-3">
              {/* the app window */}
              <div className="overflow-hidden rounded-2xl bg-cream">
                <div className="flex items-center justify-between gap-3 border-b-2 border-teal-deep/10 px-4 py-2.5 sm:px-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-teal-bright">
                    {automate.lab.window}
                  </p>
                  <span className="shrink-0 rounded-lg bg-teal-deep px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest text-cream">
                    {automate.lab.badge}
                  </span>
                </div>

                <div className="grid md:grid-cols-[minmax(0,15rem)_1fr]">
                  {/* Sidebar — the six workflows. Horizontal chip rail on
                      mobile, vertical menu from md up. */}
                  <nav
                    aria-label={automate.lab.menu}
                    className="flex flex-row flex-wrap gap-1.5 border-b-2 border-teal-deep/10 bg-teal-soft/15 p-2.5 md:flex-col md:border-b-0 md:border-r-2 md:p-3"
                  >
                    <p className="hidden w-full px-2 pb-2 pt-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ink-muted/60 md:block">
                      {automate.lab.menu}
                    </p>
                    {automate.items.map((it, i) => (
                      <button
                        key={it.workflow}
                        type="button"
                        aria-pressed={i === idx}
                        onClick={() => pick(i)}
                        className={`rounded-xl px-3 py-2 text-left text-[0.8rem] font-semibold transition-colors duration-300 md:w-full ${
                          i === idx
                            ? 'bg-coral text-cream'
                            : 'text-teal-deep hover:bg-teal-soft/40'
                        }`}
                      >
                        {it.label}
                      </button>
                    ))}
                  </nav>

                  {/* Screen — the selected workflow playing its three beats.
                      Keyed remount so the steps re-run on every selection. */}
                  <div key={item.workflow} className="p-5 sm:p-6">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-coral">
                      {item.label}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl font-bold text-teal-deep sm:text-2xl">
                      {item.workflow}
                    </h3>

                    <ol className="mt-5 flex min-h-[9rem] flex-col gap-2.5">
                      {item.steps.map((step, i) => (
                        <motion.li
                          key={step}
                          initial={{ opacity: 0, x: 22 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.45,
                            delay: 0.15 + i * 0.28,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="flex items-center gap-3 rounded-xl bg-teal-soft/20 px-3.5 py-2.5"
                        >
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: 'spring',
                              stiffness: 320,
                              damping: 18,
                              delay: 0.32 + i * 0.28,
                            }}
                            className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal-bright"
                          >
                            <Check size={13} strokeWidth={3.2} color="var(--color-cream)" />
                          </motion.span>
                          <span className="text-sm font-medium leading-snug text-teal-deep">
                            {step}
                          </span>
                        </motion.li>
                      ))}
                    </ol>

                    <p className="mt-4 flex items-center gap-2.5 text-xs font-medium text-ink-muted">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-bright opacity-60" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-bright" />
                      </span>
                      {automate.lab.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The base — a lip under the lid. */}
          <div className="mx-auto h-3 w-full max-w-[59rem] rounded-b-2xl bg-[#173f3d]" aria-hidden="true">
            <div className="mx-auto h-1.5 w-24 rounded-b-xl bg-[#12332f]" />
          </div>
        </motion.div>

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
