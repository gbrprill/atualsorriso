import { ContactButton } from '@/components/ui/ContactButton';
import { Reveal } from '@/components/motion/Reveal';

export function FinalCta() {
  return (
    <section className="section final on-dark" aria-labelledby="final-title">
      <div className="container">
        <div className="copy">
          <Reveal>
            <h2 id="final-title" className="t-h2">
              Vamos conversar sobre o seu sorriso?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-lead">Conte o que você procura e tire suas dúvidas com a equipe.</p>
          </Reveal>
          <Reveal kind="media" delay={0.22}>
            <ContactButton variant="light" position="final" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
