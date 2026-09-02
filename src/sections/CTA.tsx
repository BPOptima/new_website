import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from '../components/MagneticButton'
import { buildMailLink, isMobileDevice } from '../lib/mail'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = sectionRef.current?.querySelectorAll('.cta-line')
      if (lines) {
        gsap.from(lines, {
          yPercent: 100,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })
      }

      const sub = sectionRef.current?.querySelector('.cta-sub')
      if (sub) {
        gsap.from(sub, {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })
      }

      const buttons = sectionRef.current?.querySelector('.cta-buttons')
      if (buttons) {
        gsap.from(buttons.children, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="cta" ref={sectionRef} className="min-h-screen flex items-center justify-center border-t border-border">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold tracking-[-0.03em] leading-[1] mb-8">
          <span className="block overflow-hidden">
            <span className="cta-line block">Ready to own your</span>
          </span>
          <span className="block overflow-hidden">
            <span className="cta-line block">AI decisions?</span>
          </span>
        </h2>

        <p className="cta-sub text-xl md:text-2xl text-text-secondary font-light leading-relaxed max-w-2xl mx-auto mb-14">
          Deploy sovereign AI inside your infrastructure in 12 weeks. Talk to our team about your regulated workflow.
        </p>

        <div className="cta-buttons flex flex-col sm:flex-row justify-center gap-5">
          <MagneticButton
            href={buildMailLink('dj@bpoptima.com', 'Technical Demo Request')}
            target={isMobileDevice() ? undefined : '_blank'}
            rel={isMobileDevice() ? undefined : 'noopener noreferrer'}
            variant="primary"
            className="group"
          >
            Book a Technical Demo
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </MagneticButton>
          <MagneticButton
            href={buildMailLink('dj@bpoptima.com', 'Security Docs Request')}
            target={isMobileDevice() ? undefined : '_blank'}
            rel={isMobileDevice() ? undefined : 'noopener noreferrer'}
            variant="ghost"
          >
            Request Security Docs
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
