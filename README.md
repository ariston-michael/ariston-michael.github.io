# Stellar Portfolio

Ariston Michael’s original, space-themed software engineering portfolio. Milestone 1 implements the static application, cosmic visual identity, and factual one-page content on `development`.

## Local development

Use Node.js 22.13+ (Node 24 LTS recommended) and npm. The lockfile pins the dependency graph.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The app uses system fonts and original SVG/CSS artwork; it does not need remote fonts, credentials, environment files, or a backend.

## Checks and static preview

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

Lint treats warnings as failures. Type checking generates Next.js route types before strict `tsc --noEmit`, so it works before a build. The production build exports `out/`. Preview serves that exported directory at http://127.0.0.1:3000 using Python 3; stop with Ctrl+C. Build before previewing. Do not use `next start` for this static export.

## Structure

- `app/`: App Router page, layout, metadata, favicon, and responsive styles.
- `components/`: Header, starfield, planet illustration, hero, project cards, about, skills, contact, footer, and ambient motion control.
- `lib/content.ts`: Typed project data and the GitHub profile derived from the repository owner. Personal claims come from `docs/ABOUT_ME.md`.
- `index.html`: Preserved legacy page; Next.js builds from `app/`, not this file.
- `docs/`: Project brief, design, factual content, architecture, roadmap, and decisions. Read `AGENTS.md` before making changes.

The starfield is deterministic, rendered at build time, and animated with CSS. Only the pause control needs custom client interaction. Reduced-motion preferences disable movement and smooth scrolling. Unverified contact, resume, social, and project URLs remain explicit non-interactive TODOs.

## Hosting status

Target: https://ariston-michael.github.io. Static export uses root-relative assets, trailing slashes, and unoptimized images. No Pages workflow, publishing action, or production configuration has been added or changed. The current production page is preserved. A future approved deployment must publish the **contents of `out/`**, including `_next/`, rather than the repository root; see `docs/ARCHITECTURE.md`.

## Verification

On 2026-10-31, lint, strict type checking, and production static export passed on Node 24.14.0 / npm 11.9.0. See `docs/ROADMAP.md` for browser validation and remaining launch checks.

`npm audit --omit=dev` reports zero vulnerabilities. The full audit reports 16 moderate findings through lint-tool dependencies using older `minimatch`; upstream compatible fixes are pending. ESLint 9 is retained because the Next.js React, import, and accessibility plugins do not yet declare ESLint 10 compatibility. Do not apply npm’s suggested incompatible framework downgrades or force upgrades blindly.
