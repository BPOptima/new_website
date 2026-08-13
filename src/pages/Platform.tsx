import { useState, useEffect, useRef } from 'react'
import type { NavigateProps } from '../types'
import { Reveal, Stagger } from '../components/Reveal'
import PageHeader from '../components/PageHeader'
import SectionCTA from '../components/SectionCTA'

function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let raf: number
    const update = () => {
      raf = requestAnimationFrame(() => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const total = ref.current.offsetHeight - window.innerHeight
        if (total <= 0) return
        setProgress(Math.min(1, Math.max(0, -rect.top / total)))
      })
    }
    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', update); cancelAnimationFrame(raf) }
  }, [ref])
  return progress
}

const stages = [
  {
    num: '01', name: 'Ingestion', tag: 'Input Layer',
    title: 'Any unstructured input, normalized',
    body: 'A unified ingestion layer accepts PDFs, scanned images, TIFF documents, audio files, structured JSON/XML, and streaming log data. Each input type is routed to the appropriate pre-processor before reaching the SLM layer.',
    tech: ['PDF/TIFF parsing', 'OCR pipeline', 'Audio transcription', 'Schema normalization'],
    biz: ['No manual data prep', 'Works with existing document workflows', 'Same API for all input types'],
    color: 'var(--primary)',
  },
  {
    num: '02', name: 'SLM Understanding', tag: 'Model Layer',
    title: 'Domain-specific language models',
    body: 'Six specialized small language models (Groundset™) handle different modalities and use cases. Each is fine-tuned on domain corpora — financial regulations, clinical notes, insurance policies — not internet text.',
    tech: ['6 domain SLMs', '<100ms inference', '4B–13B parameter range', 'On-device quantization'],
    biz: ['Higher accuracy on your documents', 'Lower hallucination rate', 'No shared model weights'],
    color: 'var(--accent)',
  },
  {
    num: '03', name: 'Policy Decision Core', tag: 'Decision Layer',
    title: 'Deterministic rule evaluation',
    body: 'Model outputs are passed to a policy engine that evaluates them against your compliance rules, thresholds, and business logic. Unlike a neural net, the policy engine is fully inspectable — every decision traces to a specific rule.',
    tech: ['Rule DSL with version control', 'Threshold + confidence scoring', 'Conflict resolution logic', 'Sandboxed policy testing'],
    biz: ['Regulators can read the rules', 'Change rules without retraining', 'Audit trail per decision'],
    color: 'var(--primary)',
  },
  {
    num: '04', name: 'Routing', tag: 'Orchestration Layer',
    title: 'Automated flow with human escalation',
    body: 'Decisions route to downstream systems via webhooks, APIs, or direct database writes. Edge cases that fall below confidence thresholds are escalated to human review queues with full context pre-packaged.',
    tech: ['Webhook + REST/gRPC output', 'Confidence-based escalation', 'Priority queuing', 'SLA monitoring'],
    biz: ['Straight-through processing for clear cases', 'Humans only see hard cases', 'Measurable reduction in review queue'],
    color: 'var(--accent)',
  },
  {
    num: '05', name: 'Audit Ledger', tag: 'Compliance Layer',
    title: 'Immutable decision record',
    body: 'Every decision — including the input, the model outputs, the policy evaluation, and the final routing — is written to a tamper-evident audit ledger. Exportable in regulator-ready formats.',
    tech: ['Append-only log store', 'Cryptographic integrity', 'SIEM integration', 'SOC 2 + HIPAA export'],
    biz: ['Ready for regulatory review', 'Dispute resolution in minutes', 'Reduces compliance overhead'],
    color: 'var(--primary)',
  },
]

