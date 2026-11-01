# Technical architecture

## Implemented stack
- Next.js 16.4.3 App Router, React 19.3.1, TypeScript 5.9 with `strict: true`.
- Tailwind CSS 4.3.3 through `@tailwindcss/postcss`; custom CSS owns the original cosmic artwork and responsive composition, utilities handle repeated flex/grid layout.
- npm lockfile; Node.js 22.13+ (verified with 24.14.0).
- ESLint flat config using Next.js Core Web Vitals and TypeScript rules; zero warnings allowed.
- No Motion dependency: CSS supplies ambient twinkle/float/reveals; a small imperative controller supplies desktop pointer parallax and hero-relative scroll motion. No WebGL.

## Rendering and content
`app/page.tsx` composes semantic server components: SiteHeader, Starfield, PlanetIllustration, Hero, SolarSystem, FeaturedProjects/ProjectCard, About, Experience, Skills, Contact, and Footer. `lib/content.ts` holds readonly typed project records, skill groups, verified-scope project notes, experience, achievements, and the owner-derived GitHub profile URL. Personal claims are sourced only from `docs/ABOUT_ME.md`; missing URLs use honest availability messages, while factual TODOs remain documented without fabricated destinations.

There are 72 deterministic stars generated using a seeded integer hash at build time; only 36 are visible on small screens. CSS animates opacity only; the original SVG planet floats with a transform. No particle components hydrate or attach per-star event listeners. MotionToggle changes a document data attribute to pause/resume animation; CosmicMotion is the null-rendering client controller for visual effects; SolarSystem is a small client component whose selection state changes only on activation. A `useSyncExternalStore` subscription keeps the button’s state accurate across client navigation. A no-JavaScript fallback disables movement and hides the inactive pause control. The system reduced-motion preference always takes precedence. Scroll reveals use progressive CSS view timelines with fully opaque content and a static fallback. There is no hidden content awaiting JavaScript.

System fonts avoid external requests and font-build network dependencies. The illustration has an SVG title/description; decorative stars and project glyphs are hidden from assistive technology. The layout includes a skip link, logical headings, semantic landmarks, visible focus, and usable anchor navigation without JavaScript. Owner-verified GitHub, LinkedIn, and mailto links are functional. Resume uses the anonymously verified Google Drive viewer in a new tab, with no hosted PDF.

## Static export and future deployment
- `next.config.ts`: `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`.
- User-site root URL: `https://ariston-michael.github.io`; no repository basePath or assetPrefix.
- Production output is `out/`; no server runtime, SSR, server actions, request handlers, or environment variables are required.
- Metadata includes title, description, canonical URL, Open Graph, Twitter summary, theme color, original favicon, and a 1200×630 original PNG sharing card. Static `robots.txt` and `sitemap.xml` cover the homepage and all four project-note routes.
- The root `index.html` remains byte-for-byte unchanged as the legacy production source. It is not an input to the Next.js application.
- No workflow or production Pages setting is modified in this milestone.

Phase 4 requires owner approval before merging or publishing. A future Pages workflow should use the lockfile (`npm ci`), run lint/typecheck/build, upload **only `out/`** with the official Pages artifact tooling, then deploy with the required Pages environment and least-privilege permissions. Ensure `_next/` assets are served without Jekyll processing (the artifact workflow handles static output; branch-based hosting would need `.nojekyll`). Validate the canonical root URL, assets, routes, missing-link resolution, accessibility, and mobile performance before launch. Do not upload the source root or run `next start`.

## Commands
- `npm ci`: reproducible installation.
- `npm run dev`: local development.
- `npm run lint`: ESLint with zero warnings.
- `npm run typecheck`: generate route types, then strict `tsc --noEmit`.
- `npm run build`: production build and static export.
- `npm run preview`: Node.js static server for `out/` on loopback port 3000. No application backend is introduced.

Generated `.next/`, `out/`, browser reports/screenshots, dependencies, TypeScript cache, and all `.env*` files are ignored. ESLint also ignores generated browser reports. Runtime audit is clean; the development lint chain has moderate minimatch advisories. Retain peer-compatible ESLint 9 until its plugins support ESLint 10; review upstream fixes before launch.

## Project pages and illustration

`app/projects/[slug]/page.tsx` uses `generateStaticParams` and `dynamicParams: false` for AirControl, Seneca Energy, FireGuard XR and Chicken Shooter. Each page has unique metadata/canonical URL, verified scope, stack, project-status boundaries, and related links. No request-time server feature is used. FireGuard XR now has a resume-supported case study; its Three.js/React Three Fiber stack is described as project content, not imported into this static portfolio. `ProjectVisual` contains lightweight original inline SVG concept art, explicitly distinguished from screenshots and actual architecture. The social card’s editable SVG source and PNG export are tracked together.

## Responsive and test strategy

Intrinsic grid tracks use `minmax(0, …)`, headings use bounded fluid sizes, content wraps, and shell gutters honor safe-area insets. Small-screen navigation stays fully visible in its own row and needs no menu JavaScript. Every navigation target is at least 44×44px. Hero text/planet stack on phones, project/feature grids collapse, education details stack on very narrow screens, and ultrawide layouts retain a readable bounded width. Small-screen reveals are disabled and ambient complexity is reduced.

