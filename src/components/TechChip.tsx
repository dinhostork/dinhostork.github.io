interface TechChipProps {
  label: string
  tone?: 'primary' | 'secondary'
}

/**
 * Tecnologia sempre como texto real e indexável — nunca apenas ícone.
 * MASTER.md §10 / §12.
 */
export function TechChip({ label, tone = 'primary' }: TechChipProps) {
  const styles =
    tone === 'primary'
      ? 'border-line-strong bg-surface-2 text-text'
      : 'border-line bg-transparent text-muted'

  return (
    <span
      className={`font-mono rounded-chip inline-flex items-center border px-2.5 py-1 text-[0.8125rem] leading-tight transition-colors duration-150 hover:border-signal/50 hover:text-signal ${styles}`}
    >
      {label}
    </span>
  )
}
