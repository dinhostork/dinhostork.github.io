import type { ReactNode } from 'react'

interface ButtonLinkProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  external?: boolean
  download?: boolean
  className?: string
}

/** Alvo de toque ≥ 44px e foco visível — MASTER.md §11. */
export function ButtonLink({
  href,
  children,
  variant = 'primary',
  external,
  download,
  className = '',
}: ButtonLinkProps) {
  const base =
    'group inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-chip px-5 py-3 text-sm font-medium transition-all duration-150'
  const styles =
    variant === 'primary'
      ? 'bg-signal text-on-signal hover:bg-signal/90 hover:-translate-y-0.5'
      : 'border border-line-strong text-text hover:border-signal hover:text-signal hover:-translate-y-0.5'

  return (
    <a
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(download ? { download: '' } : {})}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {children}
    </a>
  )
}
