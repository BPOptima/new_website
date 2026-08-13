Design a "How It Works" enterprise product section for BPOptima, a B2B AI decision 
pipeline platform. Dark navy background (#0B1220). Full-width section, max content 
width ~1280px, horizontal padding 40px, vertical padding 100px top and bottom.

BACKGROUND
Subtle cyan grid overlay (opacity 2.5%), 48x48px cells. Soft radial glow at top 
center: rgba(0,200,180,0.035), elliptical, fades to transparent.

TYPOGRAPHY
UI text: Inter. Monospace labels/badges: JetBrains Mono.

--- HEADER (left-aligned, max-width 460px) ---

Pill badge above heading:
- Background rgba(0,200,180,0.05), border 1px rgba(0,200,180,0.15), border-radius 999px
- Text: "HOW IT WORKS" — 10px JetBrains Mono, #00C8B4, letter-spacing 0.1em
- Small filled dot (#00C8B4, 6px, glowing) to the left of text

Heading (below badge, 16px gap):
- "From evidence to" — 48px Inter Bold, #E8EDF5, line-height 1.1, letter-spacing -0.025em
- "decision in milliseconds." — same size, color #00C8B4

Body text below (8px gap):
- 16px Inter Regular, #6B85A0, line-height 1.7, max-width 440px
- Text: "BPOptima ingests unstructured enterprise evidence, extracts structured data, 
  applies your policy rules, and returns a deterministic, auditable decision — 
  automatically."

--- TWO-COLUMN LAYOUT (below header, 48px gap) ---
Left column: 340px fixed width
Right column: fills remaining space

=== LEFT COLUMN ===

SECTION LABEL
"Select a document type" — 11px Inter Medium, #6B85A0, letter-spacing 0.08em, 
uppercase, margin-bottom 12px.

3 DOCUMENT TYPE CARDS (stacked, 8px gap between)
Each card: rounded-lg (8px), padding 14px, border 1px.

Selected card:
- Background rgba(0,200,180,0.05), border rgba(0,200,180,0.35)
- Icon container: 32x32px, rounded-md, background rgba(0,200,180,0.10), icon #00C8B4
- Title: 14px Inter Medium, #E8EDF5
- Subtitle row: 10px JetBrains Mono #6B85A0 (type) · 10px Inter #6B85A0 (industry)
- Selection circle right side: filled #00C8B4 with small dark inner dot

Unselected card:
- Background rgba(255,255,255,0.02), border rgba(255,255,255,0.06)
- Icon container: background rgba(255,255,255,0.04), icon #6B85A0
- Title: #A8B8CC
- Selection circle: border rgba(255,255,255,0.12), transparent fill

Card 1 (selected): FileText icon — "Loan Application" — PDF · Retail Banking
Card 2: Image icon — "Vehicle Inspection" — Image · Insurance / Claims
Card 3: AlignLeft icon — "Customer Complaint" — Text · CX Operations

CTA CARD (below cards, 20px gap)
Rounded-xl (12px), padding 20px, background rgba(15,25,41,0.70), 
border 1px rgba(255,255,255,0.06).

Heading: "See this running on your data" — 14px Inter SemiBold, #E8EDF5
Body: 12px Inter Regular, #6B85A0, line-height 1.6, margin-bottom 16px.
Text: "Our team will walk you through a custom deployment scoped to your policies 
and document types."

Primary button (full width):
- Background #00C8B4, text #0B1220, 14px Inter Medium
- Rounded-lg (8px), padding 10px 16px
- "Request a Walkthrough" left, right-arrow icon right
- Flex row, space-between

Secondary button (full width, 8px below primary):
- Transparent background, border 1px rgba(255,255,255,0.08), text #A8B8CC
- "📞 Book a Call" left with phone icon, chevron-right icon right

COMPLIANCE BADGES CARD (below CTA card, 20px gap)
Rounded-xl, padding 16px, background rgba(255,255,255,0.01), 
border 1px rgba(255,255,255,0.04).

Label: "Standards & Compliance" — 9px JetBrains Mono, #4B5563, uppercase, 
letter-spacing 0.1em, margin-bottom 12px.

2x2 grid of badge chips (6px gap):
Each chip: rounded, padding 6px 8px, background rgba(255,255,255,0.03), 
border 1px rgba(255,255,255,0.05), 10px JetBrains Mono #6B85A0, center-aligned.
Labels: "ISO 30401" / "SOC 2 Type II" / "GDPR Ready" / "ISO 27001"

=== RIGHT COLUMN — PIPELINE PANEL ===

Rounded-2xl (16px), background rgba(9,16,28,0.85), 
border 1px rgba(255,255,255,0.06), fixed height 680px, flex column.

STICKY HEADER (inside panel, does not scroll)
Padding: 24px 24px 8px, border-bottom 1px rgba(255,255,255,0.04).

STAGE PROGRESS BAR
Horizontal, 6 stages connected by thin lines.
Stages: EVIDENCE · VISION · STRUCTURED · POLICY · DECISION · AUDIT
(swap "VISION" with "OCR" for non-image workflows)

Each stage node: 8x8px filled dot.
- Past stages: #00C8B4 dot, connecting line rgba(0,200,180,0.5)
- Active stage: #00C8B4 dot with 3px outer glow ring rgba(0,200,180,0.15)
- Future stages: rgba(255,255,255,0.10) dot, line rgba(255,255,255,0.06)

Stage label below each dot: 9px JetBrains Mono, uppercase, letter-spacing 0.04em.
- Active: #00C8B4
- Past: rgba(0,200,180,0.45)
- Future: rgba(255,255,255,0.20)

SCROLLABLE STAGES AREA
Below the sticky header. overflow-y: auto. Scrollbar: thin, thumb rgba(0,200,180,0.15).
Padding: 20px 24px.
Scroll indicator: subtle gradient fade at bottom + "SCROLL ↓" text in 
9px JetBrains Mono rgba(0,200,180,0.4), animated gentle bounce.

PIPELINE STAGES (6 stages stacked with connector lines between)

Each stage row:
- Stage number badge: 20x20px circle. Active = #00C8B4 fill, dark number. 
  Done = rgba(0,200,180,0.15) fill, checkmark. Future = rgba(255,255,255,0.04), 
  muted number.
- Stage label: 10px Inter SemiBold, uppercase, letter-spacing 0.1em.
  Active = #00C8B4. Done = rgba(0,200,180,0.5). Future = #4B5563.
- Active pulse: 3 small dots (8px) in cyan, staggered blink animation.
- Connector between stages: 1px vertical line, 16px tall.
  Done = rgba(0,200,180,0.3). Future = rgba(255,255,255,0.05).
- Stage content indented 30px from left.
- Future stages dimmed: opacity 0.22.

STAGE 0 — ORIGINAL EVIDENCE
Shows a white bank document (Apex National Bank loan form) with:
- Dark toolbar: file icon + "LA-2026-08192 · Apex National Bank" label + "ORIGINAL" badge
- White document body with bank logo, form fields in rows (label left, value right)
- Scrollable max-height container

STAGE 1 — OCR + DOCUMENT UNDERSTANDING (or VISION for image workflows)
Same document with amber highlight boxes over extracted fields 
(rgba(234,115,0,0.12) background, 1.5px orange border).
Below: dark processing card showing 5 animated checkmark steps.
Below that: telemetry card (rgba(0,200,180,0.03) bg, cyan border) with 6 metric 
tiles in 3-col grid: STATUS / CONFIDENCE / PROCESSING / PAGES / FIELDS / LANGUAGE.
Each tile: dark background, 9px mono label, 12px cyan mono value.
"GROUNDSET OCR" label top-left + "MODEL · Vision-Language Model" badge top-right.

STAGE 2 — STRUCTURED ENTERPRISE DATA
3 collapsible-style field groups (Applicant Information / Employment / Financial).
Each group: header bar with 9px mono uppercase label, then rows of label–value pairs.
Each row: small green checkmark circle + grey label left + white value right.
Bottom stats bar: 5 metrics in a row (Pages / Entities / Tables / Language / Confidence),
each with large cyan value and tiny mono label.

STAGE 3 — POLICY EVALUATION
List of 4 rule rows. Each row: rounded-lg with colored background.
Pass row: rgba(34,197,94,0.03) bg, rgba(34,197,94,0.10) border, 
green checkmark icon, "PASS" label in #4ADE80.
Fail row: rgba(239,68,68,0.03) bg, rgba(239,68,68,0.10) border, 
red X icon, "FAIL" label in #F87171.
Top right: "POLICY ENGINE ACTIVE" chip in cyan.

STAGE 4 — DECISION
Large card with colored tint matching decision type.
ESCALATE = amber tint. REVIEW = blue tint. APPROVED = green tint.
Top row: "DECISION STATUS" label + large decision word (24px, bold, tracking-widest)
on left; "CONFIDENCE" label + percentage on right.
Reason block: dark inset box with mono label + readable body text.
2 metric tiles below (Latency / Policy Version) in dark chips.

STAGE 5 — AUDIT LEDGER
Timeline with cyan dot + vertical connector + timestamp + event label.
4 events. Each timestamp: 11px JetBrains Mono #00C8B4.
Event text: 14px Inter #B8C8D8.
Top right: "SHA-256 SIGNED" chip in cyan.

--- FOOTER ROW (below two-column, 56px gap) ---
Border-top 1px rgba(255,255,255,0.05), padding-top 40px.
Left: 4 feature pills in a flex row (32px gap):
  Each pill: small 4px cyan dot + 12px Inter #6B85A0
  Labels: "Deterministic decisions" / "Full audit trail" / 
  "No black-box reasoning" / "Sub-100ms latency"
Right: Text link "View full technical documentation →" — 12px Inter Medium, #00C8B4.