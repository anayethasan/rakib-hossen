import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc); document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <motion.div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} role="dialog" aria-modal="true" aria-label={project.title}>
      <motion.div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-white/10 bg-navy" initial={{ y: 60, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ type: 'spring', damping: 26, stiffness: 240 }} onClick={(e) => e.stopPropagation()}>
        <div className="relative aspect-video bg-black">
          <iframe src={project.embed} title={project.title} allow="autoplay; fullscreen" allowFullScreen className="h-full w-full" />
          <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 rounded-full bg-ink/80 p-2 hover:bg-brand"><X size={20} /></button>
        </div>
        <div className="grid gap-8 p-6 md:grid-cols-3 md:p-10">
          <div className="md:col-span-2">
            <p className="text-sm text-sky">{project.category}</p>
            <h3 className="mt-1 font-display text-3xl font-bold md:text-4xl">{project.title}</h3>
            <p className="mt-4 text-mute">{project.description}</p>
            <p className="mt-4 text-xs text-mute/70">If the preview doesn’t play, the Drive file may not be set to “Anyone with the link”. Use the button to open it directly.</p>
          </div>
          <div>
            <p className="text-sm text-mute">Software used</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {project.software.length ? project.software.map((s) => <span key={s} className="rounded-full bg-brand/15 px-3 py-1 text-sm text-ice">{s}</span>) : <span className="text-sm text-mute/70">Add in projects.js</span>}
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8 w-full">Watch Full Project <ExternalLink size={16} /></a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
