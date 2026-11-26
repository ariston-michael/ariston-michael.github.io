# Architecture and design decision log

## 2026-10-31 — Reuse existing GitHub Pages user repository

**Decision:** Use `ariston-michael/ariston-michael.github.io` for the portfolio.
**Rationale:** Preserves existing user-site URL and Git history, supports free static hosting.
**Status:** Planned; do not deploy yet.

## 2026-10-31 — Separate development from production

**Decision:** Work on `development` or feature branches, leaving `main` intact until approved.
**Rationale:** Prevent accidental changes to the public website.
**Status:** `development` created from latest `origin/main`; project context documentation established. No merge or deployment performed.

## 2026-10-31 — Space theme, restrained motion

**Decision:** Original cosmic visual identity with star field, Saturn-inspired hero, dark palette, and limited glow.
**Rationale:** Memorable, aligned with engineering portfolio goals, without sacrificing recruiter usability.

## 2026-10-31 — Static Next.js architecture

**Decision:** Target Next.js App Router, TypeScript, Tailwind, Motion and static export.
**Rationale:** Supports desired interactions while remaining compatible with GitHub Pages.
**Status:** Implemented with static export in Milestone 1; CSS motion replaces the optional Motion library.

## 2026-10-31 — Small static client surface

**Decision:** Render content and 72 seeded stars at build time; use original SVG/CSS artwork and system typography. Keep only ambient motion controls interactive on the client.
**Rationale:** Deterministic output, no particle hydration, external asset licensing, runtime APIs, or font downloads. CSS handles restrained animation without an additional Motion dependency. Reduced-motion preferences disable all animation and smooth scrolling; a separate pause control accommodates visitors who want to stop ambient movement.

## 2026-10-31 — Honest incomplete content

**Decision:** Show verified project summaries and explicit, non-interactive TODOs for missing URLs/assets; derive only the GitHub profile from the repository owner.
**Rationale:** Recruiters can assess actual work without broken or fabricated links. Case studies and unverified feature details remain future work.

## 2026-10-31 — Preserve production while scaffolding

**Decision:** Keep the legacy root `index.html` intact and build the application separately into ignored `out/`. Add no deployment workflow.
**Rationale:** Implementation can be reviewed on `development` without changing the production Pages source/configuration. A future approved Pages release must publish the exported directory, including `_next/`, rather than the source root.

## 2026-10-31 — Peer-compatible lint toolchain

**Decision:** Use ESLint 9 with the current Next.js lint configuration; retain the locked compatible dependency graph and document 16 moderate development-only audit findings.
**Rationale:** React/import/accessibility plugins do not yet declare ESLint 10 support. Audit proposes incompatible framework/tool downgrades; avoid force upgrades or cross-major transitive overrides. Production dependencies report zero vulnerabilities. Revisit compatible upstream patches before launch.

## 2026-10-31 — Verified-scope project notes

**Decision:** Export three project detail routes using typed local records, with explicit boundaries around unverified technical detail. Keep FireGuard XR’s expanded view pending.
**Rationale:** Existing verified facts support useful scope summaries, not invented implementation narratives or metrics. Original SVG concept diagrams are labeled as illustrations rather than screenshots or architecture claims. A separate content TODO register preserves the missing evidence.

## 2026-10-31 — Visible responsive navigation

**Decision:** Keep five section links visible in a dedicated mobile row, with 44px minimum targets, rather than introducing a collapsing menu.
**Rationale:** The links fit at 320px and remain usable without JavaScript. Bounded grid tracks, fluid headings, wrapping, and safe-area gutters handle narrow, zoom-equivalent, and ultrawide layouts. Phones render fewer visible stars and skip scroll-reveal motion.

## 2026-10-31 — Repeatable exported-site QA

**Decision:** Add development-only Playwright/axe dependencies and a small Node static preview utility; preserve a server-free production artifact.
**Rationale:** Automated checks cover actual exported routes/assets rather than only a development server. The initial Python preview server reset concurrent requests, so a concurrent Node HTTP server replaces it. Browser report artifacts are ignored by both Git and ESLint. Firefox launch failures are documented as a host limitation, not excluded silently or counted as passes.

