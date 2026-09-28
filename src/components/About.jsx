import { about, stats } from '../data.js'
import { Reveal, SectionHeading } from './Reveal.jsx'

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          id="about-title"
          index="02"
          label="About"
          title={
            <>
              Practical software, <em>built with care.</em>
            </>
          }
        />

        <div className="about">
          <Reveal className="about__text">
            {about.map((p, i) => (
              <p key={i} className={i === 0 ? 'about__lead' : ''}>
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal as="dl" className="about__stats" delay={120}>
            {stats.map((s) => (
              <div key={s.label}>
                <dt>{s.value}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
