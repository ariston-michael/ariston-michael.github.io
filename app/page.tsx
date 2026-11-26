import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { OSWindow } from "@/components/OSWindow";
import { PixelCompanion } from "@/components/PixelCompanion";
import { ProjectExplorer } from "@/components/ProjectExplorer";
import { ResumeLink } from "@/components/ResumeLink";
import {
  achievements,
  email,
  experience,
  githubUrl,
  linkedInUrl,
  skills,
} from "@/lib/content";

export default function Home() {
  return (
    <div id="top" className="site">
      <SiteHeader />
      <main id="main" className="shell workspace" tabIndex={-1}>
        <div className="desktop-label">
          <p>
            <span aria-hidden="true">⌘</span> ARISTON’S WORKSPACE
          </p>
          <span>Good ideas start with curiosity.</span>
        </div>
        <div className="welcome-grid">
          <OSWindow
            title="hello.world"
            meta="WELCOME"
            className="welcome-window"
          >
            <div className="hero-content">
              <p className="status-label">
                <span />
                Open to Summer 2027 internships
              </p>
              <p className="eyebrow hero-kicker">
                SOFTWARE · CLOUD · CURIOSITY
              </p>
              <h1>
                Ariston
                <br />
                Michael<span>.</span>
              </h1>
              <p className="hero-role">
                Building useful things.
                <br />
                <span>Enjoying the process.</span>
              </p>
              <p className="hero-copy">
                Computer Science student at Sheridan College, specializing in
                Cloud Computing. Welcome to my little corner of the internet.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  Explore my work <span aria-hidden="true">↓</span>
                </a>
                <ResumeLink />
              </div>
              <div className="hero-footnote">
                <span>SHERIDAN COLLEGE / COMPUTER SCIENCE</span>
                <span aria-hidden="true">[ HELLO, WORLD! ]</span>
              </div>
            </div>
          </OSWindow>
          <aside className="welcome-sidebar" aria-label="Workspace notes">
            <OSWindow title="desk.buddy" className="buddy-window">
              <div className="buddy-art">
                <PixelCompanion />
                <span className="pixel-note">
                  a little curiosity goes a long way.
                </span>
              </div>
              <div className="buddy-caption">
                <span className="eyebrow">THE PERSON AT THE KEYBOARD</span>
                <p>
                  Software, people,
                  <br />
                  and the space between.
                </p>
                <a href="#about">
                  A bit about me <span aria-hidden="true">↘</span>
                </a>
              </div>
            </OSWindow>
            <OSWindow title="pinned.note" className="pinned-window">
              <div className="pinned-content">
                <p className="eyebrow">NEXT CHAPTER</p>
                <h2>
                  Let’s build
                  <br />
                  something together.
                </h2>
                <p>Seeking software engineering internships for Summer 2027.</p>
                <a href={`mailto:${email}`}>
                  Get in touch <span aria-hidden="true">↗</span>
                </a>
              </div>
            </OSWindow>
          </aside>
        </div>
        <ProjectExplorer />
        <div className="work-grid">
          <section id="experience" aria-labelledby="experience-title">
            <OSWindow title="experience.log" meta="02">
              <div className="panel-content">
                <p className="eyebrow">02 / EXPERIENCE</p>
                <h2 id="experience-title">Learning by doing.</h2>
                <div className="experience-list">
                  {experience.map((item, index) => (
                    <article
                      key={item.organization}
                      className="experience-entry"
                    >
                      <div className="entry-index" aria-hidden="true">
                        0{index + 1}
                      </div>
                      <div>
                        <p className="entry-date">
                          {item.date ?? "Community involvement"}
                        </p>
                        <h3>{item.role}</h3>
                        <p className="organization">
                          {item.organization}
                          {item.location ? ` · ${item.location}` : ""}
                        </p>
                        {item.details?.map((detail) => (
                          <p className="role-detail" key={detail}>
                            {detail}
                          </p>
                        ))}
                        {item.technologies && (
                          <ul className="tech-list">
                            {item.technologies.map((tech) => (
                              <li key={tech}>{tech}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </OSWindow>
          </section>
          <section id="skills" aria-labelledby="skills-title">
            <OSWindow title="toolkit.config" meta="03">
              <div className="panel-content">
                <p className="eyebrow">03 / SKILLS</p>
                <h2 id="skills-title">My working toolkit.</h2>
                <p className="panel-lead">
                  Tools from my projects and studies. Always room to learn
                  something new.
                </p>
                <div className="skill-groups">
                  {skills.map((group, index) => (
                    <div className="skill-group" key={group.title}>
                      <h3>
                        <span aria-hidden="true">0{index + 1} / </span>
                        {group.title}
                      </h3>
                      <ul className="tech-list">
                        {group.items.map((skill) => (
                          <li key={skill}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </OSWindow>
          </section>
        </div>
        <section id="about" aria-labelledby="about-title">
          <OSWindow title="about.me" meta="04">
            <div className="about-grid">
              <div>
                <p className="eyebrow">04 / A LITTLE CONTEXT</p>
                <h2 id="about-title">Curious by default.</h2>
                <p>
                  From gesture interfaces to wildfire intelligence, I’m
                  interested in how software turns complex problems into useful
                  experiences.
                </p>
                <div className="education" id="education">
                  <h3>Honours Bachelor of Computer Science</h3>
                  <p>Sheridan College · Cloud Computing specialization</p>
                  <p>Expected graduation · April 2028</p>
                </div>
              </div>
              <div id="achievements">
                <h3 className="eyebrow">A FEW MILESTONES</h3>
                {achievements.map((item) => (
                  <a
                    className="achievement"
                    href={item.href}
                    key={item.context}
                  >
                    <span>{item.title}</span>
                    <div>
                      <strong>{item.context}</strong>
                      <p>{item.project}</p>
                    </div>
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </OSWindow>
        </section>
        <section id="contact" aria-labelledby="contact-title">
          <OSWindow title="new.connection" meta="05">
            <div className="contact-layout">
              <div>
                <p className="eyebrow">05 / KEEP IN TOUCH</p>
                <h2 id="contact-title">
                  A good conversation
                  <br />
                  is a great start.
                </h2>
                <p>
                  Have an opportunity, a question, or an idea?
                  <br />
                  I’d love to hear from you.
                </p>
                <a className="email-address" href={`mailto:${email}`}>
                  {email} <span aria-hidden="true">↗</span>
                </a>
              </div>
              <div className="contact-links">
                <a className="button button-primary" href={`mailto:${email}`}>
                  Send an email <span aria-hidden="true">↗</span>
                </a>
                <a className="button" href={linkedInUrl}>
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
                <a className="button" href={githubUrl}>
                  GitHub <span aria-hidden="true">↗</span>
                </a>
                <a className="button" href="/card/">
                  Open contact card <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div className="window-status">
              <span>Thanks for stopping by. Make yourself at home.</span>
              <span aria-hidden="true">:)</span>
            </div>
          </OSWindow>
        </section>
      </main>
      <Footer />
    </div>
  );
}
