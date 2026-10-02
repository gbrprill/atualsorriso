'use client';

import { useState } from 'react';
import { faq } from '@/data/faq';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { IconPlus } from '@/components/ui/Icons';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section section--surface" aria-labelledby="faq-title" data-flow>
      <div className="container" data-flow-inner>
        <SectionHead eyebrow="Perguntas frequentes" title="Dúvidas comuns antes da primeira conversa." titleId="faq-title" />
        <div className="faq">
          {faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={Math.min(i, 3) * 0.05}>
                <h3 style={{ font: 'inherit' }}>
                  <button
                    type="button"
                    className="faq__q"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {f.q}
                    <IconPlus />
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq__a" data-open={isOpen}>
                  <div inert={!isOpen}>
                    <p>{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
