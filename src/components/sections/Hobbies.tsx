import { motion } from 'framer-motion'
import SectionTitle from '../SectionTitle'
import { hobbies } from '../../data/portfolio'

export default function Hobbies() {
  return <section className="section-shell section-pad hobbies-section">
    <SectionTitle index="07" eyebrow="FORA DA TELA" title="O que também me move." copy="Interesses que alimentam a maneira como aprendo, colaboro e conto histórias." />
    <div className="hobbies-grid">{hobbies.map((item, i) => <motion.article className="hobby-card" key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55, delay: i * 0.08 }}>
      <span className="hobby-number">{item.number}</span><span className="hobby-icon" aria-hidden="true">{item.icon}</span><h3>{item.title}</h3><p>{item.detail}</p><span className="hobby-skill"><i />{item.skill}</span>
    </motion.article>)}</div>
  </section>
}
