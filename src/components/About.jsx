import { useEffect, useRef, useState } from 'react'
import { profile, stats } from '../data.js'
import { useInView, usePrefersReducedMotion } from '../hooks.js'
import { CapIcon, MailIcon, MapPinIcon } from './Icons.jsx'
import { Reveal, SectionHeading } from './Reveal.jsx'

function CountUp({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { threshold: 0.6 })
  const reduced = usePrefersReducedMotion()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setN(value)
      return
    }
    let raf
    const start = performance.now()
    const duration = 1400
    const step = (t) => {
      const k = Math.min(1, (t - start) / duration)
      setN(Math.round(value * (1 - Math.pow(1 - k, 3))))
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduced, value])

  return (
    <span ref={ref} className="stat__value">
      {n}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          id="about-title"
          index="01"
          kicker="About me"
          title={
            <>
              Turning ideas into <span className="gradient-text">interactive products</span>
            </>
          }
        />

        <div className="about">
          <Reveal className="about__text glass">
            <p className="lead">{profile.summary}</p>
            <p className="muted">{profile.summary2}</p>
            <ul className="about__meta">
              <li>
                <MapPinIcon size={18} /> {profile.location}
              </li>
              <li>
                <CapIcon size={18} /> B.Tech IT · 2027
              </li>
              <li>
                <MailIcon size={18} /> <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
            </ul>
          </Reveal>

          <ul className="stats">
            {stats.map((s, i) => (
              <Reveal as="li" key={s.label} className="stat glass" delay={i * 90}>
                <CountUp value={s.value} suffix={s.suffix} />
                <span className="stat__label">{s.label}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
