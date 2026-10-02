'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SectionHead } from '@/components/ui/SectionHead';
import { ReviewNote } from '@/components/ui/ReviewNote';
import { ContactButton } from '@/components/ui/ContactButton';
import { registerSnap } from '@/lib/scroll';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Textos propostos para validação da clínica. */
const steps = [
  { title: 'Conte o que procura', text: 'Fale sobre sua dúvida ou sobre o cuidado que deseja conhecer.' },
  { title: 'Converse com a equipe', text: 'Receba orientações sobre o atendimento e os horários disponíveis.' },
  { title: 'Combine sua visita', text: 'Escolha com a equipe o próximo passo para sua avaliação.' },
];

/**
 * Desktop: a seção fica presa; uma linha única vai se preenchendo e cada gesto de rolagem revela
 * uma etapa inteira (o ímã do SmoothScroll avança de etapa em etapa, sem parar no meio).
 * Celular: sem prender; cada etapa entra ao chegar na tela. Movimento reduzido: tudo visível.
 */
export function FirstConversation() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 992px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)', () => {
        const items = gsap.utils.toArray<HTMLElement>('.step');
        const fill = root.current!.querySelector('.steps__fill');
        const railEl = root.current!.querySelector('.steps__rail');
        const cta = root.current!.querySelector('.steps__cta');
        gsap.set([...items, cta], { opacity: 0, y: 24 });
        gsap.set(fill, { scaleX: 0 });
        gsap.set(railEl, { scaleX: 0, opacity: 0 });
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=150%', pin: true, scrub: 0.6 },
        });
        // A linha só passa a existir quando a primeira etapa começa a aparecer.
        tl.to(railEl, { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }, 0);
        items.forEach((step, i) => {
          tl.to(fill, { scaleX: (i + 1) / items.length, duration: 0.6, ease: 'power2.inOut' }, i)
            .to(step, { opacity: 1, y: 0, duration: 0.6 }, i + 0.15)
            .addLabel(`step-${i + 1}`, i + 0.8);
        });
        tl.to(cta, { opacity: 1, y: 0, duration: 0.5 }, items.length - 0.4).to({}, { duration: 0.25 });

        const off = registerSnap(() => {
          const t = tl.scrollTrigger;
          if (!t) return null;
          const pts = items.map((_, i) => Math.round(t.labelToScroll(`step-${i + 1}`)));
          return { points: [Math.round(t.start), ...pts], stepRange: [t.start, pts[pts.length - 1]] };
        });
        return off;
      });

      mm.add('(max-width: 991.98px) and (prefers-reduced-motion: no-preference), (max-height: 639.98px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.step, .steps__cta').forEach((el) => {
          gsap.from(el, { opacity: 0, y: 18, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="section section--soft steps-sec" aria-labelledby="first-title" data-flow>
      <div className="container" data-flow-inner>
        <SectionHead eyebrow="Primeira conversa" title="O primeiro passo é simples." titleId="first-title">
          <ReviewNote>Textos das etapas propostos para validação da clínica.</ReviewNote>
        </SectionHead>
        <div className="steps__rail" aria-hidden="true">
          <span className="steps__fill" />
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step__n" aria-hidden="true">
                {i + 1}
              </span>
              <div className="step__body">
                <h3 className="step__title">
                  <span className="sr-only">Passo {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="step__text">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="steps__cta">
          <ContactButton position="steps" />
        </div>
      </div>
    </section>
  );
}
