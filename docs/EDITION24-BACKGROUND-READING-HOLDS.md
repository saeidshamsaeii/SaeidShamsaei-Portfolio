# Edition 24 — two-second reading pause at real background transitions

**Status:** GitHub source committed to `main`. No Next.js/TypeScript build, Playwright browser run, local Windows Worker sync or public deployment is claimed. Factory auto-CI/build/preview stays disabled.

## Requested behavior

The invisible automatic scroll director keeps the moderate 205px/s reading pace, interruptible manual scroll, Escape pause and 3.5-second idle resume.

When the current section has finished displaying its sequential copy and the next section has a **different computed background color**, it keeps the scroll position still for **2000ms**, then advances. Examples: black Linux introduction → white About, white About → black Selected Work, black Selected Work → white project introduction, white project introduction → black project case chapters, and the last black case chapter → white Contact. There is deliberately **no added pause** between the black personal intro and the black Linux stage, or between the three black scenes within each project's horizontal chapter.

The implementation does not require fixed color names or a visible playback bar: `GuidedTour.tsx` inspects the actual computed background of a stop's section. `WordReveal.tsx` exposes `data-reveal-complete` only when the real staged text reaches 100%. For vertical sections transitioning to a different color, the stop location ensures the final animated text can reach the viewport centerline. The last Linux intro slide is aligned to its completed `.80` scene progress, rather than leaving at the old `.18` point.

The pause is not applied to manual wheel/touch/key navigation; any user interaction immediately cancels it. No pause overlays or counters are shown. Reduced-motion visitors retain static text and no scripted tour. A 2600ms safety bound prevents permanent blockage if an observer, font or browser animation completion event fails to arrive; normally the pause begins immediately after actual completion.

## Changed files

- `components/GuidedTour.tsx` — computed surface transitions, final-text alignment, completion-aware 2000ms hold, manual cancellation and hidden state marker for regression tests
- `components/WordReveal.tsx` — real per-block completion state on existing accessible line-by-line text
- `components/ScrollHero.tsx` — allow Linux slide text to finish before transition
- `tests/edition24-background-holds.spec.ts` — background colors, actual visible pause, manual interruption and reduced motion (specification, not an executed result)
- `tests/source-contract.test.mjs` — source-level invariants for conditional 2-second holds

## Browser acceptance still required

Run an owner-approved Next.js build, then check each black-to-white and white-to-black boundary at desktop and mobile widths. Confirm exactly two seconds stationary after the final readable words, no mid-paragraph holds, no artificial delay inside the three black project scenes, preserved manual scrolling, and no hidden speed bar. Publishing and automatic Factory CI/Preview are not authorized by this source commit.
