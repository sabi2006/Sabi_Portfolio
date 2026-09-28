import { useEffect, useRef } from 'react'

/** Fades children in once when they enter the viewport. */
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
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
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

/** Editorial section header: a thin index bar above a serif title. */
export function SectionHeading({ id, index, label, aside, title }) {
  return (
    <Reveal className="sh">
      <div className="sh__bar mono">
        <span>({index})</span>
        <span>{label}</span>
        {aside && <span className="sh__aside">{aside}</span>}
      </div>
      <h2 id={id} className="sh__title">
        {title}
      </h2>
    </Reveal>
  )
}
