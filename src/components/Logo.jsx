import { AssetImage } from './AssetImage'
import { A } from '../lib/assets'
import { brand } from '../content/site'

/**
 * Nav / footer lockup. The mark itself is an SVG you supply (see ASSETS.md) —
 * until then the placeholder stands in at the same box size, so nothing shifts
 * when the real one lands.
 */
export function Logo({ className = '', markSize = 34, showWordmark = true, tone = 'cream' }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <AssetImage
        asset={A.mark}
        loading="eager"
        className="block shrink-0"
        style={{ width: markSize, height: markSize, borderRadius: 8 }}
      />
      {showWordmark ? (
        <span
          className="font-display text-[1.35rem] font-bold tracking-tight"
          style={{ color: tone === 'cream' ? 'var(--color-cream)' : 'var(--color-teal-deep)' }}
        >
          {brand.name}
        </span>
      ) : null}
    </span>
  )
}
