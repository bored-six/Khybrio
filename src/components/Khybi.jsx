/**
 * Khybi — the Khybrio mascot, hand-built as SVG so he's crisp everywhere and
 * can be dropped into any section. Deep-teal vinyl body, coral sash and
 * ear-tips, wide dot eyes. `pose` swaps what he's doing:
 *   'wave'  — one mitten raised (default, friendly)
 *   'phone' — holding out a phone (used in Contact)
 *   'plain' — both arms down
 */
export function Khybi({ pose = 'wave', size = 120, className = '', style }) {
  const teal = 'var(--color-teal-deep)'
  const tealBright = 'var(--color-teal-bright)'
  const soft = 'var(--color-teal-soft)'
  const coral = 'var(--color-coral)'
  const cream = 'var(--color-cream)'

  return (
    <svg
      viewBox="0 0 120 150"
      width={size}
      height={(size * 150) / 120}
      className={className}
      style={style}
      role="img"
      aria-label="Khybi, the Khybrio mascot"
    >
      {/* soft ground shadow */}
      <ellipse cx="60" cy="143" rx="30" ry="5" fill={teal} opacity="0.18" />

      {/* legs */}
      <rect x="44" y="118" width="12" height="20" rx="6" fill={teal} />
      <rect x="64" y="118" width="12" height="20" rx="6" fill={teal} />
      <ellipse cx="50" cy="139" rx="9" ry="5" fill={teal} />
      <ellipse cx="70" cy="139" rx="9" ry="5" fill={teal} />

      {/* body (also clips the sash so it never pokes past the edge) */}
      <defs>
        <clipPath id="khybi-body">
          <path d="M60 66 C86 66 92 92 90 110 C88 126 74 132 60 132 C46 132 32 126 30 110 C28 92 34 66 60 66 Z" />
        </clipPath>
      </defs>
      <path
        d="M60 66 C86 66 92 92 90 110 C88 126 74 132 60 132 C46 132 32 126 30 110 C28 92 34 66 60 66 Z"
        fill={teal}
      />
      <g clipPath="url(#khybi-body)">
        {/* chest patch */}
        <path d="M60 82 C70 82 74 90 73 100 C72 110 66 114 60 114 C54 114 48 110 47 100 C46 90 50 82 60 82 Z" fill={soft} opacity="0.55" />
        {/* coral sash */}
        <path d="M40 76 L84 116 L76 126 L32 86 Z" fill={coral} />
      </g>

      {/* left arm */}
      {pose === 'wave' ? (
        <g>
          <path d="M34 84 C22 78 16 66 20 60" stroke={teal} strokeWidth="11" strokeLinecap="round" fill="none" />
          <circle cx="19" cy="58" r="8" fill={teal} />
        </g>
      ) : (
        <g>
          <path d="M34 88 C24 92 20 104 22 112" stroke={teal} strokeWidth="11" strokeLinecap="round" fill="none" />
          <circle cx="23" cy="114" r="8" fill={teal} />
        </g>
      )}

      {/* right arm — holds a phone in 'phone' pose */}
      {pose === 'phone' ? (
        <g>
          <path d="M86 88 C96 90 100 100 98 108" stroke={teal} strokeWidth="11" strokeLinecap="round" fill="none" />
          <rect x="90" y="96" width="20" height="30" rx="4" fill={teal} stroke={cream} strokeWidth="2" />
          <rect x="93" y="100" width="14" height="18" rx="2" fill={tealBright} />
          <circle cx="100" cy="122" r="1.6" fill={cream} />
        </g>
      ) : (
        <g>
          <path d="M86 88 C96 92 100 104 98 112" stroke={teal} strokeWidth="11" strokeLinecap="round" fill="none" />
          <circle cx="97" cy="114" r="8" fill={teal} />
        </g>
      )}

      {/* ears */}
      <path d="M40 30 C38 18 42 10 48 12 C52 14 50 26 48 34 Z" fill={teal} />
      <path d="M80 30 C82 18 78 10 72 12 C68 14 70 26 72 34 Z" fill={teal} />
      <circle cx="45" cy="14" r="4.5" fill={coral} />
      <circle cx="75" cy="14" r="4.5" fill={coral} />

      {/* head */}
      <ellipse cx="60" cy="52" rx="34" ry="31" fill={teal} />

      {/* eyes */}
      <circle cx="48" cy="52" r="5.5" fill="#0f2b29" />
      <circle cx="72" cy="52" r="5.5" fill="#0f2b29" />
      <circle cx="46.2" cy="50" r="1.7" fill={cream} />
      <circle cx="70.2" cy="50" r="1.7" fill={cream} />

      {/* smile */}
      <path d="M53 63 Q60 69 67 63" stroke="#0f2b29" strokeWidth="2.6" strokeLinecap="round" fill="none" />

      {/* wave sparkles */}
      {pose === 'wave' ? (
        <g fill={coral}>
          <circle cx="10" cy="50" r="2" />
          <circle cx="16" cy="44" r="1.4" />
        </g>
      ) : null}
    </svg>
  )
}
