import { useRef } from 'react'
import { AssetImage } from './AssetImage'
import { useScrubbedVideo } from '../hooks/useScrubbedVideo'
import { useKenBurns } from '../hooks/useKenBurns'
import { useProgressEffect, smooth, band } from '../hooks/useProgressEffect'
import { isCoarsePointer } from '../lib/smoothScroll'

const clamp = (v) => Math.min(1, Math.max(0, v))

/**
 * How much scene progress the clip takes to fade up over the ambient hero loop,
 * and to hand back to the stills once its range runs out. The fade-in is short
 * so the visitor sees the camera commit almost immediately; the fade-out is
 * longer because it dissolves onto a still of the same framing and wants to be
 * unnoticeable.
 */
const CLIP_FADE_IN = 0.03
const CLIP_FADE_OUT = 0.055

/** Opacity of a ranged clip at scene progress `p`. */
function clipEnvelope(p, [r0, r1]) {
  const rise = smooth(band(p, r0, r0 + CLIP_FADE_IN))
  const fall = smooth(band(p, r1, r1 + CLIP_FADE_OUT))
  return rise * (1 - fall)
}

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
function StillStack({
  stills,
  progressRef,
  transition,
  zoom,
  pan,
  foreground,
  reduced,
  heroLoop,
  heroLoopFade,
  snap,
}) {
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
        let vis = rise * (1 - fall)

        // Under a stop plan the clip's position no longer tracks scroll — it
        // parks on whichever stop the zone asked for. The stills have to agree.
        // Left on the continuous schedule they answer to raw scroll instead, so
        // parking near a band edge left TWO island framings at 0.43/0.57 on top
        // of each other, which reads as a blurred, doubled, badly-encoded
        // picture. Parked, the stack collapses to exactly the still the camera
        // stopped on; travelling, it returns to the crossfade (and is hidden
        // behind the clip anyway). `park` is 0 whenever no plan is driving, so
        // the fallback stack is untouched.
        if (snap) {
          const park = clamp(1 - snap.travelRef.current)
          vis += (((snap.indexAt(cp) === k ? 1 : 0) - vis) * park)
        }
        el.style.opacity = String(vis)
      }
    }

    // Hero loop video rides zone 0's opacity, and pauses once it's faded out
    // so it isn't decoding a loop off-screen. When a scrubbed clip covers the
    // opening zones the loop instead hands over on the clip's own fade-in band
    // — otherwise both would sit at partial opacity over each other for a
    // seventh of the flight, ghosting two near-identical framings together.
    const hv = heroLoopRef.current
    if (hv) {
      let op
      if (heroLoopFade) {
        op = 1 - smooth(band(cp, heroLoopFade[0], heroLoopFade[1]))
      } else {
        const W = 0.42
        const seg = cp * n
        op = 1 - smooth(clamp((seg - (1 - W / 2)) / W))
      }
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
 * live fallback. Whenever the fetch fails, or the visitor prefers reduced
 * motion, that fallback IS the hero: the stills cross-fade against the very
 * same progress value the video would have scrubbed. The clip is additive, and
 * the section behaves correctly without it.
 *
 * `clipRange` is the slice of the scene the clip actually covers. The island
 * flight is generated one segment at a time, so today one clip carries the
 * opening zones and the stills carry the rest; the video fades out onto the
 * still of the framing it lands on, which is why the seam doesn't read.
 */
export function SceneMedia({
  mediaType = 'image',
  clip,
  clipRange = [0, 1],
  clipPlan,
  onTravelChange,
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
  const rootRef = useRef(null)
  const tiltRef = useRef(null)
  const scrubbing = mediaType === 'video' && !reduced

  // 0 parked, 1 travelling, smoothed. Drives the handover below.
  const travelRef = useRef(0)
  const travellingRef = useRef(false)

  const status = useScrubbedVideo({
    videoRef,
    progressRef,
    src: clip,
    enabled: scrubbing,
    range: clipRange,
    plan: clipPlan,
    onTravelChange: (t) => {
      travellingRef.current = t
      onTravelChange?.(t)
    },
  })

  // The clip's opacity is per-frame, not a CSS transition — it has to track
  // scroll exactly at both ends of its range. The wrapper below owns the
  // separate, one-shot fade that hides the element until the blob is decoded.
  //
  // It also fades the video out entirely once the camera parks, revealing the
  // stills stack underneath. Every stop in the plan IS one of those stills —
  // the clip was built by freezing them — so the two are the same picture and
  // the handover cannot be seen. What it buys is resolution: the still is the
  // 4K original at whatever DPR the screen has, where the video is 1080p being
  // upscaled ~1.6x on a retina display. The frames a visitor actually stops and
  // reads against are now the sharp ones, and the clip only has to look good
  // while it is moving.
  useProgressEffect(progressRef, (p) => {
    const v = videoRef.current
    if (!v || !scrubbing) return
    const want = travellingRef.current ? 1 : 0
    travelRef.current += (want - travelRef.current) * 0.12
    const gate = clipPlan ? travelRef.current : 1
    v.style.opacity = String(clipEnvelope(p, clipRange) * gate)
  })

  // Pointer-parallax: the island tilts a few degrees toward the cursor and
  // springs back, damped by a CSS transition. Off on touch and reduced-motion.
  const onMove = (e) => {
    if (reduced || isCoarsePointer() || !tiltRef.current || !rootRef.current) return
    const r = rootRef.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    tiltRef.current.style.transform = `rotateY(${px * 5}deg) rotateX(${-py * 5}deg) scale(1.03)`
  }
  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = ''
  }

  return (
    <div
      ref={rootRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="absolute inset-0 overflow-hidden bg-teal-deep"
      style={{ perspective: '1200px' }}
    >
      <div
        ref={tiltRef}
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ willChange: 'transform' }}
      >
        <StillStack
          stills={stills}
          progressRef={progressRef}
          transition={transition}
          zoom={zoom}
          pan={pan}
          foreground={foreground}
          reduced={reduced}
          heroLoop={heroLoop}
          heroLoopFade={scrubbing ? [0, CLIP_FADE_IN] : null}
          // Only once the clip is actually driving. If it never loads, the
          // stack stays on its own crossfade and behaves as the fallback.
          snap={
            scrubbing && clipPlan && status === 'ready'
              ? { travelRef, indexAt: clipPlan.indexAt }
              : null
          }
        />

        {/* Inside the tilt wrapper, not beside it — the clip and the stills are
            the same island, so the pointer parallax has to apply to whichever
            one is currently on screen or the effect blinks out mid-flight. */}
        {scrubbing ? (
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: status === 'ready' ? 1 : 0, zIndex: 20 }}
          >
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover scene-layer"
              style={{ opacity: 0, objectPosition: 'center 44%' }}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}
