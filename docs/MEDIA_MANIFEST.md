# Publication media manifest — 2026-11-14

The owner explicitly authorised publishing owner-created FireGuard XR media in the Stage Separation release request. That approval does not establish reuse permission for third-party map imagery or forest photographs. No such permission was supplied, so the release excludes them rather than guessing attribution or ownership.

## Only FireGuard asset approved for the static publication

| Path under public/ | Provenance | Dimensions / bytes | SHA-256 | Rights decision |
| --- | --- | --- | --- | --- |
| `media/projects/fireguard-xr/fireguard-simulation-1120.jpg` | Existing crop of the owner-created 3D simulation from `FireGuardXR.mov`, source time 0:10 | 1120×640 / 45,366 bytes | `210c5c88324b21672805c25a7bc8635a3c555abd0f8d1fb8b36a1af4271fe967` | Owner authorises publication; visually inspected crop contains rendered low-poly trees and embers, no map tiles, surrounding UI or photographic forest backdrop |

The bytes of this crop are unchanged. Source recording provenance from the supplied feature: 2026-03-08, HEVC 3024×1792, 97.6s, source SHA-256 prefix `93e53e5b0fe8a34d`. This is genuine app media, not Chicken Shooter footage. No scientific accuracy, performance or provider claim is inferred from it.

## Withheld files — removed from public/ and forbidden in out/

| File | Previous SHA-256 prefix | Reason |
| --- | --- | --- |
| `fireguard-demo-1280.mp4` | `bb9b4f231ba72f9b` | Wider recording includes unidentified map imagery and the photographic backdrop |
| `fireguard-dashboard-1600.jpg` | `c80179610854b87c` | Includes both map imagery and unidentified forest photograph |
| `fireguard-forecast-analysis-1600.jpg` | `cef5e891a2f0fdca` | Wider interface/background rights unresolved |
| `fireguard-analytics-1600.jpg` | `0c08137e2db25530` | Wider interface/background rights unresolved |

Removing HTML references alone would leave files downloadable. These four files are deleted from the publication source, the export checker rejects their presence, and browser checks require their URLs to return 404. Historical Git commits are preserved; no history rewrite or claim of erasing earlier review branches is made. Video playback is not part of this release; the viewer capability may be used later with a separately reviewed safe recording.

## Original art and outstanding media

`components/showcase/Sketch.tsx` supplies original labelled schematics for AirControl, Seneca Energy, both hackathon event cards and Chicken Shooter. No real event photos or genuine game recording/public play URL were supplied. No FireGuard media is passed to the game. Devpost remains an owner-supplied profile link with unverified submissions.

Before reintroducing wider FireGuard screenshots/video, identify the map provider and required attribution, establish photographic reuse permission or replace/redact the imagery throughout every included frame, inspect the resulting assets, and record new source times/checksums. Do not restore the withheld filenames or weaken the export guard without a reviewed rights decision.
