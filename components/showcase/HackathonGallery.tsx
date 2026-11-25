import Image from "next/image";
import { devpostProfileUrl, hackathonRecords, type HackathonRecord } from "./data";
import { Sketch } from "./Sketch";
import shared from "./shared.module.css";
import styles from "./HackathonGallery.module.css";

function RecordCard({ record, index }: { record: HackathonRecord; index: number }) {
  const { project } = record;
  const headingId = `hackathon-${project.id}`;
  return (
    <li className={styles.card}>
      <article aria-labelledby={headingId}>
        <figure className={styles.figure}>
          <div className={`${shared.frame} ${styles.media}`}>
            {record.photo ? (
              <Image
                src={record.photo.src}
                alt={record.photo.alt}
                width={record.photo.width}
                height={record.photo.height}
                sizes="(min-width: 768px) 560px, 100vw"
                className={styles.photo}
              />
            ) : (
              <>
                <Sketch variant={record.sketch} />
                <span className={`${shared.pending} ${styles.pendingTag}`}>
                  Event photo pending owner approval
                </span>
              </>
            )}
          </div>
          <figcaption className={styles.caption}>
            {record.photo
              ? record.photo.credit
              : "Original schematic illustration — not an event photo."}
          </figcaption>
        </figure>

        <div className={styles.body}>
          <p className={styles.log}>
            <span>Log {String(index + 1).padStart(2, "0")}</span>
            <span>{record.event}</span>
          </p>
          <p className={styles.result}>{record.result}</p>
          <h3 id={headingId} className={styles.project}>
            {project.name}
          </h3>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.links}>
            <a className={shared.link} href={`/projects/${project.id}/`}>
              Case study
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
    </li>
  );
}

export type HackathonGalleryProps = {
  /** Section anchor. Defaults to "hackathons". */
  id?: string;
};

/** Verified hackathon results with owner-approved media slots. Server component. */
export function HackathonGallery({ id = "hackathons" }: HackathonGalleryProps) {
  const titleId = `${id}-title`;
  return (
    <section id={id} className={shared.surface} aria-labelledby={titleId}>
      <header className={styles.header}>
        <div>
          <p className={shared.eyebrow}>Flight log · Hackathons</p>
          <h2 id={titleId} className={shared.title}>
            Built against the clock.
          </h2>
        </div>
        <p className={shared.lede}>
          A Top 10 placement at BearHacks 2026 and a finalist spot at the
          Seneca Energy Hackathon. Results come from the verified resume; event
          photography will be added once the owner approves it.
        </p>
      </header>

      <ol className={styles.grid}>
        {hackathonRecords.map((record, index) => (
          <RecordCard key={record.project.id} record={record} index={index} />
        ))}
      </ol>

      <p className={styles.more}>
        <a
          className={shared.link}
          href={devpostProfileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Devpost profile
          <span className={shared.srOnly}> (opens in a new tab)</span>
          <span className={shared.arrow} aria-hidden="true">
            ↗
          </span>
        </a>
      </p>
    </section>
  );
}
