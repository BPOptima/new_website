import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/TextReveal'
import { WordReveal } from '../components/TextReveal'

gsap.registerPlugin(ScrollTrigger)

const controls = [
  { title: 'In-VPC Deployment', body: 'All inference happens inside your cloud. Nothing sent to BPOptima infrastructure.' },
  { title: 'Zero Data Leakage', body: 'No telemetry, no usage data, no feedback loops. Sovereign tier: zero outbound.' },
  { title: 'Encryption Everywhere', body: 'AES-256 at rest. TLS 1.3 in transit. Customer-managed keys on enterprise.' },
  { title: 'Immutable Audit Ledger', body: 'Every decision written to a tamper-evident, append-only, SHA-256 signed log.' },
  { title: 'Role-Based Access', body: 'Fine-grained RBAC with SSO/SAML. Separate roles for operators, auditors, admins.' },
  { title: 'Network Isolation', body: 'Dedicated VPC. No public endpoints. Outbound blocked by default on Sovereign.' },
]

const certs = ['GDPR']

export default function Security() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const certsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gridRef.current?.querySelectorAll('.control-card')
      if (cards) {
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      }

      if (certsRef.current) {
        gsap.from(certsRef.current.children, {
          opacity: 0,
          x: -20,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: certsRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="security" ref={sectionRef} className="py-32 md:py-44 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="max-w-3xl mb-20">
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent mb-6">Security & Compliance</p>
          <TextReveal
            as="h2"
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold tracking-[-0.02em] leading-[1.05] mb-6"
          >
            {"Built for the\ninfosec reviewer"}
          </TextReveal>
          <WordReveal
            as="p"
            className="text-xl text-text-secondary font-light leading-relaxed"
            delay={0.2}
          >
            Forward this to your CISO. Every claim backed by controls you can inspect in your environment.
          </WordReveal>
        </div>

        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12 mb-20">
          {controls.map(control => (
            <div key={control.title} className="control-card">
              <h3 className="text-[15px] font-medium text-text mb-3">{control.title}</h3>
              <p className="text-[14px] text-text-muted leading-relaxed">{control.body}</p>
            </div>
          ))}
        </div>

        <div className="py-10 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between">
          <span className="text-[11px] tracking-[0.2em] uppercase text-text-muted mb-6 md:mb-0">Compliance Status</span>
          <div ref={certsRef} className="flex flex-wrap items-center gap-8">
            {certs.map(cert => (
              <span key={cert} className="text-[13px] text-text-secondary">{cert}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
