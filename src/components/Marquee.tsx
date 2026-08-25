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

    const contentWidth = content.offsetWidth
    const viewportWidth = track.parentElement?.offsetWidth || window.innerWidth
    const copies = Math.ceil(viewportWidth / contentWidth) + 1

    for (let i = 0; i < copies; i++) {
      track.appendChild(content.cloneNode(true) as HTMLElement)
    }

    const dur = contentWidth / speed

    const tween = gsap.to(track, {
      x: direction === 'left' ? -contentWidth : contentWidth,
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
