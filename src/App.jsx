import { useEffect } from 'react'
import About from './components/About.jsx'
import Achievements from './components/Achievements.jsx'
import { Contact, Footer } from './components/Contact.jsx'
import Experience from './components/Experience.jsx'
import Hero from './components/Hero.jsx'
import { Nav } from './components/Nav.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'

export default function App() {
  // Honour deep links like /#work: the target only exists after React renders.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (!id) return
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' }))
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Projects />
        <About />
        <Experience />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
