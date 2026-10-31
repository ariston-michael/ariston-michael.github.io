# Roadmap

## Phase 0 — Repository foundation
- [x] Create `development` branch from latest `origin/main`.
- [x] Commit project context docs on `development`.
- [ ] Verify `main` and current Pages website unchanged.

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
- [ ] Build factual project cards and case-study pages.
- [ ] Add optimized, licensed or original project visuals.
- [ ] Verify experience and achievement claims.

## Phase 4 — Review and launch
- [ ] Check accessibility, mobile layouts, SEO, links, and performance.
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
