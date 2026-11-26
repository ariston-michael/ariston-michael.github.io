# Validation report — 2026-10-31

The latest pre-release validation is recorded at the end. Earlier sections preserve historical implementation and source-availability baselines; their old resume blockers are superseded by the verified Drive source.

## Environment and checks

macOS arm64; Node.js 24.14.0; npm 11.9.0. Checks run against the production static export, not just a development server.

| Command | Actual result |
| --- | --- |
| `npm ci` | Lockfile installation succeeded; dependencies added without lockfile changes |
| `npm install --save-dev @playwright/test @axe-core/playwright` | Added four packages; full audit reports 16 moderate development lint-chain findings |
| `npm run lint` | Exit 0; no errors or warnings |
| `npm run typecheck` | Exit 0; route types generated successfully, strict TypeScript passed |
| `npm run build` | Exit 0; compiled successfully, 9/9 static-generation entries completed |
| `npm audit --omit=dev` | Exit 0; `found 0 vulnerabilities` |

Exported routes: `/`, `/projects/aircontrol/`, `/projects/energy/`, `/projects/chicken/`, `/robots.txt`, `/sitemap.xml`, original favicon, and custom not-found output. No runtime server, APIs, server actions, or deployment workflow are required/introduced.

## Previous completion-pass browser result

```sh
PLAYWRIGHT_CHANNEL=chrome npm test -- --project=chromium --project=webkit
```

Actual final output: **`92 passed (1.3m)`**, exit 0. No retries, skipped assertions, or application-rule suppressions were used. Each engine ran 46 tests; Firefox’s configured 46 tests remain unexecuted because the engine cannot launch on this host. The earlier engine-launch failures are not included in the passing count.

## Responsive browser coverage

The suite uses installed Google Chrome via `PLAYWRIGHT_CHANNEL=chrome` and Playwright WebKit 27.2. Every requested homepage width is tested at both 1000px and 430px viewport heights. Phone portrait and 844×390 landscape touch interaction are included. These are browser-emulated CSS dimensions, not physical-device tests.

| CSS width | Chrome | WebKit |
| --- | --- | --- |
| 320 | Passed both heights | Passed both heights |
| 360 | Passed both heights | Passed both heights |
| 375 | Passed both heights | Passed both heights |
| 390 | Passed both heights | Passed both heights |
| 430 | Passed both heights | Passed both heights |
| 600 | Passed both heights | Passed both heights |
| 768 | Passed both heights | Passed both heights |
| 820 | Passed both heights | Passed both heights |
| 1024 | Passed both heights | Passed both heights |
| 1280 | Passed both heights | Passed both heights |
| 1440 | Passed both heights | Passed both heights |
| 1920 | Passed both heights | Passed both heights |
| 2560 | Passed both heights | Passed both heights |

The tests inspect document overflow **and** bounds/scroll widths of text, navigation, cards, and controls, so clipping a child with overflow rules is not treated as a fix. Hero SVG bounds are checked against text. All five navigation targets are checked for at least 44px height and width, then activated. Project pages are tested at 320, 768, 1440, and 2560px in both executable engines.

Screenshots cover narrow phones, tablets, laptops, desktop, and ultrawide. Mobile and desktop home screenshots and project-note screenshots at 320/768/1440px were visually inspected. Test-generated images/reports stay ignored; temporary inspection captures remain outside the repository.

## Accessibility and interaction

