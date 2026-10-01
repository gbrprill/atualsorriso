'use client';

import { animate } from 'animejs';
import { useInView } from 'motion/react';
import { useEffect, useRef } from 'react';

/** Traço dourado que se desenha da esquerda para a direita (Anime.js). */
export function DrawLine({ delay = 0, className = 'step__line' }: { delay?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.transform = 'scaleX(1)';
      return;
    }
    if (!inView) {
      el.style.transform = 'scaleX(0)';
      return;
    }
    const a = animate(el, { scaleX: [0, 1], duration: 1400, delay: 200 + delay, ease: 'outExpo' });
    return () => {
      a.pause();
    };
  }, [inView, delay]);

  return <span ref={ref} className={className} aria-hidden="true" />;
}
