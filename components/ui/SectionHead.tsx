import type { ReactNode } from 'react';
import { Reveal } from '@/components/motion/Reveal';

export function SectionHead({
  eyebrow,
  title,
  titleId,
  children,
  tight,
}: {
  eyebrow: string;
  title: string;
  titleId: string;
  children?: ReactNode;
  tight?: boolean;
}) {
  return (
    <div className="section-head" style={tight ? { marginBottom: 40 } : undefined}>
      <Reveal kind="left" duration={0.7}>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 id={titleId} className="t-h2">
          {title}
        </h2>
      </Reveal>
      {children && <Reveal delay={0.16}>{children}</Reveal>}
    </div>
  );
}
