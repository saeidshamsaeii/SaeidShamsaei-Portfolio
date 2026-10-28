# Saeid Shamsaei — Creative Software Architecture Portfolio

> **Current source snapshot — Edition 25, October 2026 (supersedes historical design notes below):** The true black-and-white personal portfolio retains the evidence-grounded project details, monochrome portrait fade, centered header, and real line-by-line typography. The **invisible 205px/s automatic tour now pauses for 2 seconds after the finished text in each of the 12 horizontal case-study panels**, even where all three frames share a black background. The stop is aligned at 66% of a horizontal panel, after the 64% text-completion threshold and before sideways motion begins at 67%. A panel also ending at a background change receives only one 2-second hold, not two. Prior two-second holds at other actual background transitions remain. Manual scroll cancels a hold immediately, 3.5-second idle resume remains, and no Auto Story/speed UI reappears. Source commits to GitHub `main` are **not** an executed Next.js/Playwright run, Windows Worker sync or public release; Factory automated CI/Preview remains disabled. See `docs/EDITION25-HORIZONTAL-PANEL-PAUSES.md`.


**Status: Implementation and test specifications are maintained on GitHub `main`. No TypeScript build, Next.js build, browser tests, automated Factory CI/preview or local Worker sync is claimed to have run for this edition. Deployment remains unapproved.**

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


## High-resolution media workflow (source-quality gate)

The original checked-in files are **very low resolution**: `portrait.webp` 325×285, `ss-gold.webp` 128×128 and `projects.webp` 300×600. They cannot honestly become original 8K photos by scaling. The old stretched 300px project sprite was removed from the homepage; the original CSS/SVG architectural compositions now render vector-sharp regardless of screen resolution. The small portrait and original SS identity remain available as fallbacks, pending genuine owner-supplied masters. A decorative huge footer logo now uses scalable typography.

To add actual professional masters, keep them outside the public repository under `media-originals/`, named `portrait.jpg`, `logo.svg`, and/or `project-gartal.png`, `project-factory.png`, `project-digirezhim.png`, `project-petiwoo.png` (supported: PNG, JPEG, WebP, AVIF, TIFF, SVG). Ensure source provenance and public-use rights. **Do not commit `media-originals/`**: it is gitignored. The existing public portfolio contains only a reduced, owner-provided derivative of the portrait. When no master is present, the UI retains a working fallback.

```powershell
cd C:\Projects\SaeidShamsaei-Portfolio
npm.cmd install --no-audit --no-fund
npm.cmd run images:audit
npm.cmd run images:build
npm.cmd run build
npm.cmd start
```

`images:build` checks native dimensions, rejects raster candidates under 1600px (logo under 512px), never upscales raster sources, and writes per-media 480–3840px responsive WebP/AVIF files plus `public/assets/hires/manifest.json`. Explicit `--include-8k` via `node scripts/media-pipeline.mjs --build --include-8k` adds up to 7680px **only if original pixels exist**. The client reads the manifest and selects density-appropriate `picture` sources, while vector project visuals remain a fallback. Original masters are not copied to `public/`; derivatives strip source EXIF. The generated manifest and chosen reviewed optimized derivatives must be committed to GitHub for other devices to receive them via LocalSync. To avoid accidental dirty checkout or large-site regressions, generation is an explicit owner operation, not an implicit `npm run dev` or `npm run build` step.

Audit media weight and view QA screenshots before merging large images; 8K download should never be forced on mobile. Until genuine source masters are supplied, do not claim this site has original 8K photographs.

## October 2026 image and language update

The public website and all four case-study routes are now English-only, with no language switch and no locale-specific URL parameter. Six approved generated images are committed to `public/assets/hires/`: a transparent, owner-reference-based cutout portrait; transparent gold SS monogram; four original concept project visualizations. The artwork is illustrative and any embedded UI numbers are creative concepts rather than verified production facts. True source dimensions are 1122×1402 (portrait), 1254×1254 (logo) and 1448×1086 (each project visual); they are **not native 8K**. WebP quality 91 retains visual detail. Source PNG masters remain available in the owner-delivered ZIP rather than this public repository. The landing page background remains CSS-drawn behind the transparent portrait. All public copy is in English.

## October 2026 scroll architecture restoration

The homepage follows the owner's intended information architecture: **developer workspace illustration (full-height intro) → owner's transparent portrait, professional introduction and documented engineering interests → four scroll-driven projects**. The original SVG workspace artwork is checked into `public/assets/hires/developer-workspace.svg`; it remains sharp at arbitrary display resolution, avoids a paid image API and does not pretend to be an actual screenshot of the owner's desk. Portfolio source photographs and four project visualizations remain unchanged and high quality.

