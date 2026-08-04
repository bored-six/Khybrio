import { useEffect, useRef, useState } from 'react'
import { gsap, isCoarsePointer } from '../lib/smoothScroll'

/**
 * One frame at the highest rate any scrubbed clip in the project runs at. Used
 * only as the floor for how small a seek is worth issuing, so erring fast costs
 * nothing on a slower clip — the decoder coalesces seeks it cannot service.
 */
const FRAME_SECONDS = 1 / 60

/**
 * Scroll-scrubbed video playback, ported from the scroll-world engine
 * (github.com/oso95/scroll-world). Four things make this work where a naive
 * `video.currentTime = progress * duration` falls apart:
 *
 *   1. BLOB-SEEK — the clip is fetched and handed to the element as an object
 *      URL. A blob is always seekable, so scrubbing never depends on the host
 *      honouring HTTP range requests.
 *   2. RAF LERP — playback chases the scroll target instead of snapping to it,
 *      which decouples decode timing from scroll jitter.
 *   3. SEEK GATING — a new currentTime is only assigned when the decoder is
 *      idle and the delta clears an epsilon. Without this, a fast flick queues
 *      dozens of seeks and the decoder stalls.
 *   4. iOS PRIMING — mobile Safari refuses to paint a seeked frame until the
 *      element has played at least once, so we play/pause on first gesture.
 *
 * Returns `status`: 'loading' | 'ready' | 'unavailable'. 'unavailable' is the
 * expected state until the Higgsfield clip is generated; the caller falls back
 * to cross-fading the two stills against the same progress value.
 *
 * `range` is the slice of scene progress the clip covers, so a clip that only
 * spans the opening zones still plays at its true speed instead of being
 * stretched across the whole scene. The flight is generated one segment at a
 * time; each new segment widens this range rather than changing any code.
 *
 * `plan` swaps continuous scrubbing for stepped playback, which is what the
 * flight uses. Under a plain scrub the clip is welded to the scroll: flick hard
 * and 50 seconds of camera blur past, and there is no position the footage ever
 * actually rests at. Re-timing the mapping helps but cannot fix it, because the
 * speed is still the visitor's to set.
 *
 * A plan inverts that. Scroll only chooses WHICH stop is wanted; the clip then
 * travels there at its own fixed rate and stops dead on arrival. One gesture
 * plays one segment. Scrolling harder does not play it faster, it just queues
 * the next stop, so the flight can never be driven into a mess.
 *
 *   plan.stops        normalised clip positions to rest at, in order
 *   plan.indexAt(p)   which stop this scroll position is asking for
 *   plan.rate         clip-seconds travelled per real second
 */
