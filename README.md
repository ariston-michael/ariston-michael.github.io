# Stellar Portfolio

Ariston Michael’s original static software engineering portfolio: cinematic Saturn hero, optional Sun/eight-planet navigation, deterministic interactive stars, four featured projects and four project-note pages, verified experience, education, skills and contact links.

## Local preview

Node.js 22.13+ (verified on 24.14.0) and npm:

```sh
cd /Users/aristonmichael/stellar-portfolio
npm ci
npm run build
npm run check:export
npm run preview
```

Open **http://127.0.0.1:3000**. Stop with Ctrl+C. This previews the production `out/` export, not the legacy root `index.html`. For editing, use `npm run dev` and http://localhost:3000. No secrets, environment files, backend, external fonts or graphics service are required. Do not use `next start` for the export.

## Resume and content

Resume: [Ariston_Michael.pdf on Google Drive](https://drive.google.com/file/d/12eRwVk3GQKjr0FVYOY-IFkmr66rd0er_/view). The correct one-page file was verified in a fresh signed-out Chrome context on 2026-11-01; connected metadata also reports anyone/reader. Resume CTAs open this viewer in a new tab with noopener/noreferrer. **No PDF is stored or served by this repository.** Access/content can change on Drive; recheck before release.

`docs/ABOUT_ME.md` records verified resume/owner facts and provenance. Content includes Spindle Strategy’s Software Developer Intern role, FireGuard XR’s technical scope, resume-aligned skills and three verified public repository links. Public branding stays Ariston Michael. The external resume retains its original full name/content; no separate phone link is published. Remaining screenshots, live demos and Chicken Shooter details are listed in `docs/CONTENT_TODOS.md`.

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

Browser tests serve exported HTML on loopback port 3100 and cover 320–2560px widths, tall/short layouts, mouse/keyboard/touch, cinematic entry/maximum/reversal/skip, all nine solar destinations, reduced motion, pause/resume, idle frame settling, no-JavaScript links, project pages, SEO, external resume attributes/new-tab behavior and automated accessibility.

Installed-Chrome/WebKit host command:

```sh
PLAYWRIGHT_CHANNEL=chrome npm test -- --project=chromium --project=webkit
```

Firefox is configured but this Mac has reported `Could not find profile folder` before launch. CI attempts all three browsers on Ubuntu. See `docs/VALIDATION.md` for actual local/remote evidence and limits; do not treat unavailable checks as passes. Reports/screenshots/build output are ignored. Use `npx playwright show-report` to inspect diagnostics.

## Structure

- `app/`: Home, static project routes, metadata, sitemap, robots, 404 and styles.
- `components/`: Semantic portfolio sections, original SVG/CSS artwork, optional solar explorer and shared motion controls.
- `lib/content.ts`, `lib/solar.ts`, `lib/site.ts`: Verified typed content, navigation mapping and canonical metadata.
- `scripts/preview.mjs`, `check-export.mjs`: Loopback preview and deployable-artifact checks.
- `scripts/release-policy.mjs`, `scripts/tests/`: Exact-commit release guard and negative-case tests.
- `.github/workflows/validate.yml`: Read-only, non-production validation on development/PRs.
- `.github/workflows/release-pages.yml`: Prepared manual-only main release; approval and exact SHA required.
- `index.html`: Unchanged legacy welcome page, retained for the current production source/rollback.

Read `AGENTS.md` before editing. Architecture, design, decisions, roadmap, evidence and content TODOs live in `docs/`.

## Release boundary

Current production https://ariston-michael.github.io still uses legacy Pages from main/root. Preparation does not authorize merging, changing Pages settings or publishing. Development CI cannot deploy. The manual release workflow refuses development, automatic events, missing approval, SHA mismatch or legacy Pages mode.

**Review [docs/RELEASE.md](docs/RELEASE.md) for the exact approval, branch reconciliation, Pages source switch, launch and rollback procedure.** Do not merge before approval: the existing legacy source can build automatically on main changes. Runtime remains Next.js static export with root-domain assets and trailing slashes; no deployment was performed during preparation.

The existing full development audit has 16 moderate lint-chain findings; dependency versions were preserved rather than forcing incompatible tool/framework changes.
