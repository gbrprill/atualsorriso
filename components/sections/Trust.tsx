import { siteConfig } from '@/data/siteConfig';
import { IconArrow, IconCalendar, IconPin, IconStar } from '@/components/ui/Icons';
import { Reveal } from '@/components/motion/Reveal';
import { ReviewNote } from '@/components/ui/ReviewNote';

export function Trust() {
  const { google, trajectory, links } = siteConfig;
  return (
    <section className="trust" aria-label="Sobre a Atual Sorriso">
      <div className="container trust__grid" data-flow-inner>
        <Reveal className="trust__item">
          <IconPin />
          <p className="trust__big">Centro de Francisco Beltrão</p>
          <p className="t-small">Av. Julio Assis Cavalheiro, 318</p>
        </Reveal>
        <Reveal className="trust__item" delay={0.06}>
          <IconCalendar />
          <p className="trust__big">{trajectory.value} de trajetória</p>
          <p className="t-small">
            Odontologia e estética para diferentes momentos do sorriso.
            <ReviewNote>{trajectory.snapshot}</ReviewNote>
          </p>
        </Reveal>
        <Reveal className="trust__item" delay={0.12}>
          <IconStar />
          <p className="trust__big">
            {google.rating} no Google · {google.reviews} avaliações
          </p>
          <p className="t-small">
            <a className="text-link" href={links.reviews} target="_blank" rel="noopener noreferrer">
              <span className="ghost-text">Ver avaliações</span>
              <IconArrow className="ico-arrow" />
              <span className="sr-only"> (abre o Google Maps em nova aba)</span>
            </a>
            <ReviewNote>{google.snapshot}</ReviewNote>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
