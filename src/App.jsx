import { lazy, Suspense, useEffect, useRef } from 'react'
import About from './components/About.jsx'
import Achievements from './components/Achievements.jsx'
import { Contact, Footer } from './components/Contact.jsx'
import Experience from './components/Experience.jsx'
import Hero from './components/Hero.jsx'
import { Nav, ScrollProgress } from './components/Nav.jsx'
import Projects from './components/Projects.jsx'
import SceneBoundary from './components/SceneBoundary.jsx'
import Skills from './components/Skills.jsx'
import { useSpotlight } from './hooks.js'

// three.js is loaded in a separate chunk so text content paints first.
const Scene = lazy(() => import('./three/Scene.jsx'))

export default function App() {
  const spotlight = useRef(null)
  useSpotlight(spotlight)

  // Honour deep links like /#projects: the target only exists after React renders.
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

      <div className="backdrop" aria-hidden="true" />
      <div className="scene" aria-hidden="true">
        <SceneBoundary>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </SceneBoundary>
      </div>
      <div className="grid-overlay" aria-hidden="true" />
      <div ref={spotlight} className="spotlight" aria-hidden="true" />

      <ScrollProgress />
      <Nav />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
