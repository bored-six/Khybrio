import { A } from '../lib/assets'

/**
 * The scrubbed scenes, as data.
 *
 * The flight is the centrepiece: one pinned scene crossfading seven island
 * stills with a slow camera push, scrubbed against scroll.
 *
 * It ran as scroll-scrubbed video for a while (the seven HIGGSFIELD.md segments
 * stitched into one take) and no longer does. The footage came back 1080p where
 * the plan called for 4K, and a 1080p clip filling a retina viewport is
 * magnified about 1.6x, so the moving picture was always going to be softer
 * than the 2752px stills sitting behind it. The stills are the sharper asset
 * here; the video was costing 25MB to look worse. SceneMedia still supports
 * `mediaType: 'video'` unchanged if higher-resolution clips ever land — set it
 * back and pass `clip`.
 */
export const scenes = {
  flight: {
    id: 'flight',
    mediaType: 'image',
    /** Ambient loop over zone 1, before the visitor has scrolled anything. */
    heroLoop: A.heroLoop,
    // Seven zones, in flight order — must line up with content/site.js
    // `flight.zones`.
    //
    // This order came from the footage: each Higgsfield clip was a camera move
    // BETWEEN two specific stills, so the seven only chained one way. The clips
    // are gone but the order stays, because the copy was re-sequenced to match
    // it (site.js `flight.zones`) — each block lands on the still it was
    // written for, and the two nav groups stay contiguous: zones 1-3 are the
    // three lines of work, 4-6 the process beats in chronological order.
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
  // The showcase scene is gone with its section — it scrubbed four invented
  // client projects under a "Recent work" heading. Real work goes back in here
  // when there is some to show.
}
