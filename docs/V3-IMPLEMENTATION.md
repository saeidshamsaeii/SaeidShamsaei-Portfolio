# V3 — Owner-approved scroll-driven portfolio (2026-10-21)

**Owner scope:** all six approved upgrades: hero narration, case-study scroll transitions, authentic source-based presentation, mobile-specific layout, refined personal introduction, distinctive contact/logo finish; performance/SEO/release readiness.

## Implementation and source truth

1. **Scroll-directed hero.** Original editorial black/gold cover gains a pinned 3-beat narrative (Understand / Architect / Deliver), progress-linked source-documented motion and normal browser scrolling. CSS + a small requestAnimationFrame hook; no paid API, heavy WebGL, scroll hijack, or fictitious accomplishments. Initial CTA points to About.
2. **Four case-study chapters.** Five horizontal frames each, scrubbed by vertical scroll, equipped with direct progress buttons, keyboard arrows, touch swipes, a bounded snap tolerance and an ordinary vertical handoff to the next chapter. Maintains a readable reduced-motion native horizontal alternative. Detailed routes retained for each product.
3. **Reality of evidence.** Cross-repo source review located real routes and architectural features, **but no verified public UI screenshots** or authorized local authenticated sessions. The old AI-concept hero art of each project is replaced by an interactive, readable **source-informed UI anatomy**, explicitly labeled **NOT A LIVE SCREENSHOT** and linked to the GitHub source. This intentionally satisfies truthful product evidence presentation; it does **not** claim that genuine running-site screen captures were obtained. If approved real recordings/screenshots become available, substitute them after provenance/privacy review. Source records:
   - GARTAL Core Admin: `saeidshamsaeii/Core-Admin/pages/Dashboard.tsx` (overview, customers, products, orders, animals, appointments, inventory).
   - AI Factory: `saeidshamsaeii/AI-Development-Factory/src/worker.js` (source review, owner boundaries, CI evidence, local sync).
   - DigiRezhim: `saeidshamsaeii/DigiRezhim/apps/web/src/components/doctor/doctor-dashboard.tsx` plus doctor/patient/nutrition route structure.
   - Petiwoo: `saeidshamsaeii/Core-Petshop-Store/pages/index.tsx` (categories, storefront data and sections), with booking/order/pet routes separately verified in repo.
   The interface studies deliberately omit fake numbers, patients, orders, customer names and production success states.
4. **Mobile-specific experience.** Separate responsive typography and composition for phone widths 360/390/430/768, high-contrast selectable tabs and larger touch targets. Artwork and story text remain in their own viewport compartments. Mobile keeps touch-swipe and scroll-based horizontal stages without introducing a separate scripted scrolling model.
5. **About personality.** Stage-independent approved cutout portrait; one professional positioning paragraph; restrained viewport intersection-based motion for text/portrait, no inflated skills, fabricated hobbies or geography.
6. **Contact finish.** Approved original transparent gold logo, intentional closing headline, phone `09017470729` / `tel:+989017470729`, email `saeidshamsaeii00@gmail.com`, LinkedIn `/in/saeidshamsaei/` and Telegram `@sd_shms`. No unrelated social link or unsupported location claim.

## Release gates

- GitHub exact-head TS, Next export, media audit and Chromium Playwright screenshots (desktop, mobile, story progress, reverse scroll, reduced motion and case pages).
- The loading presentation remains skippable, repeat-session safe and reduced-motion aware.
- Project art at first frame now uses lightweight HTML instead of the four eager-loading conceptual project WebPs. Browser source images remain available from previous releases, but are not claimed live captures.
- `app/layout.tsx` adds OpenGraph, X card and **production-conditional** JSON-LD. It does not index a preview or a placeholder origin.
- `NEXT_PUBLIC_SITE_READY=true` **and** a real HTTPS `NEXT_PUBLIC_SITE_URL` are both required before public indexing. The repository does not deploy a host or control DNS.
- A GitHub commit/Actions success does not imply that local Windows Factory V4 runs, GitHub LocalSync pull completed or a public domain is live. Factory registry still lists `saeid-portfolio/main` with `executeEnabled=false`, `writeEnabled=false` (owner approval to edit interactively is separate). Local CI requires actual Worker task-result evidence. No second worker, no Codex, no OS commands.

## Honest residual acceptance

**Still unverified for launch:** original live product screen captures, real user mobile-device acceptance, Lighthouse/CrUX lab/field Core Web Vitals, authenticated Worker receipt, on-device source synchronization and public domain/deployment. Do not label these gates passed purely from a GitHub CI result.
