import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import SectionTitle from '../SectionTitle'
import { education } from '../../data/portfolio'

export default function Education() {
  return <section className="section-shell section-pad education-section">
    <SectionTitle index="04" eyebrow="EDUCAÇÃO" title="Uma base em construção." copy="Aprendizado contínuo, conectado à prática e aos produtos que quero criar." />
    <div className="education-grid">
      {education.map((item, i) => <motion.article className={`education-card${i === 0 ? ' education-card--current' : ''}`} key={item.course} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55, delay: i * 0.1 }}>
        <div className="education-top"><span className="edu-icon"><GraduationCap size={18} /></span><span className="edu-date">{item.date}</span></div>
        <div className="education-info"><span>{item.school}</span><h3>{item.course}</h3>{item.status && <span className="status-pill"><i />{item.status}</span>}<p>{item.detail}</p></div>
        <span className="edu-index">0{i + 1}</span>
      </motion.article>)}
    </div>
  </section>
}
