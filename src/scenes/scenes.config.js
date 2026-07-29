import { A } from '../lib/assets'

/**
 * The scrubbed scenes, as data.
 *
 * The flight is the centrepiece: one pinned scene scrubbing all eight island
 * zones as a single continuous take (crossfade + camera push over the stills).
 * It runs as `mediaType: 'image'` today — the closest we can get to the planned
 * flight without true image-to-video. When real Seedance clips exist, drop the
 * stitched file at A.flightClip and flip `mediaType` to 'video'; the pin/scrub
 * machinery underneath doesn't change.
 */
export const scenes = {
  flight: {
    id: 'flight',
    mediaType: 'image', // 'video' once A.flightClip exists
    clip: A.flightClip,
    // heroLoop intentionally omitted — the 1080p loop wasn't crisp enough, so
    // the hero shows the sharp still (01-hero). Re-add A.heroLoop here if a
    // genuinely HD loop is generated later.
    // Seven zones, in flight order — must line up with content/site.js `flight.zones`.
    stills: [
      A.hero,
      A.webDesk,
      A.nfcKiosk,
      A.signalTower,
      A.shiek,
      A.dave,
      A.haiqal,
    ],
    // Viewport-heights the flight stays pinned for. ~1.6 per zone across 7
    // zones, so a single scroll gesture stays within a zone instead of blowing
    // straight through to the next — each zone gets a deliberate hold.
    scroll: 11.2,
    zoom: [1, 1.12],
    pan: [0, -3],
    transition: 'crossfade',
  },
  showcase: {
    id: 'showcase',
    mediaType: 'image',
    stills: A.samples,
    // Was 2.2 — over 2 full viewport-heights of scroll for 4 stills read as a
    // long dead stretch right after the short NFC tap-card demo, before any
    // of the samples finished wiping in. 1.3 keeps each wipe readable
    // (~0.43 viewport-heights per still) without the long empty pull.
    scroll: 1.3,
    zoom: [1.06, 1],
    pan: [0, 0],
    transition: 'clip',
  },
}