export function useScrubbedVideo({
  videoRef,
  progressRef,
  src,
  enabled = true,
  range = [0, 1],
  plan,
  onTravelChange,
}) {
  const [status, setStatus] = useState(enabled ? 'loading' : 'unavailable')
  const stateRef = useRef({ cur: 0, lastSeek: -1, travelling: false })
  // Read through a ref so a fresh array literal from the caller can't tear down
  // and rebuild the ticker every render.
  const rangeRef = useRef(range)
  rangeRef.current = range
  const planRef = useRef(plan)
  planRef.current = plan
  const travelCbRef = useRef(onTravelChange)
  travelCbRef.current = onTravelChange

  // --- load the clip as a blob -------------------------------------------
  useEffect(() => {
    if (!enabled || !src) {
      setStatus('unavailable')
      return
    }

    let objectUrl = null
    let cancelled = false
    const video = videoRef.current

    setStatus('loading')

    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        const type = res.headers.get('content-type') || ''
        // A dev server happily returns index.html for a missing asset.
        if (type.includes('text/html')) throw new Error('not a video')
        return res.blob()
      })
      .then((blob) => {
        if (cancelled || !videoRef.current) return
        objectUrl = URL.createObjectURL(blob)
        videoRef.current.src = objectUrl
        // Wait for a duration before declaring the scrub live.
        const onReady = () => {
          if (!cancelled) setStatus('ready')
        }
        videoRef.current.addEventListener('loadedmetadata', onReady, { once: true })
      })
      .catch(() => {
        if (!cancelled) setStatus('unavailable')
      })

    return () => {
      cancelled = true
      if (video) video.removeAttribute('src')
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [src, enabled, videoRef])

  // --- iOS priming --------------------------------------------------------
  useEffect(() => {
    if (!enabled) return
    const prime = () => {
      const video = videoRef.current
      if (!video) return
      video.play().then(
        () => video.pause(),
        () => {}, // autoplay refusal is fine, we only wanted the decoder awake
      )
    }
    window.addEventListener('pointerdown', prime, { once: true, passive: true })
    window.addEventListener('touchstart', prime, { once: true, passive: true })
    return () => {
      window.removeEventListener('pointerdown', prime)
      window.removeEventListener('touchstart', prime)
    }
  }, [enabled, videoRef])

  // --- scrub loop ---------------------------------------------------------
  useEffect(() => {
    if (status !== 'ready') return

    // Smallest seek worth issuing, as a FRACTION OF THE CLIP — so it has to be
    // derived from the clip's length, not hard-coded. A flat 0.005 was fine on
    // an 8-second clip (0.04s, about one frame); on the 77.5s flight the same
    // number means 0.39s of footage, so the picture only changed ~6 times a
    // second however many frames the file had. That, not the source frame rate,
    // was what made the flight look choppy.
    //
    // One frame is the right floor: finer just queues seeks the decoder will
    // coalesce anyway. Coarse pointers get a wider gate because mobile decoders
    // stall under rapid seeking.
    const frame = FRAME_SECONDS / (videoRef.current?.duration || 1)
    const eps = frame * (isCoarsePointer() ? 3 : 1)
    const state = stateRef.current

    const tick = () => {
      const video = videoRef.current
      if (!video || !video.duration || Number.isNaN(video.duration)) return

      const [r0, r1] = rangeRef.current
      const span = r1 - r0 || 1
      const raw = Math.min(1, Math.max(0, (progressRef.current - r0) / span))
      const p = planRef.current
      let arrived = false

      if (p) {
        // Stepped: scroll picks a stop, the clip walks there at a fixed rate.
        const target = p.stops[Math.min(p.stops.length - 1, Math.max(0, p.indexAt(raw)))]
        // deltaRatio() is frames-at-60fps, so /60 is the frame's real seconds.
        // Capped so a backgrounded tab can't resume with one giant jump.
        const dt = Math.min(0.05, gsap.ticker.deltaRatio() / 60)
        const stride = (p.rate * dt) / video.duration
        let gap = target - state.cur
        // A fixed rate means a fast scroll would leave the clip crawling
        // through every intervening segment while the copy is already six zones
        // ahead — 26 seconds of catch-up on a flick to the end. So never trail
        // by more than maxLag: close the rest instantly and play the last hop
        // properly. Normal stepping never reaches this.
        if (p.maxLag && Math.abs(gap) > p.maxLag) {
          state.cur = target - Math.sign(gap) * p.maxLag
          gap = target - state.cur
        }
        if (Math.abs(gap) <= stride) {
          state.cur = target // land exactly, then hold — this is the hard stop
          arrived = true
        } else {
          state.cur += Math.sign(gap) * stride
        }
      } else {
        state.cur += (raw - state.cur) * 0.18
      }

      if (state.travelling === arrived) {
        state.travelling = !arrived
        travelCbRef.current?.(state.travelling)
      }

      if (video.seeking) return
      // On arrival, force the final seek through: it is usually smaller than
      // eps, and skipping it would park a frame short of the stop every time.
      if (arrived) {
        if (state.lastSeek === state.cur) return
      } else if (Math.abs(state.cur - state.lastSeek) < eps) return

      state.lastSeek = state.cur
      video.currentTime = state.cur * video.duration
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [status, progressRef, videoRef])

  return status
}
