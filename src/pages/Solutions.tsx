import { useState, useEffect, useRef } from 'react'
import type { NavigateProps } from '../types'
import { Reveal, Stagger } from '../components/Reveal'
import { Toggle } from '../components/Toggle'
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

const industryPipelines = [
  {
    industry: 'FINANCIAL SERVICES',
    color: '#0B5FAE',
    evidenceLabel: 'LOAN APPLICATION',
    evidenceType: 'PDF · BANK STATEMENTS · PAY STUBS',
    flow: [
      { step: 'EVIDENCE', detail: 'Application documents ingested' },
      { step: 'UNDERWRITE', detail: 'Groundset Logic extracts financials' },
      { step: 'POLICY', detail: 'Basel III / FDIC rules applied' },
      { step: 'DECISION', detail: 'APPROVE / REJECT / ESCALATE' },
    ],
    decisionLabel: 'APPROVE',
    decisionColor: '#22C55E',
    stat1: { val: '<100ms', label: 'Decision latency' },
    stat2: { val: '94%', label: 'Straight-through rate' },
  },
  {
    industry: 'HEALTHCARE',
    color: '#00C8B4',
    evidenceLabel: 'PRIOR AUTH REQUEST',
    evidenceType: 'CLINICAL NOTES · REFERRAL · ICD CODES',
    flow: [
      { step: 'EVIDENCE', detail: 'Referral and clinical notes ingested' },
      { step: 'REVIEW', detail: 'Groundset Logic + Vision parses docs' },
      { step: 'POLICY', detail: 'Payer criteria evaluated deterministically' },
      { step: 'DECISION', detail: 'APPROVE / ESCALATE TO PHYSICIAN' },
    ],
    decisionLabel: 'ESCALATE',
    decisionColor: '#F59E0B',
    stat1: { val: '4.2×', label: 'Faster auth decisions' },
    stat2: { val: '0 bytes', label: 'PHI leaves your VPC' },
  },
  {
    industry: 'INSURANCE',
    color: '#6366F1',
    evidenceLabel: 'DAMAGE CLAIM',
    evidenceType: 'PHOTOS · INSPECTION REPORT · POLICY',
    flow: [
      { step: 'EVIDENCE', detail: 'Damage photos and reports ingested' },
      { step: 'INSPECT', detail: 'Groundset Vision analyzes damage' },
      { step: 'POLICY', detail: 'Coverage rules evaluated' },
      { step: 'DECISION', detail: 'APPROVE PAYOUT / REVIEW' },
    ],
    decisionLabel: 'APPROVED',
    decisionColor: '#22C55E',
    stat1: { val: '87ms', label: 'Inspection latency' },
    stat2: { val: '99.97%', label: 'Uptime SLA' },
  },
]

type IndustryKey = 'financial' | 'healthcare' | 'insurance'