## 2026-10-31 — Static discovery and sharing

**Decision:** Export sitemap/robots metadata and a static original PNG social image with editable SVG source. Add per-project canonical and sharing metadata and a custom 404.
**Rationale:** Recruiters can share project pages and recover from missing URLs without a runtime image service, external fonts, or API. These are source/export features only; production Pages settings remain untouched.

## 2026-10-31 — Verified contacts, exact resume source

**Decision:** Use the owner-supplied LinkedIn, GitHub, and email directly. Keep the Resume link unavailable until `Ariston_Michael.pdf` is present; do not substitute a differently named or older PDF. Preserve original PDF bytes/full name and do not separately publish its phone number.
**Rationale:** Contact details are now explicitly verified. Resume-dependent internship and FireGuard XR detail cannot be inferred from a filename or project name. The minimal Spindle Strategy internship entry reflects only what the owner directly identified.

## 2026-10-31 — One bounded motion controller

**Decision:** Retain deterministic server-rendered stars and the original SVG. Add three depth layers and a null-rendering imperative client controller using one damped RAF scheduler, cached geometry, quantized glow updates, passive input listeners, and complete cleanup.
**Rationale:** Pointer events need no React state or per-star listeners. Settled/hidden pages stop frame work; touch and narrow viewports skip pointer effects. The existing pause event and live reduced-motion preferences disable all nonessential motion.

## 2026-10-31 — Hero-relative Saturn approach

**Decision:** Derive reversible progress from hero position/height, with a clipped transform wrapper capped at 6.5% desktop, 4% tablet, and 2.5% phone scale growth.
**Rationale:** The effect remains cinematic without changing layout, obscuring content, tying motion to unrelated document length, or intercepting scrolling. The caption stays outside the moving wrapper. Tests check zoom bounds, reversal, clipping boundaries, and reduced-motion/paused neutral states.

## 2026-10-31 — Perceptible bounded cinema replaces micro-zoom

**Decision:** Supersede the earlier 1.065 maximum with a smoothstep 3.6× desktop approach (3.3× ultrawide), keeping a bounded 80svh pin only on tall desktop screens. Use 1.95× unpinned tablet/short-screen and 1.55× phone treatments.
**Rationale:** The owner found the previous effect imperceptible. Original artwork now visibly approaches and exits the viewport, while a foreground scrim, persistent desktop navigation, immediate project/social/contact links, shared pause control and explicit skip link preserve recruiter access. Reduced motion/no-JavaScript collapse the pinned range. Pause neutralizes effects while keeping page geometry stable to avoid a scroll jump.

## 2026-10-31 — An optional solar navigation map

**Decision:** Map the Sun and eight original CSS planets to existing verified sections and projects, with native button selection, a labeled preview region, and an always-available direct-link menu.
**Rationale:** This adds an exploratory route without inventing projects, implying astronomical scale, replacing ordinary navigation or requiring hover/animation. Mobile uses a labeled grid; no-JavaScript hides inactive buttons and retains destination links. No graphics library, remote artwork, or running orbit animation is needed.

## 2026-10-31 — Preserve the resume evidence boundary

**Decision:** Keep the missing PDF unavailable and preserve prior content until the exact source is present and read.
**Rationale:** The latest request still conditions detailed resume updates on source verification. Inferring dates, metrics, integration details or role attribution from anticipated topics would violate the project’s factual-content policy. The approved contact links continue to work, and no phone number is separately published.

## 2026-11-01 — External Drive resume and source-supported content

**Decision:** Replace the absent local-PDF plan with the actual owner-designated Drive viewer, verified by metadata/text and a fresh signed-out Chrome context. All Resume CTAs use a descriptive new-tab link with noopener/noreferrer. Keep no redundant PDF.
**Rationale:** The public one-page source resolves the previous evidence blocker. Spindle Strategy, FireGuard XR, skills and gesture/ranking details can now be expanded accurately. Three repository URLs are sourced from actual PDF annotations and confirmed public. Source-reported metrics remain attributed, unverified live demos stay absent, and no phone contact link is added.

