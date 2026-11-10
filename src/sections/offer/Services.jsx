import { Reveal } from '../../components/Reveal'
import {
  IconCard,
  IconCare,
  IconContent,
  IconFlow,
  IconPin,
  IconSite,
} from '../../components/icons/OfferIcons'
import { services as S } from '../../content/offer'
import { Scene } from './Packages'
import { SectionHead } from './shared'

/**
 * Everything the packages are made from: the six service groups on the
 * operational map, filed under the three pillars of the positioning line.
 *
 * Laid out as an index, not a wall of cards: one ruled row per pillar, the
 * pillar name in the margin, its services across the row. The item lists run
 * inline as plain text so six groups fit in about one screen.
 *
 * On wide screens the margin under each pillar name holds a small window onto
 * the island (the same Scene as the package cards): the code nook, the NFC
 * kiosk, the handshake. Below lg the margin collapses into a heading line, so
 * the windows are dropped there rather than stacked into a phone-length list.
 */

const ICONS = {
  site: IconSite,
  flow: IconFlow,
  pin: IconPin,
  content: IconContent,
  card: IconCard,
  care: IconCare,
}

export function Services() {
  return (
    <section id="services" className="relative z-10 bg-cream px-5 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12">
      <div className="mx-auto max-w-7xl">
        <SectionHead eyebrow={S.eyebrow} title={S.title} body={S.body} />

        <Reveal as="div" from={{ y: 36 }} stagger={0.1} className="mt-12 border-t-2 border-teal-deep">
          {S.pillars.map((pillar, p) => (
            <div
              key={pillar.key}
              className="group grid gap-6 border-b-2 border-teal-deep/12 py-8 lg:grid-cols-12 lg:gap-8"
            >
              <div className="flex items-baseline gap-3 lg:col-span-3 lg:block">
                <span className="font-display text-sm font-bold text-coral">
                  {String(p + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-2xl font-bold text-teal-deep lg:mt-2">{pillar.name}</h3>
                <p className="text-sm text-ink-muted lg:mt-1">{pillar.line}</p>
                {pillar.scene ? (
                  <Scene
                    scene={pillar.scene}
                    index={p}
                    className="hidden aspect-[16/10] rounded-[20px] lg:mt-5 lg:block"
                  />
                ) : null}
              </div>

              <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-3">
                {pillar.items.map((item) => {
                  const Icon = ICONS[item.icon]
                  return (
                    <li key={item.key} className="flex gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-teal-deep text-cream">
                        <Icon size={22} />
                      </span>
                      <div>
                        <h4 className="font-semibold text-teal-deep">{item.name}</h4>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                          {item.list.join(' · ')}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
