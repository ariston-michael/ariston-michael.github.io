import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteUrl, socialImage } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ariston OS | Ariston Michael — Software Portfolio",
  description:
    "Computer Science student at Sheridan College specializing in Cloud Computing. Explore Ariston Michael’s projects and Summer 2027 internship focus.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ariston OS | Ariston Michael — Software Portfolio",
    description:
      "Software, cloud computing, and a curiosity for what’s next. Seeking Summer 2027 internships.",
    url: "/",
    type: "website",
    locale: "en_CA",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    images: [socialImage.url],
    title: "Ariston OS | Ariston Michael — Software Portfolio",
  },
};
export const viewport: Viewport = {
  themeColor: "#20364e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
