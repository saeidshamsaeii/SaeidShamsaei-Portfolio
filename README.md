# Saeid Shamsaei — Creative Software Architecture Portfolio

**Status: Source implementation for launch preparation. Not a declaration of published website, passing CI, accepted visual design or configured domain.**

Public React / Next.js + GSAP portfolio featuring four first-class case studies:
- GARTAL — enterprise multi-tenant SaaS platform, documented architecture and vertical packs.
- AI Development Factory — owner-directed GitHub / CI / UI/UX engineering workflows.
- DigiRezhim — physician-oriented clinical nutrition management (presentation visuals do not prove deployed medical functionality).
- Petiwoo — pet-retail + veterinary industry packs **within the GARTAL ecosystem**.

## Design & interactions

Motion-led editorial home with long scroll chapters, per-project palettes, desktop sticky art stage, GSAP ScrollTrigger progress/parallax, mobile-native sections, accessible chapter navigation and reduced-motion fallback. Illustrative UI compositions are custom source-rendered art; **not fictional live system screenshots**. Provided GARTAL and DigiRezhim PDFs inform technical copy and visual language. Public site must not accidentally disclose PDF patient data or private development information.

Each project has a working static case-study route:
- /work/gartal/
- /work/factory/
- /work/digirezhim/
- /work/petiwoo/

Localization: EN and FA switch on the homepage and each case study, with direction adjusted in-browser. Link sharing can use ?lang=fa. Contact links are real verified public email, GitHub and LinkedIn only; Telegram and phone are absent pending owner confirmation.

## Run locally

Requires Node.js 22 and npm:
\`\`\`bash
npm install --no-audit --no-fund
npm run typecheck
npm run build
npm run dev
\`\`\`

Set up \`.env.local\` from \`.env.example\`. The Next.js static export is written to \`out/\`; no database or environment secrets are needed. Production hosting can serve \`out/\` as static files. Use \`NEXT_PUBLIC_SITE_URL\` with your actual HTTPS domain before release and set \`NEXT_PUBLIC_SITE_READY=true\` **only after** approval to index/publish. Until then the SEO robots rule remains noindex.

## CI

GitHub Actions workflow runs typecheck + Next static build on pushes and pull requests and tries to upload the \`out/\` artifact. The repo previously recorded completed/failure runs with no visible jobs. A new successful exact-SHA run is required before accepting any build claim. There is currently no checked-in npm lockfile; add one from a successful dependency resolution, then replace \`npm install\` with \`npm ci\` to harden reproducibility.

## Deployment

Site is compatible with GitHub Pages, Cloudflare Pages, Netlify, or any host serving static \`out/\` artifacts; no hosting provider or domain is assumed. For bare Nginx: serve \`out/\` with \`try_files $uri $uri/ =404;\` (trailingSlash=true). For dedicated custom-domain launch: configure DNS, TLS, base URL, domain validation and indexing *after* explicit launch approval. This commit does not publish or register a domain.

## Evidence & acceptance

1. Source-driven content: GARTAL and DigiRezhim owner PDFs; Factory connected GitHub repo and product governance; Petiwoo as documented GARTAL vertical.
2. Architecture visualization: rendered vector/CSS compositions. Do not call these production UI captures.
3. Automated evidence: source/CI must be reported separately from browser/mobile QA and owner acceptance.
4. Original PDFs and experimental generated imagery are **not committed into this public repo**; verify permissions before sharing them.
5. Check viewport widths 360, 390, 768, 1280, 1440; rapid reverse scroll, keyboard/anchors, touch, reduced motion, layout shifts, and actual page captures.


## Approved SS cinematic design (2026-10-20)

The home now uses the owner's approved screenshot direction: full-dark editorial storytelling, double-S gold logo, a half-body editorial portrait based on the supplied personal photo, and optimized project visual studies for GARTAL, AI Development Factory, DigiRezhim and Petiwoo. The source renders are reinterpretive artwork, not verified product screenshots. The assets are committed in `public/assets/` and served locally (not from temporary ChatGPT links). Vertical document scroll moves among projects; each project's inline `motion-track` supports horizontal trackpad/Shift+wheel, touch swipe, mouse drag, focusable keyboard left/right controls, and optional visual navigation arrows. No click-through is required to read the case content. Intro preloader waits for required media and fonts with a time-bounded fallback; no misleading guarantee that every possible browser resource is fully cached. Respect reduced-motion preferences, preserve semantic project narratives and direct case URLs for deep links. Desktop/mobile Playwright E2E and exact-SHA CI must pass before treating this iteration as release-ready.
