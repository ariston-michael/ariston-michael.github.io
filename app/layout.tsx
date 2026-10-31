import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteUrl, socialImage } from "@/lib/site";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ariston Michael | Software Engineering Portfolio",
  description:
    "Computer Science student at Sheridan College specializing in Cloud Computing. Explore Ariston Michael’s projects and Summer 2027 internship focus.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ariston Michael | Software Engineering Portfolio",
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
    title: "Ariston Michael | Software Engineering Portfolio",
  },
};
export const viewport: Viewport = {
  themeColor: "#070b16",
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
        <noscript>
          <style>{`*, *::before, *::after { animation: none !important; } html { scroll-behavior: auto; } .motion-toggle { display: none !important; }`}</style>
        </noscript>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
