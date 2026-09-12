import { motion, useScroll, useSpring } from 'motion/react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/** Barra fina de progresso de leitura, no topo. */
export function ScrollProgress() {
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 })

  return (
    <motion.div
      className="bg-signal fixed inset-x-0 top-0 z-50 h-px origin-left"
      style={{ scaleX: reduced ? scrollYProgress : scaleX }}
      aria-hidden="true"
    />
  )
}
