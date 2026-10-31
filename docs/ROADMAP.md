# Roadmap

## Phase 0 — Repository foundation
- [x] Create `development` branch from latest `origin/main`.
- [x] Commit project context docs on `development`.
- [x] Verify local `main` and legacy production source unchanged by this work; inspect remote history separately.
- [ ] Revalidate the live Pages website during an approved release.

## Phase 1 — App scaffold
- [x] Initialize Next.js + TypeScript + Tailwind with static export.
- [x] Add lint/type checks and verify local build.
- [x] Implement accessibility, metadata, and mobile-first global layout.

## Phase 2 — Cosmic visual identity
- [x] Design responsive hero and original Saturn-inspired SVG illustration.
- [x] Add accessible, performant seeded star field and restrained CSS motion.
- [x] Build navigation, content sections, and footer.

## Phase 3 — Real content
- [ ] Verify contact/social/resume links.
- [x] Build four factual project cards and three verified-scope project-note pages.
- [ ] Expand FireGuard XR and deeper case-study claims after owner verification.
- [x] Add lightweight original SVG concept illustrations for each project.
- [ ] Add actual project screenshots after verification.
- [ ] Verify experience and achievement claims.

## Phase 4 — Review and launch
- [x] Implement local responsive/accessibility/SEO/link tests and performance review.
- [ ] Complete real-device, assistive-technology, browser-zoom and final publication review.
- [ ] Configure Pages deployment with GitHub Actions.
- [ ] Review pull request into `main`.
- [ ] Deploy only with owner approval; verify live website.

## Milestone 1 — Implementation and verification (2026-10-31)

The authorized milestone covers Phase 1 and the initial visual/content implementation: four factual project cards, education, community roles, skill groups, contact placeholders, original artwork, and accessible navigation. Individual case studies, missing assets/URLs, further claim verification, and publication remain pending; no deployment configuration was added.

- `npm run lint`: passed, zero errors/warnings.
- `npm run typecheck`: route types generated and strict TypeScript passed.
- `npm run build`: compiled successfully; all four static generation entries completed, exporting `/`, the not-found page, and favicon.
- `npm audit --omit=dev`: zero vulnerabilities. Full audit: 16 moderate findings in development lint dependencies; incompatible automatic downgrades were not applied.
- Chrome static-preview checks at 375, 768, 1024, and 1440px (1000px viewport height): HTTP 200, no horizontal overflow or hero illustration/text overlap, four project cards, 72 stars, valid section anchors, and zero axe WCAG 2 A/AA + 2.1 AA violations at each width. Screenshots were captured and desktop/mobile layouts visually reviewed.
- Browser interactions passed: keyboard skip link reaches main, ambient pause/resume works, reduced-motion disables star/planet/reveal animation and smooth scrolling. Zero page errors or failed asset requests. Temporary Playwright/axe tooling and screenshots were kept outside the repository; these checks supplement, not replace, a full manual accessibility review.
- Lighthouse, Safari/Firefox, assistive-technology, and real-device performance testing remain Phase 4 work.
- Root legacy `index.html` and `main` remain unchanged; no merge or deployment performed. The live website was not revalidated in this milestone.

## Autonomous completion pass (2026-10-31)

Implemented the remaining feasible sections and static features: verified experience/achievement entries, three project-note routes, four original concept illustrations, sitemap/robots, per-page metadata, original sharing image, and custom 404. Missing assets and unverifiable claims are preserved in `docs/CONTENT_TODOS.md`. Safe-area gutters, bounded grids, mobile navigation, 44px targets, narrow-screen education layout, and reduced mobile motion were refined.

A repeatable Playwright/axe suite now covers all 13 requested widths, short/tall viewports, project pages, keyboard/touch, reduced motion, zoom-equivalent reflow, no-JavaScript content, local links and static metadata. Execution results, performance measurements, and the Firefox host limitation are recorded in `docs/VALIDATION.md`. No workflow, production configuration, merge, or deployment is part of this pass.

Final executable browser suite: **92 passed** across Chrome and WebKit. Lighthouse mobile homepage and energy project-note page each scored **100 performance / 100 accessibility / 100 best practices / 100 SEO**, with CLS 0. Firefox could not launch on this host; actual zoom, assistive-technology, real-device, and deployment checks remain pending. Full evidence and scope are in `docs/VALIDATION.md`.
