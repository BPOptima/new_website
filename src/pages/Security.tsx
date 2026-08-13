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

const certifications = [
  { name: 'SOC 2 Type II', desc: 'Annual third-party audit of security, availability, and confidentiality controls', status: 'Certified' },
  { name: 'HIPAA', desc: 'Business Associate Agreement available; architecture designed for PHI workloads', status: 'Ready' },
  { name: 'ISO 27001', desc: 'Information security management system certification in progress', status: 'In Progress' },
  { name: 'GDPR', desc: 'Data processing agreements and privacy-by-design architecture for EU customers', status: 'Compliant' },
  { name: 'CCPA', desc: 'California Consumer Privacy Act compliance built into data handling', status: 'Compliant' },
  { name: 'FedRAMP', desc: 'Federal Risk and Authorization Management Program — roadmap for H2 2026', status: 'Roadmap' },
]

const controls = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
    title: 'In-VPC Deployment',
    body: 'All model weights, inference, and data processing happen inside your cloud environment or on-premises. Nothing is sent to BPOptima infrastructure after initial deployment.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    title: 'Zero Data Leakage',
    body: 'No telemetry, no usage data, no model feedback loops that send data outside your perimeter. Sovereign tier operates with no outbound network connectivity whatsoever.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
    title: 'Encryption at Rest and in Transit',
    body: 'AES-256 encryption for all stored data. TLS 1.3 for all internal service communication. Customer-managed encryption keys (CMEK) available for enterprise tier.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    title: 'Immutable Audit Ledger',
    body: 'Every decision — input, model output, policy evaluation, routing result — is written to a tamper-evident, append-only audit log. Exportable in regulator-specified formats.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    title: 'Role-Based Access Control',
    body: 'Fine-grained RBAC with SSO/SAML integration. Separate roles for model operators, policy editors, auditors, and system admins. All access events are logged.',
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>,
    title: 'Network Isolation',
    body: 'Deployed into a dedicated VPC with no public endpoints. All communication uses private endpoints or VPC peering. Outbound traffic blocked by default on Sovereign tier.',
  },
]

const statusStyle: Record<string, string> = {
  Certified: 'bg-green-500/10 text-green-600 border-green-500/20',
  Ready: 'bg-accent/10 text-accent border-accent/20',
  Compliant: 'bg-accent/10 text-accent border-accent/20',
  'In Progress': 'bg-primary/10 text-primary border-primary/20',
  Roadmap: 'bg-muted text-muted-foreground border-border',
}

