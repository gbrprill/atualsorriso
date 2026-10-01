type EventName = 'whatsapp_click' | 'results_filter_select' | 'case_open' | 'maps_click';

/** Sem serviço real. Só posição e ID do serviço; nunca queixas, diagnósticos ou mensagens. */
export function track(event: EventName, params: { position?: string; serviceId?: string } = {}) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('atual:analytics', { detail: { event, ...params } }));
}
