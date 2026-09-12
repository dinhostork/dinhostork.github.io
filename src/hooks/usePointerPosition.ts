import { useEffect, useRef } from 'react'

export interface PointerRef {
  x: number
  y: number
}

/**
 * Posição normalizada do cursor (-1..1) num ref, sem causar re-render.
 * Consumida pelo loop do R3F.
 */
export function usePointerPosition(enabled: boolean) {
  const pointer = useRef<PointerRef>({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) return

    let frame = 0
    const onMove = (event: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
        pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1)
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [enabled])

  return pointer
}
