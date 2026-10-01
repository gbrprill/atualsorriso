import { siteConfig } from '@/data/siteConfig';
import { IconCalendar, IconPin, IconStar } from '@/components/ui/Icons';
import { Reveal } from '@/components/motion/Reveal';

export function Trust() {
  const { google } = siteConfig;
  return (
    <section className="trust" aria-label="Confiança local">
      <div className="container trust__grid">
        <Reveal className="trust__item" amount={0.3}>
          <IconPin />
          <p className="trust__big">Centro de Francisco Beltrão</p>
          <p className="t-small">Av. Julio Assis Cavalheiro, 318</p>
        </Reveal>
        <Reveal className="trust__item" delay={0.1} amount={0.3}>
          <IconCalendar />
          <p className="trust__big">
            15 anos de trajetória
          </p>
          <p className="t-small">Informação do perfil da clínica no Instagram (2026)</p>
        </Reveal>
        <Reveal className="trust__item" delay={0.2} amount={0.3}>
          <IconStar />
          <p className="trust__big">
            {google.rating} no Google · {google.reviews} avaliações
          </p>
          <p className="t-small">{google.snapshot}. Os números podem mudar.</p>
        </Reveal>
      </div>
    </section>
  );
}
