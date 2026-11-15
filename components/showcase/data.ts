// Showcase media and hackathon records.
// Project facts are reused from lib/content.ts (sourced from docs/ABOUT_ME.md).
// Every media entry must have a matching row in docs/MEDIA_MANIFEST.md.
import { githubUrl, projects, type Project } from "@/lib/content";

/** Owner-supplied Devpost profile. Automated fetches return HTTP 403, so its
 * submissions could not be verified by the agent; see docs/MEDIA_MANIFEST.md. */
export const devpostProfileUrl = "https://devpost.com/ariston-michael";

export type MediaStill = {
  kind: "image";
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};

export type MediaClip = {
  kind: "video";
  src: string;
  poster: string;
  width: number;
  height: number;
  /** Visible duration label, e.g. "0:30". */
  duration: string;
  label: string;
  caption: string;
};

export type ShowcaseMedia = MediaStill | MediaClip;

export type MediaSource = {
  /** Short provenance shown under the figure. */
  credit: string;
  /** Owner review is still required before treating the media as approved. */
  pendingOwnerReview: boolean;
};

export type ShowcaseEntry = {
  project: Project;
  stage: string;
  /** Primary role/claim boundary statement shown in the spec table. */
  status: string;
  media: readonly ShowcaseMedia[];
  mediaSource?: MediaSource;
  /** Schematic shown when no authentic media is available. */
  sketch: "hand" | "grid" | "ember" | "wave";
};

const byId = (id: string) => {
  const project = projects.find((entry) => entry.id === id);
  if (!project) throw new Error(`Unknown project: ${id}`);
  return project;
};

const fireguardBase = "/media/projects/fireguard-xr";

export const showcaseEntries: readonly ShowcaseEntry[] = [
  {
    project: byId("aircontrol"),
    stage: "01",
    status: "BearHacks 2026 · Top 10",
    media: [],
    sketch: "hand",
  },
  {
    project: byId("energy"),
    stage: "02",
    status: "Seneca Energy Hackathon · Finalist",
    media: [],
    sketch: "grid",
  },
  {
    project: byId("fireguard"),
    stage: "03",
    status: "Full-stack project · February 2026",
    sketch: "ember",
    mediaSource: {
      credit:
        "Frames and excerpt from Ariston Michael's own FireGuard XR demo recording (8 March 2026).",
      pendingOwnerReview: true,
    },
    media: [
      {
        kind: "video",
        src: `${fireguardBase}/fireguard-demo-1280.mp4`,
        poster: `${fireguardBase}/fireguard-dashboard-1600.jpg`,
        width: 1280,
        height: 758,
        duration: "0:30",
        label: "FireGuard XR demo excerpt, 30 seconds, no audio",
        caption:
          "Demo excerpt: a location loads, threat detection raises an alert, the evacuation map draws its spread radius, then the forecast and analytics panels.",
      },
      {
        kind: "image",
        src: `${fireguardBase}/fireguard-dashboard-1600.jpg`,
        width: 1600,
        height: 948,
        alt: "FireGuard XR dashboard showing a location search bar, current conditions, a medium wildfire-risk card, a 3D forest simulation with glowing embers and an evacuation map with a shaded spread radius around Kitchener, Ontario.",
        caption: "Command dashboard: conditions, 3D simulation and evacuation map.",
      },
      {
        kind: "image",
        src: `${fireguardBase}/fireguard-simulation-1120.jpg`,
        width: 1120,
        height: 640,
        alt: "Close-up of the FireGuard XR 3D wildfire simulation: low-poly trees on dark terrain with clusters of orange ember particles drifting across the scene.",
        caption: "3D simulation of wind-driven ember movement.",
      },
      {
        kind: "image",
        src: `${fireguardBase}/fireguard-forecast-analysis-1600.jpg`,
        width: 1600,
        height: 724,
        alt: "FireGuard XR forecast cards with daily fire-risk bars above an AI analysis panel containing evacuation recommendations and water-contamination warnings.",
        caption: "Forecast risk and AI-assisted analysis panel.",
      },
      {
        kind: "image",
        src: `${fireguardBase}/fireguard-analytics-1600.jpg`,
        width: 1600,
        height: 355,
        alt: "FireGuard XR analytics row with 24-hour temperature, humidity and wind-speed charts and a predicted fire-spread bar chart.",
        caption: "Analytics: 24-hour conditions and predicted spread.",
      },
    ],
  },
];

export type HackathonRecord = {
  event: string;
  result: string;
  project: Project;
  /** Owner-approved event photo; omitted until one is supplied. */
  photo?: { src: string; width: number; height: number; alt: string; credit: string };
  sketch: ShowcaseEntry["sketch"];
};

export const hackathonRecords: readonly HackathonRecord[] = [
  {
    event: "BearHacks 2026",
    result: "Top 10",
    project: byId("aircontrol"),
    sketch: "hand",
  },
  {
    event: "Seneca Energy Hackathon",
    result: "Finalist",
    project: byId("energy"),
    sketch: "grid",
  },
];

export type GameRecording = {
  src: string;
  poster: string;
  width: number;
  height: number;
  duration: string;
};

export const chickenShooter = {
  project: byId("chicken"),
  /** No gameplay recording was found in the workspace on 2026-11-14. */
  recording: undefined as GameRecording | undefined,
  /** No public, verified Roblox experience URL exists yet. */
  launchUrl: undefined as string | undefined,
};

export { githubUrl };
