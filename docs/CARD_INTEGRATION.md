# Integrated Ariston OS NFC contact card

The selected implementation is Claude’s dedicated `components/card` window at **`/card/`**, integrated with Codex’s portfolio and the Next.js 16.4.5 security upgrade on `feature/ariston-os-integration`. This supersedes the parallel-branch integration advice. The future NFC URI remains `https://ariston-michael.github.io/card/` (trailing slash), encoded as an NDEF URI record only after a separately approved release.

## Source and layout

- `app/card/page.tsx`: server-rendered route, canonical/Open Graph/Twitter metadata, telephone auto-detection disabled, navy theme color `#20364e`, safe-area viewport.
- `components/card/AristonCard.tsx`: independent desktop/window, one focusable `main#main`, original pixel portrait placeholder, five tap-friendly actions and education details. No portfolio navigation or custom client JavaScript.
- `components/card/PixelArt.tsx`: original pixel renderer, avatar and icons. The placeholder is generic art, not a likeness; a visible label accompanies its accessible name.
- `components/card/card.module.css`: scoped card layout, 60–64px actions, focus/forced-color/reduced-motion handling. No perpetual sparkle/blink or boot animation.
- `app/tokens.css`: shared navy/grid/cream/sage/blue/beige/ink and system display/body fonts; both portfolio/global and card/scoped styles use them. The root layout supplies only reset/tokens/skip link, not a persistent header or background controller. The card paints its own static grid.
- `lib/card.ts`: profile, approved contact constants imported from portfolio content/site modules, public link list and vCard builder.

The public `components/card` barrel retains `AristonCard`, `PixelArt`, `PixelAvatar`, `PixelIcon`, `buildVCard`, `cardLinks`, `cardProfile`, `cardPath`, `vCardPath`, and `portraitPublicPath` exports. Portfolio contact/navigation links go to `/card/`; its Visit Portfolio action returns to `/` in place.

## Portrait

No approved photograph is present. The page checks `public/images/ariston-profile.webp` at build time and otherwise renders the labeled placeholder without requesting a missing image. Add only an owner-approved square portrait (suggested 640×640 WebP under 60 KB), then rebuild and verify alt text, crop and responsive behavior. `portraitSrc={null}` forces the placeholder. Do not use an NFC keychain/product photo or invent a likeness.

## One canonical vCard

`app/card/ariston-michael.vcf/route.ts` declares `dynamic = "force-static"`. The build writes **`out/card/ariston-michael.vcf`**; no application server runs on GitHub Pages. `buildVCard()` produces vCard 3.0 with CRLF, escaped text and UTF-8-safe 75-octet folding:

- Ariston Michael, approved email, Sheridan College, truthful student title/degree/specialization.
- Labeled Portfolio, LinkedIn and GitHub URLs.
- No phone number or photo.

The Save Contact anchor uses `download="ariston-michael.vcf"` and `type="text/vcard"`. The preview server serves the `.vcf` extension as `text/vcard`; build-time handler headers do not configure the hosting provider. Browser downloads and static file contents are tested, but live MIME behavior/native iOS or Android address-book import remain physical-device checks after separate publication approval.

The superseded `public/ariston-michael.vcf`, its Git line-ending attribute and unused global card CSS were removed only after the combined local suite passed. Export and browser guards require the old `/ariston-michael.vcf` endpoint to be absent. The sitemap includes `/card/`.

## Verification

Run locked install, lint, strict types, default production build, `check:export`, release guards and the combined Playwright suite against `out/`. It retains both agents’ useful coverage: 320–2560px, short phone layouts, approved destinations, actual skip focus/keyboard order, no-JavaScript, reduced motion, WCAG scans, portrait fallback, metadata, vCard contents and downloads across available engines. See `VALIDATION.md` for executed results and Lighthouse measurements; no merge or deployment is implied.
