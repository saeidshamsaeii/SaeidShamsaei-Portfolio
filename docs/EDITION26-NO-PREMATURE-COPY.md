# Edition 26 — No next-block text visible during a two-second reading pause

**Status:** Source changes committed to GitHub `main`. This is not an executed Next.js build, Playwright pass, device screenshot, owner Windows checkout sync or public deployment. The owner’s Factory automatic CI/Preview restriction remains in effect.

## Requested behavior

During the existing **2-second pause** in every horizontal project scene, the reader sees **only the current, completed scene**. No title, paragraph, link or previously typed words from an upcoming scene may leak into the visible viewport. When the pause ends, the rail moves left, the following panel reaches its proper position and **only then** its typewriter reveal begins. This also holds on reverse scrolling and at black-to-white or white-to-black boundaries.

## Implementation

- `HorizontalCaseChapter.tsx` now assigns every scene an explicit `data-frame-state`: `past`, `active`, or `upcoming`. Current frame is determined from the actual 3-frame scroll coordinate. The rail is still motionless at **.66** of the frame; horizontal departure starts at **.67**.
- The rail sends a synchronous `sx-horizontal-progress` event after each frame update. `WordReveal.tsx` listens even for horizontally off-screen panels, refreshing the opacity and clipping of their text **before the next browser paint**. This fixes retained previously-revealed text on upward scrolling, which the older IntersectionObserver alone could miss.
- `edition20.css` hides the visual text and action links in upcoming horizontal scenes until their `data-frame-state` becomes `active`. It does not hide the background itself or change the user’s original monochrome design.
- `GuidedTour.tsx` reserves the next entire stop with `data-tour-awaiting=true` while its predecessor is being read. Thus a vertically following section cannot show its headline at the bottom during a 2-second stop. It removes this marker on advancing, any manual wheel/touch/keyboard interruption, completion or unmount.
- `WordReveal.tsx` also resets any reserved next block to 0% reveal, so the next typewriting sequence begins with blank words rather than a partially written paragraph.
- Reduced-motion visitors, static/no-script rendering and natural manual scrolling never depend on the invisible director's next-block restriction. There are no visual Auto Story/speed controls, and the existing 205px/s hidden scroll pace, 2-second scene pause and 3.5-second idle continuation remain unchanged.

## Acceptance

Code-level regression and Playwright specifications are saved in `tests/source-contract.test.mjs`, `tests/edition25-horizontal-holds.spec.ts` and `tests/edition26-no-future-text.spec.ts`. They are **tests defined in the repository, not proof of tests executed**.

Before a release, execute owner-approved local Next.js typecheck/build and actual browser tests at mobile and desktop widths. Specifically verify pause on each of 12 horizontal panels, reverse from scene 3 to 1, no next panel copy at the pause, no next vertical section copy peeking at a color boundary, full text appearing only when its frame becomes active, manual navigation cancellation and reduced-motion accessibility. No public deployment or Factory automatic CI/Preview has been enabled.
