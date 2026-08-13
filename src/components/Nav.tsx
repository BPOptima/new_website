import { useState, useEffect } from 'react'
import type { Page } from '../types'
import bpLogo from '@/imports/bpoptima-logo-nav.jpg'

interface NavProps {
  page: Page
  navigate: (page: Page) => void
  darkMode: boolean
  toggleDark: () => void
}

const navLinks: { label: string; page: Page }[] = [
  { label: 'How It Works', page: 'how-it-works' },
  { label: 'Platform', page: 'platform' },
  { label: 'Models', page: 'models' },
  { label: 'Solutions', page: 'solutions' },
  { label: 'Security', page: 'security' },
  { label: 'Pricing', page: 'pricing' },
  { label: 'Company', page: 'company' },
  { label: 'Resources', page: 'resources' },
]

export default function Nav({ page, navigate, darkMode, toggleDark }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [navProgress, setNavProgress] = useState(0)

  useEffect(() => {
    let raf: number
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const total = document.body.scrollHeight - window.innerHeight
        if (total <= 0) { setNavProgress(0); return }
        setNavProgress(Math.min(1, Math.max(0, window.scrollY / total)))
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  return (
    <header
      className="sticky top-0 z-50 border-b border-border"
      style={{ background: 'color-mix(in srgb, var(--background) 92%, transparent)', backdropFilter: 'blur(10px)', position: 'relative' }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-8">
        <button
          onClick={() => navigate('home')}
          className="flex-shrink-0 flex items-center"
          aria-label="BPOptima home"
          style={{ transition: 'opacity 0.2s ease' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          <img src={bpLogo} alt="BPOptima" className="h-9 object-contain" />
        </button>

        <nav className="hidden lg:flex items-center gap-0.5 flex-1">
          {navLinks.map(link => {
            const isActive = page === link.page
            return (
              <button
                key={link.page}
                onClick={() => navigate(link.page)}
                className={`nav-link px-3 py-1.5 text-sm rounded-md transition-colors ${
                  isActive ? 'text-primary font-medium active' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                style={{ transition: 'color 0.15s ease, background-color 0.15s ease' }}
              >
                {link.label}
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground transition-all"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{ transition: 'color 0.15s ease, background-color 0.15s ease, transform 0.2s ease' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'rotate(12deg)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
          >
            {darkMode ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/>
                <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <button
            onClick={() => navigate('case-studies')}
            className="hidden lg:inline-flex text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
          >
            Proof
          </button>

          <button
            onClick={() => navigate('contact')}
            className="hidden sm:inline-flex btn btn-primary text-sm"
            style={{ padding: '8px 18px' }}
          >
            Get Started
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)' }}
            >
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12"/>
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18"/>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll progress line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '1px',
          background: 'var(--primary)',
          width: navProgress * 100 + '%',
          transition: 'width 0.08s linear',
          opacity: navProgress > 0.01 ? 1 : 0,
        }}
      />

      {/* Mobile menu */}
      <div
        className="lg:hidden border-t border-border bg-background overflow-hidden"
        style={{
          maxHeight: mobileOpen ? '400px' : '0',
          transition: 'max-height 0.35s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => { navigate(link.page); setMobileOpen(false) }}
              className={`text-left px-3 py-2.5 text-sm rounded-md transition-colors ${
                page === link.page
                  ? 'bg-muted text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { navigate('contact'); setMobileOpen(false) }}
            className="btn btn-primary mt-2"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}
