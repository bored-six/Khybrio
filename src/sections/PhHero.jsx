import { Check, ArrowRight } from 'lucide-react'
import { AssetImage } from '../components/AssetImage'
import { Magnetic } from '../components/Magnetic'
import { scrollToId } from '../lib/smoothScroll'
import { A } from '../lib/assets'
import { hero } from '../content/ph'

/**
 * Local hero — a still, not the scrubbed flight.
 *
 * This page is opened on a phone in someone's shop, usually on mobile data,
 * right after the Google Maps demo. A pinned scroll sequence would cost load
 * time and delay the answer to the one question the visitor arrived with.
 */
export function PhHero() {
  return (
    <section id="hero" className="relative z-10 overflow-hidden bg-teal-deep">
      <AssetImage
        asset={A.hero}
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: '50% 42%' }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(28,77,74,0.96) 0%, rgba(28,77,74,0.82) 42%, rgba(28,77,74,0.35) 72%, rgba(28,77,74,0.12) 100%)',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40">
        <div className="rise-in max-w-2xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-teal-soft sm:text-xs">
            {hero.eyebrow}
          </p>
          <h1 className="mt-3 text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.05] text-cream">
            {hero.title[0]}
            <span className="text-coral">{hero.title[1]}</span>
            {hero.title[2]}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg">
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
              <span key={t} className="flex items-center gap-1.5 text-sm text-cream/65">
                <Check size={14} strokeWidth={2.6} color="var(--color-coral)" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
