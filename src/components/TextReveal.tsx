import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  scrub?: boolean
}

export default function TextReveal({ children, as: Tag = 'h2', className = '', delay = 0, scrub = false }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const lines = container.querySelectorAll('.line-inner')

    const ctx = gsap.context(() => {
      gsap.from(lines, {
        yPercent: 100,
        duration: scrub ? undefined : 1.1,
        stagger: 0.08,
        delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          ...(scrub ? { scrub: 1, end: 'top 40%' } : { toggleActions: 'play none none none' }),
        },
      })
    }, container)

    return () => ctx.revert()
  }, [delay, scrub])

  const words = children.split('\n').filter(Boolean)

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {words.map((line, i) => (
          <span key={i} className="block overflow-hidden">
            <span className="line-inner block">{line}</span>
          </span>
        ))}
      </Tag>
    </div>
  )
}

interface WordRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
}

export function WordReveal({ children, as: Tag = 'p', className = '', delay = 0 }: WordRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const words = container.querySelectorAll('.word')

    const ctx = gsap.context(() => {
      gsap.from(words, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.03,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, container)

    return () => ctx.revert()
  }, [delay])

  return (
    <div ref={containerRef}>
      <Tag className={className}>
        {children.split(' ').map((word, i) => (
          <span key={i} className="word inline-block mr-[0.3em]">{word}</span>
        ))}
      </Tag>
    </div>
  )
}