const industries: Record<IndustryKey, {
  label: string
  tagline: string
  techContent: { title: string; points: string[] }[]
  bizContent: { metric: string; label: string; detail: string }[]
  workflows: string[]
  models: string[]
}> = {
  financial: {
    label: 'Financial Services',
    tagline: 'Lending, compliance, and fraud — where every decision carries regulatory weight',
    techContent: [
      {
        title: 'Loan underwriting at scale',
        points: [
          'Groundset Logic ingests application PDFs, pay stubs, bank statements',
          'Policy engine applies Basel III / FDIC rules deterministically',
          'Confidence-based escalation for borderline cases only',
          'Full decision trace for every application — regulator-ready',
        ],
      },
      {
        title: 'Transaction fraud pre-filtering',
        points: [
          'Groundset Speed scores transactions at <20ms per item',
          'Configurable rule thresholds, no retraining needed',
          'Integrates via REST/gRPC into existing fraud stacks',
          'Zero data shared with external enrichment APIs',
        ],
      },
    ],
    bizContent: [
      { metric: '4.2×', label: 'Faster loan decisions', detail: 'Median application cycle time' },
      { metric: '63%', label: 'Underwriting cost reduction', detail: 'Per funded loan' },
      { metric: '$0', label: 'Data sovereignty risk', detail: 'No cloud data leakage' },
      { metric: '12 hrs', label: 'Dispute resolution time', detail: 'vs. 5-day manual average' },
    ],
    workflows: ['Loan underwriting', 'KYC/AML screening', 'Transaction fraud', 'Regulatory reporting', 'Contract review'],
    models: ['Groundset Logic', 'Groundset Vision', 'Groundset Speed'],
  },
  healthcare: {
    label: 'Healthcare',
    tagline: 'Clinical decision support and prior auth — where accuracy is a patient safety issue',
    techContent: [
      {
        title: 'Prior authorization processing',
        points: [
          'Groundset Logic + Vision parse clinical notes, imaging reports, lab results',
          'Policy engine applies payer-specific coverage criteria',
          'Auto-approves clear cases; escalates complex clinical judgment',
          'HIPAA-compliant audit trail, PHI never leaves VPC',
        ],
      },
      {
        title: 'Medical coding assistance',
        points: [
          'Groundset Logic suggests ICD-10/CPT codes from clinical documentation',
          'Confidence thresholds route low-certainty codes to human coders',
          'Configurable for specialty-specific code sets',
          'No patient data transmitted to any external service',
        ],
      },
    ],
    bizContent: [
      { metric: '78%', label: 'Prior auth auto-approval', detail: 'Without clinician review' },
      { metric: '3.1 days', label: 'Faster prior auth', detail: 'vs. industry average of 6.8 days' },
      { metric: '91%', label: 'Coding accuracy', detail: 'vs. 72% manual baseline' },
      { metric: '100%', label: 'HIPAA compliant', detail: 'Zero PHI leaves your environment' },
    ],
    workflows: ['Prior authorization', 'Medical coding (ICD-10/CPT)', 'Clinical note summarization', 'Eligibility verification', 'Claims adjudication'],
    models: ['Groundset Logic', 'Groundset Vision', 'Groundset Audio'],
  },
  insurance: {
    label: 'Insurance',
    tagline: 'Claims processing and risk assessment — where speed and accuracy both drive profitability',
    techContent: [
      {
        title: 'First notice of loss automation',
        points: [
          'Groundset Audio transcribes inbound FNOL calls in real time',
          'Groundset Vision analyzes uploaded damage photos',
          'Policy engine applies coverage rules and auto-settles clear claims',
          'Complex claims escalate with full context pre-packaged for adjusters',
        ],
      },
      {
        title: 'Underwriting document review',
        points: [
          'Groundset Logic parses inspection reports, financial statements, loss runs',
          'Extracts risk factors with confidence scores attached',
          'Flags discrepancies between submission and supporting docs',
          'Output structured for downstream actuarial systems',
        ],
      },
    ],
    bizContent: [
      { metric: '58%', label: 'Claims cycle reduction', detail: 'Days to settlement' },
      { metric: '94%', label: 'FNOL auto-triage rate', detail: 'Routed without adjuster review' },
      { metric: '$1.4M', label: 'Avg. annual savings', detail: 'Per 50k claims processed' },
      { metric: '2.1×', label: 'Adjuster capacity increase', detail: 'Handling complex claims only' },
    ],
    workflows: ['First notice of loss', 'Claims triage', 'Underwriting review', 'Fraud detection', 'Policy document extraction'],
    models: ['Groundset Logic', 'Groundset Vision', 'Groundset Motion', 'Groundset Audio'],
  },
}

const industryKeys = Object.keys(industries) as IndustryKey[]

