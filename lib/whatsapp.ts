import { siteConfig } from '@/data/siteConfig';

/** Retorna link wa.me só com número confirmado; senão null (abre a modal de demonstração). */
export function whatsappUrl(serviceName?: string): string | null {
  const { number, verified } = siteConfig.whatsapp;
  if (!number || !verified) return null;
  const text = serviceName
    ? `Olá! Gostaria de conversar com a equipe sobre ${serviceName}.`
    : 'Olá! Gostaria de conversar com a equipe da Atual Sorriso.';
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
