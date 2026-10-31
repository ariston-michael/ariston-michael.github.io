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
Final brand font, exact accent colors, hero copy, portrait preference, project imagery, and the exact resume PDF. GitHub, LinkedIn and email are now owner-verified.

## Interactive cosmic motion — implemented 2026-10-31

- Keep the original 72 seeded star positions, distributed into three depth layers. Show 36 points on phones. Layer movement is limited to ±8px horizontally and ±6px vertically at maximum depth.
- Enable pointer parallax/proximity only for a fine mouse pointer with hover on viewports at least 1024px wide. Nearby stars receive a small opacity/halo lift within a 140px radius. Decorative layers have `pointer-events: none`.
- Dampen pointer motion and hero progress through requestAnimationFrame. Stop scheduling when inputs settle; ambient twinkle remains CSS-driven.
- Reuse the original Saturn SVG inside a clipped illustration window. Hero-relative scroll progress approaches a maximum scale of 1.065 on desktop, 1.04 on tablet, and 1.025 on phones; upward translation is capped at 12/7/4px respectively. Opacity changes by at most 4%.
- Keep the caption outside the transformed illustration. The window remains inside its layout column, so scaled artwork cannot cover text, controls, or project cards.
- No scroll interception, snapping, sticky scene, pointer capture, or hover-only content. Normal scrolling upward reverses the approach.
- Reduced motion, ambient pause, and no-JavaScript mode retain a neutral illustration and disable nonessential animation/interaction. Touch retains only the smaller scroll response and never depends on pointer hover.
