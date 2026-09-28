import { skillGroups } from '../data.js'
import { Reveal, SectionHeading } from './Reveal.jsx'

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          id="skills-title"
          index="04"
          label="Capabilities"
          title={
            <>
              The toolkit, <em>front to back.</em>
            </>
          }
        />

        <div className="skills">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} className="skills__group" delay={(i % 3) * 70}>
              <h3 className="mono">{g.title}</h3>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
