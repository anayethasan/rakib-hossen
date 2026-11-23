import { motion } from 'framer-motion'
// Reveal on scroll. Use <em className="ital"> inside children for italic words.
export default function SectionHeading({ children, sub, className = '' }) {
  return (
    <motion.div className={`mb-14 md:mb-20 ${className}`}
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
      <h2 className="h-display text-[clamp(2.2rem,7vw,5.5rem)] max-w-5xl">{children}</h2>
      {sub && <p className="mt-6 max-w-xl text-mute text-lg">{sub}</p>}
    </motion.div>
  )
}
