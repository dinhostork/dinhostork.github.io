import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

interface ProjectCoverProps {
  src: string
  alt: string
  priority?: boolean
}

/**
 * Capa com parallax contido — apenas a imagem se move dentro do quadro,
 * o container tem overflow hidden. Delta pequeno (MASTER.md §7).
 */
export function ProjectCover({ src, alt, priority }: ProjectCoverProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-2.4%', '2.4%'])

  return (
    <div
      ref={ref}
      data-parallax
      className="hairline rounded-card bg-surface group-hover:border-signal/30 relative aspect-[16/10] overflow-hidden transition-colors duration-200"
    >
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        width={1140}
        height={713}
        className="absolute inset-0 size-full scale-105 object-cover brightness-[0.86] saturate-[0.8] transition-[filter] duration-300 group-hover:brightness-100 group-hover:saturate-100"
        style={reduced ? undefined : { y }}
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(7,9,12,0.75),rgba(7,9,12,0.15)_60%)] transition-opacity duration-300 group-hover:opacity-60"
        aria-hidden="true"
      />
    </div>
  )
}
