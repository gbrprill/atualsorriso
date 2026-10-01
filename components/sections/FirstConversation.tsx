import { Reveal } from '@/components/motion/Reveal';
import { DrawLine } from '@/components/motion/DrawLine';
import { SectionHead } from '@/components/ui/SectionHead';

const steps = ['Conte o que procura', 'Tire suas dúvidas com a equipe', 'Combine o próximo atendimento'];

export function FirstConversation() {
  return (
    <section className="section section--soft" aria-labelledby="first-title">
      <div className="container">
        <SectionHead eyebrow="Primeira conversa" title="O primeiro passo é simples." titleId="first-title" />
        <ol className="steps" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {steps.map((s, i) => (
            <li key={s} className="step">
              <DrawLine delay={i * 900} />
              <Reveal delay={i * 0.9 + 0.1}>
                <span className="step__n" aria-hidden="true">
                  {i + 1}
                </span>
              </Reveal>
              <Reveal kind="left" delay={i * 0.9 + 0.35}>
                <h3 className="t-card" style={{ fontSize: 22 }}>
                  <span className="sr-only">Passo {i + 1}: </span>
                  {s}
                </h3>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
