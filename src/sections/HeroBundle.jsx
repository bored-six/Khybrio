import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { ScrollScene } from '../components/ScrollScene'
import { SceneMedia } from '../components/SceneMedia'
import { HotspotCards } from '../components/HotspotCards'
import { AssetImage } from '../components/AssetImage'
import { useProgressEffect, band, smooth } from '../hooks/useProgressEffect'
import { scrollToId } from '../lib/smoothScroll'
import { sceneById } from '../scenes/scenes.config'
import { hero, bundle } from '../content/site'

const scene = sceneById['hero-bundle']

/**
 * Milestone 0 is "the island", milestone 2 is "the bundle". The counter ticks
 * over mid-pin, with no section boundary in sight — which is precisely the
 * point: the visitor never sees where one technique ends and the next begins.
 */
const heroMilestone = (p) => (p >= scene.milestoneSwitchAt ? 2 : 0)

/**
 * HERO and THE BUNDLE are one pinned section, not two.
 *
 * The flight clip spans both — it starts on the wide island and lands on the
 * town-centre cluster — so a single ScrollTrigger owns the whole range and
 * drives one video's currentTime. Splitting them into separate sections would
 * mean two triggers fighting over the same element. "THE BUNDLE" is simply the
 * back half of this range: the copy swaps over, the counter ticks, and the
 * hotspot cards land once the camera has arrived.
 */
function FlightCopy({ progressRef }) {
  const heroRef = useRef(null)
  const bundleRef = useRef(null)
  const hintRef = useRef(null)

  useProgressEffect(progressRef, (p) => {
    const heroOut = smooth(band(p, 0.03, 0.26))
    if (heroRef.current) {
      heroRef.current.style.opacity = String(1 - heroOut)
      heroRef.current.style.transform = `translate3d(0, ${heroOut * -40}px, 0)`
    }

    const bundleIn = smooth(band(p, 0.44, 0.62))
    if (bundleRef.current) {
      bundleRef.current.style.opacity = String(bundleIn)
      bundleRef.current.style.transform = `translate3d(0, ${(1 - bundleIn) * 28}px, 0)`
    }

    if (hintRef.current) {
      hintRef.current.style.opacity = String(1 - smooth(band(p, 0, 0.08)))
    }
  })

  return (
    <>
      <div
        ref={heroRef}
        className="pointer-events-none absolute inset-0 z-20 flex items-center scene-layer"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-soft">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.4rem,7vw,4.75rem)] font-bold leading-[1.02] text-cream">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            {hero.body}
          </p>
          <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
            <a
              href={hero.cta.href}
              onClick={(e) => {
                e.preventDefault()
                scrollToId('bundle')
              }}
              className="rounded-full bg-coral px-7 py-3.5 font-semibold text-cream transition-transform duration-300 hover:scale-[1.04]"
            >
              {hero.cta.label}
            </a>
            <a
              href={hero.secondary.href}
              onClick={(e) => {
                e.preventDefault()
                scrollToId('contact')
              }}
              className="rounded-full border border-cream/30 px-7 py-3.5 font-semibold text-cream transition-colors duration-300 hover:bg-cream/10"
            >
              {hero.secondary.label}
            </a>
          </div>
        </div>
      </div>

      <div
        ref={bundleRef}
        className="pointer-events-none absolute inset-x-0 top-[16%] z-20 scene-layer"
        style={{ opacity: 0 }}
      >
        <div className="mx-auto w-full max-w-7xl px-5 text-center sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-soft">
            {bundle.eyebrow}
          </p>
          <h2 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-bold text-cream">
            {bundle.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/80 sm:text-base">
            {bundle.body}
          </p>
        </div>
      </div>

      <div
        ref={hintRef}
        className="pointer-events-none absolute inset-x-0 bottom-7 z-20 flex flex-col items-center gap-1.5 text-cream/60"
      >
        <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em]">
          {hero.hint}
        </span>
        <ChevronDown size={16} />
      </div>
    </>
  )
}

/** Static, unpinned equivalent for visitors who asked for less motion. */
function ReducedLayout() {
  return (
    <div className="bg-teal-deep">
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-32 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-soft">
          {hero.eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.2rem,6vw,4rem)] font-bold leading-[1.05] text-cream">
          {hero.title}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/80">{hero.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#bundle"
            className="rounded-full bg-coral px-7 py-3.5 font-semibold text-cream"
          >
            {hero.cta.label}
          </a>
          <a
            href="#contact"
            className="rounded-full border border-cream/30 px-7 py-3.5 font-semibold text-cream"
          >
            {hero.secondary.label}
          </a>
        </div>

        <AssetImage
          asset={scene.stills[1]}
          loading="eager"
          className="mt-12 w-full rounded-[var(--radius-card)] object-cover"
        />

        <div className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-soft">
            {bundle.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-bold text-cream">{bundle.title}</h2>
          <p className="mt-4 max-w-xl leading-relaxed text-cream/80">{bundle.body}</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {bundle.hotspots.map((spot) => (
              <article
                key={spot.id}
                className="rounded-[var(--radius-card)] bg-cream p-5"
              >
                <h3 className="font-display text-lg font-bold text-teal-deep">
                  {spot.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{spot.body}</p>
                <p className="mt-3 font-display text-sm font-bold text-coral">
                  {spot.price}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function HeroBundle() {
  return (
    <ScrollScene
      id="hero"
      scroll={scene.scroll}
      milestone={heroMilestone}
      anchors={[{ id: 'bundle', at: scene.milestoneSwitchAt }]}
    >
      {({ progressRef, reduced }) =>
        reduced ? (
          <ReducedLayout />
        ) : (
          <>
            <SceneMedia
              mediaType={scene.mediaType}
              clip={scene.clip}
              stills={scene.stills}
              transition={scene.transition}
              zoom={scene.zoom}
              pan={scene.pan}
              progressRef={progressRef}
              reduced={reduced}
            />
            {/* Scrim: the headline has to stay readable over whatever the
                island's afternoon light is doing behind it. */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-teal-deep/75 via-teal-deep/25 to-teal-deep/80" />
            <FlightCopy progressRef={progressRef} />
            <HotspotCards
              progressRef={progressRef}
              appearAt={scene.hotspotsAt}
              reduced={reduced}
            />
          </>
        )
      }
    </ScrollScene>
  )
}
