/**
 * Tracks which page milestone the visitor is currently on, so the counter
 * ("01 / 06") and the dot trail can run continuously across BOTH the
 * video-scrubbed opening and the still-scrubbed sections after it.
 *
 * The handoff between the two techniques has to be invisible, so milestones
 * are a flat ordered list independent of how any given section animates.
 * The hero scene owns two of them and switches between them from its own
 * scroll progress, mid-pin.
 */

let activeIndex = 0
const listeners = new Set()

export function subscribeActiveIndex(fn) {
  listeners.add(fn)
  fn(activeIndex)
  return () => listeners.delete(fn)
}

export function setActiveIndex(index) {
  if (index === activeIndex) return
  activeIndex = index
  for (const fn of listeners) fn(activeIndex)
}

export function getActiveIndex() {
  return activeIndex
}
