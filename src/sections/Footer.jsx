import { AssetImage } from '../components/AssetImage'
import { A } from '../lib/assets'
import { brand, nav, footer } from '../content/site'
import { scrollToId } from '../lib/smoothScroll'

/**
 * Reuses the hero island still, scaled and offset in CSS to land on the waving
 * Khybi figure — a crop, not a new generation.
 */
export function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden bg-teal-deep">
      <div className="relative h-52 overflow-hidden sm:h-64">
        <AssetImage
          asset={A.hero}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: '38% 46%', transform: 'scale(2.1)' }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-teal-deep/45 to-teal-deep" />
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-10 sm:px-8">
        <div className="grid gap-10 border-b border-cream/10 pb-10 md:grid-cols-[1.5fr_1fr]">
          <div>
            {/* The full supplied lockup, not the nav's mark-plus-text version —
                the footer is the one place with room for the descriptor. */}
            <AssetImage asset={A.logoFull} className="w-40 sm:w-44" />
            <p className="mt-4 max-w-sm leading-relaxed text-cream/65">{footer.blurb}</p>
            <p className="mt-4 text-sm text-cream/45">{brand.location}</p>
          </div>

          <nav className="flex flex-col gap-3">
            {nav.map((item) => (
              <a
                // Not item.id — two nav entries share the 'flight' id (they
                // jump to different zones of the same scene), so ids collide.
                key={item.label}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId(item.id)
                }}
                className="text-sm text-cream/65 transition-colors hover:text-cream"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Giant wordmark. Clipped deliberately — it reads as a graphic. */}
        <p
          aria-hidden="true"
          className="mt-10 select-none font-display font-bold leading-[0.8] tracking-tighter text-cream/10"
          style={{ fontSize: 'clamp(3.5rem, 19vw, 16rem)' }}
        >
          {brand.name}
        </p>

        <p className="mt-6 text-xs text-cream/40">
          © {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
