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

/**
 * Whether a scrubbed scene is currently on screen.
 *
 * The counter used to be able to assume it was always relevant, because the
 * flight was the first thing on the page. It is not any more — a hero sits
 * above it and half the page sits below — so the trail has to know when its
 * scene has left, or it hangs in the margin next to sections it does not
 * describe.
 */
let sceneOnScreen = false
const visibilityListeners = new Set()

export function subscribeActiveIndex(fn) {
  listeners.add(fn)
  fn(activeIndex)
  return () => listeners.delete(fn)
}

export function subscribeSceneVisible(fn) {
  visibilityListeners.add(fn)
  fn(sceneOnScreen)
  return () => visibilityListeners.delete(fn)
}

export function setSceneVisible(visible) {
  if (visible === sceneOnScreen) return
  sceneOnScreen = visible
  for (const fn of visibilityListeners) fn(sceneOnScreen)
}

export function setActiveIndex(index) {
  if (index === activeIndex) return
  activeIndex = index
  for (const fn of listeners) fn(activeIndex)
}

export function getActiveIndex() {
  return activeIndex
}
