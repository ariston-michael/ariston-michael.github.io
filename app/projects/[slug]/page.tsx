import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { socialImage } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { Starfield } from "@/components/Starfield";
import { ProjectVisual } from "@/components/ProjectVisual";
import { ResumeLink } from "@/components/ResumeLink";
import { Footer } from "@/components/Footer";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects
    .filter((project) => project.study)
    .map((project) => ({ slug: project.id }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug && item.study);
  if (!project) return {};
  const title = `${project.name} | Ariston Michael`;
  const url = `/projects/${project.id}/`;
  return {
    title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: project.description,
      url,
      images: [socialImage],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
      images: [socialImage.url],
    },
  };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  if (!project?.study) notFound();
  const related = projects.filter((item) => item.study && item.id !== slug);
  return (
    <div className="site" id="top">
      <Starfield />
      <SiteHeader home={false} />
      <main
        id="main"
        className={`case-study shell project-${project.id}`}
        tabIndex={-1}
      >
        <Link className="back-link" href="/#projects" prefetch={false}>
          ← All projects
        </Link>
        <div className="study-heading">
          <p className="eyebrow">PROJECT NOTES / {project.category}</p>
          <h1>{project.name}</h1>
          <p className="study-headline">{project.study.headline}</p>
          <p className="project-distinction">{project.distinction}</p>
        </div>
        <ProjectVisual id={project.id} />
        <section className="study-overview" aria-labelledby="overview-title">
          <div>
            <p className="eyebrow">01 / OVERVIEW</p>
            <h2 id="overview-title">
              The project <span>at a glance.</span>
            </h2>
          </div>
          <div>
            <p className="section-copy">{project.study.overview}</p>
            <ul
              className="tech-list flex flex-wrap gap-2"
              aria-label="Technologies and project attributes"
            >
              {project.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </div>
        </section>
        <section className="study-features" aria-labelledby="features-title">
          <p className="eyebrow">02 / DOCUMENTED SCOPE</p>
          <h2 id="features-title">
            A closer <span>look.</span>
          </h2>
          <div className="feature-grid">
            {project.study.features.map((feature, index) => (
              <article key={feature.title}>
                <span className="project-number">0{index + 1}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>
        <aside className="study-boundary" aria-labelledby="status-title">
          <span className="panel-icon" aria-hidden="true">
            ✦
          </span>
          <div>
            <h2 id="status-title">Scope & evidence.</h2>
            <p>{project.study.boundary}</p>
            <p>
              Live demos and screenshots are not yet available. The artwork
              above is an original concept illustration.
            </p>
            <div className="study-resources">
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Source on GitHub <span aria-hidden="true">↗</span>
                </a>
              )}
              <ResumeLink />
            </div>
          </div>
        </aside>
        <nav className="related-projects" aria-label="More project notes">
          <p className="eyebrow">CONTINUE EXPLORING</p>
          {related.map((item) => (
            <a
              className="button button-secondary"
              key={item.id}
              href={`/projects/${item.id}/`}
            >
              {item.name} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
      </main>
      <Footer home={false} />
    </div>
  );
}
