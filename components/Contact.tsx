import { ResumeLink } from "./ResumeLink";
import { email, githubUrl, linkedInUrl } from "@/lib/content";
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
          <br className="hidden md:block" /> Let’s connect about the next
          opportunity.
        </p>
        <div className="contact-actions">
          <a className="button button-primary" href={`mailto:${email}`}>
            Send me an email <span aria-hidden="true">↗</span>
          </a>
          <a className="button button-secondary" href={linkedInUrl}>
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a className="button button-secondary" href={githubUrl}>
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="contact-details">
          <a
            href={`mailto:${email}`}
            aria-label={`Email Ariston Michael at ${email}`}
          >
            {email}
          </a>
          <ResumeLink />
        </div>
      </div>
    </section>
  );
}
