import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type DocType = 'loan' | 'vehicle' | 'complaint'

const DOC_TYPES = [
  { id: 'loan' as DocType, title: 'Loan Application' },
  { id: 'vehicle' as DocType, title: 'Vehicle Inspection' },
  { id: 'complaint' as DocType, title: 'Customer Complaint' },
]

const STAGE_LABELS: Record<DocType, string[]> = {
  loan: ['Ingest', 'OCR', 'Structure', 'Policy', 'Decide', 'Audit'],
  vehicle: ['Ingest', 'Vision', 'Structure', 'Policy', 'Decide', 'Audit'],
  complaint: ['Ingest', 'NLP', 'Structure', 'Policy', 'Decide', 'Audit'],
}

interface StageData {
  title: string
  fields: [string, string][]
}

const stageContent: Record<DocType, StageData[]> = {
  loan: [
    { title: 'Document received\nand fingerprinted', fields: [['Type', 'PDF, 2 pages'], ['Source', 'Apex National Bank'], ['Case', 'LA-2026-08192'], ['Hash', 'SHA-256']] },
    { title: 'Text extraction\ncomplete', fields: [['Tokens', '1,240'], ['Confidence', '94.7%'], ['Fields Found', '12'], ['Latency', '41ms']] },
    { title: 'Structured data\nextracted', fields: [['Name', 'Marcus T. Richardson'], ['Credit Score', '742'], ['Loan Amount', '$48,500'], ['DTI Ratio', '28.4%']] },
    { title: 'Policy rules\nevaluated', fields: [['Credit >= 700', 'Pass'], ['DTI <= 43%', 'Pass'], ['Employment >= 2yr', 'Pass'], ['Fraud Risk', 'Pass']] },
    { title: 'Decision\nemitted', fields: [['Status', 'Approved'], ['Confidence', '97.4%'], ['Latency', '87ms'], ['Policy', 'v2.4.1']] },
    { title: 'Record created\nand signed', fields: [['Timestamp', '14:23:01.089'], ['Decision', 'Approved'], ['Signature', 'SHA-256 signed'], ['Ledger', 'Append-only']] },
  ],
  vehicle: [
    { title: 'Images received\nand fingerprinted', fields: [['Type', 'JPEG, 4 images'], ['Source', 'Mobile upload'], ['Case', 'CLM-2026-4821'], ['Hash', 'SHA-256']] },
    { title: 'Vision model\nprocessing', fields: [['Objects', '4 detected'], ['Confidence', '98.8%'], ['Components', 'Grille, Bumper, Hood'], ['Latency', '36ms']] },
    { title: 'Damage assessment\nstructured', fields: [['Vehicle', 'Chevrolet Cruze 2019'], ['Severity', '9.2 / 10'], ['Impact Zone', 'Front / Center'], ['Airbag', 'Not Deployed']] },
    { title: 'Policy rules\nevaluated', fields: [['Severity < 8.5', 'Fail'], ['Single Zone', 'Pass'], ['Plate Found', 'Pass'], ['Confidence >= 95%', 'Pass']] },
    { title: 'Decision\nemitted', fields: [['Status', 'Escalate'], ['Confidence', '91.2%'], ['Latency', '87ms'], ['Reason', 'Severity exceeded']] },
    { title: 'Record created\nand signed', fields: [['Timestamp', '14:41:08.201'], ['Decision', 'Escalate'], ['Signature', 'SHA-256 signed'], ['Ledger', 'Append-only']] },
  ],
  complaint: [
    { title: 'Email received\nand fingerprinted', fields: [['Type', 'Email, text'], ['Source', 'support@client.com'], ['Case', 'CX-2026-8291'], ['Hash', 'SHA-256']] },
    { title: 'NLP analysis\ncomplete', fields: [['Sentiment', '-0.78'], ['Category', 'Billing Error'], ['Priority', 'High'], ['Latency', '52ms']] },
    { title: 'Customer context\nstructured', fields: [['Name', 'Jennifer Walsh'], ['Tier', 'Premium'], ['Account Age', '7.2 years'], ['Prior Incidents', '3']] },
    { title: 'Policy rules\nevaluated', fields: [['Premium Tier', 'Pass'], ['SLA <= 4h', 'Pass'], ['Incidents <= 2', 'Fail'], ['Sentiment >= -0.6', 'Fail']] },
    { title: 'Decision\nemitted', fields: [['Status', 'Review'], ['Confidence', '88.6%'], ['Latency', '72ms'], ['Route', 'Senior CX Team']] },
    { title: 'Record created\nand signed', fields: [['Timestamp', '09:14:33.118'], ['Decision', 'Review'], ['Signature', 'SHA-256 signed'], ['Ledger', 'Append-only']] },
  ],
}

