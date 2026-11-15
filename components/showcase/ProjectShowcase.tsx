import { showcaseEntries, type ShowcaseEntry } from "./data";
import { MediaViewer } from "./MediaViewer";
import { Sketch } from "./Sketch";
import shared from "./shared.module.css";
import styles from "./ProjectShowcase.module.css";

function PendingFigure({ entry }: { entry: ShowcaseEntry }) {
  return (
    <figure className={styles.pendingFigure}>
      <div className={`${shared.frame} ${styles.sketchFrame}`}>
        <Sketch variant={entry.sketch} />
        <span className={`${shared.pending} ${styles.pendingTag}`}>
          Screenshots pending owner verification
        </span>
      </div>
      <figcaption className={styles.figcaption}>
        Original schematic illustration — not a product screenshot.
      </figcaption>
    </figure>
  );
}

function ShowcaseArticle({ entry }: { entry: ShowcaseEntry }) {
  const { project } = entry;
  const headingId = `showcase-${project.id}`;
  return (
    <article className={styles.entry} aria-labelledby={headingId}>
      <div className={styles.visual}>
        {entry.media.length > 0 ? (
          <MediaViewer
            media={entry.media}
            source={entry.mediaSource}
            projectName={project.name}
          />
        ) : (
          <PendingFigure entry={entry} />
        )}
      </div>

      <div className={styles.copy}>
        <p className={styles.stage}>
          <span>Project {entry.stage}</span>
          <span aria-hidden="true" className={styles.rule} />
          <span>{project.category}</span>
        </p>
        <h3 id={headingId} className={styles.name}>
          {project.name}
        </h3>
        {project.study && <p className={styles.headline}>{project.study.headline}</p>}
        <p className={styles.description}>
          {project.study?.overview ?? project.description}
        </p>

        <dl className={styles.spec}>
          <div>
            <dt>Recognition</dt>
            <dd>{entry.status}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>
              <ul className={shared.tags} aria-label={`${project.name} technologies`}>
                {project.technologies.map((tech) => (
                  <li key={tech} className={shared.tag}>
                    {tech}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        {project.study && (
          <details className={styles.study}>
            <summary className={styles.studySummary}>
              <span>Case-study notes</span>
              <span className={styles.studyCount} aria-hidden="true">
                {String(project.study.features.length).padStart(2, "0")}
              </span>
            </summary>
            <ol className={styles.features}>
              {project.study.features.map((feature) => (
                <li key={feature.title}>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </li>
              ))}
            </ol>
            <p className={styles.boundary}>
              <span className={styles.boundaryLabel}>Verified scope</span>
              {project.study.boundary}
            </p>
          </details>
        )}

        <div className={styles.actions}>
          <a className={shared.linkPrimary} href={`/projects/${project.id}/`}>
            Read case study
            <span className={shared.srOnly}>: {project.name}</span>
            <span className={shared.arrow} aria-hidden="true">
              →
            </span>
          </a>
          {project.repositoryUrl && (
            <a
              className={shared.link}
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source
              <span className={shared.srOnly}>
                {" "}
                for {project.name} on GitHub (opens in a new tab)
              </span>
              <span className={shared.arrow} aria-hidden="true">
                ↗
              </span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export type ProjectShowcaseProps = {
  /** Section anchor. Defaults to "project-showcase". */
  id?: string;
};

/** Self-contained, scoped project showcase. Server component. */
export function ProjectShowcase({ id = "project-showcase" }: ProjectShowcaseProps) {
  const titleId = `${id}-title`;
  return (
    <section id={id} className={shared.surface} aria-labelledby={titleId}>
      <header className={styles.header}>
        <p className={shared.eyebrow}>Project manifest · Three studies</p>
        <h2 id={titleId} className={shared.title}>
          Selected work, in detail.
        </h2>
        <p className={shared.lede}>
          Gesture interaction, geospatial decisions and wildfire intelligence.
          Three different problems, explored through working software.
        </p>
      </header>
      <div className={styles.list}>
        {showcaseEntries.map((entry) => (
          <ShowcaseArticle key={entry.project.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
