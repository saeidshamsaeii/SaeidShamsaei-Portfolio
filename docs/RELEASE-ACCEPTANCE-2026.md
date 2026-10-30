# Portfolio release acceptance — October 2026

This is an **English-only** creative software engineering portfolio. The visual
direction is black and white, with a retained owner portrait, the original
cinematic narration and four source-grounded case studies. All language switcher,
flag and localization files were removed.

## Evidence terminology

**Source-backed** means the code or repository documentation supports a stated
capability. It does not establish live deployment, sales, medical certification,
sustained uptime, speed or an independently executed test. Project illustrations
are conceptual compositions unless labeled as product screenshots. Never
substitute fictional dashboards or invented customers for actual product evidence.

## Protected product decisions

- No automatic build, test, preview or CI within the Saeid AI Factory Worker,
  Sync or Dashboard. Existing scripts remain available for **manual final QA**.
- Work directly on `main`, with no required PR-gating branch.
- Keep the five-stage Selected Work score: title, four projects; each types,
  draws its separator and pauses for two seconds before the next starts.
- Preserve manual-scroll override, 2s reading holds and the reduced-motion path.
- Keep the index `noindex` until owner approves a real HTTPS production domain.
- Preserve actual repository reference SHAs and avoid fictitious business metrics.

## Owner-only final verification, added October 30, 2026

A SHA-pinned acceptance runner now exists at `scripts/final-quality.mjs` and is
exposed as `npm run qa:final`. It runs TypeScript, source tests, Next static
export, the CSS audit, the image audit and Playwright against the actual
exported site. The result is a local, ignored JSON evidence report under
`reports/quality/`; any failed or untested engineering gate blocks release.

The additional `tests/release-matrix.spec.ts` checks six routes across phone,
tablet and desktop viewports, portrait decoding, the three separate hero lines,
source links and reduced-motion navigation.

**Present status: NOT APPROVED.** These tests have been added, not executed
against a real Next.js installation at the final commit. The GitHub branch
still lacks a lockfile. Independent visual owner signoff, WCAG testing, field
performance and actual HTTPS publication remain separate acceptance gates.
No Worker CI/preview or scheduled build has been enabled.

## Required acceptance before a defensible 10/10

| Gate | Evidence required | Current evidence |
| --- | --- | --- |
| TypeScript | `npm run typecheck` exit 0 | Not executed in this change |
| Source checks | `npm test` exit 0 | Tests authored, not executed |
| Static export | `npm run build` exit 0 and `out/` assets verified | Not executed |
| Visual layout | Screenshots for 320, 390, 768, 1024, 1440 px at several heights | Not captured |
| Cinematic interaction | No premature words, complete divider animation, 2s holds, reverse scroll | Source implemented, browser QA pending |
| Keyboard and motion | Focus ring, tab order, Escape, reduced-motion browsing | Source and tests; manual audit pending |
| Accessibility | Contrast, full keyboard audit, screen reader announcements | Not independently audited |
| Performance | Real-device Core Web Vitals and Lighthouse tests | Not measured |
| Project evidence | Real owner-approved product captures and source-linked claims | Source links exist, real captures pending |
| Publishing | Confirm domain, TLS, sitemap/robots/canonicals and owner approval | Not approved |

### Manual commands — deliberately never run by the Worker

```bash
npm install
npm run typecheck
npm test
npm run build
npm run qa:css
npm run qa:browser
```

A production domain requires `NEXT_PUBLIC_SITE_URL=https://your-real-domain`
and `NEXT_PUBLIC_SITE_READY=true` **together**, only with explicit owner
approval. Before that, the project deliberately blocks indexing. Do not claim
a 10/10 score from code review alone.

### CSS modernization

The original sequential edition files are not safe to remove blindly because
later layers override earlier selectors. `npm run qa:css` reports the
number/size of imports and specificity debt. Modernize only after snapshot
comparisons across routes, text zoom, short landscape displays and reduced
motion. The new `app/quality.css` intentionally contains scoped protections
rather than another global re-theme.
