import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface MarqueeProps {
  children: React.ReactNode
  speed?: number
  direction?: 'left' | 'right'
  className?: string
}

export default function Marquee({ children, speed = 40, direction = 'left', className = '' }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const content = track.firstElementChild as HTMLElement
    if (!content) return

    const clone = content.cloneNode(true) as HTMLElement
    track.appendChild(clone)

    const width = content.offsetWidth
    const dur = width / speed

    const tween = gsap.to(track, {
      x: direction === 'left' ? -width : width,
      duration: dur,
      ease: 'none',
      repeat: -1,
    })

    return () => { tween.kill() }
  }, [speed, direction])

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max">
        <div className="flex items-center shrink-0">
          {children}
        </div>
      </div>
    </div>
  )
}
