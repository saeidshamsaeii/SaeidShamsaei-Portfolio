# V6 — Professional Portrait, Scroll Playback and Guided Tour

Owner-approved public English-only site presentation, 22 October 2026.

## Image provenance and identity
The existing `public/assets/hires/portrait.webp` is the matching owner-identifiable portrait wearing a formal dark jacket over a collared black shirt (1122×1402 RGBA); it is used instead of the currently displayed polo-shirt office image in the Hero. The office setting is created by a dark, soft-focused CSS background from the previously owner-approved `portrait-office.webp` image. **Do not substitute newly generated full-page UI art with another face**: that would misrepresent the owner's identity. This change is reversible and uses only repo-tracked media. It does not claim that a new identity-preserving photo edit with a white dress shirt was successfully generated.

## Two different playback behaviors
**Native visitor story**: ordinary vertical scrolling remains the real document, including horizontal five-frame chapter navigation. After the first *intentional downward wheel/touch gesture* inside a project, the entire chapter advances smoothly like a short video without demanding five more wheel actions. A second wheel/keyboard gesture cancels the assist and returns full control. No automatic chapter playback starts from programmatic scrolling, preview screenshot tools or external deep links alone. Only one chapter playback per visit. Native keyboard case navigation remains.

**Opt-in full site tour**: on a fresh visitor session the logo introduction offers `WATCH GUIDED TOUR` and `ENTER SITE`; it automatically closes after a short window if untouched. A small header `TOUR` button allows replay at any time. Tour navigates Intro → About → four five-scene case studies → Approach → Contact, using actual scroll positions and the existing pinned horizontal rails, with visible progress and `PAUSE`, `RESUME`, `EXIT`. Any wheel/swipe/scroll key cancels immediately; no forced trapping and no continuous replay. It never starts automatically without a real opt-in. Reduced-motion users skip motion overlays and playback entirely. There is no analytics, third-party external API, video download or model runtime.

## Experience introduction
Two short, restrained paragraphs describe Saeid Shamsaei's role and demonstrable scope of work: architecture, multi-tenant systems, business workflows, AI-assisted engineering, clinical nutrition systems, and the specifically named projects GARTAL, AI Factory, DigiRezhim and Petiwoo. No unverified years, clients, revenue, performance numbers or certifications were invented.

## Quality and delivery
`tests/guided-tour.spec.ts` includes opt-in, pause/resume/exit, interruption by natural input, single-wheel chapter autoplay, office+portrait composition, mobile overflow, copy accuracy and reduced-motion checks. `tests/portfolio.spec.ts` has its source image assertion updated to `portrait.webp`. Actual code/test success must be established on exact latest Git SHA before making a green claim; the owner's intended local Docker Worker gate is separate from any retired GitHub Actions. Preserve dirty local source and FF-only sync. Deployment to a public domain is not implicit.
