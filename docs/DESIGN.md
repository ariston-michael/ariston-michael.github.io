# Stage Separation design

The integrated site replaces the Saturn/solar-system presentation with a restrained technical rocket sketch. Personal facts and project scope come from `ABOUT_ME.md`; media provenance and approval status come from `MEDIA_MANIFEST.md`.

- Near-black `#0d0f10`, off-white `#eeede7`, muted grey-green text and one sage accent (`#c5ceb6`). Authentic FireGuard media keeps its original colours.
- System typography, large identity text, fine rules, numbered stage markers and original vector diagrams. No external fonts, WebGL or decorative graphics dependency.
- One continuous background. Content remains opaque and in normal document flow; no animation reveals are required to read it. No scroll capture or snapping.

## Six-stage composition

| Module | Content |
| --- | --- |
| Command | Introduction and internship direction |
| Payload | AirControl, Seneca Energy and FireGuard XR showcase |
| Upper stage | Professional and community experience |
| Middle stage | Education and technical skills |
| Lower stage | About and hackathon gallery |
| Engine | Contact and final professional call to action |

The final Ready to Play disclosure is an optional full-width bonus, followed by the footer. It does not advertise a playable game or show unrelated footage.

Desktop reserves a drawing column beside the content. The initially assembled rocket separates from real section positions; cumulative joint expansion prevents a detached stage crossing an attached neighbour. Pointer catching, magnetic return, keyboard arrows/Home/Escape and Reassemble all use bounded offsets. Reversing scroll reverses the same geometry. Levitation is subtle and confined to the drawing.

At 900px and below, the complete drawing appears in normal flow after the introduction. Short desktop viewports use a compact drawing. The full phone experience scrolls naturally rather than shrinking text to fit everything above the fold. Its command stage waits until the complete drawing enters view before separating. Native stage links remain available independently of the enhanced controls.

## Components and media

The showcase and gallery use CSS container queries against their actual parent column. They stay stacked beside the rocket and can use wider compositions when space permits. Borders, tags, typography and link states share the rocket palette. Project-note pages and 404 recovery use the same visual language.

AirControl and Seneca use explicitly labelled original line art. Hackathon event photos are not available; their cards use labelled schematic placeholders. FireGuard XR uses authentic owner-recording stills and an H.264 excerpt, with visible pending-review text for map attribution and the unidentified forest photograph. No ownership or scientific accuracy claim is inferred from pixels in the recording. See the media manifest before release.

## Accessibility

Semantic headings/sections, a skip link, visible focus and native navigation/disclosures are permanent. Reduced motion removes automatic separation, levitation and disclosure fades; pause controls ambient motion. Touch taps navigate without capturing vertical scrolling. No-JavaScript retains the assembled drawing, all content, case-study disclosures, video controls, direct still links and the game Yes interaction. Inactive enhancement controls are hidden or disabled.

Validate 320–2560px, short/landscape layouts, focus order, target bounds, scroll reversal, media controls, refresh/fragment restoration and contrast after any composition change. Actual browser and visual evidence is in `VALIDATION.md`; physical-device and screen-reader sessions remain separate review tasks.
