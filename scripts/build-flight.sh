#!/bin/zsh
# Stitch the island flight as: hold on the original still, fly, hold, fly...
#
# Each zone opens on the crisp 4K source image the clip was generated from,
# held still so the zone's copy can be read against a clean frame, then the
# camera flies to the next zone's image. Holding the ORIGINAL rather than the
# clip's own last frame matters twice over: the source is sharper than any
# decoded video frame, and consecutive clips don't actually meet (0.76-0.90
# SSIM), so the still is the anchor that hides the drift on both sides.
set -e

SRC=~/Downloads/Clipping/"kynrio avatars"
IMG=/Users/shiekabdurahmanpro/Documents/Khybrio/public/assets/world
OUT="$1"

HOLD=3.5   # seconds each still is held
XF=0.5     # crossfade at every junction

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

ARGS=()
for i in {1..7}; do ARGS+=(-loop 1 -t $HOLD -i "${IMGS[$i]}"); done
for i in {1..7}; do ARGS+=(-i "${CLIPS[$i]}"); done

FC=""
# inputs 0-6 are the stills, 7-13 the clips
for i in {0..6}; do
  FC+="[${i}:v]scale=1920:1080:flags=lanczos,fps=24,setsar=1,format=yuv420p[h$((i+1))];"
done
for i in {0..6}; do
  # clips carry a Higgsfield stamp bottom-right
  FC+="[$((i+7)):v]scale=1920:1080:flags=lanczos,delogo=x=1510:y=985:w=395:h=85,fps=24,setsar=1,format=yuv420p[c$((i+1))];"
done

# interleave hold/clip and crossfade every junction
ORDER=(h1 c1 h2 c2 h3 c3 h4 c4 h5 c5 h6 c6 h7 c7)
LENS=($HOLD 8 $HOLD 8 $HOLD 8 $HOLD 8 $HOLD 8 $HOLD 8 $HOLD 8)

typeset -F acc=${LENS[1]}
prev=${ORDER[1]}
for k in {2..14}; do
  off=$(printf "%.3f" $(( acc - XF )))
  # ${off} must be braced: bare $off[x$k] is array-subscript syntax in zsh
  FC+="[$prev][${ORDER[$k]}]xfade=transition=fade:duration=${XF}:offset=${off}[x${k}];"
  acc=$(( acc + ${LENS[$k]} - XF ))
  prev="x$k"
done
FC="${FC%;}"

printf "total duration: %.2f s\n" $acc
printf "zone holds open at: "; for k in {0..6}; do printf "%.1f " $(( k * (HOLD + 8 - 2*XF) )); done; echo
ffmpeg -v error -y "${ARGS[@]}" -filter_complex "$FC" -map "[$prev]" -an \
  -c:v libx264 -crf 16 -preset medium -pix_fmt yuv420p "$OUT"
echo BUILD_DONE
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,duration,nb_frames -of default=nw=1 "$OUT"
