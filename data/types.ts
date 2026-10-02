export type EditorialState = 'placeholder' | 'pending-review' | 'approved' | 'withdrawn';
export type ServiceId = 'P01' | 'P02' | 'P03' | 'P04' | 'P05' | 'P06' | 'P07' | 'P08';

export type MediaSlot = {
  id: string;
  src: string | null;
  placeholderLabel: string;
  alt: string;
  aspectRatio: '4/5' | '3/2' | '1/1' | '16/10' | '16/9' | '4/3' | '21/9';
  sourceUrl?: string; // candidato editorial, nunca src automático
  /** Foto de banco CC0 só para visualizar o layout no protótipo (selo MOCKUP). Nunca usada em produção. */
  mockup?: { src: string; position?: string };
  editorialState: EditorialState;
};

export type Service = {
  id: ServiceId;
  name: string;
  /** Forma curta para CTAs: "Conversar sobre {shortName}". */
  shortName: string;
  summary: string;
  teamIds: string[];
  sourceUrls: string[];
  cover: MediaSlot;
  offerStatus: 'observed-publicly' | 'confirmed-current';
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  registration: string | null;
  bio: string;
  portrait: MediaSlot;
  editorialState: EditorialState;
};

export type CaseStudy = {
  id: string;
  serviceId: ServiceId;
  format: 'single-result' | 'paired-records' | 'story';
  media: MediaSlot[];
  context: string;
  professionalId: string | null;
  recordInterval: string | null;
  sourceUrls: string[];
  editorialState: EditorialState;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  source: string;
  editorialState: EditorialState;
};
