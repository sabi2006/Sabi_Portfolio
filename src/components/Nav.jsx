import { useEffect, useRef, useState } from 'react'
import { profile } from '../data.js'

const LINKS = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['experience', 'Journey'],
  ['projects', 'Projects'],
  ['achievements', 'Awards'],
  ['contact', 'Contact'],
]

export function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const sections = ['home', ...LINKS.map(([id]) => id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))

    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
    }
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="container nav__inner">
        <a href="#home" className="nav__logo" aria-label="Sabi Ahamed J, back to top">
          SA<span>.</span>
        </a>

        <nav aria-label="Primary">
          <ul id="nav-menu" className="nav__links">
            {LINKS.map(([id, label], i) => (
              <li key={id} style={{ '--i': i }}>
                <a
                  href={`#${id}`}
                  className={active === id ? 'is-active' : ''}
                  aria-current={active === id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn--ghost btn--sm nav__cta" href={`mailto:${profile.email}`}>
          Let's talk
        </a>

        <button
          type="button"
          className="nav__toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export function ScrollProgress() {
  const bar = useRef(null)
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      if (bar.current) bar.current.style.transform = `scaleX(${p})`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  return <div ref={bar} className="scroll-progress" aria-hidden="true" />
}
