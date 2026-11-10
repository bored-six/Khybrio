import { useEffect, useRef, useState } from 'react'
import { AssetImage } from '../components/AssetImage'
import { Reveal } from '../components/Reveal'
import { useContent } from '../content/context'
import { A } from '../lib/assets'
import { prefersReducedMotion } from '../lib/smoothScroll'

/**
 * The island, alive. A 3MB loop is a poor trade on a phone or a metered
 * connection, so the still is what renders, and the video src is attached
 * only when all of these hold: the window is near the viewport, the screen is
 * at least 768px wide, Save-Data is off, and reduced motion is not asked for.
 * The video sits over the still and fades in on its first frame, so there is
 * never a blank box; it pauses again whenever it scrolls out of view.
 */
function IslandLoop() {
  const frame = useRef(null)
  const video = useRef(null)
  const [src, setSrc] = useState(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const el = frame.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (!window.matchMedia('(min-width: 768px)').matches) return
    if (navigator.connection?.saveData) return
    if (prefersReducedMotion()) return

    const io = new IntersectionObserver(
      ([entry]) => {
        const v = video.current
        if (entry.isIntersecting) {
          setSrc(A.heroLoop.src)
          v?.play().catch(() => {})
        } else {
          v?.pause()
        }
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <figure className="mt-10">
      <div
        ref={frame}
        className="relative aspect-video overflow-hidden rounded-[28px] border-2 border-teal-deep/12"
      >
        <AssetImage asset={A.hero} className="absolute inset-0 h-full w-full object-cover" />
        {src ? (
          <video
            ref={video}
            src={src}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              playing ? 'opacity-100' : 'opacity-0'
            }`}
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            aria-hidden="true"
            onPlaying={() => setPlaying(true)}
          />
        ) : null}
      </div>
      <figcaption className="mt-3 text-sm text-ink-muted">Meet Khybi, our mascot.</figcaption>
    </figure>
  )
}

/**
 * Short origin story. Sits after the process, so a visitor knows how buying
 * works, hears why we started, and only then reads the FAQ.
 */
export function About() {
  const { about } = useContent()
  return (
    <section id="about" className="relative z-10 bg-cream px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          {/* The headline unmasks left-to-right — a wipe, not a fade. Opacity
              stays out of it so the wipe edge itself is the reveal. */}
          <Reveal
            from={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
            blur={false}
            duration={1.05}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-bright">
              {about.eyebrow}
            </p>
            <h2 className="mt-3 text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-tight text-teal-deep">
              {about.title}
            </h2>
          </Reveal>

          <Reveal from={{ y: 40 }} delay={0.15}>
            <IslandLoop />
          </Reveal>
        </div>

        <div>
          <p className="leading-relaxed text-ink-muted">{about.body}</p>

          <Reveal as="dl" from={{ x: -34 }} stagger={0.12} className="mt-9 flex flex-col gap-5">
            {about.points.map((point) => (
              <div key={point.label} className="border-l-2 border-teal-soft pl-5 sm:pl-6">
                <dt className="font-semibold text-teal-deep">{point.label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-muted">{point.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
