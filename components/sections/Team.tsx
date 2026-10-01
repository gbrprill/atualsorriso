import { pendingRegistration, team, teamPhoto } from '@/data/team';
import { MediaPlaceholder } from '@/components/ui/Placeholder';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/motion/Reveal';

export function Team() {
  return (
    <section id="equipe" className="section" aria-labelledby="team-title">
      <div className="container">
        <SectionHead tight eyebrow="Equipe" title="Conheça quem vai cuidar de você." titleId="team-title" />
        <Reveal kind="media" duration={1.1} amount={0.1}>
          <MediaPlaceholder large slot={teamPhoto} purpose="[FOTO COLETIVA DA EQUIPE]" />
        </Reveal>
        <ul className="team">
          {team.map((m, i) => (
            <li key={m.id}>
              <Reveal kind="media" delay={(i % 5) * 0.08} amount={0.1}>
                <article className="member">
                  <MediaPlaceholder portrait slot={m.portrait} purpose={m.portrait.placeholderLabel} />
                  <h3>{m.name}</h3>
                  <p className="t-small">{m.role}</p>
                  <p>
                    <span className="tag">{pendingRegistration(m)}</span>
                  </p>
                  <p className="t-small">{m.bio}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
