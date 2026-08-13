import { useInView } from '../hooks/useInView'

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'none'
  distance?: number
}

export function Reveal({ children, className = '', delay = 0, direction = 'up', distance = 20 }: RevealProps) {
  const { ref, inView } = useInView()
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? 'none'
          : direction === 'up'
          ? `translateY(${distance}px)`
          : direction === 'left'
          ? `translateX(-${distance}px)`
          : 'none',
        transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

interface StaggerProps {
  children: React.ReactNode[]
  className?: string
  itemClassName?: string
  baseDelay?: number
  stagger?: number
  direction?: 'up' | 'left' | 'none'
}

export function Stagger({ children, className = '', itemClassName = '', baseDelay = 0, stagger = 80, direction = 'up' }: StaggerProps) {
  const { ref, inView } = useInView()
  const distance = 20
  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          className={itemClassName}
          style={{
            opacity: inView ? 1 : 0,
            transform: inView
              ? 'none'
              : direction === 'up'
              ? `translateY(${distance}px)`
              : direction === 'left'
              ? `translateX(-${distance}px)`
              : 'none',
            transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * stagger}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * stagger}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}
