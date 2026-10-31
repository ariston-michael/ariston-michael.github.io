import { projects } from "@/lib/content";
import { ProjectCard } from "./ProjectCard";
export function FeaturedProjects() {
  return (
    <section
      id="projects"
      className="section shell"
      aria-labelledby="projects-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / SELECTED WORK</p>
          <h2 id="projects-title">
            Ideas into <span>orbit.</span>
          </h2>
        </div>
        <p>
          Different problems. A shared curiosity
          <br className="hidden md:block" /> for what software can do.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
