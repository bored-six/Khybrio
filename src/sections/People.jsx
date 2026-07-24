import { useRef } from 'react'
import { ScrollScene } from '../components/ScrollScene'
import { AssetImage } from '../components/AssetImage'
import { InitialsAvatar } from '../components/InitialsAvatar'
import { useProgressEffect, band, smooth, lerp } from '../hooks/useProgressEffect'
import { sceneById } from '../scenes/scenes.config'
import { people } from '../content/site'

const scene = sceneById.people
const N = people.members.length

/**
 * One pinned scene stepping through the four of us, rather than four pinned
 * sections — four separate pins would eat an absurd amount of scroll and make
 * the page feel like it never ends.
 *
 * Each member owns a quarter of the scene's progress, and inside their band:
 * the Khybi zone image animates in, holds for a beat as if presenting, then the
 * card slides in beside it. Same beat for each, staggered by scroll position.
 */
function Members({ progressRef }) {
  const groupRefs = useRef([])
  const imageRefs = useRef([])
  const cardRefs = useRef([])

  useProgressEffect(progressRef, (p) => {
    for (let i = 0; i < N; i++) {
      const start = i / N
      const local = band(p, start, start + 1 / N)

      const group = groupRefs.current[i]
      const image = imageRefs.current[i]
      const card = cardRefs.current[i]
      if (!group || !image || !card) continue

      // Only the active member's slice is on screen; the rest sit at zero
      // opacity so there is no stack of half-faded people behind them.
      const visible = smooth(band(local, 0, 0.12)) * (1 - smooth(band(local, 0.88, 1)))
      group.style.opacity = String(i === N - 1 ? smooth(band(local, 0, 0.12)) : visible)
      group.style.pointerEvents = visible > 0.5 ? 'auto' : 'none'

      // Khybi arrives first.
      const imgIn = smooth(band(local, 0.04, 0.3))
      image.style.opacity = String(imgIn)
      image.style.transform = `translate3d(0, ${(1 - imgIn) * 42}px, 0) scale(${lerp(0.92, 1, imgIn)})`

      // Brief pause (0.3 -> 0.46) reads as "presenting", then the card lands.
      const cardIn = smooth(band(local, 0.46, 0.72))
      card.style.opacity = String(cardIn)
      card.style.transform = `translate3d(${(1 - cardIn) * 36}px, 0, 0)`
    }
  })

  return (
    <div className="absolute inset-0 z-20">
      {people.members.map((member, i) => (
        <div
          key={member.name}
          ref={(el) => {
            groupRefs.current[i] = el
          }}
          className="absolute inset-0 flex items-center scene-layer"
          style={{ opacity: 0 }}
        >
          <div className="mx-auto grid w-full max-w-5xl items-center gap-8 px-5 sm:px-8 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] md:gap-12">
            <div
              ref={(el) => {
                imageRefs.current[i] = el
              }}
              className="scene-layer mx-auto w-[58%] max-w-[19rem] md:w-full md:max-w-none"
            >
              <AssetImage
                asset={scene.stills[i]}
                className="w-full rounded-[var(--radius-card)] object-cover"
                style={{ aspectRatio: '3 / 4' }}
              />
            </div>

            <article
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              className="scene-layer rounded-[var(--radius-card)] bg-cream p-6 sm:p-8"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4">
                <InitialsAvatar initials={member.initials} accent={member.accent} />
                <div>
                  <h3 className="font-display text-xl font-bold text-teal-deep sm:text-2xl">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-teal-bright">{member.role}</p>
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-ink-muted">{member.blurb}</p>
              <p className="mt-6 font-display text-xs font-semibold tabular-nums tracking-widest text-teal-soft">
                {String(i + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
              </p>
            </article>
          </div>
        </div>
      ))}
    </div>
  )
}

function ReducedLayout() {
  return (
    <div className="bg-teal-deep px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-soft">
          {people.eyebrow}
        </p>
        <h2 className="mt-3 text-4xl font-bold text-cream">{people.title}</h2>
        <p className="mt-4 max-w-xl leading-relaxed text-cream/80">{people.body}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {people.members.map((member, i) => (
            <article
              key={member.name}
              className="rounded-[var(--radius-card)] bg-cream p-6"
            >
              <AssetImage
                asset={scene.stills[i]}
                className="mb-5 w-full rounded-xl object-cover"
                style={{ aspectRatio: '3 / 4' }}
              />
              <div className="flex items-center gap-4">
                <InitialsAvatar initials={member.initials} accent={member.accent} />
                <div>
                  <h3 className="font-display text-xl font-bold text-teal-deep">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-teal-bright">{member.role}</p>
                </div>
              </div>
              <p className="mt-4 leading-relaxed text-ink-muted">{member.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export function People() {
  return (
    <ScrollScene
      id="people"
      scroll={scene.scroll}
      milestone={4}
      className="bg-teal-deep"
    >
      {({ progressRef, reduced }) =>
        reduced ? (
          <ReducedLayout />
        ) : (
          <>
            <div className="absolute inset-0 bg-teal-deep" />
            <div className="pointer-events-none absolute inset-x-0 top-[9%] z-30">
              <div className="mx-auto max-w-5xl px-5 sm:px-8">
                {/* Eyebrow above the heading — "BEHIND THE BUNDLE", not a
                    plain "Team" label. */}
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coral">
                  {people.eyebrow}
                </p>
                <h2 className="mt-2 text-[clamp(1.9rem,4.5vw,3rem)] font-bold text-cream">
                  {people.title}
                </h2>
              </div>
            </div>
            <Members progressRef={progressRef} />
          </>
        )
      }
    </ScrollScene>
  )
}
