# Khybrio — Higgsfield generation (everything, in order)

Do it top to bottom. Every prompt below is complete — copy the grey block, paste
into Higgsfield, generate. No assembling anything.

**Checklist:** 8 images · save 1 `khybi` element after image 1 · upscale all 8 to 4K · 1 hero loop clip · 7 flight clips.

### Sizes at a glance

| Item | Model | Aspect | Size | Duration |
|------|-------|--------|------|----------|
| Images 1–8 | GPT Image 2 | 16:9 | generate at max, then **upscale to 3840×2160 (4K)** | — |
| Hero loop clip | Seedance 2.0 | 16:9 | 3840×2160 (4K) | **4 sec, seamless loop** |
| Flight clips 1–7 | Seedance 2.0 | 16:9 | 3840×2160 (4K) | **5 sec each** |
| Final stitched flight | (I do this locally) | 16:9 | 3840×2160 (4K) | ≈29 sec |

Everything stays **16:9** so the clips stitch without cropping.

---

## IMAGES 1–8

**Settings for all 8:** Model **GPT Image 2** · aspect **16:9** · generate at the
highest resolution offered, then **upscale each to 3840×2160 (4K)**.

**Negative prompt** (paste in the negative field for every image):

```
photorealistic humans, realistic skin, text, letters, watermark, logo, UI, buttons, harsh shadows, hard edges, neon, glossy plastic glare, lens flare, cluttered background, extra limbs, distorted face, seams, fur, fabric texture, oversaturated, cool blue tint
```

---

### IMAGE 1 — HERO · 16:9 · upscale to 4K
Generate FIRST, then save it as a Reference Element named `khybi` (category: character).

```
Isometric miniature diorama on a small floating island, blind-box designer-toy style: soft matte vinyl/clay render, chunky rounded forms, no sharp edges, soft contact shadows and gentle rim light. The island is a rounded organic landmass with a visible layered stone-and-soil cross-section underneath, floating in a soft warm-cream void; the frame edges dissolve into a milky cream haze with a gentle vignette. Fixed 3/4 top-down isometric camera at about 35 degrees, warm late-afternoon key light from the upper right with soft fill. Colour palette locked to deep teal (#1C4D4A), soft teal-gray (#A9C6C3) and warm cream (#F5F7F6), with vinta coral (#E8622D) as the only accent. Stylised low-poly trees and plants. Featured mascot "Khybi": a small collectible vinyl toy, toy-sized next to the buildings, big round head about 60/40 head-to-body ratio, no neck, short egg-shaped torso, matte deep-teal body with a soft-teal-gray shield patch on the chest and one coral diagonal sash from left shoulder to right hip, two coral-tipped nub ears on top, two small wide-set black dot eyes each with a tiny white highlight, no nose, a small closed curved smile, short stubby rounded arms with mitten hands, stubby legs, rounded feet. Wide establishing shot of the whole island with every zone visible: a teal-glass mini office with a glowing browser-window sign, an NFC tap kiosk, a tall signal tower topped with a glowing map-pin and a small Facebook thumbs-up flag, and a little hut with a coral-and-cream striped sail awning. Winding cream paths connect the zones. Several tiny Khybi figures doing small tasks around the island, one near the front edge waving toward the camera. Open cream sky above the island for a headline. Warm afternoon light, gentle long shadows. No text, no UI, no logos.
```

### IMAGE 2 — WEB DESK · 16:9 · upscale to 4K · reference `khybi`

```
Isometric miniature diorama on the same small floating island, blind-box designer-toy style: soft matte vinyl/clay render, chunky rounded forms, soft contact shadows, gentle rim light. Same rounded island with a layered stone-and-soil cross-section underneath, floating in a warm-cream void, frame edges dissolving into cream haze with a gentle vignette. Fixed 3/4 isometric camera at about 35 degrees, warm late-afternoon key light from the upper right. Palette locked to deep teal (#1C4D4A), soft teal-gray (#A9C6C3), warm cream (#F5F7F6), vinta coral (#E8622D) as the only accent. Closer crop on the teal-glass office corner of the island. The Khybi mascot is seated at a small rounded desk, a softly glowing floating browser-window / laptop icon hovering above the desk showing a simple stylised webpage layout, a small coral desk lamp and a teal-gray potted plant nearby. Same warm light and cream-haze edges. No text, no UI, no logos.
```

### IMAGE 3 — NFC KIOSK · 16:9 · upscale to 4K · reference `khybi`

```
Isometric miniature diorama on the same small floating island, blind-box designer-toy style: soft matte vinyl/clay render, chunky rounded forms, soft contact shadows, gentle rim light. Same rounded island with a layered stone-and-soil cross-section underneath, floating in a warm-cream void, frame edges dissolving into cream haze with a gentle vignette. Fixed 3/4 isometric camera at about 35 degrees, warm late-afternoon key light from the upper right. Palette locked to deep teal (#1C4D4A), soft teal-gray (#A9C6C3), warm cream (#F5F7F6), vinta coral (#E8622D) as the only accent. Closer crop on the NFC kiosk corner of the island. The Khybi mascot stands at a small rounded kiosk holding a little tap card and touching it to a softly glowing smartphone on the counter, a small coral spark-and-ripple radiating from the tap point, a tiny stack of cards and a potted plant on the counter. Same warm light and cream-haze edges. No text, no UI, no logos.
```

