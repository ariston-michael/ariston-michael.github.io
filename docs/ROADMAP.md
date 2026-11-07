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
- [x] Add owner-verified GitHub, LinkedIn, and email links.
- [x] Verify the actual external Drive resume and expose secure-new-tab CTAs without a hosted PDF.
- [x] Build four factual project cards and four verified-scope project-note pages.
- [x] Expand FireGuard XR using verified resume scope; leave unsupported scientific/benchmark claims pending.
- [x] Add lightweight original SVG concept illustrations for each project.
- [ ] Add actual project screenshots after verification.
- [x] Ground experience/achievement claims in reviewed owner facts and the verified resume.

## Phase 4 — Review and launch
- [x] Implement local responsive/accessibility/SEO/link tests and performance review.
- [ ] Complete real-device, assistive-technology, browser-zoom and final publication review.
- [x] Prepare guarded Pages workflow and release/rollback instructions.
- [ ] Switch production Pages source and dispatch only after explicit owner approval.
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

## Contact and cinematic motion continuation (2026-10-31)

- [x] Record owner-verified contact details and public/resume name policy in `ABOUT_ME.md`.
- [x] Add accessible LinkedIn, GitHub, and mailto contact actions.
- [x] Record the owner-identified Spindle Strategy internship without inventing a role title, dates, or responsibilities.
- [ ] Review `Ariston_Michael.pdf`, copy its bytes unchanged into `public/resume/`, and enable the shared Resume link. Exact source is currently unavailable.
- [ ] Expand Spindle Strategy and FireGuard XR content using the actual resume’s verified facts and attribution.
- [x] Extend deterministic stars with three depth layers, damped desktop pointer parallax/proximity, and an idle-stopping RAF scheduler.
- [x] Add bounded, reversible hero-relative Saturn approach with smaller mobile/tablet limits.
- [x] Integrate live reduced-motion, existing pause/resume, touch, and no-JavaScript behavior.
- Browser and Lighthouse results for this continuation are recorded in `VALIDATION.md`; publishing remains out of scope.

Latest continuation validation: **136 passed** across Chrome/WebKit; lint, strict TypeScript and static build passed. Lighthouse homepage mobile and desktop each scored **100/100/100/100**, with CLS 0 and TBT 0 ms. The resume source is still missing; its download/content tasks remain unchecked above. Detailed evidence and limitations are in `VALIDATION.md`.

## Cinematic solar-system continuation (2026-10-31)

- [x] Upgrade the original Saturn surface and replace imperceptible micro-zoom with a visibly immersive bounded approach.
- [x] Preserve readable foreground copy, ordinary navigation, shared pause controls and a visible cinematic skip link.
- [x] Add original Sun/eight-planet explorer, explicit portfolio mappings, keyboard/touch interaction and permanent direct-link fallback.
- [x] Preserve deterministic three-layer stars; add viewport-fixed camera depth without an idle JS animation loop.
- [x] Provide unpinned phone/tablet/short-screen alternatives, reduced-motion/static mode and no-JavaScript fallbacks.
- [ ] Read the exact resume, verify detailed content, preserve its bytes and enable download/view links. Source still missing; no substitute used.
- Validation results and performance comparison for this pass are recorded in `VALIDATION.md` after execution.
- No production workflow, Pages setting, main-branch modification, merge or deployment is included.

Final cinematic validation: **168 passed** in Chrome/WebKit; npm ci, lint, strict TypeScript and static export passed. Measured desktop entry/mid/end scales are **1 / 2.29964 / 3.6**. Lighthouse mobile/desktop remain **100/100/100/100**, with CLS/TBT 0. Mobile LCP measured 1.5s versus prior 1.4s; transfer increased 25 KiB locally. Resume-dependent tasks remain blocked on the exact PDF. See `VALIDATION.md` for evidence and limitations.

## Pre-release preparation (2026-11-01) — current status supersedes historical source blockers

- [x] Verify the owner-designated Drive PDF by metadata, complete readable content and signed-out public viewer; no sharing change or repository PDF.
- [x] Add descriptive secure-new-tab Resume links in hero/contact and project evidence sections.
- [x] Expand Spindle Strategy role/dates/stack/source-reported outcomes and FireGuard XR’s source-supported implementation; align skills and improve project scope.
- [x] Extract three actual repository URLs from PDF annotations and verify anonymous public reachability.
- [x] Inspect the live legacy site, Pages configuration, PRs and branch divergence without production changes.
- [x] Prepare non-production validation CI, guarded manual release workflow, export checks, release-policy tests and exact launch/rollback instructions.
- [x] Record local validation and actual hosted-CI findings, reconcile main history into development with an unchanged-tree merge, and open draft release PR #2.
- [ ] Confirm final candidate PR CI is green before approving release; live checks remain authoritative.
- [ ] Obtain explicit final approval before switching Pages source, merging main or dispatching production.
- Optional content extras remain in CONTENT_TODOS.md; current verified content contains no invented links or claims.

Final local pre-release results: **180 Chrome/WebKit checks**, **9 release guard tests**, strict lint/types, **10/10** static generation and **5-route** export validation passed. Lighthouse mobile/desktop remains **100/100/100/100**. Ubuntu CI executes Firefox successfully; initial CI findings were repaired in real layout/damping code and the fixed candidate is rerun on all three engines. Review draft PR #2 and RELEASE.md; no production action is authorized yet.
