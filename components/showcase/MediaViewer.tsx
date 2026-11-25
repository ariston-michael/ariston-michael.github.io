"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { MediaSource, ShowcaseMedia } from "./data";
import shared from "./shared.module.css";
import styles from "./MediaViewer.module.css";

/** Figure with a selectable strip of authentic stills and an optional clip. */
export function MediaViewer({
  media,
  source,
  projectName,
}: {
  media: readonly ShowcaseMedia[];
  source?: MediaSource;
  projectName: string;
}) {
  const [active, setActive] = useState(0);
  const captionId = useId();
  const current = media[active];

  return (
    <figure className={styles.viewer} aria-labelledby={captionId}>
      <div
        className={`${shared.frame} ${styles.stage}`}
        style={{ aspectRatio: `${media[0].width} / ${media[0].height}` }}
      >
        {current.kind === "video" ? (
          <video
            key={current.src}
            className={styles.media}
            controls
            muted
            playsInline
            preload="none"
            poster={current.poster}
            width={current.width}
            height={current.height}
            aria-label={current.label}
          >
            <source src={current.src} type="video/mp4" />
            <a href={current.src}>Download the {projectName} demo excerpt (MP4)</a>
          </video>
        ) : (
          <Image
            key={current.src}
            className={`${styles.media} ${styles.contain}`}
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="(min-width: 1024px) 680px, 100vw"
          />
        )}
        {current.kind === "video" && (
          <span className={styles.badge} aria-hidden="true">
            Demo · {current.duration}
          </span>
        )}
      </div>

      {media.length > 1 && (
        <ul className={`${styles.strip} media-thumbnails`} aria-label={`${projectName} media`}>
          {media.map((item, index) => {
            const thumb = item.kind === "video" ? item.poster : item.src;
            const label =
              item.kind === "video"
                ? `Play view: ${item.label}`
                : `Still ${index}: ${item.caption}`;
            return (
              <li key={item.src}>
                <button
                  type="button"
                  className={styles.thumb}
                  aria-pressed={index === active}
                  aria-label={label}
                  onClick={() => setActive(index)}
                >
                  <Image
                    src={thumb}
                    alt=""
                    width={160}
                    height={96}
                    loading="lazy"
                    className={styles.thumbImage}
                  />
                  {item.kind === "video" && (
                    <span className={styles.play} aria-hidden="true">
                      ▶
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {source?.pendingOwnerReview && <p className={styles.review}>Media review pending: confirm map-tile attribution and permission for the forest photograph before publication.</p>}

      <noscript><p className={styles.staticNote}>Additional stills from the FireGuard XR demo:</p><ul className={styles.staticStills}>{media.filter(item => item.kind === "image").map(item => <li key={item.src}><a href={item.src}>{item.caption}</a></li>)}</ul></noscript>

      <figcaption id={captionId} className={styles.caption}>
        <span className={styles.index} aria-hidden="true">
          FIG. {String(active + 1).padStart(2, "0")}
        </span>
        <span>
          {current.caption}
          {source && <span className={styles.credit}> {source.credit}</span>}
        </span>
      </figcaption>
    </figure>
  );
}
