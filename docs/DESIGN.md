# Cosmic design system

## Direction
A premium, immersive space observatory aesthetic, inspired by the clarity of georgefarag.ca but with original design and code. More editorial and cinematic than gamified.

## Visual language
- Deep navy/near-black background, subtle star field, occasional soft cosmic gradients.
- Restrained cyan, indigo, and violet highlights; maintain readable contrast.
- Large, crisp headline typography with generous whitespace.
- Saturn-inspired illustrative hero focal point; no copyrighted third-party artwork without appropriate rights.
- Dark glass-inspired project panels with simple borders and clear hierarchy.

## Motion
- Subtle star twinkle, gentle depth/parallax and tasteful section reveals.
- Do not let animations obscure content, hijack scroll, or harm mobile performance.
- Follow `prefers-reduced-motion`; minimize or remove movement when requested.
- Avoid expensive high-density particles or mandatory WebGL.

## Interaction
- Clear project cards with keyboard-visible focus.
- Prominent View Projects, Resume, GitHub, and Contact actions.
- Accessible contrast, meaningful alt text, tap targets, and visible hover/focus states.

## Responsive behavior
Favor a single readable column on phones, progressively enhanced grids on tablets/desktops. Interactive graphics must never overlap navigation or main content.

## To verify
Final brand font, exact accent colors, hero copy, optional portrait and actual project imagery. GitHub, LinkedIn and email are owner-verified; the Drive resume viewer was verified signed-out on 2026-11-01. No PDF is hosted locally.

## Cinematic hero and camera — current implementation

The hero uses original SVG/CSS artwork and interaction principles only; no Apple source, imagery, or page design is copied. The Saturn material has layered cloud bands, atmospheric light, and its original ring geometry.

- At widths ≥1024px and heights ≥700px, a full-bleed stage pins below the 88px navigation for a bounded extra 80svh. It never controls wheel/touch scrolling or snaps the page. A visible Skip cinematic experience link jumps directly to projects.
- Hero-relative progress uses smoothstep easing and damped RAF updates. Desktop scale reaches 3.6 (3.3 on ultrawide displays), so the rings pass beyond the viewport. A stage clip contains decorative graphics; a dark scrim and separate foreground layer keep name, role, links and controls readable/clickable throughout.
- Tablets and short desktop viewports have no pinning and reach 1.95 scale. Phones use a stacked, unpinned scene capped at 1.55. This gives noticeable motion without forcing a long sequence on small screens.
- The three deterministic star layers stay viewport-fixed, with up to 12% camera-depth scale and 18px drift at maximum depth. Fine-pointer hover at ≥1024px retains ±8px/±6px parallax and subtle proximity lift within 140px. Phones show 36 of the original 72 points.
- Reduced motion and no-JavaScript mode remove pinning and use neutral static artwork. Pause returns movement to neutral without collapsing scroll geometry under the visitor; the skip link remains available. RAF work stops at convergence and while hidden.

## Solar-system exploration

A stylized Sun and eight planets form a portfolio navigation map, explicitly labeled as illustrative rather than a scale model. All surfaces, craters, clouds, lighting and rings are original CSS treatments. There are no running orbit animations.

| World | Portfolio destination |
| --- | --- |
| Sun | About |
| Mercury | Skills |
| Venus | Education |
| Earth | Experience |
| Mars | Achievements |
| Jupiter | AirControl |
| Saturn | Featured projects |
| Uranus | Contact |
| Neptune | Verified GitHub profile |

Native buttons support Tab/Enter/Space, mouse and touch. Selection updates a labeled, polite content region and an explicit destination link. A permanent direct-link menu covers all destinations without planetary interaction. On phones, the orbital composition becomes a three-column labeled grid. With JavaScript disabled, the inactive button map is hidden and direct links remain available. Selection works with reduced motion or pause enabled; it does not require animation.
