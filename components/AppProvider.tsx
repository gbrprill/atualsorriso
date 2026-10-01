'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { MotionConfig } from 'motion/react';
import { Modal } from '@/components/ui/Modal';
import { MediaPlaceholder } from '@/components/ui/Placeholder';
import { caseStudies } from '@/data/caseStudies';
import { serviceById, services } from '@/data/services';
import { team } from '@/data/team';
import type { ServiceId } from '@/data/types';
import { track } from '@/lib/analytics';
import { whatsappUrl } from '@/lib/whatsapp';

export type Filter = 'all' | ServiceId;

type Ctx = {
  filter: Filter;
  setFilter: (f: Filter) => void;
  showResults: (id: ServiceId) => void;
  openContact: (serviceId?: ServiceId, position?: string) => void;
  openCase: (caseId: string) => void;
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

  const setFilter = useCallback((f: Filter) => {
    setFilterState(f);
    track('results_filter_select', { serviceId: f === 'all' ? undefined : f, position: 'results' });
  }, []);

  const showResults = useCallback((id: ServiceId) => {
    setFilter(id);
    requestAnimationFrame(() => {
      const section = document.getElementById('resultados');
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      section?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      document.getElementById(`filter-${id}`)?.focus({ preventScroll: true });
    });
  }, [setFilter]);

  const openContact = useCallback((serviceId?: ServiceId, position = 'unknown') => {
    track('whatsapp_click', { serviceId, position });
    const url = whatsappUrl(serviceId ? serviceById(serviceId).name : undefined);
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    else setContact({ open: true, serviceId });
  }, []);

  const openCase = useCallback((id: string) => {
    setCaseId(id);
    track('case_open', { serviceId: caseStudies.find((c) => c.id === id)?.serviceId, position: 'results' });
  }, []);

  const activeCase = caseStudies.find((c) => c.id === caseId);
  const activeService = activeCase ? services.find((s) => s.id === activeCase.serviceId) : undefined;
  const professional = activeCase?.professionalId ? team.find((t) => t.id === activeCase.professionalId) : undefined;

  return (
    <MotionConfig reducedMotion="user">
    <AppCtx.Provider value={{ filter, setFilter, showResults, openContact, openCase }}>
      {children}

      <Modal
        open={contact.open}
        onClose={() => setContact({ open: false })}
        title="Conversar com a equipe"
        titleId="contact-title"
      >
        <p className="t-lead">Este é um protótipo. O WhatsApp oficial será configurado após confirmação.</p>
        {contact.serviceId && (
          <p className="t-small">Assunto selecionado: {serviceById(contact.serviceId).name}</p>
        )}
        <button type="button" className="btn btn--primary" onClick={() => setContact({ open: false })}>
          Entendi
        </button>
      </Modal>

      <Modal
        open={!!activeCase}
        onClose={() => setCaseId(null)}
        title={activeService ? `Contexto · ${activeService.name}` : 'Contexto do caso'}
        titleId="case-title"
      >
        {activeCase && activeService && (
          <>
            <p className="case__format">{formatLabel[activeCase.format]}</p>
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
            <button type="button" className="btn btn--primary" onClick={() => setCaseId(null)}>
              Fechar
            </button>
          </>
        )}
      </Modal>
    </AppCtx.Provider>
    </MotionConfig>
  );
}
