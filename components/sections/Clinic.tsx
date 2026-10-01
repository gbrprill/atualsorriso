import { siteConfig } from '@/data/siteConfig';
import { MediaPlaceholder } from '@/components/ui/Placeholder';
import { MapsLink } from '@/components/ui/ActionButtons';
import { Reveal } from '@/components/motion/Reveal';

export function Clinic() {
  return (
    <section id="clinica" className="section section--surface" aria-labelledby="clinic-title">
      <div className="container split">
        <Reveal kind="left" duration={1}>
          <div className="clinic-media">
            <MediaPlaceholder
              large
              slot={{ id: 'CLINIC-01', src: null, placeholderLabel: '[AMBIENTE DA CLÍNICA]', alt: '', aspectRatio: '4/5', editorialState: 'placeholder' }}
              purpose="[AMBIENTE DA CLÍNICA]"
            />
            <MediaPlaceholder
              portrait
              slot={{ id: 'HUMAN-01', src: null, placeholderLabel: '[MOMENTO DE ACOLHIMENTO]', alt: '', aspectRatio: '4/5', editorialState: 'placeholder' }}
              purpose="[MOMENTO DE ACOLHIMENTO]"
            />
          </div>
        </Reveal>
        <Reveal kind="right" duration={1} delay={0.1} className="copy">
          <p className="eyebrow">A clínica</p>
          <h2 id="clinic-title" className="t-h2">
            Conheça o espaço da Atual Sorriso.
          </h2>
          <p className="t-lead">Veja o ambiente onde a equipe recebe você.</p>
          <p>{siteConfig.institutionalText}</p>
          <div>
            <MapsLink position="clinic" variant="ghost" icon={false}>
              Veja como chegar
            </MapsLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
