import { useRef } from 'react'
import { projects } from '../data.js'
import { usePrefersReducedMotion } from '../hooks.js'
import { ArrowUpRightIcon } from './Icons.jsx'
import { Reveal, SectionHeading } from './Reveal.jsx'

/* ---------- Illustrations (decorative, animated via CSS once the card is revealed) ---------- */

function BricksVisual() {
  const bricks = []
  const W = 44
  const H = 18
  const GAP = 4
  let i = 0
  for (let r = 0; r < 8; r++) {
    const y = 220 - (r + 1) * (H + GAP) + GAP
    const offset = r % 2 ? -(W + GAP) / 2 : 0
    for (let x = 60 + offset; x < 340; x += W + GAP) {
      bricks.push(<rect key={`${r}-${x}`} className="brick" x={x} y={y} width={W} height={H} rx="2" style={{ '--i': i++ }} />)
    }
  }
  return (
    <svg viewBox="0 0 400 260" className="visual" aria-hidden="true">
      <defs>
        <linearGradient id="brickGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#dc2626" />
        </linearGradient>
        <clipPath id="wallClip">
          <rect x="60" y="40" width="280" height="180" rx="4" />
        </clipPath>
      </defs>
      <rect x="60" y="40" width="280" height="180" rx="4" className="visual__frame" />
      <g clipPath="url(#wallClip)">{bricks}</g>
      <g className="visual__dim">
        <path d="M60 236h280M60 231v10M340 231v10" />
        <path d="M356 40v180M351 40h10M351 220h10" />
      </g>
      <text x="200" y="254" className="visual__label" textAnchor="middle">
        2.80 m
      </text>
      <text x="376" y="134" className="visual__label" textAnchor="middle" transform="rotate(90 376 134)">
        1.80 m
      </text>
      <text x="60" y="26" className="visual__label visual__label--accent">
        bricks: 312 · mortar: 0.42 m³ · wastage 5%
      </text>
    </svg>
  )
}

function NeuralVisual() {
  const layers = [
    { x: 70, ys: [70, 130, 190] },
    { x: 160, ys: [55, 105, 155, 205] },
    { x: 250, ys: [70, 130, 190] },
    { x: 335, ys: [130] },
  ]
  const edges = []
  let k = 0
  for (let l = 0; l < layers.length - 1; l++) {
    for (const y1 of layers[l].ys) {
      for (const y2 of layers[l + 1].ys) {
        const flow = k % 3 === 0
        edges.push(
          <line
            key={`${l}-${y1}-${y2}`}
            className={flow ? 'edge edge--flow' : 'edge'}
            x1={layers[l].x}
            y1={y1}
            x2={layers[l + 1].x}
            y2={y2}
            style={{ '--i': k }}
          />,
        )
        k++
      }
    }
  }
  return (
    <svg viewBox="0 0 400 260" className="visual" aria-hidden="true">
      <g>{edges}</g>
      {layers.map((layer, li) =>
        layer.ys.map((y, ni) => (
          <g key={`${li}-${y}`}>
            <circle className="node-pulse" cx={layer.x} cy={y} r="7" style={{ '--i': li * 4 + ni }} />
            <circle className={li === layers.length - 1 ? 'node node--out' : 'node'} cx={layer.x} cy={y} r={li === 3 ? 10 : 7} />
          </g>
        )),
      )}
      <text x="70" y="236" className="visual__label" textAnchor="middle">
        1.3 GB corpus
      </text>
      <text x="205" y="236" className="visual__label" textAnchor="middle">
        vector search
      </text>
      <text x="335" y="165" className="visual__label visual__label--accent" textAnchor="middle">
        answer
      </text>
      <text x="200" y="26" className="visual__label visual__label--accent" textAnchor="middle">
        query → retrieve → augment → generate
      </text>
    </svg>
  )
}

const BARCODE = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 4, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1, 1, 4, 2, 1, 3, 1]

