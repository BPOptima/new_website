import type { NavigateProps } from '../types'
import { Reveal, Stagger } from '../components/Reveal'
import PageHeader from '../components/PageHeader'

const tiers = [
  {
    name: 'Foundation',
    tagline: 'One use case. One VPC. Get to production fast.',
    pricing: 'Contact for pricing',
    priceNote: 'Annual subscription',
    highlight: false,
    features: [
      '1 Groundset™ model (your choice)',
      'Up to 50K decisions/day',
      'VPC deployment (AWS, GCP, or Azure)',
      'Standard policy engine',
      'Audit ledger — 90-day retention',
      'REST API + webhooks',
      'Email support + docs',
      '99.9% uptime SLA',
      '12-week onboarding included',
    ],
    notIncluded: ['Multi-model pipelines', 'Custom model fine-tuning', 'Dedicated ML support'],
    cta: 'Talk to Sales',
    ctaStyle: 'ghost',
  },
  {
    name: 'Enterprise',
    tagline: 'Multi-workflow, multi-team, production-grade reliability.',
    pricing: 'Contact for pricing',
    priceNote: 'Annual subscription · volume discounts available',
    highlight: true,
    features: [
      'All 6 Groundset™ models',
      'Unlimited decisions',
      'Multi-VPC / multi-region deployment',
      'Advanced policy engine with version control',
      'Audit ledger — 7-year retention + SIEM',
      'REST API + gRPC + streaming',
      'Dedicated CSM + ML engineering support',
      '99.97% uptime SLA',
      'Custom model fine-tuning on your data',
      'SSO/SAML + RBAC',
      'Quarterly business reviews',
    ],
    notIncluded: [],
    cta: 'Book a Demo',
    ctaStyle: 'primary',
  },
  {
    name: 'Sovereign',
    tagline: 'Air-gapped. No outbound traffic. Maximum security posture.',
    pricing: 'Contact for pricing',
    priceNote: 'Custom engagement',
    highlight: false,
    features: [
      'All Enterprise features',
      'Air-gapped deployment (no outbound network)',
      'On-premises hardware option',
      'Offline model update mechanism',
      'Zero telemetry',
      'Dedicated security review package',
      'Custom SLA + response times',
      'FedRAMP roadmap access',
      'Resident deployment support',
    ],
    notIncluded: [],
    cta: 'Talk to Security Team',
    ctaStyle: 'ghost',
  },
]

const faq = [
  { q: "Why is there no self-serve pricing?", a: "BPOptima deploys inside your infrastructure, which means every implementation is different. We scope based on cloud environment, decision volumes, and compliance requirements. We don't hide pricing — we'll give you a clear number in the first call." },
  { q: "What does 'contact for pricing' actually mean?", a: "Foundation tier typically ranges $X–$Y/year. Enterprise starts at $Z. We'll tell you on the first call, scoped to your use case." },
  { q: "How long does deployment take?", a: "Foundation is 12 weeks from signed contract to production. Enterprise is 16–20 weeks depending on scope. Sovereign is custom-scoped." },
  { q: "Can I run a proof of concept before committing?", a: "Yes. We offer a structured 8-week pilot on a bounded use case with clear success criteria agreed up front. POC pricing is credited toward year one if you proceed." },
  { q: "What happens to my data during fine-tuning?", a: "Training data stays in your environment. We provide tooling to run fine-tuning jobs inside your VPC. Model weights produced are yours and never leave your perimeter." },
]

export default function Pricing({ navigate }: NavigateProps) {
  return (
    <div>
      <PageHeader
        eyebrow="Pricing"
        heading="Three tiers. All deployed inside your VPC."
        description="Every tier includes full VPC deployment, the policy engine, and an audit ledger. What scales is model depth, decision volume, security posture, and support level."
      />

      {/* Tiers */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Stagger className="grid md:grid-cols-3 gap-5" baseDelay={0} stagger={80}>
          {tiers.map((tier, i) => (
            <div
              key={i}
              className="rounded-2xl border flex flex-col relative"
              style={{
                borderColor: tier.highlight ? 'var(--primary)' : 'var(--border)',
                background: tier.highlight ? 'color-mix(in srgb, var(--primary) 3%, var(--card))' : 'var(--card)',
                boxShadow: tier.highlight ? '0 0 0 1px var(--primary), var(--shadow-card-hover)' : 'var(--shadow-card)',
                transition: 'box-shadow 0.25s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'none')}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex text-[10px] font-mono-data font-semibold px-3 py-1 rounded-full bg-primary text-primary-foreground">
                    Most common
                  </span>
                </div>
              )}

              <div className={`p-8 border-b ${tier.highlight ? 'border-primary/20' : 'border-border'}`}>
                <div className="text-lg font-semibold text-foreground mb-1">{tier.name}</div>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{tier.tagline}</p>
                <div className="text-xl font-semibold text-foreground">{tier.pricing}</div>
                <div className="text-xs text-muted-foreground font-mono-data mt-0.5">{tier.priceNote}</div>
              </div>

              <div className="p-8 flex-1 flex flex-col gap-6">
                <ul className="space-y-2.5">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-foreground">
                      <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                  {tier.notIncluded.map((f, j) => (
                    <li key={`n-${j}`} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18M6 6l12 12"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('contact')}
                  className={`mt-auto w-full btn ${tier.ctaStyle === 'primary' ? 'btn-primary' : 'btn-ghost'}`}
                >
                  {tier.cta}
                </button>
              </div>
            </div>
          ))}
        </Stagger>

        <Reveal delay={200}>
          <div className="mt-8 p-5 rounded-xl border border-border bg-card text-center">
            <p className="text-sm text-muted-foreground">
              Need a proof of concept first?{' '}
              <button onClick={() => navigate('contact')} className="text-primary hover:underline font-medium">
                Ask about our 8-week pilot program
              </button>
              {' '}— success criteria defined up front, pricing credited toward year one.
            </p>
          </div>
        </Reveal>
      </section>

      {/* What's included */}
      <section className="border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <h2 className="text-xl font-semibold text-foreground mb-8 tracking-tight">What every tier includes</h2>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" stagger={60}>
            {[
              { title: 'In-VPC Deployment', body: 'All compute stays in your cloud environment.' },
              { title: 'Full Audit Trail', body: 'Every decision written to an immutable, tamper-evident log.' },
              { title: 'Policy Engine', body: 'Deterministic rule evaluation — not probabilistic model guessing.' },
              { title: '12-Week Onboarding', body: 'Our engineers deploy, configure, and tune alongside your team.' },
            ].map((item, i) => (
              <div key={i} className="p-5 rounded-xl border border-border bg-background card-interactive" style={{ cursor: 'default' }}>
                <div className="text-sm font-semibold text-foreground mb-1.5">{item.title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{item.body}</div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal>
          <h2 className="text-xl font-semibold text-foreground mb-10 tracking-tight">Frequently asked</h2>
        </Reveal>
        <div className="space-y-5 max-w-3xl">
          {faq.map((item, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="pb-5 border-b border-border last:border-0">
                <div className="text-sm font-semibold text-foreground mb-2">{item.q}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{item.a}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  )
}
