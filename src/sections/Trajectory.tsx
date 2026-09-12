import { ArrowUpRight, GraduationCap, Trophy } from 'lucide-react'
import { awards, timeline } from '../data/portfolio'
import { SectionHeader } from '../components/SectionHeader'
import { TimelineSpine } from '../components/TimelineSpine'
import { TechChip } from '../components/TechChip'
import { Reveal } from '../motion/Reveal'

const work = timeline.filter((entry) => entry.kind === 'work')
const education = timeline.filter((entry) => entry.kind === 'education')

export function Trajectory() {
  return (
    <section
      id="trajetoria"
      aria-labelledby="trajetoria-title"
      className="container-page relative pt-6 pb-24 md:pt-8 md:pb-32"
    >
      <SectionHeader
        index="03"
        eyebrow="Trajetória"
        title="Experiência e formação"
        lead="Comecei em eletrotécnica, segui para engenharia de computação e hoje trabalho com sistemas distribuídos."
        headingId="trajetoria-title"
      />

      <h3 className="eyebrow mb-8">Experiência profissional</h3>

      <TimelineSpine>
        <ol className="space-y-12 md:space-y-14">
          {work.map((entry, index) => (
            <li key={`${entry.org}-${entry.role}`}>
              <Reveal delay={Math.min(index, 3) * 0.04}>
                <article className="relative pl-8 md:grid md:grid-cols-[7.5rem_1fr] md:gap-8 md:pl-0">
                  {/* Nó preenchido = experiência (forma difere da formação) */}
                  <span
                    className="border-bg bg-signal absolute top-1.5 left-0 size-[15px] rounded-full border-4 md:left-[7.5rem]"
                    aria-hidden="true"
                  />
                  <p className="text-dim font-mono tnum mb-2 text-xs tracking-wider md:mb-0 md:text-right">
                    {entry.period}
                  </p>

                  <div className="md:pl-8">
                    <h4 className="text-[clamp(1.15rem,2.4vw,1.5rem)] font-semibold tracking-[-0.02em]">
                      {entry.role}
                    </h4>
                    <p className="text-signal font-mono mt-1 text-sm">{entry.org}</p>

                    {entry.summary ? (
                      <p className="text-muted measure mt-4 text-sm leading-relaxed">
                        {entry.summary}
                      </p>
                    ) : null}

                    {entry.highlights ? (
                      <ul className="text-muted measure mt-4 space-y-2 text-sm leading-relaxed">
                        {entry.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-3">
                            <span
                              className="bg-line-strong mt-2.5 h-px w-3 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {entry.stack ? (
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {entry.stack.map((tech) => (
                          <li key={tech}>
                            <TechChip label={tech} tone="secondary" />
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {entry.link ? (
                      <a
                        href={entry.link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-dim hover:text-signal mt-4 inline-flex min-h-11 cursor-pointer items-center gap-1.5 font-mono text-xs transition-colors duration-150"
                      >
                        {entry.link.label}
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    ) : null}
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </TimelineSpine>

      <h3 className="eyebrow mt-20 mb-8 md:mt-24">Reconhecimentos</h3>

      {/*
        Terceira linguagem visual da seção: troféu + régua âmbar à esquerda.
        Experiência usa nó preenchido na espinha, formação usa card com ícone de
        capelo — a distinção nunca depende só da cor.
      */}
      <ol className="grid gap-px sm:grid-cols-2">
        {awards.map((award, index) => (
          <Reveal
            as="li"
            key={`${award.year}-${award.title}`}
            delay={Math.min(index, 3) * 0.05}
            className="bg-surface/60 border-line hover:border-award/40 border-l-award/60 hover:border-l-award -m-px border border-l-2 p-6 transition-colors duration-200"
          >
            <div className="flex items-start gap-3">
              <Trophy className="text-award mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-award font-mono tnum text-xs tracking-wider">
                  {award.year}
                </p>
                <h4 className="mt-1.5 text-base leading-snug font-semibold tracking-tight">
                  {award.title}
                </h4>
                <p className="text-muted mt-1.5 text-sm leading-relaxed">{award.org}</p>
                {award.context ? (
                  <p className="text-dim font-mono mt-2 text-xs">Projeto: {award.context}</p>
                ) : null}
              </div>
            </div>
          </Reveal>
        ))}
      </ol>

      <h3 className="eyebrow mt-20 mb-8 md:mt-24">Formação acadêmica</h3>

      <ul className="grid gap-px md:grid-cols-3">
        {education.map((entry, index) => (
          <Reveal
            as="li"
            key={entry.role}
            delay={index * 0.06}
            className="bg-surface/60 hairline hover:border-signal/40 -m-px p-6 transition-colors duration-200"
          >
            {/* Ícone + contorno = formação. Diferenciação não depende de cor. */}
            <GraduationCap className="text-dim size-5" aria-hidden="true" />
            <p className="text-dim font-mono mt-4 text-[0.6875rem] tracking-wider uppercase">
              {entry.period}
            </p>
            <h4 className="mt-2 text-base font-semibold tracking-tight">{entry.role}</h4>
            <p className="text-muted mt-2 text-sm leading-relaxed">{entry.org}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
