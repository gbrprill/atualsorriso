'use client';

import { motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { services } from '@/data/services';
import { ContactButton } from '@/components/ui/ContactButton';
import { ShowResultsButton } from '@/components/ui/ActionButtons';
import { MediaPlaceholder } from '@/components/ui/Placeholder';
import { SectionHead } from '@/components/ui/SectionHead';

const SPEED = 42; // px/s
const TOUCH_PAUSE = 4000; // ms parado depois de um toque

/**
 * Carrossel infinito (Motion). Desacelera até parar com o mouse em cima, com foco dentro
 * ou depois de um toque; tem botão de pausa. Com movimento reduzido vira uma fileira com rolagem manual.
 * A segunda cópia da lista existe só para o loop: fica fora da árvore de acessibilidade e do Tab.
 */
export function Services() {
  const prefersReduced = useReducedMotion();
  // Decide o modo só no cliente (evita divergência de hidratação).
  const [reduce, setReduce] = useState(false);
  useEffect(() => setReduce(!!prefersReduced), [prefersReduced]);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const inView = useInView(viewport, { margin: '200px 0px' });
  const x = useMotionValue(0);
  const speed = useRef(SPEED);
  const hold = useRef(false);
  const touchUntil = useRef(0);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((t, delta) => {
    if (reduce || !track.current || !inView) return;
    const stopped = hold.current || paused || t < touchUntil.current;
    const target = stopped ? 0 : SPEED;
    // aproximação suave da velocidade alvo: para e retoma sem tranco
    speed.current += (target - speed.current) * Math.min(1, delta / 220);
    if (Math.abs(speed.current) < 0.05 && stopped) return;
    const half = track.current.scrollWidth / 2;
    let next = x.get() - (speed.current * delta) / 1000;
    if (next <= -half) next += half;
    x.set(next);
  });

  // Foco por teclado: traz o card focado para a área visível.
  const onFocus = (e: React.FocusEvent) => {
    hold.current = true;
    const card = (e.target as HTMLElement).closest<HTMLElement>('[data-card]');
    if (!card || !viewport.current || reduce) return;
    viewport.current.scrollLeft = 0;
    const pad = 24;
    const left = card.offsetLeft + x.get();
    const right = left + card.offsetWidth;
    if (left < pad || right > viewport.current.clientWidth - pad) x.set(-(card.offsetLeft - pad));
  };

  const list = [...services, ...services];

  return (
    <section id="procedimentos" className="section services-sec" aria-labelledby="proc-title" data-flow>
      <div data-flow-inner>
      <div className="container services-sec__head">
        <SectionHead eyebrow="Procedimentos" title="Cuidado para diferentes momentos do seu sorriso." titleId="proc-title" />
        {!reduce && (
          <button
            type="button"
            className="carousel-toggle"
            aria-pressed={paused}
            aria-label={paused ? 'Retomar carrossel' : 'Pausar carrossel'}
            title={paused ? 'Retomar carrossel' : 'Pausar carrossel'}
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
                <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="6.5" y="5" width="3.5" height="14" rx="1" />
                <rect x="14" y="5" width="3.5" height="14" rx="1" />
              </svg>
            )}
          </button>
        )}
      </div>

      <div
        ref={viewport}
        className={`marquee${reduce ? ' marquee--static' : ''}`}
        onMouseEnter={() => (hold.current = true)}
        onMouseLeave={() => (hold.current = false)}
        onFocusCapture={onFocus}
        onBlurCapture={() => (hold.current = false)}
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse') touchUntil.current = performance.now() + TOUCH_PAUSE;
        }}
      >
        <motion.ul ref={track} className="marquee__track" style={reduce ? undefined : { x }} aria-label="Procedimentos">
          {list.map((s, i) => {
            const clone = i >= services.length;
            if (clone && reduce) return null;
            return (
              <li key={`${s.id}-${i}`} className="marquee__item" data-card aria-hidden={clone || undefined} inert={clone || undefined}>
                <article className="card">
                  <div className="card__media">
                    <MediaPlaceholder slot={s.cover} purpose={s.cover.placeholderLabel} />
                  </div>
                  <div className="card__body">
                    <span className="card__num">{s.id}</span>
                    <h3 className="t-card">{s.name}</h3>
                    <p className="card__summary">{s.summary}</p>
                  </div>
                  <div className="card__actions">
                    <ShowResultsButton serviceId={s.id} serviceName={s.name} />
                    <ContactButton serviceId={s.id} position={`service-${s.id}`} variant="secondary" icon={false} className="btn--sm btn--block">
                      Conversar sobre {s.shortName}
                    </ContactButton>
                  </div>
                </article>
              </li>
            );
          })}
        </motion.ul>
      </div>
      </div>
    </section>
  );
}
