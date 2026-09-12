/**
 * Geração procedural da malha de nós.
 * Deliberadamente sem dependência de Three.js: este módulo também alimenta o
 * fallback estático em SVG, que precisa ficar fora do bundle do WebGL.
 */

export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface NetworkData {
  nodes: Vec3[]
  /** Pares de índices de nós que formam uma aresta. */
  edges: [number, number][]
  /** Posições achatadas das arestas, prontas para um BufferGeometry único. */
  edgePositions: Float32Array
}

/** PRNG determinístico — a cena é idêntica em todo carregamento. */
function makeRandom(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

function distanceSquared(a: Vec3, b: Vec3): number {
  const dx = a.x - b.x
  const dy = a.y - b.y
  const dz = a.z - b.z
  return dx * dx + dy * dy + dz * dz
}

/**
 * Nós distribuídos sobre uma esfera (espiral de Fibonacci), ligados por arestas
 * de vizinhança. A metáfora é literal: nós de um sistema distribuído.
 */
export function buildNetwork(count: number, neighbors = 2, seed = 20240917): NetworkData {
  const random = makeRandom(seed)
  const golden = Math.PI * (3 - Math.sqrt(5))
  const nodes: Vec3[] = []

  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2
    const ring = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    // Raio levemente irregular tira a leitura de "bola perfeita".
    const radius = 1 + (random() - 0.5) * 0.18
    nodes.push({
      x: Math.cos(theta) * ring * radius,
      y: y * radius,
      z: Math.sin(theta) * ring * radius,
    })
  }

  const seen = new Set<string>()
  const edges: [number, number][] = []

  for (let i = 0; i < count; i += 1) {
    const nearest = nodes
      .map((node, j) => ({ j, d: distanceSquared(node, nodes[i]) }))
      .filter((entry) => entry.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, neighbors)

    for (const { j } of nearest) {
      const key = i < j ? `${i}:${j}` : `${j}:${i}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push([i, j])
    }
  }

  const edgePositions = new Float32Array(edges.length * 6)
  edges.forEach(([a, b], index) => {
    edgePositions.set([nodes[a].x, nodes[a].y, nodes[a].z], index * 6)
    edgePositions.set([nodes[b].x, nodes[b].y, nodes[b].z], index * 6 + 3)
  })

  return { nodes, edges, edgePositions }
}

export interface Packet {
  edge: number
  t: number
  speed: number
}

/** Pacotes trafegando pelas arestas — o "tráfego" do sistema. */
export function buildPackets(edgeCount: number, amount: number, seed = 77): Packet[] {
  const random = makeRandom(seed)
  return Array.from({ length: amount }, () => ({
    edge: Math.floor(random() * edgeCount),
    t: random(),
    speed: 0.12 + random() * 0.22,
  }))
}
