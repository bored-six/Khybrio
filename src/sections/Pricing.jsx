import { motion } from 'motion/react'
import { Check, ShieldCheck } from 'lucide-react'
import { Words } from '../components/Words'
import { useContent } from '../content/context'
import { scrollToId } from '../lib/smoothScroll'
import { Magnetic } from '../components/Magnetic'

export function Pricing() {
  const { pricing } = useContent()
  return (
    <section id="pricing" className="relative z-10 bg-teal-deep px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-soft">
          {pricing.eyebrow}
        </p>
        <h2 className="mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-cream">
          <Words text={pricing.title} />
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-cream/75">{pricing.body}</p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {pricing.reassurances.map((r) => (
            <span key={r} className="flex items-center gap-2 text-sm text-cream/70">
              <ShieldCheck size={16} color="var(--color-coral)" />
              {r}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricing.tiers.map((tier, i) => (
            <motion.article
              key={tier.name}
              initial={{ opacity: 0, y: 90, rotate: i === 1 ? 0 : i === 0 ? -5 : 5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ type: 'spring', stiffness: 85, damping: 15, delay: i * 0.14 }}
              className={`flex flex-col rounded-[var(--radius-card)] p-7 ${
                tier.featured ? 'bg-cream ring-2 ring-coral' : 'bg-cream/8 ring-1 ring-cream/15'
              }`}
            >
              <span
                className={`self-start rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-widest ${
                  tier.featured ? 'bg-coral text-cream' : 'bg-cream/10 text-cream/70'
                }`}
              >
                {tier.label}
              </span>

              <h3
                className={`mt-4 font-display text-2xl font-bold ${
                  tier.featured ? 'text-teal-deep' : 'text-cream'
                }`}
              >
                {tier.name}
              </h3>

              <p
                className={`mt-2 text-sm leading-relaxed ${
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

              <Magnetic className="mt-8 self-start">
                <button
                  type="button"
                  onClick={() => scrollToId('contact')}
                  className={`rounded-full px-6 py-3 font-semibold transition-transform duration-300 hover:scale-[1.03] ${
                    tier.featured
                      ? 'bg-coral text-cream'
                      : 'border border-cream/30 text-cream hover:bg-cream/10'
                  }`}
                >
                  {pricing.cta.label}
                </button>
              </Magnetic>
            </motion.article>
          ))}
        </div>

        {/* Managed plan — deliberately outside the tier grid. It is a monthly
            add-on to any package, not a fourth thing to choose between. */}
        {pricing.managed ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 flex flex-col gap-6 rounded-[var(--radius-card)] bg-cream/8 p-7 ring-1 ring-cream/15 lg:flex-row lg:items-center"
          >
            <div className="lg:w-[26rem] lg:shrink-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <h3 className="font-display text-xl font-bold text-cream">
                  {pricing.managed.name}
                </h3>
                <span className="rounded-full bg-cream/12 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-cream/70">
                  {pricing.managed.unit}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">{pricing.managed.body}</p>
            </div>
            <ul className="grid flex-1 gap-2.5 sm:grid-cols-2">
              {pricing.managed.features.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <Check
                    size={17}
                    strokeWidth={2.5}
                    className="mt-0.5 shrink-0"
                    color="var(--color-coral)"
                  />
                  <span className="text-sm leading-snug text-cream/85">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}

        {/* Founding-clients band. Says outright that the offer is new, which
            beats implying a track record that comes apart the first time
            somebody asks for a reference. */}
        {pricing.founding ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 rounded-[var(--radius-card)] bg-coral p-7 sm:p-9"
          >
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-cream/75">
              {pricing.founding.label}
            </p>
            <h3 className="mt-2 font-display text-[clamp(1.5rem,3.2vw,2.1rem)] font-bold text-cream">
              {pricing.founding.title}
            </h3>
            <p className="mt-3 max-w-3xl leading-relaxed text-cream/90">
              {pricing.founding.body}
            </p>
          </motion.div>
        ) : null}

        <p className="mt-8 text-sm text-cream/55">{pricing.footnote}</p>
      </div>
    </section>
  )
}
