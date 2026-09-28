import { useState } from 'react'
import { profile } from '../data.js'
import { useClock } from '../hooks.js'
import { ArrowUpRightIcon, CheckIcon, CopyIcon } from './Icons.jsx'
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

  const links = [
    ['LinkedIn', profile.linkedin, true],
    ['GitHub', profile.github, true],
    ['Résumé (PDF)', profile.resume, true],
    [profile.phone, `tel:${profile.phone.replace(/\s/g, '')}`, false],
  ]

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal>
          <div className="sh__bar mono">
            <span>(06)</span>
            <span>Contact</span>
          </div>
          <h2 id="contact-title" className="contact__title">
            Have a role or a project in mind? <em>Let's talk.</em>
          </h2>

          <div className="contact__mail">
            <a href={`mailto:${profile.email}`} className="contact__email">
              {profile.email}
            </a>
            <button type="button" className="btn btn--line btn--sm" onClick={copy}>
              {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <span className="sr-only" aria-live="polite">
              {copied ? 'Email address copied to clipboard' : ''}
            </span>
          </div>

          <ul className="contact__links">
            {links.map(([label, href, external]) => (
              <li key={label}>
                <a
                  className="link"
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  {label} {external && <ArrowUpRightIcon size={15} />}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  const time = useClock()
  return (
    <footer className="footer">
      <div className="container footer__inner mono">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Designed & built by hand · React + Three.js</p>
        <p>Dindigul, IN · {time} IST</p>
        <a href="#home" className="footer__top">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
