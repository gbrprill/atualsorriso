'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import type { ServiceId } from '@/data/types';
import { useApp } from '@/components/AppProvider';
import { IconChat } from './Icons';
import { pressable } from './pressable';

/** Traço branco que percorre a borda uma vez no hover (como no exemplo enviado). Mede o botão para seguir a borda real. */
function Trace({ target }: { target: RefObject<HTMLElement | null> }) {
  const [box, setBox] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const read = () => setBox({ w: el.offsetWidth, h: el.offsetHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [target]);
  if (!box.w) return null;
  return (
    <svg className="trace" viewBox={`0 0 ${box.w} ${box.h}`} aria-hidden="true" focusable="false">
      <rect x="0.75" y="0.75" width={box.w - 1.5} height={box.h - 1.5} rx="7.25" pathLength={100} />
    </svg>
  );
}

export function ContactButton({
  children = 'Conversar com a equipe',
  serviceId,
  position,
  variant = 'primary',
  icon = true,
  trace = false,
  className = '',
  onBeforeOpen,
}: {
  children?: ReactNode;
  serviceId?: ServiceId;
  position: string;
  variant?: 'primary' | 'secondary' | 'light' | 'glass';
  icon?: boolean;
  /** Contorno animado no hover (usado na hero). */
  trace?: boolean;
  className?: string;
  /** Executado antes de abrir o contato (ex.: fechar a modal do caso). */
  onBeforeOpen?: () => void;
}) {
  const { openContact } = useApp();
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <motion.button
      ref={ref}
      {...pressable}
      type="button"
      className={`btn btn--${variant}${trace ? ' btn--traced' : ''} ${className}`}
      onClick={() => {
        onBeforeOpen?.();
        openContact(serviceId, position);
      }}
    >
      {trace && <Trace target={ref} />}
      {icon && <IconChat className="ico-chat" />}
      <span className="btn__label">{children}</span>
    </motion.button>
  );
}
