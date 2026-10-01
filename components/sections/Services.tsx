import { services } from '@/data/services';
import { ContactButton } from '@/components/ui/ContactButton';
import { ShowResultsButton } from '@/components/ui/ActionButtons';
import { MediaPlaceholder } from '@/components/ui/Placeholder';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';

export function Services() {
  return (
    <section id="procedimentos" className="section" aria-labelledby="proc-title">
      <div className="container">
        <SectionHead eyebrow="Procedimentos" title="Cuidado para diferentes momentos do seu sorriso." titleId="proc-title" />
        <ul className="services">
          {services.map((s, i) => (
            <li key={s.id}>
              <Reveal delay={(i % 4) * 0.09} className="h-full" amount={0.1}>
                <article className="card" style={{ height: '100%' }}>
                  <MediaPlaceholder slot={s.cover} purpose={s.cover.placeholderLabel} />
                  <div className="card__body">
                    <span className="card__num">{s.id}</span>
                    <h3 className="t-card">{s.name}</h3>
                    <p className="t-small">{s.summary}</p>
                    <div className="card__actions">
                      <ShowResultsButton serviceId={s.id} serviceName={s.name} />
                      <ContactButton serviceId={s.id} position={`service-${s.id}`} variant="secondary" icon={false}>
                        Conversar sobre este procedimento
                      </ContactButton>
                    </div>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
