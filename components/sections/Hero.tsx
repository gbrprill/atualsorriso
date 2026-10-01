import { ContactButton } from '@/components/ui/ContactButton';
import { MediaPlaceholder } from '@/components/ui/Placeholder';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow" data-hero-in>
            Atual Sorriso · Francisco Beltrão
          </p>
          <h1 id="hero-title" className="t-hero" data-hero-title>
            Seu sorriso, cuidado de perto.
          </h1>
          <p className="t-lead" data-hero-in>
            Conheça nossos procedimentos, a equipe e histórias de cuidado. Conte o que você procura e converse sobre o seu próximo passo.
          </p>
          <div className="btn-row" data-hero-in>
            <ContactButton position="hero" />
            <a className="btn btn--secondary" href="#procedimentos">
              Conhecer os procedimentos
            </a>
          </div>
          <p className="hero__micro" data-hero-in>
            A equipe orienta você sobre os horários disponíveis.
          </p>
        </div>
        <div className="hero__media">
          <span className="hero__frame" data-hero-frame aria-hidden="true" />
          <div data-hero-media>
            <MediaPlaceholder
              large
              priority
              slot={{
                id: 'HERO-01',
                src: null,
                placeholderLabel: '[EQUIPE / ATENDIMENTO ACOLHEDOR]',
                alt: 'Equipe da Atual Sorriso em atendimento',
                aspectRatio: '4/5',
                editorialState: 'placeholder',
              }}
              purpose="[EQUIPE / ATENDIMENTO ACOLHEDOR]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
