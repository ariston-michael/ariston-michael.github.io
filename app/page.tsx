import { SiteHeader } from "@/components/SiteHeader";
import { LaunchVehicle } from "@/components/LaunchVehicle";
import { RocketExperience } from "@/components/RocketExperience";
import { ProjectShowcase, HackathonGallery, GameExperience } from "@/components/showcase";
import { ResumeLink } from "@/components/ResumeLink";
import { Footer } from "@/components/Footer";
import { email, experience, githubUrl, linkedInUrl, skills } from "@/lib/content";

export default function Home() {
  return <div id="top" className="site rocket-site">
    <SiteHeader />
    <main id="main" tabIndex={-1}>
      <LaunchVehicle>
        <section id="introduction" className="launch-intro" aria-labelledby="intro-title">
          <p className="eyebrow"><span className="availability-dot" /> OPEN TO SUMMER 2027 INTERNSHIPS</p>
          <h1 id="intro-title">Ariston<br />Michael<span className="title-period">.</span></h1>
          <p className="intro-role">Software engineering.<br /><span>Curiosity at every stage.</span></p>
          <p className="intro-copy">Computer Science at Sheridan College.<br />Specializing in Cloud Computing.<br />Building things that move ideas forward.</p>
          <div className="launch-actions"><a className="button button-primary" href="#projects">Explore my work <span aria-hidden="true">↘</span></a><ResumeLink /></div>
          <div className="intro-bottom"><span>COMPUTER SCIENCE / CLOUD COMPUTING</span><a href="#projects">BEGIN SEPARATION <span aria-hidden="true">↓</span></a></div>
        </section>
      </LaunchVehicle>
      <RocketExperience>
        <div className="stage-content payload-content" data-stage="payload">
          <div className="stage-marker"><span>02 / PAYLOAD</span><span>SELECTED WORK</span></div>
          <div className="showcase-slot"><ProjectShowcase id="projects" /></div>
        </div>
        <section id="experience" className="flight-section" aria-labelledby="experience-title">
          <div className="stage-marker"><span>03 / UPPER STAGE</span><span>EXPERIENCE</span></div>
          <h2 id="experience-title">Built with purpose.<br /><span>Shaped by people.</span></h2>
          <div className="flight-experience">{experience.map(item => <article key={item.organization}>
            <div className="entry-meta"><span>{item.organization}</span><span>{item.date ?? "Community"}</span></div>
            <h3>{item.role}</h3>
            {item.location && <p className="entry-location">{item.location}</p>}
            {item.details?.map(detail => <p key={detail}>{detail}</p>)}
            {item.technologies && <ul className="tech-list">{item.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>}
          </article>)}</div>
        </section>
        <section id="education" className="flight-section" aria-labelledby="education-title">
          <div className="stage-marker"><span>04 / MIDDLE STAGE</span><span>EDUCATION & SKILLS</span></div>
          <h2 id="education-title">A strong foundation.<br /><span>An expanding toolkit.</span></h2>
          <div className="flight-education"><span className="eyebrow">SHERIDAN COLLEGE / OAKVILLE, ON</span><h3>Honours Bachelor of<br />Computer Science</h3><p>Cloud Computing specialization</p><p className="entry-location">Expected graduation · April 2028</p></div>
          <div id="skills" className="flight-skills">{skills.map(group => <div key={group.title}><h3>{group.title}</h3><p>{group.items.join(" · ")}</p></div>)}</div>
        </section>
        <section id="about" className="flight-section" aria-labelledby="about-title">
          <div className="stage-marker"><span>05 / LOWER STAGE</span><span>ABOUT & ACHIEVEMENTS</span></div>
          <h2 id="about-title">Grounded here.<br /><span>Looking further.</span></h2>
          <p className="flight-lead">From gesture interfaces to wildfire intelligence, I’m interested in how software turns complex problems into useful experiences.</p>
          <div className="showcase-slot gallery-slot"><HackathonGallery id="achievements" /></div>
        </section>
        <section id="contact" className="flight-section flight-contact" aria-labelledby="contact-title">
          <div className="stage-marker"><span>06 / ENGINE</span><span>WHAT COMES NEXT</span></div>
          <p className="eyebrow">READY FOR THE NEXT STAGE</p>
          <h2 id="contact-title">Good things start<br /><span>with a conversation.</span></h2>
          <p>I’m seeking software engineering internships for Summer 2027. Let’s connect about what we could build together.</p>
          <a className="contact-email" href={`mailto:${email}`}>Let’s talk <span aria-hidden="true">↗</span></a>
          <a className="email-address" href={`mailto:${email}`}>{email}</a>
          <div className="contact-social"><a href={githubUrl}>GitHub ↗</a><a href={linkedInUrl}>LinkedIn ↗</a><ResumeLink /></div>
        </section>
      </RocketExperience>
      <div className="game-slot shell"><GameExperience /></div>
    </main>
    <Footer />
  </div>;
}
