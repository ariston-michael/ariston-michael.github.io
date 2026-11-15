# Showcase integration guide (for the rocket-experience owner)

The `feature/project-showcase` branch adds three self-contained sections. It does **not** touch `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, the rocket/cinema scene or any existing component.

```ts
import {
  ProjectShowcase,   // id="project-showcase": AirControl, Seneca Energy, FireGuard XR
  HackathonGallery,  // id="hackathons": BearHacks 2026 Top 10, Seneca finalist, Devpost link
  GameExperience,    // id="play": "Ready to play?" → Yes → Chicken Shooter panel
} from "@/components/showcase";
```

## Placement

Each component renders its own `<section aria-labelledby>` with an `h2` and `h3`s, so it should sit directly inside `<main>`, after the hero/stage sequence:

```tsx
<main id="main" tabIndex={-1}>
  {/* …rocket / stage-separation scene… */}
  <ProjectShowcase />        {/* may replace <FeaturedProjects /> */}
  <HackathonGallery />
  {/* About, Experience, Skills, Contact … */}
  <GameExperience />         {/* intended as the final section before the footer */}
</main>
```

- `ProjectShowcase` can replace `FeaturedProjects`, or sit after it. If it replaces it, either keep an element with `id="projects"` (pass `id="projects"`) or update the `#projects` anchors in the header, solar map and project pages.
- Every component takes an optional `id` prop for anchors and nav links.
- `GameExperience` also accepts `recording` and `launchUrl` props. Leave both unset until the owner supplies a verified recording or a public game URL.

## Styling contract

- The components use CSS Modules only (`*.module.css`), with no global selectors and no Tailwind, so they will not conflict with `globals.css`.
- Each section is width-bounded (`min(1200px, 100% - 2·gutter)`), centered, and has a transparent background. The surrounding starfield/sky shows through.
- There is one accent colour. Set `--showcase-accent` on any ancestor to retune it (default `#a5dded`, the site's existing accent).
- Fonts use the existing system stacks. No web fonts are added.
- Reduced motion turns off the only animations: the link hover nudge and the game panel fade. Forced-colours mode is handled.

## Runtime

- `ProjectShowcase`, `HackathonGallery` and `GameExperience` are server components. The only client component is `MediaViewer`, the FireGuard thumbnail switcher, which has a single `useState`.
- The game reveal is a native `<details>/<summary>`. It works with the keyboard and without JavaScript, and screen readers announce it as expandable.
- The video uses `preload="none"` with a poster, native controls and no autoplay. No video bytes load until the user presses play.
- `next/image` runs with the existing `images.unoptimized` static-export setting. No new dependencies.

## Remove after integration

`app/showcase-preview/page.tsx` is a `noindex`, unlinked preview route that is not in the sitemap. `tests/showcase.spec.ts` exercises it. Once the sections are on the homepage, either point the spec at `/` or keep the preview route out of production.

## Shared-file change

`scripts/preview.mjs` gained MIME types (`.jpg`, `.webp`, `.avif`, `.mp4`, `.webm`) and single byte-range responses. Without them, the local test server served JPEG/MP4 as `application/octet-stream` with `nosniff`, and WebKit cannot play video without ranges. GitHub Pages already behaves this way, so production is unaffected.
