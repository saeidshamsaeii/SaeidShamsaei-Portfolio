# Portfolio QA evidence — 29 October 2026

## Scope and source identity

This evidence report covers the English-only `SaeidShamsaei-Portfolio`
codebase on GitHub `main`. It does not imply a public deployment or
a complete browser audit.

A local Node.js test workspace reproduced these exact Git blob objects:
- Publication guard: `lib/siteRelease.ts`
  `728d6860e7593e88306ca73dbc4383c5e91c4b80`
- Publication unit tests: `tests/site-release.test.mjs`
  `280790e2ca18ee2f7503102086a0309bcfaca161`
- Static preview server: `scripts/serve-static.mjs`
  `ae0111089d97e3dd9a27215a7e9729cb6713e015`
- Preview regression test: `tests/static-server.test.mjs`
  `51f2de4fc0fee695d99ee4f448e83dab9667328d`

## Actually executed — PASS

The two exact-source test files were executed using Node.js 22.16.
Result: **4 of 4 passed, 0 failed**.

1. Indexing stays disabled without both owner approval and a real URL.
2. Invalid, local, non-HTTPS, credential-bearing and path-prefixed origins
   are refused by the release policy.
3. Approved HTTPS origin produces correct homepage and nested canonical URLs.
4. A mocked static export serves 200 for existing routes, 308 trailing-slash
   redirect, correct custom 404, and refuses traversal/malformed paths with 400.

The preview server test uses synthetic `index.html` and `404.html`
fixtures; this does **not** mean the real Next.js `out/` bundle was built.

## Static source audits — completed, not runtime tests

- Imports: 28 application TypeScript/TSX files examined; no missing
  local import targets found.
- Evidence: pinned source references for five upstream repositories were
  inspected at their corresponding immutable Git SHAs; every expected
  file path existed.
- Historical browser suites: 15 test files reviewed for removed multilingual
  or older GARTAL/Engineering assumptions; stale assertions updated.
- English-only: selector, locale provider, translation assets and flag
  dependencies are absent from current source.
- Worker policy: no GitHub Actions workflow introduced; manual QA only.

## Source fixes in this QA cycle

- Reconcile Engineering Index decision counts and text search.
- Preserve original five-stage Selected Work narration while avoiding
  cropped content on short viewports.
- Keep unrevealed project links out of keyboard and screen-reader navigation.
- Prevent font-ready callbacks from touching unmounted WordReveal components.
- Replace outdated GARTAL WSGI claims with verified Next.js App Router,
  PostgreSQL, Drizzle and source-linked current behavior.
- Correct obsolete browser/source test assertions.
- Validate indexation from one strict HTTPS + owner approval gate.
- Serve coherent 404 pages from the local preview server and reject unsafe
  normalized path requests.

## Still NOT TESTED

- The complete repository `npm run typecheck`, `npm run build`,
  full `npm test` and Playwright browser suites.
- Real browser screenshots and visual comparisons at mobile, tablet,
  short landscape and desktop viewport sizes.
- Keyboard/screen-reader walkthrough, WCAG audit, contrast verification
  and reduced-motion review against rendered pages.
- Lighthouse / Core Web Vitals with a real static export or approved domain.
- Real owner-authorized project screenshots replacing conceptual artwork.
- Owner acceptance and production publication.

The working environment did not have a GitHub clone, Next.js/React
dependencies or a reachable npm registry. **No passing build, site-wide
browser result, performance score or 10/10 approval is claimed.**

See `docs/RELEASE-ACCEPTANCE-2026.md` for remaining manual gates.
