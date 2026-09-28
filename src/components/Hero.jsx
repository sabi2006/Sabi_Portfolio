import { profile } from '../data.js'
import { useTypewriter } from '../hooks.js'
import { ArrowRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons.jsx'

export default function Hero() {
  const role = useTypewriter(profile.roles)

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <figure className="hero__photo load-in" style={{ '--delay': '300ms' }}>
          <span className="hero__halo" aria-hidden="true" />
          <span className="hero__float">
            <img
              src="/photo.webp"
              alt={`Portrait of ${profile.name}`}
              width="887"
              height="1408"
              fetchPriority="high"
              decoding="async"
            />
          </span>
        </figure>

        <div className="hero__content">
          <p className="eyebrow load-in" style={{ '--delay': '100ms' }}>
            <span className="pulse-dot" aria-hidden="true" />
            Open to opportunities · {profile.location}
          </p>

          <h1 id="hero-title" className="hero__title">
            <span className="line">
              <span className="load-in" style={{ '--delay': '220ms' }}>
                Sabi
              </span>
            </span>
            <span className="line">
              <span className="gradient-text load-in" style={{ '--delay': '340ms' }}>
                Ahamed J
              </span>
            </span>
          </h1>

          <p className="hero__role load-in" style={{ '--delay': '480ms' }}>
            <span className="sr-only">{profile.roles.join(', ')}</span>
            <span aria-hidden="true">
              <span className="hero__prompt">&gt;</span> {role}
              <span className="caret" />
            </span>
          </p>

          <p className="hero__lead load-in" style={{ '--delay': '600ms' }}>
            {profile.tagline}
          </p>

          <div className="hero__actions load-in" style={{ '--delay': '720ms' }}>
            <a href="#projects" className="btn btn--primary">
              View my work <ArrowRightIcon size={18} />
            </a>
            <a href={profile.resume} className="btn btn--ghost" download="Sabi_Ahamed_J_Resume.pdf">
              <DownloadIcon size={18} /> Download CV
            </a>
          </div>

          <ul className="socials load-in" style={{ '--delay': '840ms' }} aria-label="Social links">
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                <GitHubIcon />
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                <LinkedInIcon />
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.email}`}>
                <MailIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About section">
        <span className="scroll-cue__mouse" aria-hidden="true">
          <span />
        </span>
        <span className="mono" aria-hidden="true">
          scroll
        </span>
      </a>
    </section>
  )
}
