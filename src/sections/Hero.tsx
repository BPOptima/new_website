import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../components/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

interface Node { x: number; y: number; r: number; baseX: number; baseY: number; glow: number }
interface Edge { from: number; to: number; dist: number }
interface Packet { edge: Edge; t: number; reverse: boolean; opacity: number }

function DataRoutingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    let raf: number
    let W = 0
    let H = 0
    let nodes: Node[] = []
    let edges: Edge[] = []
    let packets: Packet[] = []
    let mouse = { x: -9999, y: -9999 }
    const NODE_COUNT = 32
    const PACKET_SPEED = 0.005
    const MOUSE_RADIUS = 180

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2)
      const rect = canvas.parentElement!.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = W + 'px'
      canvas.style.height = H + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      generateNodes()
      generateEdges()
    }

    function generateNodes() {
      nodes = []
      const cols = Math.ceil(Math.sqrt(NODE_COUNT * (W / H)))
      const rows = Math.ceil(NODE_COUNT / cols)
      const cellW = W / cols
      const cellH = H / rows
      for (let i = 0; i < NODE_COUNT; i++) {
        const col = i % cols
        const row = Math.floor(i / cols)
        const x = cellW * (col + 0.5) + (Math.random() - 0.5) * cellW * 0.6
        const y = cellH * (row + 0.5) + (Math.random() - 0.5) * cellH * 0.5
        nodes.push({ x, y, r: 2 + Math.random() * 1.5, baseX: x, baseY: y, glow: 0 })
      }
    }

    function generateEdges() {
      edges = []
      const maxDist = Math.max(W, H) * 0.22
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].baseX - nodes[j].baseX
          const dy = nodes[i].baseY - nodes[j].baseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            edges.push({ from: i, to: j, dist })
          }
        }
      }
    }

    function spawnPacket() {
      if (edges.length === 0) return
      const edge = edges[Math.floor(Math.random() * edges.length)]
      packets.push({ edge, t: 0, reverse: Math.random() > 0.5, opacity: 0 })
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      // Mouse influence on nodes
      for (const n of nodes) {
        const dx = mouse.x - n.baseX
        const dy = mouse.y - n.baseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS) {
          const force = (1 - dist / MOUSE_RADIUS) * 20
          n.x = n.baseX - (dx / dist) * force
          n.y = n.baseY - (dy / dist) * force
        } else {
          n.x += (n.baseX - n.x) * 0.08
          n.y += (n.baseY - n.y) * 0.08
        }
      }

      // Edges
      for (const e of edges) {
        const a = nodes[e.from]
        const b = nodes[e.to]

        // Brighten edges near mouse
        const midX = (a.x + b.x) / 2
        const midY = (a.y + b.y) / 2
        const dm = Math.sqrt((mouse.x - midX) ** 2 + (mouse.y - midY) ** 2)
        const edgeAlpha = dm < MOUSE_RADIUS * 1.5
          ? 0.06 + (1 - dm / (MOUSE_RADIUS * 1.5)) * 0.1
          : 0.06

        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.strokeStyle = `rgba(255, 255, 255, ${edgeAlpha})`
        ctx.lineWidth = 0.6
        ctx.stroke()
      }

      // Nodes
      for (const n of nodes) {
        // Decay glow
        n.glow *= 0.93

        const dm = Math.sqrt((mouse.x - n.x) ** 2 + (mouse.y - n.y) ** 2)
        const mouseAlpha = dm < MOUSE_RADIUS ? 0.3 + (1 - dm / MOUSE_RADIUS) * 0.4 : 0.15
        const radius = n.r + n.glow * 4
        const alpha = Math.min(1, mouseAlpha + n.glow * 0.8)

        // Glow ring when active
        if (n.glow > 0.05) {
          const glowRad = radius + n.glow * 12
          const glowGrad = ctx.createRadialGradient(n.x, n.y, radius, n.x, n.y, glowRad)
          glowGrad.addColorStop(0, `rgba(0, 200, 180, ${n.glow * 0.5})`)
          glowGrad.addColorStop(1, 'rgba(0, 200, 180, 0)')
          ctx.beginPath()
          ctx.arc(n.x, n.y, glowRad, 0, Math.PI * 2)
          ctx.fillStyle = glowGrad
          ctx.fill()
        }

        // Node dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = n.glow > 0.05
          ? `rgba(0, 200, 180, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`
        ctx.fill()
      }

      // Packets
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i]
        p.t += PACKET_SPEED

        if (p.t < 0.1) p.opacity = p.t / 0.1
        else if (p.t > 0.85) p.opacity = (1 - p.t) / 0.15
        else p.opacity = 1

        if (p.t >= 1) {
          // Trigger glow on destination node
          const destIdx = p.reverse ? p.edge.from : p.edge.to
          nodes[destIdx].glow = 1
          packets.splice(i, 1)
          continue
        }

        const fromNode = p.reverse ? nodes[p.edge.to] : nodes[p.edge.from]
        const toNode = p.reverse ? nodes[p.edge.from] : nodes[p.edge.to]
        const x = fromNode.x + (toNode.x - fromNode.x) * p.t
        const y = fromNode.y + (toNode.y - fromNode.y) * p.t

        // Glow
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 14)
        grad.addColorStop(0, `rgba(0, 200, 180, ${p.opacity * 0.25})`)
        grad.addColorStop(1, 'rgba(0, 200, 180, 0)')
        ctx.beginPath()
        ctx.arc(x, y, 14, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Dot
        ctx.beginPath()
        ctx.arc(x, y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 200, 180, ${p.opacity * 0.9})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    for (let i = 0; i < 6; i++) spawnPacket()
    const interval = setInterval(spawnPacket, 500)
    draw()

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => { mouse = { x: -9999, y: -9999 } }

    window.addEventListener('resize', resize)
    canvas.parentElement!.addEventListener('mousemove', onMouse, { passive: true })
    canvas.parentElement!.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(raf)
      clearInterval(interval)
      window.removeEventListener('resize', resize)
      canvas.parentElement?.removeEventListener('mousemove', onMouse)
      canvas.parentElement?.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.from(tagRef.current, { opacity: 0, x: -30, duration: 1 }, 0.2)

      const lines = headingRef.current?.querySelectorAll('.line-mask')
      if (lines) {
        tl.from(lines, { yPercent: 110, duration: 1.2, stagger: 0.1 }, 0.4)
      }

      tl.from(subtextRef.current, { opacity: 0, y: 20, duration: 1 }, 1.0)
      tl.from(ctaRef.current?.children ?? [], { opacity: 0, y: 20, duration: 0.8, stagger: 0.1 }, 1.2)
      tl.from(counterRef.current, { opacity: 0, x: 30, duration: 1 }, 0.6)
      tl.from(badgesRef.current?.children ?? [], { opacity: 0, duration: 0.6, stagger: 0.08 }, 1.5)

      // Parallax layers on scroll
      gsap.to(headingRef.current, {
        yPercent: -25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(subtextRef.current, {
        yPercent: -15,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '15% top',
          end: '55% top',
          scrub: true,
        },
      })

      gsap.to(counterRef.current, {
        yPercent: -40,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '10% top',
          end: '50% top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <DataRoutingCanvas />

      {/* Vertical accent line - left edge */}
      <div className="absolute left-8 md:left-12 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent" />

      <div className="relative max-w-[1400px] mx-auto px-8 md:px-16 w-full grid lg:grid-cols-[1fr_auto] items-center gap-16">
        {/* Left: Main content */}
        <div>
          <div ref={tagRef} className="flex items-center gap-4 mb-10 opacity-0">
            <div className="w-8 h-px bg-accent" />
            <p className="text-[12px] tracking-[0.3em] uppercase text-text-muted font-light">
              Sovereign Decision Infrastructure
            </p>
          </div>

          <div ref={headingRef}>
            <h1 className="text-[clamp(3.5rem,9vw,8rem)] font-semibold tracking-[-0.04em] leading-[0.9] mb-8">
              <span className="block overflow-hidden">
                <span className="line-mask block">Turn Documents</span>
              </span>
              <span className="block overflow-hidden">
                <span className="line-mask block">Into <span className="text-accent">Deterministic</span></span>
              </span>
              <span className="block overflow-hidden">
                <span className="line-mask block">Decisions</span>
              </span>
            </h1>
          </div>

          <p ref={subtextRef} className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed mb-12 font-light opacity-0">
            Domain-trained AI that deploys inside your VPC. Every decision auditable, explainable, and defensible. Zero data egress.
          </p>

          <div ref={ctaRef} className="flex flex-wrap items-center gap-5">
            <MagneticButton href="#pipeline" variant="primary" className="group">
              See the Platform
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </MagneticButton>
          </div>
        </div>

        {/* Right: Live counter / status block */}
        <div ref={counterRef} className="hidden lg:flex flex-col items-end gap-10 opacity-0">
          <div className="text-right">
            <div className="text-[clamp(3rem,5vw,4.5rem)] font-semibold tracking-[-0.03em] text-text leading-none mb-2">
              6
            </div>
            <div className="text-[11px] tracking-[0.2em] uppercase text-text-muted">Groundset Models</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-right">
            <div className="text-[clamp(3rem,5vw,4.5rem)] font-semibold tracking-[-0.03em] text-text leading-none mb-2">
              32
            </div>
            <div className="text-[11px] tracking-[0.2em] uppercase text-text-muted">Policy Rules / Sec</div>
          </div>
          <div className="w-px h-12 bg-border" />
          <div className="text-right">
            <div className="text-[clamp(2rem,3vw,2.5rem)] font-semibold tracking-[-0.02em] text-accent leading-none mb-2">
              3
            </div>
            <div className="text-[11px] tracking-[0.2em] uppercase text-text-muted">Continents Deployed</div>
          </div>
        </div>
      </div>

      {/* Bottom badges */}
      <div ref={badgesRef} className="absolute bottom-16 left-0 right-0 px-8 md:px-16">
        <div className="max-w-[1400px] mx-auto flex items-center gap-10">
          {['SOC 2 Type II', 'HIPAA', 'ISO 27001', 'Zero Egress'].map(badge => (
            <span key={badge} className="text-[10px] tracking-[0.2em] uppercase text-text-muted font-light">
              {badge}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  )
}
