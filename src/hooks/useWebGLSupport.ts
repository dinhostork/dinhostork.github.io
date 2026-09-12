import { useMemo } from 'react'

let cached: boolean | null = null

/** Probe de WebGL feito no máximo uma vez por sessão; o contexto é descartado logo em seguida. */
function detectWebGL(): boolean {
  if (cached !== null) return cached

  // Dispositivos com poucos núcleos tendem a engasgar com WebGL contínuo.
  if ((navigator.hardwareConcurrency ?? 4) <= 4) {
    cached = false
    return cached
  }

  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    cached = gl !== null
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    cached = false
  }

  return cached
}

/**
 * Degradação graciosa do 3D — MASTER.md §8.
 * O canvas só monta quando o dispositivo aguenta e o usuário não pediu menos motion.
 */
export function useWebGLSupport(enabled: boolean): boolean {
  return useMemo(() => (enabled ? detectWebGL() : false), [enabled])
}
