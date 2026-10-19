# Saeid Shamsaei — Personal Portfolio

**Status: DESIGN PROPOSED / SOURCE IN PROGRESS. No production deployment approved.**

A bilingual, editorial, motion-driven developer portfolio built with Next.js App Router, React, TypeScript, GSAP ScrollTrigger and native scroll fallbacks. Designed under **Saeid UI/UX Studio v0.5.2**.

## Product principles
- Show evidence-backed systems engineering: GARTAL enterprise SaaS, DigiRezhim clinical nutrition platform, and other documented work.
- Use scroll chapters with pinned desktop stage and native accessible mobile chapters; no generic card-wall.
- Smaller typography; premium restrained visual language, semantic accessibility and reduced-motion support.
- Never pretend an architectural illustration is a verified screenshot of shipped software.
- Owner-supplied 23 PDF page visuals live in the separately prepared v7 artifact and **are pending migration to this GitHub repository**.
- No database needed for the initial static-export build.
- Public GitHub repository does **not** mean that a production website is deployed or accepted.

## Workflow
`npm install` → `npm run typecheck` → `npm run build`.
A generated `package-lock.json` must be checked in before adopting reproducible `npm ci`; CI initially uses npm install and explicitly requires build/typecheck.

## Acceptance
See `docs/UI-UX-ACCEPTANCE.md` and `docs/SCROLL-STORYBOARD.md`. Visual direction remains subject to owner review. Full page-by-page media migration, exact-SHA CI, browser QA and deployment approval are independent gates.

Source governance: [Factory Issue #129](https://github.com/saeidshamsaeii/AI-Development-Factory/issues/129).
