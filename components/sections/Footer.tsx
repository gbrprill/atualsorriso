import { siteConfig } from '@/data/siteConfig';
import { IconInstagram, IconPin } from '@/components/ui/Icons';
import { Reveal } from '@/components/motion/Reveal';

export function Footer() {
  const { legal, links } = siteConfig;
  return (
    <footer className="footer on-dark">
      <Reveal className="container footer__grid">
        <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
          <span className="logo-ph">[LOGO OFICIAL]</span>
          <p className="t-small">Odontologia e estética em {siteConfig.city}.</p>
        </div>
        <div>
          <h3>Dados cadastrais</h3>
          <p className="t-small">{legal.cnpj}</p>
          <p className="t-small">{legal.legalAddress}</p>
          <p className="t-small">Responsável técnica: {siteConfig.responsibleTechnician}</p>
        </div>
        <div>
          <h3>Endereço</h3>
          <p className="t-small">{siteConfig.address.value}</p>
          <p className="t-small">{legal.privacy}</p>
        </div>
        <div>
          <h3>Links</h3>
          <ul>
            <li>
              <a href={links.instagram} target="_blank" rel="noopener noreferrer">
                <IconInstagram style={{ width: 18, height: 18, marginRight: 8 }} />
                Instagram<span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
            <li>
              <a href={links.maps} target="_blank" rel="noopener noreferrer">
                <IconPin style={{ width: 18, height: 18, marginRight: 8 }} />
                Google Maps<span className="sr-only"> (abre em nova aba)</span>
              </a>
            </li>
          </ul>
        </div>
      </Reveal>
    </footer>
  );
}