`playwright.config.ts` targets Chromium (optionally installed Chrome), Firefox, and WebKit. The suite tests exported HTML served on port 3100. `scripts/preview.mjs` uses Node’s HTTP/file APIs to handle concurrent asset requests, supports GET/HEAD with correct MIME types, restricts reads to `out/`, and serves the custom 404 with a 404 status for absent paths. It does not change hosting or create a production server. Tests have no retries; a failure must be investigated. See `docs/VALIDATION.md` for executed coverage and host limits.

## Contact and interactive motion continuation

Verified contact constants live in `lib/content.ts`; `ResumeLink` is reused in hero/contact and project evidence sections. The owner-designated Drive file was verified by connector metadata/text and a fresh signed-out browser on 2026-11-01. `resumeUrl` points directly to the standard file viewer; target/rel attributes open a secure new tab. No PDF is copied into the repository/artifact. Public name remains Ariston Michael. Resume-supported Spindle Strategy, FireGuard XR, skills and project counts are recorded in `ABOUT_ME.md`. Three repository URLs were extracted from actual PDF annotations and verified public before use.

`Starfield` still renders all seeded positions on the server. Points are grouped into three static layers; no particle component state or library is introduced. `CosmicMotion` mounts once per page, caches normalized point coordinates and the field/hero geometry, and owns one damped RAF scheduler shared by pointer and scroll effects. Pointer events only update numeric targets. Frame work uses cached geometry and quantized proximity changes; no bounding-box reads occur in the animation loop. ResizeObserver refreshes layout measurements outside that loop. The scheduler stops after convergence and cancels while the document is hidden. All observers/listeners/frames are cleaned up on unmount.

The controller gates fine-pointer/hover effects at 1024px. Stars now use viewport-fixed coordinates; cached normalized positions are transformed with the same camera scale/drift used visually, so proximity stays aligned while scrolling. No geometry reads occur in the animation loop.

The hero has a full-width `.hero-stage` and foreground copy with a separate visual scrim. Pinning applies only for `(min-width:1024px) and (min-height:700px)`. Its range is measured hero height minus stage height; progress begins at the hero’s document top minus the stage’s sticky offset. Other viewports use 85% of measured hero height and no pinning. Progress is clamped, damped and eased with smoothstep before applying 3.6/3.3 desktop, 1.95 tablet/short-screen, or 1.55 phone zoom. The stage clips decorative art at viewport bounds while foreground controls remain above it; the caption fades as the camera approaches. There is no event prevention, scroll snapping, global sticky scene or runtime graphics dependency.

`lib/motion.ts` shares the existing motion-change event between the controller and pause control. Live media-query changes, pause/resume, and navigation trigger consistent setup/cleanup. Reduced-motion and paused CSS also force neutral transforms and hide proximity halos immediately; no-JavaScript output defaults to neutral interactive transforms with existing animation fallback disabled.

## Solar explorer and progressive enhancement

`lib/solar.ts` defines nine typed portfolio destinations, reusing verified local content where possible. `SolarSystem` renders nine native buttons and a default server-rendered Sun panel. Activating a button updates one React selection value and the associated labeled live region. There are no pointer-driven React updates, orbit timers or continuous scene loops. The planets use independent original CSS surfaces, including Saturn/Uranus ring treatments; orbital tracks are a small decorative inline SVG.

A permanent nine-link navigation list remains available independently of the map. Education/achievement anchors are added to existing content. A noscript style hides inactive map buttons; all destination anchors and portfolio content still work without JavaScript. Reduced-motion users also receive an unpinned hero with static art. Shared pause/resume continues to control both hero and footer controls without breaking solar selection.

The existing static export, canonical URLs, root asset paths and production boundaries are unchanged. No dependencies, APIs, deployment workflow or Pages settings were added. The exact `public/resume/Ariston_Michael.pdf` remains absent; `resumeUrl` remains null. Resume-derived job details, FireGuard XR expansion and skill corrections are pending source verification, not inferred from the requested topics.

## Pre-release automation

Read-only development/PR CI runs locked installation, lint, strict type checking, release-policy tests, static export verification and all three browser engines, with diagnostics on failure. `check-export.mjs` verifies the five canonical content routes, root `_next/` assets and required static metadata/recovery files, rejecting PDFs, source/dependency/secret folders and symlinks in the artifact.

A separate manual-only release workflow is prepared for main, with explicit boolean approval, full-SHA equality, exact checkout, Pages-mode verification and no automatic triggers. Official GitHub actions are pinned to verified release commits. Pages enablement/generator mutation is disabled; settings are never changed by the workflow. Build has contents/read and pages/read; only deploy gets pages/write and OIDC, after every check succeeds. Serialized deployments, timeouts, failure summaries and retained browser diagnostics support review/rollback.

Current production source was read as legacy main/root, so the owner must authorize switching Pages to Actions before merging the reviewed release PR. A normal origin/main merge into development reconciles the historical divergence without rewriting history or touching main; the source-tree hash must remain unchanged for this particular merge. See `RELEASE.md` for the exact approval/launch/rollback procedure. No production configuration change or deployment is part of this preparation.
