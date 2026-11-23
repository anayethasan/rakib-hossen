import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import ProjectCard from './ProjectCard.jsx'
import ProjectModal from './ProjectModal.jsx'
import { projects, categories } from '../data/projects.js'

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(null)
  const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter)
  return (
    <section id="portfolio" className="section">
      <SectionHeading sub="A collection of stories, visuals, and creative experiments.">Selected <em className="ital normal-case">works</em></SectionHeading>
      <div className="mb-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]" role="tablist" aria-label="Filter projects">
        {categories.map((c) => (
          <button key={c} role="tab" aria-selected={filter === c} onClick={() => setFilter(c)}
            className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm transition ${filter === c ? 'text-white' : 'text-mute hover:text-white'}`}>
            {filter === c && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-brand" />}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>
      <motion.div layout className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onOpen={setOpen} />)}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && <p className="rounded-3xl border border-dashed border-white/15 p-10 text-center text-mute">No projects in this category yet. Add one in <code>src/data/projects.js</code>.</p>}
      <AnimatePresence>{open && <ProjectModal project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}
