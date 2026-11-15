# Stage Separation — Ariston Michael

A statically exported software engineering portfolio built around an original six-stage rocket sketch. Normal scrolling separates modules beside verified introduction, projects, experience, education/skills, about/achievements and contact content. Mouse catching, magnetic reconnection, keyboard controls and Reassemble are optional enhancements.

ProjectShowcase, HackathonGallery and the final Ready to Play disclosure are integrated. AirControl/Seneca/event imagery remain labelled original schematics. FireGuard XR has authentic owner-recording stills and a 30-second demo excerpt. Chicken Shooter has neither verified footage nor a public launch URL, so Yes reveals an honest project placeholder, not an embedded game.

## Local preview

Node 22.13+ and npm (tested on Node 24.14.0):

```sh
cd /private/tmp/stellar-stage-integration
npm ci
npm run build
npm run check:export
npm run preview
```

Open http://127.0.0.1:3000; stop with Ctrl+C. `npm run dev` is available for editing. No secrets, backend or external fonts are required. Preview `out/`, not the legacy root index; do not use `next start`. A sandbox may require expanded access for the compiler/preview worker ports. The supported `npm run build -- --webpack` alternative remains available; current validation used the default Turbopack build successfully with expanded local access.

## Checks

```sh
npm run lint
npm run typecheck
npm run test:release
npm run build
npm run check:export
npx playwright install chromium firefox webkit
npm test
```

The reconciled suite tests the integrated homepage on all 13 requested widths, short/tall layouts, rocket stages/drag/reset/joints, notes/routes, focus/touch, reduced motion, no-JavaScript, restoration/deferred hydration, galleries, native game disclosure, genuine video playback, lazy media loading and automated accessibility. It does not add the old source-branch counts together. Tests serve the export on loopback 3100 with zero retries.

Installed Chrome/WebKit command on this Mac:

```sh
PLAYWRIGHT_CHANNEL=chrome npm test -- --project=chromium --project=webkit --workers=2
```

Firefox is configured but currently fails before launch with `Could not find profile folder`. Read-only CI includes development/main PRs and attempts all three engines on Ubuntu. See [actual validation evidence](docs/VALIDATION.md); no unavailable browser, device or performance check should be inferred from another result.

## Sources and media approval

Personal facts and verified destinations: [ABOUT_ME.md](docs/ABOUT_ME.md). Resume uses the existing [external Google Drive viewer](https://drive.google.com/file/d/12eRwVk3GQKjr0FVYOY-IFkmr66rd0er_/view), opening securely in a new tab. No substitute PDF or separate phone link is published.

**Before publishing:** confirm FireGuard recording reuse, map-tile provider/attribution and permission for the unidentified forest photograph. The viewer displays this review state; matching media checksums establish identity, not third-party ownership. No 94% accuracy claim is repeated from the recording. See [MEDIA_MANIFEST.md](docs/MEDIA_MANIFEST.md) and [CONTENT_TODOS.md](docs/CONTENT_TODOS.md). Hackathon event photos and genuine Chicken Shooter footage/URL remain missing.

## Structure and release boundary

- `app/page.tsx`, `app/rocket.css`: integrated server-rendered content and editorial layout.
- `components/RocketExperience.tsx`, `lib/rocket.ts`: bounded enhancement and shared vector geometry.
- `components/showcase/`: scoped server components and client media selector; container queries use the actual content column.
- `lib/content.ts`, `lib/home-entry.ts`: verified content and initial-document restoration policy.
- `scripts/preview.mjs`, `scripts/check-export.mjs`: static preview with media ranges/MIME types and artifact checks.
- `docs/ROCKET_INTEGRATION.md`, `docs/SHOWCASE_INTEGRATION.md`: assembly, anchors and source history.

`feature/integrate-stage-separation` preserves both source commits through normal merge commits and targets development by PR. The work is for review; it does not merge automatically, alter main, publish or change Pages settings. Root URL remains https://ariston-michael.github.io. The main-only manual release workflow and legacy root index are unchanged. [RELEASE.md](docs/RELEASE.md) retains the historical production record and future approval procedure.
