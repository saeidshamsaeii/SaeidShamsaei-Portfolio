# Saeid Shamsaei — Creative Software Architecture Portfolio

**Status: Implementation and automated QA maintained on GitHub `main`; not a declaration of public deployment, configured domain, or final owner acceptance. Check latest exact-SHA GitHub Actions run before release.**

Public React / Next.js + GSAP portfolio featuring four first-class case studies:
- GARTAL — enterprise multi-tenant SaaS platform, documented architecture and vertical packs.
- AI Development Factory — owner-directed GitHub / CI / UI/UX engineering workflows.
- DigiRezhim — physician-oriented clinical nutrition management (presentation visuals do not prove deployed medical functionality).
- Petiwoo — pet-retail + veterinary industry packs **within the GARTAL ecosystem**.

## Design & interactions

Motion-led dark editorial home with the SS monogram, personal portrait and four project scenes. On desktop viewports at least 961px wide and 700px tall, vertical scrolling pins each chapter and advances its horizontal narrative. On mobile, short viewports and reduced-motion settings, the horizontal track remains independently scrollable. Accessibility includes keyboard controls, skip link and in-page navigation anchors. Illustrative UI compositions are custom source-rendered art; **not fictional live system screenshots**. Provided GARTAL and DigiRezhim PDFs inform technical copy and visual language. Public site must not accidentally disclose PDF patient data or private development information.

Each project has a working static case-study route:
- /work/gartal/
- /work/factory/
- /work/digirezhim/
- /work/petiwoo/

Localization: EN and FA switch on the homepage and each case study, with direction adjusted in-browser. Link sharing can use ?lang=fa. Contact links are real verified public email, GitHub and LinkedIn only; Telegram and phone are absent pending owner confirmation.

## Run locally

Requires Node.js 22 and npm:
```bash
npm install --no-audit --no-fund
npm run typecheck
npm run build
npm run dev       # http://localhost:3200
npm run build     # creates out/
npm start         # serves out/ at http://localhost:3200
```

Set up `.env.local` from `.env.example`. The Next.js static export is written to `out/`; no database or environment secrets are needed. Production hosting can serve `out/` as static files. Use `NEXT_PUBLIC_SITE_URL` with your actual HTTPS domain before release and set `NEXT_PUBLIC_SITE_READY=true` **only after** approval to index/publish. Until then the SEO robots rule remains noindex.

## CI

GitHub Actions runs TypeScript checks, Next.js static export and Chromium/Playwright browser tests. It uploads screenshots and the `out/` artifact when verified. Check the **latest commit SHA**, status and artifacts on [GitHub Actions](https://github.com/saeidshamsaeii/SaeidShamsaei-Portfolio/actions). `package-lock.json` has not yet been checked in; CI currently uses `npm install`. A verified lockfile and `npm ci` are future reproducibility improvements.

## Deployment

Site is compatible with GitHub Pages, Cloudflare Pages, Netlify, or any host serving static `out/` artifacts; no hosting provider or domain is assumed. For bare Nginx: serve `out/` with `try_files $uri $uri/ =404;` (trailingSlash=true). For dedicated custom-domain launch: configure DNS, TLS, base URL, domain validation and indexing *after* explicit launch approval. This commit does not publish or register a domain.

## Evidence & acceptance

1. Source-driven content: GARTAL and DigiRezhim owner PDFs; Factory connected GitHub repo and product governance; Petiwoo as documented GARTAL vertical.
2. Architecture visualization: rendered vector/CSS compositions. Do not call these production UI captures.
3. Automated evidence: source/CI must be reported separately from browser/mobile QA and owner acceptance.
4. Original PDFs and experimental generated imagery are **not committed into this public repo**; verify permissions before sharing them.
5. Check viewport widths 360, 390, 768, 1280, 1440; rapid reverse scroll, keyboard/anchors, touch, reduced motion, layout shifts, and actual page captures.


## Approved SS cinematic design (2026-10-20)

The home now uses the owner's approved screenshot direction: full-dark editorial storytelling, double-S gold logo, a half-body editorial portrait based on the supplied personal photo, and optimized project visual studies for GARTAL, AI Development Factory, DigiRezhim and Petiwoo. The source renders are reinterpretive artwork, not verified product screenshots. The assets are committed in `public/assets/` and served locally (not from temporary ChatGPT links). Desktop vertical scroll enters a pinned project, advances the horizontal story, then continues to the next chapter. On mobile, short desktop viewports and reduced-motion settings, each `motion-track` supports native horizontal scrolling, touch swipes, keyboard arrow controls and visual buttons. While pinned, buttons synchronize with vertical progress. No click-through is required to read the case content. Intro preloader waits for required media and fonts with a time-bounded fallback; no misleading guarantee that every possible browser resource is fully cached. Respect reduced-motion preferences, preserve semantic project narratives and direct case URLs for deep links. Desktop/mobile Playwright E2E and exact-SHA CI must pass before treating this iteration as release-ready.

## Local synchronization and launch gate

The Windows checkout is `C:\\Projects\\SaeidShamsaei-Portfolio`; development and static preview both use **localhost:3200**. GitHub commits do **not** automatically update a Windows clone. In a clean working tree, run `git pull --ff-only origin main` on the laptop, or separately authorize Portfolio in the local synchronization service. Repository updates here do not grant permissions on the laptop.

**Outstanding before public release:** confirm hosting and domain, validate the portrait and public contact/profile details, configure DNS/TLS, set `NEXT_PUBLIC_SITE_URL` to the real HTTPS domain, and explicitly approve enabling indexing via `NEXT_PUBLIC_SITE_READY=true`. No public deployment is claimed by these commits.
