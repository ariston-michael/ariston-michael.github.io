# Technical architecture

## Implemented stack
- Next.js 16.4.3 App Router, React 19.3.1, TypeScript 5.9 with `strict: true`.
- Tailwind CSS 4.3.3 through `@tailwindcss/postcss`; custom CSS owns the original cosmic artwork and responsive composition, utilities handle repeated flex/grid layout.
- npm lockfile; Node.js 22.13+ (verified with 24.14.0).
- ESLint flat config using Next.js Core Web Vitals and TypeScript rules; zero warnings allowed.
- No Motion dependency: CSS provides ambient twinkle, gentle floating, and progressive scroll reveals. No parallax or WebGL.

## Rendering and content
`app/page.tsx` composes semantic server components: SiteHeader, Starfield, PlanetIllustration, Hero, FeaturedProjects/ProjectCard, About, Skills, Contact, and Footer. `lib/content.ts` holds readonly typed project records, skill groups, and the owner-derived GitHub profile URL. Personal claims are sourced only from `docs/ABOUT_ME.md`; missing URLs and feature claims remain visible TODOs with no fabricated destinations.

There are 72 deterministic stars generated using a seeded integer hash at build time. CSS animates opacity only; the original SVG planet floats with a transform. No particles hydrate or attach event listeners. MotionToggle is the only custom client component and changes a document data attribute to pause/resume animation. The system reduced-motion preference always takes precedence. Scroll reveals use progressive CSS view timelines with fully opaque content and a static fallback. There is no hidden content awaiting JavaScript.

System fonts avoid external requests and font-build network dependencies. The illustration has an SVG title/description; decorative stars and project glyphs are hidden from assistive technology. The layout includes a skip link, logical headings, semantic landmarks, visible focus, and usable anchor navigation without JavaScript. Missing resume/email/LinkedIn links are text rather than disabled fake controls.

## Static export and future deployment
- `next.config.ts`: `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`.
- User-site root URL: `https://ariston-michael.github.io`; no repository basePath or assetPrefix.
- Production output is `out/`; no server runtime, SSR, server actions, request handlers, or environment variables are required.
- Metadata includes title, description, canonical URL, Open Graph, Twitter summary, theme color, and original favicon.
- The root `index.html` remains byte-for-byte unchanged as the legacy production source. It is not an input to the Next.js application.
- No workflow or production Pages setting is modified in this milestone.

Phase 4 requires owner approval before merging or publishing. A future Pages workflow should use the lockfile (`npm ci`), run lint/typecheck/build, upload **only `out/`** with the official Pages artifact tooling, then deploy with the required Pages environment and least-privilege permissions. Ensure `_next/` assets are served without Jekyll processing (the artifact workflow handles static output; branch-based hosting would need `.nojekyll`). Validate the canonical root URL, assets, routes, missing-link resolution, accessibility, and mobile performance before launch. Do not upload the source root or run `next start`.

## Commands
- `npm ci`: reproducible installation.
- `npm run dev`: local development.
- `npm run lint`: ESLint with zero warnings.
- `npm run typecheck`: generate route types, then strict `tsc --noEmit`.
- `npm run build`: production build and static export.
- `npm run preview`: Python 3 HTTP server for `out/` on loopback port 3000.

Generated `.next/`, `out/`, dependencies, TypeScript cache, and all `.env*` files are ignored. Runtime audit is clean; the development lint chain has moderate minimatch advisories. Retain peer-compatible ESLint 9 until its plugins support ESLint 10; review upstream fixes before launch.
