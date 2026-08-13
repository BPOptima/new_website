import { useState } from 'react'
import type { NavigateProps } from '../types'
import { Reveal, Stagger } from '../components/Reveal'
import PageHeader from '../components/PageHeader'
import SectionCTA from '../components/SectionCTA'

const models = [
  {
    id: 'logic',
    name: 'Groundset Logic',
    tagline: 'Structured document reasoning',
    badge: 'Core',
    badgeColor: 'bg-primary/10 text-primary border-primary/20',
    accentColor: 'var(--primary)',
    description: 'The foundational model for text-heavy compliance documents — contracts, loan applications, policy documents, clinical notes. Extracts entities, classifies risk, and produces structured outputs.',
    useCases: ['Loan underwriting', 'Contract review', 'Policy classification', 'Clinical coding'],
    specs: {
      'Parameter size': '7B',
      'Inference latency': '<80ms P99',
      'Context window': '32K tokens',
      'Languages': '14 (incl. legal/medical)',
      'Quantization': 'INT8 / INT4',
      'Deployment': 'VPC, On-prem',
    },
  },
  {
    id: 'vision',
    name: 'Groundset Vision',
    tagline: 'Document image understanding',
    badge: 'Core',
    badgeColor: 'bg-primary/10 text-primary border-primary/20',
    accentColor: 'var(--primary)',
    description: 'Processes scanned documents, handwritten forms, ID documents, and medical imaging reports. Combines OCR with layout-aware understanding — knows the difference between a table header and a footnote.',
    useCases: ['KYC document verification', 'Form extraction', 'Insurance damage photos', 'Medical imaging reports'],
    specs: {
      'Parameter size': '9B',
      'Inference latency': '<120ms P99',
      'Resolution': 'Up to 4K input',
      'Document types': '40+ formats',
      'Layout awareness': 'Yes (table, form, free-text)',
      'Deployment': 'VPC, On-prem',
    },
  },
  {
    id: 'motion',
    name: 'Groundset Motion',
    tagline: 'Temporal and video analysis',
    badge: 'Specialized',
    badgeColor: 'bg-accent/10 text-accent border-accent/20',
    accentColor: 'var(--accent)',
    description: 'Analyzes video streams and temporal sequences — surveillance footage for claims, telematics data for insurance, video-based onboarding. Produces time-indexed event extractions.',
    useCases: ['Insurance claims video', 'Telematics analysis', 'Video KYC', 'Process surveillance'],
    specs: {
      'Parameter size': '13B',
      'Inference latency': '<250ms/frame',
      'Frame rate': 'Up to 60fps',
      'Event detection': 'Configurable',
      'Output format': 'Time-indexed JSON',
      'Deployment': 'VPC (GPU required)',
    },
  },
  {
    id: 'audio',
    name: 'Groundset Audio',
    tagline: 'Speech and call transcription',
    badge: 'Specialized',
    badgeColor: 'bg-accent/10 text-accent border-accent/20',
    accentColor: 'var(--accent)',
    description: 'Real-time and batch transcription with speaker diarization, sentiment scoring, and compliance keyword detection. Built for call centers, recorded advisor sessions, and voice-based onboarding.',
    useCases: ['Call center compliance', 'Advisor recording review', 'Voice onboarding', 'Dispute resolution'],
    specs: {
      'Parameter size': '5B',
      'Inference latency': 'Real-time + batch',
      'Languages': '22',
      'Speaker diarization': 'Up to 8 speakers',
      'Keyword detection': 'Configurable',
      'Deployment': 'VPC, On-prem',
    },
  },
  {
    id: 'speed',
    name: 'Groundset Speed',
    tagline: 'High-throughput edge inference',
    badge: 'Performance',
    badgeColor: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
    accentColor: '#CA8A04',
    description: 'A distilled, quantized model optimized for throughput over depth. Handles high-volume, lower-complexity classification tasks at <20ms per item.',
    useCases: ['Transaction fraud pre-filter', 'Email/document triage', 'Real-time routing gates', 'High-volume batch'],
    specs: {
      'Parameter size': '1.3B (distilled)',
      'Inference latency': '<20ms P99',
      'Throughput': '50K+ req/min (A10)',
      'Quantization': 'INT4',
      'Accuracy vs Logic': '~87% parity',
      'Deployment': 'VPC, Edge, CPU-friendly',
    },
  },
  {
    id: 'sovereign',
    name: 'Groundset Sovereign',
    tagline: 'Air-gapped, highest security tier',
    badge: 'Sovereign',
    badgeColor: 'bg-foreground/8 text-foreground border-foreground/15',
    accentColor: 'var(--foreground)',
    description: 'Designed for environments with no external network access — government, defense, highest-security financial institutions. All weights stay on-prem, all inference is local, no telemetry of any kind.',
    useCases: ['Air-gapped government', 'Classified financial ops', 'Defense/intelligence', 'Maximum-security compliance'],
    specs: {
      'Parameter size': '7B / 13B (configurable)',
      'Inference latency': '<100ms (on-prem GPU)',
      'Network requirement': 'None (air-gapped)',
      'Telemetry': 'Zero',
      'Update mechanism': 'Manual / offline',
      'Deployment': 'On-prem only',
    },
  },
]

const QUICK_SPECS = ['Parameter size', 'Inference latency', 'Deployment']

