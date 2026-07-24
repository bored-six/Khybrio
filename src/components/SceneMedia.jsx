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
function StillStack({ stills, progressRef, transition, zoom, pan, foreground, reduced, heroLoop }) {
  const stackRef = useRef(null)
  const foregroundRef = useRef(null)
  const layerRefs = useRef([])
  const heroLoopRef = useRef(null)

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

    const cp = clamp(p)

    for (let k = 0; k < n; k++) {
      const el = layerRefs.current[k]
      if (!el) continue

      if (transition === 'clip') {
        // Layer 0 is the base; each later layer wipes in left-to-right.
        const seg = cp * (n - 1)
        if (k === 0) {
          el.style.clipPath = 'inset(0 0 0 0)'
          el.style.opacity = '1'
          continue
        }
        const r = smooth(clamp(seg - (k - 1)))
        el.style.clipPath = `inset(0 ${(1 - r) * 100}% 0 0)`
        el.style.opacity = '1'
      } else {
        // Hold each image solid across its own zone and crossfade only at the
        // boundary — the SAME schedule the copy uses (seg = p*n, width W), so
        // the next zone's image never bleeds in while the current zone is
        // still on screen. A triangular fade on a p*(n-1) scale, by contrast,
        // started dissolving to the next image the instant you passed centre.
        const W = 0.42
        const seg = cp * n
        let rise = smooth(clamp((seg - (k - W / 2)) / W))
        let fall = smooth(clamp((seg - (k + 1 - W / 2)) / W))
        if (k === 0) rise = 1
        if (k === n - 1) fall = 0
        el.style.opacity = String(rise * (1 - fall))
      }
    }

    // Hero loop video rides zone 0's opacity, and pauses once it's faded out
    // so it isn't decoding a 1080p loop off-screen.
    const hv = heroLoopRef.current
    if (hv) {
      const W = 0.42
      const seg = cp * n
      const op = 1 - smooth(clamp((seg - (1 - W / 2)) / W))
      hv.style.opacity = String(op)
      if (op < 0.02) {
        if (!hv.paused) hv.pause()
      } else if (hv.paused) {
        hv.play().catch(() => {})
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
          // All zones load eagerly — the art is ~130KB WebP each, and lazy
          // loading left later zones blank until scrolled into (they all sit in
          // the pinned viewport at once). The first zone gets high priority so
          // it still paints first; the rest yield to it but don't wait.
          loading="eager"
          fetchPriority={k === 0 ? 'high' : 'low'}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: k === 0 ? 1 : 0,
            zIndex: k,
            objectPosition: 'center 44%',
          }}
        />
      ))}
      {/* Ambient hero loop over zone 0 — autoplays at the top, fades into the
          scrubbed stills as you scroll. Sits at z0 (above the hero still it
          covers, below every later zone). Falls back to the still if it can't
          play. */}
      {heroLoop && !reduced ? (
        <video
          ref={heroLoopRef}
          src={heroLoop}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: 'center 44%', zIndex: 0 }}
        />
      ) : null}
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
  heroLoop,
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
        heroLoop={heroLoop}
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
