import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import { Play, ArrowDown } from 'lucide-react'
import { personalInfo } from '../data/personalInfo.js'
import useMagnetic from '../hooks/useMagnetic.js'

const tracks = [
  [[4, 18, 'bg-brand'], [24, 14, 'bg-sky/80'], [41, 22, 'bg-brand/70'], [66, 12, 'bg-ice/70'], [81, 15, 'bg-brand']],
  [[8, 10, 'bg-sky/60'], [22, 28, 'bg-brand/50'], [54, 16, 'bg-sky/80'], [74, 20, 'bg-brand/70']],
  [[4, 30, 'bg-ice/40'], [38, 20, 'bg-ice/30'], [62, 34, 'bg-ice/40']],
]

function Timecode() {
  const [f, setF] = useState(0)
  useEffect(() => { const t = setInterval(() => setF((n) => (n + 1) % (24 * 90)), 1000 / 24); return () => clearInterval(t) }, [])
  const p = (n) => String(n).padStart(2, '0')
  return <span className="tabular-nums">00:{p(Math.floor(f / 24 / 60))}:{p(Math.floor(f / 24) % 60)}:{p(f % 24)}</span>
}

export default function Hero() {
  const root = useRef(null)
  const m1 = useMagnetic(), m2 = useMagnetic()

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from('.hero-line > span', { yPercent: 110, duration: 1.2, stagger: 0.12 })
        .from('.hero-fade', { opacity: 0, y: 24, duration: 0.9, stagger: 0.1 }, '-=0.7')
        .from('.hero-monitor', { opacity: 0, y: 60, scale: 0.96, duration: 1.2 }, '-=1')
      gsap.to('.hero-parallax', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={root} className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-20">
      <div aria-hidden className="absolute inset-0">
        <div className="drift absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-brand/25 blur-[140px]" />
        <div className="drift absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-sky/15 blur-[140px]" style={{ animationDelay: '-6s' }} />
      </div>
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="hero-fade mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-ice">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-sky" /></span>
            Available for Projects
          </div>
          <h1 className="h-display text-[clamp(2.6rem,8.2vw,6.8rem)]" aria-label="I turn ideas into visual stories.">
            <span className="hero-line block overflow-hidden"><span className="block">I turn ideas</span></span>
            <span className="hero-line block overflow-hidden"><span className="block">into <em className="ital normal-case !text-[1.1em]">visual</em></span></span>
            <span className="hero-line block overflow-hidden"><span className="block">stories.</span></span>
          </h1>
          <p className="hero-fade mt-8 max-w-xl text-lg text-mute">I’m a creative video editor focused on cinematic storytelling, engaging visuals, and impactful content that connects with audiences.</p>
          <div className="hero-fade mt-10 flex flex-wrap gap-4">
            <a ref={m1} href="#portfolio" className="btn btn-primary"><Play size={18} fill="currentColor" /> Explore My Work</a>
            <a ref={m2} href="#contact" className="btn btn-ghost">Let’s Collaborate</a>
          </div>
        </div>

        {/* Editing-suite visual: monitor + timeline with moving playhead */}
        <div className="hero-monitor hero-parallax lg:col-span-5">
          <div className="floaty rounded-3xl border border-white/10 bg-navy/80 p-3 shadow-[0_40px_120px_-30px_rgba(40,120,240,.6)] backdrop-blur">
            <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-brand/50 via-navy to-ink">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(169,201,255,.35),transparent_55%)]" />
              <div className="absolute inset-0 flex items-center justify-center"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/30 backdrop-blur"><Play fill="white" size={22} /></div></div>
              <div className="absolute bottom-3 left-4 flex items-center gap-2 text-xs text-ice"><span className="h-2 w-2 animate-pulse rounded-full bg-red-400" /> REC <Timecode /></div>
            </div>
            <div className="relative mt-3 space-y-2 rounded-2xl bg-ink/60 p-3" aria-hidden>
              {tracks.map((row, i) => (
                <div key={i} className="relative h-5">
                  {row.map(([l, w, c], j) => <div key={j} className={`absolute top-0 h-full rounded ${c}`} style={{ left: `${l}%`, width: `${w}%` }} />)}
                </div>
              ))}
              <div className="playhead absolute -top-1 bottom-0 w-px bg-white shadow-[0_0_12px_#65A5FF]"><div className="absolute -top-1 -left-1 h-2.5 w-2.5 rounded-sm bg-white" /></div>
            </div>
          </div>
          <p className="mt-5 text-center text-sm text-mute">{personalInfo.tagline}</p>
        </div>
      </div>
      <a href="#about" aria-label="Scroll down" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-mute md:flex">
        Scroll <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  )
}
