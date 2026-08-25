import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/TextReveal'
import { WordReveal } from '../components/TextReveal'

gsap.registerPlugin(ScrollTrigger)

const models = [
  {
    name: 'Groundset Logic',
    description: 'Structured reasoning over extracted entities.',
    spec: 'Policy evaluation, rule chaining, deterministic output',
  },
  {
    name: 'Groundset Vision',
    description: 'Document and image understanding.',
    spec: 'OCR, damage assessment, visual evidence processing',
  },
  {
    name: 'Groundset Motion',
    description: 'Video and temporal analysis.',
    spec: 'Surveillance, process verification, motion detection',
  },
  {
    name: 'Groundset Audio',
    description: 'Speech and audio intelligence.',
    spec: 'Call analysis, voice verification, transcript structuring',
  },
  {
    name: 'Groundset Speed',
    description: 'Ultra-low-latency inference.',
    spec: 'Sub-50ms decisions, high-throughput routing, edge deployment',
  },
  {
    name: 'Groundset Sovereign',
    description: 'Air-gapped deployment.',
    spec: 'Zero egress, on-premise, classified workloads',
  },
]

export default function Models() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll('.model-item')
      if (items) {
        gsap.from(items, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
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
        <div className="max-w-3xl mb-20">
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-6">Technology</p>
          <TextReveal
            as="h2"
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold tracking-[-0.02em] leading-[1.05] mb-6"
          >
            {"The Groundset\nModel Family"}
          </TextReveal>
          <WordReveal
            as="p"
            className="text-xl text-text-secondary font-light leading-relaxed"
            delay={0.3}
          >
            Purpose-built small language models. Each trained for a specific capability in the decision pipeline.
          </WordReveal>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {models.map(model => (
            <div key={model.name} className="model-item">
              <div className="text-[15px] font-medium text-text mb-2">{model.name}</div>
              <div className="text-[14px] text-text-secondary mb-1">{model.description}</div>
              <div className="text-[12px] text-text-muted">{model.spec}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
