import { Reveal } from '../motion/Reveal'

interface SectionHeaderProps {
  index: string
  eyebrow: string
  title: string
  lead?: string
  headingId: string
}

/** Cabeçalho de capítulo — MASTER.md §10. */
export function SectionHeader({ index, eyebrow, title, lead, headingId }: SectionHeaderProps) {
  return (
    <header className="mb-12 md:mb-16">
      <Reveal>
        <p className="eyebrow flex items-center gap-3">
          <span className="text-signal tnum">{index}</span>
          <span className="bg-line h-px w-8" aria-hidden="true" />
          <span>{eyebrow}</span>
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          id={headingId}
          className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-semibold tracking-[-0.03em]"
        >
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.1}>
          <p className="text-muted measure mt-5 text-[clamp(1.05rem,2vw,1.25rem)] leading-relaxed">
            {lead}
          </p>
        </Reveal>
      ) : null}
    </header>
  )
}
