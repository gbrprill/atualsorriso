import type { MediaSlot } from '@/data/types';
import { IconImage, IconUser } from './Icons';

/** Placeholder editorial. Troque `src: null` por um arquivo no dado para renderizar a imagem real. */
export function MediaPlaceholder({
  slot,
  purpose,
  large,
  portrait,
  priority,
}: {
  slot: MediaSlot;
  purpose?: string;
  large?: boolean;
  portrait?: boolean;
  priority?: boolean;
}) {
  const ratio = slot.aspectRatio.replace('/', ' / ');
  if (slot.src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={slot.src}
        alt={slot.alt}
        loading={priority ? 'eager' : 'lazy'}
        style={{ aspectRatio: ratio, width: '100%', objectFit: 'cover', borderRadius: large ? 24 : 16 }}
      />
    );
  }
  const Icon = portrait ? IconUser : IconImage;
  return (
    <div
      className={`ph${large ? ' ph--lg' : ''}`}
      style={{ aspectRatio: ratio }}
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
