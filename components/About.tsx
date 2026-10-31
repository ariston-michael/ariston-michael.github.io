export function About() {
  return (
    <section
      id="about"
      className="section shell about-grid"
      aria-labelledby="about-title"
    >
      <div>
        <p className="eyebrow">02 / THE PERSON BEHIND THE PROJECTS</p>
        <h2 id="about-title">
          Grounded here.
          <br />
          <span>Looking further.</span>
        </h2>
        <p className="section-copy">
          I’m pursuing an Honours Bachelor of Computer Science at Sheridan
          College, specializing in Cloud Computing, with an expected graduation
          in April 2028.
        </p>
        <p className="section-copy">
          Beyond projects, I’m a Peer Mentor at Sheridan College, part of the
          GDG Sheridan tech team, and served as a Tennis Canada Court Control
          Lead in 2025 and 2026.
        </p>
      </div>
      <div className="education-panel">
        <span className="panel-icon" aria-hidden="true">
          ✦
        </span>
        <p className="eyebrow">EDUCATION & DIRECTION</p>
        <h3>Sheridan College</h3>
        <p>Honours Bachelor of Computer Science</p>
        <dl>
          <div>
            <dt>Specialization</dt>
            <dd>Cloud Computing</dd>
          </div>
          <div>
            <dt>Expected graduation</dt>
            <dd>April 2028</dd>
          </div>
          <div>
            <dt>Next chapter</dt>
            <dd>Summer 2027 internship</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
