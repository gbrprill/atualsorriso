'use client';

import { useEffect, useRef } from 'react';
import { ContactButton } from '@/components/ui/ContactButton';
import { IconArrow } from '@/components/ui/Icons';

/** Copy aprovada para revisão. Texto sem promessa de resultado; validar com a clínica antes de publicar. */
const copy = {
  s1: {
    label: 'Lentes de resina',
    title: 'Reencontre a vontade de sorrir',
    sub: 'Na Atual Sorriso, cada história é ouvida antes de qualquer indicação, para o sorriso voltar a ser seu.',
  },
  s2: {
    label: 'Otomodelação',
    title: 'Autoestima também se cuida',
    sub: 'Um atendimento humano, com escuta e avaliação individual, a cada passo.',
  },
  cta: 'Quero minha avaliação',
};

export function HeroStage() {
  const root = useRef<HTMLDivElement>(null);

  // Com movimento reduzido, não reproduz automaticamente.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () =>
      root.current?.querySelectorAll('video').forEach((v) => {
        if (mq.matches) v.pause();
        else void v.play().catch(() => {});
      });
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return (
    <div className="stage" data-stage ref={root}>
      <section className="stage__sticky" aria-label="Apresentação" id="inicio">
        <div className="scene scene--1">
          <video className="scene__video" data-s1-video src="/videos/lentes.mp4" muted loop playsInline autoPlay preload="auto" aria-hidden="true" tabIndex={-1} />
          <div className="scene__scrim" data-s1-scrim />
          <p className="scene__label" data-s1-label>
            {copy.s1.label}
          </p>
          <div className="scene__copy">
            <h1 className="scene__title" data-s1-title>
              {copy.s1.title}
            </h1>
            <p className="scene__sub" data-s1-sub>
              {copy.s1.sub}
            </p>
          </div>
        </div>

        <div className="scene scene--2">
          <video className="scene__video" data-s2-video src="/videos/otomodelacao.mp4" muted loop playsInline autoPlay preload="auto" aria-hidden="true" tabIndex={-1} />
          <div className="scene__scrim" data-s2-scrim />
          <p className="scene__label" data-s2-label>
            {copy.s2.label}
          </p>
          <div className="scene__copy">
            <h2 className="scene__title" data-s2-title>
              {copy.s2.title}
            </h2>
            <p className="scene__sub" data-s2-sub>
              {copy.s2.sub}
            </p>
          </div>
        </div>

        <div className="stage__dots" aria-hidden="true">
          <span data-dot="1" />
          <span data-dot="2" />
        </div>
        <p className="stage__hint" data-stage-hint aria-hidden="true">
          <span className="stage__hint-line" />
          Role
        </p>
        <div className="stage__cta" data-stage-cta>
          <ContactButton position="hero" variant="trace" icon={false}>
            <>
              {copy.cta}
              <IconArrow className="ico-arrow" />
            </>
          </ContactButton>
        </div>
      </section>
    </div>
  );
}
