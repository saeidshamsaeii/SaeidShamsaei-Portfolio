# Edition 25 — pause every left-moving horizontal text panel for 2 seconds

**Status:** The changes are committed to connected GitHub `main`. A real Next.js build, Playwright/browser run, owner Windows Worker checkout sync and public deployment have **not** been verified. Factory automatic CI/build/preview remain disabled by owner policy.

## Requested correction

Edition 24 held only when the background changed, so a horizontal chapter's three black panels could still glide left before readers finished. The owner now requires a **two-second pause in every individual horizontal text panel**, regardless of whether the background changes.

Each of the four authentic case chapters has the same three semantically distinct frames:

1. **Identity:** Project name → explicitly authored two-line product statement.
2. **Core idea:** Real technical headline → source-grounded explanation.
3. **Handoff:** Concluding project sentence and the genuine case-study link.

There are **12 per-panel reading breaks** in the four project chapters.

## Implementation

- `components/HorizontalCaseChapter.tsx`: every frame has explicit `data-tour-hold="horizontal-frame"`. This is semantic source markup, not an on-screen speed/progress component.
- `components/GuidedTour.tsx`: keeps the 205px/s, hidden, native-scroll tour and a `HORIZONTAL_FRAME_PAUSE_MS=2000` duration. The horizontal stop is placed at **.66 of its own frame**: `WordReveal` has completed by **.64**, and the horizontal rail does not begin its glide until **.67**. The director waits for the frame's own text completion state, then holds that same fully visible panel for 2 seconds before moving left.
- A frame that also changes the background uses **one** 2-second hold, not an extra two-second hold from Edition 24.
- Each hold writes an internal test-only attribute `data-portfolio-tour-hold="horizontal-frame"` to the root while active. No visible button, AUTO STORY overlay, speed display or counter has been added.
- Mouse wheel, touch and keyboard input take control immediately and cancel an active hold. The 3.5-second idle auto-resume, Escape pause and OS reduced-motion safeguard are unchanged.
- `tests/edition25-horizontal-holds.spec.ts` and `tests/source-contract.test.mjs` capture the new acceptance criteria; test definitions must not be confused with a successfully executed browser test.

## What to verify in a real browser

At 320, 390, 768 and 1440 px, and for **each** of GARTAL, AI Development Factory, DigiRezhim and Petiwoo:

1. Enter horizontal panel 1, read its completed title and signature, then time the 2-second stillness before the lateral move.
2. Check the middle panel's heading and explanation finish **before** its 2-second pause; do not skip the pause merely because both panels are black.
3. Check the final panel also pauses, without a second delay when the next section's background is different.
4. Confirm wheel/touch input cancels any hold instantly and the user can scroll backwards; verify automatic continuation after the existing idle interval.
5. Verify no visual text/photo overlap, no clipping at narrow breakpoints, no return of the speed bar and no changes to project factual content.

Do not turn on Factory automatic CI/Preview or publish without the owner's approval.
