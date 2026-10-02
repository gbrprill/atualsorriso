import type { CaseStudy, ServiceId } from './types';
import { services } from './services';

const ig = 'https://www.instagram.com/atualsorrisofb/';
const candidates: Partial<Record<ServiceId, string[]>> = {
  P01: [`${ig}p/DbGQSzHlkVh/`, `${ig}reel/DcWLdNhxi4Z/`],
  P02: [`${ig}stories/highlights/17850895359641831/`, `${ig}p/DXKdJLMmeZ7/`],
  P04: [`${ig}stories/highlights/18186874747368718/`],
  P05: [`${ig}p/DcmT51UGQrz/`],
};

/** P06–P08 começam como story (sem caso visual individualizado). Todos src: null. */
const formatFor = (id: ServiceId): CaseStudy['format'] =>
  id === 'P06' || id === 'P07' || id === 'P08' ? 'story' : 'single-result';

export const caseStudies: CaseStudy[] = services.map((s) => ({
  id: `RESULTADO-${s.id}`,
  serviceId: s.id,
  format: formatFor(s.id),
  media: [
    {
      id: `RESULTADO-${s.id}`,
      src: null,
      placeholderLabel: `[IMAGEM DO RESULTADO — ${s.name.toUpperCase()}]`,
      alt: '',
      aspectRatio: '4/3',
      sourceUrl: candidates[s.id]?.[0],
      mockup: { src: `/mockups/result-${s.id.toLowerCase()}.jpg` },
      editorialState: 'placeholder',
    },
  ],
  context: '[CONTEXTO APROVADO DO CASO]',
  professionalId: null,
  recordInterval: null,
  sourceUrls: candidates[s.id] ?? [],
  editorialState: 'placeholder',
}));

/**
 * Caso real publicado = editorialState 'approved'. Todo o resto é espaço reservado.
 * A interface nunca chama um espaço reservado de "caso".
 */
export const isPublishedCase = (c: CaseStudy) => c.editorialState === 'approved';
