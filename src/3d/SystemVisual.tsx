import { Suspense, lazy } from 'react'
import { StaticNetwork } from './StaticNetwork'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { useWebGLSupport } from '../hooks/useWebGLSupport'

const HeroCanvas = lazy(() => import('./HeroCanvas'))

/**
 * Decide entre cena WebGL e fallback SVG — MASTER.md §8.
 * O fallback é sempre renderizado primeiro, então nunca há buraco visual
 * enquanto o chunk do Three.js carrega.
 */
export function SystemVisual() {
  const reduced = usePrefersReducedMotion()
  const wideEnough = useMediaQuery('(min-width: 768px)')
  const canRender3D = useWebGLSupport(!reduced && wideEnough)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <StaticNetwork
        className={`absolute inset-0 size-full transition-opacity duration-700 ${
          canRender3D ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {canRender3D ? (
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
      ) : null}
    </div>
  )
}
