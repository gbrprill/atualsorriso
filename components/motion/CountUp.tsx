'use client';

import { animate } from 'animejs';
import { useInView } from 'motion/react';
import { useEffect, useRef, type ReactNode } from 'react';

const fmt = (v: number, d: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

/** Contador com Anime.js. O texto final já está no HTML; só conta com movimento permitido. */
export function CountUp({ to, decimals = 0, children }: { to: number; decimals?: number; children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const motionOk = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (ref.current && motionOk()) ref.current.textContent = fmt(0, decimals);
  }, [decimals]);

  useEffect(() => {
    const el = ref.current;
    if (!inView || !el || !motionOk()) return;
    const o = { v: 0 };
    const a = animate(o, {
      v: to,
      duration: 1800,
      delay: 200,
      ease: 'outExpo',
      onUpdate: () => {
        el.textContent = fmt(o.v, decimals);
      },
    });
    return () => {
      a.pause();
      el.textContent = fmt(to, decimals);
    };
  }, [inView, to, decimals]);

  return <span ref={ref}>{children}</span>;
}
