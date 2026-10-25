import { motion } from 'framer-motion'

type Props = { index: string; eyebrow: string; title: string; copy?: string }

export default function SectionTitle({ index, eyebrow, title, copy }: Props) {
  return <motion.div className="section-title" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
    <span className="section-index">{index} <i /></span>
    <div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
  </motion.div>
}
