/**
 * Stand-in for a real headshot: a solid circle with the person's initials.
 *
 * Sized and positioned exactly where the photo will drop in — swapping this
 * for an <img> later is a same-box replacement with no layout change.
 */
export function InitialsAvatar({ initials, accent, size = 56 }) {
  return (
    <span
      aria-hidden="true"
      className="inline-grid shrink-0 place-items-center rounded-full font-display font-bold text-cream select-none"
      style={{
        width: size,
        height: size,
        background: accent,
        fontSize: size * 0.36,
        letterSpacing: '0.02em',
      }}
    >
      {initials}
    </span>
  )
}
