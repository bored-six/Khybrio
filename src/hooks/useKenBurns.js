import { useProgressEffect, lerp } from './useProgressEffect'

/**
 * Scroll-scrubbed Ken-Burns camera move on a still — the credit-free stand-in
 * for a real flight clip. Slow zoom plus a slight pan, driven off the same
 * scene progress the video scrubber uses.
 *
 * `depth` fakes parallax: give the background 1 and the foreground subject
 * something like 0.45, and the two drift apart as the camera moves.
 *
 * Writes straight to `style.transform` rather than going through React or
 * GSAP's setter — this runs every frame on a pinned section.
 */
export function useKenBurns({
  ref,
  progressRef,
  zoom = [1, 1.12],
  pan = [0, 0],
  depth = 1,
  enabled = true,
}) {
  useProgressEffect(progressRef, (p) => {
    const el = ref.current
    if (!el) return

    if (!enabled) {
      el.style.transform = ''
      return
    }

    const t = Math.min(1, Math.max(0, p))
    const scale = lerp(zoom[0], zoom[1], t)
    const x = pan[0] * t * depth
    const y = pan[1] * t * depth

    el.style.transform = `translate3d(${x}%, ${y}%, 0) scale(${scale})`
  })
}
