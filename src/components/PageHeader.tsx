interface PageHeaderProps {
  eyebrow: string
  heading: React.ReactNode
  description: string
  className?: string
  children?: React.ReactNode
}

export default function PageHeader({ eyebrow, heading, description, className = '', children }: PageHeaderProps) {
  return (
    <section className={`border-b border-border ${className}`}>
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="hero-eyebrow">
          <p className="text-[11px] font-mono-data text-accent uppercase tracking-widest mb-4">{eyebrow}</p>
        </div>
        <h1 className="hero-h1 text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-5 max-w-3xl leading-tight">
          {heading}
        </h1>
        <p className="hero-sub text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {description}
        </p>
        {children && <div className="mt-5">{children}</div>}
      </div>
    </section>
  )
}