## 2026-11-01 — Validation now, deployment only after exact approval

**Decision:** Add a read-only development/PR workflow and a separate manual-only main release workflow with explicit approval and exact SHA guards, official pinned actions, full build/browser validation and least-privilege deploy permissions.
**Rationale:** Production currently uses legacy main/root; a main merge can trigger that source, so the Pages switch and merge are explicitly part of the later approval. Prepared release code must neither change platform settings nor publish automatically. Guard tests reject unsupported events, development, absent approval, malformed or mismatched commits. Failure stops deployment; diagnostics are preserved.

## 2026-11-01 — Reconcile history without rewriting it

**Decision:** Merge the already-inspected origin/main history into development normally, checking that the tree remains identical, and use a draft PR for release review. Never force push or modify local/remote main during preparation.
**Rationale:** Main’s historical merge contributes no new source relative to the shared ancestor. Recording it on development gives a clean review base while preserving all existing work. Launch/rollback remain separate explicitly authorized production actions documented in RELEASE.md.

## 2026-11-01 — Fix actual CI differences without weakening checks

**Decision:** Size the mobile Sun at its rendered dimensions, give header targets a 45px minimum, and use elapsed-time damping rather than a fixed per-frame interpolation factor.
**Rationale:** Ubuntu Firefox exposed pre-transform flex overflow and subpixel target measurements; shared-runner WebKit exposed slow reversal convergence. The fixes change actual layout/behavior while retaining the original overflow, minimum-target and reversal assertions, with no retries or browser skips.

## 2026-11-01 — Serialize hosted browser cases

Ubuntu's shared software-rendered WebKit starved animation frames when three narrow-screen cases ran concurrently, while all local WebKit cases and hosted Firefox passed. Use one CI worker and retain three local workers. Preserve strict motion deadlines, all assertions, every browser and zero retries; resource isolation gives the animation checks a meaningful rendering budget instead of concealing failures with timeout inflation.

## 2026-11-07 — Approved first publication

The owner requested immediate publication at the existing GitHub Pages address after reviewing the green candidate. Rechecked unchanged PR/main SHAs and the 270-test successful run, then verified the actual Drive PDF in a fresh signed-out browser. Switched Pages to Actions before merging PR #2 normally, preserving HTTPS/root URL. Dispatched the guarded workflow for exact main SHA `975d0ebb061c9ccbd9b1d858614f393bd31441d2`; release build/browser checks remain mandatory. Development was fast-forwarded normally to the merge. Future publication still requires authorization; this approval does not enable automatic deployment.

## 2026-11-11 — Shared SVG ring-to-trail journey

Move Saturn from the clipped hero into one backdrop shared with the solar explorer. Reuse six compatible cubic half-ring paths, interpolating geometry and coordinating rotation/scale/opacity with a single bounded progress model. This preserves continuity and reversibility without GSAP/WebGL or another dependency. Fixed user-space gradients prevent zero-height straight paths from disappearing; a vertically dissolving scrim prevents a rectangular section seam. Add only 40vh to desktop pinning; phones stay unpinned. Paused/reduced-motion/no-JavaScript variants retain readable static content.

## 2026-11-11 — Scope reload restoration to homepage documents

Reproduced native Chrome restoration on a hashless reload at y=3559 and y=6218; WebKit returned to top in the same baseline check. A pre-hydration script scopes manual restoration to fresh hashless homepage documents and releases it on interaction/popstate. Releasing at pageshow alone failed in Chrome because restoration can occur afterward. Do not let a departing page set automatic mode on an incoming reload. Fresh explicit hashes also need an initial-entry guard: WebKit could override a DOM-ready anchor with late restoration. Resolve their target at DOM readiness/pageshow and release on interaction; do not reset scroll on route changes, rewrite history state, or suppress back_forward/bfcache behavior. Browser regressions exercise actual reloads and real native/client navigation.

## 2026-11-11 — Local compiler restriction

