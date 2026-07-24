import { useRef } from 'react'
import { isCoarsePointer } from '../lib/smoothScroll'

/**
 * Wraps a button/link so it gently pulls toward the cursor and springs back on
 * leave. Pure transform, smoothed by a CSS transition. Disabled on touch (no
 * hover) so it never fights a tap.
 */
export function Magnetic({ children, strength = 0.4, className = '' }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el || isCoarsePointer()) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const reset = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0px, 0px)'
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
      style={{ willChange: 'transform' }}
    >
      {children}
    </span>
  )
}