function RibbonCanvas({ progress }: { progress: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const progressRef = useRef(0)

  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let time = 0

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2)
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const p = progressRef.current

      ctx.clearRect(0, 0, w, h)
      time += 0.008

      const ribbonCount = 5
      for (let r = 0; r < ribbonCount; r++) {
        const ribbonOffset = r * 0.18
        const opacity = 0.03 + (r === 2 ? 0.06 : 0) + p * 0.02
        const yBase = h * (0.2 + r * 0.15)
        const amplitude = 40 + r * 15 + Math.sin(time + r) * 10
        const frequency = 0.003 + r * 0.0005
        const speed = time * (0.5 + r * 0.2) + p * Math.PI * 2 + ribbonOffset

        ctx.beginPath()
        ctx.moveTo(-50, yBase)

        for (let x = -50; x <= w + 50; x += 3) {
          const y = yBase +
            Math.sin(x * frequency + speed) * amplitude +
            Math.sin(x * frequency * 2.3 + speed * 0.7) * (amplitude * 0.4) +
            Math.cos(x * frequency * 0.5 + speed * 1.3) * (amplitude * 0.2)
          ctx.lineTo(x, y)
        }

        ctx.strokeStyle = `rgba(0, 200, 180, ${opacity})`
        ctx.lineWidth = 1 + (r === 2 ? 1 : 0)
        ctx.stroke()

        // Second pass with glow for center ribbon
        if (r === 2) {
          ctx.strokeStyle = `rgba(0, 200, 180, ${opacity * 0.3})`
          ctx.lineWidth = 6
          ctx.stroke()
        }
      }

      // Flowing particles along the ribbons
      const particleCount = 30 + Math.floor(p * 40)
      for (let i = 0; i < particleCount; i++) {
        const ribbonIdx = i % ribbonCount
        const t = ((i / particleCount) + time * 0.3 + p * 2) % 1
        const x = t * (w + 100) - 50
        const yBase = h * (0.2 + ribbonIdx * 0.15)
        const frequency = 0.003 + ribbonIdx * 0.0005
        const speed = time * (0.5 + ribbonIdx * 0.2) + p * Math.PI * 2 + ribbonIdx * 0.18
        const amplitude = 40 + ribbonIdx * 15 + Math.sin(time + ribbonIdx) * 10

        const y = yBase +
          Math.sin(x * frequency + speed) * amplitude +
          Math.sin(x * frequency * 2.3 + speed * 0.7) * (amplitude * 0.4) +
          Math.cos(x * frequency * 0.5 + speed * 1.3) * (amplitude * 0.2)

        const alpha = Math.sin(t * Math.PI) * 0.6
        ctx.beginPath()
        ctx.arc(x, y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 200, 180, ${alpha})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

function ProgressTrack({ progress, stage, stageCount }: { progress: number; stage: number; stageCount: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const progressRef = useRef(0)
  const stageRef = useRef(0)
  const pulsesRef = useRef<{ x: number; birth: number; stage: number }[]>([])
  const prevStageRef = useRef(0)

  useEffect(() => {
    progressRef.current = progress
    stageRef.current = stage

    if (stage !== prevStageRef.current) {
      const x = stage / (stageCount - 1)
      pulsesRef.current.push({ x, birth: performance.now(), stage })
      prevStageRef.current = stage
    }
  }, [progress, stage, stageCount])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2)
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const sparks: { x: number; y: number; vx: number; vy: number; life: number }[] = []

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const cy = h / 2
      const p = progressRef.current
      const now = performance.now()

      ctx.clearRect(0, 0, w, h)

      const headX = p * w
      const pad = 0

      // Background track (dashed)
      ctx.setLineDash([3, 6])
      ctx.beginPath()
      ctx.moveTo(pad, cy)
      ctx.lineTo(w - pad, cy)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)'
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.setLineDash([])

      // Filled trail with gradient
      if (headX > 0) {
        const grad = ctx.createLinearGradient(0, 0, headX, 0)
        grad.addColorStop(0, 'rgba(0, 200, 180, 0.05)')
        grad.addColorStop(0.7, 'rgba(0, 200, 180, 0.25)')
        grad.addColorStop(1, 'rgba(0, 200, 180, 0.8)')
        ctx.beginPath()
        ctx.moveTo(pad, cy)
        ctx.lineTo(headX, cy)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      // Pulsing glow at head
      const pulse = 0.5 + Math.sin(now * 0.006) * 0.3
      const glowRadius = 12 + pulse * 8
      const glowGrad = ctx.createRadialGradient(headX, cy, 0, headX, cy, glowRadius)
      glowGrad.addColorStop(0, `rgba(0, 200, 180, ${0.4 + pulse * 0.2})`)
      glowGrad.addColorStop(0.4, 'rgba(0, 200, 180, 0.1)')
      glowGrad.addColorStop(1, 'rgba(0, 200, 180, 0)')
      ctx.beginPath()
      ctx.arc(headX, cy, glowRadius, 0, Math.PI * 2)
      ctx.fillStyle = glowGrad
      ctx.fill()

      // Head dot
      ctx.beginPath()
      ctx.arc(headX, cy, 3, 0, Math.PI * 2)
      ctx.fillStyle = '#00C8B4'
      ctx.fill()

      // Spawn sparks from head
      if (Math.random() < 0.3 && p > 0.01 && p < 0.99) {
        sparks.push({
          x: headX,
          y: cy,
          vx: (Math.random() - 0.3) * 1.5,
          vy: (Math.random() - 0.5) * 2.5,
          life: 1,
        })
      }

      // Draw and update sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.05
        s.life -= 0.025

        if (s.life <= 0) {
          sparks.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, 0.8 * s.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 200, 180, ${s.life * 0.6})`
        ctx.fill()
      }

      // Stage markers
      for (let i = 0; i < stageCount; i++) {
        const mx = (i / (stageCount - 1)) * (w - pad * 2) + pad
        const reached = i <= stageRef.current

        // Outer ring for reached stages
        if (reached) {
          ctx.beginPath()
          ctx.arc(mx, cy, 5, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(0, 200, 180, 0.3)'
          ctx.lineWidth = 0.5
          ctx.stroke()
        }

        ctx.beginPath()
        ctx.arc(mx, cy, reached ? 2.5 : 1.5, 0, Math.PI * 2)
        ctx.fillStyle = reached ? '#00C8B4' : 'rgba(255, 255, 255, 0.08)'
        ctx.fill()
      }

      // Stage pulse rings (expand and fade on stage change)
      for (let i = pulsesRef.current.length - 1; i >= 0; i--) {
        const pulse = pulsesRef.current[i]
        const age = (now - pulse.birth) / 1000
        if (age > 1.2) {
          pulsesRef.current.splice(i, 1)
          continue
        }

        const px = pulse.x * (w - pad * 2) + pad
        const radius = 5 + age * 25
        const alpha = (1 - age / 1.2) * 0.5

        ctx.beginPath()
        ctx.arc(px, cy, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(0, 200, 180, ${alpha})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Second ring, slightly delayed
        const age2 = age - 0.1
        if (age2 > 0) {
          const radius2 = 5 + age2 * 18
          const alpha2 = (1 - age2 / 1.1) * 0.3
          ctx.beginPath()
          ctx.arc(px, cy, radius2, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(0, 200, 180, ${alpha2})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [stageCount])

  return (
    <canvas
      ref={canvasRef}
      className="w-full pointer-events-none"
      style={{ height: '40px' }}
    />
  )
}

export default function Pipeline() {
  const [doc, setDoc] = useState<DocType>('loan')
  const [stage, setStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const filmstripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setStage(0)
    setProgress(0)
  }, [doc])

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const p = self.progress
          setProgress(p)
          setStage(Math.min(5, Math.floor(p * 6)))
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const stages = STAGE_LABELS[doc]
  const content = stageContent[doc][stage]
  const stageProgress = (progress * 6) - stage

  return (
    <section id="pipeline" ref={sectionRef} className="relative" style={{ height: '500vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <RibbonCanvas progress={progress} />

        {/* Top section label */}
        <div className="absolute top-8 left-8 md:left-12">
          <p className="text-[11px] tracking-[0.3em] uppercase text-accent">Platform</p>
        </div>

        {/* Doc type selector - top right */}
        <div className="absolute top-8 right-8 md:right-12 flex gap-6">
          {DOC_TYPES.map(dt => (
            <button
              key={dt.id}
              onClick={() => setDoc(dt.id)}
              className="text-[12px] tracking-wide transition-colors duration-300"
              style={{ color: doc === dt.id ? '#FFFFFF' : 'rgba(255,255,255,0.45)' }}
            >
              {dt.title}
            </button>
          ))}
        </div>

        {/* Main content - film frame style */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-[900px] w-full px-8">
            {/* Stage title - large cinematic text */}
            <div className="mb-12" key={`${doc}-${stage}`}>
              <div className="overflow-hidden mb-4">
                <p
                  className="text-[11px] tracking-[0.3em] uppercase text-text-secondary"
                  style={{
                    animation: 'slide-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
                  }}
                >
                  {stages[stage]}
                </p>
              </div>
              {content.title.split('\n').map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <h2
                    className="text-[clamp(2.5rem,6vw,5rem)] font-semibold tracking-[-0.03em] leading-[1.05]"
                    style={{
                      animation: `slide-up 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s both`,
                    }}
                  >
                    {line}
                  </h2>
                </div>
              ))}
            </div>

            {/* Fields - staggered reveal */}
            <div key={`${doc}-${stage}-fields`} className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
              {content.fields.map(([label, value], i) => (
                <div
                  key={label}
                  style={{
                    animation: `slide-up 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.06}s both`,
                  }}
                >
                  <div className="text-[11px] tracking-wider text-text-muted mb-1">{label}</div>
                  <div className="text-[15px] text-text">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom filmstrip - stage indicators */}
        <div className="absolute bottom-12 left-0 right-0 px-8 md:px-12">
          <div ref={filmstripRef} className="max-w-[900px] mx-auto">
            <div className="flex items-center justify-between mb-5">
              {stages.map((label, i) => (
                <span
                  key={i}
                  className="text-[10px] tracking-wider transition-all duration-500"
                  style={{
                    color: i === stage ? '#00C8B4' : i < stage ? 'rgba(0,200,180,0.6)' : 'rgba(255,255,255,0.4)',
                    opacity: 1,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            <ProgressTrack progress={progress} stage={stage} stageCount={6} />
          </div>
        </div>
      </div>
    </section>
  )
}
