import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import { strengths } from '../data/skills.js'

export default function WhyMe() {
  return (
    <section className="section">
      <SectionHeading>Why work <em className="ital normal-case">with me</em></SectionHeading>
      <ul>
        {strengths.map((s, i) => (
          <motion.li key={s} className="group flex items-center justify-between gap-6 border-t border-white/10 py-6 last:border-b md:py-8"
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.05, duration: 0.7 }}>
            <span className="h-display text-[clamp(1.6rem,4.6vw,3.6rem)] text-white/40 transition-all duration-500 group-hover:translate-x-4 group-hover:text-white">{s}</span>
            <span aria-hidden className="h-3 w-3 shrink-0 rounded-full bg-brand opacity-0 shadow-[0_0_20px_#2878F0] transition group-hover:opacity-100" />
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
