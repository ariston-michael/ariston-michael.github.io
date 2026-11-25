// Original shared SVG geometry for the interactive and recovery drawings.
export const rocketModules = [
  { name: "Command module", target: "introduction", caption: "Introduction", y: 0, h: 104, path: "M40 100 L40 75 Q42 39 80 6 Q118 39 120 75 L120 100 Z", detail: "M57 71 H103 M63 80 H97 M72 26 H88 M40 94 H120" },
  { name: "Payload", target: "projects", caption: "Selected work", y: 104, h: 102, path: "M40 2 H120 V98 H40 Z", detail: "M46 8 H114 V90 H46 Z M63 26 H97 V65 H63 Z M70 34 H90 M70 42 H90 M80 65 V86" },
  { name: "Upper stage", target: "experience", caption: "Experience", y: 206, h: 102, path: "M40 2 H120 V98 H40 Z", detail: "M40 13 H120 M40 87 H120 M49 20 V80 M111 20 V80 M65 48 H95 M80 33 V63" },
  { name: "Middle stage", target: "education", caption: "Education / skills", y: 308, h: 106, path: "M40 2 H120 V102 H40 Z", detail: "M40 14 H120 M40 90 H120 M52 28 V77 M60 28 V77 M100 28 V77 M108 28 V77 M73 43 H87 V61 H73 Z" },
  { name: "Lower stage", target: "about", caption: "About / achievements", y: 414, h: 108, path: "M40 2 H120 V102 H40 Z M40 20 L13 78 V107 L40 91 M120 20 L147 78 V107 L120 91", detail: "M40 14 H120 M40 90 H120 M53 26 V78 M107 26 V78 M69 39 H91 V66 H69 Z" },
  { name: "Engine", target: "contact", caption: "Contact", y: 522, h: 84, path: "M40 2 H120 V15 H40 Z M59 15 H101 L113 68 Q80 82 47 68 Z", detail: "M59 25 H101 M56 35 H104 M53 46 H107 M50 57 H110 M66 76 V82 M80 79 V86 M94 76 V82" },
] as const;
