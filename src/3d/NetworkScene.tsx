import { useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { buildNetwork, buildPackets } from './network'
import type { PointerRef } from '../hooks/usePointerPosition'

const SIGNAL = new THREE.Color('#34d399')
const EDGE = new THREE.Color('#2f4f47')

interface NetworkSceneProps {
  nodeCount: number
  pointer: React.RefObject<PointerRef>
  scroll: React.RefObject<number>
}

/**
 * Três draw calls no total: arestas (LineSegments), nós (InstancedMesh) e
 * pacotes (InstancedMesh). Sem luzes, sem texturas, sem modelo externo.
 */
export function NetworkScene({ nodeCount, pointer, scroll }: NetworkSceneProps) {
  const group = useRef<THREE.Group>(null)
  const nodeMesh = useRef<THREE.InstancedMesh>(null)
  const packetMesh = useRef<THREE.InstancedMesh>(null)

  const { nodes, edges, edgePositions } = useMemo(
    () => buildNetwork(nodeCount, 2),
    [nodeCount],
  )
  const packets = useMemo(
    () => buildPackets(edges.length, Math.min(18, Math.round(nodeCount / 3))),
    [edges.length, nodeCount],
  )

  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Matrizes dos nós são estáticas: escritas uma vez, nunca no loop.
  useLayoutEffect(() => {
    const mesh = nodeMesh.current
    if (!mesh) return
    nodes.forEach((node, i) => {
      dummy.position.set(node.x, node.y, node.z)
      dummy.scale.setScalar(0.016 + (i % 5 === 0 ? 0.01 : 0))
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })
    mesh.instanceMatrix.needsUpdate = true
  }, [nodes, dummy])

  useFrame((_state, delta) => {
    const g = group.current
    if (!g) return

    const step = Math.min(delta, 1 / 30)

    // Rotação base contínua + parallax suave do ponteiro + deriva no scroll.
    g.rotation.y += step * 0.08
    const targetX = pointer.current.y * 0.22 + scroll.current * 0.5
    const targetZ = pointer.current.x * 0.12
    g.rotation.x += (targetX - g.rotation.x) * 0.05
    g.rotation.z += (targetZ - g.rotation.z) * 0.05
    g.position.y = -scroll.current * 0.8

    const mesh = packetMesh.current
    if (mesh) {
      packets.forEach((packet, i) => {
        packet.t += step * packet.speed
        if (packet.t > 1) packet.t -= 1
        const [a, b] = edges[packet.edge]
        const from = nodes[a]
        const to = nodes[b]
        dummy.position.set(
          from.x + (to.x - from.x) * packet.t,
          from.y + (to.y - from.y) * packet.t,
          from.z + (to.z - from.z) * packet.t,
        )
        dummy.scale.setScalar(0.011)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      })
      mesh.instanceMatrix.needsUpdate = true
    }
  })

  return (
    <group ref={group} scale={1.05}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[edgePositions, 3]}
            count={edgePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={EDGE} transparent opacity={0.55} />
      </lineSegments>

      <instancedMesh
        ref={nodeMesh}
        args={[undefined, undefined, nodes.length]}
        frustumCulled={false}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={SIGNAL} transparent opacity={0.85} />
      </instancedMesh>

      <instancedMesh
        ref={packetMesh}
        args={[undefined, undefined, packets.length]}
        frustumCulled={false}
      >
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color={SIGNAL} />
      </instancedMesh>
    </group>
  )
}
