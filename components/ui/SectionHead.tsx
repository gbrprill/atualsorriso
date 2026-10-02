import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';

/** Título da seção entra primeiro (eyebrow + título juntos), apoio logo depois. */
export function SectionHead({
  eyebrow,
  title,
  titleId,
  children,
}: {
  eyebrow: string;
  title: string;
  titleId: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-head">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={titleId} className="t-h2">
          {title}
        </h2>
      </Reveal>
      {children && <Reveal delay={0.06}>{children}</Reveal>}
    </div>
  );
}
