# Content verification and remaining TODOs

## Resolved on 2026-11-01

The owner-designated Google Drive file was verified as `Ariston_Michael.pdf`, one page, application/pdf. A fresh signed-out Chrome context returned HTTP 200 and rendered the actual Ariston Philip Michael resume without requiring sign-in. Permission metadata reports anyone/reader; sharing was not modified. All Resume CTAs now use the external viewer in a new tab with noopener/noreferrer. No PDF is stored in the repository and no internal PDF route is exposed.

Verified viewer: https://drive.google.com/file/d/12eRwVk3GQKjr0FVYOY-IFkmr66rd0er_/view

The source resolved Spindle Strategy’s Software Developer Intern role (Toronto, April–August 2026), application stack, reporting/review workflow, source-reported impact and UI/UX work. FireGuard XR now has a source-supported case study covering Python/FastAPI, React/TypeScript, Docker, 8+ API integrations and Three.js/React Three Fiber simulation. Skills match the resume without proficiency ratings. AirControl gesture counts/calibration and Seneca Energy ranking factors were expanded accurately.

PDF annotations supplied these links, each confirmed public by repository metadata and signed-out HTTP 200:

- https://github.com/ariston-michael/BearHacks-2026
- https://github.com/ariston-michael/Seneca-Energy-Hackathon
- https://github.com/ariston-michael/fireguard

`ABOUT_ME.md` records provenance and limits. Public name remains Ariston Michael; the external source retains its original full name/content. The resume contains a phone number, but none is separately copied into site content or a phone link.

## Still pending

- TODO: Verified live demos and actual screenshots for AirControl and Seneca Energy. FireGuard XR now has owner-recording stills/excerpt pending rights review (see MEDIA_MANIFEST.md). Original concept illustrations remain explicitly labeled.
- TODO: Devpost submission links/prizes. The owner-supplied profile returned HTTP 403 to automated fetches and is linked unverified.
- TODO: Owner-approved hackathon event photos.
- TODO: Chicken Shooter gameplay recording (none found in the workspace on 2026-11-14), public game/repository URL and cooperative-mode status; keep previous owner facts and do not attribute this project to the reviewed PDF.
- TODO: Independent benchmark evidence beyond source-reported metrics; do not convert reported improvements into agent-measured results.
- TODO: FireGuard XR provider names, scientific validation and prediction accuracy are not established by the source.
- TODO: Additional dates/details for community roles beyond what is already owner verified.
- Optional: portrait, further licensed visuals, final editorial/brand approval.
- Recheck the signed-out resume link immediately before launch; access and file contents can change outside this repository.

These missing extras do not justify fake destinations or fabricated claims. Current UI presents honest unavailable states where necessary. No external Drive permissions, production Pages settings or deployment are changed by content verification.

## Integrated review boundary — 2026-11-14

- **Publication blocker:** owner confirmation of FireGuard recording reuse, identification/required attribution of the map tiles, and permission for the forest photograph. The five media hashes match Claude's manifest; that verifies file identity, not third-party rights. The media viewer visibly flags this pending approval.
- Authentic hackathon photos are still unavailable. Both gallery cards deliberately retain labelled original artwork; no event image was invented.
- AirControl/Seneca real screenshots and Chicken Shooter genuine footage/public game URL remain pending. FireGuard footage appears only under FireGuard, never under the game.
- Devpost remains an owner-supplied, unverified profile link; the UI labels it as a profile, without claiming verified submissions or additional prizes.
- Integration is a review branch/PR only. No website publication or production settings change is authorised by this task.

## Production authorisation and resolved media scope — 2026-11-14

This supersedes the earlier review-only boundary: the owner authorises the Stage Separation production release and owner-created FireGuard media. Third-party map/photo rights remain unverified. To remove that release blocker, publication now retains only the inspected owner-created 3D simulation crop and removes all four wider screenshots/video from public/ and out/. MEDIA_MANIFEST records the exact crop checksum and withheld files; the export/browser checks enforce their absence. Wider media can return only after a separate rights review or replacement.

Missing AirControl/Seneca screenshots, event photos, genuine Chicken Shooter footage/public URL and independent benchmarks remain optional content TODOs. No substitute resume PDF or separate phone link is introduced.

## Ariston OS — 2026-11-26

- Portrait not supplied: `/card/` deliberately shows a labeled placeholder. Replace only with an owner-approved photo.
- AI Workplace source and reference-image attachments were not available in this checkout; implemented the owner’s written visual direction with original code artwork. Optional follow-up: compare supplied visuals with the implementation.
- Test NFC scanning and native vCard import on physical iOS/Android devices after a separately approved deployment. The production `/card/` address is not published by this branch.

## NFC contact card — 2026-11-26

- **Portrait:** `public/images/ariston-profile.webp` is not supplied (square, ~640px, WebP). The card shows an original pixel-art placeholder until it is added and the site is rebuilt. Do not use the NFC keychain photo.
- **Phone number:** deliberately omitted from the card and vCard; add only with explicit owner approval.
- **Reference images:** the owner's style reference images were not available to this task; the design follows the AI Workplace repository only.

## Integrated Ariston OS card — current

Claude’s `components/card` implementation is the selected `/card/` page. No approved portrait exists, so the original avatar is explicitly labeled as a placeholder. The sole download is `/card/ariston-michael.vcf`; verified name/email/education/public URLs only, no private phone number. The earlier root-level file is removed after browser verification.

Before a separately approved publication: owner visual/portrait review, actual iOS/Android NFC scan and native contact import, screen-reader/browser-toolbar zoom review, and external resume/contact reachability recheck. Local browser tests verify the approved hrefs and static vCard bytes; they do not establish availability of external services or actual phone import.

## Approved portrait — resolved

The owner supplied a valid 1254×1254 PNG at `assests/portraits/my-photo.png`. It was inspected and optimized to `public/images/ariston-profile.webp` (640×640, 29,492 bytes). Original aspect ratio/composition are preserved, no generated facial changes, EXIF stripped, and the source is not committed. Current portrait-placeholder TODOs above are historical. Physical NFC/Contacts import and assistive-technology/toolbar-zoom review remain manual follow-ups.

## Published portrait release — complete

Ariston OS and the approved portrait are live at the original HTTPS root, `/card/` and the canonical `/card/ariston-michael.vcf` endpoint (production `7951ddd4…`, successful run 45914031719). Earlier publication/portrait-source blockers above are historical. Remaining manual checks: physical NFC tap/native Contacts import, real-device safe areas, screen readers/toolbar zoom and LinkedIn normal-browser reachability. No private phone number was added.
