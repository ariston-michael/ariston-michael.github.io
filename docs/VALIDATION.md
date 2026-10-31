# Validation report — 2026-10-31

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

## Final executable browser result

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
