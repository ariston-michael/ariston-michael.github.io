# Technical architecture

## Implemented stack
- Next.js 16.4.3 App Router, React 19.3.1, TypeScript 5.9 with `strict: true`.
- Tailwind CSS 4.3.3 through `@tailwindcss/postcss`; custom CSS owns the original cosmic artwork and responsive composition, utilities handle repeated flex/grid layout.
- npm lockfile; Node.js 22.13+ (verified with 24.14.0).
- ESLint flat config using Next.js Core Web Vitals and TypeScript rules; zero warnings allowed.
- No Motion dependency: CSS provides ambient twinkle, gentle floating, and progressive scroll reveals. No parallax or WebGL.

## Rendering and content
`app/page.tsx` composes semantic server components: SiteHeader, Starfield, PlanetIllustration, Hero, FeaturedProjects/ProjectCard, About, Experience, Skills, Contact, and Footer. `lib/content.ts` holds readonly typed project records, skill groups, verified-scope project notes, experience, achievements, and the owner-derived GitHub profile URL. Personal claims are sourced only from `docs/ABOUT_ME.md`; missing URLs use honest availability messages, while factual TODOs remain documented without fabricated destinations.

There are 72 deterministic stars generated using a seeded integer hash at build time; only 36 are visible on small screens. CSS animates opacity only; the original SVG planet floats with a transform. No particles hydrate or attach event listeners. MotionToggle is the only custom client component and changes a document data attribute to pause/resume animation. A `useSyncExternalStore` subscription keeps the button’s state accurate across client navigation. A no-JavaScript fallback disables movement and hides the inactive pause control. The system reduced-motion preference always takes precedence. Scroll reveals use progressive CSS view timelines with fully opaque content and a static fallback. There is no hidden content awaiting JavaScript.

System fonts avoid external requests and font-build network dependencies. The illustration has an SVG title/description; decorative stars and project glyphs are hidden from assistive technology. The layout includes a skip link, logical headings, semantic landmarks, visible focus, and usable anchor navigation without JavaScript. Missing resume/email/LinkedIn links are text rather than disabled fake controls.

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
