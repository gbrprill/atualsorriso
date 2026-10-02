'use client';

import { motion, useInView, useReducedMotion, type Variants } from 'motion/react';
import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Entrada única ao começar a entrar na tela (Motion).
 * 400 ms, 14 px, sem bounce. Fica visível por padrão: só "arma" o estado oculto depois da hidratação
 * e apenas para blocos abaixo da dobra. Se o JS falhar, nada fica escondido.
 *  up: textos e cartões · media: fotos/placeholders (leve escala) · left/right: pares lado a lado · fade: blocos grandes
 */
const EASE = [0.22, 1, 0.36, 1] as const;
const variants: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  media: { hidden: { opacity: 0, y: 12, scale: 0.985 }, show: { opacity: 1, y: 0, scale: 1 } },
  left: { hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0 } },
};

export type RevealKind = keyof typeof variants;

export function Reveal({
  children,
  className,
  kind = 'up',
  delay = 0,
  duration = 0.4,
}: {
  children: ReactNode;
  className?: string;
  kind?: RevealKind;
  /** Escalonamento entre irmãos (limitado a 0,24 s). */
  delay?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const inView = useInView(ref, { once: true, margin: '0px 0px -6% 0px' });

  useLayoutEffect(() => {
    if (reduce || !ref.current) return;
    if (ref.current.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, [reduce]);

  const state = !armed || inView ? 'show' : 'hidden';
  const v = variants[kind];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={state}
      variants={{
        hidden: { ...v.hidden, transition: { duration: 0 } },
        show: { ...v.show, transition: { duration, ease: EASE, delay: Math.min(delay, 0.24) } },
      }}
    >
      {children}
    </motion.div>
  );
}
