# Ariston OS design system

Ariston OS is an original retro digital workspace for Ariston Michael’s portfolio and NFC contact card. This direction supersedes the cosmic and Stage Separation designs. The owner’s described AI Workplace/reference language informs the palette and software-window composition; no reference attachments or AI Workplace source were available in this checkout. No external character is copied.

## Foundations

- Navy desktop `#20364e` with a quiet 32px blue grid; warm cream `#f7f2e6` app surfaces and dark ink `#263c50`.
- Muted sage `#c7d2b9`, blue `#c4d4df`, and beige `#e9d9b9` title bars; squared borders and small solid offset shadows.
- Heavy system monospace display headings evoke retro software; Arial body text keeps paragraphs readable. No font download or graphics dependency.
- `OSWindow`/`WindowBar` provide consistent app chrome. Window marks are decorative, never pretend close/minimize buttons.
- `PixelCompanion` is an original SVG pixel computer with a seedling, not a portrait or third-party character. There is no supplied portrait; `/card/` clearly labels its placeholder.

## Workspace

Persistent document navigation, welcome window, desk-buddy/about panel, pinned internship note, filterable project explorer, experience log, toolkit, about/education/achievements and contact compose a cohesive desktop. All content follows normal document flow. Project filters use actual buttons with pressed state and a result announcement; no-JavaScript shows every project and hides inactive filters. Case studies and 404 recovery use the same typography and paper surfaces.

## Contact edition

`/card/` is a narrow, mobile-first standalone window with name, truthful student role, portrait placeholder, LinkedIn, GitHub, portfolio and email. Save Contact downloads a static vCard containing only name, email and portfolio URL. Importing into an address book remains the phone’s native action. No phone number, fabricated portrait, tracking or remote media.

## Accessibility and responsiveness

44px minimum primary targets, 48–52px card buttons, visible focus, skip link, landmarks, logical headings, adequate contrast and wrap-safe layouts. Desktop columns collapse on tablets/phones; the project grid becomes one column on narrow phones. Browser tests cover 320–2560px and short screens. Motion is limited to hover press feedback and native smooth anchor scrolling; reduced motion removes both. Content and links work without JavaScript.

Media remains constrained by `MEDIA_MANIFEST.md`: only the approved FireGuard simulation crop is used; other artwork is explicitly labeled original concept art. Physical devices, screen readers and final owner visual approval remain review tasks.
