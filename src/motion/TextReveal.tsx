import { Fragment } from 'react'
import { motion } from 'motion/react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { easeOut } from './tokens'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
}

/**
 * Masked reveal palavra a palavra. Reservado a headlines curtas (MASTER.md §7).
 * As palavras animadas são aria-hidden e uma cópia sr-only preserva o texto
 * para leitores de tela; o conteúdo continua presente no HTML para indexação.
 */
export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const reduced = usePrefersReducedMotion()
  const words = text.split(' ')

  if (reduced) return <span className={className}>{text}</span>

  return (
    <span className={className}>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span className="inline-block overflow-hidden align-bottom pb-[0.08em]">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.7, ease: easeOut, delay: delay + i * 0.055 }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? ' ' : null}
          </Fragment>
        ))}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
