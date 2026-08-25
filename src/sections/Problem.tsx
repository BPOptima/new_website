import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/TextReveal'

gsap.registerPlugin(ScrollTrigger)

const painPoints = [
  'Rules change faster than teams can update them. Compliance gaps widen silently.',
  'Every analyst interprets documents differently. Consistency is impossible at volume.',
  "Generic AI sends your data to someone else's servers. Regulators notice.",
]

export default function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pointsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = pointsRef.current?.querySelectorAll('.pain-point')
      if (items) {
        gsap.from(items, {
          opacity: 0,
          x: -40,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: pointsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-44 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-8">
        <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-6">The Problem</p>
        <TextReveal
          as="h2"
          className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold tracking-[-0.02em] leading-[1.05] mb-16"
        >
          {"Manual decisions\ndon't scale"}
        </TextReveal>

        <div ref={pointsRef} className="max-w-3xl space-y-8">
          {painPoints.map((point, i) => (
            <p key={i} className="pain-point text-lg md:text-xl text-text-secondary font-light leading-relaxed">
              {point}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
