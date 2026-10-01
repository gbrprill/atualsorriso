import { testimonials } from '@/data/testimonials';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';

export function Testimonials() {
  return (
    <section className="section" aria-labelledby="depo-title">
      <div className="container">
        <SectionHead eyebrow="Depoimentos" title="O que pacientes contam sobre o cuidado." titleId="depo-title">
          <p className="t-small">Módulo opcional. Só publicar com depoimento e autorização aprovados. Não é a nota do Google.</p>
        </SectionHead>
        <ul className="quotes">
          {testimonials.map((t, i) => (
            <li key={t.id}>
              <Reveal kind="media" delay={i * 0.12} className="quote">
                <blockquote>{t.quote}</blockquote>
                <p className="t-small">
                  {t.author} · {t.source}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
