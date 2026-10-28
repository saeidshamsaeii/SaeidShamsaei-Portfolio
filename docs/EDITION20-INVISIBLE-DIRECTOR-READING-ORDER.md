# Edition 20 — invisible director, visible opening, real line-by-line reading

**Source status:** committed directly to the owner's GitHub `main`. No production deployment, Windows Worker sync, TypeScript/Next.js build, Playwright execution or visual browser screenshot is claimed.

## Owner-requested interaction contract

- **Remove Auto Story UI, retain behavior.** `GuidedTour` now returns `null` instead of displaying a toolbar. Its effect still drives the exact native vertical scroll, per-scene velocity ramps, interactive wheel/touch/keyboard takeover and resume after 3500ms of inactivity. Escape deliberately pauses if needed, without taking over natural scrolling. Reduced-motion prevents automatic narration. No button, speed display, progress line or AUTO STORY label is rendered.
- **First screen needs readable writing.** The main heading `SAEID / SHAMSAEI` and short `Design. / Code. / Architecture.` block now start an on-entry sequential reveal as soon as the greeting completes. They no longer require physical scroll to become visible. The global director starts only after that same greeting and reaches into the introduction at a rate that allows text to finish.
- **Center header labels.** The brand remains on the left on desktops, while the Work / About / Engineering / Contact navigation is in the viewport's horizontal center using a balanced three-column grid. Below 900px the nav becomes a centered separate row, preventing logo collision; the mobile links remain centered and keyboard-accessible.
- **Reduce the size of the actual owner portrait.** Without replacing the original `portrait.webp`, the background image is now subtly reduced with `scale(.91)` (and `.90` on phones). It remains full-bleed/grayscale and high-positioned, softly fading into the pure black page rather than reintroducing a frame or overlaying text. The source remains unmodified. Owner review of the live crop is still mandatory.
- **All prose obeys real line and paragraph order.** `WordReveal` reads actual word positions from the browser with `getBoundingClientRect().top`, so natural wrapping at 320px is handled differently from desktop. Every visible line reveals in its actual visual reading order, word by word; no later line begins until the previous one completes. Explicit authored line breaks, such as GARTAL → A studio at the front. A platform → underneath., remain boundaries. The title and all following paragraphs in a project scene, Linux story or detailed case-study chapter share one proportional section clock. ResizeObserver and font readiness remeasure wrapping. Going upward rewinds the type. Screen readers receive one uninterrupted semantic text string, and reduced-motion/no-JS visitors can read the text immediately.
- **Extend to actual homepage copy.** Selected Work headline, project names/keywords, About expertise words and Contact labels/values are included. Functional navigation labels remain visible immediately for accessibility.
- **No color palette drift.** Pure black and white from Edition 19 stay authoritative; Edition 20 only changes layout, image scale, ordering and text clipping.

## Files changed

`components/GuidedTour.tsx`, `components/SignatureOpening.tsx`, `components/PortfolioExperience.tsx`, `components/WordReveal.tsx`, `components/SelectedWorkIndex.tsx`, `app/edition20.css`, `app/layout.tsx`. Updated existing Playwright source-contract, guided-tour, homepage and identity tests for **headless** autoplay and on-entry type.

## Still requires actual browser approval

1. Build `main` at the exact SHA on an approved environment; validate TypeScript, Next.js static routes and source contracts.
2. On 320, 360, 390, 430, 768, 900, 1024 and 1440px, verify visual line grouping, no blank hero after welcome, centered header, no text/photo collision and no horizontal scrollbar.
3. Verify responsive portrait scale/face detail, pure black and white and lack of photo card.
4. Scroll through every project and all four dedicated case routes, ensuring paragraphs complete line by line, in order, without prematurely revealing the next paragraph.
5. Confirm hidden autoplay actually moves the page, yields to wheel/touch/arrows, resumes from current scroll after 3.5 seconds, pauses with Escape, and honors reduced motion.
6. Compare actual screenshots with the intended minimalist standard. No automated Factory Worker CI, Preview or public deployment without owner approval.
