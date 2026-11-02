import { ProjectVisual } from "./ProjectVisual";
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
      <ProjectVisual id={project.id} />
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
        {project.study ? (
          <a className="project-link" href={`/projects/${project.id}/`}>
            Explore {project.name} <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <p className="project-pending">More details awaiting verification</p>
        )}
        {project.repositoryUrl ? (
          <a
            className="project-source"
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.name} source on GitHub`}
          >
            Source on GitHub <span aria-hidden="true">↗</span>
          </a>
        ) : (
          <p className="project-todo">
            Public project link awaiting verification.
          </p>
        )}
      </div>
    </article>
  );
}
