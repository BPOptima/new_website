import { useRef, useState } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  strength?: number
  variant?: 'primary' | 'ghost'
  target?: string
  rel?: string
}

export default function MagneticButton({ children, className = '', href, strength = 0.3, variant = 'primary', target, rel }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [transform, setTransform] = useState('translate(0px, 0px) scale(1)')
  const [shine, setShine] = useState(-100)

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    setTransform(`translate(${x}px, ${y}px) scale(1.02)`)
    setShine(((e.clientX - rect.left) / rect.width) * 100)
  }

  const handleLeave = () => {
    setTransform('translate(0px, 0px) scale(1)')
    setShine(-100)
  }

  const baseStyles = variant === 'primary'
    ? 'bg-white text-black'
    : 'border border-white/15 text-text'

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={`relative overflow-hidden rounded-full px-8 py-3.5 text-[14px] font-medium tracking-wide inline-flex items-center justify-center gap-3 ${baseStyles} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
      }}
    >
      <span className="relative z-10 flex items-center gap-3">{children}</span>

      {/* Shine sweep */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: variant === 'primary'
            ? `linear-gradient(105deg, transparent ${shine - 20}%, rgba(0,200,180,0.15) ${shine}%, transparent ${shine + 20}%)`
            : `linear-gradient(105deg, transparent ${shine - 20}%, rgba(255,255,255,0.06) ${shine}%, transparent ${shine + 20}%)`,
          transition: 'background 0.15s ease',
        }}
      />

      {/* Hover border glow for ghost variant */}
      {variant === 'ghost' && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            boxShadow: shine > -50 ? '0 0 20px rgba(0,200,180,0.1), inset 0 0 20px rgba(0,200,180,0.03)' : 'none',
            opacity: shine > -50 ? 1 : 0,
          }}
        />
      )}
    </a>
  )
}
