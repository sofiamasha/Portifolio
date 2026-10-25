import { ArrowUpRight, Compass, Layers3, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionTitle from '../SectionTitle'
import { portfolio } from '../../data/portfolio'

const principles = [
  { icon: Compass, label: 'Experiência com intenção', text: 'Jornada do usuário no centro de cada decisão.' },
  { icon: Layers3, label: 'Do backend ao produto', text: 'Uma visão completa, da arquitetura à interface.' },
  { icon: Sparkles, label: 'Aprender fazendo', text: 'Curiosidade para explorar e coragem para construir.' },
]

export default function About() {
  return <section className="section-shell section-pad about-section">
    <SectionTitle index="01" eyebrow="SOBRE MIM" title="Código com propósito." copy="Construir bem começa com entender para quem estamos construindo." />
    <div className="about-layout">
      <motion.div className="about-copy" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.65 }}>
        <span className="mono-label">{portfolio.course} <i /> {portfolio.courseDates}</span>
        <p>{portfolio.bio}</p>
        <a className="text-link" href={portfolio.socials.linkedin} target="_blank" rel="noreferrer">Conecte-se comigo <ArrowUpRight size={15} /></a>
      </motion.div>
      <div className="principles-list">
        {principles.map(({ icon: Icon, label, text }, i) => <motion.article className="principle-card" key={label} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.1 }}>
          <span className="principle-icon"><Icon size={18} strokeWidth={1.6} /></span><div><h3>{label}</h3><p>{text}</p></div><span className="principle-no">0{i + 1}</span>
        </motion.article>)}
      </div>
    </div>
  </section>
}