export default function Platform({ navigate }: NavigateProps) {
  const pipelineRef = useRef<HTMLDivElement>(null)
  const pipelineProgress = useScrollProgress(pipelineRef)
  const activeStage = Math.min(stages.length - 1, Math.floor(pipelineProgress * stages.length))

  return (
    <div>
      <PageHeader
        eyebrow="Platform Architecture"
        heading="The full decision pipeline, from input to audit ledger"
        description="Five deterministic stages, deployed inside your infrastructure. No probabilistic black boxes between your documents and your decisions."
      />

      {/* Pipeline stages — sticky scroll-driven split layout */}
      <div ref={pipelineRef} style={{ height: `${stages.length * 100}vh`, position: 'relative' }}>
        <div style={{ position: 'sticky', top: 64, height: 'calc(100vh - 64px)', display: 'flex', overflow: 'hidden', borderTop: '1px solid var(--border)' }}>
          {/* Left panel */}
          <div style={{ width: '48%', background: 'var(--background)', padding: '0 48px 0 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div key={activeStage} style={{ animation: 'fade-up 0.4s cubic-bezier(0.16,1,0.3,1) both' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ fontFamily: 'var(--font-mono-data, "JetBrains Mono", monospace)', fontSize: 9, color: stages[activeStage].color, letterSpacing: '0.1em' }}>
                  {stages[activeStage].num}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono-data, "JetBrains Mono", monospace)',
                  fontSize: 9,
                  padding: '3px 8px',
                  borderRadius: 4,
                  color: stages[activeStage].color,
                  border: `1px solid color-mix(in srgb, ${stages[activeStage].color} 25%, transparent)`,
                  background: `color-mix(in srgb, ${stages[activeStage].color} 5%, transparent)`,
                }}>
                  {stages[activeStage].tag}
                </span>
              </div>
              <div className="text-3xl font-semibold text-foreground tracking-tight mb-3">{stages[activeStage].name}</div>
              <div className="text-base font-medium text-foreground mb-3">{stages[activeStage].title}</div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{stages[activeStage].body}</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: 24 }}>
                {stages[activeStage].tech.map(t => (
                  <li key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontFamily: 'var(--font-mono-data, "JetBrains Mono", monospace)', marginBottom: 4 }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: stages[activeStage].color, display: 'inline-block', flexShrink: 0 }} />
                    <span style={{ color: 'var(--foreground)' }}>{t}</span>
                  </li>
                ))}
              </ul>
              {/* Stage progress bar */}
              <div style={{ display: 'flex', gap: 4 }}>
                {stages.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      height: 2,
                      borderRadius: 1,
                      flex: i === activeStage ? 3 : 1,
                      background: i < activeStage
                        ? `color-mix(in srgb, ${s.color} 30%, transparent)`
                        : i === activeStage
                        ? s.color
                        : 'var(--border)',
                      transition: 'flex 0.4s ease, background 0.4s ease',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right panel — VPC architecture diagram */}
          <div style={{ flex: 1, background: '#0B1220', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
            <div style={{ border: '1.5px dashed rgba(0,200,180,0.12)', borderRadius: 12, padding: '24px 32px', position: 'relative' }}>
              <div style={{ fontFamily: 'var(--font-mono-data, "JetBrains Mono", monospace)', fontSize: 8, color: '#3E5068', marginBottom: 16, letterSpacing: '0.08em' }}>
                BPOPTIMA VPC
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                {stages.map((s, i) => {
                  const isActive = i === activeStage
                  const isPast = i < activeStage
                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontFamily: 'var(--font-mono-data, "JetBrains Mono", monospace)', fontSize: 9, color: isActive ? s.color : '#3E5068', width: 20, textAlign: 'right' }}>
                          {s.num}
                        </span>
                        <div style={{
                          borderRadius: 6,
                          border: `1px solid ${isActive ? `color-mix(in srgb, ${s.color} 60%, transparent)` : isPast ? `color-mix(in srgb, ${s.color} 25%, transparent)` : 'rgba(255,255,255,0.08)'}`,
                          background: isActive ? `color-mix(in srgb, ${s.color} 8%, transparent)` : 'transparent',
                          padding: '10px 16px',
                          color: isActive ? 'white' : isPast ? '#6B85A0' : '#3E5068',
                          fontSize: 11,
                          fontFamily: 'var(--font-mono-data, "JetBrains Mono", monospace)',
                          minWidth: 200,
                          transition: 'all 0.4s ease',
                        }}>
                          {s.name}
                        </div>
                        {isActive && (
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, animation: 'cyan-glow-pulse 1.5s ease-in-out infinite' }} />
                        )}
                        {!isActive && <div style={{ width: 6 }} />}
                      </div>
                      {i < stages.length - 1 && (
                        <div style={{
                          width: 1,
                          height: 24,
                          background: i <= activeStage
                            ? `color-mix(in srgb, ${s.color} 20%, transparent)`
                            : 'rgba(255,255,255,0.05)',
                          alignSelf: 'flex-start',
                          marginLeft: 48,
                          transition: 'background 0.4s ease',
                        }} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screenshots placeholder */}
      <section className="border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <div className="mb-10">
              <p className="text-[11px] font-mono-data text-accent uppercase tracking-widest mb-3">Product in Action</p>
              <h2 className="text-2xl font-semibold text-foreground tracking-tight">Screenshots coming soon</h2>
              <p className="text-muted-foreground mt-2 text-sm">Supply product screenshots and these frames will be replaced with the real UI.</p>
            </div>
          </Reveal>
          <Stagger className="grid md:grid-cols-3 gap-4" stagger={80}>
            {['Decision Dashboard', 'Policy Rule Editor', 'Audit Log Explorer'].map(label => (
              <div
                key={label}
                className="aspect-video rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 bg-muted/30 card-interactive"
                style={{ cursor: 'default' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/50">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18M9 21V9"/>
                </svg>
                <span className="text-xs text-muted-foreground font-mono-data">{label}</span>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal>
          <SectionCTA heading="Ready for a technical deep-dive?" sub="Our engineers will walk you through the full architecture for your specific use case." cta="Request Architecture Review" onClick={() => navigate('contact')} />
        </Reveal>
      </section>
    </div>
  )
}
