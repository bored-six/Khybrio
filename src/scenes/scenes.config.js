import { A } from '../lib/assets'

/**
 * Every scrubbed section on the page, as data.
 *
 * The upgrade path this file exists to protect: when there's budget for a
 * second Higgsfield flight — say from the showcase into the crew corner —
 * generating the clip and changing that scene's `mediaType` from 'image' to
 * 'video' (plus pointing `clip` at the new file) is the entire change. The
 * pin/scrub machinery in ScrollScene is blind to media type, so nothing
 * underneath has to move.
 *
 * `scroll` is measured in viewport heights of scroll distance the section
 * stays pinned for.
 */
export const scenes = [
  {
    id: 'hero-bundle',
    // The one video on the site. Falls back to a still crossfade when the clip
    // is missing — which is the live behaviour until it's generated.
    mediaType: 'video',
    clip: A.heroToBundleClip,
    stills: [A.heroIsland, A.bundleZone],
    scroll: 2.6,
    zoom: [1, 1.14],
    pan: [0, -3],
    transition: 'crossfade',
    /** Hotspot cards fade in once the flight has landed on the bundle zone. */
    hotspotsAt: 0.8,
    /** Counter advances from 'hero' to 'bundle' mid-pin. */
    milestoneSwitchAt: 0.55,
  },
  {
    id: 'showcase',
    mediaType: 'image',
    stills: A.samples,
    scroll: 2.2,
    zoom: [1.06, 1],
    pan: [0, 0],
    transition: 'clip',
  },
  {
    id: 'people',
    mediaType: 'image',
    stills: [A.crewShiek, A.crewDave, A.crewHaiqal, A.crewRein],
    scroll: 3.4,
    zoom: [1, 1.08],
    pan: [0, -2],
    transition: 'crossfade',
  },
]

export const sceneById = Object.fromEntries(scenes.map((s) => [s.id, s]))
