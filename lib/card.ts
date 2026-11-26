// Ariston OS NFC contact card: verified facts and vCard generation.
// Every value comes from docs/ABOUT_ME.md. Self-contained on purpose so the card
// survives parallel portfolio refactors; keep it in sync with lib/content.ts.
// No phone number: the owner has not approved publishing one.

export const cardPath = "/card/";
export const vCardPath = "/card/ariston-michael.vcf";
export const vCardFileName = "ariston-michael.vcf";

/** Owner-supplied portrait slot, relative to public/. See docs/CARD_INTEGRATION.md. */
export const portraitPublicPath = "/images/ariston-profile.webp";

export const cardProfile = {
  givenName: "Ariston",
  familyName: "Michael",
  fullName: "Ariston Michael",
  tagline:
    "Computer Science student specializing in Cloud Computing, building full-stack, AI-assisted and cloud software.",
  availability: "Open to Summer 2027 SWE internships",
  degree: "Honours Bachelor of Computer Science",
  school: "Sheridan College",
  specialization: "Cloud Computing",
  email: "ariston.pmichael@gmail.com",
  linkedIn: "https://www.linkedin.com/in/ariston-michael/",
  gitHub: "https://github.com/ariston-michael",
  portfolio: "https://ariston-michael.github.io",
} as const;

export type CardLinkId = "linkedin" | "github" | "portfolio" | "email";

export type CardLink = {
  id: CardLinkId;
  label: string;
  detail: string;
  href: string;
  external: boolean;
};

export const cardLinks: readonly CardLink[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    detail: "in/ariston-michael",
    href: cardProfile.linkedIn,
    external: true,
  },
  {
    id: "github",
    label: "GitHub",
    detail: "@ariston-michael",
    href: cardProfile.gitHub,
    external: true,
  },
  {
    id: "portfolio",
    label: "Visit Portfolio",
    detail: "ariston-michael.github.io",
    // Same origin as the card: open in place so Back returns to the card.
    href: "/",
    external: false,
  },
  {
    id: "email",
    label: "Email",
    detail: cardProfile.email,
    href: `mailto:${cardProfile.email}`,
    external: false,
  },
];

/** RFC 6350 §3.4 text escaping (also valid for vCard 3.0). */
function escapeText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/** Fold content lines at 75 octets with CRLF + space, never splitting a UTF-8 sequence. */
function fold(line: string) {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = "";
  let size = 0;
  for (const char of line) {
    const bytes = encoder.encode(char).length;
    const limit = parts.length === 0 ? 75 : 74;
    if (size + bytes > limit) {
      parts.push(current);
      current = "";
      size = 0;
    }
    current += char;
    size += bytes;
  }
  parts.push(current);
  return parts.join("\r\n ");
}

/**
 * vCard 3.0: the version iOS Contacts and Android Contacts both import reliably.
 * itemN.X-ABLabel gives labelled URLs on Apple devices; other clients ignore it.
 */
export function buildVCard() {
  const p = cardProfile;
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeText(p.familyName)};${escapeText(p.givenName)};;;`,
    `FN:${escapeText(p.fullName)}`,
    `ORG:${escapeText(p.school)}`,
    `TITLE:${escapeText(`Computer Science Student, ${p.specialization}`)}`,
    `EMAIL;TYPE=INTERNET,PREF:${p.email}`,
    `item1.URL:${p.portfolio}`,
    "item1.X-ABLabel:Portfolio",
    `item2.URL:${p.linkedIn}`,
    "item2.X-ABLabel:LinkedIn",
    `item3.URL:${p.gitHub}`,
    "item3.X-ABLabel:GitHub",
    `NOTE:${escapeText(`${p.degree}, ${p.school}. Specialization: ${p.specialization}.`)}`,
    "END:VCARD",
  ];
  return `${lines.map(fold).join("\r\n")}\r\n`;
}
