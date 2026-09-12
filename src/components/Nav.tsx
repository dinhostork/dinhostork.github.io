import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { chapters } from '../data/portfolio'
import { useActiveChapter } from '../hooks/useActiveChapter'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const ids = chapters.map((chapter) => chapter.id)

export function Nav() {
  const active = useActiveChapter(ids)
  const [open, setOpen] = useState(false)
  const reduced = usePrefersReducedMotion()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Trava o scroll e devolve o foco ao gatilho quando o painel fecha.
  useEffect(() => {
    if (!open) return
    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
      trigger?.focus()
    }
  }, [open])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4 md:pt-6">
        <nav
          aria-label="Navegação principal"
          className="glass flex w-full max-w-3xl items-center justify-between gap-2 rounded-full py-2 pr-2 pl-4 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.65)]"
        >
          <a
            href="#inicio"
            className="font-display rounded-chip flex min-h-11 shrink-0 cursor-pointer items-center px-1 text-sm font-semibold tracking-tight"
          >
            Dinho<span className="text-signal">.</span>
          </a>

          {/* Desktop: capítulos inline com indicador de seção ativa */}
          {/* O capítulo 05 aparece como CTA à direita, não se repete aqui. */}
          <ul className="hidden items-center gap-1 md:flex">
            {chapters.slice(0, -1).map((chapter) => {
              const isActive = active === chapter.id
              return (
                <li key={chapter.id}>
                  <a
                    href={`#${chapter.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-sm transition-colors duration-150 ${
                      isActive ? 'text-text' : 'text-dim hover:text-muted'
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="bg-surface-2 absolute inset-0 rounded-full"
                        transition={
                          reduced
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 350, damping: 32 }
                        }
                      />
                    ) : null}
                    <span className="font-mono tnum relative text-[0.6875rem] opacity-60">
                      {chapter.index}
                    </span>
                    <span className="relative">{chapter.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>

          <a
            href="#contato"
            aria-current={active === 'contato' ? 'true' : undefined}
            className="bg-signal text-on-signal hidden min-h-9 shrink-0 cursor-pointer items-center rounded-full px-4 text-sm font-medium transition-opacity duration-150 hover:opacity-90 md:inline-flex"
          >
            Contato
          </a>

          {/* Mobile: abre o índice de capítulos em tela cheia */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="chapter-index"
            className="border-line text-text flex size-11 cursor-pointer items-center justify-center rounded-full border md:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
            <span className="sr-only">Abrir índice de capítulos</span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="chapter-index"
            role="dialog"
            aria-modal="true"
            aria-label="Índice de capítulos"
            className="bg-bg/97 fixed inset-0 z-50 flex flex-col backdrop-blur-xl md:hidden"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            <div className="flex items-center justify-between px-5 pt-6">
              <p className="eyebrow">Índice</p>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                className="border-line text-text flex size-11 cursor-pointer items-center justify-center rounded-full border"
              >
                <X className="size-5" aria-hidden="true" />
                <span className="sr-only">Fechar índice</span>
              </button>
            </div>

            <ul className="flex flex-1 flex-col justify-center gap-1 px-5 pb-16">
              {chapters.map((chapter, i) => (
                <motion.li
                  key={chapter.id}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.04 * i, duration: 0.3 }}
                >
                  <a
                    href={`#${chapter.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === chapter.id ? 'true' : undefined}
                    className="border-line flex min-h-16 cursor-pointer items-baseline gap-4 border-b py-4"
                  >
                    <span
                      className={`font-mono tnum text-xs ${
                        active === chapter.id ? 'text-signal' : 'text-dim'
                      }`}
                    >
                      {chapter.index}
                    </span>
                    <span className="font-display text-2xl font-semibold tracking-tight">
                      {chapter.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
