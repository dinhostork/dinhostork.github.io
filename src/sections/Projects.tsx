import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Trophy } from 'lucide-react'
import { categoryLabels, projects } from '../data/portfolio'
import type { Category } from '../data/portfolio'
import { SectionHeader } from '../components/SectionHeader'
import { ProjectCover } from '../components/ProjectCover'
import { TechChip } from '../components/TechChip'
import { Reveal } from '../motion/Reveal'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const filters: (Category | 'todos')[] = ['todos', 'web', 'mobile', 'prototipo']

export function Projects() {
  const [filter, setFilter] = useState<Category | 'todos'>('todos')
  const reduced = usePrefersReducedMotion()

  const visible = useMemo(
    () =>
      filter === 'todos'
        ? projects
        : projects.filter((project) => project.categories.includes(filter)),
    [filter],
  )

  return (
    <section
      id="projetos"
      aria-labelledby="projetos-title"
      className="container-page relative pt-6 pb-24 md:pt-8 md:pb-32"
    >
      <SectionHeader
        index="04"
        eyebrow="Projetos"
        title="Trabalhos e cases"
        lead="Plataformas em produção, sistemas acadêmicos e projetos de engenharia de software."
        headingId="projetos-title"
      />

      <div className="border-line mb-14 flex flex-wrap gap-2 border-b pb-6" role="group" aria-label="Filtrar projetos por categoria">
        {filters.map((key) => {
          const isActive = filter === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={isActive}
              className={`rounded-chip min-h-11 cursor-pointer border px-4 text-sm transition-colors duration-150 ${
                isActive
                  ? 'border-signal bg-signal-dim text-signal'
                  : 'border-line text-dim hover:border-line-strong hover:text-muted'
              }`}
            >
              {categoryLabels[key]}
            </button>
          )
        })}
      </div>

      <div aria-live="polite" className="sr-only">
        {visible.length} projeto{visible.length === 1 ? '' : 's'} em exibição
      </div>

      <ol className="space-y-20 md:space-y-28">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => (
            <motion.li
              key={project.id}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
              transition={{ duration: reduced ? 0 : 0.35 }}
            >
              <article
                className={`group grid items-center gap-8 md:gap-12 lg:grid-cols-2 ${
                  index % 2 === 1 ? 'lg:[&>figure]:order-2' : ''
                }`}
              >
                <figure className="m-0">
                  <ProjectCover
                    src={project.cover}
                    alt={project.coverAlt}
                    priority={index === 0}
                  />
                </figure>

                <div>
                  <p className="eyebrow flex items-center gap-3">
                    <span className="text-signal tnum">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="bg-line h-px w-6" aria-hidden="true" />
                    {project.kicker}
                  </p>

                  <h3 className="mt-4 text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold tracking-[-0.03em]">
                    {project.name}
                  </h3>

                  <p className="text-text measure mt-4 leading-relaxed">{project.summary}</p>

                  <div className="text-muted measure mt-4 space-y-3 text-sm leading-relaxed">
                    {project.body.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                    ))}
                  </div>

                  {project.award ? (
                    <p className="border-award/30 bg-award/5 rounded-card text-award mt-5 flex gap-3 border p-4 text-sm leading-relaxed">
                      <Trophy className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      <span>
                        <strong className="font-semibold">Premiado.</strong> {project.award}
                      </span>
                    </p>
                  ) : null}

                  {project.stack.length > 0 ? (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <li key={tech}>
                          <TechChip label={tech} tone="secondary" />
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                    {project.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-text hover:text-signal border-line-strong hover:border-signal inline-flex min-h-11 cursor-pointer items-center gap-1.5 border-b text-sm font-medium transition-colors duration-150"
                        >
                          {link.label}
                          <ArrowUpRight
                            className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                          <span className="sr-only"> — {project.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>

      {visible.length === 0 ? (
        <Reveal>
          <p className="text-muted py-16 text-center">Nenhum projeto nesta categoria.</p>
        </Reveal>
      ) : null}
    </section>
  )
}
