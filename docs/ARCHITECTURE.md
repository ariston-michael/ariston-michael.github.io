# Technical architecture

## Proposed stack
- Next.js App Router + TypeScript.
- Tailwind CSS for styling.
- Motion for selective animation, only where it adds value.
- Static site export for GitHub Pages (`output: 'export'`).

## Deployment
- Host at `https://ariston-michael.github.io` from repository `ariston-michael/ariston-michael.github.io`.
- Configure GitHub Actions to build and deploy exported static output once approved.
- No server-only APIs, SSR, dynamic server rendering, or server actions that require a Node server.
- Confirm Next.js image optimization compatibility with static export (use `unoptimized` or appropriate static approach).

## Content model
Keep project content in typed, local data objects, with verified claims and explicit URLs. Components should be reusable: navigation, hero, star background, project cards, experience, footer.

## Quality and safety
Accessible semantic HTML, reduced-motion, responsive breakpoints, meaningful metadata, optimized assets, strict TypeScript, basic automated checks. No secrets in client bundle or repository.

## Commands
Define actual install/lint/typecheck/build commands after initializing the app. Do not assume they have run.
