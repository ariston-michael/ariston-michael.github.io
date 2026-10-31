import { githubUrl } from "@/lib/content";
export function Contact() {
  return (
    <section
      id="contact"
      className="section shell"
      aria-labelledby="contact-title"
    >
      <div className="contact-panel">
        <p className="eyebrow">05 / NEXT TRANSMISSION</p>
        <h2 id="contact-title">
          Let’s build
          <br />
          <span>something meaningful.</span>
        </h2>
        <p>
          I’m seeking software engineering internships for Summer 2027.
          <br className="hidden md:block" /> Explore my work or find me on
          GitHub.
        </p>
        <a className="button button-primary" href={githubUrl}>
          Find me on GitHub <span aria-hidden="true">↗</span>
        </a>
        <div className="contact-pending">
          <p>
            Email <span>Address not yet available</span>
          </p>
          <p>
            Resume <span>PDF not yet available</span>
          </p>
          <p>
            LinkedIn <span>Profile awaiting verification</span>
          </p>
        </div>
      </div>
    </section>
  );
}