export default function Security({ navigate }: NavigateProps) {
  const vpcRef = useRef<HTMLDivElement>(null)
  const vpcProgress = useScrollProgress(vpcRef)
  // 5 layers, each activates at 0.2, 0.4, 0.6, 0.8, 1.0
  const activeLayer = Math.min(4, Math.floor(vpcProgress * 5))

  return (
    <div>
      <PageHeader
        eyebrow="Security & Compliance"
        heading="Built for the infosec reviewer, not just the buyer"
        description="This page is designed to be forwarded to your CISO and compliance team. Every claim is backed by controls you can inspect, audit, and test in your own environment."
      />

      {/* ── Scroll-driven VPC architecture ─── */}
      <div ref={vpcRef} style={{ height: '500vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: '64px', height: 'calc(100vh - 64px)', display: 'flex', overflow: 'hidden', borderTop: '1px solid var(--border)' }}>

          {/* LEFT: layer description */}
          <div style={{ width: '42%', background: 'var(--background)', padding: '0 48px 0 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div key={activeLayer} style={{ animation: 'fade-up 0.4s cubic-bezier(0.16,1,0.3,1) both' }}>
              <div style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', color: 'var(--accent)', letterSpacing: '0.12em', marginBottom: 16 }}>
                VPC ARCHITECTURE · LAYER 0{activeLayer + 1}
              </div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 600, color: 'var(--foreground)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 16 }}>
                {[
                  'Your VPC Boundary',
                  'Network Perimeter',
                  'Model Inference Layer',
                  'Policy & Decision Engine',
                  'Audit & Compliance Layer',
                ][activeLayer]}
              </h2>
              <p style={{ fontSize: 15, color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: 24 }}>
                {[
                  'BPOptima deploys entirely inside your cloud environment. All compute, storage, and network traffic remains within the boundary you control.',
                  'A dedicated security group and VPN gateway ensure no inbound traffic reaches model compute without explicit authorization. Egress is blocked by default.',
                  'Model weights are loaded once at deployment time and never leave the VPC. Inference happens on isolated compute — no calls to external endpoints.',
                  'The policy engine evaluates deterministic rules against model output. Every evaluation is logged with the exact rule, version, and input state.',
                  'Every decision is written to a tamper-evident audit ledger inside your VPC. SHA-256 fingerprinted, exportable in regulator-ready formats.',
                ][activeLayer]}
              </p>

              {/* Layer progress bar */}
              <div style={{ display: 'flex', gap: 4 }}>
                {[0,1,2,3,4].map(n => (
                  <div key={n} style={{
                    flex: n === activeLayer ? 3 : 1,
                    height: 2, borderRadius: 1,
                    background: n === activeLayer ? 'var(--accent)' : n < activeLayer ? 'rgba(0,200,180,0.35)' : 'var(--border)',
                    transition: 'flex 0.4s ease, background 0.4s ease',
                  }} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: VPC diagram */}
          <div style={{ flex: 1, background: '#0B1220', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 48px' }}>

            {/* Grid overlay */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,200,180,0.015) 1px, transparent 1px), linear-gradient(to right, rgba(0,200,180,0.015) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

            {/* VPC diagram — outer boundary always visible, layers activate progressively */}
            <div style={{ width: '100%', maxWidth: 420, position: 'relative' }}>

              {/* Outer VPC boundary */}
              <div style={{
                border: `1.5px dashed ${activeLayer >= 0 ? 'rgba(0,200,180,0.5)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 12, padding: '20px 24px',
                transition: 'border-color 0.6s ease',
                position: 'relative',
              }}>
                {/* VPC label */}
                <div style={{ position: 'absolute', top: -10, left: 16, background: '#0B1220', padding: '0 8px', fontSize: 8, fontFamily: 'JetBrains Mono, monospace', color: activeLayer >= 0 ? '#00C8B4' : '#3E5068', letterSpacing: '0.12em', transition: 'color 0.6s ease' }}>
                  CUSTOMER VPC
                </div>

                {/* Layer 1: Network perimeter */}
                <div style={{
                  border: `1px solid ${activeLayer >= 1 ? 'rgba(0,200,180,0.25)' : 'rgba(255,255,255,0.04)'}`,
                  borderRadius: 8, padding: '12px 16px', marginBottom: 8,
                  background: activeLayer >= 1 ? 'rgba(0,200,180,0.03)' : 'transparent',
                  transition: 'all 0.5s ease',
                  opacity: activeLayer >= 1 ? 1 : 0.2,
                }}>
                  <div style={{ fontSize: 8, fontFamily: 'JetBrains Mono, monospace', color: activeLayer >= 1 ? '#00C8B4' : '#3E5068', letterSpacing: '0.1em', marginBottom: 8, transition: 'color 0.5s ease' }}>NETWORK LAYER</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['VPN GATEWAY', 'FIREWALL', 'SECURITY GROUP'].map((item) => (
                      <div key={item} style={{ flex: 1, padding: '4px 8px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4, textAlign: 'center', fontSize: 7, fontFamily: 'JetBrains Mono, monospace', color: '#6B85A0' }}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connecting line 1→2 */}
                <div style={{ display: 'flex', justifyContent: 'center', height: 12, alignItems: 'center' }}>
                  <div style={{ width: 1, height: '100%', background: activeLayer >= 2 ? 'rgba(0,200,180,0.3)' : 'rgba(255,255,255,0.04)', transition: 'background 0.5s ease' }} />
                </div>

                {/* Layer 2: Model inference */}
                <div style={{
                  border: `1px solid ${activeLayer >= 2 ? 'rgba(11,95,174,0.4)' : 'rgba(255,255,255,0.04)'}`,
                  borderRadius: 8, padding: '12px 16px', marginBottom: 8,
                  background: activeLayer >= 2 ? 'rgba(11,95,174,0.06)' : 'transparent',
                  transition: 'all 0.5s ease',
                  opacity: activeLayer >= 2 ? 1 : 0.2,
                }}>
                  <div style={{ fontSize: 8, fontFamily: 'JetBrains Mono, monospace', color: activeLayer >= 2 ? '#0B5FAE' : '#3E5068', letterSpacing: '0.1em', marginBottom: 8, transition: 'color 0.5s ease' }}>MODEL INFERENCE</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['GROUNDSET LOGIC', 'GROUNDSET VISION'].map((item) => (
                      <div key={item} style={{ flex: 1, padding: '4px 8px', border: '1px solid rgba(11,95,174,0.2)', borderRadius: 4, textAlign: 'center', fontSize: 7, fontFamily: 'JetBrains Mono, monospace', color: '#6B85A0' }}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connecting line 2→3 */}
                <div style={{ display: 'flex', justifyContent: 'center', height: 12, alignItems: 'center' }}>
                  <div style={{ width: 1, height: '100%', background: activeLayer >= 3 ? 'rgba(0,200,180,0.3)' : 'rgba(255,255,255,0.04)', transition: 'background 0.5s ease' }} />
                </div>

                {/* Layer 3: Policy engine */}
                <div style={{
                  border: `1px solid ${activeLayer >= 3 ? 'rgba(0,200,180,0.3)' : 'rgba(255,255,255,0.04)'}`,
                  borderRadius: 8, padding: '12px 16px', marginBottom: 8,
                  background: activeLayer >= 3 ? 'rgba(0,200,180,0.04)' : 'transparent',
                  transition: 'all 0.5s ease',
                  opacity: activeLayer >= 3 ? 1 : 0.2,
                }}>
                  <div style={{ fontSize: 8, fontFamily: 'JetBrains Mono, monospace', color: activeLayer >= 3 ? '#00C8B4' : '#3E5068', letterSpacing: '0.1em', marginBottom: 8, transition: 'color 0.5s ease' }}>POLICY ENGINE</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['RULE EVAL', 'DECISION', 'ROUTING'].map((item) => (
                      <div key={item} style={{ flex: 1, padding: '4px 8px', border: '1px solid rgba(0,200,180,0.15)', borderRadius: 4, textAlign: 'center', fontSize: 7, fontFamily: 'JetBrains Mono, monospace', color: '#6B85A0' }}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connecting line 3→4 */}
                <div style={{ display: 'flex', justifyContent: 'center', height: 12, alignItems: 'center' }}>
                  <div style={{ width: 1, height: '100%', background: activeLayer >= 4 ? 'rgba(0,200,180,0.3)' : 'rgba(255,255,255,0.04)', transition: 'background 0.5s ease' }} />
                </div>

                {/* Layer 4: Audit ledger */}
                <div style={{
                  border: `1px solid ${activeLayer >= 4 ? 'rgba(0,200,180,0.35)' : 'rgba(255,255,255,0.04)'}`,
                  borderRadius: 8, padding: '12px 16px',
                  background: activeLayer >= 4 ? 'rgba(0,200,180,0.05)' : 'transparent',
                  transition: 'all 0.5s ease',
                  opacity: activeLayer >= 4 ? 1 : 0.2,
                }}>
                  <div style={{ fontSize: 8, fontFamily: 'JetBrains Mono, monospace', color: activeLayer >= 4 ? '#00C8B4' : '#3E5068', letterSpacing: '0.1em', marginBottom: 8, transition: 'color 0.5s ease' }}>AUDIT LEDGER</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ flex: 1, padding: '4px 8px', border: '1px solid rgba(0,200,180,0.15)', borderRadius: 4, textAlign: 'center', fontSize: 7, fontFamily: 'JetBrains Mono, monospace', color: '#6B85A0' }}>SHA-256 SIGNED</div>
                    <div style={{ flex: 1, padding: '4px 8px', border: '1px solid rgba(0,200,180,0.15)', borderRadius: 4, textAlign: 'center', fontSize: 7, fontFamily: 'JetBrains Mono, monospace', color: '#6B85A0' }}>APPEND-ONLY</div>
                    {activeLayer >= 4 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00C8B4" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                        <span style={{ fontSize: 8, fontFamily: 'JetBrains Mono, monospace', color: '#00C8B4' }}>ACTIVE</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Zero egress label at bottom */}
                {activeLayer >= 1 && (
                  <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px 12px', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 5, background: 'rgba(239,68,68,0.04)' }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#EF4444' }} />
                    <span style={{ fontSize: 8, fontFamily: 'JetBrains Mono, monospace', color: '#EF4444', letterSpacing: '0.08em' }}>ZERO DATA EGRESS · ENFORCED BY ARCHITECTURE</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture diagram */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <h2 className="text-xl font-semibold text-foreground mb-2 tracking-tight">Deployment Architecture</h2>
            <p className="text-sm text-muted-foreground mb-10">All compute stays inside your network perimeter. BPOptima has no access to your data at runtime.</p>
          </Reveal>
          <Reveal delay={80}>
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="p-8 border-b border-border">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-xs font-mono-data text-accent uppercase tracking-widest">Your VPC / On-premises</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {['Input Sources', 'Ingestion Layer', 'Groundset™ SLMs', 'Policy Engine', 'Audit Ledger'].map((label, i) => (
                    <div key={label} className="relative">
                      <div
                        className="p-3 rounded-lg border border-border bg-background text-center card-interactive"
                        style={{ cursor: 'default' }}
                      >
                        <div className="text-xs font-mono-data text-foreground mb-0.5">{label}</div>
                        <div className="text-[10px] text-muted-foreground">
                          {['Docs/Images/Audio', 'Normalize + route', 'In-VPC inference', 'Deterministic eval', 'Tamper-evident'][i]}
                        </div>
                      </div>
                      {i < 4 && (
                        <div className="hidden md:flex absolute top-1/2 -right-1.5 -translate-y-1/2 z-10 text-muted-foreground">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-8 py-3 bg-muted/30 border-b border-dashed border-border flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted-foreground">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span className="text-xs font-mono-data text-muted-foreground">Network boundary — zero outbound traffic in Sovereign tier</span>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  <span className="text-xs font-mono-data text-muted-foreground uppercase tracking-widest">BPOptima — no runtime access</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Software Updates\n(offline/air-gap option)', 'Model Weight Delivery\n(signed, verified)', 'Support Access\n(break-glass, audited)'].map(label => (
                    <div key={label} className="p-3 rounded-lg border border-dashed border-border text-center">
                      <div className="text-[11px] text-muted-foreground font-mono-data whitespace-pre-line">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Controls */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal>
          <h2 className="text-xl font-semibold text-foreground mb-2 tracking-tight">Security Controls</h2>
          <p className="text-sm text-muted-foreground mb-10">Core controls that apply to every deployment tier.</p>
        </Reveal>
        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={50}>
          {controls.map((control, i) => (
            <div key={i} className="p-6 rounded-xl border border-border bg-card card-interactive" style={{ cursor: 'default' }}>
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4" style={{ transition: 'background 0.2s ease, transform 0.2s ease' }}>
                {control.icon}
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{control.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{control.body}</p>
            </div>
          ))}
        </Stagger>
      </section>

      {/* Certifications */}
      <section className="border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <h2 className="text-xl font-semibold text-foreground mb-2 tracking-tight">Compliance & Certifications</h2>
            <p className="text-sm text-muted-foreground mb-10">Current status and roadmap. Security documentation available under NDA.</p>
          </Reveal>
          <div className="space-y-3">
            {certifications.map((cert, i) => (
              <Reveal key={i} delay={i * 50}>
                <div
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-xl border border-border bg-background"
                  style={{ transition: 'background 0.2s ease, border-color 0.2s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--card)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--background)')}
                >
                  <div>
                    <div className="text-sm font-semibold text-foreground">{cert.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{cert.desc}</div>
                  </div>
                  <span className={`flex-shrink-0 inline-flex text-[11px] font-mono-data font-medium px-3 py-1 rounded-full border self-start sm:self-auto ${statusStyle[cert.status]}`}>
                    {cert.status}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal>
          <SectionCTA heading="Security review package" sub="Architecture diagrams, pen test reports, SOC 2 report — under NDA for qualified evaluators." cta="Request Security Docs" onClick={() => navigate('contact')} />
        </Reveal>
      </section>
    </div>
  )
}
