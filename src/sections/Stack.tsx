import { skillGroups } from '../data/portfolio'
import { SectionHeader } from '../components/SectionHeader'
import { TechChip } from '../components/TechChip'
import { Reveal } from '../motion/Reveal'
import { Stagger, StaggerItem } from '../motion/Stagger'

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="container-page relative pt-6 pb-24 md:pt-8 md:pb-32">
      <SectionHeader
        index="02"
        eyebrow="Stack"
        title="Tecnologias e áreas de atuação"
        lead="Agrupadas por camada, do código que escrevo à infraestrutura que sustenta a aplicação em produção."
        headingId="stack-title"
      />

      <div className="grid gap-px md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <Reveal
            key={group.id}
            delay={index * 0.06}
            className="bg-surface/60 hairline hover:border-line-strong -m-px flex flex-col p-6 transition-colors duration-200 md:p-8"
          >
            <p className="eyebrow flex items-center gap-2">
              <span className="text-signal tnum">{String(index + 1).padStart(2, '0')}</span>
              {group.caption}
            </p>
            <h3 className="mt-3 text-[clamp(1.25rem,2.5vw,1.5rem)] font-semibold tracking-[-0.02em]">
              {group.title}
            </h3>

            <Stagger as="ul" className="mt-6 flex flex-wrap gap-2">
              {group.primary.map((skill) => (
                <StaggerItem as="li" key={skill}>
                  <TechChip label={skill} />
                </StaggerItem>
              ))}
            </Stagger>

            {group.secondary.length > 0 ? (
              <div className="border-line mt-6 border-t pt-5">
                <p className="text-dim font-mono mb-3 text-[0.6875rem] tracking-wider uppercase">
                  Também trabalho com
                </p>
                <ul className="flex flex-wrap gap-2">
                  {group.secondary.map((skill) => (
                    <li key={skill}>
                      <TechChip label={skill} tone="secondary" />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </Reveal>
        ))}
      </div>
    </section>
  )
}
