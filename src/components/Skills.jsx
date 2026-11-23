import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import { featuredSkills, otherSkills } from '../data/skills.js'
import useGlow from '../hooks/useGlow.js'

export default function Skills() {
  const glow = useGlow()
  return (
    <section id="skills" className="section">
      <SectionHeading>Tools behind the <em className="ital normal-case">creativity</em></SectionHeading>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featuredSkills.map((s, i) => (
          <motion.div key={s.name} {...glow} className="glow-card p-7" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.7 }}>
            <div className="relative mb-12 flex h-16 w-16 items-center justify-center rounded-xl border-2 border-sky/60 font-display text-2xl font-extrabold text-sky">{s.short}</div>
            <h3 className="relative font-display text-xl font-bold">{s.name}</h3>
            <p className="relative mt-2 text-sm text-mute">{s.text}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {otherSkills.map((s) => <span key={s} className="rounded-full border border-white/10 bg-navy px-6 py-3 text-mute transition hover:border-sky hover:text-white">{s}</span>)}
      </div>
    </section>
  )
}
