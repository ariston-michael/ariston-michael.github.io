import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  cardLinks,
  cardProfile,
  portraitPublicPath,
  vCardFileName,
  vCardPath,
} from "@/lib/card";
import {
  PixelAvatar,
  PixelBrand,
  PixelIcon,
  PixelSparkle,
  type IconName,
} from "./PixelArt";
import styles from "./card.module.css";

/**
 * Build-time check: render the owner portrait only when the file is present,
 * so the static export never ships a broken image request.
 */
function hasPortrait() {
  return existsSync(join(process.cwd(), "public", portraitPublicPath));
}

/** Let long addresses wrap after "@" instead of mid-word on 320px screens. */
function breakAfterAt(address: string) {
  const at = address.indexOf("@");
  if (at < 0) return address;
  return (
    <>
      {address.slice(0, at + 1)}
      <wbr />
      {address.slice(at + 1)}
    </>
  );
}

type AristonCardProps = {
  /** Override the portrait URL, or pass null to force the placeholder. */
  portraitSrc?: string | null;
};

export function AristonCard({ portraitSrc }: AristonCardProps = {}) {
  const portrait =
    portraitSrc === undefined
      ? hasPortrait()
        ? portraitPublicPath
        : null
      : portraitSrc;
  const p = cardProfile;

  return (
    <div className={styles.desktop}>
      <div className={styles.decor} aria-hidden="true">
        <PixelSparkle className={`${styles.sparkle} ${styles.s1}`} />
        <PixelSparkle className={`${styles.sparkle} ${styles.s2}`} />
        <PixelSparkle className={`${styles.sparkle} ${styles.s3}`} />
        <PixelSparkle className={`${styles.sparkle} ${styles.s4}`} />
        <PixelIcon name="cloud" className={`${styles.cloud} ${styles.c1}`} />
        <PixelIcon name="cloud" className={`${styles.cloud} ${styles.c2}`} />
        <div className={styles.ghostWindow} />
      </div>

      <main
        id="main"
        className={styles.window}
        aria-labelledby="card-name"
        tabIndex={-1}
      >
        <header className={styles.titlebar}>
          <PixelBrand className={styles.brand} />
          <p className={styles.os}>Ariston&nbsp;OS</p>
          <span className={styles.stripes} aria-hidden="true" />
          <span className={styles.controls} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </header>
        <div className={styles.menubar} aria-hidden="true">
          <span>~/contact.card</span>
          <span className={styles.online}>
            <i /> online
          </span>
        </div>

        <div className={styles.body}>
          <section className={styles.identity}>
            <div className={styles.portraitFrame}>
              {portrait ? (
                // Static export serves images unoptimized; a plain <img> keeps
                // the card free of the image loader.
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className={styles.photo}
                  src={portrait}
                  alt="Portrait of Ariston Michael"
                  width={320}
                  height={320}
                  decoding="async"
                  fetchPriority="high"
                  data-portrait="photo"
                />
              ) : (
                <div
                  className={styles.placeholder}
                  role="img"
                  aria-label="Pixel-art avatar placeholder for Ariston Michael"
                  data-portrait="placeholder"
                >
                  <PixelAvatar className={styles.avatar} />
                </div>
              )}
            </div>

            {!portrait && (
              <p className={styles.portraitLabel}>
                Portrait placeholder · photo to come
              </p>
            )}
            <h1 id="card-name" className={styles.name}>
              {p.fullName}
            </h1>
            <p className={styles.tagline}>{p.tagline}</p>

            <p className={styles.status}>
              <i aria-hidden="true" />
              {p.availability}
            </p>
          </section>

          <nav className={styles.actions} aria-label="Contact Ariston Michael">
            <ul>
              {cardLinks.map((link) => (
                <li key={link.id}>
                  <a
                    className={styles.action}
                    data-action={link.id}
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    <PixelIcon
                      name={link.id as IconName}
                      className={styles.actionIcon}
                    />
                    <span className={styles.actionText}>
                      <span className={styles.actionLabel}>{link.label}</span>
                      <span className={styles.actionDetail}>
                        {link.id === "email"
                          ? breakAfterAt(link.detail)
                          : link.detail}
                      </span>
                    </span>
                    <PixelIcon name="arrow" className={styles.arrow} />
                    {link.external ? (
                      <span className={styles.srOnly}>
                        {" "}
                        (opens in a new tab)
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
            <a
              className={`${styles.action} ${styles.save}`}
              data-action="save"
              href={vCardPath}
              download={vCardFileName}
              type="text/vcard"
            >
              <PixelIcon name="save" className={styles.actionIcon} />
              <span className={styles.actionText}>
                <span className={styles.actionLabel}>Save Contact</span>
                <span className={styles.actionDetail}>
                  Add to iPhone or Android contacts
                </span>
              </span>
              <PixelIcon name="arrow" className={styles.arrow} />
            </a>
          </nav>
          <ul className={styles.facts} aria-label="Education">
            <li>
              <PixelIcon name="cap" className={styles.factIcon} />
              <span>
                {p.degree}, {p.school}
              </span>
            </li>
            <li>
              <PixelIcon name="cloud" className={styles.factIcon} />
              <span>{p.specialization} specialization</span>
            </li>
          </ul>
        </div>

        <footer className={styles.statusbar} aria-hidden="true">
          <span>ariston-michael.github.io/card</span>
          <span>
            ready<b className={styles.cursor}>_</b>
          </span>
        </footer>
      </main>
    </div>
  );
}
