import { ContactButton } from '@/components/ui/ContactButton';
import { Reveal } from '@/components/motion/Reveal';

export function FinalCta() {
  return (
    <section className="section final on-dark" aria-labelledby="final-title" data-flow>
      <div className="container" data-flow-inner>
        <Reveal className="copy">
          <h2 id="final-title" className="t-h2">
            Vamos conversar sobre o seu sorriso?
          </h2>
          <p className="t-lead">Conte o que você procura e tire suas dúvidas com a equipe.</p>
          <div data-final-cta>
            <ContactButton variant="light" position="final" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
