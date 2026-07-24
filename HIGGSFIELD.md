# Higgsfield prompts — paste-ready

Every prompt below is written to reproduce the **Pearl & Co.** scroll-world look
(floating clay-diorama island, chibi characters, edges dissolving into cream
haze) translated into Khybrio's deep-teal + coral palette. Copy the blocks
verbatim; only swap the bracketed scene text if you want to tweak.

**Workflow order**
1. Generate still **#1 (Hero)** → confirm → **save it as a Reference Element named `khybi`** (category: character).
2. Generate stills **#2–#8**, each referencing `@khybi`.
3. Confirm all 8 read as one island → generate the **7 flight clips** (Seedance 2.0, pass the two real stills as start/end frames).
4. **Upscale all 8 stills to 4K.**
5. **Stitch** the 7 clips locally with the ffmpeg command at the bottom.

**One decision first — aspect ratio.** For a *single continuous flight* to stitch
without letterboxing, every clip must share one aspect ratio, so **generate all 8
stills at 16:9 (3840×2160)** even the crew. The original brief listed crew at 3:4;
that predates the one-continuous-take decision. If you also want 3:4 crew
portraits for any static use, recrop from the 16:9 masters afterward — don't
generate them at 3:4 or the flight into them will crop badly. All prompts below
are written for 16:9.

---

## STYLE PREAMBLE

