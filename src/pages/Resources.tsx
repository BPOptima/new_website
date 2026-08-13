import { useState } from 'react'
import type { NavigateProps } from '../types'
import { Reveal, Stagger } from '../components/Reveal'
import PageHeader from '../components/PageHeader'
import ChipSelector from '../components/ChipSelector'

const articles = [
  { tag: 'Technical', title: 'Deterministic vs. Probabilistic AI: Why the Difference Matters for Regulated Decisions', summary: 'A probabilistic model may give you the right answer 97% of the time. In lending, that 3% is a regulatory violation.', readTime: '12 min', date: 'Jul 15, 2026' },
  { tag: 'Case Study', title: 'How Prior Authorization Processing Can Go From 6.8 Days to Under 4 Hours', summary: 'A walkthrough of the architecture, policy rules, and escalation design behind a prior auth pipeline for a regional health system.', readTime: '9 min', date: 'Jul 8, 2026' },
  { tag: 'Compliance', title: 'What Your Regulator Actually Wants to See When You Show Them an AI Decision', summary: 'OCC, CFPB, and CMS guidance on AI explainability — translated into system design requirements your engineering team can act on.', readTime: '14 min', date: 'Jun 24, 2026' },
  { tag: 'Technical', title: 'Small Language Models vs. Large Language Models: The Case for Smaller in Production', summary: 'GPT-4 level models have impressive benchmark scores. They also have 300ms latency, unpredictable outputs, and zero auditability.', readTime: '10 min', date: 'Jun 12, 2026' },
  { tag: 'Product', title: 'Groundset™ Model Selection Guide: Matching Workflows to the Right SLM', summary: 'Logic, Vision, Motion, Audio, Speed, or Sovereign? A decision framework for choosing the right Groundset™ model combination.', readTime: '8 min', date: 'Jun 3, 2026' },
  { tag: 'Security', title: 'VPC Deployment Patterns for AI Inference: AWS, GCP, and Azure Compared', summary: 'Architecture diagrams and tradeoffs for deploying self-hosted AI inference across the three major cloud providers.', readTime: '16 min', date: 'May 20, 2026' },
]

const tags = ['All', 'Technical', 'Compliance', 'Case Study', 'Security', 'Product', 'Guide']

const tagStyle: Record<string, string> = {
  Technical: 'border-primary/20 bg-primary/5 text-primary',
  Compliance: 'border-accent/20 bg-accent/5 text-accent',
  'Case Study': 'border-green-500/20 bg-green-500/5 text-green-600',
  Security: 'border-yellow-500/20 bg-yellow-500/5 text-yellow-600',
  Product: 'border-border bg-muted text-muted-foreground',
  Guide: 'border-border bg-muted text-muted-foreground',
}

export default function Resources({ navigate }: NavigateProps) {
  const [activeTag, setActiveTag] = useState('All')

  const filtered = activeTag === 'All' ? articles : articles.filter(a => a.tag === activeTag)

  return (
    <div>
      <PageHeader
        eyebrow="Resources"
        heading="Technical writing for serious buyers"
        description="No thought leadership fluff. Architecture guides, compliance breakdowns, and honest case studies for engineers and decision-makers evaluating AI infrastructure."
      />

      {/* Featured */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Reveal>
            <div className="grid md:grid-cols-[1fr_320px] gap-8 items-center">
              <div>
                <span className="inline-flex text-[10px] font-mono-data font-medium px-2 py-0.5 rounded-md border border-primary/20 bg-primary/5 text-primary mb-4">
                  Guide
                </span>
                <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-3">
                  {"The Regulated Enterprise's Guide to AI Decision Systems"}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  Why generic LLM APIs fail compliance requirements, and what architecture actually works for lending, insurance, and healthcare — with a framework for evaluating any AI decision tool.
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono-data">
                  <span>18 min read</span><span>·</span><span>Jul 28, 2026</span><span>·</span><span>BPOptima ML Team</span>
                </div>
              </div>
              <div
                className="aspect-video rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 bg-muted/20 card-interactive"
                style={{ cursor: 'default' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground/40">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
                <span className="text-[10px] text-muted-foreground font-mono-data">Article hero image</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Articles */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal>
          <div className="mb-10">
            <ChipSelector options={tags} value={activeTag} onChange={setActiveTag} />
          </div>
        </Reveal>

        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" stagger={60}>
          {filtered.map((article, i) => (
            <article
              key={i}
              className="p-6 rounded-xl border border-border bg-card flex flex-col gap-4 cursor-pointer"
              style={{ transition: 'border-color 0.2s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1), box-shadow 0.2s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)'; (e.currentTarget as HTMLElement).style.borderColor = 'color-mix(in srgb, var(--foreground) 15%, transparent)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
            >
              <span className={`self-start text-[10px] font-mono-data font-medium px-2 py-0.5 rounded-md border ${tagStyle[article.tag] || 'border-border bg-muted text-muted-foreground'}`}>
                {article.tag}
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug">{article.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{article.summary}</p>
              </div>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono-data pt-2 border-t border-border">
                <span>{article.readTime} read</span>
                <span>{article.date}</span>
              </div>
            </article>
          ))}
        </Stagger>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <div className="max-w-xl">
              <h2 className="text-xl font-semibold text-foreground mb-2 tracking-tight">Stay current on regulated AI</h2>
              <p className="text-sm text-muted-foreground mb-6">New articles, compliance updates, and architecture guides — roughly twice a month. No marketing emails.</p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1"
                  style={{
                    padding: '10px 14px',
                    fontSize: '0.875rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    background: 'var(--background)',
                    color: 'var(--foreground)',
                    outline: 'none',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--ring)'; e.target.style.boxShadow = '0 0 0 3px color-mix(in srgb, var(--ring) 18%, transparent)' }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
                <button className="btn btn-primary" onClick={() => navigate('contact')}>Subscribe</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3 font-mono-data">Unsubscribe any time. No spam, ever.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
