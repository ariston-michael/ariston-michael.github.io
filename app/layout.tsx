import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://ariston-michael.github.io"),
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
  },
  twitter: {
    card: "summary",
    title: "Ariston Michael | Software Engineering Portfolio",
  },
};
export const viewport: Viewport = { themeColor: "#070b16" };
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
