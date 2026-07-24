import { useRef } from 'react'
import { ScrollScene } from '../components/ScrollScene'
import { SceneMedia } from '../components/SceneMedia'
import { AssetImage } from '../components/AssetImage'
import { useProgressEffect, smooth } from '../hooks/useProgressEffect'
import { sceneById } from '../scenes/scenes.config'
import { showcase } from '../content/site'

const scene = sceneById.showcase

/**
 * Scroll-driven gallery. Same pin/scrub primitive as the hero flight, but with
 * `mediaType: 'image'` — the samples wipe over each other via clip-path while a
 * slow Ken-Burns move runs underneath, so it keeps the feeling of one moving
 * camera without costing a video generation.
 */
function Captions({ progressRef }) {
  const captionRefs = useRef([])

  useProgressEffect(progressRef, (p) => {
    const n = showcase.samples.length
    const seg = Math.min(1, Math.max(0, p)) * (n - 1)
    showcase.samples.forEach((_, i) => {
      const el = captionRefs.current[i]
      if (!el) return
      const t = smooth(Math.min(1, Math.max(0, 1 - Math.abs(seg - i) * 1.6)))
      el.style.opacity = String(t)
      el.style.transform = `translate3d(0, ${(1 - t) * 16}px, 0)`
    })
  })

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 pb-10 sm:pb-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="relative h-24">
          {showcase.samples.map((sample, i) => (
            <div
              key={sample.name}
              ref={(el) => {
                captionRefs.current[i] = el
              }}
              className="absolute inset-x-0 bottom-0 scene-layer"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">
                {sample.kind}
              </p>
              <p className="mt-2 font-display text-2xl font-bold text-cream sm:text-3xl">
                {sample.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ReducedLayout() {
  return (
    <div className="bg-teal-deep px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-soft">
          {showcase.eyebrow}
        </p>
        <h2 className="mt-3 text-4xl font-bold text-cream">{showcase.title}</h2>
        <p className="mt-4 max-w-xl leading-relaxed text-cream/80">{showcase.body}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {scene.stills.map((still, i) => (
            <figure key={still.src}>
              <AssetImage
                asset={still}
                className="w-full rounded-[var(--radius-card)] object-cover"
              />
              <figcaption className="mt-3 text-sm text-cream/70">
                <span className="text-coral">{showcase.samples[i].kind}</span> —{' '}
                {showcase.samples[i].name}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Showcase() {
  return (
    <ScrollScene id="showcase" scroll={scene.scroll} milestone={3}>
      {({ progressRef, reduced }) =>
        reduced ? (
          <ReducedLayout />
        ) : (
          <>
            <SceneMedia
              mediaType={scene.mediaType}
              stills={scene.stills}
              transition={scene.transition}
              zoom={scene.zoom}
              pan={scene.pan}
              progressRef={progressRef}
              reduced={reduced}
            />
            <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-teal-deep/85 via-teal-deep/10 to-teal-deep/45" />

            <div className="pointer-events-none absolute inset-x-0 top-[18%] z-20">
              <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-soft">
                  {showcase.eyebrow}
                </p>
                <h2 className="mt-3 max-w-xl text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-cream">
                  {showcase.title}
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/75 sm:text-base">
                  {showcase.body}
                </p>
              </div>
            </div>

            <Captions progressRef={progressRef} />
          </>
        )
      }
    </ScrollScene>
  )
}
