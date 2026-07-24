import { useLayoutEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/smoothScroll'
import { setActiveIndex } from '../lib/sceneRegistry'

/**
 * Marks a plain (unpinned) section as owning a counter milestone. Pinned
 * scenes set their milestone from scroll progress instead, so they can switch
 * mid-pin.
 */
export function useMilestone(ref, index) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 65%',
        end: 'bottom 35%',
        onToggle: (self) => {
          if (self.isActive) setActiveIndex(index)
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [ref, index])
}
