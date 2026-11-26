# Ariston OS NFC contact card

A mobile-first digital business card served at **https://ariston-michael.github.io/card/**. The Hack the North 2026 rewritable NFC keychain should be written with that exact URL (with the trailing slash) as an NDEF URI record.

Built on `feature/ariston-os-nfc-card` from `origin/development` (`fe77fac`), separately from the main Ariston OS portfolio redesign. It adds files only, plus one MIME line in the local preview server. It does not change the root layout, global CSS, homepage, sitemap or deployment workflow.

## Files

| Path | Purpose |
| --- | --- |
| `app/card/page.tsx` | Route, card SEO metadata (title, description, canonical `/card/`, Open Graph profile, Twitter) and a card-only viewport (`themeColor #10243f`, `viewport-fit=cover`). |
| `app/card/ariston-michael.vcf/route.ts` | Static route handler. The build writes `out/card/ariston-michael.vcf`. |
| `lib/card.ts` | Verified facts, link list, `buildVCard()`, paths. The single source for card content. |
| `components/card/AristonCard.tsx` | Server component: window chrome, portrait slot, identity, actions, education. No client JavaScript. |
| `components/card/PixelArt.tsx` | Original pixel-art renderer, icon set, placeholder avatar and brand mark (crisp SVG). |
| `components/card/card.module.css` | All card styling and tokens, scoped by CSS Modules. |
| `components/card/index.ts` | Public exports (below). |
| `tests/card.spec.ts` | Layout, links, vCard, portrait, keyboard, axe, reduced motion, metadata and no-JavaScript checks. |
| `scripts/preview.mjs` | One added line: `.vcf → text/vcard`, matching GitHub Pages. |

## Exports

```ts
import {
  AristonCard,        // <AristonCard portraitSrc?={string | null} />
  PixelArt, PixelAvatar, PixelIcon,
  buildVCard,         // () => string, vCard 3.0, CRLF, folded at 75 octets
  cardLinks, cardProfile,
  cardPath,           // "/card/"
  vCardPath,          // "/card/ariston-michael.vcf"
  portraitPublicPath, // "/images/ariston-profile.webp"
} from "@/components/card";
```

`AristonCard` renders a full-viewport desktop with its own `<main id="main">`, so the root layout's existing skip link works. It is meant to be a page, not nested in another `<main>`. To embed it elsewhere (for example as an Ariston OS "window"), wrap it in a container that is not a `<main>` and see the notes below.

## Integration with the Ariston OS portfolio

1. **Merge as-is.** The route is self-contained. The only shared-file change is the preview MIME line, so conflicts should be trivial.
2. **Root layout.** The card inherits `app/layout.tsx` (global CSS, skip link and the home-entry script, which exits early off `/`). Card styles use class selectors that outrank the global `h1`/`p` element rules. `:global(html):has(.desktop)` recolours the overscroll background only while the card is mounted. If the new portfolio layout adds a persistent header, dock or global background, either exclude `/card/` or move the card into its own route group with a minimal root layout: `app/(card)/layout.tsx` with `<html><body>`. That also drops the portfolio's global CSS from the card's payload.
3. **Sitemap (optional).** `app/sitemap.ts` is left untouched to avoid conflicts. To index the card, add `{ url: \`${siteUrl}/card/\` }`. `scripts/check-export.mjs` will then also verify its single `<h1>` and canonical URL, which already pass.
4. **Linking from the portfolio.** Link to `/card/` or `vCardPath` from the contact section if wanted. The card's "Visit Portfolio" action is a same-origin `/` link, so it opens in place and Back returns to the card.
5. **Tokens.** Card tokens are CSS custom properties on `.desktop` in `card.module.css`. They are derived from the AI Workplace retro office: navy `#10243f/#132b4f/#263f68`, cyan `#36c7e8`, cream `#fdfdf8/#f3ebc2`, sage `#2e493e/#64805c/#e5edd8`, beige `#e4c27b`, rust focus `#a34f2e`. If the portfolio publishes shared tokens, map them here. Do not import the portfolio's global CSS into the card.

## Portrait slot

Drop a square portrait at **`public/images/ariston-profile.webp`** (recommended 640×640, under 60 KB, face centred, WebP). The page checks for the file **at build time**:

- **Present:** a real `<img>` with alt text "Portrait of Ariston Michael", `fetchpriority="high"`, framed in the stepped pixel border.
- **Absent (current state):** an original pixel-art avatar placeholder (`role="img"`, labelled as a placeholder). No image request is made, so there is never a broken image.

Rebuild after adding the file. Do not use the NFC keychain photo as the portrait. The placeholder is generic art, not a likeness. `<AristonCard portraitSrc={null} />` forces the placeholder.

## Save Contact (vCard)

`/card/ariston-michael.vcf` is generated at build time from `cardProfile`. It is vCard 3.0, the version iOS and Android Contacts both import reliably, and contains:

- N/FN Ariston Michael
- ORG Sheridan College
- TITLE "Computer Science Student, Cloud Computing"
- preferred email
- labelled Portfolio, LinkedIn and GitHub URLs (`X-ABLabel`, shown on Apple devices)
- a NOTE with the degree and specialization

**No phone number** (not approved for publication) and no photo.

The link has `download="ariston-michael.vcf"` and `type="text/vcard"`. GitHub Pages serves `.vcf` as `text/vcard`, which iOS Safari opens as an "Add to Contacts" sheet and Android Chrome downloads and opens in Contacts. **Physical-device import has not yet been verified.** See the device checklist in `VALIDATION.md`.

## Verification

```sh
npm run lint && npm run typecheck && npm run build && npm run check:export
PLAYWRIGHT_CHANNEL=chrome npx playwright test tests/card.spec.ts --project=chromium --project=webkit
```

Firefox cannot launch on the author's host (see VALIDATION.md). Hosted CI runs all three engines.
