import { lazy, Suspense, useRef } from 'react'
import { facts, profile } from '../data.js'
import { useInView } from '../hooks.js'
import { ArrowDownIcon, DownloadIcon } from './Icons.jsx'
import SceneBoundary from './SceneBoundary.jsx'

// three.js loads in its own chunk so the text paints first.
const HeroScene = lazy(() => import('../three/HeroScene.jsx'))

export default function Hero() {
  const ref = useRef(null)
  // Only render the 3D field while the hero is on screen.
  const visible = useInView(ref, { threshold: 0, once: false })

  return (
    <section id="home" ref={ref} className="hero" aria-labelledby="hero-title">
      <div className="hero__scene" aria-hidden="true">
        <SceneBoundary>
          <Suspense fallback={null}>
            <HeroScene active={visible} track={ref} />
          </Suspense>
        </SceneBoundary>
      </div>

      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__status mono load-in" style={{ '--delay': '80ms' }}>
            <span className="status-dot" aria-hidden="true" />
            {profile.availability}
          </p>

          <h1 id="hero-title" className="hero__title">
            <span className="line">
              <span className="load-line" style={{ '--delay': '160ms' }}>
                Sabi
              </span>
            </span>
            <span className="line">
              <em className="load-line" style={{ '--delay': '260ms' }}>
                Ahamed J<span className="accent-dot">.</span>
              </em>
            </span>
          </h1>

          <p className="hero__lead load-in" style={{ '--delay': '420ms' }}>
            Full-stack developer building interactive 3D tools and retrieval-based AI for the web. I take ideas from a
            blank repo to something people can use.
          </p>

          <div className="hero__actions load-in" style={{ '--delay': '540ms' }}>
            <a href="#work" className="btn btn--solid">
              Selected work <ArrowDownIcon size={16} />
            </a>
            <a href={profile.resume} className="btn btn--line" download="Sabi_Ahamed_J_Resume.pdf">
              <DownloadIcon size={16} /> Résumé
            </a>
          </div>
        </div>

        <figure className="hero__photo load-in" style={{ '--delay': '300ms' }}>
          <img
            src="/photo.webp"
            alt={`Portrait of ${profile.name}`}
            width="887"
            height="1408"
            fetchPriority="high"
            decoding="async"
          />
          <figcaption className="hero__caption mono" aria-hidden="true">
            SAJ / 2026
          </figcaption>
        </figure>
      </div>

      <div className="hero__meta">
        <dl className="container hero__facts">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="mono">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
