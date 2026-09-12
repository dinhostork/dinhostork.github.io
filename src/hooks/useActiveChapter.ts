import { useEffect, useState } from 'react'

/**
 * Scroll spy por IntersectionObserver — sem listener de scroll no main thread.
 * Retorna o id da seção mais visível.
 */
export function useActiveChapter(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }
        let best = ''
        let bestRatio = 0
        for (const id of ids) {
          const r = ratios.get(id) ?? 0
          if (r > bestRatio) {
            bestRatio = r
            best = id
          }
        }
        if (best) setActive(best)
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.9], rootMargin: '-20% 0px -35% 0px' },
    )

    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => n !== null)
    nodes.forEach((n) => observer.observe(n))

    return () => observer.disconnect()
  }, [ids])

  return active
}
