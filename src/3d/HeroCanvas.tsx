import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { NetworkScene } from './NetworkScene'
import { usePointerPosition } from '../hooks/usePointerPosition'
import { useMediaQuery } from '../hooks/useMediaQuery'

/**
 * Wrapper do canvas — MASTER.md §8.
 * Carregado por React.lazy, portanto fora do bundle inicial.
 * O loop de render para quando a cena sai da viewport ou a aba perde foco.
 */
export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scroll = useRef(0)
  const [running, setRunning] = useState(true)
  const finePointer = useMediaQuery('(pointer: fine)')
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const pointer = usePointerPosition(finePointer)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting && !document.hidden),
      { threshold: 0 },
    )
    observer.observe(node)

    const onVisibility = () => setRunning(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        scroll.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={running ? 'always' : 'never'}
        dpr={isDesktop ? [1, 1.75] : [1, 1.5]}
        camera={{ position: [0, 0, 4.6], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <NetworkScene nodeCount={isDesktop ? 56 : 30} pointer={pointer} scroll={scroll} />
      </Canvas>
    </div>
  )
}
