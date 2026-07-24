import { useEffect, useRef, useState } from 'react'
import { gsap, isCoarsePointer } from '../lib/smoothScroll'

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
 */
export function useScrubbedVideo({ videoRef, progressRef, src, enabled = true }) {
  const [status, setStatus] = useState(enabled ? 'loading' : 'unavailable')
  const stateRef = useRef({ cur: 0, lastSeek: -1 })

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

    const eps = isCoarsePointer() ? 0.02 : 0.005
    const state = stateRef.current

    const tick = () => {
      const video = videoRef.current
      if (!video || !video.duration || Number.isNaN(video.duration)) return

      const target = Math.min(1, Math.max(0, progressRef.current))
      state.cur += (target - state.cur) * 0.18

      if (video.seeking) return
      if (Math.abs(state.cur - state.lastSeek) < eps) return

      state.lastSeek = state.cur
      video.currentTime = state.cur * video.duration
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [status, progressRef, videoRef])

  return status
}
