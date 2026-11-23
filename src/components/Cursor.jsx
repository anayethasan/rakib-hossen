import { useEffect, useRef } from 'react'
// Desktop-only soft blue cursor follower.
export default function Cursor() {
  const dot = useRef(null)
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    document.body.classList.add('has-cursor')
    let x = 0, y = 0, cx = 0, cy = 0, raf
    const move = (e) => { x = e.clientX; y = e.clientY }
    const over = (e) => dot.current?.setAttribute('data-big', e.target.closest('a,button,[data-hover]') ? '1' : '0')
    const loop = () => {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18
      if (dot.current) {
        const big = dot.current.dataset.big === '1'
        dot.current.style.transform = `translate(${cx - 18}px,${cy - 18}px) scale(${big ? 1.8 : 1})`
      }
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move); window.addEventListener('mouseover', over); loop()
    return () => { cancelAnimationFrame(raf); document.body.classList.remove('has-cursor'); window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
  }, [])
  return <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 rounded-full border border-sky/70 bg-brand/10 backdrop-blur-[1px] transition-[transform] duration-100 [@media(hover:hover)_and_(pointer:fine)]:block" />
}
