import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { ScrollScene } from '../components/ScrollScene'
import { SceneMedia } from '../components/SceneMedia'
import { AssetImage } from '../components/AssetImage'
import { InitialsAvatar } from '../components/InitialsAvatar'
import { Magnetic } from '../components/Magnetic'
import { useProgressEffect, band, smooth } from '../hooks/useProgressEffect'
import { scrollToId, scrollToSceneProgress } from '../lib/smoothScroll'
import { scenes } from '../scenes/scenes.config'
import { flight } from '../content/site'

const scene = scenes.flight
const zones = flight.zones
const N = zones.length

const clamp01 = (v) => Math.min(1, Math.max(0, v))

// Snap the flight to each zone's centre, so a light scroll settles cleanly on
// the next zone instead of requiring a precise landing.
const flightSnap = {
  snapTo: zones.map((_, i) => (i + 0.5) / N),
  duration: { min: 0.2, max: 0.6 },
  delay: 0.05,
  ease: 'power1.inOut',
}

/** CTA/nav that may jump into the flight at a zone (flightProgress) or to a section. */
const ctaClick = (cta) => (e) => {
  e.preventDefault()
  if (cta.flightProgress != null) scrollToSceneProgress('flight', cta.flightProgress)
  else scrollToId(cta.href.slice(1))
}

/**
 * Opacity for zone `i` at flight position `seg` (0..N). Each zone holds solid
 * across its own band and does a quick 50/50 crossfade with its neighbour at
 * the shared boundary — never two solid copies at once. The first zone is
 * clamped fully on before its centre and the last fully on after, so the
 * opening and closing copy read at full strength at the very top and bottom.
 */
const W = 0.42 // crossfade width, in zone-band units
function zoneVis(seg, i) {
  let rise = smooth(clamp01((seg - (i - W / 2)) / W))
  let fall = smooth(clamp01((seg - (i + 1 - W / 2)) / W))
  if (i === 0) rise = 1
  if (i === N - 1) fall = 0
  return rise * (1 - fall)
}

/** Milestone (counter zone) from flight progress — one band per zone. */
const flightMilestone = (p) => Math.min(N - 1, Math.max(0, Math.floor(p * N)))

/** Headline with exactly one phrase in the coral accent. */
function Headline({ parts }) {
  return (
    <h2 className="text-[clamp(2.1rem,5.5vw,4rem)] font-bold leading-[1.04] text-cream">
      {parts[0]}
      <span className="text-coral">{parts[1]}</span>
      {parts[2]}
    </h2>
  )
}

/**
 * All eight zones' copy + cards live in the DOM at once; this fades each in as
 * its band comes into focus during the single scrubbed flight. Everything is
 * driven off one progress ref — the copy, the bundle hotspots, the crew cards
 * and the scroll hint can't drift out of sync with the camera because they all
 * read the same value.
 */
