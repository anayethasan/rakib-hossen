import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, personalInfo } from '../data/personalInfo.js'
import useMagnetic from '../hooks/useMagnetic.js'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const mag = useMagnetic(0.3)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' })
    navLinks.forEach((l) => { const el = document.getElementById(l.id); el && io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : '' }, [open])

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-ink/80 backdrop-blur-xl border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
          <a href="#home" className="font-display text-2xl font-extrabold tracking-tight">{personalInfo.brand.replace('.', '')}<span className="text-brand">.</span></a>
          <ul className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => (
              <li key={l.id} className="relative">
                <a href={`#${l.id}`} className={`text-sm transition-colors ${active === l.id ? 'text-white' : 'text-mute hover:text-white'}`}>{l.label}</a>
                {active === l.id && <motion.span layoutId="nav-dot" className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-sky" />}
              </li>
            ))}
          </ul>
          <a ref={mag} href="#contact" className="btn btn-primary hidden !py-2.5 text-sm lg:inline-flex">Let’s Talk</a>
          <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu"><Menu /></button>
        </nav>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] flex flex-col bg-ink px-6 py-6" initial={{ clipPath: 'circle(0% at 90% 5%)' }} animate={{ clipPath: 'circle(150% at 90% 5%)' }} exit={{ clipPath: 'circle(0% at 90% 5%)' }} transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}>
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-extrabold">RAKIB<span className="text-brand">.</span></span>
              <button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
            </div>
            <ul className="mt-12 flex flex-1 flex-col justify-center gap-4">
              {navLinks.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.06 }}>
                  <a href={`#${l.id}`} onClick={() => setOpen(false)} className="h-display text-5xl sm:text-6xl hover:text-sky">{l.label}</a>
                </motion.li>
              ))}
            </ul>
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary">Let’s Talk</a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
