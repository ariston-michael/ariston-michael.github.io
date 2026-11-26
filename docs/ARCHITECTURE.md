# Stage Separation architecture

## Stack and static export

Next.js 16.4.5 App Router, React 19.3.1, TypeScript 5.9 strict, Tailwind 4.3.3 and custom CSS. npm lockfile; Node 22.13+ (locally 24.14.0). No added runtime dependency, server action, database, API route, secret or remote font.

`next.config.ts` preserves `output: 'export'`, `trailingSlash: true`, unoptimized images and the root URL `https://ariston-michael.github.io`. Output is `out/`; preview it with `npm run preview`, never `next start`. Four generated project-note routes, sitemap, robots, sharing card and custom 404 remain. The temporary showcase-preview route is removed.

## Composition

`app/page.tsx` is a server component. `RocketExperience` accepts server-rendered children: introduction, `ProjectShowcase id="projects"`, experience, education/skills, about with `HackathonGallery id="achievements"`, and contact. `GameExperience` is a full-width closing bonus outside the rocket grid. Old FeaturedProjects and the separate achievement summary are not rendered.

- `lib/content.ts`: typed, verified personal/project facts and contact/resume destinations.
- `lib/rocket.ts`: shared original six-module SVG geometry.
- `components/RocketExperience.tsx`: small client controller; one scroll-scheduled RAF measures section positions and writes bounded CSS transforms. Cumulative joint gaps keep modules ordered. No wheel/touch interception or per-frame React state updates. Mouse and keyboard offsets are ephemeral; Home/Escape reconnect one module, Reassemble resets all until subsequent scroll.
- `components/RocketSketch.tsx`: static recovery drawing using the same geometry.
- `app/rocket.css`: editorial composition, responsive diagram, shared integration slots and note/recovery theming.
- `components/showcase/`: server-rendered showcase, gallery and native game disclosure, with CSS Modules and actual-column container queries. MediaViewer is the only client boundary within these components.
- `components/showcase/data.ts`: source-recording media, hackathon records and honest empty Chicken Shooter recording/launch fields. `MEDIA_MANIFEST.md` owns provenance/rights status.

The desktop rocket lives in its reserved sticky column. At ≤900px the content wrapper uses `display: contents`, allowing the introduction, complete diagram and remaining sections to stay in normal flow without absolute phone spacers. Short desktop drawings scale geometry and expansion together. Existing global styles remain for shared project-note utilities; legacy solar/cinema modules are unused by the homepage.

## Progressive enhancement and media

Static HTML contains every section and link. No-JavaScript disables the rocket buttons and hides enhancement-only controls; native stage links, project/game disclosures and video remain. Static FireGuard still links replace inactive thumbnail selectors. Reduced motion and shared MotionToggle are honoured live. The original `lib/home-entry.ts` policy is retained: fresh hashless reload starts at the introduction; explicit fragments and back/forward traversal preserve their intended targets; deferred hydration must not discard early user scrolling.

The release includes one unchanged 1120×640 owner-approved FireGuard simulation crop with native lazy loading. Four wider screenshots/video are deleted from public/ and forbidden in out/ because third-party imagery rights are unresolved. The generic viewer retains its video/thumbnail capability for a future rights-reviewed asset, but this release serves no recording. No game video or public launch URL is supplied. Resume always opens the existing external Drive viewer securely; no PDF or separate phone contact is hosted.

## Verification and release boundary

`playwright.config.ts` retains Chromium/Firefox/WebKit projects, zero retries and static preview on loopback 3100. Tests exercise the integrated homepage (the preview-only route is gone), all requested widths, notes, rocket interactions, native links/disclosures, media playback/lazy loading, no-JavaScript, reduced motion, accessibility and restoration. The local server provides media MIME types and byte ranges. `check-export.mjs` validates canonical content routes, root assets and forbidden artifact types.

Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run check:export`, `npm run test:release`, then `npm test`. On this host Chrome can be selected with `PLAYWRIGHT_CHANNEL=chrome`; unavailable browsers must be reported. Current actual results and Lighthouse metrics are in `VALIDATION.md`.

Normal merge commits preserve both source feature histories. The integration branch targets development via PR. Read-only validation now includes development-targeted PRs, with no Pages write permission or deploy job. The manual main-only release workflow, production settings and legacy root `index.html` are unchanged. Publishing requires a separate approved release, including media-rights confirmation; no merge or deployment is part of this integration.
