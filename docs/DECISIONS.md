# Architecture and design decision log

## 2026-10-31 — Reuse existing GitHub Pages user repository
**Decision:** Use `ariston-michael/ariston-michael.github.io` for the portfolio.
**Rationale:** Preserves existing user-site URL and Git history, supports free static hosting.
**Status:** Planned; do not deploy yet.

## 2026-10-31 — Separate development from production
**Decision:** Work on `development` or feature branches, leaving `main` intact until approved.
**Rationale:** Prevent accidental changes to the public website.
**Status:** `development` created from latest `origin/main`; project context documentation established. No merge or deployment performed.

## 2026-10-31 — Space theme, restrained motion
**Decision:** Original cosmic visual identity with star field, Saturn-inspired hero, dark palette, and limited glow.
**Rationale:** Memorable, aligned with engineering portfolio goals, without sacrificing recruiter usability.

## 2026-10-31 — Static Next.js architecture
**Decision:** Target Next.js App Router, TypeScript, Tailwind, Motion and static export.
**Rationale:** Supports desired interactions while remaining compatible with GitHub Pages.
**Status:** Implemented with static export in Milestone 1; CSS motion replaces the optional Motion library.

## 2026-10-31 — Small static client surface
**Decision:** Render content and 72 seeded stars at build time; use original SVG/CSS artwork and system typography. Keep only ambient motion controls interactive on the client.
**Rationale:** Deterministic output, no particle hydration, external asset licensing, runtime APIs, or font downloads. CSS handles restrained animation without an additional Motion dependency. Reduced-motion preferences disable all animation and smooth scrolling; a separate pause control accommodates visitors who want to stop ambient movement.

## 2026-10-31 — Honest incomplete content
**Decision:** Show verified project summaries and explicit, non-interactive TODOs for missing URLs/assets; derive only the GitHub profile from the repository owner.
**Rationale:** Recruiters can assess actual work without broken or fabricated links. Case studies and unverified feature details remain future work.

## 2026-10-31 — Preserve production while scaffolding
**Decision:** Keep the legacy root `index.html` intact and build the application separately into ignored `out/`. Add no deployment workflow.
**Rationale:** Implementation can be reviewed on `development` without changing the production Pages source/configuration. A future approved Pages release must publish the exported directory, including `_next/`, rather than the source root.

## 2026-10-31 — Peer-compatible lint toolchain
**Decision:** Use ESLint 9 with the current Next.js lint configuration; retain the locked compatible dependency graph and document 16 moderate development-only audit findings.
**Rationale:** React/import/accessibility plugins do not yet declare ESLint 10 support. Audit proposes incompatible framework/tool downgrades; avoid force upgrades or cross-major transitive overrides. Production dependencies report zero vulnerabilities. Revisit compatible upstream patches before launch.

## 2026-10-31 — Verified-scope project notes
**Decision:** Export three project detail routes using typed local records, with explicit boundaries around unverified technical detail. Keep FireGuard XR’s expanded view pending.
**Rationale:** Existing verified facts support useful scope summaries, not invented implementation narratives or metrics. Original SVG concept diagrams are labeled as illustrations rather than screenshots or architecture claims. A separate content TODO register preserves the missing evidence.

## 2026-10-31 — Visible responsive navigation
**Decision:** Keep five section links visible in a dedicated mobile row, with 44px minimum targets, rather than introducing a collapsing menu.
**Rationale:** The links fit at 320px and remain usable without JavaScript. Bounded grid tracks, fluid headings, wrapping, and safe-area gutters handle narrow, zoom-equivalent, and ultrawide layouts. Phones render fewer visible stars and skip scroll-reveal motion.

## 2026-10-31 — Repeatable exported-site QA
**Decision:** Add development-only Playwright/axe dependencies and a small Node static preview utility; preserve a server-free production artifact.
**Rationale:** Automated checks cover actual exported routes/assets rather than only a development server. The initial Python preview server reset concurrent requests, so a concurrent Node HTTP server replaces it. Browser report artifacts are ignored by both Git and ESLint. Firefox launch failures are documented as a host limitation, not excluded silently or counted as passes.

## 2026-10-31 — Static discovery and sharing
**Decision:** Export sitemap/robots metadata and a static original PNG social image with editable SVG source. Add per-project canonical and sharing metadata and a custom 404.
**Rationale:** Recruiters can share project pages and recover from missing URLs without a runtime image service, external fonts, or API. These are source/export features only; production Pages settings remain untouched.

## 2026-10-31 — Verified contacts, exact resume source
**Decision:** Use the owner-supplied LinkedIn, GitHub, and email directly. Keep the Resume link unavailable until `Ariston_Michael.pdf` is present; do not substitute a differently named or older PDF. Preserve original PDF bytes/full name and do not separately publish its phone number.
**Rationale:** Contact details are now explicitly verified. Resume-dependent internship and FireGuard XR detail cannot be inferred from a filename or project name. The minimal Spindle Strategy internship entry reflects only what the owner directly identified.

## 2026-10-31 — One bounded motion controller
**Decision:** Retain deterministic server-rendered stars and the original SVG. Add three depth layers and a null-rendering imperative client controller using one damped RAF scheduler, cached geometry, quantized glow updates, passive input listeners, and complete cleanup.
**Rationale:** Pointer events need no React state or per-star listeners. Settled/hidden pages stop frame work; touch and narrow viewports skip pointer effects. The existing pause event and live reduced-motion preferences disable all nonessential motion.

## 2026-10-31 — Hero-relative Saturn approach
**Decision:** Derive reversible progress from hero position/height, with a clipped transform wrapper capped at 6.5% desktop, 4% tablet, and 2.5% phone scale growth.
**Rationale:** The effect remains cinematic without changing layout, obscuring content, tying motion to unrelated document length, or intercepting scrolling. The caption stays outside the moving wrapper. Tests check zoom bounds, reversal, clipping boundaries, and reduced-motion/paused neutral states.
