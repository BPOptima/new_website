import type { NavigateProps } from '../types'
import { Reveal, Stagger } from '../components/Reveal'
import PageHeader from '../components/PageHeader'
import antlerLogo from '@/imports/antler-logo.svg'

const values = [
  { title: 'Regulation as a design constraint', body: 'We build for regulated industries, not in spite of them. Every product decision starts with "can a regulator inspect this?" as a first-class requirement.' },
  { title: 'Determinism over convenience', body: 'It would be easier to build on top of a public LLM. We chose not to, because our customers need the same output every time — not a probabilistic approximation.' },
  { title: 'Your infrastructure, your data', body: 'We will never have a business model that depends on seeing your data. Deploying inside your VPC is not a premium add-on — it is the default.' },
  { title: 'Depth over breadth', body: 'Six domain models, each fine-tuned for real-world industry data. Not one model trying to do everything.' },
]

const team = [
  { name: 'Placeholder — Founder / CEO', role: 'Previously [Company]. Background in [Domain].', initials: 'F' },
  { name: 'Placeholder — CTO', role: 'Previously [Company]. ML/systems background.', initials: 'T' },
  { name: 'Placeholder — Head of ML', role: 'PhD [University]. Domain: NLP for regulated industries.', initials: 'M' },
  { name: 'Placeholder — VP Sales', role: 'Previously [Company]. Financial services focus.', initials: 'S' },
]

const openRoles = [
  { title: 'Senior ML Engineer — NLP', team: 'ML', location: 'Remote (US/EU)', type: 'Full-time' },
  { title: 'Solutions Engineer — Financial Services', team: 'GTM', location: 'New York / Remote', type: 'Full-time' },
  { title: 'Senior Software Engineer — Infrastructure', team: 'Engineering', location: 'Remote', type: 'Full-time' },
  { title: 'Enterprise Account Executive', team: 'Sales', location: 'New York / Chicago', type: 'Full-time' },
  { title: 'Head of Compliance & Security', team: 'Ops', location: 'Remote (US)', type: 'Full-time' },
]

export default function Company({ navigate }: NavigateProps) {
  return (
    <div>
      <PageHeader
        eyebrow="Company"
        heading="Building infrastructure for decisions that matter"
        description="Founded on the belief that regulated industries deserve AI they can actually own — not a subscription to someone else's API, not a shared model, not a black box."
      />

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16 items-start">
        <Reveal direction="left">
          <h2 className="text-2xl font-semibold text-foreground tracking-tight mb-6">Our mission</h2>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Every day, billions of regulated decisions — loan approvals, insurance claims, prior authorizations, compliance screenings — are made by humans reading documents. The process is slow, expensive, error-prone, and hard to audit.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-5">
            AI can automate these decisions at scale. But only if it operates inside the compliance and trust constraints that regulated industries require — not as a cloud API that sends sensitive documents to a third party.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We build the infrastructure layer that makes that possible: domain-specific models, a deterministic policy engine, and a full audit trail — deployed inside your perimeter.
          </p>
          <div className="mt-8 p-6 rounded-xl border border-border bg-card card-interactive" style={{ cursor: 'default' }}>
            <p className="text-[10px] font-mono-data text-muted-foreground uppercase tracking-widest mb-3">Backed by</p>
            <img
              src={antlerLogo} alt="Antler" className="h-8 object-contain"
              style={{ opacity: 0.65, transition: 'opacity 0.2s ease' }}
              onMouseEnter={e => ((e.target as HTMLImageElement).style.opacity = '1')}
              onMouseLeave={e => ((e.target as HTMLImageElement).style.opacity = '0.65')}
            />
          </div>
        </Reveal>

        <Stagger className="space-y-4" stagger={70} baseDelay={100}>
          {values.map((v, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-border bg-card"
              style={{ transition: 'border-color 0.2s ease, transform 0.2s cubic-bezier(0.16,1,0.3,1)', cursor: 'default' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'color-mix(in srgb, var(--foreground) 20%, transparent)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateX(4px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLDivElement).style.transform = 'none' }}
            >
              <div className="text-sm font-semibold text-foreground mb-1.5">{v.title}</div>
              <div className="text-sm text-muted-foreground leading-relaxed">{v.body}</div>
            </div>
          ))}
        </Stagger>
      </section>

      {/* Team */}
      <section className="border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Reveal>
            <h2 className="text-xl font-semibold text-foreground mb-2 tracking-tight">Team</h2>
            <p className="text-sm text-muted-foreground mb-10">Headshots and full bios will be added when approved for publication.</p>
          </Reveal>
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-4" stagger={60}>
            {team.map((member, i) => (
              <div key={i} className="p-5 rounded-xl border-2 border-dashed border-border flex flex-col gap-3 card-interactive" style={{ cursor: 'default' }}>
                <div className="w-12 h-12 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center">
                  <span className="text-sm font-mono-data text-muted-foreground">{member.initials}</span>
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground mb-0.5">{member.name}</div>
                  <div className="text-xs text-muted-foreground">{member.role}</div>
                </div>
              </div>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Careers */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-xl font-semibold text-foreground tracking-tight mb-2">Careers</h2>
              <p className="text-sm text-muted-foreground">We hire for depth. Small team, large problems, serious ownership.</p>
            </div>
            <span className="text-xs font-mono-data text-muted-foreground">{openRoles.length} open roles</span>
          </div>
        </Reveal>
        <div className="space-y-2">
          {openRoles.map((role, i) => (
            <Reveal key={i} delay={i * 50}>
              <div
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-xl border border-border bg-background group cursor-pointer"
                style={{ transition: 'background 0.15s ease, border-color 0.15s ease, transform 0.2s ease' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--card)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateX(4px)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'var(--background)'; (e.currentTarget as HTMLDivElement).style.transform = 'none' }}
              >
                <div>
                  <div className="text-sm font-semibold text-foreground">{role.title}</div>
                  <div className="flex flex-wrap gap-3 mt-1.5">
                    <span className="text-xs text-muted-foreground font-mono-data">{role.team}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{role.location}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{role.type}</span>
                  </div>
                </div>
                <div className="text-primary flex-shrink-0" style={{ transition: 'transform 0.2s ease, opacity 0.2s ease', opacity: 0 }}
                  ref={el => {
                    if (!el) return
                    const parent = el.parentElement!
                    parent.addEventListener('mouseenter', () => { el.style.opacity = '1'; el.style.transform = 'translateX(4px)' })
                    parent.addEventListener('mouseleave', () => { el.style.opacity = '0'; el.style.transform = 'none' })
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-6 font-mono-data">
          {"Don't see a fit? Send a note to careers@bpoptima.com — we read every application."}
        </p>
      </section>
    </div>
  )
}
