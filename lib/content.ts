// Personal claims come exclusively from docs/ABOUT_ME.md.
export const githubUrl = "https://github.com/ariston-michael";
export const linkedInUrl = "https://www.linkedin.com/in/ariston-michael/";
export const email = "ariston.pmichael@gmail.com";
// Verified 2026-11-01: Drive metadata and signed-out Chrome viewer both confirmed this PDF.
export const resumeUrl =
  "https://drive.google.com/file/d/12eRwVk3GQKjr0FVYOY-IFkmr66rd0er_/view";
export type Project = {
  id: string;
  name: string;
  category: string;
  distinction: string;
  description: string;
  technologies: readonly string[];
  todo: string;
  repositoryUrl?: string;
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
    repositoryUrl: "https://github.com/ariston-michael/BearHacks-2026",
    name: "AirControl",
    category: "Human–computer interaction",
    distinction: "BearHacks 2026 · Top 10",
    description:
      "Real-time gesture-based desktop control with six MVP gestures, MediaPipe hand tracking, and user/device calibration.",
    technologies: ["Electron", "MediaPipe", "TensorFlow", "nut-js"],
    todo: "Live demo and screenshots: TODO verify.",
    study: {
      headline: "A different way to interact.",
      overview:
        "AirControl is a real-time gesture control system using MediaPipe hand tracking for cursor navigation and desktop interaction. Six MVP gestures and user/device calibration support the interaction experience.",
      features: [
        {
          title: "Gesture interaction",
          description:
            "Six MVP gestures support cursor navigation and desktop interaction using Electron, MediaPipe, TensorFlow, and nut-js.",
        },
        {
          title: "Calibration",
          description:
            "User/device calibration addresses recognition and latency differences across hardware and allows recalibration when gesture accuracy degrades.",
        },
        {
          title: "Iteration through interaction data",
          description:
            "TensorFlow gesture-interaction data identified usability issues and informed more intuitive alternatives for two of the six gestures for future iterations.",
        },
      ],
      boundary:
        "BearHacks 2026 Top 10. Scope and gesture counts are documented in the verified resume; performance benchmarks, screenshots, and live demo still require verification.",
    },
  },
  {
    id: "energy",
    repositoryUrl: "https://github.com/ariston-michael/Seneca-Energy-Hackathon",
    name: "Seneca Energy",
    category: "Energy & geospatial",
    distinction: "Hackathon finalist",
    description:
      "A GIS-based microgrid opportunity-mapping platform ranking facilities by outage risk, solar potential, and facility criticality.",
    technologies: ["Python", "React", "TypeScript", "ArcGIS Online"],
    todo: "Live demo and screenshots: TODO verify.",
    study: {
      headline: "Energy decisions, with spatial context.",
      overview:
        "A hackathon finalist platform combining Python facility-data processing with a React/TypeScript dashboard and ArcGIS Online maps to identify microgrid deployment candidates.",
      features: [
        {
          title: "Facility assessment",
          description:
            "Python processes facility data to support GIS-based microgrid opportunity mapping.",
        },
        {
          title: "Microgrid recommendations",
          description:
            "The React/TypeScript dashboard displays calculated scores and highlights strong candidates for microgrid deployment.",
        },
        {
          title: "Risk ranking & mapping",
          description:
            "Locations are ranked by outage risk, solar potential, and facility criticality, with ArcGIS Online supplying interactive mapping.",
        },
      ],
      boundary:
        "Seneca Energy Hackathon finalist. Ranking factors and stack are verified in the resume; evaluation metrics, screenshots, and live demo are not yet verified.",
    },
  },
  {
    id: "fireguard",
    repositoryUrl: "https://github.com/ariston-michael/fireguard",
    name: "FireGuard XR",
    category: "Wildfire intelligence",
    distinction: "Full-stack project · February 2026",
    description:
      "A full-stack wildfire intelligence platform integrating 8+ external APIs for risk monitoring and AI-assisted analysis, with a 3D ember simulation.",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "Docker",
      "Three.js",
      "React Three Fiber",
    ],
    todo: "Live demo and screenshots: TODO verify.",
    study: {
      headline: "Wildfire intelligence, in context.",
      overview:
        "FireGuard XR is a full-stack wildfire intelligence platform using Python/FastAPI and React/TypeScript. Its resume-documented implementation combines risk monitoring, AI-assisted analysis, external data integrations, and a 3D wildfire simulation.",
      features: [
        {
          title: "External data integrations",
          description:
            "The platform integrates data from 8+ external APIs for wildfire risk monitoring and AI-assisted analysis. Individual providers are not named in the source resume.",
        },
        {
          title: "Full-stack implementation",
          description:
            "Python and FastAPI support the application alongside a React/TypeScript frontend. Docker is included in the verified project stack.",
        },
        {
          title: "Wind-driven ember simulation",
          description:
            "A 3D simulation built with Three.js and React Three Fiber models wind-driven ember movement and visualizes how fire risk spreads across an area.",
        },
      ],
      boundary:
        "Project dated February 2026 in the resume. API count, stack, and simulation scope are source-supported; scientific validation, prediction accuracy, external provider names, screenshots, and live demo are not verified.",
    },
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
  {
    title: "Languages",
    items: [
      "Python",
      "C/C++",
      "TypeScript",
      "Java",
      "C#",
      "JavaScript",
      "SQL",
      "HTML",
      "CSS",
      "Bash",
    ],
  },
  {
    title: "Frameworks & libraries",
    items: ["React", "Node.js", "FastAPI", "Flask", "Django", ".NET", "Spring"],
  },
  {
    title: "ML & data",
    items: [
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Vertex AI",
      "Gemini API",
      "ResNet",
      "LLM prompting",
      "RAG",
      "Spatial data / GIS",
    ],
  },
  {
    title: "Databases & pipelines",
    items: [
      "PostgreSQL",
      "MySQL",
      "Firestore",
      "Google Sheets data pipelines",
      "Azure Data Studio",
    ],
  },
  {
    title: "Cloud & platforms",
    items: ["Firebase", "Google Cloud Platform", "AWS", "Docker", "Linux"],
  },
  {
    title: "Developer tools",
    items: ["Git", "GitHub", "Jupyter Notebook", "Postman"],
  },
] as const;

export type Experience = {
  organization: string;
  role: string;
  date: string | null;
  location?: string;
  details?: readonly string[];
  technologies?: readonly string[];
};
export const experience: readonly Experience[] = [
  {
    organization: "Spindle Strategy",
    role: "Software Developer Intern",
    date: "Apr – Aug 2026",
    location: "Toronto, ON",
    details: [
      "Built a strategic planning web application on Google Cloud Platform, using Google Apps Script and JavaScript to automate a manual consulting process. The resume reports approximately 20× lower processing time and cost, with report generation reduced from months to weeks.",
      "Created a three-report internal review workflow and refined Vertex AI outputs using historical reports, reviewer feedback, and prompt improvements. Redesigned the interface for clients and internal reviewers.",
    ],
    technologies: [
      "Google Cloud Platform",
      "Google Apps Script",
      "JavaScript",
      "Vertex AI",
    ],
  },
  { organization: "Sheridan College", role: "Peer Mentor", date: null },
  {
    organization: "Tennis Canada",
    role: "Court Control Lead",
    date: "2025 & 2026",
  },
  { organization: "GDG Sheridan", role: "Tech team involvement", date: null },
];

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