### IMAGE 4 — SIGNAL TOWER · 16:9 · upscale to 4K · reference `khybi`

```
Isometric miniature diorama on the same small floating island, blind-box designer-toy style: soft matte vinyl/clay render, chunky rounded forms, soft contact shadows, gentle rim light. Same rounded island with a layered stone-and-soil cross-section underneath, floating in a warm-cream void, frame edges dissolving into cream haze with a gentle vignette. Fixed 3/4 isometric camera at about 35 degrees, warm late-afternoon key light from the upper right. Palette locked to deep teal (#1C4D4A), soft teal-gray (#A9C6C3), warm cream (#F5F7F6), vinta coral (#E8622D) as the only accent. Closer crop on the signal-tower corner of the island. The Khybi mascot stands on a raised circular platform shaped like a glowing coral map-pin, holding up a chunky magnifying glass. Behind it, a tall slender signal tower with soft concentric signal rings at its tip and a small Facebook thumbs-up flag on its mast. Same warm light and cream-haze edges. No text, no UI, no logos.
```

### IMAGE 5 — CREW: SHIEK · 16:9 · upscale to 4K · reference `khybi`

```
Isometric miniature diorama on the same small floating island, blind-box designer-toy style: soft matte vinyl/clay render, chunky rounded forms, soft contact shadows, gentle rim light. Same rounded island with a layered stone-and-soil cross-section underneath, floating in a warm-cream void, frame edges dissolving into cream haze with a gentle vignette. Fixed 3/4 isometric camera at about 35 degrees, warm late-afternoon key light from the upper right. Palette locked to deep teal (#1C4D4A), soft teal-gray (#A9C6C3), warm cream (#F5F7F6), vinta coral (#E8622D) as the only accent. Closer crop on a small quiet desk nook on the island. The Khybi mascot in a calm focused standing pose beside a small desk, a floating laptop screen above the desk showing simple glowing code brackets, a mug and a small potted plant on the desk. Same warm light and cream-haze edges. No text, no UI, no logos.
```

### IMAGE 6 — CREW: DAVE · 16:9 · upscale to 4K · reference `khybi`

```
Isometric miniature diorama on the same small floating island, blind-box designer-toy style: soft matte vinyl/clay render, chunky rounded forms, soft contact shadows, gentle rim light. Same rounded island with a layered stone-and-soil cross-section underneath, floating in a warm-cream void, frame edges dissolving into cream haze with a gentle vignette. Fixed 3/4 isometric camera at about 35 degrees, warm late-afternoon key light from the upper right. Palette locked to deep teal (#1C4D4A), soft teal-gray (#A9C6C3), warm cream (#F5F7F6), vinta coral (#E8622D) as the only accent. Closer crop on a small meeting-bench area on the island with a low rounded bench, a little table and potted plants. The Khybi mascot stands holding a small rounded briefcase in one mitten hand, the other arm extended forward in a mid-handshake gesture, friendly open posture. Same warm light and cream-haze edges. No text, no UI, no logos.
```

### IMAGE 7 — CREW: HAIQAL · 16:9 · upscale to 4K · reference `khybi`

```
Isometric miniature diorama on the same small floating island, blind-box designer-toy style: soft matte vinyl/clay render, chunky rounded forms, soft contact shadows, gentle rim light. Same rounded island with a layered stone-and-soil cross-section underneath, floating in a warm-cream void, frame edges dissolving into cream haze with a gentle vignette. Fixed 3/4 isometric camera at about 35 degrees, warm late-afternoon key light from the upper right. Palette locked to deep teal (#1C4D4A), soft teal-gray (#A9C6C3), warm cream (#F5F7F6), vinta coral (#E8622D) as the only accent. Closer crop on the same meeting-bench area with the same bench, table and plants. The Khybi mascot stands holding up a small glowing tablet in both mitten hands, presenting it toward the viewer, both hands raised on the tablet, a clearly different pose from a handshake. Same warm light and cream-haze edges. No text, no UI, no logos.
```

### IMAGE 8 — CREW: REIN · 16:9 · upscale to 4K · reference `khybi`

```
Isometric miniature diorama on the same small floating island, blind-box designer-toy style: soft matte vinyl/clay render, chunky rounded forms, soft contact shadows, gentle rim light. Same rounded island with a layered stone-and-soil cross-section underneath, floating in a warm-cream void, frame edges dissolving into cream haze with a gentle vignette. Fixed 3/4 isometric camera at about 35 degrees, warm late-afternoon key light from the upper right. Palette locked to deep teal (#1C4D4A), soft teal-gray (#A9C6C3), warm cream (#F5F7F6), vinta coral (#E8622D) as the only accent. Closer crop on a small content-creator corner of the island with a tiny ring light on a stand and a small camera-on-tripod prop. The Khybi mascot holds up a smartphone in both mitten hands, small floating coral heart and thumbs-up bubbles drifting up from the screen. Same warm light and cream-haze edges. No text, no UI, no logos.
```

