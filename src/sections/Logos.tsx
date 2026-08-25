import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Marquee from '../components/Marquee'
import antlerLogo from '@/imports/antler-logo.svg'
import logoAiralo from '@/imports/logo-airalo.png'
import logoFileAI from '@/imports/logo-fileai.png'
import logoMicro1 from '@/imports/logo-micro1.png'
import logoLovable from '@/imports/logo-lovable.svg'

gsap.registerPlugin(ScrollTrigger)

const logos = [
  { src: logoMicro1, alt: 'Micro1' },
  { src: logoAiralo, alt: 'Airalo' },
  { src: logoFileAI, alt: 'FileAI' },
  { src: logoLovable, alt: 'Lovable' },
]

export default function Logos() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-8 mb-8">
        <div className="flex items-center gap-5">
          <span className="text-[11px] tracking-[0.2em] uppercase text-text-muted">Backed by</span>
          <img src={antlerLogo} alt="Antler" className="h-7 opacity-70" />
        </div>
      </div>

      <Marquee speed={30} className="py-6">
        {logos.map(logo => (
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            className="h-5 object-contain opacity-70 mx-16"
          />
        ))}
        {logos.map(logo => (
          <img
            key={`${logo.alt}-2`}
            src={logo.src}
            alt={logo.alt}
            className="h-5 object-contain opacity-70 mx-16"
          />
        ))}
      </Marquee>
    </section>
  )
}
