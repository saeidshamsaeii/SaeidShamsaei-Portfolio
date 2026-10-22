# SAEID PORTFOLIO — FINAL VISUAL ARCHITECTURE
## Edition 07 / Cinematic Minimalism
**Status:** OWNER SELECTED — DESIGN BASELINE LOCKED (2026-10-22).
**Source implementation status (2026-10-22):** Edition 07 homepage and case-study visual source changes are now committed to `main`; exact-SHA runtime build, hydrated browser QA, Windows Worker sync and deployment are not yet verified.

### 1. Creative decision / blend
- **Camille Mormal:** image-first, full-viewport film-strip project storytelling, sparse progress index.
- **Dennis Snellenberg:** honest personal portrait, oversized editorial type, breathing room, credible positioning and elegant contact.
- **Aristide Benoist:** exacting type choreography, coherent transitions between scenes, subtle high-quality movement; do not copy 3D galleries or WebGL by default.

One coherent product, not three separate styles and not a replica of their protected creative work. Public-facing site remains **English only** and must not show the owner's location.

**One-screen rule:** One focal point, one clear sentence, one possible action. There may be background photography + one headline; never a four-card dashboard competing with both.

### 2. Minimal design system
- Background: `#0A0C0E`, secondary `#141619`, plain surfaces only. Avoid full-page gradients or colored blobs.
- Foreground: `#F3F0E9`; secondary label `#A8ADAE`.
- Gold: `#D0AE80` for accent/label/focus only (never large gold panels). All projects use the same base monochrome brand palette; project imagery supplies natural color.
- Typography: one modern sans family + one mono or letterspaced utility style. Display 88–132px desktop (fluid), 46–64px phone. Text 15–18px desktop, 14–16px phone; text line-height 1.45–1.65.
- Shapes: squared or 2–4px radius, nearly invisible 1px separators. No pill badges everywhere, neon borders, giant decorative SS watermark, glows, shake motion, or ornate diagrams.
- Keep the authentic existing small gold `/assets/hires/logo.webp` in intro/nav/end; never replace it with an invented monogram.
- Photography: use the owner-approved `public/assets/hires/portrait.webp` currently versioned in main; keep face/identity unchanged, sunglasses and approved black suit. Office environment is atmosphere behind the subject, not a distracting second focal point. Maintain appropriate alt text.

### 3. Storyboard — one natural vertical journey

**00 — Entry (once per session).** Black surface, small real logo + SAEID SHAMSAEI. Two clear choices: `ENTER SITE` and `WATCH GUIDED TOUR`. Revisit skips interruption. The intro should not block normal reading beyond ~2 seconds, but both choices must be discoverable and remain accessible via a small persistent `TOUR` link. Reduced-motion visitors skip the animation. Do not invent a fake progress percentage.

**01 — Identity (first full viewport).** Owner portrait occupies ~45% desktop width, composed against understated architectural office tones. Oversized two-line name `SAEID / SHAMSAEI.`, plus one-line `Software Architect & Product Engineer`. One supporting sentence:
`I build thoughtful digital products and the systems behind them.`
Only main action: `Explore work ↓`. No three process cards, skill statistic triples, decorative dashboard or second project image in the hero.

**02 — About / Experience (second full viewport).** No duplicate portrait. As the viewport crosses three measured scroll zones, reveal three successive passages **one at a time**, not all four tiles together:
1. `I translate complex product ideas into software people can understand and use.`
2. `My work bridges architecture, engineering and product decisions — from foundations to delivery.`
3. `Selected work includes GARTAL, AI Factory, DigiRezhim and Petiwoo.`
A compact inline expertise index at the bottom: `Architecture / Automation / Product Experience`. No invented years, customer counts, professional certifications, revenue or launch claims. Must remain fully legible with JavaScript off and reduced-motion active.

