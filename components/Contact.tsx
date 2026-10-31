import { githubUrl } from "@/lib/content";
export function Contact() {
  return (
    <section
      id="contact"
      className="section shell"
      aria-labelledby="contact-title"
    >
      <div className="contact-panel">
        <p className="eyebrow">04 / NEXT TRANSMISSION</p>
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
            Email <span>TODO · professional address pending</span>
          </p>
          <p>
            Resume <span>TODO · PDF pending</span>
          </p>
          <p>
            LinkedIn <span>TODO · profile URL pending</span>
          </p>
        </div>
      </div>
    </section>
  );
}
