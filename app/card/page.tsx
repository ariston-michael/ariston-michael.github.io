import type { Metadata, Viewport } from "next";
import { AristonCard } from "@/components/card";
import { cardPath, cardProfile } from "@/lib/card";
import { socialImage } from "@/lib/site";

const title = "Ariston Michael | Contact Card · Ariston OS";
const description =
  "Connect with Ariston Michael, Honours Computer Science student at Sheridan College specializing in Cloud Computing. LinkedIn, GitHub, portfolio, email and a downloadable contact card.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: cardPath },
  openGraph: {
    title,
    description,
    url: cardPath,
    type: "profile",
    firstName: cardProfile.givenName,
    lastName: cardProfile.familyName,
    locale: "en_CA",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage.url],
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#20364e",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function CardPage() {
  return <AristonCard />;
}
