import type { MediaSlot } from '@/data/types';
import { siteConfig } from '@/data/siteConfig';
import { IconImage, IconUser } from './Icons';

/**
 * Mídia de um slot editorial.
 * 1. `src` real → imagem.
 * 2. Protótipo + `mockup` → foto de banco com selo "MOCKUP" (só para visualizar o layout).
 * 3. Caso contrário → placeholder identificado.
 */
export function MediaPlaceholder({
  slot,
  purpose,
  large,
  portrait,
  priority,
  fill,
}: {
  slot: MediaSlot;
  purpose?: string;
  large?: boolean;
  portrait?: boolean;
  priority?: boolean;
  /** Ocupa 100% do contêiner (fundos de seção), ignorando a proporção do slot. */
  fill?: boolean;
}) {
  const ratio = slot.aspectRatio.replace('/', ' / ');
  const box = fill ? { width: '100%', height: '100%' } : { aspectRatio: ratio };

  if (slot.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        className={`media${large ? ' media--lg' : ''}`}
        src={slot.src}
        alt={slot.alt}
        loading={priority ? 'eager' : 'lazy'}
        style={{ ...box, objectFit: 'cover' }}
      />
    );
  }

  if (siteConfig.mode === 'prototype' && slot.mockup) {
    return (
      <div className={`media media--mock${large ? ' media--lg' : ''}`} style={box}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={slot.mockup.src}
          alt={`Mockup ilustrativo (${slot.id}): foto de banco, não retrata a clínica.`}
          loading={priority ? 'eager' : 'lazy'}
          style={{ objectPosition: slot.mockup.position ?? '50% 50%' }}
        />
        <span className="mock-badge" aria-hidden="true">
          Mockup
        </span>
      </div>
    );
  }

  const Icon = portrait ? IconUser : IconImage;
  return (
    <div
      className={`ph${large ? ' ph--lg' : ''}`}
      style={box}
      role="img"
      aria-label={`Espaço reservado ${slot.id}${purpose ? `: ${purpose}` : ''}. Imagem real ainda não inserida.`}
    >
      <div className="ph__in" aria-hidden="true">
        <Icon />
        <span className="ph__id">{slot.id}</span>
        <span className="ph__label">{purpose ?? slot.placeholderLabel}</span>
        <span className="ph__meta">Proporção {slot.aspectRatio}</span>
      </div>
    </div>
  );
}
