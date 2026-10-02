'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import type { ServiceId } from '@/data/types';
import { siteConfig } from '@/data/siteConfig';
import { track } from '@/lib/analytics';
import { useApp } from '@/components/AppProvider';
import { IconArrow, IconPin } from './Icons';
import { pressable } from './pressable';

/** Link discreto: o traço dourado só aparece no hover/foco (desenha → e recolhe ←). */
export function ShowResultsButton({ serviceId, serviceName }: { serviceId: ServiceId; serviceName: string }) {
  const { showResults } = useApp();
  return (
    <button type="button" className="btn btn--ghost" onClick={() => showResults(serviceId)} aria-label={`Ver resultados de ${serviceName}`}>
      <span className="ghost-text">Ver resultados</span>
      <IconArrow className="ico-arrow" />
    </button>
  );
}

/** Rota no Google Maps para o endereço da clínica (abre o app/site já com o destino). */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(siteConfig.address.value)}`;

/**
 * "Veja como chegar": no hover/foco, a linha da cor do texto se desenha da esquerda para a direita
 * e o pin entra em fade; ao sair, a linha recolhe para a esquerda e o pin sai em fade.
 */
export function RouteLink({ position, children = 'Veja como chegar' }: { position: string; children?: ReactNode }) {
  return (
    <a className="route-link" href={siteConfig.links.maps} target="_blank" rel="noopener noreferrer" onClick={() => track('maps_click', { position })}>
      <span className="route-link__text">{children}</span>
      <IconPin className="route-link__pin" />
      <span className="sr-only"> (abre o Google Maps em nova aba)</span>
    </a>
  );
}

export function MapsLink({
  position,
  children = 'Como chegar',
  variant = 'secondary',
  icon = true,
  href = siteConfig.links.maps,
}: {
  position: string;
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'on-dark';
  icon?: boolean;
  href?: string;
}) {
  return (
    <motion.a
      {...pressable}
      className={`btn btn--${variant}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('maps_click', { position })}
    >
      {icon && <IconPin className="ico-pin" />}
      {children}
      <span className="sr-only"> (abre em nova aba)</span>
    </motion.a>
  );
}
