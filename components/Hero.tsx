import { githubUrl, linkedInUrl } from "@/lib/content";
import { ResumeLink } from "./ResumeLink";
import { PlanetIllustration } from "./PlanetIllustration";
import { MotionToggle } from "./MotionToggle";
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-stage">
        <div className="hero-stage-inner shell">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> SEEKING SUMMER 2027 INTERNSHIPS
            </p>
            <h1 id="hero-title">
              Ariston
              <br />
              <span>Michael</span>
              <span className="hero-period">.</span>
            </h1>
            <p className="hero-role">
              Computer science. Cloud computing.
              <br />
              <span>A little curiosity beyond the atmosphere.</span>
            </p>
            <p className="hero-description">
              I’m a Computer Science student at Sheridan College, exploring
              software engineering through gesture interaction, energy systems,
              and games.
            </p>
            <div className="hero-actions flex flex-wrap gap-3">
              <a className="button button-primary" href="#projects">
                Explore my projects <span aria-hidden="true">↗</span>
              </a>
              <a className="button button-secondary" href={githubUrl}>
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="hero-links">
              <ResumeLink />
              <a href={linkedInUrl}>LinkedIn ↗</a>
              <a href="#contact">Let’s connect ↗</a>
              <a href="#experience">Experience ↓</a>
            </div>
          </div>
          <PlanetIllustration />
          <div className="hero-bottom">
            <a className="skip-cinema" href="#projects">
              Skip cinematic experience <span aria-hidden="true">↓</span>
            </a>
            <MotionToggle />
            <span className="scene-progress" aria-hidden="true">
              <span /> SCROLL TO APPROACH
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
