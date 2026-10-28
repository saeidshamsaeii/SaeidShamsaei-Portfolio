# Edition 19 — Pure black/white, full-bleed owner portrait and authored line beats

Status: GitHub source committed; no claim of actual Next build, local Windows Worker sync, browser screenshot or public deployment. Factory automated CI, builds, tests and previews remain off under owner policy.

## Exact owner corrections

1. **Welcome**: greeting opens with the literal English `Hello...` (three ASCII periods) for 600ms; the existing translations then cycle every 125ms, beginning Persian `سلام`, then Arabic, Japanese, Russian, Hindi and Italian, followed by French, Spanish, German, Chinese and Portuguese. Reduced-motion visitors can bypass the long animation. Scroll is locked only while the overlay is visible. Tour starts after greeting.
2. **No speed meter/bar**: remove the `2x` display and line-style progress bar from `GuidedTour` **in React**, not just hide them. Variable underlying autoplay pace, native manual wheel/touch/key override, 3.5-second idle resume, small Pause and Exit buttons are preserved. The no-meter intent applies also to individual case pages.
3. **Portrait**: authentic checked-in `/assets/hires/portrait.webp` sits in a crisp, unframed **background plane** of the identity hero, rather than a bordered figure. On desktop the photograph occupies the right 56%; the left 44% is a purely black type field, with no text crossing into photo geometry. `object-position:50% 7%` places visual emphasis on the top of the photograph, `object-fit:cover` provides full bleed, and `filter:grayscale(1) contrast(1.1) brightness(1.04)` avoids dimming the owner's face. On mobile the photo is top background and all type follows in a solid black panel below. No replacement image was generated.
4. **Literal palette**: core dark surfaces use CSS `#000000` (`rgb(0,0,0)`), light surfaces `#FFFFFF` (`rgb(255,255,255)`). No colored theme accents. Grayscale photo, readable neutral text and translucent white separators are permissible without introducing a chromatic color family. `app/edition19.css` is last in root CSS cascade; browser themeColor is `#000000`.
5. **Exact authored text progression**: the first horizontal GARTAL panel uses three meaningful visual beats: **GARTAL** → **A studio at the front. A platform** → **underneath.**. The title and paragraph use the same scroll clock. This is not two independently animating elements. Line budgets are allocated proportionally in `WordReveal.grouped`, so each preceding line must fully finish before the following line starts. Separate explicit newline breaks are authored for the other three project introductions as well. Hero slide text/paragraph and main section groups use the same sequencing principle. Reverse scroll rewinds naturally; no grey ghost text appears ahead of the current line.
6. **Scope**: full case evidence and the searchable Engineering Index remain intact. A simplified original signature introduction already exists and the four project chapters retain native scroll-controlled horizontal navigation. All source strings remain in English after the brief multilingual welcome.

## Implementation

- `components/MultilingualGreeting.tsx`: literal first Hello..., 600ms vs 125ms cadence.
- `components/GuidedTour.tsx`: delete visible pace and bar; keep actual speed and manual takeover; allow the intro to finish its line score before jumping to the Linux stage.
- `components/SignatureOpening.tsx`: unframed full-bleed portrait, clean safe text field.
- `components/HorizontalCaseChapter.tsx`: explicit authored signature line breaks and source-grounded copy.
- `components/WordReveal.tsx`: per-scene total line count/preceding line budget; no overlapping asynchronous line animations.
- `app/edition19.css` and `app/layout.tsx`: high portrait crop, responsive photo/text separation, pure palette, last CSS import and browser theme color.
- Source and Playwright test specifications updated for the new acceptance contract.

## Acceptance / limitations

A static GitHub source check is not proof of visual correctness. The following still need an owner-approved local run and actual browser inspection:

- Open at 320, 360, 390, 430, 768, 1024 and 1440 px; inspect photo face crop, image clarity, and zero name/photo overlap.
- Monitor first-load Hello... before Persian and subsequent greetings; ensure autoplay starts only when the greeting finishes.
- Verify no speed or progress HUD in homepage and case pages; Pause/Exit still work.
- Scroll through GARTAL and verify GARTAL first, then A studio at the front. A platform, then underneath.; perform reverse-scroll rewind.
- Verify the same authored ordering in other project scenes, hero prose and long-form cases and test reduced-motion readers.
- Inspect `#000`/`#fff` surfaces, link readability, natural hairline separators, real photo asset checksum and mobile overflow.
- Run manual TypeScript/Next build and Playwright only with owner-approved access in the actual checkout; do not activate Factory automated CI or publish without explicit approval.
