import { useState, useEffect, useRef } from 'react'
import type { Page } from '../types'
import { Reveal, Stagger } from '../components/Reveal'
import { Toggle } from '../components/Toggle'
import { useInView, useCountUp } from '../hooks/useInView'
import antlerLogo from '@/imports/antler-logo.svg'
import logoAiralo from '@/imports/logo-airalo.png'
import logoFileAI from '@/imports/logo-fileai.png'
import logoMicro1 from '@/imports/logo-micro1.png'
import logoLovable from '@/imports/logo-lovable.svg'

interface HomeProps {
  navigate: (page: Page) => void
}

/* ─── Stat tile with count-up ───────────────────────────── */
function StatTile({
  numericValue,
  prefix = '',
  suffix = '',
  label,
  detail,
  active,
  delay = 0,
}: {
  numericValue: number
  prefix?: string
  suffix?: string
  label: string
  detail: string
  active: boolean
  delay?: number
}) {
  const { ref, inView } = useInView()
  const count = useCountUp(numericValue, 1200, inView && active)
  return (
    <div
      ref={ref}
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'none' : 'translateY(8px)',
        transition: `opacity 0.4s ease ${delay}ms, transform 0.4s ease ${delay}ms`,
      }}
    >
      <div className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-1 tabular-nums">
        {prefix}{active ? count : numericValue}{suffix}
      </div>
      <div className="text-sm font-medium text-foreground mb-0.5">{label}</div>
      <div className="text-xs text-muted-foreground">{detail}</div>
    </div>
  )
}

const techStats = [
  { numericValue: 100, prefix: '<', suffix: 'ms', label: 'Decision latency', detail: 'P99, under full load' },
  { numericValue: 6, prefix: '', suffix: ' SLMs', label: 'Domain models', detail: 'Finance, health, insurance + more' },
  { numericValue: 99.97, prefix: '', suffix: '%', label: 'Uptime SLA', detail: 'Contractually guaranteed' },
  { numericValue: 0, prefix: '', suffix: ' bytes', label: 'Leaves your VPC', detail: 'Air-gapped by architecture' },
]
const businessStats = [
  { numericValue: 4.2, prefix: '', suffix: '×', label: 'Faster approvals', detail: 'Avg. across loan + claims workflows' },
  { numericValue: 94, prefix: '', suffix: '%', label: 'Manual review reduction', detail: 'Straight-through processing rate' },
  { numericValue: 2.21, prefix: '$', suffix: 'M', label: 'Avg. annual savings', detail: 'Per regulated workflow automated' },
  { numericValue: 12, prefix: '', suffix: ' wks', label: 'Time to production', detail: 'Including model tuning + compliance review' },
]
const logoRow = [
  { src: logoMicro1, alt: 'Micro1', h: 'h-6' },
  { src: logoAiralo, alt: 'Airalo', h: 'h-5' },
  { src: logoFileAI, alt: 'FileAI', h: 'h-5' },
  { src: logoLovable, alt: 'Lovable', h: 'h-5' },
]

const pipelineStages = [
  { num: '01', label: 'UNDERSTAND', title: 'Understand the Input', body: 'BPOptima parses documents, logs, and mixed evidence into structured signals inside your VPC so every downstream action has context.' },
  { num: '02', label: 'DECIDE', title: 'Decide Deterministically', body: 'Policy logic evaluates extracted facts and produces a repeatable decision path with confidence, rationale, and compliance traceability.' },
  { num: '03', label: 'ROUTE', title: 'Route to the Right Next Step', body: 'Each case is routed to auto-approve, escalation, or review queues with the full evidence graph attached for humans and systems.' },
]

/* ─── Scroll progress hook ───────────────────────────────── */
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

const stageHeadings = [
  '',
  'Evidence Enters Your Infrastructure',
  'Domain Models Extract Structure',
  'Router Selects the Right Model',
  'Deterministic Rules Evaluate',
  'A Decision Is Emitted',
  'Every Step Immutably Recorded',
]

