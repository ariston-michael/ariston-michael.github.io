# Stage Separation integration contract

## Ownership and assembly

Rocket work is isolated on `feature/rocket-experience`, based on `origin/development` at `c9bf5c90caf24e50b3cb389e9dee293af88d9142`. Claude's `feature/project-showcase` is independent; this branch does not edit ProjectShowcase, HackathonGallery, GameExperience, FeaturedProjects, ProjectCard, ProjectVisual, project records, project-note routes or their assets.

The homepage remains a server component. `RocketExperience` is a client boundary accepting server-rendered `children`; the interaction controller never owns or hides content. The left content column is fluid (about 54% of the 1440px max shell on desktop); at 900px and below it fills the shell. The rocket occupies a reserved right column on desktop and an introductory drawing slot on smaller screens. No content should use viewport-sized fixed positioning.

## Verified exports and insertion points

Read-only inspection of Claude's local branch at `5a0c68ff16b3dd21a51bf078ab84decb18840295` confirms these named exports from `@/components/showcase` (`components/showcase/index.ts`). No cherry-pick, merge or edit of that checkout occurred.

| Export | Actual file | Integration call and insertion point |
| --- | --- | --- |
| `ProjectShowcase` | `components/showcase/ProjectShowcase.tsx` | `<ProjectShowcase id="projects" />` replaces `<FeaturedProjects />` in `.payload-content` |
| `HackathonGallery` | `components/showcase/HackathonGallery.tsx` | `<HackathonGallery id="achievements" />` can replace `.flight-achievements` in the lower-stage/about section |
| `GameExperience` | `components/showcase/GameExperience.tsx` | `<GameExperience />` in the optional full-width bonus slot after `RocketExperience`, before the end of `main`/Footer |

All three are server components with optional `id` props. Defaults are `project-showcase`, `hackathons`, and `play`; the explicit `projects` override preserves shared links. GameExperience additionally accepts optional `recording` and `launchUrl`; retain Claude's evidence-backed defaults and never invent destinations. MediaViewer is its own small client boundary. No import is added on the rocket branch before those files are incorporated through a separately reviewed integration.

The projects destination must have exactly one `id="projects"`. The current FeaturedProjects owns it. If ProjectShowcase does not own it, put that ID on `.payload-content` and give its heading an accessible section name. Keep `#introduction`, `#experience`, `#education`, `#skills`, `#about`, `#achievements`, and `#contact` unique. The rocket measures section positions live; changing content height needs no hardcoded timeline adjustment. Existing four `/projects/[slug]/` routes and verified repository/resume destinations remain available.

`app/rocket.css` scopes fallback project overrides under `.payload-content` and the existing `.project-card`/`.project-art` classes. Claude uses independent CSS Module class names; do not apply fallback styles to those components. Their `.surface` currently subtracts its own viewport-based gutter inside a bounded parent. Review that extra inset and internal two-column breakpoints inside the narrower rocket column; a scoped integration wrapper can set child section width to 100% without editing Claude-owned files. Retune the documented `--showcase-accent` on a wrapper to the rocket sage. GameExperience’s bonus slot is full-width, matching its intended closing placement. Root palette variables intentionally become monochrome; no graphics or motion package was added. Original rocket favicon and SVG/PNG sharing card replace the Saturn branding. The old Saturn components/styles remain unused, to avoid deleting shared code while integration is in progress.

## Interaction behavior

Ordinary document scroll drives six independently bounded transforms. Command begins assembled at scroll zero; the other stages begin separating as their corresponding sections approach the viewport. Scroll reversal restores the original geometry. Desktop modules can be caught and dragged within 40px horizontally/30px vertically; release near the attachment point snaps back. Enter/Space navigates; arrows move; Home/Escape reconnect; Reassemble restores all six until the next scroll. Touch uses tap-to-section and native vertical scrolling. Reduced motion and pause remove automatic separation; no-JavaScript renders a static rocket with all content and direct navigation intact.

The existing homepage fresh-document policy is preserved: hashless refresh returns to the introduction, explicit fragments restore their sections, and back/forward traversal remains native. Manual piece offsets are ephemeral and reset on refresh.

## Integration validation

After combining branches, rerun lint/types/static build/export checks and Playwright. Recheck 320–2560px, long project descriptions, rocket labels after full separation, keyboard/touch, reduced motion, no-JavaScript, project-route return and fragment reload. Current browser tests expect four fallback project articles. Claude’s ProjectShowcase renders three engineering projects, with Chicken Shooter in GameExperience; adjust that count and accessible link selectors deliberately while retaining all four verified project-note routes and shared anchors. Also reconcile Claude’s `docs/SHOWCASE_INTEGRATION.md`, preview route/tests and local media-server changes; none are copied onto this branch.

No merge, deployment, Pages configuration change or modification to the legacy root `index.html` is included.
