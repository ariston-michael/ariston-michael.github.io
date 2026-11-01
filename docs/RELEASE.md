# Production release procedure — approval required

## Current state inspected on 2026-11-01

- Public site: https://ariston-michael.github.io — HTTP 200, legacy welcome page.
- Pages: `build_type: legacy`, source branch `main`, path `/`, HTTPS enforced, no custom domain.
- Remote main: `3c1e928a80432e1fc54cfdeda5907b66546ec27a`; local main is intentionally untouched at `b571ccce0832dc6727dc6558fe93826f71f52c1d`.
- No open PR existed at initial inspection. This preparation may create a draft review PR; it must not be merged without explicit approval.
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

The deployment path is prepared and locally syntax/guard checked, not executed. Production Pages remains legacy until approval. Physical-device/assistive-technology and actual browser-toolbar zoom checks require human equipment/access; the validation report distinguishes executed emulation, browser zoom attempts and unavailable browsers. Optional screenshots/live demos and unverified Chicken Shooter URLs remain honest content TODOs, not fabricated links.

Official workflow guidance: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