function CartVisual() {
  const total = BARCODE.reduce((sum, w, i) => sum + w + (i % 2 ? 2 : 1.5), 0)
  const scale = 240 / total
  let x = 80
  const bars = BARCODE.map((w, i) => {
    const bar = <rect key={i} x={x} y="60" width={w * scale} height="110" className="bar" />
    x += (w + (i % 2 ? 2 : 1.5)) * scale
    return bar
  })
  const steps = ['SCAN', 'BILL', 'PAY']
  return (
    <svg viewBox="0 0 400 260" className="visual" aria-hidden="true">
      <defs>
        <filter id="scanGlow" x="-20%" y="-400%" width="140%" height="900%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <rect x="64" y="44" width="272" height="160" rx="12" className="visual__frame" />
      <g>{bars}</g>
      <text x="200" y="192" className="visual__label" textAnchor="middle">
        8 901234 567890
      </text>
      <g className="scan-line">
        <rect x="70" y="60" width="260" height="6" className="scan-line__glow" filter="url(#scanGlow)" />
        <rect x="70" y="62" width="260" height="2" className="scan-line__core" />
      </g>
      {steps.map((s, i) => (
        <g key={s} className="step" style={{ '--i': i }}>
          <rect x={92 + i * 78} y="220" width="60" height="24" rx="12" className="step__pill" />
          <text x={122 + i * 78} y="236" className="visual__label visual__label--accent" textAnchor="middle">
            {s}
          </text>
          {i < steps.length - 1 && <path d={`M${156 + i * 78} 232h14`} className="visual__dim-line" />}
        </g>
      ))}
      <text x="200" y="28" className="visual__label" textAnchor="middle">
        iot sensors · live inventory · auto checkout
      </text>
    </svg>
  )
}

const VISUALS = { bricks: BricksVisual, neural: NeuralVisual, cart: CartVisual }

/* ---------- Card ---------- */

function TiltCard({ children, className, style }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  const onMove = (e) => {
    if (reduced || e.pointerType !== 'mouse') return
    const el = ref.current
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--ry', `${(x - 0.5) * 6}deg`)
    el.style.setProperty('--rx', `${(0.5 - y) * 6}deg`)
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
  }
  const onLeave = () => {
    ref.current.style.setProperty('--rx', '0deg')
    ref.current.style.setProperty('--ry', '0deg')
  }

  return (
    <article ref={ref} className={className} style={style} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          index="04"
          kicker="Selected work"
          title={
            <>
              Projects I've <span className="gradient-text">designed & built</span>
            </>
          }
        >
          From interactive 3D estimation tools to AI assistants and IoT-powered retail.
        </SectionHeading>

        <div className="projects">
          {projects.map((p, i) => {
            const Visual = VISUALS[p.visual]
            return (
              <Reveal key={p.id} className="project">
                <TiltCard
                  className={`project__card glass ${i % 2 ? 'project__card--flip' : ''}`}
                  style={{ '--accent': p.accent, '--accent2': p.accent2 }}
                >
                  <div className="project__visual">
                    <Visual />
                    <span className="project__index mono" aria-hidden="true">
                      0{i + 1}
                    </span>
                  </div>

                  <div className="project__body">
                    <p className="project__meta mono">
                      <span>{p.category}</span>
                      <span>{p.year}</span>
                    </p>
                    <h3 className="project__title">{p.title}</h3>
                    <p className="muted">{p.description}</p>

                    <ul className="project__metrics">
                      {p.metrics.map((m) => (
                        <li key={m.label}>
                          <span className="metric__value">{m.value}</span>
                          <span className="metric__label">{m.label}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="chips" aria-label="Tech stack">
                      {p.stack.map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>

                    <a className="link-arrow" href={p.link} target="_blank" rel="noreferrer">
                      View on GitHub <ArrowUpRightIcon size={18} />
                      <span className="sr-only"> ({p.title}, opens in a new tab)</span>
                    </a>
                  </div>
                </TiltCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
