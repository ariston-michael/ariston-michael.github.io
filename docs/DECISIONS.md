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
