import { useEffect, useMemo, useState } from 'react'

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia(REDUCED_QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(REDUCED_QUERY)
    const onChange = (e) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/** Tracks whether an element is on screen. With `once`, it stays true after the first hit. */
export function useInView(ref, { threshold = 0.2, rootMargin = '0px', once = true } = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold, rootMargin, once])
  return inView
}

/** Current local time (HH:MM) in a given time zone, refreshed every 15 s. */
export function useClock(timeZone = 'Asia/Kolkata') {
  const fmt = useMemo(
    () => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone }),
    [timeZone],
  )
  const [now, setNow] = useState(() => fmt.format(new Date()))
  useEffect(() => {
    const id = setInterval(() => setNow(fmt.format(new Date())), 15000)
    return () => clearInterval(id)
  }, [fmt])
  return now
}