const stageBodies = [
  '',
  'Every piece of unstructured evidence enters BPOptima inside your own VPC boundary. No data leaves your perimeter. No external API calls.',
  'Groundset™ SLMs trained on regulated-industry corpora parse the evidence and extract high-confidence structured fields specific to your document type.',
  'The Groundset Router analyzes modality, complexity, and latency target to dispatch to the appropriate domain model — not one model for everything.',
  'The policy engine evaluates extracted data against your compliance rules. Every check is traceable to a specific policy line and fully inspectable.',
  'Approve, escalate, or review — the same input always produces the same output. Confidence score and latency included with every decision.',
  'Evidence hash, model version, policy version, decision, and timestamp written to an immutable audit ledger inside your VPC. Defensible to any regulator.',
]

const stageLabels = ['', 'EVIDENCE', 'UNDERSTAND', 'ROUTE', 'POLICY', 'DECISION', 'AUDIT']

/* ─── Palette + helpers (shared with cube faces) ────────── */
const CY = '#00C8B4'
const DARK_BG = '#0B1220'
const T1 = '#E8EDF5'
const T2 = '#6B85A0'
const T3 = '#3E5068'

const mono = (size: number, color: string, ls = '0.1em'): React.CSSProperties => ({
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: size,
  color,
  letterSpacing: ls,
})

const faceMeta = [
  { num: '00', label: 'INTAKE' },
  { num: '01', label: 'EVIDENCE' },
  { num: '02', label: 'UNDERSTAND' },
  { num: '03', label: 'ROUTE' },
  { num: '04', label: 'POLICY' },
  { num: '05', label: 'DECISION' },
  { num: '06', label: 'AUDIT' },
]

