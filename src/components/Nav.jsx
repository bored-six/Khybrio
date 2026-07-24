import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { nav } from '../content/site'
import { scrollToId, scrollToSceneProgress } from '../lib/smoothScroll'

export function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Lenis scrolls the real window, so scrollY stays authoritative.
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        setSolid(window.scrollY > window.innerHeight * 0.35)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  // Nav item click — jump into the flight at a zone when `flightProgress` is set.
  const goItem = (item) => (e) => {
    e.preventDefault()
    setOpen(false)
    if (item.flightProgress != null) scrollToSceneProgress(item.id, item.flightProgress)
    else scrollToId(item.id)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? 'bg-teal-deep/95 backdrop-blur-md shadow-[0_1px_0_rgba(245,247,246,0.08)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#hero" onClick={go('hero')} aria-label="Khybrio, back to top">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              href={`#${item.id}`}
              onClick={goItem(item)}
              className="text-sm font-medium text-cream/75 transition-colors hover:text-cream"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={go('contact')}
            className="rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-cream transition-transform duration-300 hover:scale-[1.04]"
          >
            Get started
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-cream md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-cream/10 bg-teal-deep/98 px-5 pb-6 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {nav.map((item) => (
              <a
                key={item.label}
                href={`#${item.id}`}
                onClick={goItem(item)}
                className="rounded-lg px-2 py-3 text-base font-medium text-cream/80 hover:bg-cream/5 hover:text-cream"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={go('contact')}
              className="mt-2 rounded-full bg-coral px-5 py-3 text-center text-base font-semibold text-cream"
            >
              Get started
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
