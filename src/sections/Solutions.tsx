import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/TextReveal'
import { WordReveal } from '../components/TextReveal'

gsap.registerPlugin(ScrollTrigger)

type Industry = 'financial' | 'healthcare' | 'insurance'

const industries: Record<Industry, {
  label: string
  tagline: string
  pipeline: { step: string; detail: string }[]
  stats: { value: string; label: string }[]
}> = {
  financial: {
    label: 'Financial Services',
    tagline: 'Loan underwriting, KYC, and fraud detection where every decision carries regulatory weight.',
    pipeline: [
      { step: 'Ingest application documents', detail: 'PDF, bank statements, tax filings' },
      { step: 'Extract entities and risk signals', detail: '<80ms latency' },
      { step: 'Evaluate compliance rules', detail: 'Basel III / FDIC' },
      { step: 'Emit audited decision', detail: 'Approve, Reject, or Escalate' },
    ],
    stats: [{ value: '4.2x', label: 'Faster decisions' }, { value: '94%', label: 'Straight-through' }, { value: '<100ms', label: 'P99 latency' }],
  },
  healthcare: {
    label: 'Healthcare',
    tagline: 'Prior authorization and clinical coding where accuracy is a patient safety issue.',
    pipeline: [
      { step: 'Parse clinical documents', detail: 'Notes, imaging, lab results' },
      { step: 'Identify diagnoses and eligibility', detail: '<120ms latency' },
      { step: 'Apply payer coverage criteria', detail: 'HIPAA compliant' },
      { step: 'Auto-approve or escalate', detail: 'Zero PHI egress' },
    ],
    stats: [{ value: '78%', label: 'Auto-approval' }, { value: '3.1 days', label: 'Faster auth' }, { value: '0 bytes', label: 'PHI egress' }],
  },
  insurance: {
    label: 'Insurance',
    tagline: 'Claims processing and underwriting where speed and accuracy both drive profitability.',
    pipeline: [
      { step: 'Ingest damage evidence', detail: 'Photos, reports, policy docs' },
      { step: 'Assess severity and components', detail: '<250ms latency' },
      { step: 'Apply coverage and fraud rules', detail: 'Deterministic' },
      { step: 'Auto-settle or escalate', detail: 'Full audit trail' },
    ],
    stats: [{ value: '58%', label: 'Cycle reduction' }, { value: '$1.4M', label: 'Annual savings' }, { value: '87ms', label: 'Inspection latency' }],
  },
}

const keys = Object.keys(industries) as Industry[]

export default function Solutions() {
  const [active, setActive] = useState<Industry>('financial')
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const data = industries[active]

  useEffect(() => {
    if (!stepsRef.current || !statsRef.current) return

    const steps = stepsRef.current.querySelectorAll('.step-item')
    const stats = statsRef.current.querySelectorAll('.stat-item')

    gsap.set(steps, { opacity: 0, x: 100 })
    gsap.set(stats, { opacity: 0, x: 60 })

    const triggers: ScrollTrigger[] = []

    steps.forEach((step, i) => {
      const anim = gsap.to(step, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: i * 0.08,
        ease: 'power4.out',
        paused: true,
      })

      const st = ScrollTrigger.create({
        trigger: step,
        start: 'top 75%',
        end: 'top 10%',
        onEnter: () => anim.play(),
        onLeave: () => anim.reverse(),
        onEnterBack: () => anim.play(),
        onLeaveBack: () => anim.reverse(),
      })
      triggers.push(st)
    })

    stats.forEach((stat, i) => {
      const anim = gsap.to(stat, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power3.out',
        paused: true,
      })

      const st = ScrollTrigger.create({
        trigger: stat,
        start: 'top 75%',
        end: 'top 10%',
        onEnter: () => anim.play(),
        onLeave: () => anim.reverse(),
        onEnterBack: () => anim.play(),
        onLeaveBack: () => anim.reverse(),
      })
      triggers.push(st)
    })

    return () => {
      triggers.forEach(st => st.kill())
    }
  }, [active])

  return (
    <section id="solutions" ref={sectionRef} className="py-32 md:py-44 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="max-w-3xl mb-20">
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-6">Solutions</p>
          <TextReveal
            as="h2"
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold tracking-[-0.02em] leading-[1.05] mb-6"
          >
            {"Built for regulated\nindustries"}
          </TextReveal>
          <WordReveal
            as="p"
            className="text-xl text-text-secondary font-light leading-relaxed"
            delay={0.3}
          >
            Each deployment is tuned for your industry's document types, compliance rules, and decision workflows.
          </WordReveal>
        </div>

        <div className="flex gap-0 mb-16 border-b border-border">
          {keys.map(key => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className="relative px-6 py-4 text-[13px] tracking-wide transition-all duration-300"
              style={{ color: active === key ? '#FFFFFF' : 'rgba(255,255,255,0.4)' }}
            >
              {industries[key].label}
              <div
                className="absolute bottom-0 left-0 right-0 h-px transition-all duration-500"
                style={{
                  background: active === key ? '#00C8B4' : 'transparent',
                  transform: active === key ? 'scaleX(1)' : 'scaleX(0)',
                }}
              />
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16" style={{ perspective: '1200px' }}>
          <div ref={stepsRef} style={{ transformStyle: 'preserve-3d' }}>
            <p className="text-[15px] text-text-secondary mb-10 leading-relaxed max-w-lg">{data.tagline}</p>
            {data.pipeline.map((step, i) => (
              <div
                key={`${active}-${i}`}
                className="step-item flex gap-6 py-5 will-change-transform"
                style={{ borderBottom: i < data.pipeline.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
              >
                <span className="text-[11px] text-text-muted mt-1 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <div className="text-[15px] text-text mb-1">{step.step}</div>
                  <span className="text-[12px] text-text-muted">{step.detail}</span>
                </div>
              </div>
            ))}
          </div>

          <div ref={statsRef} className="flex flex-col justify-between" style={{ transformStyle: 'preserve-3d' }}>
            <div className="space-y-12">
              {data.stats.map(stat => (
                <div key={`${active}-${stat.label}`} className="stat-item will-change-transform">
                  <div className="text-[clamp(2.5rem,4vw,4rem)] font-semibold tracking-[-0.02em] text-text mb-2">{stat.value}</div>
                  <div className="text-[13px] text-text-muted tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>

            <a href="#cta" className="mt-16 group inline-flex items-center gap-3 text-[13px] tracking-wide text-text-muted hover:text-accent transition-colors duration-300">
              See this on your data
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:translate-x-1.5 transition-transform duration-300"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
