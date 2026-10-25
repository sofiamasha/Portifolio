import { lazy, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { portfolio } from './data/portfolio'
import { GlobalEffects } from './components/GlobalEffects'
import HeroIntro from './components/HeroIntro'
import DeferredSection from './components/DeferredSection'
import Footer from './components/sections/Footer'

gsap.registerPlugin(ScrollTrigger)

const Manifesto = lazy(() => import('./components/sections/Manifesto'))
const About = lazy(() => import('./components/sections/About'))
const Skills = lazy(() => import('./components/sections/Skills'))
const Experience = lazy(() => import('./components/sections/Experience'))
const Education = lazy(() => import('./components/sections/Education'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Languages = lazy(() => import('./components/sections/Languages'))
const Hobbies = lazy(() => import('./components/sections/Hobbies'))

const navigation = [
  ['Sobre', '#sobre'], ['Skills', '#skills'], ['Experiência', '#experiencia'],
  ['Educação', '#educacao'], ['Projetos', '#projetos'], ['Contato', '#contato'],
]

export default function App() {
  const lenisRef = useRef<Lenis | null>(null)
  const animationFrame = useRef(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [presenting, setPresenting] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: !reduced, anchors: true })
    lenisRef.current = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    let scheduled = false
    const paintProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const value = max > 0 ? window.scrollY / max : 0
      document.documentElement.style.setProperty('--page-progress', String(value))
      scheduled = false
    }
    const onScroll = () => { if (!scheduled) { scheduled = true; requestAnimationFrame(paintProgress) } }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight']
    let typed: string[] = []
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPresenting(false)
      if (['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement)?.tagName)) return
      typed = [...typed, event.key].slice(-sequence.length)
      if (sequence.every((key, index) => typed[index] === key)) {
        document.body.classList.add('volley-mode')
        window.setTimeout(() => document.body.classList.remove('volley-mode'), 4500)
        typed = []
      }
    }
    window.addEventListener('keydown', onKey)
    paintProgress()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('keydown', onKey)
      gsap.ticker.remove(update)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const body = document.body
    body.classList.toggle('presentation-mode', presenting)
    if (!presenting) {
      cancelAnimationFrame(animationFrame.current)
      return () => body.classList.remove('presentation-mode')
    }
    let previous = performance.now()
    const step = (now: number) => {
      const delta = Math.min((now - previous) / 1000, 0.06)
      previous = now
      const current = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (current >= max - 2) { setPresenting(false); return }
      lenisRef.current?.scrollTo(Math.min(current + 24 * delta, max), { immediate: true })
      animationFrame.current = requestAnimationFrame(step)
    }
    animationFrame.current = requestAnimationFrame(step)
    const stop = () => setPresenting(false)
    window.addEventListener('wheel', stop, { once: true, passive: true })
    window.addEventListener('keydown', stop, { once: true })
    return () => {
      cancelAnimationFrame(animationFrame.current)
      body.classList.remove('presentation-mode')
      window.removeEventListener('wheel', stop)
      window.removeEventListener('keydown', stop)
    }
  }, [presenting])

  return <div className="app-shell">
    <a className="skip-link" href="#manifesto">Pular para o conteúdo</a>
    <GlobalEffects />
    <header className="site-header">
      <a className="brand" href="#intro" aria-label={`${portfolio.name}, início`}><span className="brand-monogram">S<span>.</span></span><span className="brand-name">SOFIA<br />DE ABREU</span></a>
      <nav className={`main-nav${menuOpen ? ' nav-open' : ''}`} aria-label="Navegação principal">
        {navigation.map(([label, href], i) => <a key={href} href={href} onClick={() => setMenuOpen(false)}><span>0{i + 1}</span>{label}</a>)}
      </nav>
      <div className="header-actions">
        <button className={`presentation-toggle${presenting ? ' is-active' : ''}`} type="button" onClick={() => setPresenting(!presenting)} aria-pressed={presenting} title={presenting ? 'Parar apresentação' : 'Iniciar modo apresentação'}><span />{presenting ? 'Parar' : 'Apresentar'}</button>
        <a className="header-contact" href={`mailto:${portfolio.email}`}>Vamos conversar <ArrowUpRight size={14} /></a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </header>
    <main>
      <HeroIntro />
      <DeferredSection id="manifesto" Component={Manifesto} minHeight={650} />
      <DeferredSection id="sobre" Component={About} minHeight={850} />
      <DeferredSection id="skills" Component={Skills} minHeight={950} />
      <DeferredSection id="experiencia" Component={Experience} minHeight={1040} />
      <DeferredSection id="educacao" Component={Education} minHeight={690} />
      <DeferredSection id="projetos" Component={Projects} minHeight={1550} />
      <DeferredSection id="idiomas" Component={Languages} minHeight={760} />
      <DeferredSection id="hobbies" Component={Hobbies} minHeight={700} />
    </main>
    <Footer />
    <div className="volley-toast" role="status" aria-live="polite">🏐 &nbsp; jogada bonita! <span>+ resiliência</span></div>
  </div>
}
