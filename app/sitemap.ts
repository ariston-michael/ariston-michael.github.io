import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { siteUrl } from "@/lib/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/` },
    ...projects
      .filter((project) => project.study)
      .map((project) => ({ url: `${siteUrl}/projects/${project.id}/` })),
  ];
}
