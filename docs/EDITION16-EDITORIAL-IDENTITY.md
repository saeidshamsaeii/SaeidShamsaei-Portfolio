# Edition 16 — Personal Index: independently authored portfolio art direction

**Implementation status:** GitHub source only. This document is not a production-ready sign-off, a visual recording of the local website, a completed Next.js build or a successful Windows Worker synchronization.

## Verified public reference direction (October 2026)

- **Dennis Snellenberg** — https://dennissnellenberg.com/ and https://dennissnellenberg.com/work
  - Observed: unmistakable personal introduction, strong typography and project-first navigation; the work page uses a high-signal list with disciplines/categories instead of an infinite stack of lookalike marketing cards.
- **Olivier Larose** — https://www.olivierlarose.com/
  - Observed: explicit independent design-engineer positioning, project table with useful descriptive metadata and clear links to finished work.
- **Aristide Benoist** — https://aristidebenoist.com/
  - Observed: projects have distinct narrative identity and supporting metadata including role, type and project context; motion is used to frame that information.
- **Tom Sears portfolio interaction curated by Awwwards** — https://www.awwwards.com/inspiration/personal-project-portfolio-for-tom-sears
  - Observed: project-list hover interactions can support a work-selection moment without using them as the sole way to navigate.

These are *references for principles*, not templates or licenses to copy portraits, images, layouts, brands, markup, animation timelines, typography files or source code. The Saeid design is original and uses the owner's own image already checked into this repository.

## Art direction choices

1. **Identity before technique:** the first viewport now has a muted silver/stone editorial canvas and the authentic `public/assets/hires/portrait.webp`. Two oversize typographic lines show the owner's name. No fabricated professional photography is produced. No location or fabricated badges.
2. **Contrast as rhythm:** the visitor moves from the warm, quiet portrait cover into the authentic dark Linux code-writing scene, which remains DOM-based and scroll-scrubbed. This is a meaningful visual change, not additional stock art.
3. **No duplicate portrait:** the former image column in About is converted into a typographic, source-independent identity motif; the user sees the personal photograph once instead of twice.
4. **Real choices before exhaustive immersion:** the new `#work-index` work directory introduces the four known products, a short domain annotation, one clear insight and quick paths to the long case study or source evidence. All four full horizontal technical stories remain directly below.
5. **Genuine interactions only:** list expansion reacts to hover, focus and touch; pointer motion is CSS-only and not used to disguise invented screenshots. Manual navigation always works without completing the tour first.
6. **Reduced motion and accessible content:** no new web fonts, no WebGL/canvas, no auto-generated portrait. Keyboard navigation, focus-visible outlines, accessible anchor labels, mobile grids, and reduced-motion fallback are implemented in CSS/React.

## Current changes

- `components/SignatureOpening.tsx`: portrait-led cover, scroll-linked subtle image parallax, owner H1, role/links and a first stop for the existing automatic tour.
- `components/SelectedWorkIndex.tsx`: interactive real-text directory, four source-based product snippets, contextual case/evidence paths.
- `components/PortfolioExperience.tsx`: cover and work directory in page flow, more useful header/footer nav, replace redundant About photo with a restrained letterform.
- `components/ScrollHero.tsx`: preserve the Linux code behavior while making its in-chapter title H2 to keep a single owner H1.
- `app/edition16.css` and `app/layout.tsx`: complete responsive art-direction treatment added after old styles.
- `tests/edition16-identity.spec.ts` plus adapted existing source/Playwright assertions.

## Verification checklist still open

- Exact-SHA typecheck and build in a real Node 22 + Next.js 16 environment, *owner-directed*, without activating Factory automatic CI/Preview.
- Actual screenshots on common large desktop, 1024px tablet and 320/360/390/430px phone; observe image crop, extreme title widths, nav and tour panel overlap, CLS and z-index.
- Keyboard, pointer and touch access to the selected-work index; verify `prefers-reduced-motion`, no-JS text and direct case navigation.
- Verify the source image has sufficient **native resolution** for intended display; never claim a small derivative is 4K.
- Run source contracts/Playwright and measure layout/interaction performance; avoid declaring a score without tool evidence.
- Verify the Windows Worker installed checkout SHA separately; GitHub `main` source changes are not proof of local sync, production or public publication.

The site remains unapproved for production launch and search indexing.