- Automated axe checks for WCAG 2 A/AA, 2.1 AA, and 2.2 AA run at every tall homepage width and at narrow/desktop sizes for every project page.
- Keyboard skip navigation reaches the main landmark; focus states remain visible.
- WebKit on macOS uses Option-Tab for link focus under its default keyboard preference; the suite uses that documented browser behavior. [Apple keyboard guidance](https://support.apple.com/en-gb/guide/safari/cpsh003/27.0/mac/27).
- Ambient pause/resume and system reduced-motion are tested. Motion state stays consistent after a client-side return from project notes.
- Without JavaScript, content and project navigation work; animation is disabled and the inactive motion button is hidden.
- All local links and section targets resolve; no fake, example, or empty destinations are accepted. Missing personal URLs are unavailable text states, not links.
- A real missing URL returns 404 with the custom recovery page.
- Console/page errors, failed requests, and failed asset responses are captured by the responsive tests.
- A 640×450 CSS viewport at 2× density tests the effective reflow of a 1280×900 browser at 200% zoom. Actual browser-toolbar zoom and platform text enlargement remain manual checks.

The detailed Lighthouse audit found an accessible-name mismatch in the AM wordmark even though the headline accessibility score was 100. The name was corrected to include the visible initials, and a dedicated axe label-in-name regression check now covers every content route.

## Iterations and host limitations

The first run exposed a CSS load failure caused by connection resets in the Python static preview server under simultaneous browser asset requests. The Node loopback preview replaces it and supports concurrent requests. Generated Playwright report JavaScript was initially included in lint traversal; report directories are now excluded from both Git and ESLint. These failures were investigated and corrected, not suppressed in application rules.

Firefox 157.0 was downloaded and attempted, but fails before opening a page with `Could not find profile folder`. A second attempt using `/private/tmp` also failed. Firefox remains configured for other hosts; its tests were not counted as passes here. The documented executable-suite command explicitly selects Chrome and WebKit. WebKit coverage is not a claim of testing installed Safari or real iOS hardware.

Full development dependency audit still contains 16 moderate minimatch/lint-chain findings. No production dependency vulnerability was reported. Peer-incompatible forced updates or framework downgrades were not applied.

## Lighthouse mobile measurements

Lighthouse 13.6.0 was run sequentially against the final static homepage and `/projects/energy/`, using installed Chrome, `--chrome-flags='--headless'`, the default simulated mobile profile, and JSON output. Both commands exited 0; the reports remained in `/tmp/` rather than the repository.

| Metric | Homepage | Energy project notes |
| --- | --- | --- |
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| First contentful paint | 1.2 s | 1.1 s |
| Largest contentful paint | 1.2 s | 1.1 s |
| Total blocking time | 10 ms | 0 ms |
| Cumulative layout shift | 0 | 0 |
| Speed index | 1.2 s | 1.1 s |
| Transferred bytes (local, uncompressed) | 572 KiB | 541 KiB |
| Explicit label-in-name audit | Passed | Passed |

These are local simulated lab measurements, not production field data or a guarantee on real hardware. Remaining diagnostics include framework legacy-JavaScript transforms, render-blocking CSS, and local preview-server compression/cache behavior. The preview intentionally uses `Cache-Control: no-store` and no compression; production behavior must be checked after an authorized release. No hosting changes were made to improve a local score.

## Git and production boundaries

Implementation commit: `584d6e9de75a6933bd566298e3125da52339c400` (`feat: complete portfolio project notes and responsive experience`). The following test/documentation commit records this report and the regression suite.

Work began clean on `development` at `a9ff36900d8e3efcefac65ffe3b41afb5654b45c`; `git pull --ff-only origin development` reported `Already up to date.` Local `main` remains `b571ccce0832dc6727dc6558fe93826f71f52c1d`.

A read-only remote check found a separate GitHub merge of the prior milestone: remote `main` at `3c1e928a80432e1fc54cfdeda5907b66546ec27a` (`Merge pull request #1 from ariston-michael/development`, 2026-10-31 14:29 Toronto time). This task did not create that merge, change local main, merge remote main into development, or push to main. Fetching it only refreshed the remote-tracking ref for inspection. Legacy `index.html` is unchanged across both histories.

No workflow, Pages setting, repository permission, deployment, publishing action, or paid service was changed or invoked. No public/live-site validation is claimed.

## Remaining publication checks

Resolve the content/asset items in `docs/CONTENT_TODOS.md`; perform Firefox, real-device, assistive-technology, actual browser zoom/text enlargement, and production caching/compression checks. Merging, Pages setup, and publication remain explicitly out of scope until authorized.

## Contact and interactive motion continuation — latest results

Started clean on `development` at `f5aadde48ca6c481dc6d75bb27a2e65d2609fdd5`; safe pull reported `Already up to date.` Local main remained `b571ccce0832dc6727dc6558fe93826f71f52c1d`, and read-only remote main inspection remained at the separately created `3c1e928a80432e1fc54cfdeda5907b66546ec27a`. No production source, workflow, Pages setting, or dependency manifest/lockfile was changed in this pass.

Owner-provided GitHub, LinkedIn and email are now functional links. Spindle Strategy is listed only as an internship explicitly identified by the owner. The exact `Ariston_Michael.pdf` was not available in the workspace when checked initially and before finalization. No different PDF was substituted. Download behavior, resume byte preservation, expanded internship details, and additional FireGuard XR claims therefore remain unexecuted/blocked on source availability. There is no `tel:` link or separately published phone number.

| Check | Actual latest result |
| --- | --- |
| `npm run lint` | Exit 0, zero errors/warnings |
| `npm run typecheck` | Exit 0, route types generated and strict TypeScript passed |
| `npm run build` | Exit 0, compiled successfully, 9/9 static entries generated |
| `PLAYWRIGHT_CHANNEL=chrome npm test -- --project=chromium --project=webkit` | **136 passed (1.7m)**, exit 0 |
| Tested engines | Installed Chrome and Playwright WebKit, 68 tests each |
| Additional dependencies | None |

All 13 previous widths (320, 360, 375, 390, 430, 600, 768, 820, 1024, 1280, 1440, 1920, 2560px) continue to pass the baseline tall/short layout and navigation checks in both engines. New tests exercise hero-relative scroll approach and reversal at all 13 widths at 900px viewport height. Tests verify bounded scale (1.025 phone / 1.04 tablet / 1.065 desktop), containment of decorative artwork, separation from copy and project content, and no horizontal overflow.

Desktop proximity brightness and damped layer movement are tested at 1024, 1280, 1440, 1920, and 2560px in both engines. Tests inspect actual opacity/halo and transform values, and confirm the field cannot capture pointer input. Shared control tests cover pause/resume, live reduced-motion changes in both directions, touch-only scrolling with no proximity/parallax, 36 visible phone stars, and a finite RAF settling interval with no continuing idle frame loop. Existing keyboard, no-JavaScript, contact/URL, static metadata, custom 404, and automated WCAG checks remain passing. The known approved mailto and LinkedIn destinations were added to the link test allowlist; no external email or message was sent.

Desktop scrolling-hero and contact screenshots and a full-page phone screenshot were captured outside the repository and visually inspected. No obstructing illustration, clipped essential text, or contact overflow was observed. Tests/reports/screenshots remain ignored by Git. Real-device low-power frame pacing, actual browser-toolbar zoom, screen-reader testing, and Firefox are not newly verified in this continuation; Firefox’s prior host launch limitation remains documented above.

### Latest Lighthouse mobile and desktop

Lighthouse 13.6.0 ran sequentially against the corrected static homepage with installed Chrome and `--chrome-flags='--headless'`, JSON output in `/tmp/`. Mobile used the default simulated profile; desktop used `--preset=desktop`. Both exited 0.

| Metric | Mobile | Desktop |
| --- | --- | --- |
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Largest contentful paint | 1.4 s | 0.3 s |
| Total blocking time | 0 ms | 0 ms |
| Cumulative layout shift | 0 | 0 |
| Speed index | 1.4 s | 0.3 s |
| Transferred size (local, uncompressed) | 593 KiB | 593 KiB |
| Explicit label-in-name audit | Passed | Passed |

These are simulated local lab measurements, not field guarantees or low-powered hardware benchmarks. The preview retains its intentional no-store/no-compression behavior. Existing production dependencies and the previously documented development lint advisories were not changed.

Implementation commit for this continuation: `67fe999a5073578c298cf38f2fd48b09e74fa95d` (`feat: add verified contacts and interactive cosmic motion`). The following test/documentation commit records the expanded regression suite and these measurements. No PDF is included because the exact source is unavailable.

## Cinematic solar-system continuation — latest results

Started clean on `development` at `f70d4cbbe12e5d23c14eedcade70c5e46e18335e`; `git pull --ff-only origin development` reported `Already up to date.` No source PDF was found at `public/resume/Ariston_Michael.pdf` or workspace-root `Ariston_Michael.pdf`, initially or at final recheck. No resume bytes, downloadable link, job dates/technologies/metrics, FireGuard XR expansion or skill corrections are claimed without reading that source. Verified contacts and the minimal owner-identified internship entry remain intact. No separate phone link was introduced.

| Executed command | Result |
| --- | --- |
| `npm ci` | Exit 0; locked installation completed, 369 packages added; existing 16 moderate development audit findings remain |
| `npm run lint` | Exit 0; zero errors/warnings |
| `npm run typecheck` | Exit 0; generated route types and strict TypeScript passed |
| `npm run build` | Exit 0; compiled successfully, 9/9 static generation entries completed |
| `PLAYWRIGHT_CHANNEL=chrome npm test -- --project=chromium --project=webkit` | **168 passed (1.8m)**, exit 0; no retries |

The 84 tests per engine cover every established width (320, 360, 375, 390, 430, 600, 768, 820, 1024, 1280, 1440, 1920, 2560px), tall/short layout heights, landscape touch and 200% zoom-equivalent reflow. Existing static routes, links, metadata, keyboard skip, pause state, idle RAF convergence, reduced motion, no-JavaScript content and automated WCAG tests remain passing. The PDF-absent state is tested; PDF download/view and preservation checks cannot execute until the exact asset is supplied.

New tests activate all nine worlds at all 13 widths in both engines, inspect selection state/content/link mapping and target bounds, and run axe on the explorer. Keyboard selection, touch navigation, permanent direct-link fallback and no-JavaScript map hiding are tested. Reduced motion removes the desktop pin and leaves solar selection functional. Cinema tests verify the full approach, reversal, star-camera depth, clipping only of decoration, and an unobstructed clickable project CTA at maximum zoom. Native skip links reach visible portfolio content. Tall desktop headers remain accessible; anchor clearance accounts for their sticky height.

Actual 1440×900 screenshot capture measured scale **1 at entry, 2.29964 midway, and 3.6 at maximum**. Entry/mid/maximum, solar explorer, projects, a full-page phone view, phone explorer, and tablet entry screenshots were captured outside the repository and inspected. The desktop rings visibly cross the viewport boundary while foreground copy and actions remain readable. Tablet/phone views use the documented unpinned alternatives. A fixed-element artifact in a cropped element screenshot was checked in an actual mobile viewport: the unfocused skip link remains offscreen (top -60px, bottom -12px), and still appears correctly on keyboard focus.

Initial validation caught stale micro-zoom assertions and ambiguous selectors after direct navigation links were added; the tests now assert the actual cinematic specification and scope links to their intended navigation region. A real tablet Saturn-ring overflow was corrected by widening the planet hit area. Desktop anchor clearance was increased for sticky navigation. These were followed by the complete passing 168-test run; application accessibility rules were not disabled.

### Lighthouse and baseline comparison

Lighthouse 13.6.0 ran sequentially on the static homepage with installed Chrome, `--chrome-flags='--headless'`, JSON reports outside the repository, default simulated mobile and `--preset=desktop`. Both exited 0.

| Metric | Current mobile | Previous mobile | Current desktop | Previous desktop |
| --- | --- | --- | --- | --- |
| Performance | 100 | 100 | 100 | 100 |
| Accessibility | 100 | 100 | 100 | 100 |
| Best practices | 100 | 100 | 100 | 100 |
| SEO | 100 | 100 | 100 | 100 |
| LCP | 1.5 s | 1.4 s | 0.3 s | 0.3 s |
| Total blocking time | 0 ms | 0 ms | 0 ms | 0 ms |
| Cumulative layout shift | 0 | 0 | 0 | 0 |
| Speed index | 1.5 s | 1.4 s | 0.3 s | 0.3 s |
| Local uncompressed transfer | 618 KiB | 593 KiB | 618 KiB | 593 KiB |

The expanded explorer/cinema adds approximately 25 KiB of local uncompressed transfer. The measured mobile LCP is 0.1s higher in this run; scores, desktop LCP, CLS and TBT remain unchanged. These are local simulated measurements with normal run-to-run variance, not field guarantees. The local preview’s existing no-store/no-compression diagnostics remain. No large dependency or remote graphics/font request was introduced.

Physical devices, assistive technology, actual toolbar zoom and low-power frame pacing remain unverified. Firefox was not required/rerun in this continuation; its prior host launch limitation remains documented above. No deployment, production workflow/Pages change, main modification, merge, permission change or paid service was performed.

Implementation commit for the cinematic pass: `b3a67737faaaf67d7fa85db78429c3e5ee9a1b5d` (`feat: build cinematic Saturn hero and solar portfolio explorer`). The following test/documentation commit records the final evidence. The exact resume source remains absent at finalization.

## Pre-release validation — 2026-11-01 (current evidence)

### Resume/content and public-link verification

The owner-designated Drive ID `12eRwVk3GQKjr0FVYOY-IFkmr66rd0er_` was verified through connected file metadata and complete readable content as `Ariston_Michael.pdf`, application/pdf, 169071 bytes, one page, modified 2026-10-31. Metadata reports anyone/reader. A fresh Chrome browser context with no saved Google authentication opened the exact candidate viewer URL with HTTP 200, title `Ariston_Michael.pdf - Google Drive`, the correct full name and complete resume page, and a Sign in option rather than a login requirement. The only recorded cookie name was NID. No sharing permission was changed. This is a real signed-out check, independent of the connector’s authenticated access.

The PDF’s actual link annotations supplied AirControl, Seneca Energy and FireGuard XR repository URLs. Each was confirmed public by GitHub repository metadata and fresh anonymous HTTP 200. No URL was guessed. Resume-supported role/dates/stack/results, project scope and skills are recorded in ABOUT_ME.md. No scientific accuracy claim, unprovided API-provider list or fabricated live demo was added. Reported metrics are attributed to the resume; no independent benchmark is claimed.

Resume CTAs open the actual Drive viewer with target=_blank, rel=noopener noreferrer and a descriptive label including the visible Resume/Google Drive text. Hero/contact links and project evidence links are available without JavaScript. Mobile/desktop popup behavior is regression-tested using a routed external target to isolate application behavior from Drive uptime; this mock is not the evidence for public document access. The live signed-out check above supplies that evidence. No PDF is hosted by the repository/export and no separate phone link is published.

### Repository, live site and Pages inspection

Initial development head: `4fbb2cee6aeea5ddb4aef5c807ce12d4f31c9e3a`; working tree was clean and safe pull reported Already up to date. No open PR existed initially. The live site returned HTTP 200 and displayed the legacy welcome page. Read-only API inspection confirmed legacy Pages from main/root, HTTPS enforced and no custom domain. The existing dynamic pages-build-deployment workflow was active. Main protection was absent; github-pages had a custom branch policy and no required-reviewer rule was reported. No platform setting, protection rule or permission was changed.

Feature/preparation commit: `61f47ad0bf150672effb63e81b4dbf382cac8f9e`. Normal reconciliation commit: `ce856f57d8e611ec90a539d28cc25fecd004f98e`, merging origin/main **into development**. Pre/post source-tree hashes were identical: `8b7125377dc1c2e1292fd323e95a228ae77ebccb`. Local main stayed `b571ccce0832dc6727dc6558fe93826f71f52c1d`; remote main stayed `3c1e928a80432e1fc54cfdeda5907b66546ec27a`. No public history was rewritten. The preserved root index.html remains unchanged.

Draft review PR: https://github.com/ariston-michael/ariston-michael.github.io/pull/2. The connector could not create a PR with its integration permissions; the owner-authorized draft was created successfully using the existing GitHub authentication. No merge occurred. The production workflow has not been dispatched.

### Local source/automation checks

- `npm ci`: succeeded from the existing lockfile; 369 packages installed, no dependency-version changes. Existing 16 moderate lint-chain findings were reported.
- `npm run lint`: exit 0, no errors/warnings.
- `npm run typecheck`: exit 0, generated route types and strict TypeScript passed.
- `npm run test:release`: **9 passed**, covering the accepted exact main dispatch and rejection of development, push/PR events, absent approval, missing/malformed/mismatched SHA and shell text.
- `npm run build`: exit 0; compiled successfully; **10/10** generation entries. Four project notes, homepage, recovery/metadata output remain statically exported.
- `npm run check:export`: exit 0; **5 canonical content routes / 52 files**, root assets present, no repository PDF, dependency/secret folders or symlinks in output.
- Official actionlint **1.7.12**: SHA-256 archive digest verified against its release metadata; YAML/expression lint exited 0. Binary remains in /tmp, not a project dependency. The official GitHub actions’ release tags/commit SHAs and Pages inputs were inspected before pinning.

The final local command `PLAYWRIGHT_CHANNEL=chrome npm test -- --project=chromium --project=webkit` completed with **180 passed (2.1m)** after cross-browser refinements; all earlier source/guard/export checks passed again. No retries or skipped assertions were used. The prepared release job itself remains unexecuted: current Pages mode is intentionally legacy, and its configuration guard would refuse it until a separately approved settings change.

The initial hosted source run [41343384828](https://github.com/ariston-michael/ariston-michael.github.io/actions/runs/41343384828) actually executed all three engines: **265 passed / 5 failed**. Firefox ran successfully on Ubuntu, revealing mobile Sun pre-transform-box overflow at 320px and a header-target measurement of 43.999996px at 360px. Shared-runner WebKit revealed frame-based damping that settled too slowly at 2560px. The candidate fixes the actual Sun sizing, gives header targets a 45px margin, and uses timestamp-based damping with idle/reset handling. Overflow/44px/reversal assertions remain strict; failures were not hidden or skipped.

The complete fixed candidate is rerun by the PR workflow. [PR #2’s live checks](https://github.com/ariston-michael/ariston-michael.github.io/pull/2/checks) are authoritative for the reviewed head; do not treat the earlier failed run or a pending candidate as production-ready. Push validation is superseded by PR validation through the concurrency group. The completion report records the final hosted result after it executes.

### Rendered audit and zoom limits

Screenshots of Saturn entry, middle and maximum, all planetary controls, projects, expanded experience, six skill groups, contact, FireGuard XR and mobile content were captured outside Git and visually reviewed. Existing cinema/solar/starfield behavior is preserved. The selected-world boundary was strengthened to an opaque light cyan state cue after visual contrast review. Resume/link labels were corrected after the explicit label-in-name audit found a mismatch; the final suite must include that rule rather than relying only on a Lighthouse headline score.

Chrome’s CDP visual-viewport page-scale test reached **2×** with visual width **640 CSS px**, layout width **1280 CSS px** and no document horizontal overflow. This is actual visual/pinch-style browser zoom, not a claim of browser-toolbar zoom/reflow. The separate 200% zoom-equivalent 640×450 layout test at 2× density remains in the suite. Actual toolbar zoom, physical mobile devices, assistive technology and low-powered hardware frame pacing remain unverified.

Firefox 157.0 was attempted again on this Mac and failed before page load with `Could not find profile folder`. It is not counted as a local pass. Ubuntu CI installs/attempts Chromium, Firefox and WebKit; its actual outcome is linked from the PR rather than inferred from local engines.

### Lighthouse mobile/desktop

Local static export was served on a separate owned loopback port **3201**, because an existing server occupied 3000; that existing server was preserved. Lighthouse 13.6.0 used installed Chrome, default simulated mobile and preset=desktop, sequentially with JSON output in /tmp. Final measured values are recorded below. Measurements are local lab data, not field guarantees. Browser diagnostics and screenshots are not committed.

### Release readiness boundary

The resume source/content blocker is resolved. Optional live demos/screenshots, Chicken Shooter public/cooperative details and deeper independent benchmark/scientific evidence remain honest TODOs. Required code/export/workflow checks and draft review are preparatory work. Deployment integration and public post-release checks cannot execute until the owner approves the Pages-source switch, reviewed PR merge and exact-SHA manual dispatch in RELEASE.md. No production deployment, main write, Pages mutation or paid service was performed.

### Final candidate measurements and publication gate

After the actual CI sizing/settling fixes, the complete local Chrome/WebKit matrix passed again: **180 passed (2.1m)**. Release guard tests remain **9/9**, static generation **10/10**, export verification **5 routes / 52 files**, and actionlint/lint/strict types all pass. No assertion thresholds, retries or browser exclusions were added to obtain that result. The final candidate is pushed for the complete three-engine PR rerun; the PR checks link above provides its live source-of-truth status, and the completion report must report the observed outcome rather than infer it.

| Final local Lighthouse metric | Mobile | Desktop |
| --- | --- | --- |
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Largest contentful paint | 1.5 s | 0.3 s |
| Total blocking time | 10 ms | 0 ms |
| Cumulative layout shift | 0 | 0 |
| Local uncompressed transfer | 633 KiB | 633 KiB |

Compared with the prior cinematic baseline: scores and LCP are unchanged; transfer is about 15 KiB higher for expanded verified content. Mobile blocking time measured 10ms rather than 0ms in this final run; this is lab data with normal variance, not a claim of production field equivalence. Both audits exited 0 on the final corrected export.

Readiness assessment: the resume/content blocker is resolved and required preparation is concrete/reviewable. Final green PR validation and explicit owner approval remain required before the documented Pages-source switch, main merge or manual deployment. Actual deployment/public post-release checks remain intentionally unexecuted. Optional demos/screenshots and manual physical-device/assistive-technology/toolbar-zoom checks are listed, not fabricated as passes.

### Hosted WebKit rendering-budget follow-up

The next Ubuntu run [41344930401](https://github.com/ariston-michael/ariston-michael.github.io/actions/runs/41344930401) produced **267 passed / 3 failed**. All Firefox checks passed. At 320/360/375px, three concurrent software-rendered WebKit cases received almost no animation frames during the five-second approach assertion: the trace recorded scale 1 for several seconds, then only the first damped frame (1.01064). This differs from the fully passing local WebKit matrix. CI now runs one browser case at a time to give the shared renderer an exclusive budget; local runs keep three workers. Test deadlines, scale/overflow assertions, all three engines, no retries and the complete viewport matrix remain unchanged. This configuration change requires a fresh complete hosted run; its result must be observed before release readiness is asserted.

## Approved production launch — 2026-11-07

The owner requested publication to the existing root URL. Rechecked PR #2 head `d03454d312754eb31d71f1938822828e7bbb56a4`, unchanged main and successful 270/270 PR validation. A fresh signed-out Chrome viewer returned HTTP 200, title `Ariston_Michael.pdf - Google Drive` and the actual Ariston Philip Michael resume. Pages was switched to Actions before a normal PR merge; release main SHA is `975d0ebb061c9ccbd9b1d858614f393bd31441d2`, with the same source tree as the reviewed head.

[Approved release run 42412024196](https://github.com/ariston-michael/ariston-michael.github.io/actions/runs/42412024196), attempt 1: source/guard/build/export checks passed; **269 passed / 1 failed** browser checks (12.7m). The first narrow-screen WebKit case reproduced the intermittent near-zero animation-frame startup issue (scale 1.01064 versus >1.08). Deployment was correctly skipped. Diagnostics were inspected, and the complete unchanged workflow was manually rerun for the same approved SHA; no test was skipped or assertion weakened. Final deployment/live results follow only after execution.

### Successful release and live verification — 2026-11-08

Release run 42412024196, **attempt 2**, completed successfully for exact main SHA `975d0ebb061c9ccbd9b1d858614f393bd31441d2`: the complete unchanged browser suite passed **270/270 (9.3m)**, all earlier source/guard/build/export stages passed, and official Pages artifact/deployment jobs succeeded. No tests were bypassed.

Post-deployment installed Chrome checks against the public HTTPS site exited 0:
- Homepage plus all four project-note routes returned HTTP 200, each with one H1 and the correct canonical URL. Referenced scripts/styles, robots, sitemap and social image returned HTTP 200.
- A missing public path returned HTTP 404 and the custom portfolio recovery link.
- No document horizontal overflow at 320, 375, 768, 1024, 1440 and 2560 CSS px (900px height). Live 375/1440 screenshots were visually reviewed outside Git.
- Live WCAG 2 A/AA, 2.1 AA and 2.2 AA axe scans at 375/1440 reported zero violations.
- Keyboard skip-to-content focus, cinematic skip, bounded scroll approach and reversal, pause/resume, all nine solar-world controls and live reduced-motion changes passed.
- Secure external Resume URL/target/rel attributes passed at all six checked widths. The actual external PDF was independently reverified signed-out before launch.
- No-JavaScript public content/direct navigation remained available. No page errors were observed.

Physical devices, assistive technology and browser-toolbar zoom remain the previously documented manual limits. Existing moderate development lint-chain advisories and optional content TODOs are unchanged. The portfolio is published and ready to share; future releases still require approval.

## Continuous ring passage and homepage restoration — 2026-11-11

Started with a clean development tree at `5af9f33d1a22eba5d1100d6bd19f649e9a7da1e6`; safe `git pull --ff-only origin development` reported Already up to date. This continuation changes development only: no merge, main write, Pages setting/workflow change, deployment or dependency/lockfile change. Personal facts and links are preserved.

### Reproduction, fixes and actual checks

The unchanged baseline in installed Chrome restored a hashless reload at y=3559 (middle) and y=6218 (bottom), with native restoration set to auto. WebKit returned to zero for the same baseline cases. The initial-document guard now distinguishes a fresh homepage's intended hero/decoded fragment from Back/Forward navigation. It remains manual until an actual interaction/popstate because releasing at pageshow alone failed, and the departing page must not race the incoming reload by resetting the shared entry mode. Fresh anchor entries also need this guard against late WebKit restoration. Actual user scrolling during deferred hydration is preserved.

The same six compatible cubic ring paths morph into straight trails, rotating/thinning as the planet fades. A shared sky/gradient and vertically dissolving copy scrim span hero/explorer. Fixed-coordinate SVG gradients keep straight, zero-height paths visible. Enhanced decoration waits for measured initialization; text/links and the uniquely identified no-JavaScript illustration remain available. No graphics library or React frame updates were added.

| Executed command | Actual final result |
| --- | --- |
| `npm ci` | Exit 0; locked installation, 369 packages added |
| `npm run lint` | Exit 0; zero warnings/errors |
| `npm run typecheck` | Exit 0; route generation and strict TypeScript passed |
| `npm run build` | Turbopack failed with local CSS-worker port binding EPERM, both sandboxed and escalated; not reported as a pass |
| `npm run build -- --webpack` | Exit 0; production static export, 10/10 generation entries |
| `npm run check:export` | Exit 0; 5 canonical routes / 66 webpack-output files, correct root assets, no PDFs/secrets/dependency folders/symlinks |
| `npm run test:release` | 9 passed; production guards unchanged |
| `PLAYWRIGHT_CHANNEL=chrome npm test -- --project=chromium --project=webkit` | **296 passed (4.6m)**, exit 0, zero retries |

Export verification now decodes encoded `_next` asset URL segments before filesystem lookup: webpack correctly emits `%5Bslug%5D` in URLs for literal `[slug]` directories. Actual project routes/assets also pass browser checks. The supported alternate compiler was necessary because of this environment's pre-existing Turbopack restriction; default build/CI configuration was preserved.

The final matrix contains 148 cases per engine. New morph/reversal and real top/middle/bottom reload/fragment checks cover all 13 widths (320, 360, 375, 390, 430, 600, 768, 820, 1024, 1280, 1440, 1920, 2560px) at 430px and 1000px heights. Assertions verify node continuity, straight geometry, bounded camera approach, seamless shared containment, no horizontal overflow and exact reverse geometry. Existing tall/short layout, automated WCAG/label-in-name, routes/SEO/assets, keyboard, touch/landscape, star proximity, pause/resume, idle RAF convergence, reduced motion, no-JavaScript and external CTA tests remain passing.

Native project-page Back/Forward preserves the actual departure position; fragment traversal waits for navigation to finish; the existing client-side project-return Link retains its explicit projects target and document time origin. Deferred-script tests verify hidden enhanced decoration before measurement, correct initialized phase on explicit fragment loads at 375/1440, and preservation of early wheel scrolling after hydration. Initial diagnostic failures led to actual restoration/gradient fixes, preserved ambient float/camera depth, and correct selection of the visible no-JavaScript illustration. No assertions were disabled, retries added or browsers excluded from the requested pair.

### Visual review and recording

Captured and inspected all eight requested 1440x900 states: entry (p=0), midway approach (.22), maximum approach (.44), initial straightening (.50), half morph (.62), full trails (.82), crossover (.93), and final explorer (past 1). Also inspected the full-page 375px composition. The background remains continuous, essential text/buttons remain readable, and clipping is confined to decoration.

A separate continuous wheel-driven down/up WebM recording reaches scroll 2000 / progress .99992 / morph 1, then returns to scroll 0 / progress .00015 / morph 0. Review images, recording, both baseline/final Lighthouse JSON reports and the complete final browser log are saved under ignored `test-results/cinematic-review/`; no generated artifacts are committed. The recording is captured for review, not a claim of physical-device frame-rate certification.

### Same-session Lighthouse comparison

Lighthouse **13.6.0**, installed Chrome, static preview on loopback 3201. Baseline and final both use webpack, default simulated mobile and preset desktop, headless Chrome, sequential runs with no competing browser suite. All four audits exited 0.

| Metric | Baseline mobile | Final mobile | Baseline desktop | Final desktop |
| --- | --- | --- | --- | --- |
| Performance | 99 | 99 | 100 | 100 |
| Accessibility | 100 | 100 | 100 | 100 |
| Best practices | 100 | 100 | 100 | 100 |
| SEO | 100 | 100 | 100 | 100 |
| LCP | 1.5s | 1.7s | 0.3s | 0.4s |
| Total blocking time | 40ms | 10ms | 0ms | 0ms |
| CLS | 0 | 0 | 0 | 0 |
| Local uncompressed transfer | 627KiB | 647KiB | 627KiB | 647KiB |

The added geometry/controller, CSS and static fallback cost about 20KiB. Scores remain unchanged; LCP measured +0.2s mobile/+0.1s desktop and mobile blocking time decreased by 30ms. These are simulated local lab measurements with normal variance, not field or low-powered-device guarantees. No dependency or remote imagery/font request was added.

### Limits and publication boundary

Actual Safari app/physical devices, assistive technology, browser-toolbar zoom, browser/OS session restart and low-powered-device frame pacing were not newly verified. WebKit and Chrome are the executed engines; Firefox was not required or rerun locally. JavaScript-disabled content retains native browser restoration. Default Turbopack remains blocked locally; the successful supported webpack static build is reported explicitly. Development CI may independently run the default compiler/all three engines after push; its result must not be inferred from these local checks.

All requested feasible implementation/local checks are complete. This pass is committed/pushed to development for review only; the live site remains the previous approved production release.

## Publication preflight — 2026-11-12

The owner authorized publication of the latest development version. Hosted [development run 43074211419](https://github.com/ariston-michael/ariston-michael.github.io/actions/runs/43074211419) completed source/default-Turbopack build/export checks successfully and actually executed all three engines: **442 passed / 2 failed (25.5m)**. The two WebKit findings involved renderer startup before a timed seek and capturing unfinished wheel input (25px remained); no production action was taken while this check was red.

Test setup now waits for measured scene readiness and two native animation frames, and sends early wheel input over a painted visible page, waiting for its requested 400px completion before testing preservation. Existing thresholds, all browsers, deadlines and zero retries are preserved. Targeted Chrome/WebKit verification passed **4/4** after the changes; the complete hosted checks must pass before merge/publication. No application/runtime/dependency/workflow change is included in this timing refinement.

`CI=true PLAYWRIGHT_CHANNEL=chrome npm test -- --project=webkit --grep 'continuous reversible ring passage at 320x430|early user scrolling' --repeat-each=3` completed **6 passed (17.9s)** with one worker. This explicit stability check does not enable retries in the test configuration. Lint and strict typecheck also passed.

Hosted [PR validation 43362918788](https://github.com/ariston-michael/ariston-michael.github.io/actions/runs/43362918788) then completed successfully for `67e376774ee0defc879eba0dbcbff61e63ce3a54`: **444 passed (26.6m)** across Chromium, Firefox and WebKit, with zero retries. Lint, strict types, 9 release-policy tests, default Turbopack production build and 5-route/58-file export verification all passed. PR #3 was normally merged at `ba0d3013c9695b680ea954e5ff0b9761dd8cd7ab`; its source tree exactly matches the validated head (`0c75995d3412dc2a6e1e97f4e9a8e2f4af7f5d01`). The guarded release was dispatched for that exact main SHA. No Pages/HTTPS/domain setting was changed.

## Published ring-passage release — 2026-11-13

[Approved release 43366281384](https://github.com/ariston-michael/ariston-michael.github.io/actions/runs/43366281384), attempt 1, completed successfully for exact main SHA `ba0d3013c9695b680ea954e5ff0b9761dd8cd7ab`: all source/approval/Pages-mode checks passed, default production export verified **5 routes / 58 files**, **444 browser tests passed (23.7m)**, and official artifact/deploy jobs succeeded. Pages/HTTPS/domain/permission settings were not changed. This is a real successful deployment, superseding the earlier development-only publication boundary.

A fresh signed-out Chrome context reverified the actual Drive resume before launch: HTTP 200, `Ariston_Michael.pdf - Google Drive`, correct Ariston Philip Michael contents. The public homepage now exposes the new shared scene and six morphed ring paths. Three independent fresh-page mid-document reload checks returned y=0 with manual initial-entry mode, confirming the deployed policy. Public verification details follow from the executed smoke checks.

The final uninstrumented public Chrome smoke check (`node /tmp/stellar-publish/verify-live.cjs`) exited **0** against https://ariston-michael.github.io/: homepage/all four project routes HTTP 200, correct canonicals and browser-loaded/legacy-polyfill assets; robots/social image; custom HTTP 404 recovery; no overflow at 320/375/768/1024/1440/2560px; six real ring paths reaching straight geometry and reversing; real hashless reloads from middle/bottom returning to the hero; explicit contact-anchor reload; native project Back and client-side return preserving the projects target; keyboard skip, nine solar controls, cinematic skip, pause/resume and reduced motion. Mobile touch navigation passed, the 375px live WCAG 2/2.1/2.2 A/AA axe scan reported zero violations, Resume attributes passed, and no-JavaScript content/static illustration/direct links remained available. No page errors were observed.

The first ad-hoc smoke script reloaded before its synthetic scroll had painted and returned the prior position; lifecycle-instrumented runs passed. The final ordinary-browser check waits for completed wheel input and two paint frames after positioning before invoking reload, matching a visible stable user position. A redundant CDN asset fetch also timed out transiently; final checks use actual browser responses plus a single request for unused legacy polyfills. These harness findings were not hidden as passes; the corrected full public run is the passing result above. Instantaneous programmatic scroll/reload without a painted intermediate state is not claimed as covered by that public check.

Public screenshots and the final smoke JSON are saved outside Git under ignored `test-results/published-release/`. Existing physical-device/assistive-technology/OS-session and toolbar-zoom limits remain unchanged. The site is published and ready to share.

## 2026-11-14 — Stage Separation feature validation

Worktree: `/private/tmp/stellar-rocket-experience`; branch: `feature/rocket-experience`; base: freshly fetched `origin/development` at `c9bf5c90caf24e50b3cb389e9dee293af88d9142`. No Claude-owned project/gallery/game component, project record or project-note route was edited. The root GitHub Pages URL, export configuration, workflows, legacy index and production branches remain unchanged.

Executed locally:

- `npm run lint`: passed, zero warnings; `npm run typecheck`: passed with strict TypeScript.
- `npm run build -- --webpack`: passed, all 10 generation entries completed. This is the supported webpack compiler, selected for the previously documented local Turbopack worker-port restriction; no new default-compiler result is claimed.
- `npm run check:export`: passed, 5 canonical routes / 66 files, root assets and no hosted PDF/secrets directories/symlinks.
- `npm run test:release`: 9/9 passed; release workflows were not changed or dispatched.
- `PLAYWRIGHT_CHANNEL=chrome npm test -- --project=chromium --project=webkit --workers=2`: **130/130 passed (1.8m)**, zero retries. Earlier full/intermediate runs and a separate 14-case final-branding/deferred-hydration pass also completed; the 130-case result is the expanded suite after readability refinements.

Coverage: 13 widths (320, 360, 375, 390, 430, 600, 768, 820, 1024, 1280, 1440, 1920, 2560px), 430/1000px heights, no horizontal text/annotation overflow, mobile drawing/content clearance, sequential separation/reversal, pointer catching and magnetic return, bounded keyboard offsets/Home/reset, touch module/navigation activation, live reduced motion and pause, no-JavaScript content/links, project pages, metadata/assets and the resume popup. Fresh hashless reloads return to the assembled entry; explicit fragments, deferred hydration and early wheel input preserve the intended position. Home/project scans report zero axe WCAG 2/2.1/2.2 A/AA violations in the covered cases; label/name checks also pass.

Visual review: captured 14 desktop stage/reversal and phone/tablet/ultrawide screenshots under ignored `test-results/rocket-review/`, plus responsive test screenshots. Reviewed the original sharing card and actual entry, mobile drawing and education/separated states. Replaced inherited blue accents; changed mobile from an absolute reserved slot to normal-flow ordering after measuring a ~30px overlap; brightened annotation numbers that initially measured 4.49:1; increased functional label sizes; moved small-screen star sketches clear of labels. Saturn-specific browser assertions were replaced with rocket behavior checks; hydration/initial-entry coverage was adapted and retained.

Limits: installed Firefox fails before page launch with `Could not find profile folder`, including an attempted canonical-temp-directory workaround. No Firefox pass, hosted CI result, Lighthouse score, physical-device test, screen-reader session or actual browser-toolbar zoom is claimed. The reflow test uses an explicit 640×450 CSS viewport at 2× raster density. Dependencies and lockfile are unchanged; local tools reused the installed dependencies through a temporary symlink, removed before handoff. Local browser/server execution required expanded sandbox access; no production service was modified.

The feature is review-only. Claude's verified named exports and insertion points are in `ROCKET_INTEGRATION.md`; those components were inspected read-only at Claude branch SHA `5a0c68ff16b3dd21a51bf078ab84decb18840295`, but have not been integrated or runtime-tested here. No merge or deployment.

After the final star-only placement correction, lint/types/webpack build/export checks passed again. A focused Chrome/WebKit pass covering touch modules and 320/375/768/1440/2560px home layouts completed **12/12 (19.0s)**, and all 14 review screenshots were refreshed. Final review confirmed star sketches clear the mobile module labels.

## Project showcase branch — 2026-11-14

Branch `feature/project-showcase` (worktree separate from the rocket-experience worktree). Local commands and results:

| Command | Result |
| --- | --- |
| `npm run lint` | exit 0, zero warnings |
| `npm run typecheck` | exit 0 |
| `npm run build` (default Turbopack) | succeeded; 11 static pages including the noindex `/showcase-preview/` |
| `npm run check:export` | 5 canonical routes, 71 files verified |
| `npm run test:release` | 9/9 passed |
| `PLAYWRIGHT_CHANNEL=chrome npx playwright test --project=chromium --project=webkit` | **324/324 passed**: 296 existing tests plus 28 new `tests/showcase.spec.ts` checks. Because another worktree's server held port 3100, the full run used a local, uncommitted port-3101 override, and the four port-pinned `resume.spec.ts` checks were rerun on 3100 once it was free (4/4). |

The showcase spec covers 7 widths (320–1920) with no overflow and ≥44px targets, zero axe violations in `main` with every disclosure open, H.264 excerpt playback and dimensions (1280×758, 30 s) in Chrome and WebKit, correct MIME types, `preload="none"`, thumbnail switching, labelled placeholders, keyboard toggling of "Yes" with no unverified launch link, external links limited to verified destinations with `noopener noreferrer`, and the preview route kept out of the sitemap.

Measured in Chrome (unthrottled, local): CLS 0. The initial load fetches only the 223 KiB poster JPEG; the MP4 is fetched only on play. Lighthouse was **not** run for this branch, because the package download was not permitted in this session. Firefox could not launch in this sandbox ("Could not find profile folder"), so hosted CI must cover it. Visual review used Chrome screenshots at 1440, 820 and 390px. Physical devices and assistive technology were not tested.

## 2026-11-14 — Integrated Stage Separation

Dedicated worktree `/private/tmp/stellar-stage-integration`, branch `feature/integrate-stage-separation`, from fetched development `c9bf5c90caf24e50b3cb389e9dee293af88d9142`. Both remote feature heads matched the requested SHAs: rocket `48e35c7ff3877a283a6a51ecafdf541a38f04a36`, showcase `5a0c68ff16b3dd21a51bf078ab84decb18840295`. Normal merge commits retain both histories; three append-only documentation conflicts were resolved by preserving both records. The source worktrees were not edited.

| Executed command | Result |
| --- | --- |
| `npm ci` | Passed, 369 packages installed in the isolated checkout; lockfile unchanged |
| `npm run lint` | Passed, zero warnings/errors |
| `npm run typecheck` | Passed, strict TypeScript and route types |
| `npm run build` | Default Turbopack production static export passed, 10/10 generation entries, with expanded local sandbox access |
| `npm run check:export` | Passed: 5 canonical routes / 64 files, root assets, no hosted PDF/secrets folders/symlinks |
| `npm run test:release` | 9/9 passed; production guard/workflow unchanged |
| `PLAYWRIGHT_CHANNEL=chrome npm test -- --project=chromium --project=webkit --workers=2` | **180/180 passed (2.1m)**, 90 cases per engine, zero retries and zero skips |

This is an actually executed combined suite, not the sum of the feature branches' reports. The old Saturn cases remain superseded by rocket tests; the showcase spec now exercises `/`, not a preview-only route. Shared route, metadata, restoration, resume, keyboard/touch and responsive checks remain. Layouts cover all 13 requested widths at 430/1000px heights; showcase/game checks use the same 13 widths. Automated axe and label/name scans pass on the covered homepage, open-disclosure and project-note cases.

Additional coverage verifies clear stage joints above the attached engine, an assembled phone rocket at first complete view, real drag/magnetic return/Home/reset, reversal, overflow and content clearance, reduced motion/pause, native game Yes by keyboard/touch/no-JavaScript, no unverified game video/launch link, live H.264 playback (1280×758, 30s) in both available engines, zero MP4 requests before play, correct MIME types, lazy thumbnails, static still links, explicit pending media review, real reloads/fragments and deferred hydration/early wheel input.

The first integrated run was 170 passed / 6 failed: stale selectors expected the old exact case-study label spacing. These were corrected to the actual accessible names without weakening the navigation checks. Visual review separately found a real lower-stage/engine overlap; cumulative joint expansion fixed it and the new ordering test passes. Phone separation now waits until the complete drawing is visible. Project/gallery container queries avoid squeezed desktop columns inside the rocket rail layout; duplicate achievement summaries and the preview route were removed. Project notes and 404 recovery match the new theme.

All five FireGuard asset SHA-256 prefixes match the supplied manifest; bytes are unchanged. The dashboard still was directly inspected. Map tiles and the dim forest photograph remain pending owner rights/attribution confirmation; a visible media note reports this. No third-party ownership, 94% prediction accuracy or playable Chicken Shooter claim is made. Event photos, game footage/URL and AirControl/Seneca screenshots remain honest placeholders.

The initial sandboxed Turbopack attempt made no progress and was stopped (exit 130); the expanded-access default build succeeded. Firefox still fails before page launch with `Could not find profile folder`, including with `TMPDIR=/private/tmp`; no Firefox result is claimed. Physical-device, screen-reader, actual browser-toolbar zoom and field performance were not tested. The reflow test is an effective CSS viewport at 2× raster density. Expanded access was also needed for local browsers, loopback servers and the temporary Lighthouse CLI download; no repository dependency was added.

The integration branch/PR is for review only. No main change, automatic merge, deployment, public website publication or Pages settings change. Read-only validation was extended to development-targeted PRs; its future hosted result must be reported separately from these local results.

### Integrated performance and visual evidence

Lighthouse **13.6.0** ran sequentially against the same default-Turbopack static export on loopback 3111, using installed headless Chrome with no competing browser suite. A temporary CLI was downloaded outside the repository after the sandboxed registry request failed; no dependency/lockfile was changed. Both audits exited 0 without a runtime error.

| Local simulated lab metric | Mobile | Desktop |
| --- | --- | --- |
| Performance | 99 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| LCP | 1.65 s | 0.40 s |
| Total blocking time | 2.5 ms | 0 ms |
| CLS | 0 | 0 |
| Total measured transfer | 899,081 bytes | 899,081 bytes |

The mobile audit uses default simulated mobile settings; desktop uses `--preset=desktop`. These are current local lab measurements, not field/device guarantees or a source-branch comparison. Native media tests independently verify that the MP4 is not requested until play. Reports: `/private/tmp/stellar-integration-evidence/lighthouse-mobile.json` and `lighthouse-desktop.json`.

Visual evidence is stored outside Git at `/private/tmp/stellar-integration-evidence/screens/`: entry, projects, authentic FireGuard media, separation, gallery and open game at **320, 375, 768, 1440, 2560px**, plus assembled-phone/tablet views. Review uses actual rendered screenshots rather than only DOM assertions. The static artifact, local browser reports and performance files are review evidence, not a deployed website.

Final visual refinement scoped the outer experience paragraph rules so gallery award typography is preserved, and pairs the achievement cards once their actual container reaches 640px. The complete 180-case suite passed again after that change (2.1m); final screenshot/audit files were refreshed afterward.

## 2026-11-14 — Production-authorised, rights-resolved candidate

Owner authorises production and owner-created FireGuard media, contingent on third-party imagery being licensed or removed. Inspected and retained only the original simulation-only crop (SHA-256 `210c5c88324b21672805c25a7bc8635a3c555abd0f8d1fb8b36a1af4271fe967`). Removed the wider demo and three screenshots from public/, added an export prohibition, and replaced the obsolete recording cases with crop provenance, forbidden-file 404 and no-forbidden-request checks. The publication serves no video; its absence is deliberate rights resolution, not a skipped codec check.

PR #4 hosted run 43669724358 failed **240 passed / 30 failed**: 28 Firefox cases identified only the email anchor with zero inline clientWidth; two WebKit recording cases failed. The CSS fix makes that anchor inline-flex with a 44px target, preserving all overflow assertions and every Firefox case. No retries or browser exclusions were added.

Executed final local checks on the release-safe source: zero-warning lint, strict types, default Turbopack production build (10/10 entries), export verification (**5 canonical routes / 60 files**, including forbidden-media absence), **9/9 release guards**, and the complete Chrome/WebKit suite **180/180 passed (1.9m)**, zero retries/skips. Automated accessibility, 13-width/short-screen layout, drag/reconnect/reset/reversal, native game Yes, no-JavaScript, project routes, refresh/fragments and deferred hydration remain covered. A new hosted run must pass all three engines before an integration merge; local Firefox is still unavailable as previously recorded.

Fresh signed-out Chrome reached the intended `Ariston_Michael.pdf - Google Drive`, HTTP 200, expected name visible, viewer present, no access-required message. No account session, sharing update or repository PDF was used. GitHub profile and three project URLs plus Devpost returned 200. LinkedIn returned its automation-blocking HTTP 999; no impersonation/workaround was attempted and the owner-verified link remains. Anonymous Pages API returned 404 (configuration not publicly readable); current public homepage is HTTPS 200 and still the previous cosmic/Saturn presentation, not the new rocket. The release workflow statically packages only out/ and verifies actual authenticated Pages mode when dispatched.

Anonymous resume evidence, forthcoming Lighthouse reports and five-width screenshots are local-only under `/private/tmp/stellar-release-evidence/`. Successful local preparation is not publication. Actual hosted result, merge/deployment SHA and public smoke status will be recorded only after they exist.

Release-safe Lighthouse 13.6.0 rerun, sequential/no competing suite: performance **99 mobile / 100 desktop**, accessibility/best practices/SEO **100/100**, CLS **0/0**, LCP **1.65s / 0.40s**, TBT **2.5ms / 0ms**. Measured transfer: **666,070 / 711,668 bytes** (native lazy image timing differs between viewports). Refreshed 33 five-width stage/media/gallery/game screenshots; inspected the genuine simulation-only figure at phone width and confirmed no map/photo background is present. Reports/screenshots are under `/private/tmp/stellar-release-evidence/`. These are local lab results, not a deployed-site verification.

Current repository rulesets API returns an empty list; the two visible PR checks are GitGuardian and Portfolio validation. The former was successful on the original head, while validation failed as described above. The guarded Pages workflow's out/ upload remains unchanged; fresh authenticated Pages-mode confirmation still belongs to the eventual permitted release run. Anonymous configuration GET returned 404, so no current authenticated Pages-settings assertion is made here.

Hosted release-safe run **43671795500** for `92b235485ef5801ece3ba52fd49cc1f4a99eccdb` completed **268 passed / 2 failed (7.1m)** across all three engines. The previous 28 inline-email failures and two recording failures are resolved. Remaining Firefox cases at 600×1000 and 600×430 measured a main-navigation width of 43.999969px against the unchanged 44px minimum. Increase actual header target minimums to 45px rather than adding tolerance, retries, browser skips or weaker assertions; require a fresh hosted pass before merge.

After the 45px header-target correction, lint/types/default production build/export passed again. Targeted tall/short home checks at both 320px and the failing 600px width passed **8/8 Chrome/WebKit (15.4s)** with the strict 44px threshold intact. A new full hosted run is required for the corrected head before merging; the previous 268/270 result is not represented as green.

## 2026-11-26 — Ariston OS feature validation

Current UI supersedes the historical cosmic/rocket interfaces and their interaction suites. This branch implements a retro workspace, project filters and standalone NFC card while retaining all four verified project notes and media exclusions.

Executed locally:

- `npm ci`: passed (369 packages installed); lockfile/dependency declarations unchanged.
- `npm run lint`: passed, zero warnings; `npm run typecheck`: passed.
- `npm run build`: attempted normally and with escalation; both failed because this host denies Turbopack's CSS-worker port binding (EPERM). This is not reported as a default-build pass.
- `npm run build -- --webpack`: passed; 11 static generation entries, six canonical content routes including `/card/`.
- `npm run check:export`: passed, six canonical routes / 69 files, card/vCard/root assets present and forbidden wider FireGuard media absent.
- `npm run test:release`: all nine unchanged release-policy checks passed.
- Final `PLAYWRIGHT_PORT=3217 PLAYWRIGHT_CHANNEL=chrome npm test -- --project=chromium --project=webkit`: **78 passed, zero failures/retries (17.5s)**.
- Full local three-engine run was attempted: Firefox cannot launch ("Could not find profile folder"), also reproduced using an explicit writable temporary directory. No Firefox application result is claimed locally. The first full run had 77 passes, 39 Firefox launch failures and one WebKit keyboard-test failure; use macOS Option-Tab for native link navigation as in the prior suite. The final two-engine run above includes the corrected input.

Coverage: homepage 320/360/375/390/430/600/768/820/1024/1280/1440/1920/2560px with 430/900/1100px heights; card 320/375/430/768/1440px; all four notes at 320/768/1440px. Strict element/document overflow and primary-target size assertions pass. Project filtering (including keyboard activation and result announcement), skip link, navigation, case-study return, mobile touch, no-JavaScript, reduced-motion, original media and missing-route recovery pass. vCard downloads with the expected filename and exact approved CRLF content. Contact hrefs match approved LinkedIn/GitHub/email/portfolio constants; resume popup tests intercept Drive to isolate navigation from external uptime. This does not reverify current third-party availability or native phone contact import.

Axe WCAG 2/2.1/2.2 A/AA scans report zero violations for homepage, card, FireGuard notes and 404 at 375/1440px in both runnable engines. Initial Chrome tests caught real 320/360px hero typography overflow; responsive sizing fixed it without hiding overflow or weakening assertions. Desktop and mobile screenshots were inspected and retained in ignored test-results. New SVG/PNG sharing art and icon use original code-drawn graphics. No reference attachments or portrait were available in this checkout.

Hosted Linux three-engine/default-build validation is recorded below. No deployment, main merge, Pages change, production scan or NFC tag write was performed. Physical iOS/Android scanning and native vCard import, screen readers, actual browser-toolbar zoom, final owner visual/portrait approval, external resume recheck and any future publication remain separate tasks. No Lighthouse score is claimed for this redesign.

The first Linux validation-only run [45899772607](https://github.com/ariston-michael/ariston-michael.github.io/actions/runs/45899772607) passed npm ci/lint/types/release guards/default Turbopack build/export and **103/117 browser checks**. Four inline project-title links and the FireGuard evidence link have zero clientWidth in Firefox, triggering the strict element overflow checks; card/contact/vCard and all accessibility scans passed. Give these links explicit inline-block boxes (project titles also receive 44px target height), retain all overflow assertions, and rerun the full matrix.

After the explicit link-box fix, lint, strict types, webpack build, six-route export and the full **78-case Chrome/WebKit suite passed again (17.9s)**. The approved FireGuard image was separately scrolled into view and confirmed decoded at its expected 1120px intrinsic width; full-page capture alone does not trigger offscreen lazy media. vCard CRLF is preserved in Git by `.gitattributes` and verified from the committed blob.

### Final Linux result — passed

[Validation-only run 45900926649](https://github.com/ariston-michael/ariston-michael.github.io/actions/runs/45900926649) completed successfully for exact implementation/test SHA `ab659819609c5e655bc11062a638dc2f97c75ddd`:

- npm ci, lint, strict typecheck, all nine release guards, **default `npm run build` (Turbopack)** and export checks passed.
- **117/117 Chromium/Firefox/WebKit checks passed (1.6m), zero retries/exclusions.** All strict document/element overflow checks, card layouts/contact targets/vCard, keyboard/touch, no-JavaScript/reduced-motion and WCAG scans pass.
- Default CI artifact: **six canonical routes / 58 files** (the local webpack artifact has 69 files). Successful static output is retained by the validation workflow for review only; there is no deployment job or Pages write permission.

SHA reconciliation explains the interim result: dispatch 45900360770 resolved the previous `2c7329beea1afdb974526f1c6a2d5b310f9fdd96` while the pushed branch ref was updating, so its repeated 103/117 result did **not** test the explicit link-box fix at `7324f54`. The final successful `ab659819…` run includes that CSS fix plus richer element diagnostics; the filter/assertion criteria did not change. The measured fix is therefore validated on all three engines, not accepted on a transient rerun of identical application code. Historical failure notes above retain what actually ran.

The final branch documentation commit records this verified implementation without changing app or test source. Main and the public website remain unchanged. Remaining TODOs: approved portrait/reference review, real-device NFC/vCard import, screen-reader/browser-toolbar zoom review and pre-release external-link recheck. No deployment was requested or performed.


## 2026-11-26 — Next.js 16.4.5 security upgrade (`feature/nextjs-security-upgrade`)

Run in worktree `/Users/aristonmichael/stellar-next-security` from `origin/development` `fe77fac` after a clean `npm ci`:

- Before: `npm audit` reported 8 moderate findings (7 Next.js advisories ≤16.4.4 and the minimatch chain via typescript-eslint). After: **found 0 vulnerabilities** (all and `--omit=dev`). `npm audit signatures` reported no signature errors.
- Installed versions: next 16.4.5, eslint-config-next 16.4.5, @next/* 16.4.5, typescript-eslint 8.74.0, minimatch 11.0.9 (adds its declared dependency @isaacs/nonrecursive-glob-match 1.1.0, same maintainer). React/react-dom 19.3.1 and @types/react(-dom) 19.3.0 are unchanged.
- `npm run lint` passed with zero warnings. `npm run typecheck` passed. `npm run test:release` passed 9/9.
- `npm run build` passed with Next.js 16.4.5 (Turbopack, 10/10 entries); the previous security-advisory stop no longer appears. `npm run check:export` passed (5 canonical routes, 60 files).
- Full Playwright regression in Chrome and WebKit: **180 passed (1.3m)**, with zero retries, skips or test changes, matching the pre-upgrade baseline count. Firefox still fails to launch on this host and is not counted; hosted CI must run all three engines before merge.
