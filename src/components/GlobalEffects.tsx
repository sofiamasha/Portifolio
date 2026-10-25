import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import type { ISourceOptions } from '@tsparticles/engine'

export function GlobalEffects() {
  const [ready, setReady] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    let alive = true
    void initParticlesEngine(async (engine) => {
      const { loadSlim } = await import('@tsparticles/slim')
      await loadSlim(engine)
    }).then(() => {
      if (alive) setReady(true)
    })
    return () => { alive = false }
  }, [])

  useEffect(() => {
    const hero = document.querySelector('#intro')
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.02 })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return
    const dot = document.querySelector<HTMLElement>('.cursor-dot')
    const halo = document.querySelector<HTMLElement>('.cursor-halo')
    if (!dot || !halo) return
    let x = -80, y = -80, hx = x, hy = y, raf = 0
    const move = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest('a, button, [role="button"]') : null
      if (!target) { x = event.clientX; y = event.clientY; return }
      const bounds = target.getBoundingClientRect()
      x = event.clientX + (bounds.left + bounds.width / 2 - event.clientX) * 0.16
      y = event.clientY + (bounds.top + bounds.height / 2 - event.clientY) * 0.16
    }
    const tick = () => {
      hx += (x - hx) * 0.16
      hy += (y - hy) * 0.16
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
      halo.style.transform = `translate3d(${hx}px, ${hy}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    const over = (event: Event) => {
      const target = event.target instanceof Element ? event.target.closest('a, button, [role="button"]') : null
      document.body.classList.toggle('cursor-active', Boolean(target))
    }
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.body.classList.remove('cursor-active')
    }
  }, [reduced])

  const options: ISourceOptions = {
    fullScreen: { enable: false },
    detectRetina: true,
    fpsLimit: reduced ? 12 : 45,
    particles: {
      number: { value: reduced ? 6 : 55, density: { enable: true, width: 1000, height: 850 } },
      color: { value: ['#FF3CAC', '#784BA0', '#2B86C5'] },
      links: { enable: true, distance: 145, color: { value: ['#FF3CAC', '#784BA0', '#2B86C5'] }, opacity: reduced ? 0.08 : 0.22, width: 0.7 },
      move: { enable: !reduced, speed: 0.35, direction: 'none', outModes: { default: 'out' } },
      opacity: { value: { min: 0.12, max: 0.36 } },
      size: { value: { min: 1, max: 2.2 } },
    },
    interactivity: {
      events: { onHover: { enable: !reduced, mode: 'grab' }, resize: { enable: true } },
      modes: { grab: { distance: 135, links: { opacity: 0.45 } } },
    },
    responsive: [{ maxWidth: 767, options: { particles: { number: { value: reduced ? 4 : 22 }, links: { distance: 105 } } } }],
  }

  return <>
    {ready && <Particles id="ambient-particles" className={`ambient-particles${visible ? ' ambient-particles--dim' : ''}`} options={options} />}
    <div className="scroll-progress" aria-hidden="true"><span id="scroll-progress-fill" /></div>
    <div className="cursor-halo" aria-hidden="true" /><div className="cursor-dot" aria-hidden="true" />
  </>
}

export function LoadingScreen() {
  return <div className="loading-screen" role="status" aria-live="polite">
    <p className="loading-name">SOFIA DE ABREU</p>
    <span className="loading-caption">preparando a experiência</span>
    <div className="loading-track"><span /></div>
  </div>
}
