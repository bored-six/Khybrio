import { Words } from '../../components/Words'
import { Magnetic } from '../../components/Magnetic'
import { IconArrow } from '../../components/icons/OfferIcons'
import { quoteCta } from '../../content/offer'
import { jumpTo } from './anchor'

/**
 * Pieces every offer section shares. Kept small on purpose: the sections are
 * meant to feel like different moments (a contents page, a configurator, an
 * annotated phone, a switchboard, a ruler), so only the furniture is common.
 */

/** Eyebrow, word-reveal headline, body. `dark` for the teal chambers. */
export function SectionHead({ eyebrow, title, body, dark = false, center = false, className = '' }) {
  return (
    <div className={`${center ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'} ${className}`}>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.18em] ${
          dark ? 'text-teal-soft' : 'text-teal-bright'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold ${
          dark ? 'text-cream' : 'text-teal-deep'
        }`}
      >
        <Words text={title} />
      </h2>
      {body ? (
        <p
          className={`mt-4 leading-relaxed ${dark ? 'text-cream/75' : 'text-ink-muted'} ${
            center ? 'mx-auto max-w-2xl' : 'max-w-xl'
          }`}
        >
          {body}
        </p>
      ) : null}
    </div>
  )
}

/** The package ending: a coral pill to the contact form. */
export function QuoteButton({ label = quoteCta.label, className = '' }) {
  return (
    <Magnetic className={className}>
      <a
        href={quoteCta.href}
        onClick={jumpTo(quoteCta.href)}
        className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-coral px-6 py-3 font-semibold text-cream transition-transform duration-300 hover:scale-[1.03]"
      >
        {label}
        <IconArrow size={18} />
      </a>
    </Magnetic>
  )
}

/**
 * The "Example" badge. Load-bearing (BUSINESS.md voice rule 2): every mock
 * on these sections is invented, and unlabelled it would read as a client.
 */
export function ExampleBadge({ label = 'Example', light = false, className = '' }) {
  return (
    <span
      className={`shrink-0 rounded-lg px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-widest ${
        light ? 'bg-cream text-teal-deep' : 'bg-teal-deep text-cream'
      } ${className}`}
    >
      {label}
    </span>
  )
}
