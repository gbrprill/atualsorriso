'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import { Modal } from '@/components/ui/Modal';
import { MediaPlaceholder } from '@/components/ui/Placeholder';
import { ContactButton } from '@/components/ui/ContactButton';
import { caseStudies, isPublishedCase } from '@/data/caseStudies';
import { serviceById } from '@/data/services';
import { team } from '@/data/team';
import type { ServiceId } from '@/data/types';
import { siteConfig } from '@/data/siteConfig';
import { track } from '@/lib/analytics';
import { whatsappUrl } from '@/lib/whatsapp';
import { scrollToElement } from '@/lib/scroll';

export type Filter = 'all' | ServiceId;

type Ctx = {
  filter: Filter;
  setFilter: (f: Filter) => void;
  showResults: (id: ServiceId) => void;
  openContact: (serviceId?: ServiceId, position?: string) => void;
  openCase: (caseId: string) => void;
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  /** Alguma modal aberta (a barra mobile se esconde). */
  modalOpen: boolean;
};

const AppCtx = createContext<Ctx | null>(null);
export const useApp = () => {
  const c = useContext(AppCtx);
  if (!c) throw new Error('useApp fora do AppProvider');
  return c;
};

const formatLabel = { 'single-result': 'Resultado individual', 'paired-records': 'Registros comparados', story: 'História de cuidado' } as const;

export function AppProvider({ children }: { children: ReactNode }) {
  const [filter, setFilterState] = useState<Filter>('all');
  const [contact, setContact] = useState<{ open: boolean; serviceId?: ServiceId }>({ open: false });
  const [caseId, setCaseId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  // Quando o contato abre a partir da modal do caso, o foco volta para o botão que abriu o caso.
  const caseTrigger = useRef<HTMLElement | null>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  // Modo revisão: ?revisao na URL exibe as notas internas (somente protótipo).
  useEffect(() => {
    if (siteConfig.mode === 'prototype' && new URLSearchParams(window.location.search).has('revisao')) {
      document.documentElement.classList.add('review-mode');
    }
  }, []);

  const setFilter = useCallback((f: Filter) => {
    setFilterState(f);
    track('results_filter_select', { serviceId: f === 'all' ? undefined : f, position: 'results' });
  }, []);

  const showResults = useCallback(
    (id: ServiceId) => {
      setFilter(id);
      requestAnimationFrame(() => {
        const section = document.getElementById('resultados');
        if (section) scrollToElement(section.parentElement?.classList.contains('pin-spacer') ? section.parentElement : section);
        document.getElementById(`filter-${id}`)?.focus({ preventScroll: true });
      });
    },
    [setFilter],
  );

  const openContact = useCallback((serviceId?: ServiceId, position = 'unknown') => {
    track('whatsapp_click', { serviceId, position });
    const url = whatsappUrl(serviceId ? serviceById(serviceId).name : undefined);
    const from = document.activeElement as HTMLElement | null;
    returnTo.current = from?.closest('dialog') ? caseTrigger.current : null;
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    else setContact({ open: true, serviceId });
  }, []);

  const openCase = useCallback((id: string) => {
    caseTrigger.current = document.activeElement as HTMLElement | null;
    setCaseId(id);
    track('case_open', { serviceId: caseStudies.find((c) => c.id === id)?.serviceId, position: 'results' });
  }, []);

  const activeCase = caseStudies.find((c) => c.id === caseId);
  const activeService = activeCase ? serviceById(activeCase.serviceId) : undefined;
  const professional = activeCase?.professionalId ? team.find((t) => t.id === activeCase.professionalId) : undefined;
  const published = activeCase ? isPublishedCase(activeCase) : false;

  return (
    <MotionConfig reducedMotion="user">
      <AppCtx.Provider
        value={{ filter, setFilter, showResults, openContact, openCase, menuOpen, setMenuOpen, modalOpen: contact.open || !!activeCase }}
      >
        {children}

        <Modal
          open={contact.open}
          onClose={() => {
            setContact({ open: false });
            const target = returnTo.current;
            returnTo.current = null;
            if (target) requestAnimationFrame(() => target.focus());
          }}
          title="Conversar com a equipe"
          titleId="contact-title"
        >
          <p className="t-lead">Este é um protótipo. O WhatsApp oficial será configurado após confirmação.</p>
          {contact.serviceId && <p className="modal__subject">Assunto: {serviceById(contact.serviceId).name}</p>}
          <div className="modal__actions">
            <button type="button" className="btn btn--primary" onClick={(e) => e.currentTarget.closest('dialog')?.close()}>
              Entendi
            </button>
          </div>
        </Modal>

        <Modal
          open={!!activeCase}
          onClose={() => setCaseId(null)}
          title={activeService ? `${published ? 'Conhecer este caso' : 'Espaço reservado'} · ${activeService.name}` : 'Caso'}
          titleId="case-title"
        >
          {activeCase && activeService && (
            <>
              <p className="case__format">
                {published ? formatLabel[activeCase.format] : 'Conteúdo reservado · aguardando caso aprovado'}
              </p>
              {activeCase.format === 'paired-records' ? (
                <div className="modal__pair">
                  <MediaPlaceholder slot={{ ...activeCase.media[0], id: `${activeCase.id}-A`, aspectRatio: '1/1' }} purpose="[REGISTRO INICIAL]" />
                  <MediaPlaceholder slot={{ ...activeCase.media[0], id: `${activeCase.id}-B`, aspectRatio: '1/1' }} purpose="[REGISTRO APÓS O ATENDIMENTO]" />
                </div>
              ) : (
                <MediaPlaceholder slot={{ ...activeCase.media[0], aspectRatio: '3/2' }} purpose={activeCase.media[0].placeholderLabel} />
              )}
              <ul className="modal__list">
                <li>{activeCase.context}</li>
                <li>{professional ? professional.name : '[PROFISSIONAL RESPONSÁVEL]'}</li>
                {activeCase.format === 'paired-records' && <li>{activeCase.recordInterval ?? '[INTERVALO DOS REGISTROS A CONFIRMAR]'}</li>}
              </ul>
              <p className="t-small">Cada caso é individual. A indicação e o planejamento dependem de avaliação.</p>
              <div className="modal__actions">
                <ContactButton
                  serviceId={activeService.id}
                  position={`case-${activeCase.id}`}
                  onBeforeOpen={() => setCaseId(null)}
                >
                  Conversar sobre {activeService.shortName}
                </ContactButton>
                <button type="button" className="btn btn--secondary" onClick={() => setCaseId(null)}>
                  Fechar
                </button>
              </div>
            </>
          )}
        </Modal>
      </AppCtx.Provider>
    </MotionConfig>
  );
}
