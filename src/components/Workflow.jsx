import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from './SectionHeading.jsx'
import { workflow } from '../data/skills.js'
gsap.registerPlugin(ScrollTrigger)

export default function Workflow() {
  const root = useRef(null)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduce) { gsap.set('.wf-line', { scaleY: 1 }); return }
      gsap.fromTo('.wf-line', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.wf-list', start: 'top 70%', end: 'bottom 70%', scrub: true } })
      gsap.utils.toArray('.wf-step').forEach((el) => gsap.from(el, { opacity: 0, x: 50, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%' } }))
    }, root)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={root} className="section">
      <SectionHeading>From raw footage to <em className="ital normal-case">final story</em></SectionHeading>
      <ol className="wf-list relative ml-3 md:ml-0">
        <span aria-hidden className="absolute left-[19px] top-2 bottom-2 w-px bg-white/10 md:left-[calc(33%-1px)]" />
        <span aria-hidden className="wf-line absolute left-[19px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-brand to-ice shadow-[0_0_14px_#2878F0] md:left-[calc(33%-1px)]" />
        {workflow.map((w, i) => (
          <li key={w.title} className="wf-step relative grid gap-3 pb-14 pl-14 last:pb-0 md:grid-cols-[33%_1fr] md:pl-0">
            <span className="font-display text-5xl font-extrabold text-white/15 md:pr-14 md:text-right md:text-7xl">{String(i + 1).padStart(2, '0')}</span>
            <span aria-hidden className="absolute left-3 top-3 h-4 w-4 rounded-full border-2 border-sky bg-ink md:left-[calc(33%-8px)]" />
            <div className="md:pl-14"><h3 className="font-display text-2xl font-bold md:text-3xl">{w.title}</h3><p className="mt-2 max-w-lg text-mute">{w.text}</p></div>
          </li>
        ))}
      </ol>
    </section>
  )
}
