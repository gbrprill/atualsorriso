'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useApp } from '@/components/AppProvider';
import { ContactButton } from '@/components/ui/ContactButton';
import { MapsLink } from '@/components/ui/ActionButtons';

/**
 * Barra de contato do celular. Aparece só quando nenhum CTA equivalente está na tela
 * (CTA da hero e convite final), e nunca sobre menu ou modal.
 * IntersectionObserver: nenhum estado é atualizado por evento de scroll.
 */
export function MobileBar() {
  const { menuOpen, modalOpen } = useApp();
  const [ctaInView, setCtaInView] = useState(true);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('[data-hero-cta], [data-final-cta]'));
    if (!targets.length) return;
    const seen = new Map<Element, boolean>();
    let timer: number | undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => seen.set(e.target, e.isIntersecting));
      const any = Array.from(seen.values()).some(Boolean);
      // Pequeno atraso evita piscar quando o CTA fica exatamente na borda da tela.
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setCtaInView(any), 120);
    });
    targets.forEach((t) => io.observe(t));
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const show = !ctaInView && !menuOpen && !modalOpen;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="mbar"
          role="region"
          aria-label="Contato rápido"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
          exit={{ opacity: 0, y: 16, transition: { duration: 0.16 } }}
        >
          <ContactButton position="mobile-bar" />
          <MapsLink position="mobile-bar" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
