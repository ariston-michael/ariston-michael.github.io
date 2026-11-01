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
