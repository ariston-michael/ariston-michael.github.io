import type { Project } from "@/lib/content";
export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article
      className={`project-card project-${project.id}`}
      aria-labelledby={`project-${project.id}`}
    >
      <div className="project-top">
        <span className="project-number">
          0{index + 1} <span aria-hidden="true">/</span>
        </span>
        <span className="project-category">{project.category}</span>
      </div>
      <div className="project-glyph" aria-hidden="true">
        {["⌁", "⌘", "△", "✳"][index]}
      </div>
      <div className="project-body">
        <p className="project-distinction">{project.distinction}</p>
        <h3 id={`project-${project.id}`}>{project.name}</h3>
        <p className="project-description">{project.description}</p>
        <ul
          className="flex flex-wrap gap-2 tech-list"
          aria-label="Technologies and project attributes"
        >
          {project.technologies.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <p className="project-todo">{project.todo}</p>
      </div>
    </article>
  );
}
