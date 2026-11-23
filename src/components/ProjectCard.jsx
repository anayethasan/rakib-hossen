import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

export default function ProjectCard({ project, index, onOpen }) {
  const [imgOk, setImgOk] = useState(true)
  return (
    <motion.button layout initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, delay: index * 0.08 }} onClick={() => onOpen(project)} data-hover
      className="group relative block w-full overflow-hidden rounded-3xl border border-white/10 bg-card text-left" aria-label={`Open ${project.title}`}>
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-brand/40 via-navy to-ink">
        {imgOk && <img src={project.thumb} alt="" loading="lazy" referrerPolicy="no-referrer" onError={() => setImgOk(false)}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/40 backdrop-blur transition duration-500 group-hover:scale-110 group-hover:bg-brand"><Play fill="white" size={26} /></span>
        </div>
      </div>
      <div className="flex items-end justify-between gap-4 p-6">
        <div><p className="text-sm text-sky">{project.category}</p><h3 className="mt-1 font-display text-2xl font-bold">{project.title}</h3></div>
        <span className="text-sm text-mute transition group-hover:text-white">View</span>
      </div>
    </motion.button>
  )
}
