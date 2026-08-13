interface SectionCTAProps {
  heading: string
  sub: string
  cta: string
  onClick: () => void
  className?: string
}

export default function SectionCTA({ heading, sub, cta, onClick, className = '' }: SectionCTAProps) {
  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl border border-border bg-card card-interactive ${className}`}
      style={{ cursor: 'default' }}
    >
      <div>
        <div className="text-lg font-semibold text-foreground mb-1">{heading}</div>
        <div className="text-sm text-muted-foreground">{sub}</div>
      </div>
      <button onClick={onClick} className="btn btn-primary flex-shrink-0">{cta}</button>
    </div>
  )
}
