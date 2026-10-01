'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { caseStudies } from '@/data/caseStudies';
import { services } from '@/data/services';
import { team } from '@/data/team';
import { useApp, type Filter } from '@/components/AppProvider';
import { Reveal } from '@/components/motion/Reveal';
import { IconCheck } from '@/components/ui/Icons';
import { MediaPlaceholder } from '@/components/ui/Placeholder';
import { SectionHead } from '@/components/ui/SectionHead';
import { pressable } from '@/components/ui/pressable';

const formatLabel = { 'single-result': 'Resultado', 'paired-records': 'Registros', story: 'História' } as const;

export function Results() {
  const { filter, setFilter, openCase } = useApp();
  const touched = useRef(false);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) first.current = false;
    else touched.current = true;
  }, [filter]);

  const options: { id: Filter; label: string }[] = [{ id: 'all', label: 'Todos' }, ...services.map((s) => ({ id: s.id as Filter, label: s.name }))];
  const visible = caseStudies.filter((c) => filter === 'all' || c.serviceId === filter);
  const count = `${visible.length} ${visible.length === 1 ? 'caso' : 'casos'} exibido${visible.length === 1 ? '' : 's'}`;

  return (
    <section id="resultados" className="section section--soft" aria-labelledby="res-title">
      <div className="container">
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
        </Reveal>
        <p className="sr-only" role="status" aria-live="polite">
          {count}
        </p>

        <Reveal kind="fade" duration={1} amount={0.05}>
          <ul className="results">
            {visible.map((c, idx) => {
              const svc = services.find((s) => s.id === c.serviceId)!;
              const pro = c.professionalId ? team.find((t) => t.id === c.professionalId)?.name : null;
              return (
                <li key={c.id} className={`case${touched.current ? ' case--enter' : ''}`} style={{ animationDelay: `${idx * 55}ms` }}>
                  <MediaPlaceholder slot={c.media[0]} purpose={c.media[0].placeholderLabel} />
                  <div className="case__meta">
                    <span className="case__format">
                      {c.id} · {formatLabel[c.format]}
                    </span>
                    <h3 className="t-card">{svc.name}</h3>
                    <p className="case__ctx">{c.context}</p>
                    <p className="case__ctx">{pro ?? '[PROFISSIONAL RESPONSÁVEL]'}</p>
                  </div>
                  <div>
                    <motion.button
                      {...pressable}
                      type="button"
                      className="btn btn--secondary"
                      onClick={() => openCase(c.id)}
                      aria-label={`Ver contexto: ${svc.name}`}
                    >
                      Ver contexto
                    </motion.button>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal kind="left" delay={0.8}>
          <p className="note">Cada caso é individual. A indicação e o planejamento dependem de avaliação.</p>
        </Reveal>
      </div>
    </section>
  );
}
