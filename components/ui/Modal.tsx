'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { IconClose } from './Icons';

/**
 * <dialog> nativo: foco contido, Escape e retorno de foco ao acionador.
 * Fecha no fundo só quando o clique começa E termina no fundo (arrastar uma seleção de texto para fora não fecha).
 */
export function Modal({
  open,
  onClose,
  title,
  titleId,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  titleId: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const downOnBackdrop = useRef(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="modal"
      data-lenis-prevent
      aria-labelledby={titleId}
      onClose={onClose}
      onPointerDown={(e) => {
        downOnBackdrop.current = e.target === ref.current;
      }}
      onClick={(e) => {
        if (e.target === ref.current && downOnBackdrop.current) onClose();
        downOnBackdrop.current = false;
      }}
    >
      <div className="modal__in">
        <button type="button" className="modal__close" onClick={onClose} aria-label="Fechar">
          <IconClose />
        </button>
        <h2 id={titleId}>{title}</h2>
        {open && children}
      </div>
    </dialog>
  );
}
