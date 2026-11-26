# Roadmap

## Phase 0 — Repository foundation
- [x] Create `development` branch from latest `origin/main`.
- [x] Commit project context docs on `development`.
- [x] Verify local `main` and legacy production source unchanged by this work; inspect remote history separately.
- [x] Revalidate the live Pages website during an approved release.

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
- [x] Switch production Pages source and dispatch only after explicit owner approval.
- [x] Review pull request into `main`.
- [x] Deploy only with owner approval; verify live website.

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
- [x] Confirm final candidate PR CI is green before approving release: 270/270 passed.
- [x] Obtain explicit final approval before switching Pages source, merging main or dispatching production (2026-11-07).
- Optional content extras remain in CONTENT_TODOS.md; current verified content contains no invented links or claims.

Final local pre-release results: **180 Chrome/WebKit checks**, **9 release guard tests**, strict lint/types, **10/10** static generation and **5-route** export validation passed. Lighthouse mobile/desktop remains **100/100/100/100**. Ubuntu CI executes Firefox successfully; initial CI findings were repaired in real layout/damping code and the fixed candidate is rerun on all three engines. Reviewed PR #2 passed 270/270 hosted tests. Publication was explicitly authorized on 2026-11-07; see RELEASE.md for the current release record.

## 2026-11-11 — Continuous ring passage and homepage entry

- [x] Share one sky between hero and explorer, morph existing ring paths into luminous trails and reverse from normalized scroll progress.
- [x] Preserve readable copy, skip/direct links, deterministic stars, bounded desktop pinning and simpler phone choreography.
- [x] Reproduce native reload restoration; implement a homepage-document-only policy preserving fragments and history.
- [x] Preserve pause/reduced-motion/no-JavaScript static alternatives without graphics dependencies.
- Validation evidence and performance comparison for this development-only pass are recorded in VALIDATION.md. Production deployment remains the previously approved release; this continuation does not merge, publish or change Pages settings.

- [x] Complete final local Chrome/WebKit suite: **296 passed** across 13 widths and short/tall viewports, including deferred hydration/early interaction.
- [x] Inspect eight transition states and capture continuous down/up recording.
- [x] Run lint, strict types, supported webpack production export, guard/export checks and same-session Lighthouse comparison: performance **99 mobile / 100 desktop**, all other categories 100, CLS 0.
- Default local Turbopack remains restricted by worker-port EPERM; actual command/results and manual-device limits are recorded in VALIDATION.md. No publication is authorized for this continuation.

## 2026-11-13 — Approved ring-passage publication

- [x] Obtain explicit publication approval (2026-11-12), resolve hosted test-timing findings without weakening assertions, and pass all 444 hosted tests.
- [x] Merge PR #3 normally and publish exact main SHA `ba0d3013c9695b680ea954e5ff0b9761dd8cd7ab` through guarded release run 43366281384.
- [x] Repeat all 444 browser checks in the successful production workflow (23.7m); preserve root URL, HTTPS and Pages configuration.
- Future releases still require approval. Release details/rollback guidance and actual public verification are recorded in RELEASE.md/VALIDATION.md.

- [x] Complete public Chrome smoke verification of real ring morph/reversal, painted-position reloads, anchors/history, all routes/assets, mobile touch/axe, motion controls and no-JavaScript content. Public URL: https://ariston-michael.github.io/.

## 2026-11-14 — Stage Separation feature

- [x] Create `feature/rocket-experience` in `/private/tmp/stellar-rocket-experience` from latest fetched `origin/development`; preserve the other working directory.
- [x] Replace homepage Saturn/solar presentation with a monochrome technical rocket and six portfolio stages.
- [x] Add reversible section-driven separation, levitation, bounded mouse catching, magnetic return, keyboard movement and Reassemble.
- [x] Preserve native navigation/scrolling, touch simplification, reduced-motion/pause and static content.
- [x] Reserve Claude-owned component insertion points and document verified exports in `ROCKET_INTEGRATION.md`.
- [x] Integrate Claude’s ProjectShowcase/HackathonGallery/GameExperience on the separate integration branch; development PR review remains pending.
- [x] Pass lint, strict types, webpack static build/export checks, 9 release-policy checks and 130 Chrome/WebKit cases; review actual screenshots and refine mobile clearance/contrast/readability.
- Local validation and Firefox/device limits are recorded in VALIDATION.md. This branch is for review only; no merge or deployment.

