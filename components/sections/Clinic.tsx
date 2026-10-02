import { siteConfig } from '@/data/siteConfig';
import { MediaPlaceholder } from '@/components/ui/Placeholder';
import { ContactButton } from '@/components/ui/ContactButton';
import { RouteLink } from '@/components/ui/ActionButtons';
import { Reveal } from '@/components/motion/Reveal';

/** Uma imagem cobrindo a seção inteira, texto e ações sobre gradiente localizado. */
export function Clinic() {
  return (
    <section id="clinica" className="clinic-sec on-dark" aria-labelledby="clinic-title" data-flow>
      <div className="clinic-sec__bg" aria-hidden="true">
        <MediaPlaceholder
          fill
          slot={{
            id: 'CLINIC-01',
            src: null,
            placeholderLabel: '[AMBIENTE DA CLÍNICA]',
            alt: '',
            aspectRatio: '16/9',
            mockup: { src: '/mockups/clinic.jpg', position: '50% 55%' },
            editorialState: 'placeholder',
          }}
          purpose="[AMBIENTE DA CLÍNICA]"
        />
      </div>
      <div className="clinic-sec__shade" aria-hidden="true" />
      <div className="container clinic-sec__inner" data-flow-inner>
        <Reveal className="clinic-sec__copy">
          <p className="eyebrow eyebrow--light">A clínica</p>
          <h2 id="clinic-title" className="t-h2">
            Conheça o espaço da Atual Sorriso.
          </h2>
          <p className="clinic-sec__lead">Veja o ambiente onde a equipe recebe você.</p>
          <p className="clinic-sec__text">{siteConfig.institutionalText}</p>
          <div className="clinic-sec__actions">
            <ContactButton position="clinic" variant="glass" trace />
            <RouteLink position="clinic" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