Default Turbopack static build attempted both inside and outside the sandbox but its CSS worker could not bind a local port (EPERM). Validate production static export with the supported `next build --webpack` mode and report that exact command; retain the repository's default build/CI configuration and dependency lockfile. Baseline and changed Lighthouse measurements use the same compiler so transfer comparisons are meaningful.

## 2026-11-12 — Synchronize browser preconditions before release

Owner authorized publishing the latest development version. Hosted CI for 3ba6c64 completed 442/444 tests; two WebKit timing checks failed. A cold compositor had not presented its first frame before the timed approach, and the early-input test captured an intermediate wheel position (375px instead of the requested 400px). Wait for scene readiness/two native animation frames before seeking, and a painted page/pointer target/completed 400px wheel movement before capturing the baseline. Keep all scale, displacement and five-second assertions unchanged, with no test retries or exclusions. Application runtime is unchanged.

## 2026-11-12 — Publish the approved ring-passage version

After explicit owner approval and green 444/444 hosted validation, normally merge PR #3 and dispatch the existing guarded production workflow for exact main SHA `ba0d3013c9695b680ea954e5ff0b9761dd8cd7ab`. Preserve the same source tree, root URL, HTTPS and Actions-based Pages configuration; do not force-push or alter production settings. Development fast-forwards normally to the merge. The release workflow repeats full validation before uploading only static output and deploying.

## 2026-11-14 — Stage Separation in an isolated feature worktree

Use a section-driven SVG rocket beside normal-flow server content, with a compact drawing on phones. Six recognizable modules share the same geometry before/after separation; bounded transform offsets reverse directly with scroll. Pointer/keyboard offsets are ephemeral, with magnetic return and a visible Reassemble control. Prefer CSS levitation and a scroll-scheduled RAF over a graphics/motion dependency, preserving static export, native scrolling and readable no-JavaScript content. Keep Claude-owned showcase/gallery/game components untouched; document verified named exports and explicit insertion points rather than importing unavailable components. The existing verified project fallback/routes/content stay in place until integration. No merge or deployment is authorized in this feature pass.

## 2026-11-14 — Project showcase as scoped, self-contained sections

**Decision:** Build ProjectShowcase, HackathonGallery and GameExperience on `feature/project-showcase` as server components with CSS Modules, exported from `components/showcase`. They do not edit the rocket scene, global layout or global CSS.
**Rationale:** Another agent owns the homepage and rocket motion in parallel. Scoped modules plus a documented insertion point (docs/SHOWCASE_INTEGRATION.md) minimise merge conflicts. Native `<details>` provides the "Ready to play? → Yes" reveal without JavaScript.
**Media:** Use only the owner's own FireGuard XR recording (stills plus a 30 s, 3.8 MB H.264 excerpt with no audio and preload none). Exclude its third-party news section. Devpost could not be read (HTTP 403), and the repositories contain no screenshots, so other projects use clearly labelled original schematics. No Chicken Shooter recording or public URL exists, so the game section offers no launch button and never presents a video as the playable game. The provenance and rights review are recorded in docs/MEDIA_MANIFEST.md.

## 2026-11-14 — Integrate Stage Separation without rewriting feature history

Merge exact rocket `48e35c7ff3877a283a6a51ecafdf541a38f04a36` and showcase `5a0c68ff16b3dd21a51bf078ab84decb18840295` into a dedicated integration worktree from development `c9bf5c90caf24e50b3cb389e9dee293af88d9142`. Retain both appended histories when resolving the three documentation conflicts. No squash/rebase, source-worktree edit or production action.

Replace fallback projects and duplicate achievement summaries with the supplied components; preserve `#projects`/`#achievements` and all four note routes. Put the native game disclosure at the end. Use container queries for figures/gallery layouts inside the narrower rocket column and shared warm monochrome tokens across notes/recovery. Share rocket geometry with the static 404 drawing. Cumulative joint expansion fixes the observed lower-stage/engine overlap while preserving reversibility; compact drawings scale expansion too. Phone command separation starts only after the complete drawing enters view, so visitors first see an assembled rocket.

