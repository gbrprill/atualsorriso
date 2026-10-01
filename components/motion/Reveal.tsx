'use client';

import { motion, type Variants } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Entradas por formato do elemento, todas curtas e discretas (sem blur, giro ou bounce).
 *  up: textos e cartões · fade: blocos grandes · media: fotos · left/right: pares opostos
 */
const variants: Record<string, Variants> = {
  up: { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  media: { hidden: { opacity: 0, scale: 0.97, y: 16 }, show: { opacity: 1, scale: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 28 }, show: { opacity: 1, x: 0 } },
};

export type RevealKind = keyof typeof variants;

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  className,
  kind = 'up',
  delay = 0,
  duration = 0.8,
  amount = 0.15,
}: {
  children: ReactNode;
  className?: string;
  kind?: RevealKind;
  /** Atraso extra além dos 0,2 s padrão (para escalonar irmãos). */
  delay?: number;
  duration?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={variants[kind]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: '0px 0px -6% 0px' }}
      transition={{ duration, ease: EASE, delay: 0.2 + delay }}
    >
      {children}
    </motion.div>
  );
}
