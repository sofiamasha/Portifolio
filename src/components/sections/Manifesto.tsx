import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { portfolio } from '../../data/portfolio'

export default function Manifesto() {
  return <section className="manifesto section-shell">
    <motion.div className="manifesto-inner" initial={{ opacity: 0, y: 36, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
      <span className="eyebrow"><i /> OLÁ, EU SOU A {portfolio.name.toUpperCase()}</span>
      <h2>Mais que um portfólio,<br /><em>uma trajetória.</em></h2>
      <div className="manifesto-bottom"><p>Tecnologia, produto e gente — no mesmo caminho.</p><a className="round-link" href="#sobre" aria-label="Conheça Sofia"><ArrowDownRight size={20} /></a></div>
      <span className="manifesto-index">INTRO / 07</span><ArrowUpRight className="manifesto-mark" aria-hidden="true" />
    </motion.div>
  </section>
}
