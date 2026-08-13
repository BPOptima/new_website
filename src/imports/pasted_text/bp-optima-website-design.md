Design a complete, multi-page enterprise B2B SaaS website for BPOptima, a company that
sells "Sovereign Decision Infrastructure for Regulated Operations" — an on-prem/in-VPC
AI system that turns messy unstructured input (documents, images, logs) into
deterministic, auditable decisions for regulated industries (banking/lending,
insurance, healthcare). Current positioning: domain-trained small language models
(SLMs) + a deterministic policy layer + full audit trail, deployed inside the
customer's own VPC — not a generic LLM API wrapper.

DESIGN DIRECTION
- Aesthetic: premium enterprise infrastructure — think Vercel, Linear, Ramp, Stripe,
  Anthropic's marketing site. Confident, restrained, technical-but-polished. Not
  flashy startup-generic, not dense/text-heavy like a spec sheet.
- Generous whitespace, strong editorial type hierarchy, a real 8pt spacing system,
  subtle motion (not gimmicky), and a component-driven layout — every section should
  reuse a small set of defined components (not one-off hand-built blocks).
- Support both light and dark mode using Figma variables/color styles (not hardcoded
  hex), with WCAG AA contrast verified on every text/background pairing — the current
  site has real contrast bugs in dark mode from ad-hoc colors, don't repeat that.
- Keep the existing brand color anchors as a starting point (corporate blue #0B5FAE
  light mode / teal #38A3C6 dark mode) but feel free to propose a more refined,
  premium palette if it better serves a regulated-enterprise buyer.

AUDIENCE — DESIGN FOR TWO READERS AT ONCE
Today the site only speaks to CTOs/engineers (jargon: "SLMs," "deterministic
outputs," "policy layers," "<100ms latency"). It needs to also convert CROs/revenue
and business decision-makers who care about outcomes, not architecture. Every major
section should carry a dual message:
  1. Technical credibility layer (for CTO/engineering buyer): architecture,
     latency/accuracy numbers, security posture (VPC, zero data leakage), model
     family specs, integration/API depth.
  2. Business outcome layer (for CRO/exec buyer): cost per decision reduced, revenue
     unlocked by faster approvals, compliance risk/fines avoided, headcount
     efficiency, time-to-decision, ROI framing. This layer is currently completely
     missing from the site — add it explicitly as its own visual track (e.g. a toggle,
     a split-column layout, or a dedicated "Business Impact" section per page) rather
     than burying it in engineering copy.

SITE STRUCTURE (design each as its own page/frame, not one long scroll)
1. Home — hero with a clear one-line value prop that a non-technical exec understands
   in 3 seconds, dual proof points (technical stat row + business outcome row),
   a visual product/workflow diagram (Understand → Decide → Route), logos section
   split into "Backed by" (investors) and a placeholder "Trusted by" (customers) —
   leave clearly labeled placeholder slots for customer logos/screenshots I will add.
2. Platform / How It Works — the technical deep dive: ingestion → SLM understanding →
   policy decision core → routing → audit ledger, presented as an actual interactive
   or visually rich diagram, not a bullet list. Include a "product in action" section
   with placeholder frames for real product screenshots/UI captures I'll supply.
3. Model Family (Groundset™) — redesign the 6 model cards (Logic, Vision, Motion,
   Audio, Speed, Sovereign) as a proper comparison/spec grid component, reusable,
   with consistent badge/tag components (fix: tags must be legible in both themes).
4. Solutions by Industry — Financial Services, Healthcare, etc., each with the
   dual technical/business framing above, and placeholder slots for case studies
   with named outcomes (e.g. "$X saved," "Y% faster approvals") I will fill in later.
5. Proof / Case Studies — dedicated page for customer logos, quotes, before/after
   metrics. Leave structured placeholders since real customer assets are pending.
6. Security & Compliance — VPC deployment, zero data leakage, regulatory alignment,
   built as a trust-focused page an infosec/compliance reviewer would screenshot.
7. Company — founder/team, careers (as a real page, not an anchor), mission.
8. Pricing / Get Started — even if pricing is "contact us," design a real page that
   frames packaging/engagement model, not just a contact form buried at the bottom.
9. Resources / Blog — a real index page and article template, not a dead nav link.
10. Contact — polished lead-capture form, consistent with the rest of the system.

COMPONENT SYSTEM TO DELIVER
- Design a proper Figma component library: navigation bar, footer, buttons
  (primary/ghost), stat tiles, comparison table, spec/feature cards, badges/pills,
  industry cards, testimonial/quote block, CTA banner, section header pattern
  (eyebrow + headline + subhead). Each with defined variants (default/hover, light/
  dark) so engineering can implement this as an actual reusable component library
  instead of the current copy-pasted, drifting CSS.
- Document spacing, type scale, and color tokens as Figma variables so there is one
  source of truth (the current build has near-duplicate style blocks that silently
  drift out of sync — the component system should make that impossible).

DELIVERABLES
- Desktop (1440) and mobile (390) frames for every page listed above.
- A documented design system page (tokens, components, states).
- Placeholder components clearly marked for assets I will supply later (customer
  logos, product screenshots, case study numbers, headshots) so they're easy to
  swap in.