Display the media approval state, retain genuine FireGuard files byte-for-byte, keep all unverified game/event/project imagery as explicit schematics, and offer static still links without JavaScript. Authenticity does not establish map/photo rights. Enable the existing read-only validation workflow for development-targeted PRs; production workflow/settings remain unchanged. Reconcile tests against the actual homepage rather than retaining a temporary preview route or summing branch test counts.

## 2026-11-14 — Publish only the rights-resolved FireGuard crop

The owner authorises production and owner-created FireGuard media, with the explicit requirement to resolve or remove third-party imagery. Retain the unmodified simulation-only crop after visual inspection; remove the four wider screenshots/video whose map/background permissions are undocumented. Reject those files in static export and require HTTP 404 in browser checks. This resolves publication scope without inventing a licence, simply hiding files in the UI, or rewriting Git history. The former video tests are replaced by publication-absence/crop provenance checks because that recording is deliberately excluded, not skipped to conceal playback failures.

Hosted PR #4 run 43669724358 had 240 passes / 30 failures. The 28 Firefox layout failures all identified the inline email link's zero clientWidth; make it an inline-flex 44px target rather than weakening overflow assertions. The two WebKit video cases concern the recording excluded above. Re-run the complete relevant suites and require a green hosted check before merging. Production workflow still uploads only out/ and requires exact main SHA approval.

## 2026-11-14 — Give navigation targets a real rounding margin

Hosted Firefox measured 43.999969px for nominally 44px navigation links at 600px. Set header targets to 45px in both dimensions so actual painted/layout bounds satisfy the 44px requirement. Keep assertions strict and rerun the complete hosted matrix; no retry or browser exclusion.

## 2026-11-26 — Ariston OS and NFC contact edition

Replace Stage Separation with an original software-window workspace: cream surfaces, navy grid, sage/blue/beige title bars, system monospace display type and readable body type. Follow the owner’s written reference direction; reference attachments/AI Workplace source and a portrait were unavailable. Use an original code-drawn pixel computer/seedling, never an invented photo or external character. Window chrome is decoration, not nonfunctional controls.

Use normal document flow and browser scroll/history rather than the cinematic entry controller. Keep only project filtering as a small client interaction, with every project/link present before hydration and a no-JavaScript fallback. Preserve four factual project notes and the approved FireGuard crop. Replace obsolete rocket/cinematic browser suites with OS layout, interaction and accessibility regressions. Legacy implementation modules remain unused for historical reference.

Build `/card/` as an independent server-rendered page sharing global design tokens. Use a transparent portrait placeholder, approved contacts and a static vCard 3.0 (name, email, portfolio only). No phone number, external data service or extra dependency. The site stays at the GitHub Pages root with static export. NFC encoding and physical-device contact import need review after separate publication approval; no merge or deployment is part of this work.

Git’s local line-ending normalization would otherwise convert vCard records to LF when checked out by CI. Mark `*.vcf -text` in `.gitattributes` so the approved contact file retains its explicit CRLF bytes across platforms; the download regression checks those exact bytes.

The first Linux three-engine run exposed Firefox’s zero clientWidth for inline project-title/evidence links. Give those anchors explicit inline-block layout boxes and bound their width; title links also get 44px target height. Keep the strict browser layout assertions unchanged and rerun the full matrix.

## 2026-11-26 — Minimum patched Next.js security upgrade

