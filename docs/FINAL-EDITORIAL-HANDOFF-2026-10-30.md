# Final editorial handoff — 30 October 2026

## What was changed
- The biography immediately after the owner portrait is a responsive single reading scene.
- Removed Qab Novin / IELTS copy from the personal scene.
- Restored the actual word-by-word reveal by removing CSS forced opacity on biography words.
- One ordered biography clock is controlled by GuidedTour. After all lines finish, a 2-second hold precedes the next scene. Smaller screens type during traversal and continue without rewinding.
- Case-study pages keep a shared black/white typographic system while the problem, implementation and outcome scenes have distinct compositions on large screens.
- Secondary notes and next-chapter navigation remain hidden until the primary copy is legible.
- Four project pages and the engineering index use image-free, accessible project overview dialogs instead of README/source-list links.
- Only Petiwoo (https://petiwoo.ir) and DigiRezhim (https://digirezhim.ir) have external live-site links; other project sites remain COMING SOON.
- Updated source/browser acceptance suites for current structure and added tests/final-editorial.spec.ts.

## What was actually checked
- Inspected current GitHub main source and related regression tests.
- Static invariant checks passed for introductory section order, timing hooks, two live links, README-link removal and CSS brace balance.
- No Next.js build, TypeScript check, Playwright test, Lighthouse test or deployed-browser check was executed.
- The owner committed package-lock.json at e729d36; npm ci, TypeScript, static export, CSS and image audits have passed on the owner's Windows machine. Source-contracts, browser-e2e and clean Git provenance were reported failing at that SHA; latest changes address known stale assertions and improve failure diagnostics, but are not yet rerun.
- The repository does not contain GARTAL custom font binaries. The actual site currently has older fallback font rules; licensed font assets must be supplied and integrated if custom GARTAL branding is a launch requirement.
- localhost:3200 on the owner's Windows machine cannot be accessed from this environment. Cloud tools and the model container do not share the owner's loopback address.

## Owner-only manual release commands
On the owner's Windows machine, after pulling the final commit:

```powershell
cd C:\Projects\SaeidShamsaei-Portfolio
git pull origin main
git status --short
npm test
# If browser-e2e reports missing Chromium:
npx playwright install chromium
npm run qa:final
```

Review the resulting report under reports/quality/ and run a browser visual pass at 320, 390, 768, 1024 and 1440 px. Explicitly check first hero, biography typing, 2-second holds, backscroll, case navigation, project-summary dialog Escape/focus, reduced-motion mode and all six routes.

## Publication gate
- **NOT RELEASE APPROVED** until final manual tests pass, production HTTPS domain is selected and the owner signs off.
- Static output is configured in next.config.ts (output: 'export').
- Set NEXT_PUBLIC_SITE_URL=https://the-approved-domain/ and NEXT_PUBLIC_SITE_READY=true only after the domain and permission are confirmed. Build again with the production settings so sitemap, robots and canonical URLs agree.
- Until then, keep the existing indexing guard.
- Never start automatic CI, preview, build or test in the Factory Worker/Sync/Dashboard. No branch or PR workflow is required; work remains on main.

These source edits are not equivalent to running on the owner's laptop or to a production deployment.

## QA incident 30 October 2026 (owner machine)
- `e729d36` is the first locked dependency revision. Manual QA returned 6/9 PASS. Do not publish until clean provenance, all source contracts and browser tests pass.
- A few source-contract assertions still expected removed README file lists and the pre-biography tour hold. Those assertions have been updated on main.
- The owner-local report contains the specific failure logs. On Windows PowerShell, retrieve them without discarding local changes:

```powershell
Get-Content reports/quality/acceptance-e729d36c8333.json -Raw | ConvertFrom-Json | Select-Object -ExpandProperty gates | Where-Object status -eq 'FAIL' | ForEach-Object { $_.id; $_.stdoutTail; $_.stderrTail }
git status --short
```

- Updated manual QA prints the failed stdout/stderr and dirty Git paths directly to console and stores them in the JSON evidence file. The Windows Node shell deprecation warning is addressed without relaxing any release gates.

## Owner QA browser resolution — 30 October 2026
- On the owner's Windows host, manual QA at revision f69c933 passed all eight non-browser gates. The sole failed gate was `browser-e2e`: download of Playwright's bundled Chromium was refused with HTTP 403 (`service is not available in your location`). These browser tests were **not run**; the site was not shown to fail 100+ independent interactions.
- The browser strategy now probes **already installed Google Chrome** then **Microsoft Edge**. Official Playwright browser channels (`chrome`, `msedge`) are used by `playwright.config.ts`, with the detected channel passed to the owner-invoked test process. No download or mutation of installed browsers occurs.
- If neither installed browser launches, QA fails with a specific local-browser diagnostic. Obtain or repair Chrome or Edge through your usual trusted installation channel rather than retrying the blocked Playwright CDN. Never bypass the missing-browser failure by marking tests PASS.
- Once the owner pulls this commit, use `npm run qa:final`. Do not restore the old generated-file stash unless explicitly needed, because it predates the clean Next.js generated-type policy. Review `reports/quality/acceptance-<sha>.json` for exact SHA-pinned results.
- A passed browser suite still requires a visual review and owner-approved HTTPS production domain before `NEXT_PUBLIC_SITE_READY=true`.

## Owner QA browser run after CDN workaround
- The owner ran `qa:final` at `ab9a0f8`: all eight non-browser gates passed and installed Chrome launched successfully.
- The browser suite began and reached test 83 of 97 before the `spawnSync` 14-minute timeout. **Browser E2E failed / incomplete**. No launch approval is inferred from 8/9.
- The captured output confirms two obsolete Playwright selectors: `#project-gartal-origin` (the current scene is `#project-gartal-slide-2`) and `.sx-v18-case-details` (now `details.sx-v31-deep-item`). Other outdated single-scene counts were found in legacy tests and updated without deleting coverage.
- `qa:final` now streams E2E progress, maintains non-zero failure semantics and permits up to 30 minutes for the 97-test suite on the owner's low-resource Windows machine. Chrome/Edge fallback remains intact.
- Re-run only via the manual owner command `npm run qa:final` after pulling main. If functional tests fail, preserve the actual per-test error messages, screenshots and traces in `test-results/` instead of assuming they are only selector issues.

## Final media framing and Selected Work scroll fix
- The first scene of every GARTAL / AI Factory / DigiRezhim / Petiwoo chapter now uses the existing `public/assets/hires/project-*.webp` image instead of a smaller `public/assets/projects/*.webp` thumbnail. The displayed artwork is kept separate from text-only detail modals.
- Native width/height of the replacement 4:5 artwork are declared on the image. The project visual is fitted with `object-fit:contain` and a black monochrome gradient matte so the subject is not distorted or arbitrarily cropped on mobile.
- The owner's original portrait is not replaced. Removing legacy scale transforms avoids enlarging soft pixels and crops; genuine higher-resolution portrait detail still requires a better source original.
- Image audit now verifies published rather than legacy thumbnail sizes and requires a 4:5-ish project source. No invented pixels or AI reconstruction is claimed.
- Selected Work is a full-screen pinned reading composition with a 400svh native scroll runway. Each heading/row reveals from scrollY and reverses in strict order on upward scrolling. Divider progress and link accessibility reverse with the text. Autoplay now travels the runway before its 2-second completed reading hold.
- Browser regression has been updated for real scroll forward/backward and high-resolution art. This change has been **source-checked only** and is **not** equivalent to an owner-local green `qa:final` run.
- Do not start CI, automated previews or builds in the Factory Worker. The owner runs `npm run qa:final` manually, records results and decides production approval.
