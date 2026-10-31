import { githubUrl } from "@/lib/content";
import { PlanetIllustration } from "./PlanetIllustration";
export function Hero() {
  return (
    <section className="hero shell" aria-labelledby="hero-title">
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
          I’m a Computer Science student at Sheridan College, exploring software
          engineering through gesture interaction, energy systems, and games.
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
          <a href="#contact">
            Let’s connect <span aria-hidden="true">↗</span>
          </a>
          <span>
            Resume <span className="todo-inline">PDF not yet available</span>
          </span>
        </div>
      </div>
      <PlanetIllustration />
      <div className="hero-bottom">
        <span>SOFTWARE ENGINEERING PORTFOLIO</span>
        <a href="#projects">
          SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
