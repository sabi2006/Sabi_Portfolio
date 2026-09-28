import { awards, certifications } from '../data.js'
import { BadgeIcon, TrophyIcon } from './Icons.jsx'
import { Reveal, SectionHeading } from './Reveal.jsx'

export default function Achievements() {
  return (
    <section id="achievements" className="section" aria-labelledby="achievements-title">
      <div className="container">
        <SectionHeading
          id="achievements-title"
          index="05"
          kicker="Recognition"
          title={
            <>
              Awards & <span className="gradient-text">certifications</span>
            </>
          }
        />

        <ul className="awards">
          {awards.map((a, i) => (
            <Reveal as="li" key={a.title} className="award glass" delay={i * 120}>
              <div className="award__rings" aria-hidden="true" />
              <div className="award__top">
                <span className="award__place">{a.place}</span>
                <span className="award__icon" aria-hidden="true">
                  <TrophyIcon size={26} />
                </span>
              </div>
              <h3>
                {a.title} <span className="sr-only">, 3rd place</span>
              </h3>
              <p className="award__host mono">
                {a.host} · {a.year}
              </p>
              <p className="muted">{a.detail}</p>
            </Reveal>
          ))}
        </ul>

        <ul className="certs">
          {certifications.map((c, i) => (
            <Reveal as="li" key={c.title} className="cert glass" delay={i * 60}>
              <span className="cert__icon" aria-hidden="true">
                <BadgeIcon />
              </span>
              <div>
                <h3>{c.title}</h3>
                <p className="muted">
                  {c.issuer} <span className="mono cert__year">· {c.year}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