export default function Models({ navigate }: NavigateProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div>
      <PageHeader
        eyebrow="Model Family"
        heading="Groundset™ — six domain-trained models"
        description="Not one model trying to do everything. Six specialized SLMs, each fine-tuned on the specific corpus and task structure of its domain — composable into multi-model pipelines."
      />

      {/* Model grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-4" baseDelay={0} stagger={60}>
          {models.map(model => {
            const isOpen = selected === model.id
            return (
              <button
                key={model.id}
                onClick={() => setSelected(isOpen ? null : model.id)}
                className="text-left rounded-xl border transition-colors"
                style={{
                  borderColor: isOpen ? model.accentColor : 'var(--border)',
                  background: isOpen
                    ? `color-mix(in srgb, ${model.accentColor} 4%, var(--background))`
                    : 'var(--card)',
                  boxShadow: isOpen ? `0 0 0 1px ${model.accentColor}` : 'none',
                  transition: 'border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => {
                  if (!isOpen) (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'
                }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <span className={`inline-flex text-[10px] font-mono-data font-medium px-2 py-0.5 rounded-md border ${model.badgeColor} mb-2`}>
                        {model.badge}
                      </span>
                      <div className="text-base font-semibold text-foreground">{model.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{model.tagline}</div>
                    </div>
                    <div
                      className="mt-1 flex-shrink-0 text-muted-foreground"
                      style={{ transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1)', transform: isOpen ? 'rotate(45deg)' : 'none' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    {QUICK_SPECS.map(key => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-[11px] text-muted-foreground font-mono-data">{key}</span>
                        <span className="text-[11px] text-foreground font-mono-data">{model.specs[key as keyof typeof model.specs]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expandable section using CSS grid trick */}
                <div
                  className="expandable-grid"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div className="px-6 pb-6 pt-1 border-t border-border">
                      {/* INPUT → MODEL → OUTPUT mini-flow */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 'fit-content', margin: '16px auto 0' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                          {/* INPUT box */}
                          <div style={{ fontSize: 9, fontFamily: 'var(--font-mono-data, "JetBrains Mono", monospace)', padding: '4px 10px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.1)', color: 'var(--muted-foreground)' }}>
                            INPUT
                          </div>
                          {/* Arrow down */}
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ display: 'block', margin: '2px 0', color: 'var(--muted-foreground)' }}>
                            <path d="M4 0v6M1.5 3.5L4 6l2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {/* Model name box */}
                          <div style={{
                            fontSize: 9,
                            fontFamily: 'var(--font-mono-data, "JetBrains Mono", monospace)',
                            padding: '4px 10px',
                            borderRadius: 4,
                            border: `1px solid color-mix(in srgb, ${model.accentColor} 40%, transparent)`,
                            color: model.accentColor,
                            background: `color-mix(in srgb, ${model.accentColor} 5%, transparent)`,
                          }}>
                            {model.name}
                          </div>
                          {/* Arrow down */}
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ display: 'block', margin: '2px 0', color: 'var(--muted-foreground)' }}>
                            <path d="M4 0v6M1.5 3.5L4 6l2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {/* OUTPUT box */}
                          <div style={{ fontSize: 9, fontFamily: 'var(--font-mono-data, "JetBrains Mono", monospace)', padding: '4px 10px', borderRadius: 4, border: '1px solid var(--border)', color: 'var(--muted-foreground)' }}>
                            OUTPUT
                          </div>
                        </div>
                        {/* Role text */}
                        <div style={{ fontSize: 8, fontFamily: 'var(--font-mono-data, "JetBrains Mono", monospace)', color: 'var(--muted-foreground)', textAlign: 'center', marginTop: 8, marginBottom: 16, letterSpacing: '0.08em' }}>
                          {model.tagline.toUpperCase()}
                        </div>
                      </div>
                      {/* Divider */}
                      <div style={{ height: 1, background: 'var(--border)', marginBottom: 16 }} />
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{model.description}</p>
                      <p className="text-[10px] font-mono-data text-muted-foreground uppercase tracking-widest mb-2">Use cases</p>
                      <div className="flex flex-wrap gap-1.5">
                        {model.useCases.map(u => (
                          <span key={u} className="text-xs px-2 py-0.5 rounded-md bg-muted border border-border text-muted-foreground">
                            {u}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </Stagger>
      </section>

      {/* Comparison table */}
      <Reveal>
        <section className="border-t border-border bg-card/30">
          <div className="max-w-7xl mx-auto px-6 py-16 overflow-x-auto">
            <h2 className="text-xl font-semibold text-foreground mb-8 tracking-tight">Full specification comparison</h2>
            <table className="w-full text-sm border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left pb-3 pr-6 text-[11px] font-mono-data text-muted-foreground uppercase tracking-widest font-normal w-36">Spec</th>
                  {models.map(m => (
                    <th key={m.id} className="text-left pb-3 px-3 font-medium text-foreground text-xs whitespace-nowrap">
                      {m.name.replace('Groundset ', '')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(models[0].specs).map((specKey, i) => (
                  <tr
                    key={specKey}
                    className="border-b border-border"
                    style={{
                      background: i % 2 === 0 ? 'var(--background)' : 'transparent',
                      transition: 'background 0.15s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--muted)')}
                    onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'var(--background)' : 'transparent')}
                  >
                    <td className="py-3 pr-6 text-[11px] font-mono-data text-muted-foreground">{specKey}</td>
                    {models.map(m => (
                      <td key={m.id} className="py-3 px-3 text-xs text-foreground font-mono-data whitespace-nowrap">
                        {m.specs[specKey as keyof typeof m.specs]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal>
          <SectionCTA heading="Not sure which models fit your use case?" sub="Our ML team will map your workflows to the right model combination and run a proof-of-concept." cta="Talk to ML Team" onClick={() => navigate('contact')} />
        </Reveal>
      </section>
    </div>
  )
}
