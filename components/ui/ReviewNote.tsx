import type { ReactNode } from 'react';
import { siteConfig } from '@/data/siteConfig';

/**
 * Nota interna de revisão (fonte, data, pendência). Nunca aparece para o visitante:
 * fica oculta por CSS e só é exibida com ?revisao na URL, no modo protótipo.
 * Em produção não é renderizada.
 */
export function ReviewNote({ children }: { children: ReactNode }) {
  if (siteConfig.mode !== 'prototype') return null;
  return <span className="review-note">{children}</span>;
}
