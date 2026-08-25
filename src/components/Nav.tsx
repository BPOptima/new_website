import { useState, useEffect } from 'react'
import bpLogo from '@/imports/bpoptima-logo-nav.jpg'

const links = [
  { label: 'Platform', href: '#pipeline' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Security', href: '#security' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
        <a href="#hero" className="flex-shrink-0">
          <img src={bpLogo} alt="BPOptima" className="h-7 object-contain invert brightness-200" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-[13px] text-text-secondary hover:text-text transition-colors duration-300 tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#cta"
            className="hidden sm:inline-flex items-center px-5 py-2 text-[13px] font-medium tracking-wide bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Request Demo
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text transition-colors"
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {mobileOpen
                ? <path d="M18 6L6 18M6 6l12 12" />
                : <path d="M3 12h18M3 6h18M3 18h18" />
              }
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-black">
          <div className="px-8 py-6 flex flex-col gap-1">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-[13px] text-text-secondary hover:text-text transition-colors tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setMobileOpen(false)}
              className="mt-4 px-5 py-3 text-[13px] font-medium text-center bg-white text-black rounded-full"
            >
              Request Demo
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
