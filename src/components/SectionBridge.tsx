import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Costura entre capítulos — briefing §8.
 * Uma hairline desce do capítulo anterior e termina exatamente na coluna onde
 * começa o índice do próximo, preenchendo-se conforme o scroll avança.
 * Puramente decorativa: nenhum conteúdo vive aqui.
 */
export function SectionBridge() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'end 55%'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="container-page" aria-hidden="true">
      <div className="relative h-20 md:h-28">
        <div className="bg-line absolute top-0 left-0 h-full w-px" />
        <motion.div
          className="bg-signal absolute top-0 left-0 h-full w-px origin-top"
          style={reduced ? { scaleY: 1, opacity: 0.5 } : { scaleY }}
        />
        <span className="border-line bg-bg absolute bottom-0 left-[-3px] size-[7px] rounded-full border" />
      </div>
    </div>
  )
}
