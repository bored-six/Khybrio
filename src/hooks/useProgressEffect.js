import { useEffect, useRef } from 'react'
import { gsap } from '../lib/smoothScroll'

/**
 * Runs `cb(progress)` once per frame off GSAP's ticker.
 *
 * Scene progress lives in a ref rather than React state on purpose: a pinned
 * section updates every frame, and re-rendering the tree 60x a second to move
 * a transform would be pure waste. Children read the ref through this hook and
 * write to the DOM directly.
 */
export function useProgressEffect(progressRef, cb) {
  const cbRef = useRef(cb)
  cbRef.current = cb

  useEffect(() => {
    const tick = () => cbRef.current(progressRef.current)
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [progressRef])
}

/** Linear interpolation helper used across scene animations. */
export const lerp = (a, b, t) => a + (b - a) * t

/** Progress remapped to 0..1 across an arbitrary band, then clamped. */
export function band(progress, start, end) {
  if (end === start) return 0
  return Math.min(1, Math.max(0, (progress - start) / (end - start)))
}

/** Smoothstep easing — takes the mechanical edge off band transitions. */
export const smooth = (t) => t * t * (3 - 2 * t)
