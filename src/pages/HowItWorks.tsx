import { useState, useEffect, useRef } from 'react'
import type { NavigateProps } from '../types'
import carOriginal from '@/imports/car-orignal.jpg'
import carLicensePlate from '@/imports/car-license-plate.png'
import carHeadlights from '@/imports/car-headlights.png'
import carGrill from '@/imports/car-grill.png'

// ─── Colour palette — dark / light variants ─────────────────────
const CY = '#00C8B4'
const GREEN = '#22C55E'
const RED = '#EF4444'
const AMBER = '#F59E0B'
const BLUE_ACC = '#3B82F6'

function mkPalette(dark: boolean) {
  return {
    bg:          dark ? '#0B1220'                : '#F4F7FB',
    panelBg:     dark ? 'rgba(9,16,28,0.90)'    : '#FFFFFF',
    cardBg:      dark ? 'rgba(0,0,0,0.25)'       : 'rgba(0,0,0,0.03)',
    innerBg:     dark ? 'rgba(0,0,0,0.35)'       : 'rgba(0,0,0,0.04)',
    toolbarBg:   dark ? 'rgba(0,0,0,0.40)'       : 'rgba(0,0,0,0.05)',
    selBg:       dark ? 'rgba(0,200,180,0.05)'   : 'rgba(0,200,180,0.06)',
    border:      dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.10)',
    borderSub:   dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)',
    T1:          dark ? '#E8EDF5'                : '#0A0F1C',
    T2:          dark ? '#6B85A0'                : '#4B6078',
    T3:          dark ? '#3E5068'                : '#9AA8BA',
    T4:          dark ? '#2A3A50'                : '#D0DAE6',
    headingNote: dark ? 'rgba(0,200,180,0.50)'   : 'rgba(0,160,145,0.70)',
    trackFill:   dark ? 'rgba(0,200,180,0.50)'   : 'rgba(0,200,180,0.60)',
    trackBg:     dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
    gridLine:    dark ? 'rgba(0,200,180,0.025)'  : 'rgba(0,100,90,0.04)',
    radialGlow:  dark ? 'rgba(0,200,180,0.038)'  : 'rgba(0,200,180,0.06)',
    ctaBg:       dark ? 'rgba(15,25,41,0.70)'    : '#FFFFFF',
    badgeBg:     dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)',
    badgeBorder: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)',
    footerBorder:dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)',
    scrollHint:  dark ? 'linear-gradient(to top,rgba(9,16,28,0.9),transparent)' : 'linear-gradient(to top,rgba(244,247,251,0.9),transparent)',
  }
}

type DocType = 'loan' | 'vehicle' | 'complaint'

const STAGE_LABELS: Record<DocType, string[]> = {
  loan:      ['EVIDENCE', 'OCR',    'STRUCTURED', 'POLICY', 'DECISION', 'AUDIT'],
  vehicle:   ['EVIDENCE', 'VISION', 'STRUCTURED', 'POLICY', 'DECISION', 'AUDIT'],
  complaint: ['EVIDENCE', 'OCR',    'STRUCTURED', 'POLICY', 'DECISION', 'AUDIT'],
}

// ─── Primitive atoms ──────────────────────────────────────────────

function MonoBadge({ children, color, bg }: { children: React.ReactNode; color: string; bg?: string }) {
  return (
    <span style={{
      fontSize: 9, fontFamily: 'JetBrains Mono', letterSpacing: '0.08em',
      background: bg ?? `color-mix(in srgb, ${color} 10%, transparent)`,
      border: `1px solid color-mix(in srgb, ${color} 22%, transparent)`,
      color, padding: '2px 6px', borderRadius: 4,
    }}>{children}</span>
  )
}

function DarkToolbar({ left, right, p }: { left: React.ReactNode; right: React.ReactNode; p: ReturnType<typeof mkPalette> }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '7px 12px', background: p.toolbarBg,
      borderBottom: `1px solid ${p.border}`, gap: 8, flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>{left}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>{right}</div>
    </div>
  )
}

function PreviewBtn({ onClick, p }: { onClick: () => void; p: ReturnType<typeof mkPalette> }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 4,
      fontSize: 9, fontFamily: 'JetBrains Mono', color: p.T2,
      padding: '2px 8px', borderRadius: 4,
      border: `1px solid ${p.border}`, background: p.cardBg, cursor: 'pointer',
    }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      PREVIEW
    </button>
  )
}

function ImageIcon({ size = 12, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21,15 16,10 5,21"/>
    </svg>
  )
}

function FileIcon({ size = 12, color }: { size?: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/>
    </svg>
  )
}

// ─── Preview Modal ────────────────────────────────────────────────

function PreviewModal({ src, name, onClose }: { src: string; name: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      animation: 'fade-in 0.2s ease both',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 900, borderRadius: 12, overflow: 'hidden',
        border: 'rgba(255,255,255,0.12) 1px solid', background: '#0A1520',
        animation: 'page-enter 0.3s cubic-bezier(0.16,1,0.3,1) both',
        display: 'flex', flexDirection: 'column', maxHeight: '90vh',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '7px 12px', background: 'rgba(0,0,0,0.40)', borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6B85A0" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono', color: '#6B85A0' }}>{name}</span>
          </div>
          <button onClick={onClose} style={{
            width: 28, height: 28, borderRadius: 6, border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(0,0,0,0.4)', color: '#6B85A0', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div style={{ flex: 1, background: '#000', overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300 }}>
          <img src={src} alt={name} style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }} />
        </div>
        <div style={{ padding: '10px 16px', textAlign: 'center', background: 'rgba(0,0,0,0.35)' }}>
          <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono', color: '#3E5068' }}>Press ESC or click outside to close</span>
        </div>
      </div>
    </div>
  )
}

