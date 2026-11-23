import { ArrowUp } from 'lucide-react'
import { navLinks, personalInfo } from '../data/personalInfo.js'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy/40">
      <div aria-hidden className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[40rem] max-w-full -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div>
            <p className="font-display text-3xl font-extrabold">{personalInfo.name}</p>
            <p className="mt-2 font-serif text-2xl italic text-ice">{personalInfo.footerTagline}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-14 gap-y-3 text-mute">
            {navLinks.map((l) => <a key={l.id} href={`#${l.id}`} className="hover:text-white">{l.label}</a>)}
          </nav>
          <div className="flex flex-col gap-3 text-mute">
            {personalInfo.socials.map((s) => <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">{s.label}</a>)}
          </div>
        </div>
        <div className="mt-14 flex items-center justify-between border-t border-white/10 pt-6 text-sm text-mute">
          <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <a href="#home" aria-label="Back to top" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 transition hover:-translate-y-1 hover:bg-brand"><ArrowUp size={18} /></a>
        </div>
      </div>
    </footer>
  )
}
