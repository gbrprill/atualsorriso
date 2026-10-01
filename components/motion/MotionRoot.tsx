'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Toda a coreografia da página. Só roda com prefers-reduced-motion: no-preference.
 * Sem JS ou com movimento reduzido, o conteúdo já está visível no HTML.
 * Só a hero (palco de vídeos) e a barra de progresso usam GSAP. Revelações de seção: Motion (Reveal).
 * Contador e traço dos passos: Anime.js.
 */
export function MotionRoot() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.toArray as <T extends Element>(s: string) => T[];

      // Barra de progresso de leitura
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } },
      );

      // Palco de vídeos (hero fixa com duas cenas + capa subindo)
      const stage = document.querySelector<HTMLElement>('[data-stage]');
      if (stage) {
        const w = (sel: string) => stage.querySelectorAll<HTMLElement>(sel);
        const blurIn = { opacity: 0, filter: 'blur(14px)', y: 18 };
        const t1 = SplitText.create('[data-s1-title]', { type: 'words' });
        const t2 = SplitText.create('[data-s2-title]', { type: 'words' });

        // Entrada (por tempo)
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-s1-video]', { scale: 1.12, opacity: 0, duration: 1.8, ease: 'power2.out' }, 0)
          .from('[data-s1-label]', { opacity: 0, y: -8, letterSpacing: '0.5em', duration: 1.2 }, 0.5)
          .from(t1.words, { ...blurIn, duration: 1.3, stagger: 0.14 }, 0.9)
          .from('[data-s1-sub]', { ...blurIn, y: 12, duration: 1.1 }, 1.9)
          .from('[data-stage-cta]', { opacity: 0, y: 24, scale: 0.9, filter: 'blur(8px)', duration: 0.9, ease: 'back.out(1.6)' }, 2.3)
          .from('[data-stage-hint]', { opacity: 0, duration: 0.8 }, 2.6);

        // Rolagem (scrub): cena 1 → cena 2
        gsap.set(w('[data-s2-video], [data-s2-label], [data-s2-sub], [data-s2-scrim]'), { opacity: 0 });
        gsap.set(w('.scene--2'), { opacity: 1 });
        gsap.set(t2.words, blurIn);
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: stage, start: 'top top', end: '+=200%', scrub: 0.6 },
          })
          .fromTo('[data-s1-video]', { scale: 1 }, { scale: 1.1, duration: 0.6, immediateRender: false }, 0)
          .fromTo('[data-stage-hint]', { opacity: 1 }, { opacity: 0, duration: 0.08, immediateRender: false }, 0)
          .fromTo([...t1.words, ...q<HTMLElement>('[data-s1-sub]')], { opacity: 1, filter: 'blur(0px)', y: 0 }, { opacity: 0, filter: 'blur(12px)', y: -22, stagger: 0.02, duration: 0.18, immediateRender: false }, 0.04)
          .fromTo('[data-s1-label]', { opacity: 1 }, { opacity: 0, duration: 0.12, immediateRender: false }, 0.08)
          .fromTo('[data-s1-video]', { opacity: 1 }, { opacity: 0, duration: 0.22, immediateRender: false }, 0.3)
          .fromTo('[data-s1-scrim]', { opacity: 1 }, { opacity: 0, duration: 0.22, immediateRender: false }, 0.3)
          .to('[data-s2-scrim]', { opacity: 1, duration: 0.4 }, 0.3)
          .fromTo('[data-s2-video]', { opacity: 0, scale: 1.14 }, { opacity: 1, scale: 1, duration: 0.5 }, 0.3)
          .to('[data-s2-label]', { opacity: 1, duration: 0.1 }, 0.52)
          .to(t2.words, { opacity: 1, filter: 'blur(0px)', y: 0, stagger: 0.05, duration: 0.2 }, 0.56)
          .to('[data-s2-sub]', { opacity: 1, filter: 'blur(0px)', duration: 0.12 }, 0.78)
          .to('[data-dot="1"]', { scaleX: 0.4, opacity: 0.45, duration: 0.2 }, 0.3)
          .to('[data-dot="2"]', { scaleX: 1, opacity: 1, duration: 0.2 }, 0.3)
          .to({}, { duration: 0.15 }, 0.85);
      }

    });

    return () => mm.revert();
  });

  return <div ref={bar} className="progress" aria-hidden="true" />;
}
