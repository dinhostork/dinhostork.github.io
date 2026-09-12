import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Espinha vertical que progride com o scroll — MASTER.md §10.
 * Sob reduced-motion a linha é renderizada inteira, estática.
 */
export function TimelineSpine({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.5 })

  return (
    <div ref={ref} className="relative">
      <div
        className="bg-line absolute top-2 bottom-2 left-[7px] w-px md:left-[calc(7.5rem+7px)]"
        aria-hidden="true"
      />
      <motion.div
        className="bg-signal absolute top-2 bottom-2 left-[7px] w-px origin-top md:left-[calc(7.5rem+7px)]"
        style={reduced ? { scaleY: 1 } : { scaleY }}
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
