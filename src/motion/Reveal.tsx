import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { DUR, VIEWPORT, easeOut } from './tokens'

interface RevealProps {
  children: ReactNode
  /** Atraso em segundos. Use com moderação: máx. 2 elementos animados por viewport. */
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article' | 'header' | 'span'
}

/**
 * Reveal de entrada. Sob prefers-reduced-motion renderiza o estado final
 * imediatamente, sem envolver nenhuma animação.
 */
export function Reveal({ children, delay = 0, y = 16, className, as = 'div' }: RevealProps) {
  const reduced = usePrefersReducedMotion()
  const Component = motion[as]

  if (reduced) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DUR.slow, ease: easeOut, delay }}
    >
      {children}
    </Component>
  )
}
