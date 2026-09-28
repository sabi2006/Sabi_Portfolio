import { useEffect, useMemo, useRef } from 'react'
import { skillGroups } from '../data.js'
import { usePrefersReducedMotion } from '../hooks.js'
import { Reveal, SectionHeading } from './Reveal.jsx'

const IDLE = { x: 0.0022, y: 0.0035 }

// Shorter labels for the sphere only; the full names still appear in the skill cards.
const SHORT = { 'Data Structures & Algorithms': 'DSA', 'Operating Systems': 'OS', 'Prompt Engineering': 'Prompting' }

/** Interactive 3D tag sphere rendered with CSS transforms (decorative; skills are also listed as text). */
function TagSphere({ tags }) {
  const wrapRef = useRef(null)
  const itemRefs = useRef([])
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const wrap = wrapRef.current
    const n = tags.length
    // Evenly distribute points on a sphere (Fibonacci lattice).
    const pts = tags.map((_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / n)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      return { x: Math.cos(theta) * Math.sin(phi), y: Math.sin(theta) * Math.sin(phi), z: Math.cos(phi) }
    })

    let radius = 0
    const measure = () => {
      // Leave room for the widest tags on narrow screens.
      radius = wrap.clientWidth * (wrap.clientWidth < 420 ? 0.32 : 0.4)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(wrap)

    const render = () => {
      for (let i = 0; i < n; i++) {
        const el = itemRefs.current[i]
        if (!el) continue
        const p = pts[i]
        const depth = (p.z + 1) / 2 // 0 = back, 1 = front
        el.style.transform = `translate3d(${p.x * radius}px, ${p.y * radius}px, 0) translate(-50%, -50%) scale(${0.72 + depth * 0.45})`
        // Back tags stay readable (was 0.2, which made them nearly invisible).
        el.style.opacity = String(0.55 + depth * 0.45)
        el.style.zIndex = String(Math.round(depth * 100))
      }
    }

    const rotate = (ax, ay) => {
      const cx = Math.cos(ax)
      const sx = Math.sin(ax)
      const cy = Math.cos(ay)
      const sy = Math.sin(ay)
      for (const p of pts) {
        const y1 = p.y * cx - p.z * sx
        const z1 = p.y * sx + p.z * cx
        const x2 = p.x * cy + z1 * sy
        p.z = -p.x * sy + z1 * cy
        p.x = x2
        p.y = y1
      }
    }

    render()
    if (reduced) return () => ro.disconnect()

    let vx = IDLE.x
    let vy = IDLE.y
    let tx = IDLE.x
    let ty = IDLE.y
    let raf = 0

    const tick = () => {
      vx += (tx - vx) * 0.05
      vy += (ty - vy) * 0.05
      rotate(vx, vy)
      render()
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect()
      ty = ((e.clientX - r.left) / r.width - 0.5) * 0.04
      tx = -((e.clientY - r.top) / r.height - 0.5) * 0.04
    }
    const onLeave = () => {
      tx = IDLE.x
      ty = IDLE.y
    }

    // Only animate while on screen.
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf)
      if (entry.isIntersecting) raf = requestAnimationFrame(tick)
    })
    io.observe(wrap)
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      ro.disconnect()
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
    }
  }, [tags, reduced])

  return (
    <div ref={wrapRef} className="tag-sphere" aria-hidden="true">
      <div className="tag-sphere__glow" />
      {tags.map((t, i) => (
        <span
          key={t.label}
          ref={(el) => (itemRefs.current[i] = el)}
          className="tag-sphere__item"
          style={{ '--tag': t.color }}
        >
          {SHORT[t.label] ?? t.label}
        </span>
      ))}
    </div>
  )
}

export default function Skills() {
  const tags = useMemo(() => {
    const seen = new Set()
    return skillGroups.flatMap((g) =>
      g.items.filter((label) => !seen.has(label) && seen.add(label)).map((label) => ({ label, color: g.color })),
    )
  }, [])

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeading
          id="skills-title"
          index="02"
          kicker="Skills"
          title={
            <>
              A toolkit for the <span className="gradient-text">whole stack</span>
            </>
          }
        >
          Languages, frameworks, data and AI tooling I use to take products from idea to deployment.
        </SectionHeading>

        <div className="skills">
          <Reveal className="skills__sphere">
            <TagSphere tags={tags} />
          </Reveal>

          <div className="skills__groups">
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} className="skill-card glass" delay={i * 70} style={{ '--tag': g.color }}>
                <h3>
                  <span className="skill-card__dot" aria-hidden="true" />
                  {g.title}
                </h3>
                <ul className="chips">
                  {g.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
