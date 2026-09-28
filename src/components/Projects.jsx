import { projects } from '../data.js'
import { ArrowUpRightIcon } from './Icons.jsx'
import { Reveal, SectionHeading } from './Reveal.jsx'

/* ---------- Figures: technical drawings of each project (decorative) ---------- */

function BricksFigure() {
  const bricks = []
  const W = 44
  const H = 18
  const GAP = 4
  let i = 0
  for (let r = 0; r < 8; r++) {
    const y = 220 - (r + 1) * (H + GAP) + GAP
    const offset = r % 2 ? -(W + GAP) / 2 : 0
    for (let x = 60 + offset; x < 340; x += W + GAP) {
      const hot = (i * 7) % 17 === 3
      bricks.push(
        <rect
          key={`${r}-${x}`}
          className={hot ? 'brick brick--hot' : 'brick'}
          x={x}
          y={y}
          width={W}
          height={H}
          rx="1.5"
          style={{ '--i': i }}
        />,
      )
      i++
    }
  }
  return (
    <svg viewBox="0 0 400 270" className="fig" aria-hidden="true">
      <defs>
        <clipPath id="wallClip">
          <rect x="60" y="40" width="280" height="180" />
        </clipPath>
      </defs>
      <g clipPath="url(#wallClip)">{bricks}</g>
      <rect x="60" y="40" width="280" height="180" className="fig__frame" />
      <g className="fig__dim">
        <path d="M60 238h280M60 233v10M340 233v10" />
        <path d="M356 40v180M351 40h10M351 220h10" />
      </g>
      <text x="200" y="258" className="fig__label" textAnchor="middle">
        2.80 m
      </text>
      <text x="378" y="134" className="fig__label" textAnchor="middle" transform="rotate(90 378 134)">
        1.80 m
      </text>
      <text x="60" y="26" className="fig__label fig__label--hot">
        BRICKS 312 · MORTAR 0.42 m³ · WASTAGE 5%
      </text>
    </svg>
  )
}

function RagFigure() {
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
        edges.push(
          <line
            key={`${l}-${y1}-${y2}`}
            className={k % 3 === 0 ? 'edge edge--flow' : 'edge'}
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
    <svg viewBox="0 0 400 270" className="fig" aria-hidden="true">
      <g>{edges}</g>
      {layers.map((layer, li) =>
        layer.ys.map((y) => (
          <rect
            key={`${li}-${y}`}
            className={li === 3 ? 'node node--out' : 'node'}
            x={layer.x - (li === 3 ? 9 : 6)}
            y={y - (li === 3 ? 9 : 6)}
            width={li === 3 ? 18 : 12}
            height={li === 3 ? 18 : 12}
          />
        )),
      )}
      <text x="70" y="240" className="fig__label" textAnchor="middle">
        CORPUS 1.3 GB
      </text>
      <text x="205" y="240" className="fig__label" textAnchor="middle">
        VECTOR INDEX
      </text>
      <text x="335" y="165" className="fig__label fig__label--hot" textAnchor="middle">
        ANSWER
      </text>
      <text x="200" y="26" className="fig__label" textAnchor="middle">
        QUERY → RETRIEVE → AUGMENT → GENERATE
      </text>
    </svg>
  )
}

const BARCODE = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 4, 1, 1, 2, 3, 1, 2, 1, 3, 2, 1, 1, 4, 2, 1, 3, 1]

function CartFigure() {
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
    <svg viewBox="0 0 400 270" className="fig" aria-hidden="true">
      <rect x="64" y="44" width="272" height="160" className="fig__frame" />
      <g>{bars}</g>
      <text x="200" y="192" className="fig__label" textAnchor="middle">
        8 901234 567890
      </text>
      <rect x="70" y="62" width="260" height="2" className="scan-line" />
      {steps.map((s, i) => (
        <g key={s}>
          <rect x={92 + i * 78} y="222" width="60" height="24" className="step" />
          <text x={122 + i * 78} y="238" className="fig__label fig__label--hot" textAnchor="middle">
            {s}
          </text>
          {i < steps.length - 1 && <path d={`M${156 + i * 78} 234h14`} className="fig__dim" />}
        </g>
      ))}
      <text x="200" y="28" className="fig__label" textAnchor="middle">
        IOT SENSORS · LIVE INVENTORY · AUTO CHECKOUT
      </text>
    </svg>
  )
}

const FIGURES = { bricks: BricksFigure, neural: RagFigure, cart: CartFigure }

export default function Projects() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          id="work-title"
          index="01"
          label="Selected work"
          aside={`${projects.length} projects · 2025–2026`}
          title={
            <>
              Things I've designed, <em>built and shipped.</em>
            </>
          }
        />

        <ol className="cases">
          {projects.map((p, i) => {
            const Figure = FIGURES[p.visual]
            const num = String(i + 1).padStart(2, '0')
            return (
              <Reveal as="li" key={p.id} className="case">
                <header className="case__head">
                  <span className="case__num mono">{num}</span>
                  <h3 className="case__title">{p.title}</h3>
                  <span className="case__cat mono">{p.category}</span>
                  <span className="case__year mono">{p.year}</span>
                </header>

                <div className="case__body">
                  <figure className="case__fig">
                    <div className="case__canvas">
                      <Figure />
                    </div>
                    <figcaption className="mono">
                      Fig. {num}: {p.figure}
                    </figcaption>
                  </figure>

                  <div className="case__info">
                    <p className="case__desc">{p.description}</p>

                    <ul className="case__list">
                      {p.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>

                    <dl className="case__metrics">
                      {p.metrics.map((m) => (
                        <div key={m.label}>
                          <dt>{m.value}</dt>
                          <dd>{m.label}</dd>
                        </div>
                      ))}
                    </dl>

                    <p className="case__stack mono">
                      <span className="sr-only">Built with: </span>
                      {p.stack.join('  /  ')}
                    </p>

                    <a className="link" href={p.link} target="_blank" rel="noreferrer">
                      View source <ArrowUpRightIcon size={16} />
                      <span className="sr-only"> for {p.title} (opens in a new tab)</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
