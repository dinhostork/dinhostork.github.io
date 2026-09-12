import { ArrowUpRight, FileText } from 'lucide-react'
import { profile } from '../data/portfolio'

interface ResumeLinksProps {
  /** `inline` para o hero; `cards` para o fecho da página. */
  variant?: 'inline' | 'cards'
}

const VERSIONS = [
  {
    href: profile.resumeShort,
    label: 'Currículo resumido',
    hint: '1 página, para triagem',
  },
  {
    href: profile.resumeLong,
    label: 'Currículo completo',
    hint: '4 páginas, com arquitetura e projetos',
  },
] as const

/**
 * Duas versões do currículo, explícitas — sem modal e sem menu.
 * Abrem em nova aba: visualizar no navegador é melhor que forçar download,
 * e quem quiser salvar usa o próprio visualizador.
 */
export function ResumeLinks({ variant = 'inline' }: ResumeLinksProps) {
  if (variant === 'cards') {
    return (
      <ul className="grid gap-px sm:grid-cols-2">
        {VERSIONS.map((v) => (
          <li key={v.href} className="-m-px">
            <a
              href={v.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hairline bg-surface/50 hover:border-signal/40 hover:bg-surface-2 group flex h-full cursor-pointer items-start gap-3 p-5 transition-colors duration-200"
            >
              <FileText className="text-signal mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <span>
                <span className="flex items-center gap-1.5 text-sm font-medium">
                  {v.label}
                  <ArrowUpRight
                    className="text-dim size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-dim mt-1 block text-xs">{v.hint}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      {VERSIONS.map((v) => (
        <a
          key={v.href}
          href={v.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-chip border-line-strong text-text hover:border-signal hover:text-signal group inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 border px-5 py-3 text-sm font-medium transition-all duration-150 hover:-translate-y-0.5"
        >
          <FileText className="size-4" aria-hidden="true" />
          {v.label}
          <span className="sr-only"> — {v.hint}</span>
        </a>
      ))}
    </>
  )
}
