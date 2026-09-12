/**
 * Camadas de profundidade fixas atrás de todo o conteúdo — MASTER.md §6.
 * z-0 grid técnico · z-10 iluminação radial. Ambas puramente decorativas.
 */
export function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="tech-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(120%_90%_at_50%_0%,black,transparent_75%)]" />
      <div className="absolute -top-1/4 left-1/2 h-[70vh] w-[110vw] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(52,211,153,0.09),transparent)]" />
      <div className="absolute top-1/2 -right-1/4 h-[60vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,rgba(52,211,153,0.045),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-[linear-gradient(to_top,#07090c,transparent)]" />
    </div>
  )
}
