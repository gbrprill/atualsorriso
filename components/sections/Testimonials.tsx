import { testimonials } from '@/data/testimonials';
import { siteConfig } from '@/data/siteConfig';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { ReviewNote } from '@/components/ui/ReviewNote';
import { ContactButton } from '@/components/ui/ContactButton';

/** Módulo opcional: em produção só aparece com depoimentos aprovados. */
export function Testimonials() {
  const list = siteConfig.mode === 'production' ? testimonials.filter((t) => t.editorialState === 'approved') : testimonials;
  if (!list.length) return null;
  return (
    <section className="section" aria-labelledby="depo-title" data-flow>
      <div className="container" data-flow-inner>
        <SectionHead eyebrow="Depoimentos" title="Nas palavras de quem confia no nosso cuidado." titleId="depo-title">
          <p className="t-lead">Cada história começou com uma conversa. A sua pode começar hoje.</p>
          <ReviewNote>Módulo opcional. Publicar só com depoimento e autorização aprovados. Diferente da nota do Google. Copy proposta para validação.</ReviewNote>
        </SectionHead>
        <ul className="quotes">
          {list.map((t, i) => (
            <li key={t.id}>
              <Reveal delay={i * 0.06} className="quote">
                <blockquote>{t.quote}</blockquote>
                <p className="t-small">
                  {t.author} · {t.source}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
        <div className="quotes__cta">
          <ContactButton position="testimonials">Quero começar a minha história</ContactButton>
        </div>
      </div>
    </section>
  );
}
