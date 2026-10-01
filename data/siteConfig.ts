export const siteConfig = {
  /** 'prototype' mostra placeholders identificados; 'production' oculta pendências. */
  mode: 'prototype' as 'prototype' | 'production',
  name: 'Atual Sorriso',
  city: 'Francisco Beltrão–PR',
  title: 'Atual Sorriso em Francisco Beltrão | Odontologia e Estética',
  description:
    'Clínica de odontologia e estética em Francisco Beltrão–PR. Conheça os procedimentos, a equipe e converse com a recepção sobre o seu próximo passo.',
  /** Preencher quando o número oficial for confirmado: { number: '5546999999999', verified: true } */
  whatsapp: { number: null as string | null, verified: false },
  links: {
    instagram: 'https://www.instagram.com/atualsorrisofb/',
    maps: 'https://maps.app.goo.gl/sYaUAgJfsNpKLX7q6',
  },
  address: {
    value: 'Av. Julio Assis Cavalheiro, 318, Centro, Francisco Beltrão–PR, 85601-000',
    needsRevalidation: true,
  },
  hours: {
    value: 'Segunda a sexta, 08h30–12h e 13h30–19h; sábado e domingo fechado',
    needsRevalidation: true,
  },
  google: {
    rating: '4,9',
    reviews: 119,
    snapshot: 'Snapshot da pesquisa pública de 30/09/2026',
    needsRevalidation: true,
  },
  trajectory: { value: '15 anos', snapshot: 'Bio do Instagram, 2026', needsRevalidation: true },
  responsibleTechnician: 'Dra. Daiane Inácio · CRO-PR 21050 (observado no perfil)',
  institutionalText: '[TEXTO INSTITUCIONAL APROVADO]',
  legal: {
    cnpj: '[CNPJ A CONFIRMAR]',
    privacy: '[POLÍTICA DE PRIVACIDADE PENDENTE]',
    legalAddress: '[ENDEREÇO CADASTRAL A CONFIRMAR]',
  },
};
