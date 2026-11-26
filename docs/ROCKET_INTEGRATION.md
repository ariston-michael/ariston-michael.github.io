> Historical integration record. Superseded by Ariston OS on 2026-11-26; see DESIGN.md and ARCHITECTURE.md for the current rendered application.

# Integrated rocket contract

Integration branch/worktree: `feature/integrate-stage-separation`, `/private/tmp/stellar-stage-integration`. It starts from fetched development `c9bf5c90caf24e50b3cb389e9dee293af88d9142` and preserves both requested source histories with normal merge commits:

- Rocket: `48e35c7ff3877a283a6a51ecafdf541a38f04a36`.
- Showcase: `5a0c68ff16b3dd21a51bf078ab84decb18840295`.

Only the integration checkout is edited. Both append-only sides were retained when resolving conflicts in DECISIONS, ROADMAP and VALIDATION. Source worktrees and branches are unchanged.

## Final composition

| Supplied export from `@/components/showcase` | Homepage placement |
| --- | --- |
| `ProjectShowcase id="projects"` | Payload; replaces FeaturedProjects |
| `HackathonGallery id="achievements"` | Lower-stage/about; replaces the duplicate achievement summary |
| `GameExperience` | Full-width final bonus after contact/rocket, before Footer |

Keep `#introduction`, `#projects`, `#experience`, `#education`, `#skills`, `#about`, `#achievements`, `#contact` and `#play` unique. All four existing project-note URLs remain. The three engineering projects live in ProjectShowcase; Chicken Shooter is in the final disclosure. Tests intentionally reflect that composition.

`RocketExperience` accepts server-rendered content. Section positions are measured live, so content-height changes require no hardcoded timeline. `lib/rocket.ts` is shared with the static recovery drawing. Joint expansion is cumulative to prevent the observed lower-stage/engine collision. Pointer displacement is bounded, Home/Escape reconnect one module, and Reassemble resets until subsequent scrolling. Scroll reversal, reduced motion, pause, touch and no-JavaScript remain supported.

Showcase CSS Modules now use container queries inside the rocket content column. Integration slots remove duplicate container gutters/padding; the full-width game uses its wider composition. Shared warm monochrome tokens also theme note and recovery pages. No graphics/motion dependency was added.

FireGuard files are byte-identical to the supplied branch and visibly pending review. Confirm recording reuse, map attribution and forest-photo rights before publishing. Event photos, AirControl/Seneca screenshots and Chicken Shooter footage/public URL remain absent; honest schematics are used. No FireGuard clip is passed to the game.

The temporary showcase-preview route is removed; its tests exercise the real homepage. The preview server retains correct image/video MIME types and byte-range support. Actual combined test counts, screenshots, performance and browser limits are recorded in VALIDATION.md. The development-targeted PR runs read-only validation; no merge, main change, deployment or Pages settings change is authorised here.
