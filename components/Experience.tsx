import { achievements, experience } from "@/lib/content";
export function Experience() {
  return (
    <section
      id="experience"
      className="section shell"
      aria-labelledby="experience-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / PEOPLE & PROGRESS</p>
          <h2 id="experience-title">
            Beyond <span>the code.</span>
          </h2>
        </div>
        <p>
          Community involvement and
          <br className="hidden md:block" /> a few milestones along the way.
        </p>
      </div>
      <div className="experience-layout">
        <div>
          <h3 className="small-heading">Experience & community</h3>
          <ul className="experience-list">
            {experience.map((item) => (
              <li key={item.organization}>
                <span className="orbit-dot" aria-hidden="true" />
                <div>
                  <h4>{item.role}</h4>
                  <p>{item.organization}</p>
                </div>
                {item.date && (
                  <span className="experience-date">{item.date}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="small-heading">Hackathon achievements</h3>
          <ul className="achievement-list">
            {achievements.map((item) => (
              <li key={item.context}>
                <a href={item.href}>
                  <span className="achievement-title">
                    {item.title}
                    <span aria-hidden="true">↗</span>
                  </span>
                  <span className="achievement-context">{item.context}</span>
                  <span className="achievement-project">{item.project}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
