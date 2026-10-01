'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import type { ServiceId } from '@/data/types';
import { siteConfig } from '@/data/siteConfig';
import { track } from '@/lib/analytics';
import { useApp } from '@/components/AppProvider';
import { IconArrow, IconPin } from './Icons';
import { pressable } from './pressable';

export function ShowResultsButton({ serviceId, serviceName }: { serviceId: ServiceId; serviceName: string }) {
  const { showResults } = useApp();
  return (
    <button
      type="button"
      className="btn btn--ghost"
      onClick={() => showResults(serviceId)}
      aria-label={`Ver resultados de ${serviceName}`}
    >
      <span className="ghost-text">Ver resultados</span>
      <IconArrow className="ico-arrow" />
    </button>
  );
}

export function MapsLink({
  position,
  children = 'Como chegar',
  variant = 'secondary',
  icon = true,
}: {
  position: string;
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: boolean;
}) {
  return (
    <motion.a
      {...(variant === 'ghost' ? {} : pressable)}
      className={`btn btn--${variant}`}
      href={siteConfig.links.maps}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('maps_click', { position })}
    >
      {icon && <IconPin className="ico-pin" />}
      {variant === 'ghost' ? <span className="ghost-text">{children}</span> : children}
      <span className="sr-only"> (abre em nova aba)</span>
    </motion.a>
  );
}
