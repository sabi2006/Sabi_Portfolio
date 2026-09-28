import { useEffect, useRef, useState } from 'react'

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

/** Types and deletes a rotating list of words. */
export function useTypewriter(words, { typeSpeed = 70, deleteSpeed = 38, hold = 1700 } = {}) {
  const reduced = usePrefersReducedMotion()
  const [text, setText] = useState('')
  const state = useRef({ word: 0, char: 0, deleting: false })

  useEffect(() => {
    if (reduced) {
      setText(words[0])
      return
    }
    let timer
    const tick = () => {
      const s = state.current
      const word = words[s.word]
      if (!s.deleting) {
        s.char += 1
        setText(word.slice(0, s.char))
        if (s.char >= word.length) {
          s.deleting = true
          timer = setTimeout(tick, hold)
          return
        }
        timer = setTimeout(tick, typeSpeed)
      } else {
        s.char -= 1
        setText(word.slice(0, s.char))
        if (s.char <= 0) {
          s.deleting = false
          s.word = (s.word + 1) % words.length
          timer = setTimeout(tick, 320)
          return
        }
        timer = setTimeout(tick, deleteSpeed)
      }
    }
    timer = setTimeout(tick, 700)
    return () => clearTimeout(timer)
  }, [reduced, words, typeSpeed, deleteSpeed, hold])

  return text
}

/** Moves the spotlight element with the pointer (transform only, no page repaint). */
export function useSpotlight(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || !window.matchMedia('(pointer: fine)').matches) return
    let raf = 0
    let x = 0
    let y = 0
    const onMove = (e) => {
      x = e.clientX
      y = e.clientY
      if (raf) return
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`
        raf = 0
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [ref])
}

/** Returns true once the element has scrolled into view. */
export function useInView(ref, { threshold = 0.2, rootMargin = '0px' } = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold, rootMargin])
  return inView
}
