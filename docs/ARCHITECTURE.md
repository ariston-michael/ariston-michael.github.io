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

System fonts avoid external requests and font-build network dependencies. The illustration has an SVG title/description; decorative stars and project glyphs are hidden from assistive technology. The layout includes a skip link, logical headings, semantic landmarks, visible focus, and usable anchor navigation without JavaScript. Owner-verified GitHub, LinkedIn, and mailto links are functional. Resume remains unavailable text until the exact PDF source is supplied.

## Static export and future deployment
- `next.config.ts`: `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`.
- User-site root URL: `https://ariston-michael.github.io`; no repository basePath or assetPrefix.
- Production output is `out/`; no server runtime, SSR, server actions, request handlers, or environment variables are required.
- Metadata includes title, description, canonical URL, Open Graph, Twitter summary, theme color, original favicon, and a 1200×630 original PNG sharing card. Static `robots.txt` and `sitemap.xml` cover the homepage and all three project-note routes.
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

`app/projects/[slug]/page.tsx` uses `generateStaticParams` and `dynamicParams: false` for AirControl, the energy platform, and Chicken Shooter. Each page has unique metadata/canonical URL, verified scope, stack, project-status boundaries, and related links. No request-time server feature is used. FireGuard XR remains a card because the source does not yet verify its capabilities. `ProjectVisual` contains lightweight original inline SVG concept art, explicitly distinguished from screenshots and actual architecture. The social card’s editable SVG source and PNG export are tracked together.

## Responsive and test strategy

Intrinsic grid tracks use `minmax(0, …)`, headings use bounded fluid sizes, content wraps, and shell gutters honor safe-area insets. Small-screen navigation stays fully visible in its own row and needs no menu JavaScript. Every navigation target is at least 44×44px. Hero text/planet stack on phones, project/feature grids collapse, education details stack on very narrow screens, and ultrawide layouts retain a readable bounded width. Small-screen reveals are disabled and ambient complexity is reduced.

`playwright.config.ts` targets Chromium (optionally installed Chrome), Firefox, and WebKit. The suite tests exported HTML served on port 3100. `scripts/preview.mjs` uses Node’s HTTP/file APIs to handle concurrent asset requests, supports GET/HEAD with correct MIME types, restricts reads to `out/`, and serves the custom 404 with a 404 status for absent paths. It does not change hosting or create a production server. Tests have no retries; a failure must be investigated. See `docs/VALIDATION.md` for executed coverage and host limits.

## Contact and interactive motion continuation

Verified contact constants live in `lib/content.ts`; `ResumeLink` is reused in hero/contact. `resumeUrl` stays null until the exact supplied PDF is copied unchanged into `public/resume/`. Public branding remains Ariston Michael; the original PDF’s full name/content must be retained. The Spindle Strategy internship entry uses only the existence explicitly identified by the owner; role details and expanded FireGuard XR facts remain blocked on the named source.

`Starfield` still renders all seeded positions on the server. Points are grouped into three static layers; no particle component state or library is introduced. `CosmicMotion` mounts once per page, caches normalized point coordinates and the field/hero geometry, and owns one damped RAF scheduler shared by pointer and scroll effects. Pointer events only update numeric targets. Frame work uses cached geometry and quantized proximity changes; no bounding-box reads occur in the animation loop. ResizeObserver refreshes layout measurements outside that loop. The scheduler stops after convergence and cancels while the document is hidden. All observers/listeners/frames are cleaned up on unmount.

The controller gates fine-pointer/hover effects at 1024px. Stars now use viewport-fixed coordinates; cached normalized positions are transformed with the same camera scale/drift used visually, so proximity stays aligned while scrolling. No geometry reads occur in the animation loop.

The hero has a full-width `.hero-stage` and foreground copy with a separate visual scrim. Pinning applies only for `(min-width:1024px) and (min-height:700px)`. Its range is measured hero height minus stage height; progress begins at the hero’s document top minus the stage’s sticky offset. Other viewports use 85% of measured hero height and no pinning. Progress is clamped, damped and eased with smoothstep before applying 3.6/3.3 desktop, 1.95 tablet/short-screen, or 1.55 phone zoom. The stage clips decorative art at viewport bounds while foreground controls remain above it; the caption fades as the camera approaches. There is no event prevention, scroll snapping, global sticky scene or runtime graphics dependency.

`lib/motion.ts` shares the existing motion-change event between the controller and pause control. Live media-query changes, pause/resume, and navigation trigger consistent setup/cleanup. Reduced-motion and paused CSS also force neutral transforms and hide proximity halos immediately; no-JavaScript output defaults to neutral interactive transforms with existing animation fallback disabled.

## Solar explorer and progressive enhancement

`lib/solar.ts` defines nine typed portfolio destinations, reusing verified local content where possible. `SolarSystem` renders nine native buttons and a default server-rendered Sun panel. Activating a button updates one React selection value and the associated labeled live region. There are no pointer-driven React updates, orbit timers or continuous scene loops. The planets use independent original CSS surfaces, including Saturn/Uranus ring treatments; orbital tracks are a small decorative inline SVG.

A permanent nine-link navigation list remains available independently of the map. Education/achievement anchors are added to existing content. A noscript style hides inactive map buttons; all destination anchors and portfolio content still work without JavaScript. Reduced-motion users also receive an unpinned hero with static art. Shared pause/resume continues to control both hero and footer controls without breaking solar selection.

The existing static export, canonical URLs, root asset paths and production boundaries are unchanged. No dependencies, APIs, deployment workflow or Pages settings were added. The exact `public/resume/Ariston_Michael.pdf` remains absent; `resumeUrl` remains null. Resume-derived job details, FireGuard XR expansion and skill corrections are pending source verification, not inferred from the requested topics.
