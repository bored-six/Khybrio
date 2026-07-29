import { useEffect, useState } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { Magnetic } from '../components/Magnetic'
import { scrollToId } from '../lib/smoothScroll'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { hero, runLog } from '../content/site'

/**
 * The run log — five routine jobs executing, with what the same job costs by
 * hand underneath. Rows fire one at a time on mount.
 *
 * The "Example" badge is load-bearing, not decoration: these are illustrative
 * workflows with illustrative hand-timings, and without the badge a reader
 * takes them for measured results from real clients. Do not remove it.
 */
function RunLog() {
  const reduced = usePrefersReducedMotion()
  const [done, setDone] = useState(0)

  // Runs on mount, deliberately NOT gated on an in-view observer. The panel
  // sits in the hero, so it is on screen at load and the gate buys nothing —
  // while its failure mode is the worst on the page: an observer that never
  // fires leaves the whole log greyed out at em-dashes, which reads as broken.
  useEffect(() => {
    // Reduced motion gets the finished state immediately. The point of the
    // panel is the comparison, and that reads fine without the staggering.
    if (reduced) {
      setDone(runLog.rows.length)
      return
    }
    const timers = runLog.rows.map((_, i) =>
      setTimeout(() => setDone((d) => Math.max(d, i + 1)), 500 + i * 520)
    )
    return () => timers.forEach(clearTimeout)
  }, [reduced])

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] bg-[#0F2B29] shadow-[0_24px_70px_rgba(15,43,41,0.45)] ring-1 ring-cream/12">
      <div className="flex items-center gap-2 border-b border-cream/10 px-4 py-3 sm:px-5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-coral/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-cream/25" />
        </span>
        <span className="ml-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-cream/45">
          run log
        </span>
        <span className="ml-auto rounded-full bg-cream/12 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-widest text-cream/70">
          {runLog.badge}
        </span>
      </div>

      <div className="divide-y divide-cream/8">
        {runLog.rows.map((row, i) => {
          const ran = i < done
          return (
            <div
              key={row.flow}
              className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 px-4 py-3.5 transition-opacity duration-500 sm:px-5"
              style={{ opacity: ran ? 1 : 0.28 }}
            >
              <p className="flex items-start gap-2 text-[0.78rem] leading-snug text-cream/90 sm:text-[0.83rem]">
                <span className="mt-0.5 shrink-0">
                  {ran ? (
                    <Check size={14} strokeWidth={3} color="var(--color-coral)" />
                  ) : (
                    <span className="block h-3.5 w-3.5 rounded-full border border-cream/25" />
                  )}
                </span>
                {row.flow}
              </p>
              <p className="self-start font-mono text-[0.78rem] font-semibold text-coral tabular-nums">
                {ran ? row.time : '—'}
              </p>
              <p className="col-start-1 pl-6 font-mono text-[0.68rem] text-cream/40">
                by hand: {row.byHand}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="hero" className="relative z-10 bg-teal-deep px-5 pb-20 pt-28 sm:px-8 sm:pb-28 sm:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="rise-in">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-teal-soft sm:text-xs">
            {hero.eyebrow}
          </p>
          <h1 className="mt-3 max-w-2xl text-[clamp(2.3rem,5.5vw,4.2rem)] font-semibold leading-[1.03] text-cream">
            {hero.title[0]}
            <span className="text-coral">{hero.title[1]}</span>
            {hero.title[2]}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            {hero.sub}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <a
                href={hero.ctas.primary.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(hero.ctas.primary.href.slice(1))
                }}
                className="inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 font-semibold text-cream transition-transform duration-300 hover:scale-[1.04]"
              >
                {hero.ctas.primary.label}
                <ArrowRight size={17} strokeWidth={2.4} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={hero.ctas.secondary.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(hero.ctas.secondary.href.slice(1))
                }}
                className="inline-block rounded-full border border-cream/30 px-7 py-3.5 font-semibold text-cream transition-colors duration-300 hover:bg-cream/10"
              >
                {hero.ctas.secondary.label}
              </a>
            </Magnetic>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
            {hero.trust.map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-sm text-cream/60">
                <Check size={14} strokeWidth={2.6} color="var(--color-coral)" />
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="rise-in-late">
          <RunLog />
        </div>
      </div>
    </section>
  )
}
