'use client';

import { motion } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import type { ServiceId } from '@/data/types';
import { useApp } from '@/components/AppProvider';
import { IconChat } from './Icons';
import { pressable } from './pressable';

/** Contorno que se desenha em volta do botão no hover. Mede o botão para o traço seguir a borda. */
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
    <svg className="trace" viewBox={`0 0 ${box.w + 2} ${box.h + 2}`} aria-hidden="true" focusable="false">
      <rect x="1" y="1" width={box.w} height={box.h} rx="8" pathLength={100} />
    </svg>
  );
}

export function ContactButton({
  children = 'Conversar com a equipe',
  serviceId,
  position,
  variant = 'primary',
  icon = true,
  className = '',
}: {
  children?: ReactNode;
  serviceId?: ServiceId;
  position: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'light' | 'trace';
  icon?: boolean;
  className?: string;
}) {
  const { openContact } = useApp();
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <motion.button
      ref={ref}
      {...pressable}
      type="button"
      className={`btn btn--${variant} ${className}`}
      onClick={() => openContact(serviceId, position)}
    >
      {variant === 'trace' ? (
        <>
          <Trace target={ref} />
          <span>{children}</span>
        </>
      ) : (
        <>
          {icon && <IconChat className="ico-chat" />}
          {children}
        </>
      )}
    </motion.button>
  );
}
