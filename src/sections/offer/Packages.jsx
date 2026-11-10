import { Reveal } from '../../components/Reveal'
import { IconRepeat, IconYes } from '../../components/icons/OfferIcons'
import { packages as P } from '../../content/offer'
import { QuoteButton, SectionHead } from './shared'

/**
 * The three packages, side by side. Each one builds on the last, so each card
 * opens with a stack of layers: the ones it inherits sit underneath, and the
 * layer it adds is the coral one on top. A reader sees the ladder before
 * reading a word, and the stack is the only decoration the cards carry.
 *
 * The middle card is the dark one: it closes the gap between being found and
 * being booked, so it is the one we recommend. The badge says "Our pick",
 * never "most picked": that would be proof we do not have (BUSINESS.md rule 1).
 */

function Layers({ count, dark }) {
  return (
    <div className="flex flex-col-reverse gap-1.5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`block h-2.5 rounded-full transition-colors ${
            i === count - 1
              ? 'bg-coral'
              : i < count
                ? dark
                  ? 'bg-cream/70'
                  : 'bg-teal-deep/70'
                : dark
                  ? 'border-2 border-dashed border-cream/20'
                  : 'border-2 border-dashed border-teal-deep/15'
          }`}
          style={{ width: `${100 - i * 20}px` }}
        />
      ))}
    </div>
  )
}

function List({ label, items, icon: Icon, dark }) {
  return (
    <div>
      <p
        className={`text-[0.65rem] font-bold uppercase tracking-[0.16em] ${
          dark ? 'text-teal-soft' : 'text-teal-bright'
        }`}
      >
        {label}
      </p>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-[0.95rem] leading-snug">
            <span className={`mt-0.5 shrink-0 ${dark ? 'text-coral' : 'text-teal-bright'}`}>
              <Icon size={18} />
            </span>
            <span className={dark ? 'text-cream/85' : 'text-ink/80'}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Packages() {
  return (
    <section id="packages" className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow={P.eyebrow} title={P.title} body={P.body} />

        <Reveal
          from={{ y: 48, scale: 0.97 }}
          stagger={0.12}
          duration={0.9}
          className="mt-12 grid items-stretch gap-4 sm:gap-5 lg:grid-cols-3"
        >
          {P.tiers.map((tier, i) => {
            const dark = Boolean(tier.featured)
            return (
              <article
                key={tier.key}
                className={`relative flex flex-col rounded-[28px] p-6 sm:p-8 ${
                  dark
                    ? 'bg-teal-deep text-cream shadow-[0_40px_70px_-40px_rgba(15,43,41,0.8)] lg:-my-4 lg:py-12'
                    : 'border-2 border-teal-deep/12 bg-cream text-teal-deep'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <Layers count={i + 1} dark={dark} />
                  {tier.featured ? (
                    <span className="whitespace-nowrap rounded-full bg-coral px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest text-cream">
                      {tier.featured}
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-7 font-display text-3xl font-bold sm:text-[2.1rem]">{tier.name}</h3>
                <p className={`mt-2.5 leading-relaxed ${dark ? 'text-cream/75' : 'text-ink-muted'}`}>
                  {tier.line}
                </p>

                {tier.inherits ? (
                  <p
                    className={`mt-5 rounded-xl px-3 py-2 text-sm font-semibold ${
                      dark ? 'bg-cream/10 text-cream' : 'bg-teal-soft/30 text-teal-deep'
                    }`}
                  >
                    {tier.inherits}
                  </p>
                ) : null}

                <div className="mt-6 space-y-6">
                  <List label={P.setupLabel} items={tier.setup} icon={IconYes} dark={dark} />
                  <div className={`h-px ${dark ? 'bg-cream/15' : 'bg-teal-deep/10'}`} />
                  <List label={P.monthlyLabel} items={tier.monthly} icon={IconRepeat} dark={dark} />
                </div>
              </article>
            )
          })}
        </Reveal>

        <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-ink-muted">{P.note}</p>
          <QuoteButton />
        </div>
      </div>
    </section>
  )
}
