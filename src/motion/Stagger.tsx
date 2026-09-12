import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { DUR, VIEWPORT, easeOut, staggerParent } from './tokens'

interface StaggerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'ul' | 'ol'
}

export function Stagger({ children, className, as = 'div' }: StaggerProps) {
  const reduced = usePrefersReducedMotion()
  const Component = motion[as]

  if (reduced) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Component
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </Component>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'li'
}

export function StaggerItem({ children, className, as = 'div' }: StaggerItemProps) {
  const reduced = usePrefersReducedMotion()
  const Component = motion[as]

  if (reduced) {
    const Static = as
    return <Static className={className}>{children}</Static>
  }

  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: easeOut } },
      }}
    >
      {children}
    </Component>
  )
}
