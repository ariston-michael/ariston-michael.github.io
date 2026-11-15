import { chickenShooter, type GameRecording } from "./data";
import { Sketch } from "./Sketch";
import shared from "./shared.module.css";
import styles from "./GameExperience.module.css";

export type GameExperienceProps = {
  /** Section anchor. Defaults to "play". */
  id?: string;
  /** Overrides for when the owner supplies verified media/links. */
  recording?: GameRecording;
  launchUrl?: string;
};

/**
 * Closing "Ready to play?" moment. Uses a native disclosure so it works with
 * keyboard, assistive tech and without JavaScript. It only offers a launch
 * link when a verified public game URL exists; a recording is labelled as a
 * video preview, never as the playable game.
 */
export function GameExperience({
  id = "play",
  recording = chickenShooter.recording,
  launchUrl = chickenShooter.launchUrl,
}: GameExperienceProps) {
  const { project } = chickenShooter;
  const titleId = `${id}-title`;
  const panelTitleId = `${id}-panel-title`;

  return (
    <section id={id} className={`${shared.surface} ${styles.root}`} aria-labelledby={titleId}>
      <div className={styles.prompt}>
        <p className={shared.eyebrow}>Final stage · Bonus</p>
        <h2 id={titleId} className={styles.question}>
          Ready to play?
        </h2>
        <details className={styles.disclosure}>
          <summary className={styles.yes}>
            <span>Yes</span>
            <span className={shared.arrow} aria-hidden="true">
              →
            </span>
          </summary>

          <div className={styles.panel} role="group" aria-labelledby={panelTitleId}>
            <div className={styles.screen}>
              {recording ? (
                <figure className={styles.figure}>
                  <div className={shared.frame} style={{ aspectRatio: `${recording.width} / ${recording.height}` }}>
                    <video
                      className={styles.video}
                      controls
                      playsInline
                      preload="metadata"
                      poster={recording.poster}
                      width={recording.width}
                      height={recording.height}
                      aria-label={`${project.name} gameplay recording (video preview, ${recording.duration})`}
                    >
                      <source src={recording.src} type="video/mp4" />
                      <a href={recording.src}>Download the gameplay recording (MP4)</a>
                    </video>
                  </div>
                  <figcaption className={styles.caption}>
                    Gameplay recording · {recording.duration}. This is a video
                    preview, not the playable game.
                  </figcaption>
                </figure>
              ) : (
                <figure className={styles.figure}>
                  <div className={`${shared.frame} ${styles.placeholder}`}>
                    <Sketch variant="wave" />
                    <span className={`${shared.pending} ${styles.pendingTag}`}>
                      Gameplay recording pending
                    </span>
                  </div>
                  <figcaption className={styles.caption}>
                    Original schematic illustration — not gameplay footage.
                  </figcaption>
                </figure>
              )}
            </div>

            <div className={styles.info}>
              <p className={styles.platform}>{project.distinction}</p>
              <h3 id={panelTitleId} className={styles.name}>
                {project.name}
              </h3>
              <p className={styles.summary}>{project.description}</p>
              <ul className={shared.tags} aria-label={`${project.name} attributes`}>
                {project.technologies.map((item) => (
                  <li key={item} className={shared.tag}>
                    {item}
                  </li>
                ))}
              </ul>

              {launchUrl ? (
                <div className={styles.actions}>
                  <a
                    className={shared.linkPrimary}
                    href={launchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Launch the game
                    <span className={shared.srOnly}> (opens in a new tab)</span>
                    <span className={shared.arrow} aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </div>
              ) : (
                <p className={styles.status}>
                  <span className={styles.statusLabel}>Status</span>
                  {recording
                    ? "A public play link has not been verified yet, so this page shows the recording only."
                    : "A public play link and gameplay recording have not been verified yet, so this page does not offer a launch button."}
                </p>
              )}

              <div className={styles.actions}>
                <a className={shared.link} href={`/projects/${project.id}/`}>
                  Project notes
                  <span className={shared.srOnly}>: {project.name}</span>
                  <span className={shared.arrow} aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
