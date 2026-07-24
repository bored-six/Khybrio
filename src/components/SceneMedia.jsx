import { useRef } from 'react'
import { AssetImage } from './AssetImage'
import { useScrubbedVideo } from '../hooks/useScrubbedVideo'
import { useKenBurns } from '../hooks/useKenBurns'
import { useProgressEffect, smooth } from '../hooks/useProgressEffect'

const clamp = (v) => Math.min(1, Math.max(0, v))

/**
 * A stack of stills scrubbed against scene progress. Two transition styles:
 *
 *   'crossfade' — adjacent layers dissolve into each other.
 *   'clip'      — each layer wipes in over the previous one (used by the
 *                 showcase gallery).
 *
 * The Ken-Burns move is applied once to the whole stack rather than per layer,
 * so the camera reads as continuous across the cuts.
 */
function StillStack({ stills, progressRef, transition, zoom, pan, foreground, reduced }) {
  const stackRef = useRef(null)
  const foregroundRef = useRef(null)
  const layerRefs = useRef([])

  useKenBurns({ ref: stackRef, progressRef, zoom, pan, depth: 1, enabled: !reduced })
  // A separate subject layer drifts at a different rate, faking depth.
  useKenBurns({
    ref: foregroundRef,
    progressRef,
    zoom,
    pan,
    depth: 0.45,
    enabled: !reduced && Boolean(foreground),
  })

  useProgressEffect(progressRef, (p) => {
    const n = stills.length
    if (n < 2) return

    const seg = clamp(p) * (n - 1)

    for (let k = 0; k < n; k++) {
      const el = layerRefs.current[k]
      if (!el) continue

      if (transition === 'clip') {
        // Layer 0 is the base; each later layer wipes in left-to-right.
        if (k === 0) {
          el.style.clipPath = 'inset(0 0 0 0)'
          el.style.opacity = '1'
          continue
        }
        const r = smooth(clamp(seg - (k - 1)))
        el.style.clipPath = `inset(0 ${(1 - r) * 100}% 0 0)`
        el.style.opacity = '1'
      } else {
        el.style.opacity = String(smooth(clamp(1 - Math.abs(seg - k))))
      }
    }
  })

  return (
    <div ref={stackRef} className="absolute inset-0 scene-layer">
      {stills.map((still, k) => (
        <AssetImage
          key={still.src}
          asset={still}
          ref={(el) => {
            layerRefs.current[k] = el
          }}
          loading={k === 0 ? 'eager' : 'lazy'}
          // First zone wins the network so it paints immediately; later zones
          // yield so they don't compete with it on load.
          fetchPriority={k === 0 ? 'high' : 'low'}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: k === 0 ? 1 : 0,
            zIndex: k,
            objectPosition: 'center 44%',
          }}
        />
      ))}
      {foreground ? (
        <div ref={foregroundRef} className="absolute inset-0 scene-layer">
          <AssetImage
            asset={foreground}
            className="absolute inset-0 h-full w-full object-contain"
          />
        </div>
      ) : null}
    </div>
  )
}

/**
 * Media renderer for a scrubbed scene. `mediaType` picks the technique; the
 * surrounding ScrollScene never knows which one ran.
 *
 * For `mediaType: 'video'` the stills stack still renders underneath as the
 * live fallback. Until the Higgsfield flight clip exists — and whenever the
 * fetch fails, or the visitor prefers reduced motion — that fallback IS the
 * hero: the two stills cross-fade against the very same progress value the
 * video would have scrubbed. So the section behaves correctly today, and the
 * clip is a pure drop-in upgrade.
 */
export function SceneMedia({
  mediaType = 'image',
  clip,
  stills,
  foreground,
  progressRef,
  reduced,
  zoom = [1, 1.12],
  pan = [0, 0],
  transition = 'crossfade',
}) {
  const videoRef = useRef(null)

  const status = useScrubbedVideo({
    videoRef,
    progressRef,
    src: clip,
    enabled: mediaType === 'video' && !reduced,
  })

  return (
    <div className="absolute inset-0 overflow-hidden bg-teal-deep">
      <StillStack
        stills={stills}
        progressRef={progressRef}
        transition={transition}
        zoom={zoom}
        pan={pan}
        foreground={foreground}
        reduced={reduced}
      />

      {mediaType === 'video' && !reduced ? (
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover scene-layer transition-opacity duration-700"
          style={{
            opacity: status === 'ready' ? 1 : 0,
            objectPosition: 'center 44%',
            zIndex: 20,
          }}
        />
      ) : null}
    </div>
  )
}
