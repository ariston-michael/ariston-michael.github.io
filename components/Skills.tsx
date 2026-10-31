import { skills } from "@/lib/content";
export function Skills() {
  return (
    <section
      id="skills"
      className="section shell"
      aria-labelledby="skills-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">03 / THE TOOLKIT</p>
          <h2 id="skills-title">
            Tools for <span>the journey.</span>
          </h2>
        </div>
        <p>
          Languages, frameworks, and tools
          <br className="hidden md:block" /> across my work and studies.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {skills.map((group, index) => (
          <div className="skill-group" key={group.title}>
            <span className="project-number">0{index + 1}</span>
            <h3>{group.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li className="skill-tag" key={skill}>
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