/* ─── Cube face content — pure DOM/SVG, no image assets ─── */
function FaceContent({ stage }: { stage: number }) {
  const meta = faceMeta[stage]
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: CY, boxShadow: `0 0 6px ${CY}`, animation: 'pulse-dot 2s ease-in-out infinite' }} />
        <span style={mono(9, CY, '0.14em')}>{meta.num} · {meta.label}</span>
        <span style={{ marginLeft: 'auto', ...mono(8, T3, '0.12em') }}>GROUNDSET</span>
      </div>

      {stage === 0 && (
        <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={mono(9, T2, '0.12em')}>CLAIM-4821 · INSPECTION.PDF</div>
          <div style={{ position: 'relative', height: 108, borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)', background: 'repeating-linear-gradient(45deg, rgba(0,200,180,0.05) 0 2px, transparent 2px 12px), #0A1322', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${CY}, transparent)`, boxShadow: `0 0 12px ${CY}`, animation: 'scan-y 3s ease-in-out infinite' }} />
            <span style={{ position: 'absolute', bottom: 8, left: 10, ...mono(8, T3, '0.12em') }}>IMG · VEHICLE FRONT</span>
          </div>
          {[92, 76, 84, 58].map((w, i) => (
            <div key={i} style={{ height: 7, width: `${w}%`, borderRadius: 4, background: 'rgba(255,255,255,0.07)' }} />
          ))}
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>
            <span style={mono(8, T3, '0.12em')}>PDF · IMG · AUDIO</span>
            <span style={mono(8, CY, '0.12em')}>AWAITING INGESTION</span>
          </div>
        </div>
      )}

      {stage === 1 && (
        <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, border: '1.5px dashed rgba(0,200,180,0.45)', borderRadius: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 16 }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={CY} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <span style={mono(9, CY, '0.14em')}>CUSTOMER VPC · SEALED</span>
            <span style={{ textAlign: 'center', lineHeight: 1.8, ...mono(9, T2, '0.1em') }}>EVIDENCE RECEIVED<br />FINGERPRINTING···</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12 }}>
            <span style={mono(8, T3, '0.1em')}>SHA-256 · 7f8a···91c2</span>
            <span style={mono(8, CY, '0.1em')}>0 BYTES EGRESS</span>
          </div>
        </div>
      )}

      {stage === 2 && (
        <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <span style={mono(9, CY, '0.14em')}>EXTRACTING</span>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: CY, animation: `blink 1.2s ease-in-out ${i * 0.2}s infinite` }} />
            ))}
          </div>
          {[
            ['damage_type', 'front_collision'],
            ['severity', '9.2 / 10'],
            ['vehicle_part', 'bumper, grille'],
            ['confidence', '98.8%'],
            ['latency', '36ms'],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={mono(10, T2)}>{k}</span>
              <span style={mono(10, CY)}>{v}</span>
            </div>
          ))}
        </div>
      )}

      {stage === 3 && (
        <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ border: '1px solid rgba(0,200,180,0.25)', borderRadius: 8, background: 'rgba(0,200,180,0.03)', padding: '12px 16px', width: '100%' }}>
            <div style={{ marginBottom: 8, ...mono(9, CY, '0.14em') }}>GROUNDSET ROUTER</div>
            {[['MODALITY', 'VISION'], ['COMPLEXITY', 'HIGH'], ['LATENCY', 'LOW']].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={mono(9, T2)}>{k}</span>
                <span style={mono(9, T1)}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ width: 1, height: 20, background: 'rgba(0,200,180,0.4)' }} />
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            {[
              { name: 'VISION', active: true },
              { name: 'AUDIO', active: false },
              { name: 'MOTION', active: false },
            ].map(m => (
              <div key={m.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 1, height: 12, background: m.active ? 'rgba(0,200,180,0.4)' : 'rgba(255,255,255,0.06)' }} />
                <div style={{ border: m.active ? `1px solid ${CY}` : '1px solid rgba(255,255,255,0.08)', borderRadius: 6, padding: '6px 12px', ...mono(9, m.active ? CY : T3) }}>
                  {m.name}
                </div>
                {m.active && <span style={mono(7, CY, '0.1em')}>SELECTED</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {stage === 4 && (
        <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: 10, ...mono(9, T2, '0.1em') }}>POLICY · VEHICLE-INSPECTION-V3</div>
          <div style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: 6, overflow: 'hidden' }}>
            {[
              { rule: 'R01', condition: 'severity < 8.5', result: '✗', pass: false },
              { rule: 'R02', condition: 'confidence > 0.90', result: '✓', pass: true },
              { rule: 'R03', condition: 'part in whitelist', result: '✓', pass: true },
              { rule: 'R04', condition: 'latency < 100ms', result: '✓', pass: true },
            ].map(row => (
              <div key={row.rule} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', background: row.pass ? 'rgba(34,197,94,0.03)' : 'rgba(239,68,68,0.05)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span style={mono(9, T3)}>{row.rule}</span>
                <span style={mono(9, T2)}>{row.condition}</span>
                <span style={mono(9, row.pass ? '#22C55E' : '#EF4444')}>{row.result}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 10, padding: '8px 12px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 6 }}>
            <span style={mono(9, '#F59E0B')}>→ ESCALATE · 1 rule failed</span>
          </div>
        </div>
      )}

      {stage === 5 && (
        <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <span style={mono(8, T3, '0.16em')}>DETERMINISTIC OUTPUT</span>
          <span style={{ fontSize: 38, fontWeight: 700, color: '#F59E0B', letterSpacing: '0.06em' }}>ESCALATE</span>
          <div style={{ width: '100%', border: '1px solid rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.04)', borderRadius: 8, padding: '8px 14px' }}>
            {[['CONFIDENCE', '91.2%'], ['LATENCY', '87ms'], ['POLICY', 'VEH-INS-V3']].map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: i < 2 ? '1px solid rgba(245,158,11,0.08)' : 'none' }}>
                <span style={mono(9, 'rgba(245,158,11,0.6)')}>{k}</span>
                <span style={mono(9, '#F59E0B')}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {stage === 6 && (
        <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ border: '1px solid rgba(0,200,180,0.15)', background: 'rgba(0,200,180,0.02)', borderRadius: 8, overflow: 'hidden', marginBottom: 12 }}>
            {[
              ['TIMESTAMP', '14:41:08.201'],
              ['MODEL', 'Groundset-Vision'],
              ['POLICY', 'VEH-INS-V3'],
              ['DECISION', 'ESCALATE'],
              ['HASH', '7f8a···91c2'],
            ].map(([k, v], i) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 12px', borderBottom: i < 4 ? '1px solid rgba(0,200,180,0.06)' : 'none' }}>
                <span style={mono(9, T3)}>{k}</span>
                <span style={mono(9, k === 'DECISION' ? '#F59E0B' : CY)}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={CY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            <span style={mono(9, CY, '0.08em')}>RECORD CREATED · SHA-256 SIGNED</span>
          </div>
        </div>
      )}
    </>
  )
}

export default function Home({ navigate }: HomeProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const pipelineRef = useRef<HTMLDivElement>(null)
  const heroProgress = useScrollProgress(heroRef)
  const pipelineProgress = useScrollProgress(pipelineRef)

  // Cube scrub: 0→6 with a short hold on the final stage
  const sf = Math.min(6, heroProgress * 6.6)
  const heroStage = Math.min(6, Math.max(0, Math.round(sf)))
  const pipelineStage = Math.min(2, Math.max(0, Math.floor(pipelineProgress * 3)))
  const ribbonX = -(pipelineProgress * 200)

  // Cube transform — tied 1:1 to scroll for a scrubbed, video-like feel
  const rotY = -sf * 90
  const rotX = -12 + 5 * Math.sin((sf * Math.PI) / 3)
  const cubeScale = 1 - 0.12 * Math.abs(Math.sin(sf * Math.PI))

  // Each physical face shows the pipeline stage closest to current scroll
  const faceStage = (f: number): number => {
    if (f + 4 > 6) return f
    return Math.abs(sf - f) <= Math.abs(sf - (f + 4)) ? f : f + 4
  }

  // Left panel fade values
  const leftHeroOp = Math.max(0, Math.min(1, (0.55 - sf) / 0.35))
  const leftStageOp = Math.max(0, Math.min(1, (sf - 0.45) / 0.35))

  const [audience, setAudience] = useState('tech')
  const isTech = audience === 'tech'
  const stats = isTech ? techStats : businessStats

  return (
    <div>
      {/* ── Section A: Hero scroll sequence — 3D cube (420vh) ── */}
      <div ref={heroRef} style={{ height: '420vh', position: 'relative' }}>
        <div className="hero-sticky">

          {/* LEFT PANEL */}
          <div className="hero-left">

            {/* Layer 1: Stage 0 hero text */}
            <div className="hero-pad" style={{
              position: 'absolute', inset: 0,
              opacity: leftHeroOp,
              pointerEvents: leftHeroOp > 0.05 ? 'auto' : 'none',
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 12px', borderRadius: 9999,
                border: '1px solid var(--border)', background: 'var(--card)',
                fontSize: 11, fontFamily: 'var(--font-mono, monospace)',
                color: 'var(--muted-foreground)', marginBottom: 32,
                alignSelf: 'flex-start',
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: CY, display: 'inline-block',
                  animation: 'pulse 2s ease-in-out infinite',
                }} />
                Sovereign Decision Infrastructure · In-VPC AI
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1.08,
                color: 'var(--foreground)',
                marginBottom: 20,
                letterSpacing: '-0.02em',
              }}>
                Turn Documents Into{' '}
                <em style={{ fontFamily: "'Instrument Serif', Georgia, serif", color: 'var(--primary)', fontStyle: 'italic' }}>
                  Deterministic
                </em>{' '}
                Decisions
              </h1>

              <p style={{ fontSize: 16, color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: 32, maxWidth: 420 }}>
                Domain-trained AI deployed inside your VPC — not a cloud API. Every decision is audited, explainable, and defensible to your regulators with zero data leaving your perimeter.
              </p>

              <div style={{ display: 'flex', gap: 12, marginBottom: 40, flexWrap: 'wrap' }}>
                <button onClick={() => navigate('how-it-works')} className="btn btn-primary">
                  See How It Works
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
                <button onClick={() => navigate('contact')} className="btn btn-ghost">
                  Talk to Sales
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 20px' }}>
                {['SOC 2 Type II', 'HIPAA Ready', 'ISO 27001', 'In-VPC', 'Full Audit'].map(b => (
                  <span key={b} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 11, fontFamily: 'var(--font-mono, monospace)',
                    color: 'var(--muted-foreground)',
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Layer 2: Stages 1-6 */}
            <div className="hero-pad" style={{
              position: 'absolute', inset: 0,
              opacity: leftStageOp,
              display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              {heroStage > 0 && (
                <div key={heroStage} style={{ animation: 'fade-up 0.45s cubic-bezier(0.16,1,0.3,1) both' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                    <span style={{
                      fontFamily: 'var(--font-mono, monospace)', fontSize: 9,
                      color: CY, letterSpacing: '0.12em',
                    }}>
                      0{heroStage} · {stageLabels[heroStage]}
                    </span>
                    <div style={{ flex: 1, height: 1, background: 'rgba(0,200,180,0.2)' }} />
                  </div>

                  <h2 style={{
                    fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                    fontWeight: 600,
                    lineHeight: 1.15,
                    color: 'var(--foreground)',
                    marginBottom: 16,
                    letterSpacing: '-0.02em',
                  }}>
                    {stageHeadings[heroStage]}
                  </h2>

                  <p style={{ fontSize: 15, color: 'var(--muted-foreground)', lineHeight: 1.7, marginBottom: 40, maxWidth: 420 }}>
                    {stageBodies[heroStage]}
                  </p>

                  {/* Progress bar: 6 segments */}
                  <div style={{ display: 'flex', gap: 4, height: 3 }}>
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <div key={n} style={{
                        flex: n === Math.min(6, Math.round(sf)) ? 3 : 1,
                        height: '100%',
                        borderRadius: 2,
                        background: n === Math.min(6, Math.round(sf)) ? CY : n < Math.round(sf) ? 'rgba(0,200,180,0.35)' : 'var(--border)',
                      }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="hero-right" style={{ background: DARK_BG }}>
            {/* Grid overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `linear-gradient(to right, rgba(0,200,180,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,200,180,0.02) 1px, transparent 1px)`,
              backgroundSize: '48px 48px',
              pointerEvents: 'none',
            }} />

            {/* ── 3D CUBE SCENE ── */}
            <div className="cube-wrap">
              {/* Ambient glow */}
              <div style={{ position: 'absolute', width: 620, height: 620, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,200,180,0.09), transparent 65%)', filter: 'blur(8px)' }} />

              <div className="cube-scale">
                <div style={{
                  width: 380, height: 380, position: 'relative',
                  transformStyle: 'preserve-3d',
                  transform: `scale(${cubeScale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                }}>
                  {[0, 1, 2, 3].map(f => (
                    <div key={f} className="cube-face" style={{ transform: `rotateY(${f * 90}deg) translateZ(190px)` }}>
                      <FaceContent stage={faceStage(f)} />
                    </div>
                  ))}
                  <div className="cube-cap" style={{ transform: 'rotateX(90deg) translateZ(190px)' }} />
                  <div className="cube-cap" style={{ transform: 'rotateX(-90deg) translateZ(190px)' }} />
                </div>
              </div>

              {/* Floor reflection */}
              <div style={{ position: 'absolute', bottom: '10%', width: 440, height: 60, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,200,180,0.13), transparent 70%)', filter: 'blur(14px)' }} />

              {/* Scroll hint */}
              <div style={{ position: 'absolute', bottom: 44, left: '50%', transform: 'translateX(-50%)', opacity: Math.max(0, 1 - sf * 3), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, pointerEvents: 'none' }}>
                <span style={mono(8, T2, '0.24em')}>SCROLL</span>
                <div style={{ width: 1, height: 28, background: `linear-gradient(${CY}, transparent)` }} />
              </div>
            </div>







            {/* Progress bar at bottom of right panel: 7 segments */}
            <div style={{ position: 'absolute', bottom: 20, left: 24, right: 24, display: 'flex', gap: 4, height: 3 }}>
              {[0, 1, 2, 3, 4, 5, 6].map(n => (
                <div key={n} style={{
                  flex: n === Math.min(6, Math.round(sf)) ? 3 : 1,
                  height: '100%',
                  borderRadius: 2,
                  background: n <= Math.floor(sf) ? (n === Math.floor(sf) ? CY : 'rgba(0,200,180,0.35)') : 'rgba(255,255,255,0.08)',
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Section B: Logos ─────────────────────────────────── */}
      <section className="border-t border-border" style={{ background: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <Reveal>
              <p className="text-[11px] font-mono-data text-muted-foreground uppercase tracking-widest mb-6">Backed by</p>
              <img
                src={antlerLogo}
                alt="Antler"
                className="h-9 object-contain"
                style={{ opacity: 0.6, transition: 'opacity 0.25s ease, filter 0.25s ease', filter: 'grayscale(30%)' }}
                onMouseEnter={e => { (e.target as HTMLImageElement).style.opacity = '1'; (e.target as HTMLImageElement).style.filter = 'grayscale(0%)' }}
                onMouseLeave={e => { (e.target as HTMLImageElement).style.opacity = '0.6'; (e.target as HTMLImageElement).style.filter = 'grayscale(30%)' }}
              />
            </Reveal>

            <Reveal delay={80}>
              <p className="text-[11px] font-mono-data text-muted-foreground uppercase tracking-widest mb-6">Trusted by</p>
              <div className="flex flex-wrap items-center gap-8">
                {logoRow.map((logo, i) => (
                  <img
                    key={logo.alt}
                    src={logo.src}
                    alt={logo.alt}
                    className={`${logo.h} object-contain`}
                    style={{
                      opacity: 0.5,
                      filter: 'grayscale(100%)',
                      transition: `opacity 0.25s ease ${i * 30}ms, filter 0.25s ease ${i * 30}ms, transform 0.25s ease`,
                    }}
                    onMouseEnter={e => {
                      const el = e.target as HTMLImageElement
                      el.style.opacity = '0.95'
                      el.style.filter = 'grayscale(0%)'
                      el.style.transform = 'scale(1.04)'
                    }}
                    onMouseLeave={e => {
                      const el = e.target as HTMLImageElement
                      el.style.opacity = '0.5'
                      el.style.filter = 'grayscale(100%)'
                      el.style.transform = 'scale(1)'
                    }}
                  />
                ))}
                {[0, 1].map(i => (
                  <div key={i} className="h-6 w-28 rounded-md border border-dashed border-border flex items-center justify-center">
                    <span className="text-[10px] text-muted-foreground font-mono-data">Your logo</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Section C: Proof / Stats ─────────────────────────── */}
      <section className="border-y border-border" style={{ background: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
              <div>
                <p className="text-sm font-medium text-foreground">Proof points for every stakeholder</p>
                <p className="text-xs text-muted-foreground mt-0.5">Switch for the CTO or the CRO in the room</p>
              </div>
              <Toggle
                options={[
                  { label: 'Technical', value: 'tech' },
                  { label: 'Business Impact', value: 'business' },
                ]}
                value={audience}
                onChange={setAudience}
              />
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, i) => (
              <StatTile
                key={`${audience}-${i}`}
                numericValue={stat.numericValue}
                prefix={stat.prefix}
                suffix={stat.suffix}
                label={stat.label}
                detail={stat.detail}
                active={true}
                delay={i * 70}
              />
            ))}
          </div>

          {/* Case study preview cards */}
          <Reveal delay={80}>
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              {[
                { co: 'Airalo', industry: 'Fintech · Telecom', outcome: '$1.2M saved in year one', metrics: [['89%', 'Manual review reduction'], ['11 min', 'Down from 2.1 hours'], ['0', 'Compliance incidents']] },
                { co: 'FileAI', industry: 'Document Intelligence', outcome: '94% straight-through processing', metrics: [['97.4%', 'Extraction accuracy'], ['200K+', 'Docs per day'], ['6 wks', 'Integration time']] },
              ].map(card => (
                <div key={card.co} className="bg-background rounded-xl border border-border p-6 card-interactive" style={{ cursor: 'default' }}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="text-[11px] font-mono-data text-accent uppercase tracking-widest mb-1">{card.industry}</div>
                      <div className="text-base font-semibold text-foreground">{card.co}</div>
                    </div>
                    <div className="text-sm font-medium text-foreground text-right max-w-[160px]">{card.outcome}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                    {card.metrics.map(([val, label]) => (
                      <div key={label}>
                        <div className="text-lg font-semibold text-foreground">{val}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('case-studies')}
              className="text-sm text-primary font-medium inline-flex items-center gap-1.5 group"
            >
              Read all case studies
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.2s ease' }} className="group-hover:translate-x-0.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </Reveal>
        </div>
      </section>

      {/* ── Section D: Moving Ribbon — Understand, Decide, Route ── */}
      <div ref={pipelineRef} style={{ height: '220vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: '64px', height: 'calc(100vh - 64px)', overflow: 'hidden', borderTop: '1px solid var(--border)', background: DARK_BG }}>

          <div style={{ maxWidth: 1380, margin: '0 auto', height: '100%', padding: '26px 10px 34px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10, marginBottom: 16 }}>
              {pipelineStages.map((stage, i) => {
                const isActive = i === pipelineStage
                return (
                  <div key={stage.label} style={{
                    borderRadius: 9999,
                    border: `1px solid ${isActive ? 'rgba(0,200,180,0.45)' : 'rgba(255,255,255,0.12)'}`,
                    background: isActive ? 'rgba(0,200,180,0.1)' : 'rgba(255,255,255,0.03)',
                    textAlign: 'center',
                    padding: '10px 8px',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: 11,
                    letterSpacing: '0.14em',
                    color: isActive ? CY : T2,
                    transition: 'all 0.25s ease',
                  }}>
                    {stage.label}
                  </div>
                )
              })}
            </div>

            <div style={{ position: 'relative', height: 'clamp(260px, 48vh, 360px)', borderRadius: 22, border: '1px solid rgba(255,255,255,0.08)', background: 'linear-gradient(160deg, rgba(17, 25, 40, 0.9), rgba(11, 18, 32, 0.95))', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to right, rgba(0,200,180,0.05) 1px, transparent 1px)', backgroundSize: '32px 100%', pointerEvents: 'none', transform: `translateX(${ribbonX * 0.2}%)` }} />
              <div style={{ position: 'absolute', inset: '0 -40%', background: 'linear-gradient(90deg, transparent 0%, rgba(0,200,180,0.1) 15%, transparent 35%, rgba(0,200,180,0.12) 55%, transparent 75%, rgba(0,200,180,0.1) 95%)', opacity: 0.26, transform: `translateX(${ribbonX}%)`, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, height: 3, width: `${(pipelineProgress * 100).toFixed(2)}%`, background: `linear-gradient(90deg, ${CY}, rgba(0,200,180,0.35))`, transition: 'width 0.1s linear' }} />

              <div key={pipelineStage} style={{ height: '100%', padding: '24px clamp(16px, 3.2vw, 44px)', display: 'flex', alignItems: 'center', animation: 'fade-in 0.16s linear both' }}>
                <div style={{ maxWidth: 640 }}>
                  <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 10, color: CY, letterSpacing: '0.14em', marginBottom: 14 }}>
                    HOW IT WORKS · {pipelineStages[pipelineStage].num}
                  </div>
                  <h2 style={{ fontSize: 'clamp(1.45rem, 3.2vw, 2.6rem)', lineHeight: 1.1, color: T1, letterSpacing: '-0.02em', marginBottom: 12, fontWeight: 600 }}>
                    {pipelineStages[pipelineStage].title}
                  </h2>
                  <p style={{ fontSize: 'clamp(0.92rem, 1.05vw, 1.03rem)', color: T2, lineHeight: 1.65, maxWidth: 580, marginBottom: 18 }}>
                    {pipelineStages[pipelineStage].body}
                  </p>
                  <button
                    onClick={() => navigate('how-it-works')}
                    style={{ fontSize: 13, color: CY, background: 'none', border: '1px solid rgba(0,200,180,0.34)', borderRadius: 9999, cursor: 'pointer', padding: '8px 14px', fontWeight: 500 }}
                  >
                    View full pipeline playground →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section E: Why BPOptima — Visual Contrast ────────── */}
      <section>
        <div className="max-w-7xl mx-auto px-6 py-20">
          <Reveal className="text-center mb-14">
            <p style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 9, color: 'var(--accent)', letterSpacing: '0.14em', marginBottom: 14 }}>WHY BPOPTIMA</p>
            <h2 style={{ fontSize: 'clamp(1.875rem, 4vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--foreground)', marginBottom: 16 }}>
              Not a wrapper around a public model
            </h2>
            <p style={{ color: 'var(--muted-foreground)', maxWidth: 640, margin: '0 auto', lineHeight: 1.7, fontSize: 15 }}>
              Generic AI APIs are built for scale. Regulated operations need something different: determinism, auditability, and zero data egress.
            </p>
          </Reveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Left card: Generic AI API */}
            <div style={{ border: '1px solid rgba(239,68,68,0.15)', background: 'rgba(239,68,68,0.02)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(239,68,68,0.12)' }}>
                <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 9, color: '#EF4444', letterSpacing: '0.12em' }}>GENERIC AI API</span>
              </div>
              <div style={{ padding: 24 }}>
                {/* Flow diagram */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
                  {['Customer Data', 'INTERNET', 'PUBLIC MODEL (Cloud)', 'RESPONSE'].map((item, i) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        padding: '6px 10px', borderRadius: 6, fontSize: 9,
                        fontFamily: 'var(--font-mono, monospace)',
                        border: item === 'INTERNET' || item === 'PUBLIC MODEL (Cloud)' ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.1)',
                        color: item === 'INTERNET' || item === 'PUBLIC MODEL (Cloud)' ? '#EF4444' : T2,
                        background: item === 'INTERNET' || item === 'PUBLIC MODEL (Cloud)' ? 'rgba(239,68,68,0.04)' : 'transparent',
                        whiteSpace: 'nowrap',
                      }}>
                        {item}
                      </div>
                      {i < 3 && <div style={{ width: 16, height: 1, background: 'rgba(239,68,68,0.3)', flexShrink: 0 }} />}
                    </div>
                  ))}
                </div>
                {/* Negatives */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'Data crosses your boundary',
                    'Probabilistic output, no guarantee',
                    'No audit trail',
                    'Shared model infrastructure',
                  ].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: '#EF4444', fontSize: 12, fontWeight: 700 }}>✗</span>
                      <span style={{ fontSize: 13, color: T2 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right card: BPOptima */}
            <div style={{ border: '1px solid rgba(0,200,180,0.2)', background: 'rgba(0,200,180,0.02)', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(0,200,180,0.1)' }}>
                <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 9, color: CY, letterSpacing: '0.12em' }}>BPOPTIMA · IN-VPC</span>
              </div>
              <div style={{ padding: 24 }}>
                {/* Flow diagram */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
                  <div style={{ padding: '6px 10px', borderRadius: 6, fontSize: 9, fontFamily: 'var(--font-mono, monospace)', border: '1px solid rgba(255,255,255,0.1)', color: T2, whiteSpace: 'nowrap' }}>Customer Data</div>
                  <div style={{ width: 16, height: 1, background: `rgba(0,200,180,0.3)`, flexShrink: 0 }} />
                  {/* VPC box */}
                  <div style={{ border: '1.5px dashed rgba(0,200,180,0.5)', borderRadius: 8, padding: '12px 16px', position: 'relative' }}>
                    <div style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: 8, color: CY, letterSpacing: '0.1em', marginBottom: 8 }}>CUSTOMER VPC</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
                      {["Groundset™ Models", "Policy Engine", "Decision", "Audit Ledger"].map((item, i) => (
                        <div key={item} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{ padding: '4px 10px', borderRadius: 4, fontSize: 9, fontFamily: 'var(--font-mono, monospace)', border: '1px solid rgba(0,200,180,0.2)', color: CY, background: 'rgba(0,200,180,0.03)', whiteSpace: 'nowrap' }}>
                            {item}
                          </div>
                          {i < 3 && <div style={{ width: 1, height: 8, background: 'rgba(0,200,180,0.2)' }} />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Positives */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'Zero data leaves your environment',
                    'Deterministic, auditable output',
                    'Full audit trail, SHA-256 signed',
                    'Your model, your policy, your VPC',
                  ].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ color: CY, fontSize: 12, fontWeight: 700 }}>✓</span>
                      <span style={{ fontSize: 13, color: T2 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section F: CTA Banner ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-20 md:pb-28">
        <Reveal>
          <div
            className="rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
            style={{ background: 'var(--primary)' }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-semibold text-primary-foreground tracking-tight mb-4">
                Ready to own your AI decisions?
              </h2>
              <p className="text-primary-foreground/75 max-w-xl mx-auto mb-8 leading-relaxed">
                Deploy sovereign AI inside your own infrastructure in 12 weeks. Talk to our team about your specific regulated workflow.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={() => navigate('contact')}
                  className="btn"
                  style={{
                    background: 'var(--primary-foreground)',
                    color: 'var(--primary)',
                    fontWeight: 600,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  }}
                >
                  Book a Technical Demo
                </button>
                <button
                  onClick={() => navigate('pricing')}
                  className="btn"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    color: 'var(--primary-foreground)',
                    border: '1px solid rgba(255,255,255,0.25)',
                  }}
                >
                  View Packages
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
