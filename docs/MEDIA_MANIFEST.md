# Media manifest

Every image or video served by the showcase components must have a row here. Do not add media without source, rights status and owner review state. Reviewed 2026-11-14 on `feature/project-showcase`.

## Sources checked

| Source | Result |
| --- | --- |
| Devpost profile `https://devpost.com/ariston-michael` (owner-supplied) | **Not verified.** The automated fetcher received HTTP 403, and a browser-impersonating retry was declined as bypassing the site's block. No submission titles, URLs, thumbnails, prizes or event photos were taken from Devpost. The profile link is shown as owner-supplied. |
| GitHub `ariston-michael` public repositories (REST API) | `BearHacks-2026`, `Seneca-Energy-Hackathon` and `fireguard` contain only framework boilerplate images (Electron/Vite/React logos, app icons, a Vite template hero). None are product screenshots, so none were used. |
| Owner's local hackathon demo folder | `FireGuardXR.mov` is a genuine owner screen recording of the FireGuard XR app. Two `WasteWise` recordings also exist, but WasteWise is not in `ABOUT_ME.md` and was not used. |
| Owner's local and iCloud media search | **No Chicken Shooter gameplay recording was found.** The most recent phone screen recording (2026-11-09) shows a third-party LinkedIn post and was rejected. |

## Assets in the repository

All assets are derived from one source recording. Source: `FireGuardXR.mov`, captured by the owner on 2026-03-08, HEVC 3024×1792, 97.6 s, 166.7 MB, SHA-256 prefix `93e53e5b0fe8a34d`. Stills were extracted frame-accurately with AVFoundation, cropped with `sips` and encoded as JPEG (quality ≈80). The excerpt was re-encoded as H.264 High at about 1.1 Mbps, 30 fps, with no audio track and fast-start enabled.

| Path under `public/` | Source time | Size | SHA-256 prefix | Content |
| --- | --- | --- | --- | --- |
| `media/projects/fireguard-xr/fireguard-demo-1280.mp4` | 0:06–0:36 | 1280×758, 30 s, 3.84 MB | `bb9b4f231ba72f9b` | Location load, alert, evacuation map, forecast and analytics |
| `media/projects/fireguard-xr/fireguard-dashboard-1600.jpg` | 0:10, full frame | 1600×948, 229 KB | `c80179610854b87c` | Dashboard; also the video poster |
| `media/projects/fireguard-xr/fireguard-simulation-1120.jpg` | 0:10, crop of the 3D panel | 1120×640, 45 KB | `210c5c88324b2167` | Ember simulation close-up |
| `media/projects/fireguard-xr/fireguard-forecast-analysis-1600.jpg` | 0:58, crop | 1600×724, 130 KB | `cef5e891a2f0fdca` | Forecast cards and AI analysis panel |
| `media/projects/fireguard-xr/fireguard-analytics-1600.jpg` | 1:14, crop | 1600×355, 62 KB | `0c08137e2db25530` | Analytics charts |

### Rights and review status: **pending owner review**

- The recording shows the owner's own application. Reuse for the owner's portfolio is assumed reasonable but has **not** been explicitly confirmed. `mediaSource.pendingOwnerReview` is `true`.
- The app UI shows **map tiles** with a small in-frame attribution, but the provider is not identified here. It also shows a **dimmed forest background photograph** of unknown origin. The owner should confirm both may appear in a portfolio, or replace them.
- The recording's last section (from about 1:20) shows third-party news thumbnails, including photographs of public figures. These were **deliberately excluded**: no still or clip time range includes them.
- The UI shows a "94% prediction confidence / model accuracy" readout and a named AI provider. The portfolio copy does **not** repeat either as a claim, because `ABOUT_ME.md` does not verify them.

## Placeholders (original artwork, not media)

`components/showcase/Sketch.tsx` draws original schematic line drawings: a hand-landmark wireframe, ranked map sites, an ember field and wave rings. Every use is visibly captioned as an illustration, "not a product screenshot", "not an event photo" or "not gameplay footage", and paired with a dashed "pending" tag. They stand in for:

- AirControl product screenshots (pending)
- Seneca Energy product screenshots (pending)
- BearHacks 2026 and Seneca Energy Hackathon event photos (pending)
- Chicken Shooter gameplay recording (pending)

## Adding owner-approved media later

1. Put optimised files under `public/media/projects/<project>/` or `public/media/events/<event>/`. Use JPEG/WebP ≤ 250 KB, video as H.264 MP4 ≤ 5 MB with no audio unless narrated, and include a poster frame.
2. Add a row above with the source URL or file, date, rights basis and checksum.
3. Wire the files in `components/showcase/data.ts`:
   - Project media: add `media` entries.
   - Event photos: set `photo` on the hackathon record.
   - Chicken Shooter: set `chickenShooter.recording` and/or `launchUrl`, using a verified public URL only.