---

## UPSCALE

Run all 8 finished images through Higgsfield's **upscale to 4K (3840×2160)** tool before the video step.

---

## VIDEO CLIPS

### HERO LOOP · Seedance 2.0 · 16:9 · 3840×2160 (4K) · 4 sec · SEAMLESS LOOP
Plays on its own at the very top before the visitor scrolls, then hands off to the scrubbed flight.
Set **both** the Start frame and the End frame to **IMAGE 1 (Hero)** so it loops with no jump.

```
Seamless looping ambient shot of the floating miniature clay-diorama island, first frame and last frame identical so it loops perfectly. The camera holds almost still with a very slow, tiny gentle drift. Only soft idle motion: faint plant sway, a slow light shimmer, the little Khybi figures making tiny idle movements, one near the front edge gently waving. Locked exposure, no flicker, no cuts. Warm afternoon light held constant, cream-haze edges, gentle vignette, calm and premium.
```

---

**Flight clips settings (all 7):** Model **Seedance 2.0** · **16:9** · **3840×2160 (4K)** · **5 seconds** · locked exposure.
For each clip set the **Start frame** and **End frame** to the two images named, then paste the prompt.

### CLIP 1 — Start: IMAGE 1 (Hero) → End: IMAGE 2 (Web Desk) · 5 sec

```
Smooth continuous isometric camera flight across a floating miniature clay-diorama island, one unbroken take, slowly drifting and pushing in from the wide island view toward the teal-glass office corner. Locked exposure, no flicker, no cuts, no character movement beyond gentle ambient motion. Warm afternoon light held constant, cream-haze edges, gentle vignette, calm and premium.
```

### CLIP 2 — Start: IMAGE 2 (Web Desk) → End: IMAGE 3 (NFC Kiosk) · 5 sec

```
Smooth continuous isometric camera flight across the same floating clay-diorama island, one unbroken take, drifting from the teal-glass office corner over to the NFC tap kiosk. Locked exposure, no flicker, no cuts, no character movement beyond gentle ambient motion. Warm afternoon light held constant, cream-haze edges, gentle vignette, calm and premium.
```

### CLIP 3 — Start: IMAGE 3 (NFC Kiosk) → End: IMAGE 4 (Signal Tower) · 5 sec

```
Smooth continuous isometric camera flight across the same floating clay-diorama island, one unbroken take, drifting from the NFC kiosk up toward the tall signal tower and its glowing map-pin. Locked exposure, no flicker, no cuts, no character movement beyond gentle ambient motion. Warm afternoon light held constant, cream-haze edges, gentle vignette, calm and premium.
```

### CLIP 4 — Start: IMAGE 4 (Signal Tower) → End: IMAGE 5 (Shiek) · 5 sec

```
Smooth continuous isometric camera flight across the same floating clay-diorama island, one unbroken take, drifting from the signal tower over to a small quiet desk nook. Locked exposure, no flicker, no cuts, no character movement beyond gentle ambient motion. Warm afternoon light held constant, cream-haze edges, gentle vignette, calm and premium.
```

### CLIP 5 — Start: IMAGE 5 (Shiek) → End: IMAGE 6 (Dave) · 5 sec

```
Smooth continuous isometric camera flight across the same floating clay-diorama island, one unbroken take, drifting from the quiet desk nook over to the meeting-bench area. Locked exposure, no flicker, no cuts, no character movement beyond gentle ambient motion. Warm afternoon light held constant, cream-haze edges, gentle vignette, calm and premium.
```

### CLIP 6 — Start: IMAGE 6 (Dave) → End: IMAGE 7 (Haiqal) · 5 sec

```
Smooth continuous isometric camera flight across the same floating clay-diorama island, one unbroken take, a slow arc around the same meeting-bench area to a new angle. Locked exposure, no flicker, no cuts, no character movement beyond gentle ambient motion. Warm afternoon light held constant, cream-haze edges, gentle vignette, calm and premium.
```

### CLIP 7 — Start: IMAGE 7 (Haiqal) → End: IMAGE 8 (Rein) · 5 sec

```
Smooth continuous isometric camera flight across the same floating clay-diorama island, one unbroken take, drifting from the meeting-bench area over to the small content-creator corner with the ring light. Locked exposure, no flicker, no cuts, no character movement beyond gentle ambient motion. Warm afternoon light held constant, cream-haze edges, gentle vignette, calm and premium.
```

---

## AFTER HIGGSFIELD (I run this — not your job)

The 7 flight clips (5s each) get stitched locally with ffmpeg into one ~29-second
continuous flight (1-second crossfade at each join). The hero loop clip stays its
own file. Send me the 8 upscaled stills + the hero loop + the 7 flight clips and
I'll wire it all in.
