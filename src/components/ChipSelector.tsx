interface ChipSelectorProps {
  options: string[]
  value: string
  onChange: (v: string) => void
  multi?: boolean
}

export default function ChipSelector({ options, value, onChange, multi = false }: ChipSelectorProps) {
  const selected = multi ? value.split(',').filter(Boolean) : [value]

  const toggle = (opt: string) => {
    if (multi) {
      const arr = selected.includes(opt) ? selected.filter(v => v !== opt) : [...selected, opt]
      onChange(arr.join(','))
    } else {
      onChange(selected[0] === opt ? '' : opt)
    }
  }

  const isActive = (opt: string) => selected.includes(opt)

  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          style={{
            padding: '6px 14px',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            border: `1px solid ${isActive(opt) ? 'var(--primary)' : 'var(--border)'}`,
            background: isActive(opt) ? 'color-mix(in srgb, var(--primary) 8%, transparent)' : 'transparent',
            color: isActive(opt) ? 'var(--primary)' : 'var(--muted-foreground)',
            transition: 'all 0.15s ease',
            transform: isActive(opt) ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}
