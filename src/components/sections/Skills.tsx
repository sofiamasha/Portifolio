import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import SectionTitle from '../SectionTitle'
import { skills } from '../../data/portfolio'

function SkillLabels({ active, setHovered, setSelected }: { active: string | null; setHovered: (name: string | null) => void; setSelected: (name: string | null) => void }) {
  const points = skills.map((skill, i) => {
    const phi = Math.acos(1 - 2 * (i + 0.5) / skills.length)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    return { skill, position: [2 * Math.sin(phi) * Math.cos(theta), 2 * Math.cos(phi), 2 * Math.sin(phi) * Math.sin(theta)] as [number, number, number] }
  })
  return <group>
    <mesh><icosahedronGeometry args={[1.9, 2]} /><meshBasicMaterial color="#8e5ab2" wireframe transparent opacity={0.17} /></mesh>
    <mesh><sphereGeometry args={[1.82, 28, 28]} /><meshBasicMaterial color="#0e0d17" transparent opacity={0.52} /></mesh>
    <mesh><sphereGeometry args={[1.86, 28, 28]} /><meshBasicMaterial color="#2b86c5" wireframe transparent opacity={0.09} /></mesh>
    {points.map(({ skill, position }) => <Html key={skill.name} position={position} center distanceFactor={8}>
      <button type="button" className={`globe-label${active === skill.name ? ' is-selected' : ''}`} onMouseEnter={() => setHovered(skill.name)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(skill.name)} onBlur={() => setHovered(null)} onClick={() => setSelected(skill.name)} aria-label={`${skill.name}: ${skill.context}`}>
        <i />{skill.name}
      </button>
    </Html>)}
  </group>
}

export default function Skills() {
  const [selected, setSelected] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [webgl] = useState(() => {
    if (typeof document === 'undefined') return false
    const canvas = document.createElement('canvas')
    try { return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')) } catch { return false }
  })
  const [reducedMotion, setReducedMotion] = useState(false)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  const active = selected ?? hovered
  const context = skills.find((skill) => skill.name === active)?.context
  return <section className="section-shell section-pad skills-section">
    <SectionTitle index="02" eyebrow="SKILLS" title="Ferramentas para dar forma." copy="Tecnologia é repertório. O que importa é saber quando e por que usar cada peça." />
    <div className="skills-layout">
      <div className="globe-wrap" aria-label="Globo interativo com tecnologias usadas por Sofia">
        {webgl ? <Canvas camera={{ position: [0, 0, 7], fov: 40 }} dpr={[1, 1.35]} gl={{ alpha: true, antialias: true }}>
          <ambientLight intensity={0.5} /><SkillLabels active={active} setHovered={setHovered} setSelected={setSelected} />
          <OrbitControls enablePan={false} enableZoom={false} autoRotate={!active && !reducedMotion} autoRotateSpeed={0.23} minPolarAngle={0.55} maxPolarAngle={2.58} />
        </Canvas> : <div className="globe-static" role="img" aria-label="Ilustração estática de um globo tecnológico"><span>14</span><small>TECNOLOGIAS</small><i /><b /><em /></div>}
        <span className="globe-caption">14 TECNOLOGIAS · 01 DIREÇÃO</span>
        <p className="sr-only">{skills.map((skill) => skill.name).join(', ')}</p>
      </div>
      <div className="skills-copy">
        <span className="mono-label">{selected ? 'EM CONTEXTO' : 'TECNOLOGIA + PRODUTO'} <i /></span>
        <h3>{active ?? 'Uma stack que conversa.'}</h3>
        <p aria-live="polite">{context ?? 'Do desenvolvimento backend à experiência da interface, cada ferramenta entra para resolver uma parte concreta do problema.'}</p>
        <div className="skill-pills" aria-label="Competências técnicas">
          {skills.map((skill) => <button key={skill.name} type="button" className={selected === skill.name ? 'active' : ''} onClick={() => setSelected(selected === skill.name ? null : skill.name)}>{skill.name}</button>)}
        </div>
        <span className="skills-hint">toque em uma tecnologia para ver o contexto de uso</span>
      </div>
    </div>
  </section>
}
