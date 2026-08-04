#!/bin/zsh
# Stitch the island flight as: hold, fly, land, hold, fly, land...
#
# Each zone runs three beats:
#   1. HOLD — the original 4K still, frozen, so the zone's copy reads against a
#             clean frame. Holding the ORIGINAL rather than a video frame
#             matters because the source PNG is sharper than anything the codec
#             hands back.
#   2. FLY  — the 8s Higgsfield clip, scrubbed by scroll.
#   3. LAND — the clip's own last frame, frozen, so the camera visibly settles
#             where it actually arrived before anything else happens.
#
# LAND and the next HOLD are near-identical framings but not the same one:
# Seedance drifts, so a clip's last frame sits only 0.76-0.90 SSIM from the
# original it was told to end on. Freezing the landing first and then dissolving
# to the crisp original turns that mismatch into a deliberate settle, instead of
# a smear applied mid-motion.
set -e

SRC=~/Downloads/Clipping/"kynrio avatars"
IMG=/Users/shiekabdurahmanpro/Documents/Khybrio/public/assets/world
OUT="${1:?usage: build-flight.sh <output.mp4>}"
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

HOLD=3.0          # freeze on the original still
CLIP_SECONDS=8    # length every source segment is pinned to
LAND=1.5          # freeze on the clip's last frame
XF=0.5            # crossfade at every junction
DELOGO="delogo=x=1510:y=985:w=395:h=85"   # Higgsfield stamp, bottom-right

# Seedance renders at 24fps. The flight is played back at FLIGHT_RATE (2.5x) in
# scenes.config.js, so a 24fps source only ever shows ~10 distinct frames a
# second on screen — visibly steppy on a slow camera move. Interpolating to 60
# puts that back to ~24. The content suits it: matte clay, no fast motion, no
# fine texture for the motion estimator to tear.
#
# minterpolate is slow (~12s per source second), so results are cached beside
# the output and reused. Delete the cache dir to force a rebuild.
FPS=60
CACHE="${2:-$(dirname "$OUT")/.flight-${FPS}fps}"
mkdir -p "$CACHE"

# zone order follows the footage: hero -> webDesk -> nfc -> tower -> shiek -> dave -> haiqal
IMGS=("$IMG/01-hero.png" "$IMG/02-web-desk.png" "$IMG/03-nfc-kiosk.png" \
      "$IMG/04-signal-tower.png" "$IMG/05-shiek.png" "$IMG/06-dave.png" "$IMG/07-haiqal.png")
CLIPS=("$SRC/CLIP 1 · Hero → Web Desk.mp4" \
       "$SRC/CLIP 2 — Start- IMAGE 2 (Web Desk) → End- IMAGE 3 (NFC Kiosk).mp4" \
       "$SRC/CLIP 3 — Start- IMAGE 3 (NFC Kiosk) → End- IMAGE 4 (Signal Tower).mp4" \
       "$SRC/CLIP 4 · Signal Tower → Desk Nook.mp4" \
       "$SRC/CLIP 5 · Desk Nook → Meeting Bench.mp4" \
       "$SRC/CLIP 6 · Dave → Haiqal (same bench, new angle).mp4" \
       "$SRC/CLIP 7 · Meeting Bench → Ring Light Corner.mp4")

# Interpolate each clip to FPS once, then work from the cache.
for i in {1..7}; do
  if [[ ! -s "$CACHE/clip$i.mp4" ]]; then
    echo "  interpolating clip $i to ${FPS}fps (slow, cached after this)..."
    ffmpeg -v error -y -i "${CLIPS[$i]}" \
      -vf "minterpolate=fps=${FPS}:mi_mode=mci:mc_mode=aobmc:vsbmc=1" \
      -c:v libx264 -crf 15 -preset medium -pix_fmt yuv420p "$CACHE/clip$i.mp4"
  fi
  CLIPS[$i]="$CACHE/clip$i.mp4"
done

# Pull each clip's final frame, already de-logoed and scaled, so the freeze is
# identical to the frame its motion ends on.
for i in {1..7}; do
  ffmpeg -v error -y -sseof -0.05 -i "${CLIPS[$i]}" \
    -vf "scale=1920:1080:flags=lanczos,${DELOGO}" -frames:v 1 "$WORK/end$i.png"
done

ARGS=()
for i in {1..7}; do ARGS+=(-loop 1 -t $HOLD -i "${IMGS[$i]}"); done      # inputs 0-6
for i in {1..7}; do ARGS+=(-i "${CLIPS[$i]}"); done                       # inputs 7-13
for i in {1..7}; do ARGS+=(-loop 1 -t $LAND -i "$WORK/end$i.png"); done   # inputs 14-20

FC=""
for i in {0..6}; do
  FC+="[${i}:v]scale=1920:1080:flags=lanczos,fps=${FPS},setsar=1,format=yuv420p[h$((i+1))];"
done
for i in {0..6}; do
  # Pinned to exactly CLIP_SECONDS. minterpolate does not land on a whole number
  # of output frames -- it returns 476 where 8s at 60fps wants 480 -- and every
  # xfade offset below is computed from the assumed length, so an unpadded clip
  # would walk all 21 junctions out of position, compounding to about half a
  # second by the end. Clone the last frame to cover the shortfall, then trim.
  FC+="[$((i+7)):v]scale=1920:1080:flags=lanczos,${DELOGO},fps=${FPS}"
  FC+=",tpad=stop_mode=clone:stop_duration=1,trim=duration=${CLIP_SECONDS}"
  FC+=",setpts=PTS-STARTPTS,setsar=1,format=yuv420p[c$((i+1))];"
done
for i in {0..6}; do
  FC+="[$((i+14)):v]fps=${FPS},setsar=1,format=yuv420p[e$((i+1))];"
done

ORDER=(); LENS=()
for i in {1..7}; do
  ORDER+=(h$i c$i e$i)
  LENS+=($HOLD $CLIP_SECONDS $LAND)
done

typeset -F acc=${LENS[1]}
prev=${ORDER[1]}
for k in {2..21}; do
  off=$(printf "%.3f" $(( acc - XF )))
  # ${off} must be braced: bare $off[x$k] is array-subscript syntax in zsh
  FC+="[$prev][${ORDER[$k]}]xfade=transition=fade:duration=${XF}:offset=${off}[x${k}];"
  acc=$(( acc + ${LENS[$k]} - XF ))
  prev="x$k"
done
FC="${FC%;}"

printf "total: %.2f s   zone stride: %.2f s\n" $acc $(( HOLD + CLIP_SECONDS + LAND - 3*XF ))
printf "holds open at: "; for k in {0..6}; do printf "%.1f " $(( k * (HOLD + CLIP_SECONDS + LAND - 3*XF) )); done; echo

ffmpeg -v error -y "${ARGS[@]}" -filter_complex "$FC" -map "[$prev]" -an \
  -c:v libx264 -crf 16 -preset medium -pix_fmt yuv420p "$OUT"
echo BUILD_DONE
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration,nb_frames -of default=nw=1 "$OUT"
