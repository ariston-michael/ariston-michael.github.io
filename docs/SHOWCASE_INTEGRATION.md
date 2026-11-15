# Showcase assembly — completed on the integration branch

The supplied exports are integrated through `@/components/showcase`:

```tsx
<RocketExperience>
  {/* introduction */}
  <div className="payload-content stage-content">
    <div className="showcase-slot"><ProjectShowcase id="projects" /></div>
  </div>
  {/* experience, education/skills, about */}
  <div className="showcase-slot gallery-slot"><HackathonGallery id="achievements" /></div>
  {/* contact */}
</RocketExperience>
<div className="game-slot shell"><GameExperience /></div>
```

This is a placement outline; actual semantic sections and headings live in `app/page.tsx`. The old FeaturedProjects and separate achievement list are not rendered. GameExperience stays last before Footer, uses native Yes/`details`, and receives no recording or launch override.

## Styling and runtime

The components remain server components except MediaViewer. CSS Modules use container queries for parent-column layouts and warm shared monochrome tokens. The homepage slot supplies the full available width without applying legacy project-card classes. Component figures, spec lists, targets and captions must remain readable beside the rocket and at 320px. The game has a full-width slot.

The media viewer has a native `preload="none"` H.264 video, no autoplay, a poster, lazy thumbnails, selection buttons and source captions. It visibly reports pending map/forest-photo review. No-JavaScript hides inactive thumbnail controls and offers direct still-image links; video and native disclosures remain usable. FireGuard source hashes are unchanged.

The temporary `/showcase-preview/` route is removed. `tests/showcase.spec.ts` now runs against `/` and covers all 13 widths, open disclosures/accessibility, tap targets, real playback, deferred video bytes, keyboard/touch, static still links and game-media separation. `scripts/preview.mjs` retains the supplied MIME and byte-range support.

## Outstanding content/release items

See MEDIA_MANIFEST and CONTENT_TODOS before publication: FireGuard recording reuse, unidentified map tiles and forest photograph need owner confirmation. No genuine event photos or Chicken Shooter recording/public URL are available. AirControl/Seneca keep original line-art placeholders. Devpost is an owner-supplied profile link whose submissions were not verified.

Both source commits are preserved through normal merges. The integration PR targets development; no automatic merge, main change, deployment or Pages setting change.
