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
**Status:** Implementation pending.
