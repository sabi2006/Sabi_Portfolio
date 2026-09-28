import { experience } from '../data.js'
import { BriefcaseIcon, CapIcon } from './Icons.jsx'
import { Reveal, SectionHeading } from './Reveal.jsx'

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          id="experience-title"
          index="03"
          kicker="Journey"
          title={
            <>
              Experience & <span className="gradient-text">education</span>
            </>
          }
        />

        <ol className="timeline">
          {experience.map((e, i) => (
            <Reveal as="li" key={e.role} className="timeline__item" delay={i * 120}>
              <span className="timeline__node" aria-hidden="true">
                {e.type === 'work' ? <BriefcaseIcon /> : <CapIcon />}
              </span>
              <article className="timeline__card glass">
                <header className="timeline__head">
                  <div>
                    <h3>{e.role}</h3>
                    <p className="timeline__org">{e.org}</p>
                  </div>
                  <span className="badge mono">{e.period}</span>
                </header>
                {e.meta && <p className="muted timeline__meta">{e.meta}</p>}
                <ul className="bullets">
                  {e.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
                <ul className="chips" aria-label="Focus areas">
                  {e.tags.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
