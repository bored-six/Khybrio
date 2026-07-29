import { Check, ArrowRight } from 'lucide-react'
import { Magnetic } from '../components/Magnetic'
import { RunLog } from '../components/RunLog'
import { scrollToId } from '../lib/smoothScroll'
import { hero } from '../content/site'

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
