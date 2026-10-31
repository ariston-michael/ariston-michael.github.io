// Personal claims come exclusively from docs/ABOUT_ME.md.
export const githubUrl = "https://github.com/ariston-michael";
export type Project = {
  id: string;
  name: string;
  category: string;
  distinction: string;
  description: string;
  technologies: readonly string[];
  todo: string;
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
  },
];
export const skills = [
  { title: "Languages", items: ["C++", "Python", "C#", "TypeScript"] },
  { title: "Web & application", items: ["React", "ASP.NET Core"] },
  { title: "Cloud & tools", items: ["AWS / cloud", "SQL / SQLite", "Git"] },
] as const;
