# Ariston OS

Ariston Michael’s original retro portfolio workspace and mobile-first NFC contact card. Next.js + TypeScript, statically exported for `https://ariston-michael.github.io`.

```sh
npm ci
npm run dev
```

Production verification:

```sh
npm run lint
npm run typecheck
npm run build
npm run check:export
npm run test:release
npm test
```

Use `npm run preview` to serve `out/`. On hosts with Turbopack CSS-worker port restrictions, `npm run build -- --webpack` is the supported local fallback; report the default-build failure accurately. Local browser runs can select installed Chrome with `PLAYWRIGHT_CHANNEL=chrome`.

The homepage is an accessible workspace with a filterable project explorer, verified experience, skills and contact links. `/card/` offers phone-friendly contacts and a downloadable vCard; Claude’s dedicated pixel portrait remains an explicit placeholder. The canonical vCard is `/card/ariston-michael.vcf`, generated once during static export with approved public details and no phone number. Four project case studies retain verified scope. Personal facts come from [ABOUT_ME](docs/ABOUT_ME.md); approved media from [MEDIA_MANIFEST](docs/MEDIA_MANIFEST.md).

Shared colors/fonts live in `app/tokens.css`; the card uses scoped CSS and has no main-portfolio navigation or continuous background animation. Integration preserves Next.js/eslint-config-next 16.4.5.

See [CARD_INTEGRATION](docs/CARD_INTEGRATION.md), [PROJECT](docs/PROJECT.md), [DESIGN](docs/DESIGN.md), [ARCHITECTURE](docs/ARCHITECTURE.md), [VALIDATION](docs/VALIDATION.md) and [ROADMAP](docs/ROADMAP.md). Legacy design records are historical. Main merges and public deployment require separate owner approval; the manual release guard and root URL remain unchanged.

After a separately approved release, encode `https://ariston-michael.github.io/card/` as the NFC tag URL. This feature branch does not publish that route. Verify native contact import on real phones before using it as the final physical card.
