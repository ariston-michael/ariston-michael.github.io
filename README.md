# Stellar Portfolio

An original, space-themed software engineering portfolio for Ariston Michael, built with Next.js App Router, strict TypeScript, and Tailwind CSS. The site includes an original scroll-controlled Saturn hero, an optional Sun/eight-planet portfolio explorer, four featured projects, three verified-scope project-note pages, education, experience, achievements, skills, and honest states for unavailable links.

## Preview locally

Use Node.js 22.13+ (verified on Node 24.14.0) and npm:

```sh
cd /Users/aristonmichael/stellar-portfolio
npm ci
npm run build
npm run preview
```

Open **http://127.0.0.1:3000**. This serves the actual static export in `out/`, including project routes, sitemap, robots, sharing image, and custom 404 page. Stop with Ctrl+C. No Python, credentials, environment files, or application server are required. The Node server is a local preview utility, not a production dependency.

For editing, run `npm run dev` and open http://localhost:3000. Do not use `next start` for this static export.

## Validation

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium firefox webkit
npm test
```

Tests start and stop their own loopback static server on port 3100; build first. They cover 13 widths from 320 to 2560px at tall and short viewport heights, three project routes, mobile touch, keyboard navigation, reduced motion, motion controls, no-JavaScript content, all local links, static SEO resources, custom 404, zoom-equivalent reflow, and automated WCAG checks. Reports and screenshots are ignored by Git. View a report with `npx playwright show-report`.

To use an already installed Google Chrome and run the two browser engines executable on this task host:

```sh
PLAYWRIGHT_CHANNEL=chrome npm test -- --project=chromium --project=webkit
```

Firefox is configured and its browser downloaded, but this host reports “Could not find profile folder” before launching. Its tests remain unverified here; do not treat an engine launch failure as a passing check. See [docs/VALIDATION.md](docs/VALIDATION.md) for actual results and limits.

## Source guide

- `app/`: Home, statically generated project pages, 404, metadata, sitemap, robots, and responsive styles.
- `components/`: Semantic reusable sections, original SVG artwork, and ambient motion control.
- `lib/content.ts`: Typed projects, verified-scope notes, experience, achievements, and skills.
- `lib/site.ts`: Canonical user-site URL and sharing asset metadata.
- `public/social-card.svg` / `.png`: Original editable sharing artwork and its 1200×630 raster export.
- `tests/portfolio.spec.ts`: Repeatable browser and accessibility regression tests.
- `scripts/preview.mjs`: Concurrent, loopback-only static preview server.
- `index.html`: Unchanged legacy production page; Next.js builds from `app/`.
- `docs/`: Project guidance, architecture, decisions, roadmap, validation, and content TODOs. Read `AGENTS.md` before making changes.

The starfield is deterministic and built statically: 72 seeded stars in three layers on larger screens, 36 visible on phones. A small idle-stopping RAF controller adds desktop pointer parallax/proximity and a clearly visible, bounded hero-relative Saturn approach (up to 3.6× on tall desktops, with smaller unpinned alternatives); CSS supplies ambient twinkle/float. Reduced motion, the pause control, and no-JavaScript mode disable nonessential movement. The cinematic scene has a visible skip link, and the solar explorer always offers ordinary destination links. There are no external font requests, unlicensed imagery, heavy 3D dependencies, or fabricated project screenshots.

## Content and publication status

Personal facts come only from `docs/ABOUT_ME.md`. The owner has verified GitHub, LinkedIn, and email; functional contact links are available. The exact `Ariston_Michael.pdf` source, project URLs, and deeper implementation claims remain pending and documented in [docs/CONTENT_TODOS.md](docs/CONTENT_TODOS.md). FireGuard XR’s case study is withheld until its features are verified.

Target: https://ariston-michael.github.io. Static export uses root assets, trailing slashes, and unoptimized images. **No deployment workflow or production Pages setting was added or changed.** Work stays on `development`; this pass makes no changes to `main` or legacy `index.html`. A separate GitHub merge of the previous milestone was observed on remote `main`; see the validation report. A future approved release must publish the contents of `out/`, including `_next/`, rather than the repository root. See `docs/ARCHITECTURE.md`.

Runtime dependencies audit clean. The full audit has 16 moderate findings in the lint-tool dependency chain. ESLint 9 remains necessary for plugin peer compatibility; incompatible automatic downgrades/force upgrades were not applied.

Resume source: place the exact `Ariston_Michael.pdf` in the workspace for review. Once supplied, preserve its contents/full name, copy it to `public/resume/Ariston_Michael.pdf`, and enable `resumeUrl` in `lib/content.ts`. No download URL is exposed before the asset exists. Spindle Strategy role details and expanded FireGuard XR content await that source. No separate phone number is displayed.