## 2026-11-14 — Project showcase feature branch

- [x] Self-contained ProjectShowcase, HackathonGallery and GameExperience components with desktop/tablet/phone layouts, scoped styles and a noindex preview route.
- [x] Authentic FireGuard XR stills and a web-optimised demo excerpt from the owner's recording, with an asset manifest.
- [ ] Owner review of FireGuard media rights (map tiles, background photo).
- [ ] Owner-supplied AirControl/Seneca screenshots, event photos, Chicken Shooter recording/public URL and Devpost submission links.
- [ ] Integrate into the homepage (rocket-experience owner), then run hosted three-engine CI.

## 2026-11-14 — Integrated Stage Separation

- [x] Verify both remote feature SHAs and merge histories into a dedicated `feature/integrate-stage-separation` worktree; preserve both sides of documentation conflicts.
- [x] Compose the six stages with ProjectShowcase, HackathonGallery and final native game disclosure; remove fallback duplicates and temporary preview route.
- [x] Match component proportions to the actual content column; unify palette, note pages and rocket 404 recovery.
- [x] Fix observed stage/engine collision with continuous joint expansion; retain drag, reconnection, reset, keyboard/touch and restoration.
- [x] Verify FireGuard file hashes and visibly flag pending rights review; preserve all honest media/game placeholders and the Drive resume.
- [x] Run locked install, lint, strict types, default production export, 9 release guards and the reconciled 180-case Chrome/WebKit suite; review five-width screenshots and run Lighthouse mobile/desktop. Actual results and limits are in VALIDATION.md.
- [ ] Owner approval of FireGuard recording/map attribution/forest-photo reuse before any website publication.
- [ ] Genuine event photos, AirControl/Seneca screenshots and Chicken Shooter footage/public URL.
- PR targets development for review; no automatic merge, main modification, deployment or Pages change.

## 2026-11-14 — Authorised Stage Separation production release

- [x] Receive explicit production authorisation; inspect latest PR #4 and hosted failure logs.
- [x] Resolve media scope by retaining only the owner-approved simulation crop; remove and prohibit unlicensed wider media in the static artifact.
- [x] Repair the Firefox email-link layout without excluding Firefox or loosening overflow checks.
- [ ] Pass final local and hosted validation for the new PR head.
- [ ] Merge integration to development, reconcile main normally, open/review production PR and dispatch the exact-SHA Pages workflow through authorised permissions.
- [ ] Verify the actual deployed HTTPS site and record release SHA/run and outstanding issues.

## 2026-11-26 — Ariston OS redesign and NFC contact card

- [x] Branch `feat/ariston-os` from freshly fetched development `fe77fac7a3dc313b4d2cb67efa439a7eaac1c42a`; preserve clean starting worktree.
- [x] Replace Stage Separation with an original retro workspace, shared cream windows, navy grid, muted accents and code-drawn pixel companion.
- [x] Include welcome, filterable projects, verified experience, complete skills, education/achievements, about and contact; retain four factual case studies.
- [x] Add mobile-first `/card/`, clear portrait placeholder, approved contact links and downloadable name/email/website vCard.
- [x] Update metadata, favicon, original sharing artwork, sitemap, export checks and current design/architecture/content docs.
- [x] Run npm ci, lint, strict types, supported webpack export, six-route artifact check and nine unchanged release guards. Default Turbopack remains blocked by host worker-port EPERM.
- [x] Record final local browser evidence: 78 Chrome/WebKit checks pass; Linux three-engine/default-build validation follows on the feature branch.
- [ ] Optional owner-approved portrait and comparison with reference attachments/AI Workplace source when available.
- [ ] Physical phone/NFC scan, native contact import, assistive technology and actual browser zoom review.
- No merge, production workflow, Pages setting change or deployment is authorized by this redesign. The existing public site remains unchanged.
