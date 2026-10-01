'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { siteConfig } from '@/data/siteConfig';
import { MediaPlaceholder } from '@/components/ui/Placeholder';
import { MapsLink } from '@/components/ui/ActionButtons';
import { Reveal } from '@/components/motion/Reveal';
import { pressable } from '@/components/ui/pressable';

export function Location() {
  const [map, setMap] = useState(false);
  const embed = `https://www.google.com/maps?q=${encodeURIComponent(siteConfig.address.value)}&output=embed`;
  return (
    <section id="como-chegar" className="section" aria-labelledby="loc-title">
      <div className="container split">
        <Reveal kind="left" duration={0.9} className="copy">
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
                Horário observado na pesquisa pública de 30/09/2026. Confirme com a equipe.
              </p>
            </div>
          </dl>
          <div className="btn-row">
            <MapsLink position="location" variant="primary">
              Como chegar
            </MapsLink>
            {!map && (
              <motion.button {...pressable} type="button" className="btn btn--secondary" onClick={() => setMap(true)}>
                Ver mapa aqui
              </motion.button>
            )}
          </div>
        </Reveal>
        <Reveal kind="right" duration={1} delay={0.1}>
          {map ? (
            <iframe className="map-frame" title="Mapa da Atual Sorriso" src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          ) : (
            <MediaPlaceholder
              large
              slot={{ id: 'FACHADA-01', src: null, placeholderLabel: '[FACHADA DA CLÍNICA]', alt: '', aspectRatio: '16/10', editorialState: 'placeholder' }}
              purpose="[FACHADA DA CLÍNICA]"
            />
          )}
        </Reveal>
      </div>
    </section>
  );
}
