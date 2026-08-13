import type { Page } from '../types'
import bpLogo from '@/imports/bpoptima-logo-nav.jpg'

interface FooterProps {
  navigate: (page: Page) => void
}

const footerNav = {
  Product: [
    { label: 'Platform', page: 'platform' as Page },
    { label: 'Groundset™ Models', page: 'models' as Page },
    { label: 'Security', page: 'security' as Page },
    { label: 'Pricing', page: 'pricing' as Page },
  ],
  Solutions: [
    { label: 'Financial Services', page: 'solutions' as Page },
    { label: 'Healthcare', page: 'solutions' as Page },
    { label: 'Insurance', page: 'solutions' as Page },
    { label: 'Case Studies', page: 'case-studies' as Page },
  ],
  Company: [
    { label: 'About', page: 'company' as Page },
    { label: 'Careers', page: 'company' as Page },
    { label: 'Blog', page: 'resources' as Page },
    { label: 'Contact', page: 'contact' as Page },
  ],
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card/30 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <button onClick={() => navigate('home')} className="mb-4 block">
              <img src={bpLogo} alt="BPOptima" className="h-8 object-contain" />
            </button>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Sovereign Decision Infrastructure for regulated operations. Deployed inside your VPC, not ours.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="p-2 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors" aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="p-2 rounded-md border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors" aria-label="Twitter/X">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {Object.entries(footerNav).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-widest mb-4">{section}</p>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.page)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BPOptima, Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Security Policy'].map(item => (
              <a key={item} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
