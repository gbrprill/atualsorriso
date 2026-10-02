import { siteConfig } from '@/data/siteConfig';
import { MapsLink, directionsUrl } from '@/components/ui/ActionButtons';
import { Reveal } from '@/components/motion/Reveal';
import { ReviewNote } from '@/components/ui/ReviewNote';

/**
 * Mapa incorporado (carregamento lazy). Um link transparente cobre o mapa: clicar em qualquer ponto
 * abre a rota até a clínica no Google Maps (o iframe em si não recebe cliques).
 */
export function Location() {
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address.value)}&z=16&output=embed`;
  return (
    <section id="como-chegar" className="section" aria-labelledby="loc-title" data-flow>
      <div className="container split" data-flow-inner>
        <Reveal kind="left" className="copy">
          <p className="eyebrow">Localização</p>
          <h2 id="loc-title" className="t-h2">
            Como chegar à Atual Sorriso.
          </h2>
          <dl className="info">
            <div>
              <dt>Endereço</dt>
              <dd>{siteConfig.address.value}</dd>
            </div>
            <div>
              <dt>Horário</dt>
              <dd>{siteConfig.hours.value}</dd>
              <p className="t-small" style={{ marginTop: 4 }}>
                Confirme os horários com a equipe.
                <ReviewNote>Horário observado na pesquisa pública de 30/09/2026. Revalidar.</ReviewNote>
              </p>
            </div>
          </dl>
          <div className="btn-row">
            <MapsLink position="location" variant="primary" href={directionsUrl}>
              Traçar rota
            </MapsLink>
          </div>
        </Reveal>
        <Reveal kind="media" delay={0.06} className="map">
          <iframe className="map__frame" title="Mapa com a localização da Atual Sorriso" src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" tabIndex={-1} />
          <a className="map__link" href={directionsUrl} target="_blank" rel="noopener noreferrer" aria-label="Abrir a rota até a Atual Sorriso no Google Maps (nova aba)">
            <span className="map__hint" aria-hidden="true">
              Abrir rota no Google Maps
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
