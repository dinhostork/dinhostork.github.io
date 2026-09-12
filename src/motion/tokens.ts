import type { Transition, Variants } from 'motion/react'

/** Tokens de motion — MASTER.md §7. Toda animação do site usa um destes. */
export const spring: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 0.6,
}

export const easeOut = [0.16, 1, 0.3, 1] as const

export const DUR = {
  fast: 0.15,
  base: 0.28,
  slow: 0.6,
} as const

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: easeOut },
  },
}

/** Cascata de no máximo 8 itens, 40ms entre cada — MASTER.md §7. */
export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
}

export const VIEWPORT = { once: true, amount: 0.2 } as const
