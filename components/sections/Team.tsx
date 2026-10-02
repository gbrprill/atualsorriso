'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { pendingRegistration, team, teamPhoto } from '@/data/team';
import { MediaPlaceholder } from '@/components/ui/Placeholder';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Foto coletiva como fundo da seção inteira; miniaturas no rodapé da foto.
 * Hover/foco (ou toque) numa miniatura abre o cartão da pessoa e escurece o fundo em 30%.
 */
export function Team() {
  const [open, setOpen] = useState<string | null>(null);
  const root = useRef<HTMLElement>(null);
  const member = team.find((m) => m.id === open);
  // O cartão cresce a partir da miniatura correspondente.
  const originX = Math.round(((team.findIndex((m) => m.id === open) + 0.5) / team.length) * 100);

  // Escape fecha; toque fora fecha.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    const onDown = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest('.team__thumb, .team__card')) setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  return (
    <section
      ref={root}
      id="equipe"
      className="team-sec on-dark"
      aria-labelledby="team-title"
      data-flow
    >
      <div className="team-sec__bg" aria-hidden="true">
        <MediaPlaceholder slot={teamPhoto} purpose="[FOTO COLETIVA DA EQUIPE]" fill />
      </div>
      <div className="team-sec__shade" aria-hidden="true" />
      <motion.div
        className="team-sec__dim"
        aria-hidden="true"
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      />

      <div className="container team-sec__inner" data-flow-inner>
        <h2 id="team-title" className="pill-label">
          <span>Conheça</span>
          Nossa equipe
        </h2>

        <div className="team__stage">
          <AnimatePresence>
            {member && (
              <motion.div
                key={member.id}
                id="team-card"
                className="team__card"
                role="region"
                aria-label={`Sobre ${member.name}`}
                style={{ transformOrigin: `${originX}% 100%` }}
                initial={{ opacity: 0, y: 28, scale: 0.9, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.42, ease: EASE } }}
                exit={{ opacity: 0, y: 16, scale: 0.94, filter: 'blur(4px)', transition: { duration: 0.2, ease: 'easeIn' } }}
              >
                <div className="team__card-photo">
                  <MediaPlaceholder portrait slot={member.portrait} purpose={member.portrait.placeholderLabel} />
                </div>
                <div className="team__card-body">
                  <h3>{member.name}</h3>
                  <p className="team__role">{member.role}</p>
                  <p>
                    <span className="tag">{pendingRegistration(member)}</span>
                  </p>
                  <p className="team__bio">{member.bio}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <ul className="team__thumbs" aria-label="Profissionais">
          {team.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                className="team__thumb"
                aria-expanded={open === m.id}
                aria-controls={open === m.id ? 'team-card' : undefined}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(m.id)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen((o) => (o === m.id ? null : o))}
                onBlur={() => setOpen((o) => (o === m.id ? null : o))}
                onFocus={(e) => e.currentTarget.matches(':focus-visible') && setOpen(m.id)}
                onClick={(e) => {
                  // Mouse já abriu no hover; toque/teclado alternam.
                  if ((e.nativeEvent as PointerEvent).pointerType === 'mouse') return setOpen(m.id);
                  setOpen((o) => (o === m.id ? null : m.id));
                }}
              >
                <span className="team__thumb-img">
                  <MediaPlaceholder portrait slot={m.portrait} purpose={m.portrait.placeholderLabel} />
                </span>
                <span className="team__thumb-name">{m.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
