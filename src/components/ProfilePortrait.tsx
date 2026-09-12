import { profile } from '../data/portfolio'

/** Nós que orbitam o retrato, posicionados sobre o anel de raio 78. */
const NODES = [
  { angle: -90, r: 3.2 },
  { angle: 18, r: 2.2 },
  { angle: 132, r: 2.6 },
  { angle: 205, r: 1.8 },
]

function polar(angle: number, radius: number) {
  const rad = (angle * Math.PI) / 180
  return { x: 100 + Math.cos(rad) * radius, y: 100 + Math.sin(rad) * radius }
}

/**
 * Retrato com sistema orbital em torno — MASTER.md §6 e §7.
 * A foto é recortada em círculo: o fundo azul original sai de cena e os anéis
 * verdes assumem a moldura, mantendo a peça dentro da paleta do site.
 * Toda a animação é transform/opacity e congela sob prefers-reduced-motion.
 */
export function ProfilePortrait() {
  return (
    <div className="relative aspect-square">
      {/* Brilho de base, atrás de tudo */}
      <div
        className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,rgba(52,211,153,0.14),transparent)]"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 size-full"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="none" stroke="var(--color-signal)">
          {/* Anel externo pontilhado, giro horário lento */}
          <circle
            className="orbit orbit-cw"
            cx="100"
            cy="100"
            r="94"
            strokeWidth="0.6"
            strokeDasharray="1.5 7"
            opacity="0.45"
          />
          {/* Anel intermediário tracejado, giro anti-horário */}
          <circle
            className="orbit orbit-ccw"
            cx="100"
            cy="100"
            r="86"
            strokeWidth="0.8"
            strokeDasharray="18 12"
            opacity="0.3"
          />
          {/* Arco parcial: o gesto de "varredura" do sistema */}
          <path
            className="orbit orbit-cw"
            d="M 100 22 A 78 78 0 0 1 172 74"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            className="orbit orbit-ccw"
            d="M 100 178 A 78 78 0 0 1 30 130"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.4"
          />
        </g>

        {/* Nós trafegando na órbita */}
        <g className="orbit orbit-nodes" fill="var(--color-signal)">
          {NODES.map((node) => {
            const { x, y } = polar(node.angle, 78)
            return <circle key={node.angle} cx={x} cy={y} r={node.r} />
          })}
        </g>

        {/* Marcadores técnicos fixos, estáticos como referência de enquadramento */}
        <g stroke="var(--color-signal)" strokeWidth="1" opacity="0.5" fill="none">
          <path d="M 8 26 L 8 8 L 26 8" />
          <path d="M 174 8 L 192 8 L 192 26" />
          <path d="M 192 174 L 192 192 L 174 192" />
          <path d="M 26 192 L 8 192 L 8 174" />
        </g>
        <circle
          className="orbit-pulse"
          cx="192"
          cy="100"
          r="2"
          fill="var(--color-signal)"
        />
      </svg>

      {/* A foto, recortada em círculo dentro do sistema de anéis */}
      <picture>
        <source srcSet="/images/perfil.webp" type="image/webp" />
        <img
          src="/images/perfil.jpg"
          alt={profile.photoAlt}
          width={800}
          height={800}
          loading="lazy"
          decoding="async"
          className="ring-signal/20 absolute inset-[13%] size-[74%] rounded-full object-cover ring-1"
        />
      </picture>
    </div>
  )
}
