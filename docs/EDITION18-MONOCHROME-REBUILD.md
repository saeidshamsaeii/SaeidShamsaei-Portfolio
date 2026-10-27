# Edition 18 — Repair: monochrome, framed portrait and line-by-line reading

**Scope:** GitHub source edits; user requested correction after the former design overlapped text and the owner photograph and made the site visually cluttered. This record is not a local Next.js build, Playwright PASS, screenshot, Worker sync or public deployment claim.

## Visual contract

1. **Site entrance:** a black, full-viewport welcome preloader first displays `سلام` (Persian), then `Hello` (English), `مرحباً` (Arabic), `こんにちは` (Japanese), `Привет` (Russian), `नमस्ते` (Hindi), `Ciao` (Italian), then French, Spanish, German, Chinese, Portuguese. The greeting is translated rather than transliterated. The page's automatic tour starts only **after** the greeting finishes. Readers who prefer reduced motion see a short static welcome instead of a forced multilingual animation. No fake progress percentage.
2. **Authentic photo:** `SignatureOpening` now uses a true CSS grid with separate text and image columns, never absolute-positioning text on a background portrait. The original `public/assets/hires/portrait.webp` remains untouched, within a bordered `<figure>`, `object-fit:contain` so it is not cropped to fill. Small photo captions, edge labels and decorative signature marks are removed.
3. **Sequential type:** `WordReveal` groups text into logical visual lines and uses a single progress source per block. One line completes before the next reveals. On the introductory name, an explicit newline separates `SAEID` and `SHAMSAEI`; intro scroll progress reveals first, second, then the headline keywords. All headings and prose maintain a single unbroken accessible semantic string, while decorative visual line elements are `aria-hidden`. Reverse scrolling rewinds. Reduced-motion and no-JavaScript visitors can read the full text.
4. **Black and white:** new last-loaded `app/edition18.css` establishes pure-white and near-black sections, grayscale authentic photo and Linux editor, monochrome case and Engineering Index pages and neutral hairline separators. No gold, orange, teal or other project palettes are intentionally displayed. Transparent autoplay controls remain legible over both white and black.
5. **Less copy, more focus:** main homepage now includes only owner identity, functional Linux coding scene, one short professional statement, 3 explicit expertise keywords, 4 unambiguous project rows and contact links. Project hero narratives were shortened to **3 horizontal scenes/project** (identity, one source-informed idea, direct case handoff), instead of 5, 8 or 20. Independent six-chapter case-study pages retain the full technical record; the Engineering Index keeps original evidence trails.
6. **Remove visual noise at the source:** outer Linux notes/counters, giant directory watermark, About sidebar mark, extra caption stacks, hero slide selectors and each project scene's side annotations are removed from JSX, not only set to `display:none`. Editor line numbers remain because they are part of the functioning code editor. Detailed document citations and API facts remain available on the technical routes.

## Changed and added files

- `components/MultilingualGreeting.tsx` (new)
- `components/SignatureOpening.tsx`
- `components/WordReveal.tsx`
- `components/PortfolioExperience.tsx`
- `components/SelectedWorkIndex.tsx`
- `components/HorizontalCaseChapter.tsx`
- `components/ScrollHero.tsx`
- `components/LinuxCodeCanvas.tsx`
- `app/edition18.css` (new) and `app/layout.tsx`
- `tests/edition16-identity.spec.ts` (now updated to Edition 18 behavior), `tests/portfolio.spec.ts`, `tests/guided-tour.spec.ts`, `tests/source-contract.test.mjs`

- Native manual navigation can still pause the tour and resume after 3.5 seconds; the tour HUD now switches contrast on every light section.
- Deep case-study engineering considerations are retained behind semantic expandable `<details>` controls rather than floating side notes.
- With JavaScript disabled, the welcome overlay is hidden so the static site is not trapped behind it.

## Verification boundary and acceptance

**25 GitHub source structure checks** were inspected after implementing the main design changes; those are not real Playwright, CSS rendering or build results.

Before calling this premium or deployable, run the owner-approved Next.js typecheck/build and inspect Chrome/WebKit at 320, 360, 390, 430, 768, 1024 and 1440 px:
- Image fully inside frame at every breakpoint and **no rectangle overlap** with any text
- Strict line sequence while scrolling in both directions; first and second surname line before keywords
- First-load Persian greeting then English, Arabic, Japanese, Russian, Hindi, Italian and further languages; no hidden document scrolling during the greeting
- Black-and-white pixels throughout main, work pages, Engineering Index and Linux scene; no old gold selectors showing through
- No horizontal overflow, CSS clipping, unreadable headings or unexpected spacer panels
- Native manual up/down override and idle auto-resume; reduced motion and no-JS fallback
- Editor/case-source links remain accurate; owner's original portrait checksum remains unchanged

Factory owner policy is preserved: automated Worker CI, builds, previews and scans remain disabled; publishing or enabling indexing requires explicit permission. GitHub `main` commits do not demonstrate safe pull to the user's Windows checkout.
