import { useState } from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionTitle from '../SectionTitle'
import { experience } from '../../data/portfolio'

export default function Experience() {
  const [open, setOpen] = useState(0)
  return <section className="section-shell section-pad experience-section">
    <SectionTitle index="03" eyebrow="EXPERIÊNCIA" title="Caminhos que se cruzam." copy="Tecnologia, comunicação e colaboração em contextos que me fazem crescer." />
    <div className="timeline-list">
      <div className="timeline-line" aria-hidden="true" />
      {experience.map((item, i) => <motion.article className={`experience-item${open === i ? ' is-open' : ''}`} key={item.role} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: i * 0.04 }}>
        <span className="timeline-node" aria-hidden="true">{item.icon}</span>
        <div className="experience-card">
          <button className="experience-toggle" type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="exp-main"><span className="exp-date">{item.date}</span><strong>{item.role}</strong><span className="exp-company">{item.company}</span></span>
            <span className="exp-aside"><span>{item.type}</span><span>{item.location}</span><i><Plus size={17} /></i></span>
          </button>
          <div className="experience-detail" hidden={open !== i}><p>{item.description}</p>{item.link && <a className="text-link" href={item.link} target="_blank" rel="noreferrer">Ver repositório <ArrowUpRight size={14} /></a>}</div>
        </div>
      </motion.article>)}
    </div>
  </section>
}
