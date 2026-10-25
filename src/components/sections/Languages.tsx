import { motion } from 'framer-motion'
import { Languages as LanguagesIcon } from 'lucide-react'
import SectionTitle from '../SectionTitle'
import { languages } from '../../data/portfolio'

export default function Languages() {
  return <section className="section-shell section-pad languages-section">
    <SectionTitle index="06" eyebrow="IDIOMAS" title="Conexões sem fronteiras." copy="Idiomas abrem novas formas de colaborar, aprender e compartilhar ideias." />
    <div className="language-panel"><div className="language-intro"><span className="language-mark"><LanguagesIcon size={20} /></span><span className="mono-label">COMUNICAÇÃO EM CAMADAS <i /></span><p>Quatro idiomas, cada um em uma etapa da minha jornada.</p></div>
      <div className="language-list">{languages.map((item, i) => <motion.div className="language-item" key={item.name} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
        <div className="language-meta"><span className="language-number">{item.index}</span><strong>{item.name}</strong><span className="language-level">{item.level}</span></div>
        <div className="language-track" role="img" aria-label={`${item.name}: ${item.level}`}><motion.span variants={{ hidden: { width: 0 }, show: { width: `${item.value}%`, transition: { duration: 1.1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] } } }} /></div>
      </motion.div>)}</div>
    </div>
  </section>
}
