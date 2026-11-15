import type { Metadata } from "next";
import {
  GameExperience,
  HackathonGallery,
  ProjectShowcase,
} from "@/components/showcase";

// Integration preview for feature/project-showcase. Not linked, not in the
// sitemap and excluded from indexing. Remove once the components are placed
// on the homepage (see docs/SHOWCASE_INTEGRATION.md).
export const metadata: Metadata = {
  title: "Showcase preview",
  robots: { index: false, follow: false },
};

export default function ShowcasePreview() {
  return (
    <main id="main" tabIndex={-1} style={{ background: "#070b16", minHeight: "100vh" }}>
      <h1
        style={{
          width: "min(1200px, 100% - 2 * clamp(16px, 5vw, 48px))",
          margin: "0 auto",
          paddingTop: 48,
          color: "#949db0",
          font: "500 0.75rem/1.4 ui-monospace, monospace",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        Project showcase · integration preview
      </h1>
      <ProjectShowcase />
      <HackathonGallery />
      <GameExperience />
    </main>
  );
}
