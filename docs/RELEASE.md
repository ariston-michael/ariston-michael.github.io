# Ariston OS — published 2026-11-26 (America/Toronto)

The owner explicitly authorized the portrait integration, normal development/main merges and exact-SHA GitHub Pages publication. The release completed successfully; no authentication/security control was bypassed.

- Production SHA: `7951ddd4d4ba929ec6fd0e8fe58f417bb28fed65`, normal merge of [PR #9](https://github.com/ariston-michael/ariston-michael.github.io/pull/9). Its tree exactly matches reviewed portrait source `d04839679d70cd1e8aa7d4fe190eef1e130e2358`: `c826aa651e7f456e49cd9b66ea9d0fabfa37515d`.
- Integration PR #8 and portrait/release PR #10 were merged into development first. Source CI 45913065191 and production PR CI 45913566905 each passed all 195 three-engine checks before merge.
- [Approved Pages release 45914031719](https://github.com/ariston-michael/ariston-michael.github.io/actions/runs/45914031719), attempt 1, passed exact-SHA approval, Pages checks, npm ci/audit (zero vulnerabilities), lint/types, nine release guards, default build, portrait-required six-route/60-file export and **195 browser checks (2.7m)**. Build succeeded in 4m6s; official out/-only deployment succeeded in 8s.
- Live [portfolio](https://ariston-michael.github.io/), [NFC card](https://ariston-michael.github.io/card/) and [vCard](https://ariston-michael.github.io/card/ariston-michael.vcf) returned 200 and passed independent public smoke verification. Pages remains Actions-based, HTTPS enforced, same root URL, no custom domain or settings change.
- Approved photo: actual source `/Users/aristonmichael/stellar-portfolio/assests/portraits/my-photo.png` (1254×1254, 1,931,193 bytes). Only the proportional 640×640 / 29,492-byte metadata-free WebP is published. Live SHA-256 matches `d88c4fe46c1df1e45b8400bcca253660cad66d2a69bf8c3391e85b7c9e3030af`.
- Live vCard MIME is `text/x-vcard`; its CRLF/public-only fields, no phone number and Chrome download were verified. Native Contacts import and physical NFC scanning remain device checks. See VALIDATION.md for exact public-test scope.

## Future release procedure

Future publication still requires owner authorization for the reviewed change. Work on development/task branches, validate the actual static export and normal PR checks, then normally merge the reviewed production PR. Read the full resulting main SHA and dispatch `release-pages.yml` on **main** with `approve_release=true` and `expected_sha` equal to that exact SHA. The existing workflow independently verifies approval/source/portrait/audit/build/browser checks before uploading only `out/` and deploying through Pages. Preserve authentication, permissions, root URL and HTTPS; do not disable guards or upload source root. Verify public routes/assets/photo/vCard and record the actual run/SHA after success.

## Rollback

Current known-good release: `7951ddd4d4ba929ec6fd0e8fe58f417bb28fed65`, run 45914031719. Previous known-good production: `d8c0fb799f884d0774bc5fbeeaf9d46be308717a`, successful approved runs 45532539835 and 45532448129. No rollback was performed.

For an authorized rollback, first verify the intended historical SHA/run, eligibility and retained media. Use **Re-run all jobs** on an eligible successful Approved Pages release so it builds that exact historical source under its original approval context; never reset/force-push main or upload the source root. If no eligible run can be rebuilt, prepare a reviewed revert/fix PR and obtain the required rollback authorization, then use the normal exact-SHA workflow. Verify the live result and record it. Detailed historical instructions follow.

## Physical NFC checklist

1. Write `https://ariston-michael.github.io/card/` (trailing slash) as an NDEF URL/URI record on the rewritable tag.
2. Scan using an iPhone and an Android phone; confirm HTTPS, correct portrait and all contact actions.
3. Tap Save Contact, open/import the vCard in Contacts and verify name, email, education and public URLs, with no phone number. Confirm no duplicate contact is unintentionally created during repeated testing.
4. Keep the tag rewritable. Native phone import, real screen-reader/toolbar-zoom sessions and normal-browser LinkedIn reachability remain manual follow-ups; automated LinkedIn access returned 999.

---

## Historical release records (superseded status)

# Stage Separation production release — authorised, not yet deployed

Owner instruction on 2026-11-14 explicitly authorises merging the validated Stage Separation integration, preparing/merging its production PR and dispatching GitHub Actions publication. This supersedes the historical review-only boundary below; no routine approval is needed. Security and authentication restrictions still apply.

PR #4 initially points to `3b9c2f9e1deffafe9559f15915dfcaaa4c571831` against development `c9bf5c90caf24e50b3cb389e9dee293af88d9142`. Hosted run **43669724358** failed (240 passed / 30 failed): 28 Firefox email-inline layout failures, plus two WebKit recording checks. Release fixes provide a real email target box and exclude the unlicensed wider recording/screenshots. Only the inspected, unchanged owner-approved 3D simulation crop remains; the export guard and browser checks prohibit the four withheld files. See MEDIA_MANIFEST for rights scope and exact checksum.

The existing guarded workflow is correct: main-only manual dispatch, `approve_release=true`, exact full `expected_sha`, full validation, then official Pages artifact upload of **out/** and dependent deploy. No server runtime or source-root upload. Existing production URL remains `https://ariston-michael.github.io/`; the previously published Saturn release below stays live until a successful new deployment is actually verified.

Fresh anonymous Chrome verification opened the intended `Ariston_Michael.pdf - Google Drive` viewer with HTTP 200, the expected name, and no access-required message. No Drive permission or PDF copy was changed. GitHub profile/project links and Devpost returned 200; LinkedIn returned its automation-blocking HTTP 999, so the owner-verified URL was retained without bypassing the block.

Pending: final release-safe local/hosted checks, normal integration/main PR merges through permitted GitHub actions, actual Pages configuration/dispatch permission, and public smoke verification. Local preparation or an authorised merge alone is not a deployment. Do not use keychain/credential extraction, alternate authentication or modified workflow triggers to bypass connector/security restrictions. Record the actual final SHA, production PR and successful workflow run below only after they exist.

---

# Production release procedure

## Ring-passage release — published 2026-11-13

- Owner explicitly approved publishing the latest development version on 2026-11-12.
- [PR #3](https://github.com/ariston-michael/ariston-michael.github.io/pull/3) released the Saturn ring-to-trail passage and homepage entry policy, with test-only renderer/input synchronization fixes.
- Reviewed head: `67e376774ee0defc879eba0dbcbff61e63ce3a54`; [preflight 43362918788](https://github.com/ariston-michael/ariston-michael.github.io/actions/runs/43362918788) passed all **444** Chromium/Firefox/WebKit tests (26.6m), source checks and default production export.
- Normal main merge/published SHA: `ba0d3013c9695b680ea954e5ff0b9761dd8cd7ab`. Its tree exactly matches the reviewed head: `0c75995d3412dc2a6e1e97f4e9a8e2f4af7f5d01`.
- [Release run 43366281384](https://github.com/ariston-michael/ariston-michael.github.io/actions/runs/43366281384), attempt 1, passed the exact-SHA approval/Pages guard, locked install/lint/types/9 policy tests, production build/export verification and **444 browser tests (23.7m)**, then deployed successfully through official Pages actions.
- Public address remains https://ariston-michael.github.io/. Pages source, root URL, HTTPS and permissions were unchanged during this release.
- Previous known-good release: main `975d0ebb061c9ccbd9b1d858614f393bd31441d2`, [run 42412024196](https://github.com/ariston-michael/ariston-michael.github.io/actions/runs/42412024196). Use the authorized Actions rollback procedure below if needed.
- Development fast-forwarded normally to the merge; subsequent release-record documentation does not trigger deployment. No history rewrite or branch deletion.

## Approved first release — completed 2026-11-08

- Public URL: https://ariston-michael.github.io/
- Owner approved immediate publication on 2026-11-07 after the pre-release report.
- Reviewed development head: `d03454d312754eb31d71f1938822828e7bbb56a4`; PR validation passed 270/270 before approval.
- Rechecked the unchanged PR/main heads and signed-out public resume before release.
- Switched Pages from legacy main/root to GitHub Actions before normally merging [PR #2](https://github.com/ariston-michael/ariston-michael.github.io/pull/2).
- Published main SHA: `975d0ebb061c9ccbd9b1d858614f393bd31441d2`. Its source tree exactly matches the reviewed development head (`3989d83eb616a39ed47f7cf5bfca5e74cdd6f533`). No force push or history rewrite.
- [Approved release run 42412024196](https://github.com/ariston-michael/ariston-michael.github.io/actions/runs/42412024196), attempt 2: build and deploy succeeded, including all 270 browser tests. Attempt 1 correctly blocked deployment after 269/270 tests, with the first WebKit case hitting the documented startup frame starvation. The full unchanged workflow was rerun; no checks were bypassed.
- HTTPS and the user-site root URL are preserved. Development was fast-forwarded to the release merge; release-record documentation continues on development.
- The legacy root index remains available for authorized rollback. Future production changes still require explicit owner approval and exact-SHA manual dispatch; development documentation pushes do not deploy.

The initial preparation and reusable release/rollback instructions below retain their historical context. Current Pages source is Actions, so future releases do not repeat the legacy-source switch. Live verification evidence is recorded in VALIDATION.md.

## Current state inspected on 2026-11-01

- Public site: https://ariston-michael.github.io — HTTP 200, legacy welcome page.
- Pages: `build_type: legacy`, source branch `main`, path `/`, HTTPS enforced, no custom domain.
- Remote main: `3c1e928a80432e1fc54cfdeda5907b66546ec27a`; local main is intentionally untouched at `b571ccce0832dc6727dc6558fe93826f71f52c1d`.
- No open PR existed at initial inspection. Draft review PR #2 is now open: https://github.com/ariston-michael/ariston-michael.github.io/pull/2. It must not be merged without explicit approval.
- Main branch protection was not configured. The existing github-pages environment has a custom branch policy and no required-reviewer rule was reported. No protection/permission setting was changed.
- The existing dynamic `pages-build-deployment` workflow serves the legacy branch source. **Merging before switching the source can start that legacy build.**

The owner authorized implementation, validation, development pushes and non-production CI. Source changes, deployment workflow preparation and a draft PR are reviewable results, not approval to publish. Do not dispatch a production workflow, modify Pages settings or merge to main during preparation.

## Prepared workflows

`validate.yml` runs on development pushes and PRs targeting main, or manual validation. Its token is contents/read only. It runs the locked install, lint, strict TypeScript, release-policy tests, static build/export verification and Chromium/Firefox/WebKit suite on Ubuntu. It retains browser diagnostics on failure and a successful static-review artifact. It has **no Pages action, Pages write permission or deployment step**.

`release-pages.yml` has **only workflow_dispatch**, with no push, PR, schedule or workflow_run trigger. It cannot deploy from development. A main dispatch also requires `approve_release=true` and the full `expected_sha` matching the dispatched `GITHUB_SHA`. The exact source SHA is checked out. Release-policy tests reject development, automatic events, absent approval, malformed SHA and a mismatched commit.

The build job verifies that Pages is already configured for Actions; it never changes settings. Official GitHub configure-pages uses `enablement: false`, with no generator-config mutation. All source/browser/export checks must pass before official upload-pages-artifact packages **only `out/`**. Deploy has a `needs: build` dependency, Pages write/OIDC permissions only in that job, the github-pages environment, serialized concurrency and a 15-minute timeout. Failures block deployment and write an Actions summary; they are not suppressed or retried automatically. Actions are pinned to verified official release commit SHAs.

## Branch reconciliation

Development and remote main share `a9ff369` but main includes its separate historical merge. Reconcile by a normal merge of `origin/main` **into development**, with no checkout/write/push to main and no force push. Record the pre/post tree hashes: the current main-only merge contributes no source changes, so they should match. This gives GitHub a clean reviewed base while preserving all public history. If main changes later, fetch/inspect again, reconcile into development and rerun validation before approval.

## Exact approval scope

After reviewing the draft PR and green validation, the owner must explicitly approve:

> Approve release of the reviewed development head in this PR. Authorize switching Pages from legacy main/root to GitHub Actions, merging the reviewed PR into main, and manually running Approved Pages release for the resulting main SHA. Verify the public site after deployment.

The completion report supplies the concrete PR URL and reviewed development SHA. Recheck those values; do not silently include later changes. An approval to prepare/test/push development is not a release approval.

## Launch steps — execute only after that approval

1. Confirm the approved development SHA is still the draft PR head, remote main has not moved unexpectedly, and the PR validation is green. Resolve any failing check; do not bypass it. Recheck signed-out Drive resume access.
2. Record the previous production URL/status, Pages source, main SHA and last successful deployment run. Keep this release record outside secrets and do not rewrite history.
3. In repository Settings → Pages, switch **Build and deployment → Source** from branch deployment to **GitHub Actions**. This settings change is explicitly part of the required release approval; it has not been performed by this task. Keep the root URL and HTTPS. Confirm the github-pages environment permits main; review protection policy as the owner chooses.
4. Mark the approved draft PR ready and merge it normally into main. Do not force push, squash away required history without review, or publish any unrelated changes.
5. Read the resulting full main commit SHA. In Actions → Approved Pages release → Run workflow, select branch **main**, set **approve_release=true**, and paste that exact SHA into **expected_sha**. Do not dispatch on development. The workflow refuses a different commit or legacy Pages mode.
6. Wait for build, browser tests, artifact upload and deployment to succeed. If any stage fails, inspect diagnostics; follow rollback guidance under explicit release/rollback authorization rather than changing settings blindly.
7. Independently verify the public homepage, all four project-note paths, canonical URLs, `_next/` assets, robots/sitemap, custom missing-path recovery, resume new tab/signed-out access, mobile layout, keyboard controls, solar destinations, cinematic skip/reversal and reduced motion. Confirm the live site is the approved artifact, not the unchanged root legacy index.
8. Report deployed SHA, Actions run URL, public URL and post-release results. Sync development forward normally if needed; never rewrite public history.

## Rollback instructions — also a production action

Do not execute rollback without owner authorization (or an approved release window that explicitly includes rollback).

### First launch, returning to the current legacy welcome page

If no successful Actions-based release exists yet, restore Pages Source to **Deploy from a branch**, `main`, `/`. The root legacy `index.html` remains byte-for-byte preserved, so this restores the previous welcome-page source. Wait for the legacy build and verify the public result. Do not delete the new application or force-reset main. Investigate/fix on development before a newly approved release attempt.

### Later Actions-based releases

Choose the last successful **Approved Pages release** run for the known-good SHA. With owner authorization, use **Re-run all jobs** on that historical run, so the complete validation/build recreates that exact approved artifact even if its one-day Pages artifact has expired. Confirm the run’s SHA and original manual approval inputs before rerunning. A re-run retains the original GITHUB_SHA/GITHUB_REF; see [GitHub’s re-run semantics](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/re-run-workflows-and-jobs). GitHub currently permits re-runs within 30 days. Do not dispatch today’s main with an older expected_sha; the guard deliberately rejects that mismatch.

If no eligible known-good run can be rebuilt, prepare a reviewed rollback/fix PR preserving the release workflow and guard scripts, validate it, obtain approval, then merge and dispatch its new exact main SHA. Verify production again and record the rollback run. Keep serialized deployments; do not run competing releases or force-push public branches.

## Outstanding operational limits

The Actions deployment path has executed successfully for the releases recorded above. Future production changes still require explicit owner approval, a reviewed merge and exact-SHA manual dispatch. Physical-device/assistive-technology and actual browser-toolbar zoom checks remain manual limits. Optional screenshots/live demos and unverified Chicken Shooter details remain content TODOs. See VALIDATION.md for actual executed checks.

Official workflow guidance: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
