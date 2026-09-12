import { useMemo } from 'react'
import { buildNetwork } from './network'

/**
 * Fallback estático do 3D — mesma linguagem visual, zero WebGL.
 * Usado sob reduced-motion, em mobile e quando não há WebGL disponível.
 * Projeção ortográfica simples da mesma malha procedural.
 */
export function StaticNetwork({ className }: { className?: string }) {
  const { points, lines } = useMemo(() => {
    const { nodes, edges } = buildNetwork(44, 2)
    const project = (v: { x: number; y: number; z: number }) => {
      const depth = (v.z + 1.2) / 2.4
      return {
        x: 50 + v.x * 30,
        y: 50 - v.y * 30,
        o: 0.25 + depth * 0.75,
        r: 0.5 + depth * 0.9,
      }
    }
    return {
      points: nodes.map(project),
      lines: edges.map(([a, b]) => ({ a: project(nodes[a]), b: project(nodes[b]) })),
    }
  }, [])

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      <g stroke="#2f4f47" strokeWidth="0.12">
        {lines.map((line, i) => (
          <line
            key={i}
            x1={line.a.x}
            y1={line.a.y}
            x2={line.b.x}
            y2={line.b.y}
            opacity={Math.min(line.a.o, line.b.o) * 0.7}
          />
        ))}
      </g>
      <g fill="#34d399">
        {points.map((point, i) => (
          <circle key={i} cx={point.x} cy={point.y} r={point.r * 0.5} opacity={point.o} />
        ))}
      </g>
    </svg>
  )
}
