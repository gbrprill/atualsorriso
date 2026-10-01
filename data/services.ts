import type { Service, ServiceId } from './types';

const ig = 'https://www.instagram.com/atualsorrisofb/';
const src = {
  bio: ig,
  c01: `${ig}p/DYhiRG4Oaw-/`,
  c04: `${ig}reel/DbV_59JuBsB/`,
  c02: `${ig}p/DXKdJLMmeZ7/`,
  c12: `${ig}p/DdePXfSOvaW/`,
  c14: `${ig}p/DcmT51UGQrz/`,
};

const cover = (id: ServiceId, name: string): Service['cover'] => ({
  id: `PROC-${id}`,
  src: null,
  placeholderLabel: `[IMAGEM — ${name.toUpperCase()}]`,
  alt: '',
  aspectRatio: '3/2',
  editorialState: 'placeholder',
});

/** Nomenclatura central: a bio usa "lentes de resina", o inventário "facetas de resina". Validar com a clínica. */
export const FACETAS_LABEL = 'Facetas de resina';

export const services: Service[] = [
  {
    id: 'P01', name: FACETAS_LABEL,
    summary: 'Conheça as possibilidades de cuidado com a aparência do seu sorriso, com avaliação individual.',
    teamIds: ['TEAM-03'], sourceUrls: [src.bio, src.c01], cover: cover('P01', FACETAS_LABEL), offerStatus: 'observed-publicly',
  },
  {
    id: 'P02', name: 'Implantes dentários',
    summary: 'Converse sobre opções de tratamento para dentes ausentes e o planejamento do seu caso.',
    teamIds: ['TEAM-04'], sourceUrls: [src.bio, src.c02], cover: cover('P02', 'Implantes dentários'), offerStatus: 'observed-publicly',
  },
  {
    id: 'P03', name: 'Próteses fixas',
    summary: 'Entenda as possibilidades de reabilitação com próteses e o cuidado indicado para você.',
    teamIds: ['TEAM-04'], sourceUrls: [src.bio, src.c02], cover: cover('P03', 'Próteses fixas'), offerStatus: 'observed-publicly',
  },
  {
    id: 'P04', name: 'Otomodelação',
    summary: 'Conheça o procedimento e converse com a equipe sobre avaliação e indicação.',
    teamIds: ['TEAM-01'], sourceUrls: [src.bio], cover: cover('P04', 'Otomodelação'), offerStatus: 'observed-publicly',
  },
  {
    id: 'P05', name: 'Ortodontia',
    summary: 'Tire suas dúvidas sobre alinhamento dos dentes e planejamento ortodôntico.',
    teamIds: ['TEAM-02'], sourceUrls: [src.bio, src.c14], cover: cover('P05', 'Ortodontia'), offerStatus: 'observed-publicly',
  },
  {
    id: 'P06', name: 'Bruxismo e placa de mordida',
    summary: 'Converse sobre avaliação do bruxismo e a possibilidade de placa personalizada, quando indicada.',
    teamIds: [], sourceUrls: [src.bio, src.c12], cover: cover('P06', 'Bruxismo e placa de mordida'), offerStatus: 'observed-publicly',
  },
  {
    id: 'P07', name: 'Clínica geral e prevenção',
    summary: 'Cuidado e orientação para acompanhar sua saúde bucal em diferentes momentos.',
    teamIds: ['TEAM-03'], sourceUrls: [src.bio, src.c04], cover: cover('P07', 'Clínica geral e prevenção'), offerStatus: 'observed-publicly',
  },
  {
    id: 'P08', name: 'Endodontia · tratamento de canal',
    summary: 'Tire suas dúvidas sobre tratamento de canal e a avaliação do seu caso.',
    teamIds: ['TEAM-05'], sourceUrls: [src.bio, src.c04], cover: cover('P08', 'Endodontia'), offerStatus: 'observed-publicly',
  },
];

export const serviceById = (id: ServiceId) => services.find((s) => s.id === id)!;
