import { useEffect, useRef } from 'react'

/** Fades/slides children in when they enter the viewport. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ '--delay': `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  )
}

export function SectionHeading({ index, kicker, title, children, id }) {
  return (
    <Reveal className="section-heading">
      <span className="kicker">
        <span className="mono">{index}</span> {kicker}
      </span>
      <h2 id={id}>{title}</h2>
      {children && <p className="section-heading__lead">{children}</p>}
    </Reveal>
  )
}
