'use client';

import { useRef } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { caseStudies, isPublishedCase } from '@/data/caseStudies';
import { services } from '@/data/services';
import { team } from '@/data/team';
import { siteConfig } from '@/data/siteConfig';
import { useApp, type Filter } from '@/components/AppProvider';
import { Reveal } from '@/components/motion/Reveal';
import { IconCheck } from '@/components/ui/Icons';
import { MediaPlaceholder } from '@/components/ui/Placeholder';
import { SectionHead } from '@/components/ui/SectionHead';
import { pressable } from '@/components/ui/pressable';
import { registerSnap, scrollToY } from '@/lib/scroll';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const formatLabel = { 'single-result': 'Resultado', 'paired-records': 'Registros', story: 'História' } as const;
/** Desktop alto, sem movimento reduzido: seção travada e cards avançando na horizontal. */
const RAIL = '(min-width: 992px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)';

/** Em produção, só casos aprovados. No protótipo, os espaços reservados continuam identificados. */
const pool = siteConfig.mode === 'production' ? caseStudies.filter(isPublishedCase) : caseStudies;

function describe(list: typeof caseStudies) {
  const pub = list.filter(isPublishedCase).length;
  const res = list.length - pub;
  return [
    pub ? `${pub} ${pub === 1 ? 'caso publicado' : 'casos publicados'}` : '',
    res ? `${res} ${res === 1 ? 'espaço reservado' : 'espaços reservados'}` : '',
  ]
    .filter(Boolean)
    .join(' e ');
}

export function Results() {
  const { filter, setFilter, openCase } = useApp();
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const st = useRef<ScrollTrigger | null>(null);

  const list = pool.filter((c) => filter === 'all' || c.serviceId === filter);

  /**
   * Linha do tempo ligada à rolagem (GSAP ScrollTrigger + rolagem suave do Lenis, sem "tranco"):
   * 1. O primeiro card começa ocupando a área toda do trilho.
   * 2. Ao rolar, ele encolhe para o tamanho normal e fica no centro.
   * 3. Os demais aparecem à direita dele, um a um (0,2 de diferença na linha do tempo), e a fileira
   *    desliza para a esquerda até o último card. Só então a página continua descendo.
   */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(RAIL, () => {
        const cards = gsap.utils.toArray<HTMLElement>('.case', trackRef.current);
        const track = trackRef.current;
        const box = rail.current;
        if (cards.length < 2 || !box || !track) return;
        const [first, ...rest] = cards;
        const CARD = 300;
        const GAP = 24;
        const railW = () => box.clientWidth;
        const centerX = () => railW() / 2 - CARD / 2;
        const endX = () => -(cards.length * CARD + (cards.length - 1) * GAP - railW());

        gsap.set(first, { width: railW });
        gsap.set(rest, { opacity: 0, x: 40 });
        gsap.set(track, { x: 0 });

        const travel = 0.4 + rest.length * 0.2;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * (0.8 + rest.length * 0.28))}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        tl.addLabel('big')
          .to(first, { width: CARD, duration: 1, ease: 'power3.inOut' }, 0)
          .to(track, { x: centerX, duration: 1, ease: 'power3.inOut' }, 0)
          .addLabel('centered', 1);
        rest.forEach((card, i) => tl.to(card, { opacity: 1, x: 0, duration: 0.45, ease: 'power2.out' }, 1.1 + i * 0.2));
        tl.to(track, { x: endX, duration: travel, ease: 'power1.inOut' }, 1.3).addLabel('end');
        st.current = tl.scrollTrigger ?? null;

        // Ímã: início, card centralizado e fim do trilho.
        const off = registerSnap(() => {
          const t = st.current;
          if (!t) return null;
          const centered = Math.round(t.labelToScroll('centered'));
          // Card grande → um gesto → card normal centralizado. Depois, rolagem lateral livre.
          return { points: [Math.round(t.start), centered, Math.round(t.end)], stepRange: [t.start, centered] };
        });
        return () => {
          off();
          st.current = null;
        };
      });
      return () => mm.revert();
    },
    { dependencies: [filter], scope: section, revertOnUpdate: true },
  );

  // Teclado: focar um card fora da área visível leva a rolagem até ele.
  const onCardFocus = (i: number) => {
    const t = st.current;
    if (!t) return;
    const n = list.length;
    const y = i === 0 ? t.labelToScroll('centered') : t.start + ((t.end - t.start) * (i + 1)) / (n + 1);
    if (Math.abs(window.scrollY - y) > 4) scrollToY(y, { immediate: true });
  };

  const options: { id: Filter; label: string }[] = [
    { id: 'all', label: 'Todos' },
    ...services.map((s) => ({ id: s.id as Filter, label: s.name })),
  ];

  return (
    <section ref={section} id="resultados" className="section section--soft results-sec" aria-labelledby="res-title" data-flow>
      <div className="container" data-flow-inner>
        <SectionHead eyebrow="Resultados" title="Cada sorriso tem sua história." titleId="res-title" />

        <Reveal>
          <div role="group" aria-label="Filtrar por procedimento" className="filters">
            {options.map((o) => (
              <motion.button
                key={o.id}
                {...pressable}
                id={`filter-${o.id}`}
                type="button"
                className="chip"
                aria-pressed={filter === o.id}
                onClick={() => setFilter(o.id)}
              >
                {filter === o.id && <IconCheck />}
                {o.label}
              </motion.button>
            ))}
          </div>
          <div className="results__meta">
            <p className="results__count" role="status" aria-live="polite">
              {list.length} {list.length === 1 ? 'item' : 'itens'}: {describe(list)}.
            </p>
            <p className="results__note">Cada caso é individual. A indicação e o planejamento dependem de avaliação.</p>
          </div>
        </Reveal>

        <div className="rail" ref={rail}>
          <motion.ul
            key={filter}
            ref={trackRef}
            className="rail__track"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.22 } }}
          >
            {list.map((c, idx) => {
              const svc = services.find((s) => s.id === c.serviceId)!;
              const pro = c.professionalId ? team.find((t) => t.id === c.professionalId)?.name : null;
              const published = isPublishedCase(c);
              const label = published ? 'Conhecer este caso' : 'Ver espaço reservado';
              return (
                <li key={c.id} className="case" data-index={idx}>
                  <MediaPlaceholder slot={c.media[0]} purpose={c.media[0].placeholderLabel} />
                  <div className="case__meta">
                    <span className="case__format">{published ? formatLabel[c.format] : 'Espaço reservado'}</span>
                    <h3 className="t-card">{svc.name}</h3>
                    <p className="case__ctx">{c.context}</p>
                    <p className="case__ctx">{pro ?? '[PROFISSIONAL RESPONSÁVEL]'}</p>
                  </div>
                  <div className="case__action">
                    <motion.button
                      {...pressable}
                      type="button"
                      className="btn btn--secondary btn--sm btn--block"
                      onClick={() => openCase(c.id)}
                      onFocus={() => onCardFocus(idx)}
                      aria-label={`${label}: ${svc.name}`}
                    >
                      {label}
                    </motion.button>
                  </div>
                </li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