Each project is a real five-frame horizontally laid-out case study: overview, problem, architecture, capabilities, evidence/next. Native **vertical** scrolling drives horizontal movement with a CSS sticky viewport; the page advances vertically to the next project only once that story reaches its end. This works for mobile vertical swipes as well as desktop wheels/trackpads. Arrow buttons, clickable progress markers and deliberate horizontal touch swipes supplement vertical scrolling. Under reduced-motion preference, sections revert to a native horizontally scrollable rail without sticky forcing. All content remains English-only and four standalone `/work/[slug]/` pages remain linked and available. The professional interests listed are inferred from documented public work; no unsupported personal hobbies or claims of user counts, years of experience or geography are included.

Use Playwright browser QA for 1440px desktop, 360/390/768px touch-sized layouts, case-study progression, normal/reduced-motion behavior and screenshots. The LocalSync CI gate must pass on the exact new SHA before the user's laptop can safely receive it. Remote CI does not prove local receipt.

## October 2026 editorial interaction polish

The homepage preserves the owner-approved order (engineering workspace → owner portrait and engineering interests → four independently pinned case studies → approach/contact). The first two scenes are strictly viewport-framed, with one concise message and CTA in the workspace scene, no duplicate ornamental portrait rings, smaller profile cards and a shorter project handoff. Desktop and mobile are responsive via real `svh`/`dvh`, `clamp`-based typography, two-column mobile interest chips, and a short-screen readability fallback. Hero camera depth and portrait parallax respond to actual scroll with the user's reduced-motion preference respected. The four five-stage vertically controlled/horizontally presented stories remain functional; browser QA tests viewport fit at 360/390/768/1024/1440px, controlled scene transitions, accessibility and the case-study routes. No original asset was replaced, no localization or geographical copy introduced, no new API cost. These changes ship in `app/editorial-refinement.css` after the earlier CSS layers.

## Atelier-inspired final hero and logo (October 2026)

The previous AI-like illustrated workspace wallpaper is removed from the actual first-screen experience. `app/atelier.css` presents an intentionally designed typographic cover and a first-party DOM-based three-step engineering composition (understand / architect / deliver), with subtle grid alignment and motion linked to actual vertical scrolling. The original SVG remains in the repository for archival provenance only, and is never drawn into the homepage hero. The owner portrait is staged on a neutral background without fake environment graphics. The end-of-page contact composition uses the **actual 1254×1254 gold SS logo image** instead of an enlarged text `SS` ornament. All six public images, English-only language and the five-stage vertical-to-horizontal scroll journeys for four projects are retained; no new image API or external provider is required. Browser QA checks no horizontal overflow, hero layout separation on widths 360 through 1920 and both short and tall mobile viewports, real image decoding, and the absence of fake oversized SS text. The logo is the owner-approved existing graphic, not a new generated replacement.

## Release polish: contact, first-visit logo motion and mobile readability (2026-10-21)

Contact methods in `data/portfolio.ts` are the owner-approved new phone **09017470729**, **saeidshamsaeii00@gmail.com**, **@sd_shms** Telegram, verified matching GARTAL-related LinkedIn profile `/in/saeidshamsaei/`, and existing GitHub profile. An older number in the uploaded Persian resume was deliberately superseded by the explicit later user instruction; don't propagate it to the public portfolio. All channels are real `tel:`, `mailto:` or HTTPS anchors, are visible in the contact section and footer and remain English-only.

A CSS-driven, no-API introduction overlays the portfolio for just 1.63s on the first view in each browser session. It presents the approved SS image logo with an editorial text reveal. Visitors can skip instantly; further page visits bypass the intro; users with `prefers-reduced-motion: reduce` skip it automatically. No fake loading progress or external JS/analytics added; project content loads behind the nonblocking motion. Two-column contact cards and reduced-spacing case-study rails are optimized for narrow/tall/short touch screens. Browser QA checks contact link values, collisions, mobile case-study image vs text separation, 360×640 and 390×844, session persistence, reduced motion and preexisting CI requirements.

**Release policy**: `NEXT_PUBLIC_SITE_READY=true` and a real `NEXT_PUBLIC_SITE_URL` must be configured for a confirmed production domain before indexing. A passing CI / GitHub commit / safe local sync is not equivalent to deploying a live domain.
