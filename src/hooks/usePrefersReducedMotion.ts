import { useMediaQuery } from './useMediaQuery'

/** Fonte única para a decisão de motion. MASTER.md §7. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
