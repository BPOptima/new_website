import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/TextReveal'

gsap.registerPlugin(ScrollTrigger)

export default function Founder() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = infoRef.current?.querySelectorAll('.info-item')
      if (items) {
        gsap.from(items, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
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
        <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-6">Leadership</p>
        <TextReveal
          as="h2"
          className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold tracking-[-0.02em] leading-[1.05] mb-8"
        >
          {"Built by operators,\nnot researchers"}
        </TextReveal>
        <p className="text-xl text-text-secondary font-light leading-relaxed max-w-2xl mb-16">
          BPOptima was founded by enterprise operators who spent years watching regulated businesses lose millions to manual decision-making. We built the infrastructure we wished existed.
        </p>

        <div ref={infoRef} className="max-w-xl space-y-6">
          <div className="info-item">
            <div className="text-[22px] font-semibold text-text mb-1">DJ</div>
            <div className="text-[14px] text-text-secondary">Founder & CEO</div>
          </div>
          <div className="info-item">
            <div className="text-[14px] text-text-muted leading-relaxed">
              Previously: Enterprise automation across financial services and insurance in Southeast Asia
            </div>
          </div>
          <div className="info-item">
            <div className="text-[14px] text-text-muted leading-relaxed">
              Based in Singapore. Backed by Antler.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