export default function Solutions({ navigate }: NavigateProps) {
  const [industry, setIndustry] = useState<IndustryKey>('financial')
  const [view, setView] = useState<string>('tech')
  const active = industries[industry]

  const industryRef = useRef<HTMLDivElement>(null)
  const industryProgress = useScrollProgress(industryRef)
  const activeIndustry = Math.min(2, Math.floor(industryProgress * 3))
  const ind = industryPipelines[activeIndustry]

  return (
    <div>
      <PageHeader
        eyebrow="Solutions by Industry"
        heading="Built for regulated industries"
        description="Each deployment is tuned for your industry's specific document types, compliance rules, and decision workflows."
      />

      {/* Scroll-driven industry pipeline section */}
      <div ref={industryRef} style={{ height: '300vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: '64px', height: 'calc(100vh - 64px)', display: 'flex', overflow: 'hidden', borderTop: '1px solid var(--border)' }}>

          {/* LEFT PANEL — explanation */}
          <div style={{ width: '45%', background: 'var(--background)', padding: '0 48px 0 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            {/* Industry selector dots */}
            <div style={{ display: 'flex', gap: 12, marginBottom: 32, alignItems: 'center' }}>
              {industryPipelines.map((ip, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{
                    width: i === activeIndustry ? 20 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === activeIndustry ? ip.color : 'var(--border)',
                    transition: 'all 0.4s ease',
                  }} />
                  <span style={{
                    fontSize: 9,
                    fontFamily: 'JetBrains Mono, monospace',
                    color: i === activeIndustry ? ip.color : 'var(--muted-foreground)',
                    letterSpacing: '0.08em',
                    opacity: i === activeIndustry ? 1 : 0.5,
                    transition: 'all 0.4s ease',
                  }}>{ip.industry.split(' ')[0]}</span>
                </div>
              ))}
            </div>

            {/* Animated content — re-mounts on industry change */}
            <div key={activeIndustry} style={{ animation: 'fade-up 0.45s cubic-bezier(0.16,1,0.3,1) both' }}>
              <div style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: ind.color, letterSpacing: '0.12em', marginBottom: 8 }}>
                {ind.industry}
              </div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 600, color: 'var(--foreground)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 16 }}>
                {ind.evidenceLabel}
              </h2>
              <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: 'var(--muted-foreground)', letterSpacing: '0.06em', marginBottom: 24 }}>
                {ind.evidenceType}
              </div>

              {/* Flow steps */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 32 }}>
                {ind.flow.map((f, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                      <div style={{
                        width: 8, height: 8, borderRadius: '50%', marginTop: 4,
                        background: f.step === 'DECISION' ? ind.decisionColor : ind.color,
                        opacity: 0.8,
                      }} />
                      {i < ind.flow.length - 1 && (
                        <div style={{ width: 1, height: 28, background: `${ind.color}30`, marginTop: 3 }} />
                      )}
                    </div>
                    <div style={{ paddingBottom: i < ind.flow.length - 1 ? 20 : 0 }}>
                      <div style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: f.step === 'DECISION' ? ind.decisionColor : ind.color, letterSpacing: '0.1em', marginBottom: 2 }}>
                        {f.step}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{f.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 32 }}>
                {[ind.stat1, ind.stat2].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--foreground)', fontVariantNumeric: 'tabular-nums' }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL — dark VPC visual */}
          <div style={{ flex: 1, background: '#0B1220', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48 }}>

            {/* Grid overlay */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,200,180,0.015) 1px, transparent 1px), linear-gradient(to right, rgba(0,200,180,0.015) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

            <div key={activeIndustry} style={{ animation: 'fade-up 0.5s cubic-bezier(0.16,1,0.3,1) both', width: '100%', maxWidth: 360 }}>

              {/* Evidence artifact */}
              <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '12px 16px', marginBottom: 0, background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ fontSize: 8, fontFamily: 'JetBrains Mono, monospace', color: '#3E5068', letterSpacing: '0.1em', marginBottom: 6 }}>EVIDENCE INPUT</div>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', color: '#6B85A0' }}>{ind.evidenceType}</div>
              </div>

              {/* VPC boundary */}
              <div style={{ border: `1.5px dashed ${ind.color}40`, borderRadius: 10, padding: '16px', marginTop: 0, position: 'relative' }}>
                <div style={{ fontSize: 7, fontFamily: 'JetBrains Mono, monospace', color: ind.color, letterSpacing: '0.12em', marginBottom: 12, opacity: 0.6 }}>CUSTOMER VPC · BPOPTIMA</div>

                {/* Entry arrow */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                  <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                    <path d="M6 0v12M1 8l5 6 5-6" stroke={`${ind.color}60`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Pipeline steps inside VPC */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                  {ind.flow.slice(1).map((f, i) => (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                      <div style={{
                        padding: '8px 12px', borderRadius: 5,
                        border: `1px solid ${f.step === 'DECISION' ? `${ind.decisionColor}40` : `${ind.color}25`}`,
                        background: f.step === 'DECISION' ? `${ind.decisionColor}08` : `${ind.color}05`,
                        fontSize: 10, fontFamily: 'JetBrains Mono, monospace',
                        color: f.step === 'DECISION' ? ind.decisionColor : '#E8EDF5',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      }}>
                        <span>{f.step}</span>
                        {f.step === 'DECISION' && (
                          <span style={{ fontSize: 9, color: ind.decisionColor, fontWeight: 600 }}>{ind.decisionLabel}</span>
                        )}
                      </div>
                      {i < ind.flow.length - 2 && (
                        <div style={{ width: 1, height: 12, background: `${ind.color}30`, marginLeft: 16, marginTop: 0 }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                {[ind.stat1, ind.stat2].map((s, i) => (
                  <div key={i} style={{ flex: 1, padding: '8px 12px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#E8EDF5', fontFamily: 'JetBrains Mono, monospace' }}>{s.val}</div>
                    <div style={{ fontSize: 9, color: '#6B85A0', marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky tab bar */}
      <section
        className="border-b border-border sticky top-16 z-40"
        style={{ background: 'color-mix(in srgb, var(--background) 92%, transparent)', backdropFilter: 'blur(10px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex overflow-x-auto">
            {industryKeys.map(key => (
              <button
                key={key}
                onClick={() => setIndustry(key)}
                className="flex-shrink-0 px-5 py-4 text-sm font-medium border-b-2 transition-colors"
                style={{
                  borderColor: industry === key ? 'var(--primary)' : 'transparent',
                  color: industry === key ? 'var(--primary)' : 'var(--muted-foreground)',
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                }}
              >
                {industries[key].label}
              </button>
            ))}
          </div>
          <Toggle
            options={[
              { label: 'Technical', value: 'tech' },
              { label: 'Business Impact', value: 'business' },
            ]}
            value={view}
            onChange={setView}
            className="self-center sm:self-auto my-2 sm:my-0"
          />
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal>
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-2">{active.label}</h2>
            <p className="text-muted-foreground">{active.tagline}</p>
          </div>
        </Reveal>

        {view === 'tech' ? (
          <Stagger className="grid md:grid-cols-2 gap-6" stagger={80}>
            {active.techContent.map((section, i) => (
              <div key={i} className="p-8 rounded-xl border border-border bg-card card-interactive" style={{ cursor: 'default' }}>
                <h3 className="text-base font-semibold text-foreground mb-5">{section.title}</h3>
                <ul className="space-y-3">
                  {section.points.map((point, j) => (
                    <li key={j} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Stagger>
        ) : (
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4" stagger={70}>
            {active.bizContent.map((stat, i) => (
              <div key={i} className="p-6 rounded-xl border border-border bg-card card-interactive" style={{ cursor: 'default' }}>
                <div className="text-3xl font-semibold text-foreground tracking-tight mb-1">{stat.metric}</div>
                <div className="text-sm font-medium text-foreground mb-0.5">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.detail}</div>
              </div>
            ))}
          </Stagger>
        )}

        <Reveal delay={120}>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card">
              <p className="text-[10px] font-mono-data text-muted-foreground uppercase tracking-widest mb-4">Supported Workflows</p>
              <div className="flex flex-wrap gap-2">
                {active.workflows.map(w => (
                  <span
                    key={w}
                    className="text-xs px-3 py-1 rounded-full border border-border bg-muted text-foreground transition-colors hover:border-foreground/20"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <p className="text-[10px] font-mono-data text-muted-foreground uppercase tracking-widest mb-4">Models Used</p>
              <div className="flex flex-wrap gap-2">
                {active.models.map(m => (
                  <span key={m} className="text-xs px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary transition-colors hover:border-primary/40">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-8 p-8 rounded-xl border-2 border-dashed border-border flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-1">
              <p className="text-[10px] font-mono-data text-muted-foreground uppercase tracking-widest mb-2">Case Study — Placeholder</p>
              <div className="text-base font-semibold text-foreground mb-1">
                {industry === 'financial' && '[Bank Name] — $X saved on underwriting in year one'}
                {industry === 'healthcare' && '[Health System Name] — Y% prior auth approval rate, X days faster'}
                {industry === 'insurance' && '[Insurer Name] — 58% reduction in claims cycle time'}
              </div>
              <p className="text-sm text-muted-foreground">Customer details and verified metrics will be added when references are confirmed.</p>
            </div>
            <button
              onClick={() => navigate('case-studies')}
              className="flex-shrink-0 text-sm text-primary hover:underline font-medium inline-flex items-center gap-1 group"
            >
              View all case studies
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal>
          <SectionCTA heading="Your industry, your workflow" sub="We'll map your specific document types and decision processes to the right model configuration and run a pilot." cta="Start a Pilot" onClick={() => navigate('contact')} />
        </Reveal>
      </section>
    </div>
  )
}
