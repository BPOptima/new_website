interface ToggleProps {
  options: { label: string; value: string }[]
  value: string
  onChange: (v: string) => void
  className?: string
}

export function Toggle({ options, value, onChange, className = '' }: ToggleProps) {
  const activeIndex = options.findIndex(o => o.value === value)
  const width = 100 / options.length

  return (
    <div
      className={`relative inline-flex rounded-lg border border-border overflow-hidden bg-muted ${className}`}
      style={{ padding: '3px' }}
    >
      {/* Sliding pill */}
      <div
        className="absolute top-[3px] bottom-[3px] rounded-md bg-primary transition-all duration-250"
        style={{
          width: `calc(${width}% - 3px)`,
          left: `calc(${activeIndex * width}% + 3px)`,
          transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
        }}
      />
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`relative z-10 flex-1 px-4 py-1.5 text-xs font-medium transition-colors duration-200 whitespace-nowrap ${
            value === opt.value ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
