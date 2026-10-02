'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { easeOutQuart, setLenis, snapGroups } from '@/lib/scroll';

gsap.registerPlugin(ScrollTrigger);

const IDLE_MS = 120; // espera o gesto terminar antes do ímã agir
const MAGNET = 0.42; // alcance do ímã: fração da altura da tela

/**
 * Rolagem suave (Lenis) sincronizada com o ScrollTrigger + "ímã" entre seções:
 * ao começar a entrar na próxima seção, a rolagem completa o movimento e assenta no topo dela,
 * com início rápido e final lento. Não age no meio de seções longas (fora do alcance do ímã).
 * Dentro de seções em etapas, cada gesto avança exatamente uma etapa.
 * Desligado com movimento reduzido e em telas de toque (rolagem nativa).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const header = () => document.querySelector('.header')?.getBoundingClientRect().height ?? 80;
    const lenis = new Lenis({
      duration: 1.15,
      easing: easeOutQuart,
      smoothWheel: true,
      anchors: { offset: -(header() - 16), duration: 1.2, easing: easeOutQuart },
    });
    setLenis(lenis);
    if (process.env.NODE_ENV !== 'production') (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    let idle: number | undefined;
    let snapping = false;
    let dir = 1;
    // O ímã só responde a um gesto real (roda, teclado, barra de rolagem), nunca à própria animação.
    let gesture = false;

    const sectionTops = () =>
      Array.from(document.querySelectorAll<HTMLElement>('[data-flow]'))
        .filter((el) => el.offsetParent !== null)
        .map((el) => {
          const spacer = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
          return Math.round(spacer.getBoundingClientRect().top + window.scrollY);
        });

    const magnet = () => {
      if (snapping || document.querySelector('dialog[open]')) return;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const groups = snapGroups();
      const ahead = (pts: number[]) =>
        dir > 0 ? pts.filter((p) => p > y + 2).sort((a, b) => a - b)[0] : pts.filter((p) => p < y - 2).sort((a, b) => b - a)[0];

      let target: number | undefined;
      // 1. Dentro de uma seção em etapas: um gesto = uma etapa.
      const stepped = groups.find((g) => g.stepRange && y > g.stepRange[0] + 2 && y < g.stepRange[1] - 2);
      if (stepped) target = ahead(stepped.points);
      // 2. Fora delas: ímã para o próximo ponto na direção do gesto, se estiver perto.
      if (target === undefined) {
        const pts = [...sectionTops(), ...groups.flatMap((g) => g.points)];
        const next = ahead(pts);
        if (next !== undefined && Math.abs(next - y) < vh * MAGNET) target = next;
      }
      gesture = false;
      if (target === undefined) return;
      snapping = true;
      lenis.scrollTo(target, {
        duration: Math.min(1.1, 0.55 + Math.abs(target - y) / vh),
        easing: easeOutQuart,
        onComplete: () => {
          snapping = false;
        },
      });
    };

    const onScroll = (l: Lenis) => {
      if (l.direction) dir = l.direction;
      if (snapping || !gesture) return;
      window.clearTimeout(idle);
      idle = window.setTimeout(magnet, IDLE_MS);
    };
    lenis.on('scroll', onScroll);
    // Rolagem do usuário durante o ímã cancela o ímã.
    const cancel = () => {
      gesture = true;
      if (snapping) snapping = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space', ' ', 'Home', 'End'].includes(e.key)) cancel();
    };
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', cancel, { passive: true });

    return () => {
      window.clearTimeout(idle);
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', cancel);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}
