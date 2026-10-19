# Saeid Shamsaei — Systems & Software Architecture

**Public source repository. Not a published website. Design proposal v0.8; owner visual acceptance pending.**

A motion-first, bilingual editorial portfolio implemented with Next.js App Router, React, TypeScript and GSAP ScrollTrigger following **Saeid UI/UX Studio v0.5.2**.

## Current implementation
- Semantic Persian/English homepage with six consecutive technical story chapters.
- On desktop, a sticky system-architecture stage changes with chapter intersection via ScrollTrigger.
- On mobile, native scrolling and local architectural diagrams per chapter.
- Reduced-motion-aware fallback; contact links; two dedicated English-language case-study routes (`/work/gartal/`, `/work/digirezhim/`).
- Project content grounded in owner-provided GARTAL and DigiRezhim case-study PDFs, without invented outcomes or production claims.
- Architectural diagrams are **interpretive illustrations**, not product screenshots. The 23 owner-provided PDF page renders remain in the local ChatGPT ZIP and are pending **binary asset transfer to GitHub**.
- SEO indexing gated by `NEXT_PUBLIC_SITE_READY=true`; no deployment was authorized.

## Local verification
```bash
npm install
npm run typecheck
npm run build
npm run dev
```
CI currently uses `npm install` because a checked-in lockfile has not been generated. Next task is to verify package versions, generate and commit `package-lock.json`, switch CI to `npm ci`, and check the exact SHA. **Do not call CI successful without actual Actions proof.**

## UX documents
- [Scroll storyboards and scene contract](docs/SCROLL-STORYBOARD.md)
- [UI/UX acceptance and roadmap](docs/UI-UX-ACCEPTANCE.md)

Two expressive design directions exist; **Systems Atelier A is implemented as an unapproved visual proposal** and Architectural Museum B is a storyboard only. Owner has explicitly rejected earlier v1–v6 styles, and has not signed off on this iteration.

Governed by [Factory Issue #129](https://github.com/saeidshamsaeii/AI-Development-Factory/issues/129). Public source and private client data are separate; do not add credentials or customer records to this repository.
