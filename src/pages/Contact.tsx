import { useState } from 'react'
import type { NavigateProps } from '../types'
import { Reveal } from '../components/Reveal'
import ChipSelector from '../components/ChipSelector'

const roles = ['CTO / VP Engineering', 'Head of Compliance / Legal', 'CRO / VP Revenue', 'CEO / Founder', 'ML / Data Science Lead', 'IT / Infrastructure', 'Other']
const useCases = ['Loan underwriting / credit decisioning', 'KYC / AML / fraud detection', 'Insurance claims processing', 'Prior authorization (healthcare)', 'Medical coding / clinical documentation', 'Contract / document review', 'Regulatory reporting / compliance', 'Other']
const engagements = ['Technical demo', 'Architecture review', 'Proof of concept (8-week pilot)', 'Pricing / commercial discussion', 'Security / compliance review', 'General inquiry']

export default function Contact({ navigate }: NavigateProps) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', role: '', useCase: '', engagement: '', message: '', timeline: '' })
  const [focused, setFocused] = useState('')

  const inputStyle = (field: string) => ({
    width: '100%',
    padding: '10px 14px',
    fontSize: '0.875rem',
    borderRadius: '6px',
    border: `1px solid ${focused === field ? 'var(--ring)' : 'var(--border)'}`,
    background: 'var(--background)',
    color: 'var(--foreground)',
    outline: 'none',
    boxShadow: focused === field ? `0 0 0 3px color-mix(in srgb, var(--ring) 18%, transparent)` : 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  })

  if (submitted) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center text-center gap-6">
        <div
          className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center"
          style={{ animation: 'fade-up 0.5s ease both' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <div style={{ animation: 'fade-up 0.5s ease 80ms both' }}>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight mb-3">{"We'll be in touch within one business day"}</h1>
          <p className="text-muted-foreground max-w-md leading-relaxed mx-auto">
            A technical team member — not an SDR — will reach out to schedule the right first conversation for your situation.
          </p>
        </div>
        <p className="text-sm text-muted-foreground font-mono-data" style={{ animation: 'fade-up 0.5s ease 160ms both' }}>{form.email}</p>
        <button onClick={() => navigate('home')} className="btn btn-ghost text-sm" style={{ animation: 'fade-up 0.5s ease 240ms both' }}>
          ← Back to home
        </button>
      </div>
    )
  }

  return (
    <div>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-12 items-start">
          <Reveal direction="left">
            <p className="text-[11px] font-mono-data text-accent uppercase tracking-widest mb-4">Get Started</p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-5">
              Tell us about your workflow
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              The more specific you are, the faster we can get you to the right conversation.
            </p>

            <div className="space-y-5">
              {[
                { emoji: '⚡', title: 'Response time', body: 'Within one business day. You will hear from a technical team member, not a form email.' },
                { emoji: '🔒', title: 'Your information', body: 'This form is for BPOptima use only. We do not sell or share contact data.' },
                { emoji: '📅', title: 'First meeting', body: "Typically a 45-minute technical discovery call. We'll come prepared with questions about your specific workflow." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-border bg-card" style={{ transition: 'border-color 0.2s', cursor: 'default' }}>
                  <span className="text-xl">{item.emoji}</span>
                  <div>
                    <div className="text-sm font-medium text-foreground mb-0.5">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={100}>
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Full name <span className="text-primary">*</span></label>
                  <input
                    required type="text" value={form.name} placeholder="Sarah Chen"
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={() => setFocused('name')} onBlur={() => setFocused('')}
                    style={inputStyle('name')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Work email <span className="text-primary">*</span></label>
                  <input
                    required type="email" value={form.email} placeholder="sarah@company.com"
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                    style={inputStyle('email')}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Company <span className="text-primary">*</span></label>
                  <input
                    required type="text" value={form.company} placeholder="Acme Financial"
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    onFocus={() => setFocused('company')} onBlur={() => setFocused('')}
                    style={inputStyle('company')}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Your role</label>
                  <select
                    value={form.role}
                    onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                    onFocus={() => setFocused('role')} onBlur={() => setFocused('')}
                    style={{ ...inputStyle('role'), appearance: 'none' as const }}
                  >
                    <option value="">Select role</option>
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Primary use case <span className="text-primary">*</span></label>
                <select
                  required value={form.useCase}
                  onChange={e => setForm(f => ({ ...f, useCase: e.target.value }))}
                  onFocus={() => setFocused('useCase')} onBlur={() => setFocused('')}
                  style={{ ...inputStyle('useCase'), appearance: 'none' as const }}
                >
                  <option value="">Select use case</option>
                  {useCases.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">What are you looking for?</label>
                <ChipSelector options={engagements} value={form.engagement} onChange={v => setForm(f => ({ ...f, engagement: v }))} />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1.5">Describe your workflow or question</label>
                <textarea
                  rows={4} value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  onFocus={() => setFocused('message')} onBlur={() => setFocused('')}
                  placeholder="What documents do you process? What decisions need to be made? What's broken about your current process?"
                  style={{ ...inputStyle('message'), resize: 'none' }}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-2">Decision timeline</label>
                <ChipSelector
                  options={['Evaluating now', 'Q3 2026', 'Q4 2026', '2027', 'No timeline yet']}
                  value={form.timeline}
                  onChange={v => setForm(f => ({ ...f, timeline: v }))}
                />
              </div>

              <button type="submit" className="btn btn-primary w-full" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
                Send Message
              </button>

              <p className="text-[11px] text-muted-foreground text-center font-mono-data">
                By submitting, you agree to our{' '}
                <a href="#" className="underline hover:text-foreground transition-colors">Privacy Policy</a>.
                {' '}We will not share your information.
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Alt contact */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { label: 'General', value: 'hello@bpoptima.com' },
              { label: 'Security disclosures', value: 'security@bpoptima.com' },
              { label: 'Press inquiries', value: 'press@bpoptima.com' },
            ].map(item => (
              <div key={item.label} className="p-5 rounded-xl border border-border bg-card card-interactive" style={{ cursor: 'default' }}>
                <div className="text-[10px] font-mono-data text-muted-foreground uppercase tracking-widest mb-2">{item.label}</div>
                <a href={`mailto:${item.value}`} className="text-sm text-foreground hover:text-primary transition-colors">{item.value}</a>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  )
}
