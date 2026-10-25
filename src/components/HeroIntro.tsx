import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolio } from '../data/portfolio'

const HeroScene = lazy(() => import('./HeroScene'))
gsap.registerPlugin(ScrollTrigger)

function webglAvailable() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch { return false }
}

export default function HeroIntro() {
  const root = useRef<HTMLElement>(null)
  const progress = useRef(0)
  const [ready, setReady] = useState(false)
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [webgl, setWebgl] = useState(() => typeof document !== 'undefined' && webglAvailable())
  const showScene = webgl && !reduced

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReduced(motion.matches)
    const updateWebgl = () => setWebgl(webglAvailable())
    motion.addEventListener('change', updateMotion)
    window.addEventListener('webglcontextlost', updateWebgl)
    return () => { motion.removeEventListener('change', updateMotion); window.removeEventListener('webglcontextlost', updateWebgl) }
  }, [])

  useEffect(() => {
    const element = root.current
    if (!element || !showScene) return
    const ctx = gsap.context(() => {
      gsap.to(progress, {
        current: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.65,
          onUpdate: (self) => {
            element.style.setProperty('--intro-progress', String(self.progress))
            const reveal = Math.min(1, Math.max(0, (self.progress - 0.75) * 5))
            const outro = Math.min(1, Math.max(0, (self.progress - 0.94) * 16))
            element.style.setProperty('--intro-terminal', String(reveal * (1 - outro)))
            element.style.setProperty('--intro-terminal-zoom', String(0.8 + reveal * 0.2 + outro * 0.22))
          },
        },
      })
    }, element)
    return () => ctx.revert()
  }, [showScene])

  return <section id="intro" ref={root} className={`hero-intro${showScene ? ' hero-intro--scroll' : ' hero-intro--static'}`} aria-label="Abertura do portfólio">
    <div className="hero-sticky">
      {showScene ? <div className="hero-canvas" aria-hidden="true">
        <Suspense fallback={<div className="scene-loading"><span /></div>}>
          <HeroScene progress={progress} onReady={() => setReady(true)} />
        </Suspense>
      </div> : <div className="hero-static-orbit" aria-hidden="true"><span /><span /><span /></div>}

      <div className="hero-copy">
        <span className="eyebrow"><i /> PORTFÓLIO · 2026</span>
        <h1 className={showScene ? 'sr-only' : 'hero-static-title'}>{portfolio.name}</h1>
        <p className="hero-role">{portfolio.role}</p>
        {!showScene && <a className="button button-primary" href="#manifesto">Entrar <ArrowRight size={16} /></a>}
      </div>
      {showScene && <span className="hero-scroll-hint"><ArrowDown size={14} /> role para explorar</span>}

      {showScene && <div className="hero-terminal" aria-hidden="true">
        <span className="terminal-path">~/portfolio <b>✦</b></span>
        <span className="terminal-line"><i>$</i> <strong>Sofia de Abreu</strong></span>
        <span className="terminal-enter">[ Enter ]</span>
      </div>}
      <p className="sr-only">{portfolio.name}, estudante de Engenharia de Software na PUC Minas. Role a página para descobrir sua trajetória.</p>

      {showScene && !ready && <div className="hero-loading"><div className="loading-name">SOFIA DE ABREU</div><div className="loading-track"><span /></div><p>carregando a experiência</p></div>}
      {showScene && ready && <div className="hero-cue"><Sparkles size={14} /> Uma trajetória em movimento</div>}
    </div>
  </section>
}