Paste this at the **top of every still prompt** (it's the "same island, same
render, same light" lock — this is what makes 8 shots feel like one world):

```
Isometric miniature diorama on a small floating island, blind-box designer-toy
aesthetic: soft matte vinyl/clay render, chunky rounded forms, no sharp edges,
tactile hand-crafted feel, soft contact shadows and gentle rim light. The island
is a rounded organic landmass with a visible layered stone-and-soil cross-section
along its underside, floating in a soft warm-cream void; the frame edges dissolve
into a milky cream haze with a gentle vignette. Fixed 3/4 top-down isometric
camera at roughly 35 degrees elevation, orthographic feel, slight depth of field.
One consistent warm late-afternoon key light from the upper right with soft
ambient fill. Colour palette locked to deep teal (#1C4D4A), soft teal-gray
(#A9C6C3) and warm cream (#F5F7F6), with vinta coral (#E8622D) as the single
sparing accent. Stylised low-poly trees and plants, detailed hero props. Clean,
premium, cohesive — no photographic grain, no text, no UI, no logos in the scene.
```

## KHYBI — character spec (for image #1 only; after that use `@khybi`)

Paste this **after** the preamble, in image #1's prompt:

```
Featured character "Khybi": a small collectible vinyl mascot, toy-sized relative
to the buildings (like a 6–8 inch blind-box figure in a diorama). Proportions
roughly 60/40 head-to-body — big round head, slightly wider than tall, on a short
egg-shaped torso, no visible neck, wider than tall overall. Smooth matte deep-teal
(#1C4D4A) body with a rounded shield-shaped soft-teal-gray (#A9C6C3) chest patch,
and one coral (#E8622D) diagonal sash from left shoulder to right hip. Two small
rounded nub ears on top of the head, tipped coral. Face: two small black dot eyes
wide apart, each with a tiny white highlight, no pupils, no eyebrows, no nose, a
single small closed curved smile. Short stubby fully-rounded arms with soft
mitten hands, short stubby legs, rounded oval feet, stable wide stance. Smooth
matte vinyl finish, soft rim light, small soft drop shadow. No text or logos on
the figure.
```

## NEGATIVE PROMPT

Paste into the negative field for **all** stills:

```
photorealistic humans, realistic skin, text, letters, watermark, logo, UI,
interface, buttons, harsh shadows, hard edges, neon, glossy plastic glare,
lens flare, busy background, cluttered, extra limbs, distorted face, seams,
fur, fabric weave, oversaturated, cool blue tint, gradient sky
```

---

## THE 8 STILLS

Each block = **PREAMBLE** (+ **KHYBI spec** on #1, or `@khybi` on #2–#8) + the
scene text below. Model: **GPT Image 2**, **16:9**, 4K.

### 01 — HERO (wide establishing) · save as `khybi` after this
```
[PREAMBLE] [KHYBI spec]
Wide establishing shot of the entire island at a distance, every zone visible at
once: a teal-glass mini office with a glowing browser-window sign, an NFC tap
kiosk, a tall signal tower topped with a glowing map-pin and a small Facebook
thumbs-up flag banner, and a vinta-striped little hut (coral-and-cream sailcloth
awning echoing a Zamboanga vinta boat). Winding cream paths connect the zones,
small teal-gray shrubs and potted plants dotted around. Several tiny Khybi
figures scattered across the island doing small tasks, one near the front edge
turned toward the camera with one mitten hand raised waving. Generous open cream
sky above the island for a headline. Warm afternoon light, gentle long shadows.
```

### 02 — THE WEB DESK
```
[PREAMBLE]
Closer isometric crop on the teal-glass office corner of the same floating island
(same island edge, ground texture and light as the establishing shot). @khybi
seated at a small rounded desk, a softly glowing floating browser-window / laptop
icon hovering above the desk showing a simple stylised webpage layout. A couple
of potted teal-gray plants and a small coral desk lamp nearby. Same warm
afternoon light and cream haze at the edges.
```

### 03 — THE NFC KIOSK
```
[PREAMBLE]
Closer isometric crop on the NFC kiosk corner of the same floating island. @khybi
standing at a small rounded kiosk, holding a little tap card and touching it to a
softly glowing smartphone standing on the counter, a small coral spark-and-ripple
effect radiating from the tap point. A tiny stack of cards and a potted plant on
the counter. Same island base, same warm light, cream-haze edges.
```

### 04 — THE SIGNAL TOWER
```
[PREAMBLE]
Closer isometric crop on the signal-tower corner of the same floating island.
@khybi standing on a raised circular platform shaped like a glowing coral map-pin,
holding up a chunky magnifying glass. Behind, the tall slender signal tower with
soft concentric signal rings at its tip and a small Facebook thumbs-up flag banner
on its mast. Same island edge and ground, same warm afternoon light, cream haze.
```

### 05 — CREW: SHIEK (developer)
```
[PREAMBLE]
Closer isometric crop on a small quiet desk nook elsewhere on the same floating
island. @khybi in a calm, focused standing pose beside a small desk, a floating
laptop screen showing simple glowing code brackets { } above it. A mug and a
small potted plant on the desk. Same island base and warm light, cream-haze edges.
```

### 06 — CREW: DAVE (pitch)
```
[PREAMBLE]
Closer isometric crop on a small meeting-bench area on the same floating island —
a low rounded bench, a little table, potted plants around. @khybi standing holding
a small rounded briefcase in one mitten hand, the other arm extended forward in a
mid-handshake gesture, friendly open posture. Same island base, same warm
afternoon light, cream haze at the edges.
```

### 07 — CREW: HAIQAL (pitch)
```
[PREAMBLE]
Closer isometric crop on the SAME meeting-bench area as the previous shot (same
bench, table and plants). @khybi standing and holding up a small glowing tablet /
pitch deck in both mitten hands, presenting it toward the viewer — a clearly
different pose from the handshake shot: both hands up on the tablet, weight
settled, mid-presentation. Same island base, same warm light, cream-haze edges.
```

### 08 — CREW: REIN (social media)
```
[PREAMBLE]
Closer isometric crop on a small content-creator corner of the same floating
island: a tiny ring light on a stand and a small camera-on-tripod prop nearby.
@khybi holding up a smartphone in both mitten hands, small floating coral heart
and like/thumbs-up bubbles drifting up from the screen. Same island base, same
warm afternoon light, cream haze at the edges.
```

---

## THE 7 FLIGHT CLIPS

Model: **Seedance 2.0, 4K, exactly 5 seconds each, locked exposure.** For each
clip, set the **start frame** and **end frame** to the two real stills named —
consistency comes from the actual images, not the prompt. Keep the motion prompt
short so the model just interpolates a smooth camera move.

Shared motion prompt (use for all 7, adjust the "drifting toward…" clause):

```
Smooth continuous isometric camera flight across a floating miniature clay-diorama
island, slowly drifting and gliding from the first framing toward the second, one
unbroken take. Locked exposure, no flicker, no cuts, no character animation beyond
gentle ambient motion (soft light shimmer, faint plant sway). Warm afternoon
light held constant, cream-haze edges, gentle vignette, premium and calm.
```

| Clip | Start frame | End frame | drifting toward… |
|------|-------------|-----------|------------------|
| 1 | 01 Hero | 02 Web Desk | the teal-glass office corner |
| 2 | 02 Web Desk | 03 NFC Kiosk | the NFC kiosk |
| 3 | 03 NFC Kiosk | 04 Signal Tower | the signal tower and map-pin |
| 4 | 04 Signal Tower | 05 Shiek | the quiet desk nook |
| 5 | 05 Shiek | 06 Dave | the meeting bench |
| 6 | 06 Dave | 07 Haiqal | the same bench, new angle |
| 7 | 07 Haiqal | 08 Rein | the content-creator corner |

---

## UPSCALE

Run all 8 stills through Higgsfield's **upscale to 4K** before using them as
fallback frames — they sit next to 4K video and must not look soft.

## STITCH (local, one-time build step)

7 clips × 5s with a 1s crossfade at each of the 6 joins ≈ **29s** final. `ffmpeg`
is installed. Put the 7 clips in a folder as `clip1.mp4 … clip7.mp4`, then:

```bash
# xfade chains each clip into the next with a 1s dissolve.
# offsets: clip N starts fading at (N*5 - N*1) = cumulative (4,8,12,16,20,24)s.
ffmpeg \
 -i clip1.mp4 -i clip2.mp4 -i clip3.mp4 -i clip4.mp4 \
 -i clip5.mp4 -i clip6.mp4 -i clip7.mp4 \
 -filter_complex "\
 [0][1]xfade=transition=fade:duration=1:offset=4[a]; \
 [a][2]xfade=transition=fade:duration=1:offset=8[b]; \
 [b][3]xfade=transition=fade:duration=1:offset=12[c]; \
 [c][4]xfade=transition=fade:duration=1:offset=16[d]; \
 [d][5]xfade=transition=fade:duration=1:offset=20[e]; \
 [e][6]xfade=transition=fade:duration=1:offset=24[out]" \
 -map "[out]" -c:v libx264 -pix_fmt yuv420p -g 4 -keyint_min 4 \
 -sc_threshold 0 -crf 18 -movflags +faststart -an \
 public/assets/world/island-flight.mp4
```

The `-g 4` small GOP is what makes scroll-scrubbing smooth — without it the
decoder walks from a distant keyframe on every seek and scrubbing stutters. Only
this stitched `island-flight.mp4` ships; the 7 source clips stay local.

> Note: adopting this single ~29s continuous flight is an **architecture change**
> from what's currently built (which scrubs Hero→Bundle only). The scene config
> and scrub range need rewiring to drive the whole tour off one video. Say the
> word and I'll do that rework.
```
