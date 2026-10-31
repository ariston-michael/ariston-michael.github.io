// Personal claims come exclusively from docs/ABOUT_ME.md.
export const githubUrl = "https://github.com/ariston-michael";
export const linkedInUrl = "https://www.linkedin.com/in/ariston-michael/";
export const email = "ariston.pmichael@gmail.com";
// Enable only after the exact supplied source has been reviewed and copied unchanged.
export const resumeUrl: string | null = null;
export type Project = {
  id: string;
  name: string;
  category: string;
  distinction: string;
  description: string;
  technologies: readonly string[];
  todo: string;
  study?: {
    headline: string;
    overview: string;
    features: readonly { title: string; description: string }[];
    boundary: string;
  };
};
export const projects: readonly Project[] = [
  {
    id: "aircontrol",
    name: "AirControl",
    category: "Human–computer interaction",
    distinction: "BearHacks 2026 · Top 10",
    description:
      "Gesture-based computer interaction with calibration and iterative gesture changes driven by collected interaction data.",
    technologies: ["Electron", "MediaPipe", "TensorFlow", "nut-js"],
    todo: "Repository and demo links: TODO verify.",
    study: {
      headline: "A different way to interact.",
      overview:
        "AirControl explores gesture-based computer interaction. Its documented implementation includes calibration and iterative gesture changes driven by collected interaction data.",
      features: [
        {
          title: "Gesture interaction",
          description:
            "Computer interaction through gestures, with Electron, MediaPipe, TensorFlow, and nut-js in the project’s technology stack.",
        },
        {
          title: "Calibration",
          description: "Calibration is part of the interaction experience.",
        },
        {
          title: "Iteration through interaction data",
          description:
            "Collected interaction data informed iterative changes to gestures.",
        },
      ],
      boundary:
        "BearHacks 2026 Top 10. Performance measurements, implementation diagrams, and individual contribution details are not yet verified.",
    },
  },
  {
    id: "energy",
    name: "Seneca Energy Hackathon project",
    category: "Energy & geospatial",
    distinction: "Hackathon finalist",
    description:
      "A platform for facility assessment and microgrid recommendations, with risk ranking and mapping.",
    technologies: ["Python", "React", "TypeScript", "ArcGIS Online"],
    todo: "Public name, repository and demo links: TODO verify.",
    study: {
      headline: "Energy decisions, with spatial context.",
      overview:
        "A hackathon finalist platform for facility assessment and microgrid recommendations, combining risk ranking and mapping.",
      features: [
        {
          title: "Facility assessment",
          description:
            "The platform supports assessing facilities in the context of energy planning.",
        },
        {
          title: "Microgrid recommendations",
          description:
            "Microgrid recommendation is part of the platform’s documented scope.",
        },
        {
          title: "Risk ranking & mapping",
          description:
            "Risk ranking and mapping are included, with Python, React, TypeScript, and ArcGIS Online in the technology stack.",
        },
      ],
      boundary:
        "Hackathon finalist. The final public name, recommendation methodology, evaluation results, and individual contribution details are not yet verified.",
    },
  },
  {
    id: "fireguard",
    name: "FireGuard XR",
    category: "Individual project",
    distinction: "Python + FastAPI",
    description:
      "An individual project built with Python and FastAPI. Detailed features are awaiting verification.",
    technologies: ["Python", "FastAPI"],
    todo: "Feature details, repository and demo links: TODO verify.",
  },
  {
    id: "chicken",
    name: "Chicken Shooter",
    category: "Game development",
    distinction: "Built on Roblox",
    description:
      "A solo wave-based Roblox game with custom 3D assets, scoring, and multi-device controls.",
    technologies: ["Roblox", "3D assets", "Multi-device controls"],
    todo: "Public link and cooperative mode status: TODO verify.",
    study: {
      headline: "One player. Wave after wave.",
      overview:
        "Chicken Shooter is a Roblox game with solo wave-based play, custom 3D assets, scoring, and multi-device controls.",
      features: [
        {
          title: "Solo wave-based play",
          description: "Solo play is organized around waves.",
        },
        {
          title: "Custom 3D assets & scoring",
          description: "The game includes custom 3D assets and scoring.",
        },
        {
          title: "Multi-device controls",
          description:
            "Controls support multiple devices. Specific device coverage has not yet been verified.",
        },
      ],
      boundary:
        "Cooperative mode status, public game URL, player metrics, and technical implementation details are not yet verified.",
    },
  },
];
export const skills = [
  { title: "Languages", items: ["C++", "Python", "C#", "TypeScript"] },
  { title: "Web & application", items: ["React", "ASP.NET Core"] },
  { title: "Cloud & tools", items: ["AWS / cloud", "SQL / SQLite", "Git"] },
] as const;

export const experience = [
  { organization: "Spindle Strategy", role: "Internship", date: null },
  { organization: "Sheridan College", role: "Peer Mentor", date: null },
  {
    organization: "Tennis Canada",
    role: "Court Control Lead",
    date: "2025 & 2026",
  },
  { organization: "GDG Sheridan", role: "Tech team involvement", date: null },
] as const;

export const achievements = [
  {
    title: "Top 10",
    context: "BearHacks 2026",
    project: "AirControl",
    href: "/projects/aircontrol/",
  },
  {
    title: "Finalist",
    context: "Seneca Energy Hackathon",
    project: "Energy assessment platform",
    href: "/projects/energy/",
  },
] as const;
