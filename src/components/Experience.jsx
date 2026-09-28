import { experience } from '../data.js'
import { Reveal, SectionHeading } from './Reveal.jsx'

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          id="experience-title"
          index="03"
          label="Experience & education"
          title={
            <>
              Where I've <em>learned by doing.</em>
            </>
          }
        />

        <ol className="rows">
          {experience.map((e, i) => (
            <Reveal as="li" key={e.role} className="row" delay={i * 80}>
              <p className="row__period mono">{e.period}</p>
              <div className="row__who">
                <h3>{e.role}</h3>
                <p>{e.org}</p>
              </div>
              <ul className="row__points">
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