**Decision:** Upgrade `next` and `eslint-config-next` from 16.4.3 to **16.4.5** on `feature/nextjs-security-upgrade` (from `origin/development` `fe77fac`), and refresh the lockfile's transitive `typescript-eslint` 8.72.1 → 8.74.0 (`minimatch` 10.2.6 → 11.0.9) within the existing `eslint-config-next` range.
**Rationale:** GitHub's advisory database lists 16.4.5 as the first patched release for all seven moderate Next.js advisories: GHSA-mfr8-8qww-v76h, -vc7v-qv4w-wrv8, -7qx7-33qx-rqx2, -f3mh-rxg3-f5g2, -pc58-hwjq-p385, -rhh4-g77r-r9qj and -vvgp-ww4w-46vf. 16.4.5 is the dedicated security release. 16.4.6 only backports bug fixes, including changed route-handler compression, so it is deferred to a normal update. The dev-only GHSA-g3hv-75wg-m249 (minimatch globparts DoS) is patched in minimatch 11.0.1+.
**Method:** The official `next upgrade --revision 16.4.5` CLI was run first. Its additional exact pins and `overrides` for `@types/react`, `@types/react-dom` and `eslint` were not security-related and would have replaced existing semver ranges, so the change was reduced to the two Next package pins plus a non-forced `npm audit fix`. Result: `npm audit` reports 0 vulnerabilities. React 19.3.1, Tailwind, TypeScript and all application code are unchanged.
**Exposure note:** the advisories concern `use cache`, Cache Components, the image optimizer, the Edge runtime and self-hosted response forwarding. This site uses none of these: it is a static export with unoptimized images on GitHub Pages. The upgrade removes the build's security stop and keeps the toolchain on a supported patch.

## 2026-11-26 — Ariston OS NFC contact card as an isolated route

**Decision:** Build the NFC business card at `/card/` on `feature/ariston-os-nfc-card` (from `origin/development` `fe77fac`) in its own worktree. It is a server-rendered route with CSS Modules, its own `lib/card.ts` data source, and a static `ariston-michael.vcf` route handler. It does not edit the root layout, global CSS, homepage or sitemap.
**Rationale:** Codex is redesigning the main portfolio in parallel, so additive files with a documented integration point (docs/CARD_INTEGRATION.md) minimise conflicts. A tap from an NFC tag needs to show links immediately: the card needs no client JavaScript, and all five actions fit within the first screen of a 390×844 phone. Education details sit below the actions for that reason.
**Design:** Original artwork in the visual language of the AI Workplace retro office (`office-retro-gemini`/`ai-workplace-pixel-logo` branches): navy tile grid, cream window, sage ink, hard offset shadows, stepped pixel corners, rust focus ring. System monospace replaces Geist to avoid remote fonts. Icons and the avatar are original pixel grids, not brand logos or copied sprites. The owner's reference images were not available to this task.
**Portrait:** At build time, use `public/images/ariston-profile.webp` if present; otherwise show an original pixel-art placeholder, so a missing asset never produces a broken request.
**vCard:** Version 3.0 for iOS/Android import, CRLF line endings, 75-octet folding, verified name/email/education/public URLs only, and no phone number. GitHub Pages provides `text/vcard` from the extension; the local preview server gains the same MIME mapping.

## 2026-11-26 — Integrate security, portfolio and dedicated NFC card

Create isolated `feature/ariston-os-integration` from fetched development `fe77fac7a3dc313b4d2cb67efa439a7eaac1c42a`. Verify and normally merge, in order: security `f169acbd644970adfb11adaf4ae57999e360bd72`, portfolio `00d4cb219730ff0e7ab83a12a37d16d920c2da17`, card `8b96aebd624d2e10a6912676157357aac8737b34`. Preserve both agents’ documentation histories and the aligned Next.js/eslint-config-next 16.4.5 lockfile. Fresh full and production audits report zero vulnerabilities; no force/incompatible dependency fix is needed.

Prefer Claude’s dedicated card route/components while retaining Codex’s portfolio and shared branding. Introduce `app/tokens.css` for common palette/type; card CSS owns its independent grid/window and maps to the tokens. No main navigation or motion controller is mounted there. Keep original avatar/controls/icons, add a visible portrait-placeholder label and actual skip-link focus target, and disable continuous decorative motion.

Choose the static-generated `/card/ariston-michael.vcf` handler/builder as the only endpoint. It exports a real file with CRLF, UTF-8-safe folding, approved public contacts/education and no phone/photo. Import contact constants from the portfolio source to prevent drift. First pass the combined 130-case local suite, then remove the obsolete public root vCard, its Git attribute and global card CSS. Add export/browser guards for the old endpoint’s absence. Keep both agents’ substantive tests, adapt obsolete selectors/expected card routes, extend card widths through 2560px, and test WebKit downloads instead of retaining its assumed skip. No publication is part of integration.
