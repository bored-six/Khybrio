/**
 * Offer marks: one object in 2-unit round-capped outline on a 24-unit grid,
 * with a single solid coral bead marking where the action happens.
 *
 * Rules, so the next mark can be drawn without guessing:
 *   1. viewBox 0 0 24 24, live area 2..22. Arcs may overshoot to 23.5 for
 *      optical size; nothing else leaves the live area.
 *   2. Every stroke is 2 units, round caps, round joins, no fill, currentColor.
 *      Never thinner, never thicker. At the smallest shipped size (20px) that
 *      is a 1.67px line, which is the weight of the site's 2px card borders.
 *   3. Containers use rx 2.5, sub-shapes rx 1.5 to 2. No square corners.
 *   4. Exactly ONE accent per mark: a filled shape, never a stroke, in
 *      `--icon-accent` (coral by default). Default is a circle r 2 to 2.5
 *      (4 to 5 units across, so it survives at 20px as a 3px+ bead). It sits
 *      where the thing happens: the button, the pin, the chip, the job in
 *      transit, the piece being added.
 *   5. At most four stroke primitives plus the accent. Parallel strokes sit at
 *      least 4 units apart centre to centre.
 *   6. No letters, no brand logos, no perspective.
 *   7. UI glyphs (Arrow, Yes, No) are a single stroke primitive with no accent.
 *
 * Marks ship at 20px minimum. Below that, use the accent dot on its own.
 * UI glyphs may go down to 14px, or 11px when sitting in a filled chip.
 * Closest pair at 20px: Site and Stand (both a rounded box, a rule and a
 * bead). They stay apart on silhouette: landscape window with a full-width
 * toolbar rule, against a portrait panel standing on a T-foot. Keep it so.
 */

const ACCENT = 'var(--icon-accent, var(--color-coral))'

function Mark({ size = 24, className, title, children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  )
}

/** Websites: a browser window, two lines of copy, the coral bead is its button. */
export function IconSite(props) {
  return (
    <Mark {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9H21" />
      <path d="M7 13H12" />
      <path d="M7 17H10" />
      <circle cx="16" cy="15" r="2" fill={ACCENT} stroke="none" />
    </Mark>
  )
}

/** Google profile: a map pin, the coral bead is the place itself. */
export function IconPin(props) {
  return (
    <Mark {...props}>
      <path d="M12 21.5C12 21.5 5 15.3 5 10A7 7 0 0 1 19 10C19 15.3 12 21.5 12 21.5Z" />
      <circle cx="12" cy="10" r="2.5" fill={ACCENT} stroke="none" />
    </Mark>
  )
}

/** Automation: trigger node, result node, one wire; the bead is the job in transit. */
export function IconFlow(props) {
  return (
    <Mark {...props}>
      <rect x="3" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="14" y="13.5" width="7" height="7" rx="1.5" />
      <path d="M10 7H14.5Q17.5 7 17.5 10V13.5" />
      <circle cx="14" cy="7" r="2" fill={ACCENT} stroke="none" />
    </Mark>
  )
}

/** Add-ons: a base slab with a block on it; the coral piece is the extra landing. */
export function IconStack(props) {
  return (
    <Mark {...props}>
      <rect x="3" y="13" width="18" height="7.5" rx="2.5" />
      <rect x="5.5" y="6.5" width="7" height="6.5" rx="1.5" />
      <rect x="14.5" y="4" width="5.5" height="5.5" rx="1.5" fill={ACCENT} stroke="none" />
    </Mark>
  )
}

/** NFC card: a card with two tap waves; the bead is the chip. */
export function IconCard(props) {
  return (
    <Mark {...props}>
      <rect x="2" y="8" width="12.5" height="8" rx="2" />
      <path d="M17.6 9.4A4 4 0 0 1 17.6 14.6" />
      <path d="M20.6 6.9A8 8 0 0 1 20.6 17.1" />
      <circle cx="7" cy="12" r="2" fill={ACCENT} stroke="none" />
    </Mark>
  )
}

/** NFC stand: a tall panel on a foot; the bead is the spot you tap. */
export function IconStand(props) {
  return (
    <Mark {...props}>
      <rect x="6" y="2.5" width="12" height="14.5" rx="2.5" />
      <path d="M12 17V21" />
      <path d="M4.5 21H19.5" />
      <path d="M9.5 13.5H14.5" />
      <circle cx="12" cy="8.5" r="2.2" fill={ACCENT} stroke="none" />
    </Mark>
  )
}

/* ── UI glyphs: one stroke, no accent ─────────────────────────────────── */

export function IconArrow(props) {
  return (
    <Mark {...props}>
      <path d="M4 12H19M13.5 6.5L19 12L13.5 17.5" />
    </Mark>
  )
}

export function IconYes(props) {
  return (
    <Mark {...props}>
      <path d="M5 12.5L9.5 17L19 7" />
    </Mark>
  )
}

export function IconNo(props) {
  return (
    <Mark {...props}>
      <path d="M7.5 12H16.5" />
    </Mark>
  )
}