**03 — Selected Work (four project chapters).** Four independent chapters in fixed order GARTAL → AI Factory → DigiRezhim → Petiwoo. Each chapter has exactly five intentionally minimal fullscreen frames, not four simultaneous information cards:
1. **Reveal:** a large approved illustration or an authenticated real product capture, small label `01 / 04`, a huge project title, one sentence.
2. **Challenge:** one terse problem statement over a quiet close-up/detail. No infographic wall.
3. **Architecture:** one simple diagram of at most three components, based only on verified repository evidence.
4. **Experience:** focus on a second visual/detail and a single sentence describing an implemented or clearly designated planned workflow.
5. **Closing:** one factual outcome or current status, plus `Explore case study ↗`. Do not present invented metrics.
Concept art MUST be marked `Concept visualization — not a live screenshot`, in a quiet caption. Source-informed architecture MUST be distinguished from authenticated running UI. Avoid reusing the same image as if it were five distinct product screens.
Default input: vertically scrolling the page scrubs the local pinned horizontal reel. A first intentional downward gesture inside a chapter may start a bounded paced progression for the current chapter (the owner explicitly requested a single-scroll play mode). A second wheel, swipe, keyboard gesture, tap or Escape interrupts immediately, without changing content or snapping backwards. After frame 5, natural downward scroll enters the next chapter; no empty 300vh gap.
- Visible unobtrusive `01 — 05` progress at bottom right, a subtle `SCROLL TO EXPLORE` cue only when needed.
- Never scroll horizontally when not inside the active chapter.
- Keyboard and swipe controls must work without a mouse. For reduced-motion, use readable unpinned stages and native horizontal overflow/snap, no automatic camera moves.

**04 — Direct Contact (final full viewport).** One strong headline `LET'S BUILD WHAT MATTERS.`, authentic logo, one sentence, plus 4 direct, keyboard-accessible links:
`tel:+989017470729` / display `09017470729`
`mailto:saeidshamsaeii00@gmail.com`
`https://www.linkedin.com/in/saeidshamsaei/`
`https://t.me/sd_shms`
No extra slogan scene or giant CSS SS watermark; finish the journey here.

### 4. Guided Tour vs ordinary scroll
The first-load `WATCH GUIDED TOUR` begins the **opt-in**, timed entire storyboard. It uses the actual site and scroll offsets, not a fake looping video. Small noninvasive controls: current chapter/step, pause/resume, exit, progress; any manual scroll/swipe immediately returns control. Never start this full tour without deliberate visitor choice.
The ordinary site remains navigable with standard scrolling, anchored navigation, keyboard, and direct case-study URLs. Chapter-level one-gesture autoplay is a separate, bounded feature; it must not restart repeatedly.

### 5. Mobile direction (not a squeezed desktop)
- 360, 390, 430, 768px first-class designs with correct safe areas and viewport-height differences.
- Full-viewport hero: clear name in top-middle, large portrait as one compositional focus, one CTA; never hide the full face under navigation or oversize the body.
- About reads like an editorial page with one thought per transition. Do not squeeze 6 rows of copy into a 640px-height device.
- Each project frame has one label + short text + one dominant full-width image. Native vertical touch controls move through the horizontally presented visual story. No hover-only interactions.
- No sideways **page** overflow, nested scroll traps, or abrupt white/colored gaps. Clear `Next project ↓` at handoff.
- Mobile may shorten transitions and replace background parallax with simple opacity/translate effects.

### 6. Motion contract
One choreographed motion system, not a collection of competing animations:
- Scroll progress drives transitions, natural wheel behavior remains intact.
- Text line reveals: opacity + translateY 12–18px, 450–650ms.
- Image entrance: scale 1.025 → 1, 550–850ms; no continuous jitter/rotation.
- Chapter transition: 650–950ms, clamped delta. Motion should be interruptible.
- No unnecessary cursor trails, particle systems, expensive 3D, 100% scroll-jacking, or fake complex workspace video.
- `prefers-reduced-motion: reduce` must bypass/reduce all nonessential animation and autoplay while preserving all text and navigation.

