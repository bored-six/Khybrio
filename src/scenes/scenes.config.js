import { A } from '../lib/assets'

/**
 * The scrubbed scenes, as data.
 *
 * The flight is the centrepiece: one pinned scene crossfading three island
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
    // Three zones, in flight order. Must line up with content/site.js
    // `flight.zones`: one still per zone, in order. The wide island opens it,
    // the desk nook sits behind the free call, the bench behind the handover.
    // The other renders are still in public/assets/world/ but no section uses
    // them now.
    stills: [A.hero, A.shiek, A.haiqal],
    // Viewport-heights the flight stays pinned for: ~1.6 per zone, so a single
    // gesture stays within a zone instead of blowing through to the next.
    scroll: 4.8,
    zoom: [1, 1.12],
    pan: [0, -3],
    transition: 'crossfade',
  },
  // The showcase scene is gone with its section — it scrubbed four invented
  // client projects under a "Recent work" heading. Real work goes back in here
  // when there is some to show.
}
