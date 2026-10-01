'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { IconClose } from './Icons';

/** Usa <dialog> nativo: foco contido, Escape e retorno de foco ao acionador. Backdrop fecha por clique. */
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
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
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