### 7. Source file implementation mapping
**Current code inspected at** `aa266384d813e8bb34bdbfed23bf0746a3f033de`.
- `components/ScrollHero.tsx`: replace three-step blueprint with identity portrait-first scene.
- `components/PortfolioExperience.tsx`: reduce Intro, About, chapters and Contact to single-message frames; retain the verified scroll chapter state machine and case-study routes. Remove redundant `#approach` section rather than leaving empty space.
- `components/GuidedTour.tsx`: point itinerary only at real storyboard sections; preserve pause/replay/interrupt.
- `components/CaseStudy.tsx`: retain complete accessible detail pages; move technical density off homepage.
- `data/portfolio.ts`: preserve honest factual project descriptions and the four exact contact channels.
- `app/layout.tsx`: consolidate accumulated stylesheet imports. The existing cascade currently contains more than ten design CSS files. Replace overrides with a small token/layout/motion structure **after** screenshot comparison.
- `public/assets/hires/portrait.webp`: preserve exact approved owner image; never replace the face.
- New single `docs/FINAL-DESIGN-ARCHITECTURE.md` (this file) is the baseline for implementation; do not adjust design direction opportunistically.

### 8. Testable acceptance criteria
- Desktop 1280/1440/1920: identity hero fits one viewport; no overlaps, cropped critical content or fake image disclosures.
- Mobile 360×640, 390×844, 430×932, 768×1024: zero horizontal document overflow or overlapping text/media; meaningful content uses available space without 2–4 screen heights of blank scroll.
- Four chapters × five views traverse forward and backward, and after last scene transition vertically to the next one on mobile and desktop.
- Intro choice, full guided playback, pause/resume/exit, replays, one-scroll chapter autoplay and immediate manual override all pass Playwright.
- Accurate contact links and English-only public copy; images decode; no empty first project screenshots.
- Basic Core Web Vitals acceptance targets: LCP ≤2.5s, CLS ≤0.1, INP ≤200ms when measured in applicable field conditions. Treat these as **targets** until properly measured, not achieved metrics.
- Screenreader labels/focus; keyboard navigation; reduced-motion fallback; no fake loader/blocked site.
- Validate exact-source local build/CI before a claim of release, and do not equate GitHub commit with laptop LocalSync or public deployment.

## Design references reviewed
- https://camillemormal.com/ — film-strip presentation and sparse navigation
- https://www.dennissnellenberg.com/ — strong typographic personal storytelling
- https://aristidebenoist.com/ — motion discipline and editorial rhythm

## Implementation approval gate
This document finalizes the visual direction only; **do not report the live website redesigned or locally deployed just because this specification is committed.** Implement in a subsequent source change with browser proof and exact-SHA Worker verification.

## Edition 07 implementation tracking — 2026-10-22

The owner-directed Edition 07 source implementation is now present in the dedicated Portfolio GitHub repository. This records **source delivery**, not a claim of a rendered, CI-green or on-device-accepted website.

- `components/ScrollHero.tsx`: real approved portrait and source office atmosphere, one identity heading, one work CTA; removed the three crowded Design/Build/Ship tiles.
- `components/PortfolioExperience.tsx`: sticky sequential About storytelling, trimmed home-page project architecture to three factual boundaries, concept visual detail treatment, four existing horizontal five-frame reels and their interruptible one-gesture assist, simplified final Contact; unnecessary Approach chapter removed.
- `components/GuidedTour.tsx`: itinerary updated to Identity → three About stages → four five-frame projects → Contact. Opt-in manual-interrupt controls retained.
- `app/edition07.css`: Edition 07 monochrome/gold visual system scoped to homepage and all four separate case-study routes, with responsive layouts and reduced-motion fallback; imported last by `app/layout.tsx`.
- `tests/portfolio.spec.ts` and `tests/guided-tour.spec.ts`: updated structural expectations; added explicit reduced-motion and dark-case-route parity checks. Tests have not been executed successfully against this new commit in a verified runtime.
- Original owner portrait, logo and conceptual project images are preserved unchanged. No made-up production metrics or asserted real-app captures.
- Protected Factory registry remains unchanged; the current repo's Worker execution profile has not been verified enabled.
- Existing legacy stylesheet imports remain until an actual responsive screenshot comparison is available. They are intentionally not mass-deleted without a regression baseline.
- No change to domain, deployment, search indexing, production services or laptop worktrees.

**Remaining gates:** exact-SHA `typecheck`/`build`, actual browser Playwright at specified widths, local Docker Worker result with matching SHA, local pull and owner visual acceptance. All must be evidenced separately before marking Edition 07 fully released.
