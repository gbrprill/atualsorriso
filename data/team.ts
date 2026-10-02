import type { TeamMember } from './types';

const mockPos: Record<string, string> = { '01': '50% 20%', '02': '74% 22%', '03': '84% 22%', '04': '50% 18%', '05': '45% 20%' };
const portrait = (n: string): TeamMember['portrait'] => ({
  id: `TEAM-${n}`,
  mockup: { src: `/mockups/team-${n}.jpg`, position: mockPos[n] },
  src: null,
  placeholderLabel: `[RETRATO — TEAM-${n}]`,
  alt: '',
  aspectRatio: '4/5',
  editorialState: 'placeholder',
});

export const teamPhoto: TeamMember['portrait'] = {
  id: 'TEAM-GROUP',
  src: null,
  placeholderLabel: '[FOTO COLETIVA DA EQUIPE]',
  alt: '',
  aspectRatio: '21/9',
  mockup: { src: '/mockups/team-group.jpg', position: '50% 30%' },
  editorialState: 'placeholder',
};

const bio = '[BIOGRAFIA APROVADA]';

export const team: TeamMember[] = [
  { id: 'TEAM-01', name: 'Dra. Daiane Inácio', role: 'Responsável técnica · Otomodelação', registration: 'CRO-PR 21050', bio, portrait: portrait('01'), editorialState: 'pending-review' },
  { id: 'TEAM-02', name: 'Dra. Arielle Santos', role: 'Ortodontia', registration: null, bio, portrait: portrait('02'), editorialState: 'pending-review' },
  { id: 'TEAM-03', name: 'Dra. Tayná Mengisztki', role: 'Clínica geral e facetas de resina', registration: null, bio, portrait: portrait('03'), editorialState: 'pending-review' },
  { id: 'TEAM-04', name: 'Dr. Mayron Barros', role: 'Implantes e próteses fixas', registration: null, bio, portrait: portrait('04'), editorialState: 'pending-review' },
  { id: 'TEAM-05', name: 'Dr. Lucas', role: 'Endodontia', registration: null, bio, portrait: portrait('05'), editorialState: 'pending-review' },
];

export const pendingRegistration = (m: TeamMember) =>
  m.registration ?? (m.id === 'TEAM-05' ? '[SOBRENOME E CRO A CONFIRMAR]' : '[CRO A CONFIRMAR]');
