# October 2026: Office portrait hero image refresh

Approved office portrait from the owner's latest edited image, depicting the same person with hand to mustache in a developer workspace, is stored as `public/assets/hires/portrait-office.webp` (900x1125, WebP). The display uses a true photo asset, not the previously generated mockup screenshot with text/nav baked into its pixels. Hero typography, navigation and links remain native accessible HTML.

The editorial atmosphere blends an office setting, tasteful gold accents, a secondary contact CTA and native vertical-scroll narration. Media styling is responsive and subject to `prefers-reduced-motion`. The four existing horizontal project case studies, About copy, original gold logo and contact channels remain unchanged. Tests must validate HTTP 200 and successful browser image decode and source path on desktop/mobile.

This is a *source delivery*; local laptop checkout and public deployment are not asserted until separately verified. GitHub Actions CI (if enabled) does not establish Windows Factory worker execution. Indexing is still guarded by valid production HTTPS domain and NEXT_PUBLIC_SITE_READY.
