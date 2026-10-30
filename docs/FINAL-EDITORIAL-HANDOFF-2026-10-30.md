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