function FlightOverlay({ progressRef }) {
  const copyRefs = useRef([])
  const cardRefs = useRef([])
  const hintRef = useRef(null)

  useProgressEffect(progressRef, (p) => {
    const seg = p * N // 0..N across the flight
    for (let i = 0; i < N; i++) {
      const vis = zoneVis(seg, i)
      const copy = copyRefs.current[i]
      if (copy) {
        copy.style.opacity = String(vis)
        copy.style.transform = `translate3d(0, ${(1 - vis) * 22}px, 0)`
        // Only the solid zone captures clicks, so faded CTAs behind it stay inert.
        copy.style.pointerEvents = vis > 0.6 ? 'auto' : 'none'
      }
      const card = cardRefs.current[i]
      if (card) {
        // Cards ride the zone opacity but only appear near its centre — the
        // "presenting" beat — so they never linger through a crossfade.
        const dc = Math.abs(seg - (i + 0.5))
        const cardVis = vis * smooth(clamp01((0.5 - dc) / 0.3))
        card.style.opacity = String(cardVis)
        card.style.transform = `translate3d(${(1 - cardVis) * 24}px, 0, 0)`
      }
    }
    if (hintRef.current) {
      hintRef.current.style.opacity = String(1 - smooth(band(p, 0, 0.06)))
    }
  })

  return (
    <>
      {/* Copy column. Centred-left on desktop; on mobile it drops to the lower
          third (over the mobile bottom scrim) so the island stays visible up
          top instead of everything cramming into the middle. */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="relative mx-auto h-full w-full max-w-7xl">
          {zones.map((z, i) => (
            <div
              key={z.key}
              ref={(el) => {
                copyRefs.current[i] = el
              }}
              className="absolute inset-x-5 bottom-[15%] scene-layer sm:inset-x-8 md:top-1/2 md:bottom-auto md:-translate-y-1/2"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-teal-soft sm:text-xs">
                {z.eyebrow}
              </p>
              <div className="mt-2 max-w-2xl sm:mt-3">
                <Headline parts={z.title} />
              </div>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream/80 sm:mt-4 sm:text-base md:text-lg">
                {z.sub}
              </p>

              {/* Mobile-only inline info — the desktop right-hand card is hidden
                  on small screens, so surface the price / crew here instead. */}
              {z.hotspot ? (
                <p className="mt-3 font-display text-xl font-bold text-coral md:hidden">
                  {z.hotspot.price}
                </p>
              ) : null}
              {z.crew ? (
                <div className="mt-3 flex items-center gap-3 md:hidden">
                  <InitialsAvatar initials={z.crew.initials} accent={z.crew.accent} size={40} />
                  <div>
                    <p className="font-semibold text-cream">{z.crew.name}</p>
                    <p className="text-sm text-teal-soft">{z.crew.role}</p>
                  </div>
                </div>
              ) : null}

              {z.ctas ? (
                <div className="pointer-events-auto mt-5 flex flex-wrap gap-3 sm:mt-7">
                  <Magnetic>
                    <a
                      href={z.ctas.primary.href ?? '#flight'}
                      onClick={ctaClick(z.ctas.primary)}
                      className="inline-block rounded-full bg-coral px-6 py-3 font-semibold text-cream transition-transform duration-300 hover:scale-[1.04] sm:px-7 sm:py-3.5"
                    >
                      {z.ctas.primary.label}
                    </a>
                  </Magnetic>
                  <Magnetic>
                    <a
                      href={z.ctas.secondary.href ?? '#flight'}
                      onClick={ctaClick(z.ctas.secondary)}
                      className="inline-block rounded-full border border-cream/30 px-6 py-3 font-semibold text-cream transition-colors duration-300 hover:bg-cream/10 sm:px-7 sm:py-3.5"
                    >
                      {z.ctas.secondary.label}
                    </a>
                  </Magnetic>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Cards column, right — bundle hotspot or crew card per zone (desktop). */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden items-center md:flex">
        <div className="relative ml-auto mr-8 w-[21rem] lg:mr-16">
          {zones.map((z, i) => {
            if (!z.hotspot && !z.crew) return <div key={z.key} />
            return (
              <article
                key={z.key}
                ref={(el) => {
                  cardRefs.current[i] = el
                }}
                className="absolute right-0 top-1/2 w-[21rem] -translate-y-1/2 rounded-[var(--radius-card)] bg-cream/95 p-6 shadow-[0_10px_40px_rgba(15,43,41,0.28)] backdrop-blur-sm scene-layer"
                style={{ opacity: 0 }}
              >
                {z.crew ? (
                  <>
                    <div className="flex items-center gap-4">
                      <InitialsAvatar initials={z.crew.initials} accent={z.crew.accent} />
                      <div>
                        <h3 className="font-display text-lg font-bold text-teal-deep">
                          {z.crew.name}
                        </h3>
                        <p className="text-sm font-medium text-teal-bright">{z.crew.role}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-ink-muted">{z.sub}</p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-bright">
                      {z.eyebrow}
                    </p>
                    <p className="mt-2 font-display text-2xl font-bold text-coral">
                      {z.hotspot.price}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{z.sub}</p>
                  </>
                )}
              </article>
            )
          })}
        </div>
      </div>

      {/* Scroll cue, first zone only. */}
      <div
        ref={hintRef}
        className="pointer-events-none absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-1.5 text-cream/60"
      >
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em]">
          {flight.hint}
        </span>
        <ChevronDown size={16} />
      </div>
    </>
  )
}

/** Static stacked layout for reduced-motion / no-pin. */
function ReducedLayout() {
  return (
    <div className="bg-teal-deep px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl space-y-16">
        {zones.map((z, i) => (
          <div key={z.key} className="grid gap-6 md:grid-cols-2 md:items-center">
            <AssetImage
              asset={scene.stills[i]}
              loading={i === 0 ? 'eager' : 'lazy'}
              className="w-full rounded-[var(--radius-card)] object-cover"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-soft">
                {z.eyebrow}
              </p>
              <div className="mt-2">
                <Headline parts={z.title} />
              </div>
              <p className="mt-3 leading-relaxed text-cream/80">{z.sub}</p>
              {z.hotspot ? (
                <p className="mt-3 font-display text-lg font-bold text-coral">
                  {z.hotspot.price}
                </p>
              ) : null}
              {z.crew ? (
                <div className="mt-4 flex items-center gap-3">
                  <InitialsAvatar initials={z.crew.initials} accent={z.crew.accent} size={44} />
                  <div>
                    <p className="font-semibold text-cream">{z.crew.name}</p>
                    <p className="text-sm text-teal-soft">{z.crew.role}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Flight() {
  return (
    <ScrollScene
      id="flight"
      scroll={scene.scroll}
      milestone={flightMilestone}
      snap={flightSnap}
    >
      {({ progressRef, reduced }) =>
        reduced ? (
          <ReducedLayout />
        ) : (
          <>
            <SceneMedia
              mediaType={scene.mediaType}
              clip={scene.clip}
              heroLoop={scene.heroLoop}
              stills={scene.stills}
              transition={scene.transition}
              zoom={scene.zoom}
              pan={scene.pan}
              progressRef={progressRef}
              reduced={reduced}
            />
            {/* Desktop scrim: dark on the copy side (left), clear across the
                right third so the island stays visible. Hidden on mobile — a
                left-heavy gradient darkens the whole narrow screen. */}
            <div
              className="pointer-events-none absolute inset-0 z-10 hidden md:block"
              style={{
                background:
                  'linear-gradient(100deg, rgba(28,77,74,0.94) 0%, rgba(28,77,74,0.55) 28%, rgba(28,77,74,0.12) 48%, rgba(28,77,74,0) 62%)',
              }}
            />
            {/* Mobile scrim: dark at the bottom (where the copy sits), clear at
                the top so the island reads. */}
            <div
              className="pointer-events-none absolute inset-0 z-10 md:hidden"
              style={{
                background:
                  'linear-gradient(to top, rgba(28,77,74,0.96) 0%, rgba(28,77,74,0.78) 24%, rgba(28,77,74,0.25) 52%, rgba(28,77,74,0) 78%)',
              }}
            />
            {/* Whisper of a bottom vignette for a premium edge (desktop). */}
            <div
              className="pointer-events-none absolute inset-0 z-10 hidden md:block"
              style={{
                background:
                  'linear-gradient(to top, rgba(28,77,74,0.45) 0%, rgba(28,77,74,0) 32%)',
              }}
            />
            <FlightOverlay progressRef={progressRef} />
          </>
        )
      }
    </ScrollScene>
  )
}
