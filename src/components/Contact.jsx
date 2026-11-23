import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import { personalInfo } from '../data/personalInfo.js'
import useMagnetic from '../hooks/useMagnetic.js'

const types = ['Cinematic Editing', 'Social Media', 'Motion Graphics', 'Color Grading', 'YouTube Content', 'Other']
const field = 'w-full rounded-2xl border border-white/10 bg-navy px-5 py-4 text-white placeholder:text-mute/60 focus:border-sky focus:outline-none'

export default function Contact() {
  const [v, setV] = useState({ name: '', email: '', type: '', message: '' })
  const [err, setErr] = useState({})
  const [done, setDone] = useState(false)
  const mag = useMagnetic()
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const x = {}
    if (v.name.trim().length < 2) x.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(v.email)) x.email = 'Enter a valid email address.'
    if (!v.type) x.type = 'Choose a project type.'
    if (v.message.trim().length < 10) x.message = 'Write at least 10 characters.'
    setErr(x)
    if (Object.keys(x).length) return
    // No backend is configured, so this opens the visitor's email app with the message prefilled.
    const body = `Name: ${v.name}\nEmail: ${v.email}\nProject type: ${v.type}\n\n${v.message}`
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent('Project inquiry: ' + v.type)}&body=${encodeURIComponent(body)}`
    setDone(true)
  }
  const E = ({ k }) => err[k] ? <p role="alert" className="mt-2 text-sm text-red-300">{err[k]}</p> : null

  return (
    <section id="contact" className="section">
      <SectionHeading sub="Let’s collaborate and turn your ideas into something visually unforgettable.">Have a story <em className="ital normal-case">to tell?</em></SectionHeading>
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          {[[Mail, 'Email', personalInfo.email, `mailto:${personalInfo.email}`], [Phone, 'Phone', personalInfo.phone, `tel:${personalInfo.phone.replace(/\s/g, '')}`], [MapPin, 'Location', personalInfo.location]].map(([Icon, l, t, h]) => {
            const inner = <><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/15 text-sky"><Icon size={20} /></span><span className="min-w-0"><span className="block text-sm text-mute">{l}</span><span className="block break-words font-medium">{t}</span></span></>
            return h ? <a key={l} href={h} className="flex items-center gap-4 transition hover:text-sky">{inner}</a> : <div key={l} className="flex items-center gap-4">{inner}</div>
          })}
          <div className="flex flex-wrap gap-3 pt-4">
            {personalInfo.socials.map((s) => <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !py-2.5 text-sm">{s.label}</a>)}
          </div>
        </div>
        <div className="lg:col-span-7">
          {done ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border border-sky/30 bg-card p-10 text-center" role="status">
              <CheckCircle2 className="mx-auto text-sky" size={48} />
              <h3 className="mt-4 font-display text-2xl font-bold">Your email app is opening</h3>
              <p className="mt-2 text-mute">Press send there to deliver the message. If nothing opened, write to {personalInfo.email}.</p>
              <button className="btn btn-ghost mt-6" onClick={() => { setDone(false); setV({ name: '', email: '', type: '', message: '' }) }}>Write another message</button>
            </motion.div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-5 rounded-3xl border border-white/10 bg-card p-6 md:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <div><label htmlFor="n" className="sr-only">Name</label><input id="n" className={field} placeholder="Your name" value={v.name} onChange={set('name')} /><E k="name" /></div>
                <div><label htmlFor="e" className="sr-only">Email</label><input id="e" type="email" className={field} placeholder="Your email" value={v.email} onChange={set('email')} /><E k="email" /></div>
              </div>
              <div><label htmlFor="t" className="sr-only">Project type</label>
                <select id="t" className={field} value={v.type} onChange={set('type')}><option value="">Project type</option>{types.map((t) => <option key={t} value={t} className="bg-navy">{t}</option>)}</select><E k="type" /></div>
              <div><label htmlFor="m" className="sr-only">Message</label><textarea id="m" rows={5} className={field} placeholder="Tell me about your project" value={v.message} onChange={set('message')} /><E k="message" /></div>
              <button ref={mag} type="submit" className="btn btn-primary w-full sm:w-auto">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
