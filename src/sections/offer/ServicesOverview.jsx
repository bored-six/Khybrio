import { Words } from '../../components/Words'
import { Reveal } from '../../components/Reveal'
import {
  IconArrow,
  IconFlow,
  IconPin,
  IconSite,
  IconStack,
} from '../../components/icons/OfferIcons'
import { servicesOverview as S } from '../../content/offer'
import { jumpTo } from './anchor'
import './offer.css'

/**
 * The contents page. Three services and the extras, each a tile that jumps to
 * its own section, laid out as a broadsheet index rather than three equal
 * cards: Websites takes the tall column because it has the most inside it.
 *
 * Each tile carries a small chart of what is actually in the offer, drawn from
 * the spec's own numbers rather than invented metrics: pages per website
 * package (3, 6, 10), the five Google jobs, one workflow against five
 * connected. A reader gets the shape of each service before reading a word.
 */

function TileLink({ children, dark = false, push = true }) {
  return (
    <span
      className={`${push ? 'mt-auto' : ''} inline-flex items-center gap-2 pt-7 text-sm font-semibold ${
        dark ? 'text-cream' : 'text-teal-deep'
      }`}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">
        <IconArrow size={18} />
      </span>
    </span>
  )
}

function Numeral({ n, dark = false }) {
  return (
    <span
      className={`font-display text-5xl leading-none sm:text-6xl ${
        dark ? 'text-cream/30' : 'text-teal-deep/25'
      }`}
      aria-hidden="true"
    >
      {n}
    </span>
  )
}

/** Pages per package, as stacks of little pages that grow upward. */
function PageBars({ tiers }) {
  return (
    <div className="mt-8 flex items-end gap-6 border-b-2 border-cream/15 pb-0 sm:gap-10 lg:gap-14" aria-hidden="true">
      {tiers.map((t) => (
        <div key={t.name}>
          {/* wrap-reverse fills from the bottom, so 3, 6 and 10 pages read
              as bars of 2, 3 and 5 rows. The first page is the home page. */}
          <div className="flex w-[34px] flex-wrap-reverse gap-1.5 lg:w-[72px] lg:gap-2">
            {Array.from({ length: t.pages }, (_, i) => (
              <span
                key={i}
                className={`h-[18px] w-[14px] rounded-[4px] border-2 lg:h-10 lg:w-8 lg:rounded-md ${
                  i === 0 ? 'border-cream bg-cream' : 'border-cream/45'
                }`}
              />
            ))}
          </div>
          <p className="mt-3 text-sm font-semibold text-cream">{t.name}</p>
          <p className="pb-3 text-xs text-cream/60">{t.caption}</p>
        </div>
      ))}
    </div>
  )
}

/** The five Google jobs as numbered beads under one bracket. */
function FiveBeads({ bracket }) {
  return (
    <div className="mt-6 max-w-[17rem]" aria-hidden="true">
      <div className="relative flex items-center justify-between">
        <span className="absolute inset-x-4 top-1/2 h-0.5 -translate-y-1/2 bg-teal-deep/25" />
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            className="relative grid h-8 w-8 place-items-center rounded-full border-2 border-teal-deep bg-cream font-display text-sm font-bold text-teal-deep"
          >
            {n}
          </span>
        ))}
      </div>
      <span className="mt-2 block h-2.5 rounded-b-lg border-x-2 border-b-2 border-teal-deep/35" />
      <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-teal-deep/70">
        {bracket}
      </p>
    </div>
  )
}

