import type { NavigateProps } from '../types'
import { Reveal, Stagger } from '../components/Reveal'
import PageHeader from '../components/PageHeader'
import SectionCTA from '../components/SectionCTA'
import logoAiralo from '@/imports/logo-airalo.png'
import logoFileAI from '@/imports/logo-fileai.png'
import logoMicro1 from '@/imports/logo-micro1.png'
import logoLovable from '@/imports/logo-lovable.svg'

const cases = [
  {
    logo: logoAiralo, logoAlt: 'Airalo', company: 'Airalo', industry: 'Fintech / Telecom',
    outcome: '$1.2M saved in year one',
    outcomeDetail: 'Automated document processing for eSIM provisioning compliance workflows',
    metrics: [{ label: 'Manual review reduction', value: '89%' }, { label: 'Processing time', value: '2.1 hrs → 11 min' }, { label: 'Compliance incidents', value: '0 in 18 months' }],
    quote: 'Placeholder — awaiting customer approval for public attribution.',
    quoteAuthor: '[Head of Compliance, Airalo]',
    models: ['Groundset Logic', 'Groundset Speed'],
  },
  {
    logo: logoMicro1, logoAlt: 'Micro1', company: 'Micro1', industry: 'HR Tech',
    outcome: '4.2× faster candidate screening',
    outcomeDetail: 'AI-assisted resume and credential verification for regulated markets',
    metrics: [{ label: 'Screened per day', value: '12,000 → 50,400' }, { label: 'False positive rate', value: '14% → 3.1%' }, { label: 'Time to hire reduction', value: '31%' }],
    quote: 'Placeholder — awaiting customer approval for public attribution.',
    quoteAuthor: '[CTO, Micro1]',
    models: ['Groundset Logic', 'Groundset Vision'],
  },
  {
    logo: logoFileAI, logoAlt: 'FileAI', company: 'FileAI', industry: 'Document Intelligence',
    outcome: '94% straight-through processing rate',
    outcomeDetail: 'Automated extraction and routing of financial document packages',
    metrics: [{ label: 'Extraction accuracy', value: '97.4%' }, { label: 'Documents/day capacity', value: '200K+' }, { label: 'Integration time', value: '6 weeks' }],
    quote: 'Placeholder — awaiting customer approval for public attribution.',
    quoteAuthor: '[CEO, FileAI]',
    models: ['Groundset Logic', 'Groundset Vision', 'Groundset Speed'],
  },
  {
    logo: logoLovable, logoAlt: 'Lovable', company: 'Lovable', industry: 'SaaS Platform',
    outcome: '$0.31 cost per decision',
    outcomeDetail: 'Policy enforcement and content compliance at scale',
    metrics: [{ label: 'Cost per decision', value: '$2.10 → $0.31' }, { label: 'Latency P99', value: '82ms' }, { label: 'Uptime', value: '99.98%' }],
    quote: 'Placeholder — awaiting customer approval for public attribution.',
    quoteAuthor: '[VP Engineering, Lovable]',
    models: ['Groundset Logic', 'Groundset Speed'],
  },
]

export default function CaseStudies({ navigate }: NavigateProps) {
  return (
    <div>
      <PageHeader
        eyebrow="Proof / Case Studies"
        heading="Real decisions. Real outcomes."
        description="Structured placeholders — these frames will be replaced with confirmed customer references, quotes, and verified metrics."
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-dashed border-border text-xs text-muted-foreground font-mono-data">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
          Pending customer approval — metrics are illustrative targets
        </div>
      </PageHeader>

      <section className="max-w-7xl mx-auto px-6 py-16 space-y-6">
        {cases.map((c, i) => (
          <Reveal key={i} delay={i * 80}>
            <div
              className="rounded-2xl border border-border bg-card overflow-hidden"
              style={{ transition: 'border-color 0.25s ease, box-shadow 0.25s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'color-mix(in srgb, var(--foreground) 15%, transparent)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-card-hover)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
            >
              <div className="grid md:grid-cols-[280px_1fr]">
                <div className="p-8 border-b md:border-b-0 md:border-r border-border flex flex-col gap-5">
                  <img src={c.logo} alt={c.logoAlt} className="h-7 object-contain object-left" />
                  <div>
                    <div className="text-xs text-muted-foreground font-mono-data mb-1">{c.industry}</div>
                    <div className="text-2xl font-semibold text-foreground tracking-tight">{c.outcome}</div>
                    <div className="text-sm text-muted-foreground mt-1 leading-relaxed">{c.outcomeDetail}</div>
                  </div>
                  <div className="space-y-3 pt-2 border-t border-border">
                    {c.metrics.map((m, j) => (
                      <div key={j} className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">{m.label}</span>
                        <span className="text-xs font-mono-data font-medium text-foreground">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 flex flex-col gap-6">
                  <div className="flex-1 p-6 rounded-xl border-2 border-dashed border-border bg-muted/20 flex flex-col items-center justify-center text-center gap-3 min-h-[120px]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/40">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                    </svg>
                    <p className="text-sm text-muted-foreground italic">{c.quote}</p>
                    <p className="text-xs text-muted-foreground font-mono-data">{c.quoteAuthor}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono-data text-muted-foreground uppercase tracking-widest">Models used:</span>
                    {c.models.map(m => (
                      <span key={m} className="text-[11px] px-2 py-0.5 rounded-md border border-primary/20 bg-primary/5 text-primary">{m}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal>
          <SectionCTA heading="Become a reference customer" sub="Early customers get dedicated ML engineering support and co-marketing opportunities." cta="Become a Design Partner" onClick={() => navigate('contact')} />
        </Reveal>
      </section>
    </div>
  )
}
