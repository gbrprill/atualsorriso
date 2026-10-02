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
    let quietUntil = 0;

    // Ponto de encaixe de cada seção: a BASE da seção alinhada à base da tela.
    const sectionStops = () =>
      Array.from(document.querySelectorAll<HTMLElement>('[data-flow]'))
        .filter((el) => el.offsetParent !== null)
        .map((el) => {
          const box = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
          return Math.round(box.getBoundingClientRect().bottom + window.scrollY - window.innerHeight);
        });

    const magnet = () => {
      if (snapping || !gesture || document.querySelector('dialog[open]')) return;
      // Decide pelo destino do gesto (não pela posição atual, que ainda está animando).
      const y = lenis.targetScroll;
      const cur = window.scrollY;
      if (y === undefined) return;
      const vh = window.innerHeight;
      const groups = snapGroups();
      const ahead = (pts: number[], from: number) =>
        dir > 0 ? pts.filter((p) => p > from + 2).sort((a, b) => a - b)[0] : pts.filter((p) => p < from - 2).sort((a, b) => b - a)[0];

      let target: number | undefined;
      // 1. Seção em etapas: um gesto = exatamente uma etapa, a partir de onde a tela está.
      const stepped = groups.find((g) => g.stepRange && cur >= g.stepRange[0] - 2 && cur < g.stepRange[1] - 2);
      if (stepped) target = ahead(stepped.points, cur);
      // 2. Fora delas: ímã para o próximo encaixe na direção do gesto, se estiver perto do destino.
      if (target === undefined) {
        const pts = [...sectionStops(), ...groups.flatMap((g) => g.points)];
        const next = ahead(pts, cur);
        if (next !== undefined && Math.abs(next - y) < vh * MAGNET) target = next;
      }
      gesture = false;
      if (target === undefined) return;
      snapping = true;
      // lock: a inércia do trackpad não interrompe o encaixe; depois, uma pausa curta evita pular etapas.
      lenis.scrollTo(target, {
        duration: Math.min(1.1, 0.6 + Math.abs(target - y) / vh / 2),
        easing: easeOutQuart,
        lock: true,
        onComplete: () => {
          snapping = false;
          quietUntil = performance.now() + 450;
        },
      });
    };

    // O ímã age logo que o gesto termina (sem eventos de roda por IDLE_MS).
    const arm = (direction: number) => {
      if (snapping || performance.now() < quietUntil) return;
      if (direction) dir = direction;
      gesture = true;
      window.clearTimeout(idle);
      idle = window.setTimeout(magnet, IDLE_MS);
    };
    // Rolagem do usuário durante o ímã cancela o ímã.
    const onWheel = (e: WheelEvent) => arm(Math.sign(e.deltaY));
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' ', 'Space'].includes(e.key)) arm(1);
      if (['ArrowUp', 'PageUp'].includes(e.key)) arm(-1);
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKey);

    return () => {
      window.clearTimeout(idle);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);
  return null;
}
