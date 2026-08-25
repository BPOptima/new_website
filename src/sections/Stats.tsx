import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextReveal from '../components/TextReveal'

gsap.registerPlugin(ScrollTrigger)

function useCountUp(target: number, duration = 1400, active = false) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) { setValue(0); return }
    let raf: number
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, active])

  return value
}

function AnimatedStat({ target, prefix, suffix, label, active }: {
  target: number; prefix?: string; suffix: string; label: string; active: boolean
}) {
  const count = useCountUp(target, 1400, active)

  return (
    <div className="stat-block">
      <div className="text-[clamp(3rem,7vw,5.5rem)] font-semibold tracking-[-0.03em] text-text mb-3 leading-none">
        {prefix}{count}{suffix}
      </div>
      <div className="text-[13px] text-text-muted tracking-wide">{label}</div>
    </div>
  )
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = statsRef.current?.querySelectorAll('.stat-block')
      if (!items) return

      gsap.from(items, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          onEnter: () => setInView(true),
        },
      })

      const heading = sectionRef.current?.querySelector('.stats-heading')
      if (heading) {
        gsap.to(heading, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 md:py-44 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="stats-heading max-w-3xl mb-24">
          <TextReveal
            as="h2"
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-semibold tracking-[-0.02em] leading-[1.05] mb-6"
          >
            {"Numbers that\nmatter"}
          </TextReveal>
          <p className="text-xl text-text-secondary font-light">
            Measured across production deployments in financial services, healthcare, and insurance.
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-16 md:gap-12">
          <AnimatedStat target={100} prefix="<" suffix="ms" label="Decision latency P99" active={inView} />
          <AnimatedStat target={94} suffix="%" label="Straight-through rate" active={inView} />
          <AnimatedStat target={12} suffix="wk" label="Time to production" active={inView} />
          <AnimatedStat target={0} suffix=" bytes" label="Data egress" active={inView} />
        </div>
      </div>
    </section>
  )
}
