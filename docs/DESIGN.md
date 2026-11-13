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

## Continuous ring passage — current implementation

One shared sky spans the hero and solar explorer. Saturn's original blue/violet material and ring orientation remain; the same six cubic half-ring paths flatten into long parallel contrails. The planet dissolves while the ring plane rotates from −26° toward −7°, expands into trails and settles into a softer perspective before fading over the explorer. A continuous atmospheric gradient and the existing fixed seeded stars replace the separate section backgrounds. The copy scrim dissolves vertically rather than ending in a rectangular edge.

- One measured 0–1 journey drives approach (0–0.44), overlapping ring morph (0.42–0.82), and exit/explorer crossover (0.78–1). These phases reverse naturally from actual scroll position; no wheel/touch interception or snapping.
- Tall desktop pinning remains bounded: the hero is 220svh minus the 88px header, with a 120svh pinned travel distance (40svh more than the previous approach). The final crossover continues beyond the pin as the explorer enters. Skip cinematic experience still links straight to projects.
- Peak zoom remains 3.6 desktop / 3.3 ultrawide, 1.95 tablet/short desktop and 1.55 phone. The camera then relaxes its scale as the ring curves straighten, retaining recognizable geometry instead of crossfading to unrelated lines.
- Phones keep a stacked, unpinned hero. A reserved illustration slot anchors the shared artwork, which passes behind the explorer with a shorter, restrained choreography. Foreground text, focus and links stay above pointer-transparent decoration.
- Original 72 stars, 36 visible on phones, retain layered depth, gentle CSS twinkle and gated desktop pointer proximity. No new animation/graphics dependency.
- Pause resets the illustration to a readable static state without collapsing document geometry. Reduced motion removes pinning and all scroll/pointer effects. No JavaScript uses the original in-flow static illustration and permanent direct navigation.

SVG ring gradients use fixed user-space coordinates so fully straight, zero-height path bounds remain visible. A flattened ring is a real continuation of the initial path, not an independently appearing horizontal stripe. Screenshots and a down/up recording are retained outside Git for visual review.

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
