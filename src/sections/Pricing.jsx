import { motion } from 'motion/react'
import { Check } from 'lucide-react'
import { pricing } from '../content/site'
import { scrollToId } from '../lib/smoothScroll'

export function Pricing() {
  return (
    <section
      id="pricing"
      className="relative z-10 bg-teal-deep px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-soft">
          {pricing.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-cream">
          {pricing.title}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-cream/75">{pricing.body}</p>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricing.tiers.map((tier, i) => (
            <motion.article
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col rounded-[var(--radius-card)] p-7 ${
                tier.featured
                  ? 'bg-cream ring-2 ring-coral'
                  : 'bg-cream/8 ring-1 ring-cream/15'
              }`}
            >
              {tier.featured ? (
                <span className="mb-4 self-start rounded-full bg-coral px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-cream">
                  Most picked
                </span>
              ) : null}

              <h3
                className={`font-display text-xl font-bold ${
                  tier.featured ? 'text-teal-deep' : 'text-cream'
                }`}
              >
                {tier.name}
              </h3>

              <p className="mt-4 flex items-baseline gap-2">
                <span
                  className={`font-display text-4xl font-bold ${
                    tier.featured ? 'text-teal-deep' : 'text-cream'
                  }`}
                >
                  {tier.price}
                </span>
                <span
                  className={`text-sm ${
                    tier.featured ? 'text-ink-muted' : 'text-cream/60'
                  }`}
                >
                  {tier.unit}
                </span>
              </p>

              <p
                className={`mt-3 text-sm leading-relaxed ${
                  tier.featured ? 'text-ink-muted' : 'text-cream/70'
                }`}
              >
                {tier.body}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5">
                    <Check
                      size={18}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0"
                      color="var(--color-coral)"
                    />
                    <span
                      className={`text-sm leading-snug ${
                        tier.featured ? 'text-ink' : 'text-cream/85'
                      }`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => scrollToId('contact')}
                className={`mt-8 rounded-full px-6 py-3 font-semibold transition-transform duration-300 hover:scale-[1.03] ${
                  tier.featured
                    ? 'bg-coral text-cream'
                    : 'border border-cream/30 text-cream hover:bg-cream/10'
                }`}
              >
                Get a quote
              </button>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-sm text-cream/55">{pricing.footnote}</p>
      </div>
    </section>
  )
}
