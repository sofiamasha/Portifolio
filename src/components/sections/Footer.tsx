import { ArrowDown, ArrowUpRight, Github, Instagram, Linkedin, Mail } from 'lucide-react'
import { portfolio } from '../../data/portfolio'

const links = [
  { label: 'GitHub', href: portfolio.socials.github, Icon: Github },
  { label: 'LinkedIn', href: portfolio.socials.linkedin, Icon: Linkedin },
  { label: 'Instagram', href: portfolio.socials.instagram, Icon: Instagram },
  { label: 'E-mail', href: `mailto:${portfolio.email}`, Icon: Mail },
]

export default function Footer() {
  return <footer id="contato" className="footer-section">
    <div className="footer-top section-shell"><span className="eyebrow"><i /> CONTATO</span><a className="back-top" href="#intro">Voltar ao início <ArrowDown size={14} /></a></div>
    <div className="footer-main section-shell"><div><h2>Vamos construir<br /><em>algo que importa?</em></h2><a className="footer-email" href={`mailto:${portfolio.email}`}>{portfolio.email}<ArrowUpRight size={18} /></a></div>
      <nav className="social-links" aria-label="Redes sociais">{links.map(({ label, href, Icon }) => <a key={label} href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer" aria-label={label} title={label}><Icon size={18} /><span>{label}</span><ArrowUpRight className="social-arrow" size={13} /></a>)}</nav>
    </div>
    <div className="footer-bottom section-shell"><span>© {new Date().getFullYear()} {portfolio.name}</span><span>Feito com intenção <i>✦</i></span><span>Engenharia · Produto · Pessoas</span></div>
  </footer>
}
