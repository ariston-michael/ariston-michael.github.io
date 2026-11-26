# Ariston OS architecture

## Stack and publication boundary

Next.js 16.4.5 App Router, React 19.3.1, strict TypeScript 5.9, Tailwind 4.3.3 and custom CSS. No runtime dependency added. System fonts and inline SVG require no remote requests. Keep `output: 'export'`, `trailingSlash: true`, unoptimized images, and `https://ariston-michael.github.io` at the user-site root. `out/` is the production artifact; `npm run preview` serves it locally.

The integration branch is `feature/ariston-os-integration`, isolated in `/private/tmp/ariston-os-integration` from fetched development `fe77fac`. Main, Pages settings, release workflows and legacy root `index.html` remain unchanged. No merge or deployment is authorized.

## Composition and state

- `app/page.tsx`: semantic server-rendered workspace, intro, experience, skills, about/education/achievements, contact.
- `components/OSWindow.tsx`: shared decorative window chrome; `PixelCompanion.tsx`: original code-drawn mascot.
- `components/ProjectExplorer.tsx`: the only application client boundary on the homepage. Local filter state selects records from `lib/content.ts`, exposing pressed buttons and a polite result status. All four projects render initially; no-JavaScript hides filter buttons and keeps links/content.
- `components/SiteHeader.tsx`, `Footer.tsx`: shared real navigation, no fake app controls.
- `app/card/page.tsx` and `components/card/`: Claude’s dedicated server-rendered contact window, own viewport/metadata, scoped CSS and original pixel avatar placeholder. It renders the only `main#main`, with a focusable skip target. Main navigation is composed only by the portfolio pages and never appears on the card. No card client component or remote fetch.
- `lib/card.ts`: card profile, links and folded/escaped vCard 3.0 builder; contact destinations import the existing approved `lib/content.ts` and `lib/site.ts` constants.
- `app/card/ariston-michael.vcf/route.ts`: `force-static` GET runs at build time, emitting `out/card/ariston-michael.vcf`. No runtime backend is needed. Name, email, school/student title, degree/specialization and three public URLs; no phone or photo. Normal `download` anchor, `.vcf` extension and preview MIME mapping support contact import. Route-handler response headers are not persisted as GitHub Pages configuration; physical-device/live MIME checks require a later approved release.
- The old root-level public vCard, its line-ending attribute and obsolete global card styles were removed only after the selected implementation passed the combined local suite. Export/browser guards require the obsolete endpoint to be absent.
- `app/tokens.css`: shared navy/grid/cream/sage/blue/beige/ink/font foundations; both global portfolio styles and scoped card styles map to these variables. `app/globals.css` owns portfolio/case-study/recovery layout; `components/card/card.module.css` owns the standalone card. Its own static grid needs no portfolio background or motion controller; perpetual sparkles/blink and boot effects are disabled.
- Four `app/projects/[slug]` routes remain statically generated with verified scope and evidence boundaries. Sitemap adds `/card/`; custom 404, icon and sharing artwork match Ariston OS.

Legacy rocket/cosmic/showcase modules remain unused historical source, not homepage imports. Their dedicated interaction suites are replaced by OS tests because those interfaces have been removed. The homepage no longer injects the cinematic scroll-restoration script; standard browser anchors/history now apply. Historical integration docs are explicitly marked superseded.

## Content and media

`lib/content.ts` and `docs/ABOUT_ME.md` retain the approved content/contacts. `MEDIA_MANIFEST.md` still governs original concepts and the owner-approved 1120×640 FireGuard simulation crop. Wider recording/map/photo assets remain forbidden in export. No portrait was found. No project URL, role, result or media is invented.

## Verification

Run `npm ci`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run check:export`, `npm run test:release`, and `npm test`. The default build uses Turbopack; this host’s CSS worker may fail with port EPERM even with escalation. Report that failure and run the supported `npm run build -- --webpack` for local static/browser validation; do not silently call it a default-build pass.

Playwright uses static preview on loopback 3100, Chromium/Firefox/WebKit projects and zero retries. Select installed Chrome with `PLAYWRIGHT_CHANNEL=chrome` locally. OS regressions cover thirteen widths, short layouts, navigation/filtering, all case studies, card/vCard, keyboard/touch, no-JavaScript, reduced motion, WCAG scans and media exclusion. The export checker requires six canonical content routes, the canonical card/vCard, CRLF records and no phone field or obsolete vCard. Release guards remain unchanged. See `VALIDATION.md` for actual executed results and limitations.
