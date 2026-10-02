import type Lenis from 'lenis';

/**
 * Rolagem compartilhada: instância do Lenis (quando ativo) e pontos de "ímã".
 * Seções presas registram seus pontos (ex.: cada etapa da Primeira conversa).
 */
let lenis: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenis = l;
};
export const getLenis = () => lenis;

/** Desacelera no fim: começa rápido e termina lento. */
export const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export function scrollToY(y: number, opts: { immediate?: boolean; duration?: number } = {}) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (lenis && !reduce) {
    lenis.scrollTo(y, { immediate: opts.immediate, duration: opts.duration ?? 1, easing: easeOutQuart });
  } else {
    window.scrollTo({ top: y, behavior: opts.immediate || reduce ? 'auto' : 'smooth' });
  }
}

export function scrollToElement(el: Element, offset = 0) {
  scrollToY(el.getBoundingClientRect().top + window.scrollY + offset);
}

export type SnapGroup = {
  /** Posições de rolagem (px) para onde o ímã pode levar. */
  points: number[];
  /** Dentro deste intervalo, cada gesto de rolagem avança/volta exatamente um ponto. */
  stepRange?: [number, number];
};
const providers = new Set<() => SnapGroup | null>();
export function registerSnap(fn: () => SnapGroup | null) {
  providers.add(fn);
  return () => {
    providers.delete(fn);
  };
}
export const snapGroups = () => Array.from(providers, (fn) => fn()).filter((g): g is SnapGroup => !!g);
