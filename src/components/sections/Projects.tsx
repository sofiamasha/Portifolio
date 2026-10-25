import { ArrowUpRight, MoveUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionTitle from '../SectionTitle'
import { projects } from '../../data/portfolio'

export default function Projects() {
  return <section className="section-shell section-pad projects-section">
    <SectionTitle index="05" eyebrow="PROJETOS" title="Ideias em movimento." copy="Cada projeto é uma oportunidade de conectar engenharia, experiência e impacto." />
    <div className="projects-grid">
      {projects.map((project, i) => <motion.article className={`project-card project-card--${project.accent}`} key={project.title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.55, delay: (i % 3) * 0.07 }}>
        <div className="project-card-top"><span className="project-number">{project.number} / 10</span>{project.period && <span className="project-period">{project.period}</span>}</div>
        <div className="project-visual" aria-hidden="true"><span className="visual-grid" /><span className="visual-orbit visual-orbit--one" /><span className="visual-orbit visual-orbit--two" /><span className="visual-core"><MoveUpRight size={28} strokeWidth={1.1} /></span><span className="visual-category">{project.category}</span></div>
        <div className="project-content"><div className="project-title-row"><h3>{project.title}</h3><span className="project-arrow" aria-hidden="true"><ArrowUpRight size={16} /></span></div><p>{project.description}</p><ul className="project-tags">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul></div>
      </motion.article>)}
    </div>
  </section>
}
