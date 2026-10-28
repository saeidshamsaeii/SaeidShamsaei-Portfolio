# Edition 22 — Complete at the centerline, keep the last paragraphs, fade the portrait

**Source state:** Changes committed to `main` on 2026-10-28. The GitHub source update does **not** demonstrate a successful browser session, Next.js build, Playwright pass, Windows Worker sync or production deployment. Factory automatic CI/build/preview remains disabled.

## The four owner-reported defects

1. **Late/incomplete writing:** Previously an artificial section clock with a hard maximum rate let the user scroll past lines faster than the text could reveal. Vertical editorial text now derives progress from each rendered block's position. It begins appearing around 88% viewport height and **is fully visible by the time its center reaches 50% viewport height**, at every viewport size. Natural browser line breaks are preserved, while the heading and individual paragraphs retain their sequential logical order. Horizontal pinned projects still use their authored frame progress, and the intro still has a one-time on-arrival reveal after greetings.
2. **Last paragraphs invisible:** Long case chapters had one denominator for the whole chapter, and offscreen observer behavior sometimes left text partially written. Each separate block now supplies its own viewport completion target. On passing the centerline and leaving the observer from above, its content is explicitly completed. At the true document bottom, every remaining on-screen text block is completed, even if the browser cannot scroll far enough to align it with the midpoint.
3. **Bottom photo edge:** Added a monochrome `::after` overlay to the authentic, unchanged `/assets/hires/portrait.webp` background. On desktops its alpha fades from transparent starting at 46% height toward `#000` at the bottom; mobile has an adapted gradient. The photograph retains the high-positioned grayscale crop and slight zoom-out; the overlay does not sit over copy.
4. **Invisible header/name and legacy gold text:** Added explicit `#fff!important` and `-webkit-text-fill-color:#fff!important` overrides for the header brand, the name and short caption beside the photo, and dark case-study/engineering links and counters that inherited older gold colors. Forced `--sx-v10-accent` and `--ei-gold` to white for these dark contexts. This does not turn text black-on-white sections white: they retain readable dark text.

## Updated sources

- `components/WordReveal.tsx`: `centerlineProgress`, `viewportGroup`, bottom-of-document completion, above-center observer exit.
- `app/edition20.css`: high-priority white title/links and portrait-bottom black gradient; reuse the current last-imported stylesheet, without introducing a further CSS edition.
- `tests/source-contract.test.mjs`: update assertions away from the previous deliberately slow clock.
- `tests/edition22-centerline.spec.ts`: Playwright acceptance **specifications** for centered paragraph completion, final visible contact, header/case/source colors and bottom photographic gradient.

## Acceptance still needed (not claimed)

Inspect actual Chromium/browser screenshots and execute Next.js typecheck, build, source contracts and Playwright at the exact repo commit before calling this visually complete. In particular test 320, 360, 390, 430, 768, 1024 and 1440px, real scroll up/down, English greeting, portrait-to-black transition, contrast and long case-study end paragraphs. Do not enable Factory's automatic CI/Preview or publish without explicit release approval.
