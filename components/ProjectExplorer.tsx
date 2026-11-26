"use client";
import { useState } from "react";
import { projects } from "@/lib/content";
import { ProjectVisual } from "./ProjectVisual";
import { WindowBar } from "./OSWindow";
import Image from "next/image";
const filters = ["All projects", "Web & data", "Interactive"] as const;
type Filter = (typeof filters)[number];
export function ProjectExplorer() {
  const [filter, setFilter] = useState<Filter>("All projects");
  const visible = projects.filter(
    (project) =>
      filter === "All projects" ||
      (filter === "Web & data"
        ? ["energy", "fireguard"].includes(project.id)
        : ["aircontrol", "chicken"].includes(project.id)),
  );
  return (
    <section
      id="projects"
      className="os-window explorer"
      aria-labelledby="projects-title"
    >
      <WindowBar title="projects.folder" meta="04 items" />
      <noscript>
        <style>{`.filter-group { display: none; }`}</style>
      </noscript>
      <div className="section-intro">
        <div>
          <p className="eyebrow">01 / SELECTED WORK</p>
          <h2 id="projects-title">Ideas, made real.</h2>
        </div>
        <p>
          A few things I’ve built,
          <br />
          from gestures to geospatial data.
        </p>
      </div>
      <div className="explorer-toolbar">
        <div className="filter-group" role="group" aria-label="Filter projects">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <span className="file-count" role="status">
          {visible.length} projects
        </span>
      </div>
      <div className="project-grid">
        {visible.map((project) => (
          <article
            className={`project-file project-${project.id}`}
            key={project.id}
            aria-labelledby={`title-${project.id}`}
          >
            <div className="file-label">
              <span aria-hidden="true">▤</span> {project.id}.project{" "}
              <span aria-hidden="true">↗</span>
            </div>
            <a
              className="project-preview"
              href={`/projects/${project.id}/`}
              aria-label={`Read ${project.name} case study`}
            >
              {project.id === "fireguard" ? (
                <figure>
                  <Image
                    src="/media/projects/fireguard-xr/fireguard-simulation-1120.jpg"
                    width={1120}
                    height={640}
                    alt="FireGuard XR simulation with low-poly trees and orange wind-driven embers"
                    loading="lazy"
                  />
                  <figcaption>OWNER-CREATED SIMULATION CROP</figcaption>
                </figure>
              ) : (
                <ProjectVisual id={project.id} />
              )}
            </a>
            <div className="project-body">
              <p className="project-distinction">{project.distinction}</p>
              <h3 id={`title-${project.id}`}>
                <a href={`/projects/${project.id}/`}>{project.name}</a>
              </h3>
              <p>{project.description}</p>
              <ul
                className="tech-list"
                aria-label={`${project.name} technologies`}
              >
                {project.technologies.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <div className="project-actions">
                <a href={`/projects/${project.id}/`}>
                  Open case study <span aria-hidden="true">↗</span>
                </a>
                {project.repositoryUrl ? (
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.name} source on GitHub`}
                  >
                    Source ↗
                  </a>
                ) : (
                  <span>Public link pending</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="window-status">
        <span>
          Original concepts are labeled. Verified scope inside each case study.
        </span>
        <span aria-hidden="true">▧</span>
      </div>
    </section>
  );
}
