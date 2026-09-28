import { awards, certifications } from '../data.js'
import { Reveal, SectionHeading } from './Reveal.jsx'

export default function Achievements() {
  return (
    <section id="recognition" className="section" aria-labelledby="recognition-title">
      <div className="container">
        <SectionHeading
          id="recognition-title"
          index="05"
          label="Recognition"
          title={
            <>
              Awards & <em>certifications.</em>
            </>
          }
        />

        <ul className="awards">
          {awards.map((a, i) => (
            <Reveal as="li" key={a.title} className="award" delay={i * 90}>
              <span className="award__place" aria-hidden="true">
                {a.place}
              </span>
              <div>
                <h3>
                  {a.title}
                  <span className="sr-only">, 3rd place</span>
                </h3>
                <p className="award__meta mono">
                  {a.host} · {a.year}
                </p>
                <p className="award__detail">{a.detail}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="certs">
          <h3 className="certs__title mono">Certifications</h3>
          <table>
            <thead className="sr-only">
              <tr>
                <th scope="col">Certification</th>
                <th scope="col">Issuer</th>
                <th scope="col">Year</th>
              </tr>
            </thead>
            <tbody>
              {certifications.map((c) => (
                <tr key={c.title}>
                  <td>{c.title}</td>
                  <td className="certs__issuer">{c.issuer}</td>
                  <td className="certs__year mono">{c.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  )
}