/** One node against five connected ones. */
function NodeRows({ rows }) {
  return (
    <div className="mt-6 space-y-3" aria-hidden="true">
      {rows.map((r) => (
        <div key={r.name} className="flex items-center gap-3">
          <span className="w-32 shrink-0 text-xs font-semibold text-teal-deep/70 sm:w-36">
            {r.name}
          </span>
          <span className="flex items-center">
            {Array.from({ length: r.nodes }, (_, i) => (
              <span key={i} className="flex items-center">
                {i > 0 ? <span className="h-0.5 w-3 bg-teal-deep/35 sm:w-4" /> : null}
                <span className="h-3.5 w-3.5 rounded-[4px] border-2 border-teal-deep" />
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  )
}

const tileBase =
  'group relative flex flex-col rounded-[28px] p-6 transition duration-500 hover:-translate-y-1 sm:p-8'

export function ServicesOverview() {
  const { websites, google, automation, addOns } = S.tiles

  return (
    <section id="services" className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Headline left, body right: the masthead of the contents page. */}
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
              {S.eyebrow}
            </p>
            <h2 className="mt-3 max-w-2xl text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-teal-deep">
              <Words text={S.title} />
            </h2>
          </div>
          <p className="max-w-xl leading-relaxed text-ink-muted lg:pb-1.5">{S.body}</p>
        </div>

        <Reveal
          from={{ y: 56, scale: 0.97 }}
          stagger={0.1}
          duration={0.95}
          className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-12"
        >
          {/* 01 Websites: the tall dark column. */}
          <a
            href={websites.href}
            onClick={jumpTo(websites.href)}
            className={`${tileBase} bg-teal-deep text-cream hover:shadow-[0_30px_60px_-30px_rgba(15,43,41,0.7)] lg:col-span-7 lg:row-span-2`}
          >
            <div className="flex items-start justify-between gap-4">
              <Numeral n={websites.n} dark />
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cream/10">
                <IconSite size={26} />
              </span>
            </div>
            <h3 className="mt-6 font-display text-3xl font-bold sm:text-4xl">{websites.name}</h3>
            <p className="mt-3 max-w-md leading-relaxed text-cream/75">{websites.line}</p>
            <div className="mt-auto">
              <PageBars tiers={websites.tiers} />
            </div>
            <TileLink dark push={false}>
              {websites.link}
            </TileLink>
          </a>

          {/* 02 Google */}
          <a
            href={google.href}
            onClick={jumpTo(google.href)}
            className={`${tileBase} bg-teal-soft/30 text-teal-deep hover:shadow-[0_30px_60px_-34px_rgba(15,43,41,0.45)] lg:col-span-5`}
          >
            <div className="flex items-start justify-between gap-4">
              <Numeral n={google.n} />
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-deep text-cream">
                <IconPin size={26} />
              </span>
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold sm:text-[1.7rem]">{google.name}</h3>
            <p className="mt-2.5 leading-relaxed text-ink-muted">{google.line}</p>
            <FiveBeads bracket={google.bracket} />
            <TileLink>{google.link}</TileLink>
          </a>

          {/* 03 Automation */}
          <a
            href={automation.href}
            onClick={jumpTo(automation.href)}
            className={`${tileBase} border-2 border-teal-deep/12 bg-cream text-teal-deep hover:border-teal-deep/30 hover:shadow-[0_30px_60px_-34px_rgba(15,43,41,0.45)] lg:col-span-5`}
          >
            <div className="flex items-start justify-between gap-4">
              <Numeral n={automation.n} />
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-deep text-cream">
                <IconFlow size={26} />
              </span>
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold sm:text-[1.7rem]">{automation.name}</h3>
            <p className="mt-2.5 leading-relaxed text-ink-muted">{automation.line}</p>
            <NodeRows rows={automation.rows} />
            <TileLink>{automation.link}</TileLink>
          </a>

          {/* The extras: dashed, because they bolt onto something else. */}
          <a
            href={addOns.href}
            onClick={jumpTo(addOns.href)}
            className="group flex flex-col gap-5 rounded-[28px] border-2 border-dashed border-teal-deep/25 p-6 text-teal-deep transition-colors duration-500 hover:border-teal-deep/50 hover:bg-teal-soft/10 sm:p-7 lg:col-span-12 lg:flex-row lg:items-center lg:gap-8"
          >
            <div className="flex items-start gap-4 lg:max-w-md">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal-soft/40 text-teal-deep">
                <IconStack size={26} />
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold">{addOns.name}</h3>
                <p className="mt-1.5 leading-relaxed text-ink-muted">{addOns.line}</p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2 lg:ml-auto" aria-hidden="true">
              {addOns.chips.map((c) => (
                <li
                  key={c}
                  className="rounded-full border-2 border-teal-deep/15 px-3 py-1 text-xs font-semibold text-teal-deep"
                >
                  {c}
                </li>
              ))}
            </ul>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold">
              {addOns.link}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <IconArrow size={18} />
              </span>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
