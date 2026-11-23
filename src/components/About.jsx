import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { User } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import { personalInfo } from '../data/personalInfo.js'

const highlights = ['Creative storytelling', 'Cinematic editing', 'Social media content creation', 'Color grading', 'Motion graphics', 'Continuous learning and experimentation']

function Stat({ label, value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView || value == null) return
    let raf, start
    const tick = (t) => { start ??= t; const p = Math.min((t - start) / 1400, 1); setN(Math.round(value * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick) }
    raf = requestAnimationFrame(tick); return () => cancelAnimationFrame(raf)
  }, [inView, value])
  return (
    <div ref={ref}>
      <div className="font-display text-5xl font-extrabold text-sky">{value == null ? '—' : `${n}+`}</div>
      <div className="mt-1 text-sm text-mute">{label}</div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="section">
      <SectionHeading>Behind every frame, there’s a <em className="ital normal-case">story.</em></SectionHeading>
      <div className="grid items-start gap-14 lg:grid-cols-12">
        <motion.div className="lg:col-span-5" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-navy to-card">
            {personalInfo.profileImage
              ? <img src={personalInfo.profileImage} alt={personalInfo.name} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
              : <div className="flex h-full flex-col items-center justify-center gap-3 text-mute"><User size={64} strokeWidth={1} /><span className="text-sm">Profile photo placeholder</span></div>}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            <div className="absolute bottom-5 left-5"><p className="font-display text-2xl font-bold">{personalInfo.name}</p><p className="text-sm text-ice">{personalInfo.title}</p></div>
          </div>
        </motion.div>
        <div className="lg:col-span-7 lg:pt-10">
          <p className="max-w-2xl text-xl leading-relaxed text-white/90 md:text-2xl">I’m a passionate video editor who enjoys transforming raw footage into meaningful visual experiences. From cinematic edits to engaging short-form social media content, I focus on storytelling, pacing, color, sound, and visual details.</p>
          <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {highlights.map((h) => <li key={h} className="flex items-center gap-3 border-b border-white/10 pb-4 text-mute"><span className="h-1.5 w-1.5 rounded-full bg-brand" />{h}</li>)}
          </ul>
          <div className="mt-14 grid grid-cols-3 gap-6">{personalInfo.stats.map((s) => <Stat key={s.label} {...s} />)}</div>
        </div>
      </div>
    </section>
  )
}
