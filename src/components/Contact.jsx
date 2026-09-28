import { useState } from 'react'
import { profile } from '../data.js'
import { CheckIcon, CopyIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from './Icons.jsx'
import { Reveal } from './Reveal.jsx'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="contact__card glass">
          <span className="kicker">
            <span className="mono">06</span> Contact
          </span>
          <h2 id="contact-title" className="contact__title">
            Let's build something <span className="gradient-text">together.</span>
          </h2>
          <p className="contact__lead muted">
            I'm open to internships, full-time roles and collaborations in full stack development and AI. Drop me a
            message and I'll get back to you.
          </p>

          <div className="contact__actions">
            <a className="btn btn--primary btn--lg" href={`mailto:${profile.email}`}>
              <MailIcon size={20} /> {profile.email}
            </a>
            <button type="button" className="btn btn--ghost btn--lg" onClick={copy}>
              {copied ? <CheckIcon size={20} /> : <CopyIcon size={20} />}
              {copied ? 'Copied' : 'Copy email'}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
          </div>

          <ul className="contact__links">
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon size={18} /> LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <GitHubIcon size={18} /> GitHub
              </a>
            </li>
            <li>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>
                <PhoneIcon size={18} /> {profile.phone}
              </a>
            </li>
            <li>
              <a href={profile.resume} download="Sabi_Ahamed_J_Resume.pdf">
                <DownloadIcon size={18} /> Resume (PDF)
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="mono">Built with React · Three.js · React Three Fiber</p>
        <a href="#home" className="footer__top">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