// ─── Stage 0 — Loan Document ──────────────────────────────────────

const loanFields: [string, string][] = [
  ['Full Name', 'Marcus T. Richardson'], ['Date of Birth', 'April 17, 1983'],
  ['SSN', '***-**-4892'], ['Address', '4218 Elm Ridge Dr, Portland OR 97201'],
  ['Employer', 'Cascade Software Inc.'], ['Job Title', 'Senior Product Manager'],
  ['Years Employed', '6.5 years'], ['Monthly Income', '$12,400'],
  ['Loan Amount', '$48,500'], ['Loan Purpose', 'Home Renovation'],
  ['Credit Score', '742'], ['Debt-to-Income', '28.4%'],
]

function LoanDocument({ highlight, onPreview, p }: { highlight: boolean; onPreview: () => void; p: ReturnType<typeof mkPalette> }) {
  return (
    <div style={{ borderRadius: 6, overflow: 'hidden', border: `1px solid ${p.border}` }}>
      <DarkToolbar p={p}
        left={<><FileIcon color={p.T2} /><span style={{ fontSize: 10, fontFamily: 'JetBrains Mono', color: p.T2 }}>LA-2026-08192 · Apex National Bank</span></>}
        right={<>
          {highlight ? <MonoBadge color={AMBER}>OCR ACTIVE</MonoBadge> : <MonoBadge color={p.T3}>ORIGINAL</MonoBadge>}
          <PreviewBtn onClick={onPreview} p={p} />
        </>}
      />
      <div style={{ background: '#fff', maxHeight: 280, overflowY: 'auto', padding: '16px 20px' }}>
        <div style={{ borderBottom: '2px solid #0052CC', paddingBottom: 10, marginBottom: 12 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: '#0052CC' }}>APEX NATIONAL BANK</div>
          <div style={{ fontSize: 9, color: '#666', marginTop: 2, fontFamily: 'JetBrains Mono' }}>Retail Lending Division · Member FDIC · Est. 1924</div>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <div style={{ fontWeight: 600, fontSize: 11, color: '#111', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Loan Application Form</div>
          <div style={{ fontSize: 9, color: '#888', marginTop: 3 }}>Application #: LA-2026-08192 · Date: August 10, 2026</div>
        </div>
        {loanFields.map(([label, value], i) => {
          const hi = highlight && i < 8
          return (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderBottom: '1px solid #f0f0f0', padding: '4px 0', gap: 12,
              background: hi ? 'rgba(234,115,0,0.10)' : 'transparent',
              outline: hi ? '1.5px solid rgba(234,115,0,0.40)' : 'none',
              outlineOffset: 1, borderRadius: hi ? 2 : 0, transition: 'background 0.3s ease',
            }}>
              <span style={{ fontSize: 9, color: '#777', fontWeight: 500, flexShrink: 0 }}>{label}:</span>
              <span style={{ fontSize: 9, color: '#111', textAlign: 'right' }}>{value}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Stage 0 — Vehicle Evidence ───────────────────────────────────

const vehicleArtifacts = [
  { name: 'Vehicle Image',          img: carOriginal,     type: 'Image' },
  { name: 'Vehicle Detection',      img: carLicensePlate, type: 'Image' },
  { name: 'Component Detection',    img: carGrill,        type: 'Image' },
  { name: 'Fine-grained Detection', img: carHeadlights,   type: 'Image' },
]

function EvidenceArtifacts({ selected, onSelect, onPreview, p }: {
  selected: number; onSelect: (i: number) => void
  onPreview: (src: string, name: string) => void; p: ReturnType<typeof mkPalette>
}) {
  const [hovering, setHovering] = useState<number | null>(null)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: p.T1 }}>Evidence Artifacts</div>
          <div style={{ fontSize: 10, color: p.T2, marginTop: 2 }}>Vehicle Inspection · 4 Uploaded Images</div>
        </div>
        <MonoBadge color={CY}>GROUNDSET VISION</MonoBadge>
      </div>

      {/* Thumbnail strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
        {vehicleArtifacts.map((art, i) => (
          <div key={i} onClick={() => onSelect(i)}
            onMouseEnter={() => setHovering(i)} onMouseLeave={() => setHovering(null)}
            style={{
              aspectRatio: '4/3', borderRadius: 6, overflow: 'hidden', position: 'relative', cursor: 'pointer',
              border: i === selected ? `1.5px solid ${CY}` : `1px solid ${p.border}`,
              boxShadow: i === selected ? '0 0 10px rgba(0,200,180,0.25)' : 'none',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <img src={art.img} alt={art.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {hovering === i && (
              <button onClick={e => { e.stopPropagation(); onPreview(art.img, art.name) }}
                style={{ position: 'absolute', top: 4, right: 4, width: 20, height: 20, borderRadius: 4,
                  background: 'rgba(0,0,0,0.75)', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#E8EDF5" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            )}
            {i === selected && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: CY }} />}
          </div>
        ))}
      </div>

      {/* Large preview */}
      <div style={{ borderRadius: 6, overflow: 'hidden', border: `1px solid ${p.border}` }}>
        <DarkToolbar p={p}
          left={<><ImageIcon color={p.T2} /><span style={{ fontSize: 10, fontFamily: 'JetBrains Mono', color: p.T2 }}>{vehicleArtifacts[selected].name}</span></>}
          right={<>
            <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: GREEN, display: 'flex', alignItems: 'center', gap: 3 }}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>PROCESSED
            </span>
            <PreviewBtn onClick={() => onPreview(vehicleArtifacts[selected].img, vehicleArtifacts[selected].name)} p={p} />
          </>}
        />
        <div style={{ height: 200, overflow: 'hidden', background: '#000' }}>
          <img src={vehicleArtifacts[selected].img} alt={vehicleArtifacts[selected].name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      </div>

      {/* Artifacts list */}
      <div style={{ borderRadius: 6, border: `1px solid ${p.border}`, overflow: 'hidden', background: p.panelBg }}>
        <div style={{ padding: '6px 12px', borderBottom: `1px solid ${p.border}`, background: p.toolbarBg }}>
          <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: p.T3, letterSpacing: '0.1em' }}>EVIDENCE ARTIFACTS</span>
        </div>
        {vehicleArtifacts.map((art, i) => (
          <div key={i} onClick={() => onSelect(i)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '7px 12px', cursor: 'pointer', gap: 8,
              background: i === selected ? 'rgba(0,200,180,0.05)' : 'transparent',
              borderBottom: i < 3 ? `1px solid ${p.borderSub}` : 'none',
              transition: 'background 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <ImageIcon size={11} color={i === selected ? CY : p.T3} />
              <span style={{ fontSize: 11, color: p.T1, fontWeight: 500 }}>{art.name}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <MonoBadge color={p.T3}>{art.type}</MonoBadge>
              <button onClick={e => { e.stopPropagation(); onPreview(art.img, art.name) }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: p.T3 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Stage 1 — Vision Processing ─────────────────────────────────

const visionStepLabels = ['Vehicle Detected', 'License Plate Located', 'Front Grille Located', 'Headlights Located', 'Structured Scene Generated']
const visionImages = [carOriginal, carLicensePlate, carGrill, carHeadlights, carOriginal]
const visionImageLabels = ['Original Evidence', 'Detection Pass 1', 'Detection Pass 2', 'Fine-grained Pass', 'Scene Complete']

function VisionProcessing({ step, onPreview, p }: { step: number; onPreview: (src: string, name: string) => void; p: ReturnType<typeof mkPalette> }) {
  const currentImg = visionImages[Math.min(step, 4)]
  const currentLabel = visionImageLabels[Math.min(step, 4)]

  const objects = [
    { name: 'Vehicle',       conf: 99.0, coords: 'x:12 y:8 w:580 h:340' },
    { name: 'License Plate', conf: 99.8, coords: 'x:168 y:292 w:142 h:38' },
    { name: 'Front Grille',  conf: 98.5, coords: 'x:184 y:108 w:228 h:142' },
    { name: 'Left Headlight',conf: 99.2, coords: 'x:310 y:118 w:96 h:82' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ borderRadius: 6, overflow: 'hidden', border: `1px solid ${p.border}` }}>
        <DarkToolbar p={p}
          left={<><ImageIcon color={p.T2} /><span style={{ fontSize: 10, fontFamily: 'JetBrains Mono', color: p.T2 }}>{currentLabel}</span></>}
          right={<><MonoBadge color={CY}>VISION ACTIVE</MonoBadge><PreviewBtn onClick={() => onPreview(currentImg, currentLabel)} p={p} /></>}
        />
        <div style={{ height: 180, background: '#000', overflow: 'hidden' }}>
          <img src={currentImg} alt={currentLabel} key={step}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', animation: 'fade-in 0.35s ease both' }} />
        </div>
      </div>

      <div style={{ borderRadius: 8, background: p.cardBg, border: `1px solid ${p.border}`, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: `1px solid ${p.border}`, background: p.toolbarBg }}>
          <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: p.T2, letterSpacing: '0.1em' }}>GROUNDSET VISION</span>
          <MonoBadge color={p.T3}>MODEL · Groundset Vision VLM</MonoBadge>
        </div>
        <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {visionStepLabels.map((label, i) => {
            const done = i <= step
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', borderRadius: 5,
                background: done ? 'rgba(34,197,94,0.08)' : p.cardBg, transition: 'background 0.3s ease',
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                  background: done ? 'rgba(34,197,94,0.18)' : p.badgeBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s ease',
                }}>
                  {done
                    ? <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="3.5"><path d="M20 6L9 17l-5-5"/></svg>
                    : <div style={{ width: 4, height: 4, borderRadius: '50%', background: p.T4 }} />
                  }
                </div>
                <span style={{ fontSize: 11, color: done ? p.T1 : p.T3, transition: 'color 0.3s ease' }}>{label}</span>
              </div>
            )
          })}
        </div>
      </div>

      {step >= 2 && (
        <div style={{ borderRadius: 8, border: `1px solid ${p.border}`, overflow: 'hidden', animation: 'stage-appear 0.4s ease both', background: p.panelBg }}>
          <div style={{ padding: '6px 12px', borderBottom: `1px solid ${p.border}`, background: p.toolbarBg }}>
            <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: p.T3, letterSpacing: '0.1em' }}>OBJECT DETECTION</span>
          </div>
          {objects.map((obj, i) => {
            if (i > step - 1) return null
            return (
              <div key={i} style={{ padding: '7px 12px', borderBottom: i < objects.length - 1 ? `1px solid ${p.borderSub}` : 'none', animation: 'stage-appear 0.35s ease both' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: CY, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: 500, color: p.T1 }}>{obj.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono', padding: '1px 5px', borderRadius: 3, background: 'rgba(34,197,94,0.10)', color: GREEN }}>Detected</span>
                    <span style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: CY }}>{obj.conf}%</span>
                  </div>
                </div>
                <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono', color: p.T3, marginTop: 2, marginLeft: 11 }}>{obj.coords}</div>
              </div>
            )
          })}
        </div>
      )}

      {step >= 4 && (
        <div style={{ borderRadius: 8, border: '1px solid rgba(0,200,180,0.15)', background: 'rgba(0,200,180,0.04)', overflow: 'hidden', animation: 'stage-appear 0.4s ease both' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 12px', borderBottom: '1px solid rgba(0,200,180,0.10)' }}>
            <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: CY, letterSpacing: '0.1em' }}>INFERENCE COMPLETE</span>
            <MonoBadge color={CY}>MODEL · Groundset Vision</MonoBadge>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, padding: 8 }}>
            {[['IMAGES','4'],['OBJECTS','4'],['CONFIDENCE','98.8%'],['LATENCY','36ms']].map(([label, val]) => (
              <div key={label} style={{ background: p.cardBg, borderRadius: 5, padding: '6px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: p.T3, letterSpacing: '0.05em', marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono', color: CY }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Stage 1 — OCR Processing ─────────────────────────────────────

function OCRProcessing({ done, p }: { done: boolean; p: ReturnType<typeof mkPalette> }) {
  const steps = ['Document structure analysed', 'Text extracted (1,240 tokens)', 'Named entities identified', 'Tables and fields mapped', 'Confidence thresholds verified']
  const metrics = [['STATUS','✓ DONE'],['CONFIDENCE','94.7%'],['PROCESSING','41ms'],['PAGES','2'],['FIELDS','12'],['LANGUAGE','EN-US']]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ borderRadius: 8, background: p.cardBg, border: `1px solid ${p.border}`, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: `1px solid ${p.border}`, background: p.toolbarBg }}>
          <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: p.T2, letterSpacing: '0.1em' }}>GROUNDSET OCR</span>
          <MonoBadge color={p.T3}>MODEL · Vision-Language Model</MonoBadge>
        </div>
        <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {steps.map((label, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', borderRadius: 5, background: done ? 'rgba(34,197,94,0.08)' : p.cardBg }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, flexShrink: 0, background: done ? 'rgba(34,197,94,0.18)' : p.badgeBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {done
                  ? <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="3.5"><path d="M20 6L9 17l-5-5"/></svg>
                  : <div style={{ width: 4, height: 4, borderRadius: '50%', background: p.T4 }} />
                }
              </div>
              <span style={{ fontSize: 11, color: done ? p.T1 : p.T3 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      {done && (
        <div style={{ borderRadius: 8, border: '1px solid rgba(0,200,180,0.15)', background: 'rgba(0,200,180,0.04)', overflow: 'hidden', animation: 'stage-appear 0.4s ease both' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, padding: 8 }}>
            {metrics.map(([label, val]) => (
              <div key={label} style={{ background: p.cardBg, borderRadius: 5, padding: '6px 8px', textAlign: 'center' }}>
                <div style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: p.T3, marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: CY }}>{val}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Stage 2 — Structured Data ────────────────────────────────────

const structuredGroups: Record<DocType, { heading: string; fields: [string, string][] }[]> = {
  loan: [
    { heading: 'Applicant Information', fields: [['Full Name','Marcus T. Richardson'],['Date of Birth','April 17, 1983'],['SSN','***-**-4892'],['Address','4218 Elm Ridge Dr, Portland OR 97201']] },
    { heading: 'Employment', fields: [['Employer','Cascade Software Inc.'],['Title','Senior Product Manager'],['Duration','6.5 years'],['Monthly Income','$12,400']] },
    { heading: 'Financial', fields: [['Loan Amount','$48,500'],['Purpose','Home Renovation'],['Credit Score','742'],['Debt-to-Income Ratio','28.4%']] },
  ],
  vehicle: [
    { heading: 'Vehicle Information', fields: [['Make / Model','Chevrolet Cruze Sedan'],['Year','2019'],['Color','Black'],['Plate','Located (VIN pending)']] },
    { heading: 'Damage Assessment', fields: [['Impact Zone','Front / Center'],['Severity Score','9.2 / 10'],['Components','Grille, Bumper, Hood'],['Airbag Status','Not Deployed']] },
    { heading: 'Scene Analysis', fields: [['Objects Detected','4'],['Image Confidence','98.8%'],['Images Processed','4'],['Latency','36ms']] },
  ],
  complaint: [
    { heading: 'Customer', fields: [['Name','Jennifer Walsh'],['Customer ID','CUS-48291'],['Tier','Premium'],['Account Age','7.2 years']] },
    { heading: 'Complaint', fields: [['Type','Billing Error – Recurring'],['Severity','High'],['Sentiment Score','-0.78'],['Prior Incidents','3']] },
    { heading: 'Channel', fields: [['Source','Email'],['Received','2026-08-10 09:14 UTC'],['Priority','Escalated'],['SLA Target','4 hours']] },
  ],
}

const structureStats: Record<DocType, [string, string][]> = {
  loan:      [['Pages','2'],['Entities','11'],['Tables','3'],['Language','EN-US'],['Confidence','94.7%']],
  vehicle:   [['Images','4'],['Objects','4'],['Tables','2'],['Language','N/A'],['Confidence','98.8%']],
  complaint: [['Pages','1'],['Entities','9'],['Tables','1'],['Language','EN-US'],['Confidence','91.3%']],
}

function StructuredData({ doc, p }: { doc: DocType; p: ReturnType<typeof mkPalette> }) {
  return (
    <div style={{ borderRadius: 8, border: `1px solid ${p.border}`, overflow: 'hidden', background: p.panelBg }}>
      {structuredGroups[doc].map((g, gi) => (
        <div key={gi}>
          <div style={{ padding: '5px 12px', borderBottom: `1px solid ${p.border}`, background: p.toolbarBg }}>
            <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: p.T2, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{g.heading}</span>
          </div>
          {g.fields.map(([label, val]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 12px', borderBottom: `1px solid ${p.borderSub}`, gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(34,197,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="3.5"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <span style={{ fontSize: 11, color: p.T2 }}>{label}</span>
              </div>
              <span style={{ fontSize: 11, color: p.T1, textAlign: 'right' }}>{val}</span>
            </div>
          ))}
        </div>
      ))}
      <div style={{ display: 'flex' }}>
        {structureStats[doc].map(([label, val], i) => (
          <div key={label} style={{
            flex: 1, textAlign: 'center', padding: '8px 4px',
            borderRight: i < 4 ? `1px solid ${p.border}` : 'none',
            borderTop: `1px solid ${p.border}`, background: p.toolbarBg,
          }}>
            <div style={{ fontSize: 13, fontFamily: 'JetBrains Mono', color: CY, fontWeight: 500 }}>{val}</div>
            <div style={{ fontSize: 8, fontFamily: 'JetBrains Mono', color: p.T3, marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Stage 3 — Policy Evaluation ─────────────────────────────────

const policyRules: Record<DocType, { rule: string; result: 'PASS' | 'FAIL'; detail: string }[]> = {
  loan: [
    { rule: 'Credit Score ≥ 700', result: 'PASS', detail: 'Applicant score: 742 · Threshold met' },
    { rule: 'Debt-to-Income ≤ 43%', result: 'PASS', detail: 'DTI: 28.4% · Well within limit' },
    { rule: 'Employment ≥ 2 Years', result: 'PASS', detail: 'Duration: 6.5 years · Verified' },
    { rule: 'Fraud Risk Score ≤ Low', result: 'PASS', detail: 'Score: 0.04 · No flags detected' },
  ],
  vehicle: [
    { rule: 'Damage Severity < 8.5/10', result: 'FAIL', detail: 'Score: 9.2 — exceeds auto-settle threshold' },
    { rule: 'Single Impact Zone', result: 'PASS', detail: 'Front-center zone only · Confirmed' },
    { rule: 'License Plate Located', result: 'PASS', detail: 'Detected at 99.8% confidence' },
    { rule: 'Image Confidence ≥ 95%', result: 'PASS', detail: 'Avg. confidence: 98.8%' },
  ],
  complaint: [
    { rule: 'Customer Tier = Premium', result: 'PASS', detail: 'Premium SLA applies' },
    { rule: 'SLA Required ≤ 4h', result: 'PASS', detail: 'SLA matched: 4-hour window' },
    { rule: 'Prior Incidents ≤ 2', result: 'FAIL', detail: 'Count: 3 — pattern threshold exceeded' },
    { rule: 'Sentiment Score ≥ -0.6', result: 'FAIL', detail: 'Score: -0.78 — high-distress signal' },
  ],
}

function PolicyEvaluation({ doc, p }: { doc: DocType; p: ReturnType<typeof mkPalette> }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <MonoBadge color={CY}>POLICY ENGINE ACTIVE</MonoBadge>
      </div>
      {policyRules[doc].map((r, i) => {
        const pass = r.result === 'PASS'
        return (
          <div key={i} style={{
            borderRadius: 6, padding: '8px 12px',
            background: pass ? 'rgba(34,197,94,0.04)' : 'rgba(239,68,68,0.04)',
            border: `1px solid ${pass ? 'rgba(34,197,94,0.14)' : 'rgba(239,68,68,0.14)'}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                background: pass ? 'rgba(34,197,94,0.14)' : 'rgba(239,68,68,0.14)',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {pass
                  ? <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="3.5"><path d="M20 6L9 17l-5-5"/></svg>
                  : <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="3.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                }
              </div>
              <span style={{ fontSize: 12, color: p.T1, flex: 1 }}>{r.rule}</span>
              <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 600, color: pass ? GREEN : RED }}>{r.result}</span>
            </div>
            <div style={{ fontSize: 10, color: p.T3, marginTop: 4, marginLeft: 24 }}>{r.detail}</div>
          </div>
        )
      })}
    </div>
  )
}

// ─── Stage 4 — Decision ───────────────────────────────────────────

const decisions: Record<DocType, { word: string; confidence: string; reason: string; tint: string; textColor: string }> = {
  loan:      { word: 'APPROVED', confidence: '97.4%', reason: 'All four policy rules passed. Credit profile meets threshold. DTI within compliance band. No fraud signals. Auto-approval authorised.', tint: 'rgba(34,197,94,0.05)',  textColor: GREEN },
  vehicle:   { word: 'ESCALATE', confidence: '91.2%', reason: 'Damage severity score (9.2) exceeds the auto-settle threshold (8.5). Claim routed to senior adjuster for manual inspection review.', tint: 'rgba(245,158,11,0.05)', textColor: AMBER },
  complaint: { word: 'REVIEW',   confidence: '88.6%', reason: 'Two policy rules failed (prior incident count, sentiment threshold). Premium tier customer routed to senior CX team for same-day response.', tint: 'rgba(59,130,246,0.05)',  textColor: BLUE_ACC },
}

function DecisionCard({ doc, p }: { doc: DocType; p: ReturnType<typeof mkPalette> }) {
  const d = decisions[doc]
  return (
    <div style={{ borderRadius: 10, border: `1px solid ${p.border}`, background: d.tint, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '14px 16px', borderBottom: `1px solid ${p.border}` }}>
        <div>
          <div style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: p.T3, letterSpacing: '0.1em', marginBottom: 5 }}>DECISION STATUS</div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.08em', color: d.textColor }}>{d.word}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: p.T3, letterSpacing: '0.1em', marginBottom: 5 }}>CONFIDENCE</div>
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'JetBrains Mono', color: d.textColor }}>{d.confidence}</div>
        </div>
      </div>
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${p.border}` }}>
        <div style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: p.T3, letterSpacing: '0.08em', marginBottom: 6 }}>REASONING</div>
        <div style={{ background: p.cardBg, borderRadius: 5, padding: '8px 12px' }}>
          <span style={{ fontSize: 11, color: p.T1, lineHeight: 1.6 }}>{d.reason}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '10px 16px', background: p.toolbarBg }}>
        {[['LATENCY','87ms'],['POLICY VERSION','v2.4.1']].map(([label, val]) => (
          <div key={label} style={{ background: p.cardBg, borderRadius: 5, padding: '5px 10px' }}>
            <div style={{ fontSize: 8, fontFamily: 'JetBrains Mono', color: p.T3, letterSpacing: '0.08em' }}>{label}</div>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: CY, marginTop: 2 }}>{val}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Stage 5 — Audit Ledger ───────────────────────────────────────

const auditEvents: Record<DocType, { time: string; label: string }[]> = {
  loan:      [{ time: '14:23:01.003', label: 'Evidence ingested and SHA-256 fingerprinted' }, { time: '14:23:01.041', label: 'OCR extraction complete (94.7% confidence)' }, { time: '14:23:01.067', label: 'Policy evaluated — 4 rules passed' }, { time: '14:23:01.089', label: 'Decision APPROVED recorded and signed' }],
  vehicle:   [{ time: '14:41:08.119', label: 'Evidence ingested — 4 images fingerprinted' }, { time: '14:41:08.155', label: 'Vision inference complete (98.8% confidence)' }, { time: '14:41:08.177', label: 'Policy evaluated — 1 rule failed (severity)' }, { time: '14:41:08.201', label: 'Decision ESCALATE recorded and signed' }],
  complaint: [{ time: '09:14:33.044', label: 'Complaint email ingested and fingerprinted' }, { time: '09:14:33.079', label: 'OCR + NLP extraction complete (91.3%)' }, { time: '09:14:33.101', label: 'Policy evaluated — 2 rules failed' }, { time: '09:14:33.118', label: 'Decision REVIEW recorded and signed' }],
}

function AuditLedger({ doc, p }: { doc: DocType; p: ReturnType<typeof mkPalette> }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
        <MonoBadge color={CY}>SHA-256 SIGNED</MonoBadge>
      </div>
      {auditEvents[doc].map((e, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: i < 3 ? 16 : 0, position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: CY, marginTop: 4, flexShrink: 0 }} />
            {i < 3 && <div style={{ width: 1, flex: 1, background: 'rgba(0,200,180,0.25)', marginTop: 4 }} />}
          </div>
          <div>
            <div style={{ fontSize: 11, fontFamily: 'JetBrains Mono', color: CY, marginBottom: 2 }}>{e.time}</div>
            <div style={{ fontSize: 13, color: p.T2, lineHeight: 1.5 }}>{e.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Stage row ────────────────────────────────────────────────────

function StageRow({ num, label, status, children, isLast, p }: {
  num: number; label: string; status: 'done' | 'active' | 'future'
  children?: React.ReactNode; isLast?: boolean; p: ReturnType<typeof mkPalette>
}) {
  const colors = {
    done:   { circle: 'rgba(0,200,180,0.15)', label: 'rgba(0,200,180,0.55)', line: 'rgba(0,200,180,0.20)' },
    active: { circle: CY,                     label: CY,                     line: p.borderSub },
    future: { circle: p.badgeBg,              label: p.T4,                   line: p.borderSub },
  }[status]

  return (
    <div style={{ display: 'flex', gap: 12, opacity: status === 'future' ? 0.25 : 1, transition: 'opacity 0.4s ease' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: 20, height: 20, borderRadius: '50%',
          background: colors.circle, display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: status === 'active' ? 'cyan-glow-pulse 2s ease infinite' : 'none',
          transition: 'background 0.3s ease', flexShrink: 0,
        }}>
          {status === 'done'
            ? <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={CY} strokeWidth="3.5"><path d="M20 6L9 17l-5-5"/></svg>
            : <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: status === 'active' ? '#0B1220' : p.T3, fontWeight: 600 }}>{num}</span>
          }
        </div>
        {!isLast && <div style={{ width: 1, flex: 1, minHeight: 16, background: colors.line, marginTop: 4, transition: 'background 0.3s ease' }} />}
      </div>
      <div style={{ flex: 1, paddingBottom: isLast ? 0 : 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, paddingTop: 1 }}>
          <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.label, transition: 'color 0.3s ease' }}>{label}</span>
          {status === 'active' && (
            <div style={{ display: 'flex', gap: 3 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: CY, animation: `processing-blink 1.4s ease ${i * 0.22}s infinite` }} />
              ))}
            </div>
          )}
        </div>
        {status !== 'future' && children && (
          <div style={{ animation: 'stage-appear 0.45s cubic-bezier(0.16,1,0.3,1) both' }}>{children}</div>
        )}
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────

const DOC_TYPES = [
  { id: 'loan' as DocType,      title: 'Loan Application',   sub: 'PDF · Retail Banking',       icon: 'file'  },
  { id: 'vehicle' as DocType,   title: 'Vehicle Inspection', sub: 'Image · Insurance / Claims', icon: 'image' },
  { id: 'complaint' as DocType, title: 'Customer Complaint', sub: 'Text · CX Operations',       icon: 'text'  },
]

const STAGE_DURATIONS = [3000, 3800, 2500, 2500, 2500, 99999]

interface HowItWorksProps extends NavigateProps { darkMode: boolean }

export default function HowItWorks({ navigate, darkMode }: HowItWorksProps) {
  const p = mkPalette(darkMode)

  const [selectedDoc, setSelectedDoc] = useState<DocType>('loan')
  const [activeStage, setActiveStage] = useState(0)
  const [visionStep, setVisionStep] = useState(0)
  const [selectedArtifact, setSelectedArtifact] = useState(0)
  const [preview, setPreview] = useState<{ src: string; name: string } | null>(null)
  const stageRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setActiveStage(0); setVisionStep(0); setSelectedArtifact(0)
  }, [selectedDoc])

  useEffect(() => {
    if (activeStage >= 5) return
    const t = setTimeout(() => setActiveStage(s => s + 1), STAGE_DURATIONS[activeStage])
    return () => clearTimeout(t)
  }, [activeStage, selectedDoc])

  useEffect(() => {
    if (activeStage !== 1 || selectedDoc !== 'vehicle' || visionStep >= 4) return
    const t = setTimeout(() => setVisionStep(s => s + 1), 700)
    return () => clearTimeout(t)
  }, [activeStage, visionStep, selectedDoc])

  useEffect(() => {
    const el = stageRefs.current[activeStage]
    if (el && scrollRef.current) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [activeStage])

  const stages = STAGE_LABELS[selectedDoc]
  const getStatus = (i: number): 'done' | 'active' | 'future' =>
    i < activeStage ? 'done' : i === activeStage ? 'active' : 'future'

  const stageContent = (i: number) => {
    const status = getStatus(i)
    if (status === 'future') return null
    switch (i) {
      case 0: return selectedDoc === 'vehicle'
        ? <EvidenceArtifacts selected={selectedArtifact} onSelect={setSelectedArtifact} onPreview={(src, name) => setPreview({ src, name })} p={p} />
        : <LoanDocument highlight={false} onPreview={() => setPreview({ src: carOriginal, name: 'LA-2026-08192' })} p={p} />
      case 1: return selectedDoc === 'vehicle'
        ? <VisionProcessing step={visionStep} onPreview={(src, name) => setPreview({ src, name })} p={p} />
        : <><LoanDocument highlight onPreview={() => setPreview({ src: carOriginal, name: 'LA-2026-08192' })} p={p} /><div style={{ marginTop: 10 }}><OCRProcessing done={status === 'done'} p={p} /></div></>
      case 2: return <StructuredData doc={selectedDoc} p={p} />
      case 3: return <PolicyEvaluation doc={selectedDoc} p={p} />
      case 4: return <DecisionCard doc={selectedDoc} p={p} />
      case 5: return <AuditLedger doc={selectedDoc} p={p} />
      default: return null
    }
  }

  return (
    <>
      <div style={{ background: p.bg, position: 'relative', overflow: 'hidden' }} className="border-y border-border">
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(${p.gridLine} 1px, transparent 1px), linear-gradient(to right, ${p.gridLine} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />
        <div style={{
          position: 'absolute', top: -200, left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 700, pointerEvents: 'none',
          background: `radial-gradient(ellipse at center, ${p.radialGlow}, transparent 65%)`,
        }} />

        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '80px 40px' }}>

          {/* Header */}
          <div style={{ maxWidth: 460, marginBottom: 48 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(0,200,180,0.06)', border: '1px solid rgba(0,200,180,0.18)',
              borderRadius: 999, padding: '5px 12px', marginBottom: 16,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: CY, animation: 'cyan-glow-pulse 2s ease infinite' }} />
              <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono', color: CY, letterSpacing: '0.1em' }}>HOW IT WORKS</span>
            </div>
            <h2 style={{ fontSize: 46, fontWeight: 700, color: p.T1, lineHeight: 1.1, letterSpacing: '-0.025em', margin: '0 0 14px' }}>
              From evidence to{' '}
              <span style={{ color: CY }}>decision in milliseconds.</span>
            </h2>
            <p style={{ fontSize: 16, color: p.T2, lineHeight: 1.7, margin: 0 }}>
              BPOptima ingests unstructured enterprise evidence, extracts structured data, applies your policy rules, and returns a deterministic, auditable decision — automatically.
            </p>
          </div>

          {/* Two-column */}
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>

            {/* Left column */}
            <div style={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 500, color: p.T2, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px' }}>
                  Select a document type
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {DOC_TYPES.map(dt => {
                    const active = selectedDoc === dt.id
                    return (
                      <button key={dt.id} onClick={() => setSelectedDoc(dt.id)} style={{
                        display: 'flex', alignItems: 'center', gap: 12, padding: 14, borderRadius: 8,
                        cursor: 'pointer', textAlign: 'left', width: '100%',
                        background: active ? p.selBg : p.cardBg,
                        border: `1px solid ${active ? 'rgba(0,200,180,0.40)' : p.border}`,
                        transition: 'all 0.2s ease',
                      }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 6, flexShrink: 0,
                          background: active ? 'rgba(0,200,180,0.12)' : p.badgeBg,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'background 0.2s ease',
                        }}>
                          {dt.icon === 'file'  && <FileIcon size={14} color={active ? CY : p.T2} />}
                          {dt.icon === 'image' && <ImageIcon size={14} color={active ? CY : p.T2} />}
                          {dt.icon === 'text'  && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={active ? CY : p.T2} strokeWidth="2">
                              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/>
                            </svg>
                          )}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 500, color: active ? p.T1 : p.T2, marginBottom: 3, transition: 'color 0.2s ease' }}>{dt.title}</div>
                          <div style={{ fontSize: 10, color: p.T3, fontFamily: 'JetBrains Mono' }}>{dt.sub}</div>
                        </div>
                        <div style={{
                          width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                          background: active ? CY : 'transparent',
                          border: `1.5px solid ${active ? CY : p.T4}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease',
                        }}>
                          {active && <div style={{ width: 5, height: 5, borderRadius: '50%', background: darkMode ? '#0B1220' : '#fff' }} />}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* CTA card */}
              <div style={{ borderRadius: 12, padding: 20, background: p.ctaBg, border: `1px solid ${p.border}`, boxShadow: darkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: p.T1, marginBottom: 8 }}>See this running on your data</div>
                <p style={{ fontSize: 12, color: p.T2, lineHeight: 1.6, margin: '0 0 16px' }}>
                  Our team will walk you through a custom deployment scoped to your policies and document types.
                </p>
                <button onClick={() => navigate('contact')} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
                  background: CY, color: '#0B1220', fontSize: 14, fontWeight: 500, marginBottom: 8,
                  transition: 'opacity 0.15s ease',
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  <span>Request a Walkthrough</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <button onClick={() => navigate('contact')} style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '9px 16px', borderRadius: 8, cursor: 'pointer',
                  background: 'transparent', border: `1px solid ${p.border}`,
                  color: p.T2, fontSize: 13, transition: 'border-color 0.15s ease',
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = CY)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = p.border)}
                >
                  <span>Book a Call</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>

              {/* Compliance badges */}
              <div style={{ borderRadius: 12, padding: 16, background: p.ctaBg, border: `1px solid ${p.border}` }}>
                <p style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: p.T3, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 12px' }}>Standards & Compliance</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  {['ISO 30401', 'SOC 2 Type II', 'GDPR Ready', 'ISO 27001'].map(badge => (
                    <div key={badge} style={{
                      borderRadius: 5, padding: '7px 8px', textAlign: 'center',
                      background: p.badgeBg, border: `1px solid ${p.badgeBorder}`,
                      fontSize: 10, fontFamily: 'JetBrains Mono', color: p.T2,
                    }}>{badge}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column — pipeline panel */}
            <div style={{
              flex: 1, borderRadius: 16, minWidth: 0,
              background: p.panelBg, border: `1px solid ${p.border}`,
              boxShadow: darkMode ? 'none' : '0 4px 24px rgba(0,0,0,0.07)',
              display: 'flex', flexDirection: 'column', height: 680, overflow: 'hidden',
            }}>
              {/* Progress bar */}
              <div style={{ padding: '20px 24px 14px', borderBottom: `1px solid ${p.border}`, flexShrink: 0, background: p.toolbarBg }}>
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ position: 'absolute', top: 4, left: 12, right: 12, height: 1, background: p.trackBg }} />
                  <div style={{
                    position: 'absolute', top: 4, left: 12, height: 1,
                    width: activeStage === 0 ? 0 : `calc(${(activeStage / 5) * 100}% - 24px)`,
                    background: p.trackFill,
                    transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)',
                  }} />
                  {stages.map((label, i) => (
                    <button key={i} onClick={() => setActiveStage(i)}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px' }}>
                      <div style={{
                        width: 8, height: 8, borderRadius: '50%', zIndex: 1,
                        background: i <= activeStage ? CY : p.trackBg,
                        animation: i === activeStage ? 'cyan-glow-pulse 2s ease infinite' : 'none',
                        transition: 'background 0.3s ease',
                      }} />
                      <span style={{
                        fontSize: 9, fontFamily: 'JetBrains Mono', letterSpacing: '0.04em', whiteSpace: 'nowrap',
                        color: i < activeStage ? p.headingNote : i === activeStage ? CY : p.T3,
                        transition: 'color 0.3s ease',
                      }}>{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable stages */}
              <div ref={scrollRef} style={{
                flex: 1, overflowY: 'auto', padding: '20px 24px',
                scrollbarWidth: 'thin', scrollbarColor: `${p.T4} transparent`,
              }}>
                {stages.map((label, i) => (
                  <div key={i} ref={el => { stageRefs.current[i] = el }}>
                    <StageRow num={i} label={label} status={getStatus(i)} isLast={i === stages.length - 1} p={p}>
                      {stageContent(i)}
                    </StageRow>
                  </div>
                ))}
                {activeStage < 4 && (
                  <div style={{
                    position: 'sticky', bottom: 0, textAlign: 'center', paddingTop: 12,
                    background: p.scrollHint, pointerEvents: 'none',
                  }}>
                    <span style={{ fontSize: 9, fontFamily: 'JetBrains Mono', color: 'rgba(0,200,180,0.5)', animation: 'bounce-slow 1.8s ease infinite', display: 'inline-block' }}>
                      SCROLL ↓
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer row */}
          <div style={{ borderTop: `1px solid ${p.footerBorder}`, paddingTop: 36, marginTop: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
              {['Deterministic decisions', 'Full audit trail', 'No black-box reasoning', 'Sub-100ms latency'].map(feat => (
                <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: CY, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: p.T2 }}>{feat}</span>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('platform')} style={{ fontSize: 12, fontWeight: 500, color: CY, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              View full technical documentation →
            </button>
          </div>
        </div>
      </div>

      {preview && <PreviewModal src={preview.src} name={preview.name} onClose={() => setPreview(null)} />}
    </>
  )
}
