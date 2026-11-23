import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import { services } from '../data/services.js'
import useGlow from '../hooks/useGlow.js'

export default function Services() {
  const glow = useGlow()
  return (
    <section id="services" className="section">
      <SectionHeading>What I bring to the <em className="ital normal-case">timeline.</em></SectionHeading>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ icon: Icon, title, text }, i) => (
          <motion.article key={title} {...glow} className="glow-card group p-8"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}>
            <div className="relative mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/15 text-sky ring-1 ring-sky/20 transition group-hover:bg-brand group-hover:text-white group-hover:shadow-[0_0_40px_rgba(40,120,240,.6)]"><Icon size={26} /></div>
            <h3 className="relative font-display text-2xl font-bold leading-tight">{title}</h3>
            <p className="relative mt-3 text-mute">{text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
